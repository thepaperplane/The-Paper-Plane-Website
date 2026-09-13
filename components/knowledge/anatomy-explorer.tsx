'use client';

import { useId, useState } from 'react';
import { AlertCircle, Clock, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui';
import { SERVICE_ANATOMY } from '@/content/knowledge';
import { cn } from '@/lib/utils';

/**
 * Breaks one engagement into its real stages, with the share of effort each
 * consumes and the specific risk of skipping it.
 *
 * Implemented as a proper tablist (roving focus, arrow-key navigation) so it
 * is usable from the keyboard and announced correctly by screen readers.
 */
export function AnatomyExplorer() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const current = SERVICE_ANATOMY[active];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = SERVICE_ANATOMY.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = active === last ? 0 : active + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = active === 0 ? last : active - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;

    if (next !== null) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`${baseId}-tab-${next}`)?.focus();
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Service anatomy"
        onKeyDown={onKeyDown}
        className="scroll-lane no-scrollbar -mx-1 flex gap-2 px-1 pb-2"
      >
        {SERVICE_ANATOMY.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${index}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2.5 text-[0.9375rem] font-medium transition-all duration-300 ease-[var(--ease-out-ios)]',
                selected
                  ? 'bg-brand-600 text-white shadow-[var(--shadow-brand)]'
                  : 'text-ink-secondary hover:text-ink bg-white ring-1 ring-[var(--color-hairline)] ring-inset hover:shadow-[var(--shadow-sm)]',
              )}
            >
              {item.service}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        id={`${baseId}-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className="mt-5 focus-visible:outline-none"
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
          {/* Perception vs reality */}
          <Card className="bg-white p-7">
            <p className="text-ink-quaternary text-[0.75rem] font-semibold tracking-[0.06em] uppercase">
              What clients think it is
            </p>
            <p className="text-ink-tertiary mt-3 text-[1.0625rem] leading-relaxed italic">
              {current.perception}
            </p>

            <div className="my-6 h-px bg-[var(--color-hairline)]" />

            <p className="text-brand-700 text-[0.75rem] font-semibold tracking-[0.06em] uppercase">
              What it actually is
            </p>
            <p className="text-ink mt-3 text-[1.0625rem] leading-relaxed">{current.reality}</p>

            <dl className="mt-7 grid grid-cols-2 gap-3">
              <div className="bg-sunken rounded-[var(--radius-md)] p-4">
                <dt className="text-ink-quaternary flex items-center gap-1.5 text-[0.75rem] font-medium">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                  Client-facing time
                </dt>
                <dd className="text-ink mt-1.5 text-[1.375rem] font-semibold tabular-nums">
                  {current.visibleHours}
                </dd>
              </div>
              <div className="bg-brand-50 rounded-[var(--radius-md)] p-4">
                <dt className="text-brand-700 flex items-center gap-1.5 text-[0.75rem] font-medium">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                  Work behind it
                </dt>
                <dd className="text-brand-900 mt-1.5 text-[1.375rem] font-semibold tabular-nums">
                  {current.invisibleHours}
                </dd>
              </div>
            </dl>

            <div className="bg-warning-soft ring-warning/15 mt-3 flex items-start gap-3 rounded-[var(--radius-md)] p-4 ring-1 ring-inset">
              <ShieldAlert className="text-warning mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-warning text-[0.75rem] font-semibold">Risk we carry for you</p>
                <p className="text-ink-secondary mt-1 text-[0.875rem] leading-relaxed">
                  {current.carriedRisk}
                </p>
              </div>
            </div>
          </Card>

          {/* Stages */}
          <Card className="bg-white p-7">
            <p className="text-ink-quaternary text-[0.75rem] font-semibold tracking-[0.06em] uppercase">
              Stage by stage
            </p>

            <ol className="mt-5 space-y-5">
              {current.steps.map((step, i) => (
                <li key={step.label} className="relative pl-9">
                  {/* Connector */}
                  {i < current.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute top-7 bottom-[-1.25rem] left-[0.6875rem] w-px bg-[var(--color-hairline)]"
                    />
                  ) : null}

                  <span className="bg-brand-50 text-brand-700 ring-brand-500/15 absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full text-[0.6875rem] font-semibold ring-1 ring-inset tabular-nums">
                    {i + 1}
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h4 className="text-ink text-[0.9375rem] font-semibold">{step.label}</h4>
                    <span className="text-ink-quaternary text-[0.75rem] tabular-nums">
                      {step.effort}% of effort
                    </span>
                  </div>

                  {/* Effort bar */}
                  <div
                    className="bg-sunken mt-2 h-1.5 overflow-hidden rounded-full"
                    role="img"
                    aria-label={`${step.effort} percent of total effort`}
                  >
                    <div
                      className="from-brand-400 to-brand-600 h-full rounded-full bg-gradient-to-r transition-[width] duration-700 ease-[var(--ease-out-ios)]"
                      style={{ width: `${step.effort}%` }}
                    />
                  </div>

                  <p className="text-ink-tertiary mt-2.5 text-[0.875rem] leading-relaxed">
                    {step.detail}
                  </p>

                  <p className="text-ink-quaternary mt-2 flex items-start gap-1.5 text-[0.8125rem] leading-relaxed">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    <span>{step.risk}</span>
                  </p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
