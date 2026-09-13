import { z } from 'zod';
import { apiError, apiOk, clientIp, rateLimit, readJson } from '@/lib/api';
import { serviceClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SubscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(320),
  name: z.string().trim().max(120).optional(),
  segment: z.enum(['business', 'professional', 'individual']).default('business'),
  source: z.string().trim().max(60).optional(),
  /** Honeypot. Any value means a bot filled a field humans never see. */
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  // 1. Throttle by IP before touching the database.
  const limit = rateLimit(`subscribe:${clientIp(request)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return apiError('Too many attempts. Please try again shortly.', 429, {
      retryAfter: limit.retryAfter,
    });
  }

  const body = await readJson(request);
  if (!body) return apiError('Invalid request body.');

  const parsed = SubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? 'Please check the form and try again.');
  }

  const { email, name, segment, source, website } = parsed.data;

  // 2. Honeypot. Respond with success so bots learn nothing from the result.
  if (website) {
    return apiOk({ message: 'You are subscribed to the monthly compliance calendar.' });
  }

  const supabase = serviceClient();
  if (!supabase) {
    return apiError(
      'Subscriptions are not available right now. Please email us instead.',
      503,
    );
  }

  // 3. Upsert. Re-subscribing an address that previously unsubscribed
  //    reactivates it rather than failing on the unique index.
  const { data: existing, error: lookupError } = await supabase
    .from('subscribers')
    .select('id, state')
    .eq('email', email)
    .maybeSingle();

  if (lookupError) {
    console.error('[subscribe] lookup failed', lookupError);
    return apiError('Could not record your subscription. Please try again.', 500);
  }

  if (existing) {
    if (existing.state === 'confirmed') {
      return apiOk({
        message: 'That address is already subscribed — the next edition is on its way.',
      });
    }

    const { error: updateError } = await supabase
      .from('subscribers')
      .update({
        state: 'confirmed',
        name: name ?? null,
        segment,
        confirmed_at: new Date().toISOString(),
        unsubscribed_at: null,
      })
      .eq('id', existing.id);

    if (updateError) {
      console.error('[subscribe] reactivate failed', updateError);
      return apiError('Could not record your subscription. Please try again.', 500);
    }

    return apiOk({ message: 'Welcome back — your subscription is active again.' });
  }

  const { error: insertError } = await supabase.from('subscribers').insert({
    email,
    name: name ?? null,
    segment,
    // Single opt-in: the visitor explicitly asked for this on our own form,
    // and every send carries one-click unsubscribe.
    state: 'confirmed',
    confirmed_at: new Date().toISOString(),
    source: source ?? 'calendar_page',
  });

  if (insertError) {
    console.error('[subscribe] insert failed', insertError);
    return apiError('Could not record your subscription. Please try again.', 500);
  }

  return apiOk({
    message:
      'You will get the compliance calendar on the first working day of each month. Unsubscribe any time.',
  });
}
