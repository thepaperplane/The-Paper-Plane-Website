import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ClientForm } from '@/components/admin/client-form';
import { PageHeader, Panel } from '@/components/admin/ui';
import { requireRole } from '@/lib/auth';

export const metadata = { title: 'New client' };

export default async function NewClientPage() {
  await requireRole('editor');

  return (
    <>
      <Link
        href="/admin/clients"
        className="text-ink-tertiary hover:text-ink mb-5 inline-flex items-center gap-1.5 text-[0.875rem] font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
        Clients
      </Link>

      <PageHeader
        title="Add a client"
        description="Creating a client also seeds the standard onboarding checklist, so nothing in the first month is left to memory."
      />

      <Panel className="max-w-3xl">
        <ClientForm />
      </Panel>
    </>
  );
}
