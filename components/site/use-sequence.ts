'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Shared timing for anything on the site that advances by itself — the
 * knowledge walkthrough, the engagement slideshow, the work showcase.
 *
 * Two decisions are worth stating, because they are the difference between a
 * sequence that explains something and a carousel that fights the reader:
 *
 * 1. The clock lives in CSS, not JavaScript. A `pp-progress` animation runs on
 *    the progress element and advances the sequence when it fires
 *    `animationend`. Nothing re-renders between stages, pausing is a single
 *    `animation-play-state` flip that keeps its exact place, and the timer
 *    cannot drift away from the bar the reader is watching. A single timeout
 *    per stage sits under it as a floor, for platforms that never deliver the
 *    event at all.
 *
 * 2. It yields immediately and permanently. Autoplay runs only while the
 *    sequence is on screen, the tab is visible, the pointer is elsewhere and
 *    nothing inside has focus — and the first manual interaction stops it for
 *    good. There is always an explicit play/pause control, which WCAG 2.2.2
 *    requires of any content that starts moving on its own.
 */

export type Sequence = ReturnType<typeof useSequence>;

export function useSequence(length: number, stepMs = 6500) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [userTook, setUserTook] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const visibleRef = useRef(false);

  /* Start only when the sequence is actually on screen, and only if motion is
     welcome in the first place. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (userTook) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        setPlaying(entry.isIntersecting && !hoverRef.current && !document.hidden);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [userTook]);

  /* A background tab keeps running CSS animations, so without this the stages
     would march on unwatched and the reader would return mid-sequence. */
  useEffect(() => {
    const onVisibility = () =>
      setPlaying(!document.hidden && visibleRef.current && !hoverRef.current && !userTook);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [userTook]);

  /* `animationend` is the clock; this is only a floor under it. If the
     platform never delivers that event — rendering throttled on a page the
     browser still reports as visible, or animations switched off outright —
     the sequence must not freeze on a half-drawn bar. The grace period keeps
     it from ever racing an animation that is simply running. */
  useEffect(() => {
    if (!playing || userTook) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % length), stepMs + 1200);
    return () => clearTimeout(id);
  }, [playing, userTook, index, length, stepMs]);

  const take = useCallback((fn: () => void) => {
    setUserTook(true);
    setPlaying(false);
    fn();
  }, []);

  const go = useCallback(
    (next: number) => take(() => setIndex(((next % length) + length) % length)),
    [take, length],
  );

  /** Jump to the first stage of a different sequence — a new tab, say. */
  const reset = useCallback(
    (fn?: () => void) =>
      take(() => {
        fn?.();
        setIndex(0);
      }),
    [take],
  );

  const toggle = useCallback(() => {
    if (playing) {
      take(() => {});
    } else {
      setUserTook(false);
      setPlaying(true);
    }
  }, [playing, take]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        go(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        go(length - 1);
      }
    },
    [go, index, length],
  );

  const containerProps = {
    ref: rootRef,
    onMouseEnter: () => {
      hoverRef.current = true;
      setPlaying(false);
    },
    onMouseLeave: () => {
      hoverRef.current = false;
      if (!userTook) setPlaying(true);
    },
    onFocusCapture: () => setPlaying(false),
  };

  /**
   * Spread onto the element that both shows and drives the stage clock. Once
   * the reader has taken control there is no clock, so the element renders as
   * a plain full-width marker instead.
   */
  const clockProps: React.HTMLAttributes<HTMLElement> = userTook
    ? {}
    : {
        style: {
          animationName: 'pp-progress',
          animationDuration: `${stepMs}ms`,
          animationTimingFunction: 'linear',
          animationFillMode: 'forwards',
          animationPlayState: playing ? 'running' : 'paused',
        },
        onAnimationEnd: () => setIndex((i) => (i + 1) % length),
      };

  return { index, playing, userTook, containerProps, onKeyDown, go, reset, toggle, clockProps };
}
