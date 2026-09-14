import { AlertCircle, Newspaper } from 'lucide-react';
import { DataTable, EmptyState, PageHeader, Panel, Pill, Stat } from '@/components/admin/ui';
import { requireProfile } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import type { NewsItemRow, NewsSourceRow } from '@/lib/database.types';
import { formatRelative } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'News feeds' };

export default async function AdminNewsPage() {
  await requireProfile();
  const supabase = serviceClient();

  let sources: NewsSourceRow[] = [];
  let recent: NewsItemRow[] = [];
  let total = 0;

  if (supabase) {
    const [{ data: s }, { data: r }, { count }] = await Promise.all([
      supabase.from('news_sources').select('*').order('name'),
      supabase.from('news_items').select('*').order('published_at', { ascending: false }).limit(15),
      supabase.from('news_items').select('id', { count: 'exact', head: true }),
    ]);

    sources = s ?? [];
    recent = r ?? [];
    total = count ?? 0;
  }

  const healthy = sources.filter((s) => s.is_active && !s.last_error).length;
  const failing = sources.filter((s) => s.last_error).length;
  const neverFetched = sources.filter((s) => !s.last_fetched_at).length;

  return (
    <>
      <PageHeader
        title="News feeds"
        description="Sources polled once a day. Headlines and summaries are cached and always link back to the publisher — full articles are never republished."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active sources" value={sources.filter((s) => s.is_active).length} />
        <Stat label="Healthy" value={healthy} tone="positive" />
        <Stat
          label="Failing"
          value={failing}
          tone={failing > 0 ? 'critical' : 'neutral'}
          hint={failing > 0 ? 'See the error column below' : undefined}
        />
        <Stat label="Cached headlines" value={total} tone="accent" hint="90-day retention" />
      </div>

      {neverFetched === sources.length && sources.length > 0 ? (
        <div className="bg-warning-soft ring-warning/20 mt-6 flex items-start gap-3 rounded-[var(--radius-md)] p-4 ring-1 ring-inset">
          <AlertCircle className="text-warning mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
          <div>
            <p className="text-ink text-[0.875rem] font-medium">No feed has been polled yet</p>
            <p className="text-ink-secondary mt-1 text-[0.8125rem] leading-relaxed">
              The daily job runs on Vercel Cron. Trigger it manually with{' '}
              <code className="rounded bg-white/60 px-1">
                curl -H &quot;Authorization: Bearer $CRON_SECRET&quot;
                https://your-domain/api/cron/news
              </code>
            </p>
          </div>
        </div>
      ) : null}

      <Panel className="mt-6" title={`Sources (${sources.length})`}>
        {sources.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title="No sources configured"
            description={
              supabase
                ? 'Add rows to news_sources to start aggregating.'
                : 'Set SUPABASE_SERVICE_ROLE_KEY to load sources.'
            }
          />
        ) : (
          <DataTable
            head={['Source', 'Category', 'State', 'Last fetched', 'Fetches', 'Last error']}
            caption="News sources"
          >
            {sources.map((source) => (
              <tr key={source.id} className="hover:bg-sunken/60 transition-colors">
                <td className="px-6 py-3.5">
                  <span className="text-ink block text-[0.875rem] font-medium">{source.name}</span>
                  <span className="text-ink-quaternary block max-w-[18rem] truncate text-[0.75rem]">
                    {source.feed_url}
                  </span>
                </td>
                <td className="text-ink-tertiary px-6 py-3.5 text-[0.8125rem]">
                  {source.category}
                </td>
                <td className="px-6 py-3.5">
                  {!source.is_active ? (
                    <Pill tone="neutral">paused</Pill>
                  ) : source.last_error ? (
                    <Pill tone="critical">failing</Pill>
                  ) : source.last_fetched_at ? (
                    <Pill tone="positive">healthy</Pill>
                  ) : (
                    <Pill tone="caution">never run</Pill>
                  )}
                </td>
                <td className="text-ink-quaternary px-6 py-3.5 text-[0.8125rem]">
                  {source.last_fetched_at ? formatRelative(source.last_fetched_at) : '—'}
                </td>
                <td className="text-ink-tertiary px-6 py-3.5 text-[0.8125rem] tabular-nums">
                  {source.fetch_count}
                  {source.error_count > 0 ? (
                    <span className="text-danger"> / {source.error_count} failed</span>
                  ) : null}
                </td>
                <td className="text-danger max-w-[16rem] px-6 py-3.5 text-[0.75rem]">
                  {source.last_error ? (
                    <span className="line-clamp-2">{source.last_error}</span>
                  ) : (
                    <span className="text-ink-quaternary">—</span>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>

      <Panel className="mt-6" title="Latest headlines" description="Most recent 15 cached items.">
        {recent.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title="Nothing cached yet"
            description="Headlines appear after the first successful run of the daily job."
          />
        ) : (
          <ul className="divide-y divide-[var(--color-hairline)]">
            {recent.map((item) => (
              <li key={item.id} className="px-6 py-3.5">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-ink hover:text-brand-700 block text-[0.875rem] font-medium transition-colors"
                >
                  {item.title}
                </a>
                <p className="text-ink-quaternary mt-1 text-[0.75rem]">
                  {item.source_name} · {item.category} · {formatRelative(item.published_at)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
