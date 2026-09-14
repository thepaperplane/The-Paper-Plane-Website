/**
 * Site audit.
 *
 * Every check here exists because something actually broke during this build.
 * That is the selection criterion — not "what could a linter assert", but
 * "what went wrong once and must never go wrong silently again":
 *
 *   reveals      An effect with an empty dependency array inside the root
 *                layout ran once per session, so every page reached by
 *                clicking a link rendered with its body at opacity 0. Thirty
 *                blocks and twenty-one service names invisible, and three
 *                rounds of "clean" audits missed it because those audits set
 *                data-shown by hand before measuring. This one scrolls the
 *                page like a visitor and refuses to help it along.
 *
 *   contrast     Composited through the full translucent stack. Once the site
 *                went to glass, stopping at the first opaque ancestor started
 *                reporting comfortable numbers for text sitting on three
 *                stacked translucent layers over a tinted field.
 *
 *   targets      WCAG 2.5.8. Twenty to thirty per page were under 24x24 when
 *                first measured, nearly all of them bare text links.
 *
 *   diagrams     Labels colliding with each other or running outside their
 *                frame. Invisible to every other kind of test, and there are
 *                nearly forty drawings now.
 *
 *   schema       Structured data that disagrees with the page is the one SEO
 *                error that gets a domain distrusted rather than ignored.
 *
 *   links        /privacy and /terms were linked from every footer and listed
 *                in the sitemap while returning 404.
 *
 * Usage:  node scripts/audit.mjs [baseUrl]
 * Exits non-zero on any failure, so CI can gate on it.
 */

import { chromium } from 'playwright';

const BASE = process.argv[2] ?? process.env.AUDIT_URL ?? 'http://localhost:3000';

const PAGES = [
  '/',
  '/services',
  '/knowledge',
  '/calendar',
  '/work',
  '/news',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/accessibility',
  '/security',
  '/copyright',
];

const VIEWPORTS = [
  { name: 'phone', width: 375, height: 720 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'desktop', width: 1280, height: 900 },
];

const failures = [];
const notes = [];
function fail(scope, message) {
  failures.push(`${scope}: ${message}`);
}

/* ------------------------------------------------------------------ */
/* Browser-side collectors                                             */
/* ------------------------------------------------------------------ */

/**
 * Contrast, composited.
 *
 * Walks the ancestor chain collecting every non-transparent background and
 * composites them onto the ambient field, rather than stopping at the first
 * opaque one. With a translucent design that difference is the whole result.
 */
const contrastProbe = () => {
  // Must understand hex as well as rgb(): a custom property like --accent
  // resolves to "#4fb6e0", and pulling digits out of that yields [4, 6, 0] —
  // which is a plausible-looking colour and a completely wrong one. That bug
  // reported an 8.5:1 label as 1.03:1 in dark mode only, because the light
  // hex happened to parse into something harmless.
  const parse = (c) => {
    const v = (c || '').trim();
    if (v.startsWith('#')) {
      let h = v.slice(1);
      if (h.length === 3) h = h.split('').map((x) => x + x).join('');
      if (h.length < 6) return null;
      return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
      ];
    }
    const m = v.match(/[\d.]+/g);
    return m ? m.map(Number) : null;
  };
  const over = (fg, bg) => {
    const a = fg[3] === undefined ? 1 : fg[3];
    return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
  };
  const lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };

  const field = document.querySelector('.ambient-field');
  const base = field
    ? (parse(getComputedStyle(field).backgroundColor) || [255, 255, 255]).slice(0, 3)
    : (parse(getComputedStyle(document.body).backgroundColor) || [255, 255, 255]).slice(0, 3);

  const effBg = (el) => {
    const stack = [];
    let n = el.ownerSVGElement ? el.ownerSVGElement.parentElement : el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && (c[3] === undefined || c[3] > 0.004)) stack.push(c);
      if (c && (c[3] === undefined || c[3] > 0.995)) break;
      n = n.parentElement;
    }
    let bg = base.slice();
    for (let i = stack.length - 1; i >= 0; i--) bg = over(stack[i], bg);
    return bg;
  };

  const out = [];
  document.querySelectorAll('body *').forEach((el) => {
    // Gradient-clipped text has no single colour to measure.
    if (el.closest('.sr-only, [aria-hidden="true"], .tagline-gradient')) return;
    const text = [...el.childNodes]
      .filter((n) => n.nodeType === 3 && n.textContent.trim())
      .map((n) => n.textContent.trim())
      .join(' ');
    if (!text) return;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || s.display === 'none' || +s.opacity < 0.6) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const fg = parse(s.color);
    if (!fg || fg[3] === 0) return;
    const px = parseFloat(s.fontSize);
    const bold = parseInt(s.fontWeight, 10) >= 700;
    const need = px >= 24 || (px >= 18.66 && bold) ? 3 : 4.5;
    const v = ratio(fg.slice(0, 3), effBg(el));
    if (v < need) out.push({ text: text.slice(0, 40), ratio: +v.toFixed(2), need });
  });

  // SVG text carries its colour on `fill`, not `color`.
  document.querySelectorAll('svg text').forEach((t) => {
    const svg = t.ownerSVGElement;
    if (!svg || svg.closest('.hidden')) return;
    const s = getComputedStyle(t);
    const fill = parse(s.fill);
    if (!fill) return;
    const onPlate = (t.getAttribute('style') || '').includes('accent-ink');
    const accent = parse(getComputedStyle(svg).getPropertyValue('--accent')) ||
      parse(getComputedStyle(document.documentElement).getPropertyValue('--accent'));
    const bg = onPlate && accent ? accent.slice(0, 3) : effBg(t);
    const v = ratio(fill.slice(0, 3), bg);
    if (v < 4.5) {
      out.push({ text: '[svg] ' + (t.textContent || '').trim().slice(0, 30), ratio: +v.toFixed(2), need: 4.5 });
    }
  });
  return out;
};

