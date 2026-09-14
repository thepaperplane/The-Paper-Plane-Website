'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Clock, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge, Card } from '@/components/ui';
import { DECODER, type DecoderEntry } from '@/content/knowledge';
import { cn } from '@/lib/utils';

const SEVERITY: Record<
  DecoderEntry['severity'],
  { label: string; tone: 'neutral' | 'caution' | 'critical' }
> = {
  routine: { label: 'Routine', tone: 'neutral' },
  attention: { label: 'Needs attention', tone: 'caution' },
  urgent: { label: 'Time critical', tone: 'critical' },
};

export function DecoderSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DECODER;
    return DECODER.filter((entry) =>
      [entry.key, entry.title, entry.act, entry.plainEnglish]
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  return (
    <div>
      {/* Search field */}
      <div className="relative max-w-md">
        <Search
          className="text-ink-3 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
          strokeWidth={2}
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 148, 143(1), GSTR-2B…"
          aria-label="Search sections and forms"
          className="text-ink placeholder:text-ink-3 focus:ring-accent h-12 w-full rounded-[var(--radius-md)] bg-surface pr-4 pl-11 text-[0.9375rem] shadow-[var(--shadow-soft)] ring-1 ring-[var(--hairline)] transition-shadow ring-inset outline-none focus:ring-2"
        />
      </div>

      {/* Quick chips */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {DECODER.map((entry) => (
          <button
            key={entry.key}
            type="button"
            onClick={() => setQuery(entry.key)}
            className={cn(
              'rounded-full px-3.5 py-2.5 text-[0.8125rem] font-medium transition-colors sm:px-3 sm:py-1.5',
              query.trim().toLowerCase() === entry.key.toLowerCase()
                ? 'bg-accent text-accent-ink'
                : 'text-ink-2 hover:text-ink bg-surface ring-1 ring-[var(--hairline)] ring-inset',
            )}
          >
            {entry.key}
          </button>
        ))}
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-ink-3 hover:text-ink px-3 py-1.5 text-[0.8125rem] font-medium underline underline-offset-4"
          >
            Clear
          </button>
        ) : null}
      </div>

      {/* Results */}
      <div aria-live="polite" className="mt-7">
        {results.length === 0 ? (
          <Card className="bg-surface p-8 text-center">
            <p className="text-ink text-[1.0625rem] font-medium">
              Nothing matching “{query}” yet
            </p>
            <p className="text-ink-3 mt-2 text-[0.9375rem]">
              This decoder covers the provisions we see most often. Send us the notice and we
              will read it properly.
            </p>
            <Link
              href="/contact"
              className="text-accent hover:text-ink mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold"
            >
              Ask us about it
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </Card>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {results.map((entry) => {
              const severity = SEVERITY[entry.severity];
              return (
                <li key={entry.key}>
                  <Card className="h-full bg-surface p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-ink text-[1.0625rem] leading-snug font-semibold">
                          {entry.title}
                        </h3>
                        <p className="text-ink-3 mt-1 text-[0.8125rem]">{entry.act}</p>
                      </div>
                      <Badge tone={severity.tone} className="shrink-0">
                        {severity.label}
                      </Badge>
                    </div>

                    <p className="text-ink-2 mt-4 text-[0.9375rem] leading-relaxed">
                      {entry.plainEnglish}
                    </p>

                    <div className="bg-sunken mt-5 rounded-[var(--radius-md)] p-4">
                      <p className="text-ink-3 text-[0.75rem] font-semibold tracking-[0.05em] uppercase">
                        What to do
                      </p>
                      <p className="text-ink mt-1.5 text-[0.875rem] leading-relaxed">
                        {entry.whatToDo}
                      </p>
                    </div>

                    <p className="text-ink-3 mt-4 flex items-center gap-2 text-[0.8125rem]">
                      <Clock className="text-accent h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                      {entry.clock}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
