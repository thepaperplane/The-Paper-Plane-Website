'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll reveals for every `.reveal` on the page.
 *
 * One observer for the whole document rather than a wrapper component per
 * element — it keeps the markup clean and costs a single listener.
 *
 * Two things here are load-bearing, both learned the hard way:
 *
 * 1. It re-runs on navigation. This component is mounted by the root layout,
 *    which the App Router keeps alive across client-side navigations, so an
 *    effect with an empty dependency list runs exactly once per session. Every
 *    page reached by clicking a link then had its `.reveal` nodes left
 *    unobserved — and because `.reveal-ready .reveal` is `opacity: 0`, that
 *    meant the entire body of those pages rendered invisible. Keying on the
 *    pathname is what makes the reveals work anywhere but a cold load.
 *
 * 2. There is a backstop. An IntersectionObserver that silently fails to
 *    deliver takes the page's content with it, which is far worse than losing
 *    an animation. A passive, timer-throttled scroll pass reveals anything
 *    that has reached the fold regardless of what the observer is doing, and
 *    both paths retire themselves once everything is shown.
 *
 * Reveals happen once; nothing re-animates on the way back up. Under
 * prefers-reduced-motion everything is shown immediately.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Effects run after React has committed the DOM, so the new page's nodes
    // are already queryable here. Deliberately no requestAnimationFrame: rAF
    // does not fire in a backgrounded or unrendered tab, and nothing that
    // decides whether content is visible should depend on the compositor
    // running.
    const pending = new Set(
      Array.from(document.querySelectorAll<HTMLElement>('.reveal:not([data-shown])')),
    );
    if (!pending.size) return;

    let io: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const retire = () => {
      io?.disconnect();
      io = undefined;
      if (timer) clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };

    const show = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      const delay = Number(el.dataset.revealDelay ?? 0);
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.setAttribute('data-shown', 'true');
      pending.delete(el);
      io?.unobserve(el);
      if (!pending.size) retire();
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      pending.forEach((n) => n.setAttribute('data-shown', 'true'));
      return;
    }

    // Backstop for anything that has reached the fold, whatever the observer
    // is or is not doing. Throttled on a timer rather than a frame, for the
    // same reason as above.
    const sweep = () => {
      timer = undefined;
      const fold = window.innerHeight * 0.9;
      Array.from(pending).forEach((n) => {
        if (n.getBoundingClientRect().top < fold) show(n);
      });
    };
    const onScroll = () => {
      if (timer) return;
      timer = setTimeout(sweep, 90);
    };

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target as HTMLElement);
        });
      },
      // Fire a little before the element reaches the fold.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    pending.forEach((n) => {
      // Anything already in view on load should not animate in late.
      if (n.getBoundingClientRect().top < window.innerHeight * 0.9) show(n);
      else io?.observe(n);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return retire;
  }, [pathname]);

  return null;
}