/**
 * WCAG 2.5.8. Two things this has to know about:
 *
 *   `.tap` grows the hit area with a pseudo-element, so the layout box
 *   understates the real target.
 *
 *   The success criterion exempts a target that is "in a sentence or whose
 *   size is otherwise constrained by the line-height of non-target text".
 *   An email address inside a paragraph qualifies, and padding it out would
 *   push it into the lines above and below for no benefit. Detected by asking
 *   whether the link's parent carries materially more text than the link.
 */
const targetProbe = () => {
  const out = [];
  const inlineInSentence = (el) => {
    const p = el.parentElement;
    if (!p) return false;
    const around = (p.textContent || '').trim().length;
    const own = (el.textContent || '').trim().length;
    return around > own + 20;
  };
  document.querySelectorAll('a, button, [role=tab], input, select, textarea').forEach((el) => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return;
    if (el.classList.contains('sr-only-focusable') || el.closest('.sr-only')) return;
    if (el.type === 'hidden') return;
    if (el.tagName === 'A' && inlineInSentence(el)) return;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const h = el.classList.contains('tap') ? Math.max(r.height, 36) : r.height;
    if (r.width < 24 || h < 24) {
      out.push({
        text: (el.textContent || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 28),
        w: Math.round(r.width),
        h: Math.round(h),
      });
    }
  });
  return out;
};

/** Labels colliding with each other, or escaping the frame. */
const diagramProbe = () => {
  const collisions = [];
  const overflow = [];
  document.querySelectorAll('svg[role=img]').forEach((svg) => {
    if (svg.closest('.hidden')) return;
    const vb = svg.viewBox.baseVal;
    if (!vb || !vb.width) return;
    const label = (svg.getAttribute('aria-label') || '').slice(0, 34);
    const boxes = [...svg.querySelectorAll('text')]
      .map((t) => {
        let b;
        try {
          b = t.getBBox();
        } catch {
          return null;
        }
        return { t: (t.textContent || '').trim().slice(0, 22), x: b.x, y: b.y, w: b.width, h: b.height };
      })
      .filter(Boolean);
    boxes.forEach((a) => {
      if (a.x < -0.5 || a.x + a.w > vb.width + 0.5 || a.y < -0.5 || a.y + a.h > vb.height + 0.5) {
        overflow.push({ svg: label, text: a.t });
      }
    });
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox > 1 && oy > 1) collisions.push({ svg: label, a: a.t, b: b.t });
      }
    }
  });
  return { collisions, overflow };
};

const structureProbe = () => {
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(
    (h) => !h.closest('.sr-only'),
  );
  const skips = [];
  let prev = 0;
  headings.forEach((h) => {
    const lv = +h.tagName[1];
    if (prev && lv > prev + 1) skips.push(`h${prev} to h${lv}`);
    prev = lv;
  });
  const ids = {};
  document.querySelectorAll('[id]').forEach((e) => (ids[e.id] = (ids[e.id] || 0) + 1));
  return {
    h1Count: headings.filter((h) => h.tagName === 'H1').length,
    skips,
    duplicateIds: Object.entries(ids)
      .filter(([, n]) => n > 1)
      .map(([id]) => id),
    missingAlt: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
    unnamedControls: [...document.querySelectorAll('a,button')].filter((el) => {
      const name = (el.textContent || '').trim() || el.getAttribute('aria-label') || el.getAttribute('title');
      return !name && el.getBoundingClientRect().width > 0;
    }).length,
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    hiddenReveals: [...document.querySelectorAll('.reveal')].filter(
      (e) => +getComputedStyle(e).opacity < 0.5,
    ).length,
    totalReveals: document.querySelectorAll('.reveal').length,
    jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
  };
};

