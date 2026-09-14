import { Users } from 'lucide-react';
import { DataTable, EmptyState, PageHeader, Panel, Pill } from '@/components/admin/ui';
import { requireProfile, canAdminister } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import type { ProfileRow } from '@/lib/database.types';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Team' };

const ROLE_TONE = {
  owner: 'brand',
  admin: 'success',
  editor: 'neutral',
  viewer: 'neutral',
} as const;

const ROLE_DESCRIPTION: Record<string, string> = {
  owner: 'Full access, including managing team roles.',
  admin: 'Everything except changing other people’s roles.',
  editor: 'Can create and edit clients, content and portfolio entries.',
  viewer: 'Read-only access to the console.',
};

export default async function TeamPage() {
  const profile = await requireProfile();
  const supabase = serviceClient();

  let members: ProfileRow[] = [];
  if (supabase) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true });
    members = data ?? [];
  }

  return (
    <>
      <PageHeader
        title="Team"
        description="Who can reach the console, and what they are allowed to do."
      />

      <Panel title={`Members (${members.length})`}>
        {members.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No team members"
            description={
              supabase
                ? 'Invite users from the Supabase dashboard under Authentication → Users. The first account created becomes the owner.'
                : 'Set SUPABASE_SERVICE_ROLE_KEY to load the team.'
            }
          />
        ) : (
          <DataTable head={['Member', 'Role', 'State', 'Joined']} caption="Team members">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-sunken/60 transition-colors">
                <td className="px-6 py-3.5">
                  <span className="text-ink block text-[0.875rem] font-medium">
                    {member.full_name ?? member.email}
                    {member.id === profile.id ? (
                      <span className="text-ink-quaternary font-normal"> (you)</span>
                    ) : null}
                  </span>
                  <span className="text-ink-quaternary block text-[0.75rem]">{member.email}</span>
                </td>
                <td className="px-6 py-3.5">
                  <Pill tone={ROLE_TONE[member.role]}>{member.role}</Pill>
                </td>
                <td className="px-6 py-3.5">
                  <Pill tone={member.is_active ? 'success' : 'neutral'}>
                    {member.is_active ? 'active' : 'disabled'}
                  </Pill>
                </td>
                <td className="text-ink-quaternary px-6 py-3.5 text-[0.8125rem]">
                  {formatDate(member.created_at)}
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>

      <Panel className="mt-6" title="What each role can do">
        <dl className="divide-y divide-[var(--color-hairline)]">
          {Object.entries(ROLE_DESCRIPTION).map(([role, description]) => (
            <div key={role} className="flex items-start gap-4 px-6 py-3.5">
              <dt className="w-20 shrink-0">
                <Pill tone={ROLE_TONE[role as keyof typeof ROLE_TONE]}>{role}</Pill>
              </dt>
              <dd className="text-ink-tertiary text-[0.875rem] leading-relaxed">{description}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      {canAdminister(profile.role) ? (
        <p className="text-ink-quaternary mt-5 max-w-3xl text-[0.8125rem] leading-relaxed">
          New accounts are created from the Supabase dashboard (Authentication → Users). A profile
          row is generated automatically on first sign-in, defaulting to viewer. Roles are changed
          in the <code className="bg-white rounded px-1">profiles</code> table, and only an owner
          can change them.
        </p>
      ) : null}
    </>
  );
}
