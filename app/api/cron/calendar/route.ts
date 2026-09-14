import { apiError, apiOk, authorizeCron } from '@/lib/api';
import { sendCalendarEmail } from '@/lib/email';
import { serviceClient } from '@/lib/supabase';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Monthly compliance calendar send. Scheduled by Vercel Cron (vercel.json).
 *
 * Idempotent by construction: `calendar_sends` has a unique constraint on
 * (subscriber_id, period), and we insert the row BEFORE sending. A retried
 * or duplicated cron invocation therefore cannot double-send, even if the
 * first run timed out midway.
 */
export async function GET(request: Request) {
  const auth = authorizeCron(request);
  if (!auth.ok) return auth.response;

  const supabase = serviceClient();
  if (!supabase) return apiError('Supabase service key is not configured.', 503);

  // Period is the first day of the current month, in IST.
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date());

  const year = Number(parts.find((p) => p.type === 'year')?.value);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  const period = `${year}-${String(month).padStart(2, '0')}-01`;

  const { data: subscribers, error } = await supabase
    .from('subscribers')
    .select('id, email, name, token')
    .eq('state', 'confirmed');

  if (error) {
    console.error('[cron/calendar] could not load subscribers', error);
    return apiError('Could not load subscribers.', 500);
  }
  if (!subscribers?.length) {
    return apiOk({ message: 'No confirmed subscribers.', sent: 0, period });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;
  let sent = 0;
  let skipped = 0;
  const failures: { email: string; error: string }[] = [];

  // Sequential with a small pause: keeps us inside provider rate limits and
  // makes a partial failure easy to reason about.
  for (const subscriber of subscribers) {
    // Claim this (subscriber, period) first. A duplicate key means an earlier
    // run already handled them.
    const { error: claimError } = await supabase.from('calendar_sends').insert({
      subscriber_id: subscriber.id,
      period,
      status: 'sending',
    });

    if (claimError) {
      skipped += 1;
      continue;
    }

    const unsubscribeUrl = `${base}/api/calendar/unsubscribe?token=${subscriber.token}`;

    const result = await sendCalendarEmail({
      to: subscriber.email,
      name: subscriber.name,
      month,
      year,
      unsubscribeUrl,
    });

    if (result.sent) {
      sent += 1;
      await supabase
        .from('calendar_sends')
        .update({ status: 'sent', provider_id: result.id ?? null })
        .eq('subscriber_id', subscriber.id)
        .eq('period', period);

      await supabase
        .from('subscribers')
        .update({ last_sent_at: new Date().toISOString() })
        .eq('id', subscriber.id);
    } else {
      failures.push({ email: subscriber.email, error: result.error ?? 'not sent' });
      await supabase
        .from('calendar_sends')
        .update({ status: 'failed', error: result.error ?? 'not sent' })
        .eq('subscriber_id', subscriber.id)
        .eq('period', period);
    }

    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  return apiOk({
    message: `Calendar for ${period}: ${sent} sent, ${skipped} already handled, ${failures.length} failed.`,
    period,
    sent,
    skipped,
    failures,
  });
}
