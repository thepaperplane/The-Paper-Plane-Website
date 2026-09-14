import { ExternalLink, MonitorSmartphone } from 'lucide-react';
import { AddProjectForm } from '@/components/admin/add-project-form';
import { ProjectRow } from '@/components/admin/project-row';
import { EmptyState, PageHeader, Panel } from '@/components/admin/ui';
import { requireProfile, canEdit } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import type { ProjectRow as Project } from '@/lib/database.types';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Portfolio' };

export default async function AdminPortfolioPage() {
  const profile = await requireProfile();
  const editable = canEdit(profile.role);

  const supabase = serviceClient();
  let projects: Project[] = [];

  if (supabase) {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('position', { ascending: true });
    projects = data ?? [];
  }

  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Paste a client's website address and the system checks it is reachable, captures desktop and mobile previews, and publishes the side-by-side mockup to the public work page — no deploy required."
      />

      {editable ? (
        <Panel
          title="Add a site"
          description="One URL is enough. Everything else is optional."
          className="mb-6"
        >
          <AddProjectForm />
        </Panel>
      ) : null}

      <Panel
        title={`Projects (${projects.length})`}
        description="Drag-free ordering by position. Live projects appear on /work; staged ones stay hidden until captured."
      >
        {projects.length === 0 ? (
          <EmptyState
            icon={MonitorSmartphone}
            title="No projects yet"
            description={
              supabase
                ? 'Add a client site above to generate its preview.'
                : 'Set SUPABASE_SERVICE_ROLE_KEY to load projects.'
            }
          />
        ) : (
          <ul className="divide-y divide-[var(--color-hairline)]">
            {projects.map((project) => (
              <ProjectRow key={project.id} project={project} editable={editable} />
            ))}
          </ul>
        )}
      </Panel>

      <p className="text-ink-quaternary mt-5 flex items-start gap-2 text-[0.8125rem] leading-relaxed">
        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
        <span>
          Previews are captured images rather than live iframes. Most client sites send
          frame-blocking headers, so an embedded live view would render an empty box — captures look
          identical, load far faster, and keep working regardless of the client&rsquo;s header
          policy.
        </span>
      </p>
    </>
  );
}
