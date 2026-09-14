import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

/**
 * Browser-side Supabase client.
 *
 * Kept in its own module because `lib/supabase.ts` imports `next/headers`,
 * which cannot be bundled into a client component. Client components import
 * from here; server code imports from `lib/supabase.ts`.
 *
 * Uses the publishable key, so every query is governed by row level security.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(URL && PUBLISHABLE_KEY);

export function browserClient() {
  if (!URL || !PUBLISHABLE_KEY) {
    throw new Error('Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and _ANON_KEY.');
  }
  return createBrowserClient<Database>(URL, PUBLISHABLE_KEY);
}
