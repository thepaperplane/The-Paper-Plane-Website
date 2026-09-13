import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from '@/components/admin/login-form';
import { LogoMark } from '@/components/brand/logo';
import { isSupabaseConfigured } from '@/lib/supabase-browser';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="bg-sunken flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark className="h-14 w-14" />
          <h1 className="text-ink mt-5 text-[1.375rem] font-semibold tracking-[-0.02em]">
            Admin console
          </h1>
          <p className="text-ink-tertiary mt-1.5 text-[0.9375rem]">
            The Paper Plane — internal access only
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-white p-7 shadow-[var(--shadow-lg)]">
          {isSupabaseConfigured ? (
            // LoginForm reads ?next= via useSearchParams, which opts this
            // subtree out of prerendering — the boundary keeps the shell static.
            <Suspense fallback={<div className="bg-sunken h-[17rem] animate-pulse rounded-[var(--radius-md)]" />}>
              <LoginForm />
            </Suspense>
          ) : (
            <div className="text-center">
              <p className="text-ink text-[0.9375rem] font-medium">Not configured</p>
              <p className="text-ink-tertiary mt-2 text-[0.875rem] leading-relaxed">
                Set <code className="bg-sunken rounded px-1 py-0.5 text-[0.8125rem]">NEXT_PUBLIC_SUPABASE_URL</code>{' '}
                and <code className="bg-sunken rounded px-1 py-0.5 text-[0.8125rem]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{' '}
                to enable the console.
              </p>
            </div>
          )}
        </div>

        <p className="text-ink-quaternary mt-6 text-center text-[0.8125rem]">
          Accounts are provisioned by an owner. There is no public sign-up.
        </p>
      </div>
    </div>
  );
}
