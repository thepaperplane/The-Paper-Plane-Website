import 'server-only';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

/**
 * Server-side Supabase entry points.
 *
 *   serverClient()  — publishable key + the user's cookie session, for RSC
 *                     and route handlers acting AS the signed-in admin.
 *   serviceClient() — secret key, bypasses RLS. Use for writes the public
 *                     can trigger (subscriptions, enquiries) and cron jobs.
 *
 * The browser client lives in `lib/supabase-browser.ts` — this module imports
 * `next/headers`, which cannot be bundled into a client component.
 *
 * Both accessors degrade gracefully when the project is not provisioned, so
 * the public site builds and runs without credentials.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(URL && PUBLISHABLE_KEY);

export async function serverClient() {
  if (!URL || !PUBLISHABLE_KEY) {
    throw new Error('Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and _ANON_KEY.');
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(URL, PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (items: { name: string; value: string; options?: CookieOptions }[]) => {
        try {
          items.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Session refresh is handled in middleware instead.
        }
      },
    },
  });
}

/** Server-only. Bypasses RLS — use for writes the public is allowed to trigger
 *  (subscriptions, enquiries) and for cron jobs. */
export function serviceClient(): SupabaseClient<Database> | null {
  if (!URL || !SECRET_KEY) return null;
  return createClient<Database>(URL, SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
