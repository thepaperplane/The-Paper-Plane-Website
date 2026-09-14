'use client';

import { useState, useTransition } from 'react';
import { Plus, X } from 'lucide-react';
import { addEngagement, removeEngagement } from '@/app/admin/clients/actions';
import { Pill } from '@/components/admin/ui';
import { PILLARS } from '@/content/services';

import type { EngagementRow } from '@/lib/database.types';

const STATE_TONE = {
  proposed: 'neutral',
  active: 'positive',
  paused: 'caution',
  completed: 'accent',
  cancelled: 'critical',
} as const;

/** Engagements are picked from the same service catalogue the public site
 *  renders, so the two can never drift apart. */
export function EngagementManager({
  clientId,
  engagements,
  editable,
}: {
  clientId: string;
  engagements: EngagementRow[];
  editable: boolean;
}) {
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState('');
  const [pending, startTransition] = useTransition();

  function add() {
    if (!selected) return;
    const [pillarId, serviceId] = selected.split('::');
    const pillar = PILLARS.find((p) => p.id === pillarId);
    const service = pillar?.services.find((s) => s.id === serviceId);
    if (!pillar || !service) return;

    startTransition(async () => {
      await addEngagement(clientId, service.id, service.title, pillar.id);
      setSelected('');
      setAdding(false);
    });
  }

  return (
    <div>
      {engagements.length === 0 ? (
        <p className="text-ink-3 px-6 py-5 text-[0.875rem]">
          No engagements recorded yet.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--hairline)]">
          {engagements.map((engagement) => (
            <li key={engagement.id} className="flex items-start gap-3 px-6 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-ink text-[0.875rem] font-medium">
                  {engagement.service_name}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Pill tone={STATE_TONE[engagement.state]}>{engagement.state}</Pill>
                  {engagement.fee_amount ? (
                    <span className="text-ink-3 text-[0.75rem] tabular-nums">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: engagement.fee_currency || 'INR',
                        maximumFractionDigits: 0,
                      }).format(engagement.fee_amount)}
                      {engagement.billing_cycle ? ` / ${engagement.billing_cycle}` : ''}
                    </span>
                  ) : null}
                </div>
              </div>

              {editable ? (
                <button
                  type="button"
                  disabled={pending}
                  onClick={() =>
                    startTransition(async () => {
                      await removeEngagement(clientId, engagement.id);
                    })
                  }
                  aria-label={`Remove ${engagement.service_name}`}
                  className="text-ink-3 hover:text-critical hover:bg-critical/10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {editable ? (
        <div className="border-t border-[var(--hairline)] px-6 py-4">
          {adding ? (
            <div className="flex flex-wrap gap-2">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                aria-label="Select a service"
                className="text-ink h-10 min-w-[12rem] flex-1 rounded-[var(--radius-sm)] bg-surface px-3 text-[0.875rem] ring-1 ring-[var(--hairline)] ring-inset outline-none"
              >
                <option value="">Select a service…</option>
                {PILLARS.map((pillar) => (
                  <optgroup key={pillar.id} label={pillar.title}>
                    {pillar.services.map((service) => (
                      <option key={service.id} value={`${pillar.id}::${service.id}`}>
                        {service.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <button
                type="button"
                onClick={add}
                disabled={!selected || pending}
                className="bg-accent hover:bg-accent-hover h-10 rounded-[var(--radius-sm)] px-4 text-[0.875rem] font-semibold text-accent-ink transition-colors disabled:opacity-50"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setAdding(false)}
                className="text-ink-3 hover:text-ink h-10 px-2 text-[0.875rem]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="text-accent hover:text-ink inline-flex items-center gap-1.5 text-[0.875rem] font-semibold"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
              Add engagement
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
