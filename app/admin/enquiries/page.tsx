import { Inbox } from 'lucide-react';
import { EnquiryCard } from '@/components/admin/enquiry-card';
import { EmptyState, PageHeader, Panel } from '@/components/admin/ui';
import { requireProfile, canEdit } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import type { EnquiryRow, EnquiryState } from '@/lib/database.types';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Enquiries' };

const FILTERS = [
  { value: '', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'archived', label: 'Archived' },
  { value: 'spam', label: 'Spam' },
] as const;

const ENQUIRY_STATES: EnquiryState[] = [
  'new',
  'contacted',
  'qualified',
  'converted',
  'archived',
  'spam',
];

/** Search params are untrusted input; only a known enum value reaches the query. */
function asEnquiryState(value: string | undefined): EnquiryState | null {
  return value && (ENQUIRY_STATES as string[]).includes(value) ? (value as EnquiryState) : null;
}

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const profile = await requireProfile();
  const { state } = await searchParams;
  const supabase = serviceClient();

  let enquiries: EnquiryRow[] = [];

  if (supabase) {
    let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    const validState = asEnquiryState(state);
    if (validState) query = query.eq('state', validState);
    const { data } = await query.limit(150);
    enquiries = data ?? [];
  }

  return (
    <>
      <PageHeader
        title="Enquiries"
        description="Messages submitted through the website contact form."
      />

      <nav aria-label="Filter enquiries" className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const active = (state ?? '') === filter.value;
          return (
            <a
              key={filter.label}
              href={filter.value ? `/admin/enquiries?state=${filter.value}` : '/admin/enquiries'}
              className={
                active
                  ? 'bg-ink rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium text-white'
                  : 'text-ink-secondary hover:text-ink rounded-full bg-white px-3.5 py-1.5 text-[0.8125rem] font-medium ring-1 ring-[var(--color-hairline)] ring-inset'
              }
            >
              {filter.label}
            </a>
          );
        })}
      </nav>

      {enquiries.length === 0 ? (
        <Panel>
          <EmptyState
            icon={Inbox}
            title={state ? 'Nothing in this state' : 'No enquiries yet'}
            description={
              supabase
                ? 'Contact form submissions appear here as soon as they arrive.'
                : 'Set SUPABASE_SERVICE_ROLE_KEY to load enquiries.'
            }
          />
        </Panel>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enquiry) => (
            <EnquiryCard
              key={enquiry.id}
              enquiry={enquiry}
              editable={canEdit(profile.role)}
            />
          ))}
        </div>
      )}
    </>
  );
}
