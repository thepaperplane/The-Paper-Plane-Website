import { FileText } from 'lucide-react';
import { ContentEditor } from '@/components/admin/content-editor';
import { EmptyState, PageHeader, Panel } from '@/components/admin/ui';
import { requireProfile, canEdit } from '@/lib/auth';
import { CONTENT_DEFAULTS, CONTENT_PAGES, loadContent, type ContentKey } from '@/lib/content';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Content' };

const PAGE_LABEL: Record<string, string> = {
  home: 'Home',
  knowledge: 'Knowledge Corner',
  calendar: 'Compliance Calendar',
  work: 'Work',
  about: 'About',
  contact: 'Contact',
};

export default async function AdminContentPage() {
  const profile = await requireProfile();
  const editable = canEdit(profile.role);
  const overrides = await loadContent();

  const entries = Object.entries(CONTENT_DEFAULTS) as [
    ContentKey,
    (typeof CONTENT_DEFAULTS)[ContentKey],
  ][];

  return (
    <>
      <PageHeader
        title="Site content"
        description="Edit the headlines and supporting copy on the public site without touching the codebase. Clearing a field restores the built-in default, so the site can never end up with an empty heading."
      />

      {entries.length === 0 ? (
        <Panel>
          <EmptyState icon={FileText} title="No editable blocks defined" />
        </Panel>
      ) : (
        <div className="space-y-6">
          {CONTENT_PAGES.map((page) => {
            const pageEntries = entries.filter(([, def]) => def.page === page);
            if (pageEntries.length === 0) return null;

            return (
              <Panel
                key={page}
                title={PAGE_LABEL[page] ?? page}
                description={`/${page === 'home' ? '' : page}`}
              >
                <div className="divide-y divide-[var(--color-hairline)]">
                  {pageEntries.map(([key, def]) => (
                    <ContentEditor
                      key={key}
                      contentKey={key}
                      label={def.label}
                      defaultValue={def.value}
                      currentValue={overrides[key] ?? ''}
                      editable={editable}
                    />
                  ))}
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </>
  );
}
