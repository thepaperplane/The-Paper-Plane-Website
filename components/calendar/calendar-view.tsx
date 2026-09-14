'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Repeat } from 'lucide-react';
import { Card } from '@/components/ui';
import {
  CATEGORY_STYLES,
  COMPLIANCE_EVENTS,
  MONTHS,
  eventsForMonth,
  type ComplianceCategory,
} from '@/content/calendar';
import { cn } from '@/lib/utils';

const CATEGORIES: ComplianceCategory[] = ['Income Tax', 'GST', 'Payroll', 'Audit', 'MCA'];

export function CalendarView({ initialMonth }: { initialMonth: number }) {
  const [month, setMonth] = useState(initialMonth);
  const [filter, setFilter] = useState<ComplianceCategory | 'all'>('all');

  const events = useMemo(() => {
    const forMonth = eventsForMonth(month);
    return filter === 'all' ? forMonth : forMonth.filter((e) => e.category === filter);
  }, [month, filter]);

  const counts = useMemo(() => {
    const forMonth = eventsForMonth(month);
    return CATEGORIES.reduce<Record<string, number>>((acc, category) => {
      acc[category] = forMonth.filter((e) => e.category === category).length;
      return acc;
    }, {});
  }, [month]);

  const step = (delta: number) => setMonth((m) => ((m - 1 + delta + 12) % 12) + 1);

  return (
    <div>
      {/* Month control */}
      <Card className="bg-surface p-2">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous month"
            className="text-ink-2 hover:text-ink hover:bg-sunken flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] transition-colors"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>

          <div className="scroll-lane no-scrollbar flex flex-1 justify-start gap-1 sm:justify-center">
            {MONTHS.map((name, index) => {
              const value = index + 1;
              const selected = value === month;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setMonth(value)}
                  aria-current={selected ? 'true' : undefined}
                  className={cn(
                    'shrink-0 rounded-[var(--radius-sm)] px-3.5 py-2 text-[0.875rem] font-medium transition-all duration-300 ease-[var(--ease-out-editorial)]',
                    selected
                      ? 'bg-accent text-accent-ink shadow-[var(--shadow-soft)]'
                      : 'text-ink-2 hover:text-ink hover:bg-sunken',
                  )}
                >
                  <span className="sm:hidden">{name.slice(0, 3)}</span>
                  <span className="hidden sm:inline">{name.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next month"
            className="text-ink-2 hover:text-ink hover:bg-sunken flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] transition-colors"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </Card>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={cn(
            'rounded-full px-4 py-2.5 text-[0.8125rem] font-medium transition-colors sm:px-3.5 sm:py-1.5',
            filter === 'all'
              ? 'bg-ink text-ground'
              : 'text-ink-2 hover:text-ink bg-surface ring-1 ring-[var(--hairline)] ring-inset',
          )}
        >
          All ({eventsForMonth(month).length})
        </button>
        {CATEGORIES.map((category) => {
          const style = CATEGORY_STYLES[category];
          const count = counts[category] ?? 0;
          const selected = filter === category;
          return (
            <button
              key={category}
              type="button"
              disabled={count === 0}
              onClick={() => setFilter(category)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[0.8125rem] font-medium transition-colors disabled:opacity-35 sm:px-3.5 sm:py-1.5',
                selected
                  ? 'bg-ink text-ground'
                  : 'text-ink-2 hover:text-ink bg-surface ring-1 ring-[var(--hairline)] ring-inset',
              )}
            >
              <span
                className={cn('h-1.5 w-1.5 rounded-full', selected ? 'bg-surface' : style.dot)}
              />
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="mt-8" aria-live="polite">
        <h3 className="text-ink-3 text-[0.75rem] font-semibold tracking-[0.06em] uppercase">
          {MONTHS[month - 1]} — {events.length} {events.length === 1 ? 'deadline' : 'deadlines'}
        </h3>

        {events.length === 0 ? (
          <Card className="mt-4 bg-surface p-8 text-center">
            <p className="text-ink-3 text-[0.9375rem]">
              No deadlines in this category for {MONTHS[month - 1]}.
            </p>
          </Card>
        ) : (
          <ol className="mt-4 space-y-3">
            {events.map((event) => {
              const style = CATEGORY_STYLES[event.category];
              return (
                <li key={`${event.id}-${month}`}>
                  <Card interactive className="bg-surface p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      {/* Date chip */}
                      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:gap-1">
                        <span className="bg-sunken text-ink flex h-14 w-14 flex-col items-center justify-center rounded-[var(--radius-md)]">
                          <span className="text-[1.25rem] leading-none font-semibold tabular-nums">
                            {event.day}
                          </span>
                          <span className="text-ink-3 mt-0.5 text-[0.625rem] font-medium">
                            {MONTHS[month - 1].slice(0, 3)}
                          </span>
                        </span>
                        {event.cadence === 'monthly' ? (
                          <span className="text-ink-3 inline-flex items-center gap-1 text-[0.6875rem] font-medium">
                            <Repeat className="h-3 w-3" strokeWidth={2.2} />
                            Monthly
                          </span>
                        ) : null}
                      </div>

                      {/* Detail */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ring-1 ring-inset',
                              style.chip,
                            )}
                          >
                            {event.category}
                          </span>
                          <span className="text-ink-3 text-[0.75rem]">
                            {event.appliesTo}
                          </span>
                        </div>

                        <h4 className="text-ink mt-2.5 text-[1.0625rem] leading-snug font-semibold">
                          {event.title}
                        </h4>
                        <p className="text-ink-3 mt-2 text-[0.9375rem] leading-relaxed">
                          {event.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--hairline)] pt-3.5">
                          <span className="text-ink-3 font-[family-name:var(--font-mono)] text-[0.75rem]">
                            {event.statute}
                          </span>
                          {event.penalty ? (
                            <span className="text-critical text-[0.75rem] font-medium">
                              {event.penalty}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* Download */}
      <div className="mt-8">
        <a
          href="/api/calendar/ics"
          className="text-ink inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] bg-surface px-5 text-[0.9375rem] font-semibold shadow-[var(--shadow-soft)] ring-1 ring-[var(--hairline)] ring-inset transition-all hover:shadow-[var(--shadow-soft)]"
          download="paper-plane-compliance-calendar.ics"
        >
          <CalendarDays className="h-4 w-4" strokeWidth={2} />
          Add every date to your calendar
        </a>
        <p className="text-ink-3 mt-2.5 text-[0.8125rem]">
          Downloads an .ics file with all {COMPLIANCE_EVENTS.length} statutory dates and
          reminders set three days ahead.
        </p>
      </div>
    </div>
  );
}
