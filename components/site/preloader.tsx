'use client';

import { useEffect, useState } from 'react';
import { LogoMark } from '@/components/brand/logo';

const SESSION_KEY = 'pp.intro.seen';

/**
 * Brand intro.
 *
 * Deliberately different from the version this replaces:
 *  - It OVERLAYS the page instead of gating it. The real content is already
 *    server-rendered underneath, so this costs nothing in LCP or crawlability.
 *  - It reports real readiness (`document.readyState` + fonts) rather than
 *    animating a fake random progress counter.
 *  - It shows once per session, never on repeat navigation.
 *  - It does not render at all when the visitor prefers reduced motion.
 */
export function Preloader() {
  // Start hidden. An effect decides whether this session has earned an intro,
  // which also keeps server and first client render identical.
  const [phase, setPhase] = useState<'idle' | 'playing' | 'leaving' | 'done'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      // Private mode or blocked storage — treat as unseen, still harmless.
    }

    if (prefersReduced || seen) {
      setPhase('done');
      return;
    }

    setPhase('playing');
    document.documentElement.style.setProperty('overflow', 'hidden');

    let leaveTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      setPhase('leaving');
      document.documentElement.style.removeProperty('overflow');
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        /* ignore */
      }
      doneTimer = setTimeout(() => setPhase('done'), 600);
    };

    // Real readiness: the document has loaded and web fonts have settled.
    // Floor of 900ms so the animation is never cut mid-glide; ceiling of
    // 2200ms so a slow network can never trap the visitor behind it.
    const ready = Promise.all([
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener('load', () => r(), { once: true })),
      document.fonts?.ready ?? Promise.resolve(),
      new Promise<void>((r) => setTimeout(r, 900)),
    ]);

    ready.then(() => {
      leaveTimer = setTimeout(finish, 0);
    });

    const failsafe = setTimeout(finish, 2200);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      clearTimeout(failsafe);
      document.documentElement.style.removeProperty('overflow');
    };
  }, []);

  if (phase === 'idle' || phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-white transition-opacity duration-[600ms] ease-[var(--ease-out-ios)]"
      style={{
        opacity: phase === 'leaving' ? 0 : 1,
        pointerEvents: phase === 'leaving' ? 'none' : 'auto',
      }}
    >
      {/* Soft brand wash so the white is not clinical */}
      <div className="ambient-wash pointer-events-none absolute inset-0" />

      <div className="relative flex flex-col items-center">
        <LogoMark className="h-20 w-28 sm:h-24 sm:w-[8.5rem]" animated priority />

        <div
          className="mt-6 overflow-hidden"
          style={{ animation: 'pp-fade-up 0.6s var(--ease-out-ios) 0.55s both' }}
        >
          <p className="text-ink text-[0.9375rem] font-semibold tracking-[-0.01em]">
            The Paper Plane
          </p>
        </div>

        {/* A single hairline that fills once — no fake percentage. */}
        <div className="bg-hairline mt-5 h-px w-32 overflow-hidden rounded-full">
          <div
            className="from-brand-400 to-brand-600 h-full w-full bg-gradient-to-r"
            style={{
              transformOrigin: 'left',
              animation: 'pp-line-fill 1.6s var(--ease-out-ios) 0.2s both',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pp-line-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
