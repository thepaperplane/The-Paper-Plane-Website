import { redirect } from 'next/navigation';
import { serverClient } from './supabase';
import type { AppRole, ProfileRow } from './database.types';

/** The signed-in staff profile, or null. */
export async function currentProfile(): Promise<ProfileRow | null> {
  try {
    const supabase = await serverClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
    return data ?? null;
  } catch {
    return null;
  }
}

/** Require a signed-in, active staff member. Redirects to login otherwise. */
export async function requireProfile(): Promise<ProfileRow> {
  const profile = await currentProfile();
  if (!profile || !profile.is_active) redirect('/admin/login');
  return profile;
}

const RANK: Record<AppRole, number> = { viewer: 0, editor: 1, admin: 2, owner: 3 };

export function atLeast(role: AppRole, minimum: AppRole): boolean {
  return RANK[role] >= RANK[minimum];
}

/** Require a minimum role. Returns the profile so callers can use it. */
export async function requireRole(minimum: AppRole): Promise<ProfileRow> {
  const profile = await requireProfile();
  if (!atLeast(profile.role, minimum)) redirect('/admin?denied=1');
  return profile;
}

export function canEdit(role: AppRole): boolean {
  return atLeast(role, 'editor');
}

export function canAdminister(role: AppRole): boolean {
  return atLeast(role, 'admin');
}
