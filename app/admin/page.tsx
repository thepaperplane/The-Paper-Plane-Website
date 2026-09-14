import Link from 'next/link';
import { ArrowUpRight, Inbox, Mail, TriangleAlert } from 'lucide-react';
import { DataTable, EmptyState, PageHeader, Panel, Pill, Stat } from '@/components/admin/ui';
import { requireProfile } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import { formatRelative } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const ENQUIRY_TONE = {
  new: 'accent',
  contacted: 'neutral',
  qualified: 'positive',
  converted: 'positive',
  archived: 'neutral',
  spam: 'critical',
} as const;

export default async function AdminOverview({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const profile = await requireProfile();
  const { denied } = await searchParams;
  const supabase = serviceClient();

  const stats = { clients: 0, leads: 0, enquiries: 0, subscribers: 0, news: 0, feedErrors: 0 };
  let recentEnquiries: {
    id: string;
    name: string;
    email: string;
    state: keyof typeof ENQUIRY_TONE;
    created_at: string;
  }[] = [];

  if (supabase) {
    const [clients, leads, enquiries, subscribers, news, brokenFeeds, recent] = await Promise.all([
      supabase.from('clients').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('clients').select('id', { count: 'exact', head: true }).eq('status', 'lead'),
      supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('state', 'new'),
      supabase
        .from('subscribers')
        .select('id', { count: 'exact', head: true })
        .eq('state', 'confirmed'),
      supabase.from('news_items').select('id', { count: 'exact', head: true }),
      supabase
        .from('news_sources')
        .select('id', { count: 'exact', head: true })
        .gt('error_count', 0),
      supabase
        .from('enquiries')
        .select('id, name, email, state, created_at')
        .order('created_at', { ascending: false })
        .limit(6),
    ]);

    stats.clients = clients.count ?? 0;
    stats.leads = leads.count ?? 0;
    stats.enquiries = enquiries.count ?? 0;
    stats.subscribers = subscribers.count ?? 0;
    stats.news = news.count ?? 0;
    stats.feedErrors = brokenFeeds.count ?? 0;
    recentEnquiries = (recent.data ?? []) as typeof recentEnquiries;
  }

  const firstName = (profile.full_name ?? profile.email).split(/[\s@]/)[0];

  return (
    <>
      <PageHeader
        title={`Good to see you, ${firstName}`}
        description="Everything the practice runs on the website — clients, enquiries, subscribers and published content."
      />

      {denied ? (
        <div className="bg-warning-soft ring-warning/20 mb-6 flex items-start gap-3 rounded-[var(--radius-md)] p-4 ring-1 ring-inset">
          <TriangleAlert className="text-warning mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
          <p className="text-ink-secondary text-[0.875rem]">
            You do not have permission to open that section. Ask an owner to raise your role.
          </p>
        </div>
      ) : null}

      {!supabase ? (
        <div className="bg-warning-soft ring-warning/20 mb-6 rounded-[var(--radius-md)] p-4 ring-1 ring-inset">
          <p className="text-ink text-[0.875rem] font-medium">Service key not configured</p>
          <p className="text-ink-secondary mt-1 text-[0.8125rem] leading-relaxed">
            Counts and lists below stay empty until{' '}
            <code className="rounded bg-white/60 px-1">SUPABASE_SERVICE_ROLE_KEY</code> is set.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active clients" value={stats.clients} tone="accent" />
        <Stat label="Open leads" value={stats.leads} />
        <Stat
          label="New enquiries"
          value={stats.enquiries}
          tone={stats.enquiries > 0 ? 'caution' : 'neutral'}
          hint={stats.enquiries > 0 ? 'Awaiting a first reply' : 'Nothing waiting'}
        />
        <Stat label="Calendar subscribers" value={stats.subscribers} tone="positive" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel
          title="Recent enquiries"
          description="Straight from the website contact form."
          action={
            <Link
              href="/admin/enquiries"
              className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 text-[0.8125rem] font-semibold"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          {recentEnquiries.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No enquiries yet"
              description="Messages sent through the contact form land here."
            />
          ) : (
            <DataTable head={['Name', 'Email', 'Status', 'Received']} caption="Recent enquiries">
              {recentEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-sunken/60 transition-colors">
                  <td className="px-6 py-3.5">
                    <Link
                      href={`/admin/enquiries#${enquiry.id}`}
                      className="text-ink hover:text-brand-700 text-[0.875rem] font-medium"
                    >
                      {enquiry.name}
                    </Link>
                  </td>
                  <td className="text-ink-tertiary px-6 py-3.5 text-[0.875rem]">{enquiry.email}</td>
                  <td className="px-6 py-3.5">
                    <Pill tone={ENQUIRY_TONE[enquiry.state] ?? 'neutral'}>{enquiry.state}</Pill>
                  </td>
                  <td className="text-ink-quaternary px-6 py-3.5 text-[0.8125rem]">
                    {formatRelative(enquiry.created_at)}
                  </td>
                </tr>
              ))}
            </DataTable>
          )}
        </Panel>

        <div className="space-y-6">
          <Panel title="Content health">
            <div className="space-y-3 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-ink-tertiary text-[0.875rem]">News items cached</span>
                <span className="text-ink text-[0.875rem] font-semibold tabular-nums">
                  {stats.news}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-tertiary text-[0.875rem]">Feeds with errors</span>
                {stats.feedErrors > 0 ? (
                  <Pill tone="critical">{stats.feedErrors} failing</Pill>
                ) : (
                  <Pill tone="positive">All healthy</Pill>
                )}
              </div>
              <Link
                href="/admin/news"
                className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1 pt-1 text-[0.8125rem] font-semibold"
              >
                Manage feeds
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Panel>

          <Panel title="Quick actions">
            <nav className="divide-y divide-[var(--color-hairline)]">
              {[
                { href: '/admin/clients/new', label: 'Add a client', icon: Inbox },
                { href: '/admin/portfolio', label: 'Add a portfolio site', icon: ArrowUpRight },
                { href: '/admin/subscribers', label: 'Review subscribers', icon: Mail },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:bg-sunken flex items-center justify-between px-6 py-3.5 transition-colors"
                >
                  <span className="text-ink text-[0.875rem] font-medium">{item.label}</span>
                  <ArrowUpRight className="text-ink-quaternary h-3.5 w-3.5" />
                </Link>
              ))}
            </nav>
          </Panel>
        </div>
      </div>
    </>
  );
}
