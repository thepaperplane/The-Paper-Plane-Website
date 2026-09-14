'use server';

import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth';
import { serviceClient } from '@/lib/supabase';
import { CONTENT_DEFAULTS, type ContentKey } from '@/lib/content';

export type ContentResult = { ok: boolean; message: string };

/**
 * Save an override for one content key.
 *
 * An empty value deletes the row rather than storing "", so the built-in
 * default takes over again and the site can never render a blank heading.
 */
export async function saveContentBlock(key: ContentKey, value: string): Promise<ContentResult> {
  await requireRole('editor');

  const definition = CONTENT_DEFAULTS[key];
  if (!definition) return { ok: false, message: 'Unknown content key.' };

  const supabase = serviceClient();
  if (!supabase) return { ok: false, message: 'Supabase service key is not configured.' };

  // `page.slot` — slot may itself contain dots (e.g. "hero.title").
  const [page, ...slotParts] = key.split('.');
  const slot = slotParts.join('.');

  const trimmed = value.trim();

  if (!trimmed) {
    const { error } = await supabase
      .from('content_blocks')
      .delete()
      .eq('page', page)
      .eq('slot', slot);

    if (error) return { ok: false, message: error.message };

    revalidatePath('/', 'layout');
    return { ok: true, message: 'Reset to the default.' };
  }

  const { error } = await supabase.from('content_blocks').upsert(
    {
      page,
      slot,
      label: definition.label,
      kind: 'text',
      value: trimmed,
      is_published: true,
    },
    { onConflict: 'page,slot' },
  );

  if (error) return { ok: false, message: error.message };

  revalidatePath('/', 'layout');
  return { ok: true, message: 'Saved and published.' };
}
