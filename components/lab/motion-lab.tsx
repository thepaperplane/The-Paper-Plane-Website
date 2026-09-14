'use client';

import { useEffect, useState } from 'react';
import { Glass } from '@/components/glass';

/**
 * The animation playground.
 *
 * Replays each timing on demand, so a stakeholder can judge them against each
 * other rather than against a memory of the last one. The replay works by
 * remounting the animated element with a changing key — restarting a CSS
 * transition in place is unreliable, and the alternatives all involve forcing
 * a reflow at exactly the wrong moment.
 */

const DURATIONS = [
  ['--dur-press', '90ms', 'Pointer down. Must beat perception.'],
  ['--dur-micro', '160ms', 'Hover, focus, a small state change.'],
  ['--dur-control', '260ms', 'A control resolving: toggle, tab, input.'],
  ['--dur-element', '420ms', 'One element entering.'],
  ['--dur-section', '680ms', 'A block of content arriving.'],
  ['--dur-hero', '980ms', 'The masthead. Once per page.'],
] as const;

const CURVES = [
  ['--ease-standard', 'The workhorse. Decisive start, long settle.'],
  ['--ease-emphasis', 'Things arriving from off screen.'],
  ['--ease-exit', 'Reversed — things leave faster than they arrive.'],
  ['--spring-snappy', 'Overshoots about 6%. Gives a control mass.'],
  ['--spring-gentle', 'Softer peak, for anything large.'],
] as const;

export function MotionLab() {
  const [run, setRun] = useState(0);

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="bg-accent text-accent-ink tap rounded-[var(--radius-sm)] px-5 py-2.5 text-[length:var(--text-small)] font-medium transition-[transform,background-color] duration-[var(--dur-control)] ease-[var(--spring-snappy)] hover:-translate-y-px active:scale-[0.985] motion-reduce:transform-none"
      >
        Replay all
      </button>

      <div className="mt-8 grid gap-x-12 gap-y-6 lg:grid-cols-2">
        <div>
          <p className="text-ink-3 text-[length:var(--text-micro)] tracking-[0.14em] uppercase">
            Duration hierarchy
          </p>
          <ul className="mt-4 space-y-4">
            {DURATIONS.map(([token, value, note]) => (
              <li key={token} className="border-t pt-3">
                <div className="flex items-baseline justify-between gap-4">
                  <code className="ref text-ink">{token}</code>
                  <span className="text-ink-3 text-[length:var(--text-micro)] tabular-nums">
                    {value}
                  </span>
                </div>
                <p className="text-ink-2 mt-1 text-[length:var(--text-caption)]">{note}</p>
                <Track
                  key={`${token}-${run}`}
                  duration={`var(${token})`}
                  easing="var(--ease-standard)"
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-ink-3 text-[length:var(--text-micro)] tracking-[0.14em] uppercase">
            Curves, all at 680ms
          </p>
          <ul className="mt-4 space-y-4">
            {CURVES.map(([token, note]) => (
              <li key={token} className="border-t pt-3">
                <code className="ref text-ink">{token}</code>
                <p className="text-ink-2 mt-1 text-[length:var(--text-caption)]">{note}</p>
                <Track
                  key={`${token}-${run}`}
                  duration="var(--dur-section)"
                  easing={`var(${token})`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * One timing, shown travelling.
 *
 * The element starts at the left and is moved on the next frame, so the
 * transition has a from-value to animate out of. Doing it inline on mount
 * would leave nothing to interpolate and the box would simply appear at the
 * far end.
 */
function Track({ duration, easing }: { duration: string; easing: string }) {
  const [moved, setMoved] = useState(false);

  // Paint once at the start position, then move on the next tick so the
  // transition has a from-value to interpolate out of. In an effect, not
  // during render — scheduling from the render body fires twice under Strict
  // Mode and leaks a timer on unmount.
  useEffect(() => {
    const id = setTimeout(() => setMoved(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="bg-hairline relative mt-3 h-6 w-full rounded-[var(--radius-pill)]">
      <span
        className="bg-accent absolute top-1/2 block h-4 w-4 -translate-y-1/2 rounded-full motion-reduce:transition-none"
        style={{
          left: moved ? 'calc(100% - 1rem)' : '0px',
          transitionProperty: 'left',
          transitionDuration: duration,
          transitionTimingFunction: easing,
        }}
      />
    </div>
  );
}

/**
 * A spring, drawn rather than described.
 *
 * Runs two markers on the same ramp — one horizontal, one vertical — so the
 * overshoot is visible as travel past the line rather than as a number.
 */
export function SpringTrack({ name, note }: { name: string; note: string }) {
  const [run, setRun] = useState(0);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMoved(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <Glass className="p-6">
      <div className="flex items-baseline justify-between gap-4">
        <code className="ref text-ink">{name}</code>
        <button
          type="button"
          onClick={() => {
            setMoved(false);
            setRun((n) => n + 1);
            setTimeout(() => setMoved(true), 40);
          }}
          className="text-ink-3 hover:text-ink tap text-[length:var(--text-micro)] tracking-[0.12em] uppercase transition-colors"
        >
          Replay
        </button>
      </div>
      <p className="text-ink-2 mt-2 text-[length:var(--text-caption)]">{note}</p>

      {/* The target. Anything travelling past this line is the overshoot. */}
      <div className="relative mt-6 h-24">
        <span className="bg-hairline-strong absolute top-0 right-8 bottom-0 w-px" />
        <span
          key={`h-${run}`}
          className="bg-accent absolute top-3 block h-5 w-5 rounded-full"
          style={{
            left: moved ? 'calc(100% - 3rem)' : '0px',
            transitionProperty: 'left',
            transitionDuration: 'var(--dur-section)',
            transitionTimingFunction: `var(${name})`,
          }}
        />
        <span
          key={`s-${run}`}
          className="bg-accent/30 absolute bottom-2 left-0 block h-10 w-10 rounded-[var(--radius-sm)]"
          style={{
            transform: moved ? 'scale(1)' : 'scale(0.2)',
            transitionProperty: 'transform',
            transitionDuration: 'var(--dur-section)',
            transitionTimingFunction: `var(${name})`,
          }}
        />
      </div>
    </Glass>
  );
}
