'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { browserClient } from '@/lib/supabase-browser';

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');

    try {
      const supabase = browserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        // Deliberately generic: never reveal whether an address has an account.
        setError('Those credentials were not recognised.');
        setBusy(false);
        return;
      }

      const next = params.get('next') ?? '/admin';
      router.push(next);
      router.refresh();
    } catch {
      setError('Could not sign in. Please try again.');
      setBusy(false);
    }
  }

  const field =
    'h-12 w-full rounded-[var(--radius-md)] bg-white px-4 text-[0.9375rem] text-ink ' +
    'ring-1 ring-inset ring-[var(--color-hairline)] outline-none transition-shadow ' +
    'focus:ring-2 focus:ring-brand-500';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />
      </div>

      <div>
        <label htmlFor="password" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={field}
        />
      </div>

      {error ? (
        <p role="alert" className="text-danger text-[0.875rem]">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="bg-brand-600 hover:bg-brand-700 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] text-[0.9375rem] font-semibold text-white transition-colors disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            Sign in
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </>
        )}
      </button>
    </form>
  );
}
