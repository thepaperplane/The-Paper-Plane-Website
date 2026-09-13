import { serviceClient } from '@/lib/supabase';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * One-click unsubscribe.
 *
 * GET handles the link in the email body. POST handles RFC 8058 one-click,
 * which mail clients fire automatically — both resolve the same token.
 */
async function unsubscribe(token: string | null): Promise<boolean> {
  if (!token) return false;

  const supabase = serviceClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from('subscribers')
    .update({ state: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('token', token);

  return !error;
}

function page(ok: boolean): Response {
  const title = ok ? 'You have been unsubscribed' : 'That link is no longer valid';
  const body = ok
    ? 'You will not receive the monthly compliance calendar again. You can resubscribe any time from the calendar page.'
    : 'We could not match that unsubscribe link. If you keep receiving emails, reply to any of them and we will remove you manually.';

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} · ${SITE.name}</title>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f5f7;
       font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1d1d1f;padding:24px}
  .card{max-width:30rem;background:#fff;border-radius:20px;padding:40px 32px;text-align:center;
        box-shadow:0 12px 24px -6px rgba(16,24,40,.08)}
  h1{margin:0 0 12px;font-size:22px;font-weight:600;letter-spacing:-.02em}
  p{margin:0 0 24px;font-size:15px;line-height:1.6;color:#6e6e73}
  a{display:inline-block;background:#1c75c8;color:#fff;text-decoration:none;font-size:15px;
    font-weight:600;padding:12px 22px;border-radius:14px}
</style></head>
<body><div class="card">
  <h1>${title}</h1><p>${body}</p>
  <a href="${SITE.url}">Back to ${SITE.name}</a>
</div></body></html>`;

  return new Response(html, {
    status: ok ? 200 : 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  return page(await unsubscribe(token));
}

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  const ok = await unsubscribe(token);
  return new Response(null, { status: ok ? 200 : 404 });
}
