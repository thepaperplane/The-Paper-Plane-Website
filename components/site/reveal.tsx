'use client';

import { useEffect } from 'react';

/**
 * Scroll reveals for every `.reveal` on the page.
 *
 * One observer for the whole document rather than a wrapper component per
 * element — it keeps the markup clean and costs a single listener.
 *
 * Elements are revealed once and then unobserved; nothing re-animates on the
 * way back up, which is the difference between a considered reveal and a
 * page that won't sit still. Honours prefers-reduced-motion by showing
 * everything immediately.
 */
export function Reveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!nodes.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((n) => n.setAttribute('data-shown', 'true'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Stagger siblings slightly so a group arrives as a phrase, not a block.
          const delay = Number(el.dataset.revealDelay ?? 0);
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.setAttribute('data-shown', 'true');
          io.unobserve(el);
        });
      },
      // Fire a little before the element reaches the fold.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );

    nodes.forEach((n) => {
      // Anything already in view on load should not animate in late.
      const r = n.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) n.setAttribute('data-shown', 'true');
      else io.observe(n);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
