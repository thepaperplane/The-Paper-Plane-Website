'use client';

import { useId } from 'react';
import { type Sequence, useSequence } from '@/components/site/use-sequence';
import { cn } from '@/lib/utils';

/**
 * The shared chrome for any self-advancing sequence: arrows, one labelled
 * marker per stage, and a pause control.
 *
 * The markers are rules rather than dots. A row of circles reads as decoration
 * and gives no sense of how far through the sequence you are; a row of rules
 * that fill left-to-right shows position, pace and progress in the same mark,
 * and each one is a real button carrying the stage's own name so a screen
 * reader hears "Stage 3: Reconciliation", not "3".
 */
export function SequenceControls({
  seq,
  stages,
  className,
}: {
  seq: Sequence;
  stages: { label: string }[];
  className?: string;
}) {
  const { index, playing, userTook, go, toggle, clockProps } = seq;

  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-4', className)}>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous stage"
          className="text-ink-3 hover:text-ink hover:bg-sunken flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] transition-colors"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M10 3 L5 8 L10 13"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next stage"
          className="text-ink-3 hover:text-ink hover:bg-sunken flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] transition-colors"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M6 3 L11 8 L6 13"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Own row on a phone. Sharing one row with the arrows and the pause
          control squeezed each marker to 23px wide, under the 24px minimum. */}
      <ol
        className="order-last flex basis-full items-center gap-2 sm:order-none sm:flex-1 sm:basis-0"
        aria-label="Stages"
      >
        {stages.map((s, i) => (
          <li key={s.label} className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`Stage ${i + 1}: ${s.label}`}
              aria-current={i === index ? 'step' : undefined}
              className="group relative block h-6 w-full"
            >
              <span
                className={cn(
                  'absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2 transition-colors duration-300',
                  i === index ? 'bg-hairline-strong' : 'bg-hairline group-hover:bg-hairline-strong',
                )}
              />
              {i === index ? (
                <span
                  key={`${index}-${userTook}`}
                  className="bg-accent absolute top-1/2 left-0 block h-0.5 w-full origin-left -translate-y-1/2"
                  {...clockProps}
                />
              ) : i < index ? (
                <span className="bg-accent/40 absolute top-1/2 left-0 block h-0.5 w-full -translate-y-1/2" />
              ) : null}
            </button>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={toggle}
        className="tap text-ink-3 hover:text-ink text-[length:var(--text-micro)] tracking-[0.12em] uppercase transition-colors"
      >
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export type Slide = {
  id: string;
  /** Short name for the marker and the screen-reader announcement. */
  label: string;
  /** Set large next to the diagram. */
  title: string;
  body: string;
  /** Optional aside — a consequence, a caveat, a figure. */
  note?: string;
  /** Receives `active` so a diagram can animate only while it is on show. */
  render: (active: boolean) => React.ReactNode;
};

/**
 * A slideshow that explains a sequence: one idea in the frame at a time, with
 * a drawing of that idea beside it.
 *
 * All stages stay in the DOM — inactive ones are hidden from layout but the
 * frame is sized by the tallest, so the page never jumps as it advances. That
 * also means a crawler, or anyone who has JavaScript off, gets the whole
 * sequence as ordinary prose.
 */
export function Slideshow({
  slides,
  ariaLabel,
  stepMs = 6500,
  mediaFirst = false,
  className,
}: {
  slides: Slide[];
  ariaLabel: string;
  stepMs?: number;
  /** Put the drawing before the words on wide screens. */
  mediaFirst?: boolean;
  className?: string;
}) {
  const seq = useSequence(slides.length, stepMs);
  const { index, containerProps, onKeyDown } = seq;
  const baseId = useId();
  const active = slides[index];

  return (
    <div {...containerProps} className={className}>
      <div
        role="group"
        aria-roledescription="Slideshow"
        aria-label={ariaLabel}
        aria-describedby={`${baseId}-hint`}
        onKeyDown={onKeyDown}
        className={cn(
          'grid items-center gap-10 lg:gap-16',
          mediaFirst
            ? 'md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]'
            : 'md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]',
        )}
      >
        {/* Words */}
        <div className={cn('order-2', mediaFirst ? 'md:order-2' : 'md:order-1')}>
          <div className="flex items-center gap-4">
            <span className="numeral text-[length:var(--text-title-2)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-ink-3 text-[length:var(--text-micro)] tracking-[0.14em] uppercase">
              {active.label}
            </span>
          </div>

          {/* Every stage is rendered; only the current one is shown. The stack
              keeps the block the height of its tallest stage, so advancing
              never shifts the page under the reader. */}
          <div className="mt-6 grid">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                aria-hidden={i === index ? undefined : true}
                className={cn(
                  'col-start-1 row-start-1 transition-opacity duration-500',
                  i === index
                    ? 'animate-[pp-step_0.6s_var(--ease-out-editorial)_both] opacity-100'
                    : 'pointer-events-none invisible opacity-0',
                )}
              >
                <h3 className="text-[length:var(--text-title-1)]">{slide.title}</h3>
                <p className="text-ink-2 mt-5 max-w-[48ch] text-[length:var(--text-body)] leading-[1.7]">
                  {slide.body}
                </p>
                {slide.note ? (
                  <p className="text-ink-3 border-hairline-strong mt-6 max-w-[44ch] border-l-2 pl-5 text-[length:var(--text-small)] leading-relaxed">
                    {slide.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Drawing */}
        <div
          className={cn(
            'glass order-1 flex items-center justify-center p-8 sm:p-10',
            mediaFirst ? 'md:order-1' : 'md:order-2',
          )}
        >
          <div className="aspect-[320/176] w-full max-w-[26rem]">
            {slides.map((slide, i) => (
              <div key={slide.id} className={cn('h-full w-full', i === index ? '' : 'hidden')}>
                {slide.render(i === index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <SequenceControls seq={seq} stages={slides} className="mt-10" />

      <span className="sr-only" aria-live="polite">
        {`${ariaLabel}, stage ${index + 1} of ${slides.length}: ${active.title}`}
      </span>
      <span id={`${baseId}-hint`} className="sr-only">
        Use the left and right arrow keys to move between stages.
      </span>
    </div>
  );
}
