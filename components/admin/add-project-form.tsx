'use client';

import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertCircle, Check, Link2, Loader2, Sparkles } from 'lucide-react';
import { addProjectFromUrl, type ActionResult } from '@/app/admin/portfolio/actions';
import { ADMIN_FIELD, Field } from '@/components/admin/ui';
import { deriveProjectDefaults } from '@/lib/capture-client';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-accent hover:bg-accent-hover inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] px-5 text-[0.9375rem] font-semibold text-accent-ink transition-colors disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Capturing previews…
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" strokeWidth={2} />
          Add &amp; capture
        </>
      )}
    </button>
  );
}

/**
 * Paste a client's URL and the system does the rest: derives the name and
 * slug, checks the site is reachable, captures desktop + mobile previews,
 * uploads them, and publishes the laptop/phone component to /work.
 */
export function AddProjectForm() {
  const [state, action] = useActionState<ActionResult | null, FormData>(addProjectFromUrl, null);
  const [url, setUrl] = useState('');

  const preview = url.trim().length > 3 ? deriveProjectDefaults(url) : null;

  return (
    <form action={action} className="px-6 py-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field
            label="Website address"
            htmlFor="project-url"
            required
            hint="Everything else is optional — we derive the name, check the site is reachable, and capture both previews."
          >
            <div className="relative">
              <Link2
                className="text-ink-3 pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2"
                strokeWidth={2}
              />
              <input
                id="project-url"
                name="url"
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="clientsite.in"
                className={`${ADMIN_FIELD} pl-10`}
              />
            </div>
          </Field>

          {preview ? (
            <p className="text-ink-3 mt-2 text-[0.75rem]">
              Will be saved as{' '}
              <span className="text-ink font-medium">{preview.name}</span> at{' '}
              <code className="bg-sunken rounded px-1">/work</code> · slug{' '}
              <code className="bg-sunken rounded px-1">{preview.slug}</code>
            </p>
          ) : null}
        </div>

        <Field label="Display name" htmlFor="project-name" hint="Leave blank to use the derived name.">
          <input
            id="project-name"
            name="name"
            type="text"
            placeholder={preview?.name ?? 'Client name'}
            className={ADMIN_FIELD}
          />
        </Field>

        <Field label="Sector" htmlFor="project-sector">
          <input
            id="project-sector"
            name="sector"
            type="text"
            placeholder="Healthcare · Dental practice"
            className={ADMIN_FIELD}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Summary" htmlFor="project-summary">
            <textarea
              id="project-summary"
              name="summary"
              rows={2}
              placeholder="One or two sentences describing what was built and why."
              className={`${ADMIN_FIELD} h-auto resize-y py-2.5`}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <SubmitButton />
        <p className="text-ink-3 text-[0.75rem]">
          Capture takes about 10–20 seconds.
        </p>
      </div>

      {state ? (
        <div
          role="status"
          className={`mt-5 flex items-start gap-3 rounded-[var(--radius-md)] p-4 ring-1 ring-inset ${
            state.ok
              ? 'bg-positive/10 ring-positive/20'
              : 'bg-critical/10 ring-critical/20'
          }`}
        >
          {state.ok ? (
            <Check className="text-positive mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.4} />
          ) : (
            <AlertCircle className="text-critical mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.2} />
          )}
          <div>
            <p className="text-ink text-[0.875rem] font-medium">{state.message}</p>
            {state.detail ? (
              <p className="text-ink-2 mt-1 text-[0.8125rem] leading-relaxed">
                {state.detail}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </form>
  );
}
