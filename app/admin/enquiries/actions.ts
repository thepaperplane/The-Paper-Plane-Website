'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import type { EnquiryState } from '@/lib/database.types';

export async function setEnquiryState(id: string, state: EnquiryState): Promise<void> {
  await requireRole('editor');

  const supabase = serviceClient();
  if (!supabase) return;

  await supabase.from('enquiries').update({ state }).eq('id', id);
  revalidatePath('/admin/enquiries');
  revalidatePath('/admin');
}

export async function saveEnquiryNote(id: string, note: string): Promise<void> {
  await requireRole('editor');

  const supabase = serviceClient();
  if (!supabase) return;

  await supabase
    .from('enquiries')
    .update({ internal_note: note.slice(0, 4000) || null })
    .eq('id', id);

  revalidatePath('/admin/enquiries');
}

/**
 * Promote an enquiry into a client record, carrying the contact details
 * across and seeding the standard onboarding checklist.
 */
export async function convertEnquiryToClient(
  id: string,
): Promise<{ ok: boolean; message: string; clientId?: string }> {
  await requireRole('editor');

  const supabase = serviceClient();
  if (!supabase) return { ok: false, message: 'Supabase service key is not configured.' };

  const { data: enquiry } = await supabase.from('enquiries').select('*').eq('id', id).maybeSingle();

  if (!enquiry) return { ok: false, message: 'Enquiry not found.' };
  if (enquiry.client_id) return { ok: false, message: 'Already linked to a client.' };

  const { data: client, error } = await supabase
    .from('clients')
    .insert({
      name: enquiry.company || enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      status: 'lead',
      entity_type: 'other',
      source: 'Website enquiry',
      notes: enquiry.message,
    })
    .select('id')
    .single();

  if (error) return { ok: false, message: `Could not create client: ${error.message}` };

  await supabase.rpc('seed_onboarding', { target_client: client.id });

  await supabase
    .from('enquiries')
    .update({ client_id: client.id, state: 'converted' })
    .eq('id', id);

  revalidatePath('/admin/enquiries');
  revalidatePath('/admin/clients');

  return { ok: true, message: 'Client created.', clientId: client.id };
}
