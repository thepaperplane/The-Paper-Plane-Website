import { Mail } from 'lucide-react';
import { DataTable, EmptyState, PageHeader, Panel, Pill, Stat } from '@/components/admin/ui';
import { requireProfile } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import type { SubscriberRow } from '@/lib/database.types';
import { formatDate, formatRelative } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Subscribers' };

const STATE_TONE = {
  confirmed: 'positive',
  pending: 'caution',
  unsubscribed: 'neutral',
  bounced: 'critical',
} as const;

export default async function SubscribersPage() {
  await requireProfile();
  const supabase = serviceClient();

  let subscribers: SubscriberRow[] = [];
  let lastSend: { period: string; count: number } | null = null;

  if (supabase) {
    const [{ data }, { data: sends }] = await Promise.all([
      supabase.from('subscribers').select('*').order('created_at', { ascending: false }).limit(300),
      supabase
        .from('calendar_sends')
        .select('period')
        .eq('status', 'sent')
        .order('period', { ascending: false })
        .limit(500),
    ]);

    subscribers = data ?? [];

    if (sends?.length) {
      const latest = sends[0].period;
      lastSend = { period: latest, count: sends.filter((s) => s.period === latest).length };
    }
  }

  const confirmed = subscribers.filter((s) => s.state === 'confirmed').length;
  const unsubscribed = subscribers.filter((s) => s.state === 'unsubscribed').length;

  const bySegment = {
    business: subscribers.filter((s) => s.segment === 'business' && s.state === 'confirmed').length,
    professional: subscribers.filter((s) => s.segment === 'professional' && s.state === 'confirmed')
      .length,
    individual: subscribers.filter((s) => s.segment === 'individual' && s.state === 'confirmed')
      .length,
  };

  return (
    <>
      <PageHeader
        title="Calendar subscribers"
        description="Everyone receiving the monthly compliance calendar. The send runs automatically on the first of each month."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Confirmed" value={confirmed} tone="positive" />
        <Stat label="Businesses" value={bySegment.business} />
        <Stat label="Professionals" value={bySegment.professional} />
        <Stat
          label="Unsubscribed"
          value={unsubscribed}
          hint={
            lastSend
              ? `Last send ${formatDate(lastSend.period)} to ${lastSend.count}`
              : 'No sends recorded yet'
          }
        />
      </div>

      <Panel className="mt-6" title={`All subscribers (${subscribers.length})`}>
        {subscribers.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No subscribers yet"
            description={
              supabase
                ? 'Sign-ups from the compliance calendar page appear here.'
                : 'Set SUPABASE_SERVICE_ROLE_KEY to load subscribers.'
            }
          />
        ) : (
          <DataTable
            head={['Email', 'Name', 'Segment', 'State', 'Sends', 'Joined']}
            caption="Calendar subscribers"
          >
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-sunken/60 transition-colors">
                <td className="px-6 py-3.5">
                  <a
                    href={`mailto:${subscriber.email}`}
                    className="text-ink hover:text-brand-700 text-[0.875rem] font-medium"
                  >
                    {subscriber.email}
                  </a>
                </td>
                <td className="text-ink-tertiary px-6 py-3.5 text-[0.8125rem]">
                  {subscriber.name ?? '—'}
                </td>
                <td className="text-ink-tertiary px-6 py-3.5 text-[0.8125rem] capitalize">
                  {subscriber.segment}
                </td>
                <td className="px-6 py-3.5">
                  <Pill tone={STATE_TONE[subscriber.state]}>{subscriber.state}</Pill>
                </td>
                <td className="text-ink-tertiary px-6 py-3.5 text-[0.8125rem] tabular-nums">
                  {subscriber.send_count}
                </td>
                <td className="text-ink-quaternary px-6 py-3.5 text-[0.8125rem]">
                  {formatRelative(subscriber.created_at)}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>

      <p className="text-ink-quaternary mt-5 max-w-3xl text-[0.8125rem] leading-relaxed">
        Sends are idempotent: a unique constraint on (subscriber, month) means a retried or
        duplicated cron run cannot deliver the same edition twice. Every email carries a one-click
        unsubscribe header as well as a link.
      </p>
    </>
  );
}