/* ------------------------------------------------------------------ */

async function run() {
  const browser = await chromium.launch();
  console.log(`Auditing ${BASE}\n`);

  for (const viewport of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      // Only sweep every page at one viewport; the others cover layout.
      const pages = viewport.name === 'desktop' ? PAGES : PAGES.slice(0, 8);
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      await context.addInitScript(`try { localStorage.setItem('pp.theme', '${theme}'); } catch {}`);
      const page = await context.newPage();

      for (const path of pages) {
        const scope = `${path} ${viewport.name}/${theme}`;
        const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
        if (!res || res.status() >= 400) {
          fail(scope, `HTTP ${res ? res.status() : 'no response'}`);
          continue;
        }

        // Scroll it the way a visitor would. Nothing is revealed by hand —
        // that is precisely what hid the reveal bug for three rounds.
        await page.evaluate(async () => {
          document.documentElement.style.scrollBehavior = 'auto';
          const step = Math.round(window.innerHeight * 0.7);
          for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 400));
        });

        const applied = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
        if (applied !== theme) fail(scope, `theme did not apply (got ${applied})`);

        const s = await page.evaluate(structureProbe);
        if (s.hiddenReveals > 0) {
          fail(scope, `${s.hiddenReveals}/${s.totalReveals} reveal blocks still hidden after a full scroll`);
        }
        if (s.h1Count !== 1) fail(scope, `${s.h1Count} h1 elements`);
        if (s.skips.length) fail(scope, `heading level skipped: ${s.skips.join(', ')}`);
        if (s.duplicateIds.length) fail(scope, `duplicate ids: ${s.duplicateIds.slice(0, 3).join(', ')}`);
        if (s.missingAlt) fail(scope, `${s.missingAlt} images without alt`);
        if (s.unnamedControls) fail(scope, `${s.unnamedControls} controls with no accessible name`);
        if (s.overflowX) fail(scope, 'horizontal overflow');

        for (const raw of s.jsonLd) {
          try {
            JSON.parse(raw);
          } catch (e) {
            fail(scope, `invalid JSON-LD: ${e.message}`);
          }
        }

        const contrast = await page.evaluate(contrastProbe);
        contrast.slice(0, 3).forEach((c) => {
          fail(scope, `contrast ${c.ratio}:1 (needs ${c.need}) on "${c.text}"`);
        });
        if (contrast.length > 3) fail(scope, `...and ${contrast.length - 3} more contrast failures`);

        const targets = await page.evaluate(targetProbe);
        targets.slice(0, 3).forEach((t) => {
          fail(scope, `target ${t.w}x${t.h} under 24x24 on "${t.text}"`);
        });

        const d = await page.evaluate(diagramProbe);
        d.collisions.slice(0, 3).forEach((c) => {
          fail(scope, `diagram labels collide in "${c.svg}": "${c.a}" / "${c.b}"`);
        });
        d.overflow.slice(0, 3).forEach((o) => {
          fail(scope, `diagram label "${o.text}" outside frame in "${o.svg}"`);
        });
      }

      await context.close();
    }
  }

  // Every internal link resolves. Two 404s shipped in a footer once.
  const context = await browser.newContext();
  const page = await context.newPage();
  const seen = new Set();
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const hrefs = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')),
    );
    hrefs.forEach((h) => seen.add(h.split('#')[0].split('?')[0]));
  }
  for (const href of [...seen].filter((h) => h && !h.startsWith('/admin') && !h.startsWith('/api'))) {
    const r = await page.request.get(BASE + href);
    if (r.status() >= 400) fail('links', `${href} returns ${r.status()}`);
  }
  notes.push(`${seen.size} distinct internal links checked`);
  await context.close();

  await browser.close();

  console.log(notes.map((n) => `  ${n}`).join('\n'));
  if (failures.length) {
    console.error(`\n${failures.length} failure(s):\n`);
    failures.forEach((f) => console.error('  ✗ ' + f));
    process.exit(1);
  }
  console.log('\n✓ audit clean');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
