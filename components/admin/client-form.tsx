'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { createClient, updateClient, type ClientActionResult } from '@/app/admin/clients/actions';
import { ADMIN_FIELD, Field } from '@/components/admin/ui';
import type { ClientRow } from '@/lib/database.types';

const ENTITY_TYPES = [
  ['private_limited', 'Private Limited'],
  ['llp', 'LLP'],
  ['proprietorship', 'Proprietorship'],
  ['partnership', 'Partnership'],
  ['individual', 'Individual'],
  ['public_limited', 'Public Limited'],
  ['trust', 'Trust'],
  ['society', 'Society'],
  ['other', 'Other'],
] as const;

const STATUSES = [
  ['lead', 'Lead'],
  ['onboarding', 'Onboarding'],
  ['active', 'Active'],
  ['dormant', 'Dormant'],
  ['closed', 'Closed'],
] as const;

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-accent hover:bg-accent-hover text-accent-ink inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] px-5 text-[0.9375rem] font-semibold transition-colors disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving…
        </>
      ) : (
        label
      )}
    </button>
  );
}

export function ClientForm({ client }: { client?: ClientRow }) {
  const isEdit = Boolean(client);
  const [state, action] = useActionState<ClientActionResult | null, FormData>(
    isEdit ? updateClient : createClient,
    null,
  );

  return (
    <form action={action} className="px-6 py-6">
      {client ? <input type="hidden" name="id" value={client.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Client name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={client?.name ?? ''}
              placeholder="Trading or brand name"
              className={ADMIN_FIELD}
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Legal name" htmlFor="legal_name" hint="As registered, if different.">
            <input
              id="legal_name"
              name="legal_name"
              type="text"
              defaultValue={client?.legal_name ?? ''}
              className={ADMIN_FIELD}
            />
          </Field>
        </div>

        <Field label="Entity type" htmlFor="entity_type">
          <select
            id="entity_type"
            name="entity_type"
            defaultValue={client?.entity_type ?? 'private_limited'}
            className={ADMIN_FIELD}
          >
            {ENTITY_TYPES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Status" htmlFor="status">
          <select
            id="status"
            name="status"
            defaultValue={client?.status ?? 'lead'}
            className={ADMIN_FIELD}
          >
            {STATUSES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={client?.email ?? ''}
            className={ADMIN_FIELD}
          />
        </Field>

        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={client?.phone ?? ''}
            className={ADMIN_FIELD}
          />
        </Field>

        <Field label="PAN" htmlFor="pan" hint="Format: ABCDE1234F">
          <input
            id="pan"
            name="pan"
            type="text"
            maxLength={10}
            defaultValue={client?.pan ?? ''}
            placeholder="ABCDE1234F"
            className={`${ADMIN_FIELD} font-[family-name:var(--font-mono)] uppercase`}
          />
        </Field>

        <Field label="GSTIN" htmlFor="gstin" hint="15 characters">
          <input
            id="gstin"
            name="gstin"
            type="text"
            maxLength={15}
            defaultValue={client?.gstin ?? ''}
            placeholder="33ABCDE1234F1Z5"
            className={`${ADMIN_FIELD} font-[family-name:var(--font-mono)] uppercase`}
          />
        </Field>

        <Field label="CIN" htmlFor="cin">
          <input
            id="cin"
            name="cin"
            type="text"
            defaultValue={client?.cin ?? ''}
            className={`${ADMIN_FIELD} font-[family-name:var(--font-mono)]`}
          />
        </Field>

        <Field label="TAN" htmlFor="tan">
          <input
            id="tan"
            name="tan"
            type="text"
            defaultValue={client?.tan ?? ''}
            className={`${ADMIN_FIELD} font-[family-name:var(--font-mono)]`}
          />
        </Field>

        <Field
          label="Jurisdiction"
          htmlFor="jurisdiction"
          hint="The client’s state or union territory, used for statutory filings."
        >
          <input
            id="jurisdiction"
            name="jurisdiction"
            type="text"
            defaultValue={client?.jurisdiction ?? ''}
            className={ADMIN_FIELD}
          />
        </Field>

        <Field label="Website" htmlFor="website">
          <input
            id="website"
            name="website"
            type="text"
            defaultValue={client?.website ?? ''}
            className={ADMIN_FIELD}
          />
        </Field>

        <Field label="Source" htmlFor="source" hint="How they found us.">
          <input
            id="source"
            name="source"
            type="text"
            defaultValue={client?.source ?? ''}
            placeholder="Website enquiry, referral…"
            className={ADMIN_FIELD}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Notes" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              rows={4}
              defaultValue={client?.notes ?? ''}
              className={`${ADMIN_FIELD} h-auto resize-y py-2.5`}
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <SaveButton label={isEdit ? 'Save changes' : 'Create client'} />

        {state ? (
          <p
            role="status"
            className={`inline-flex items-center gap-1.5 text-[0.875rem] ${
              state.ok ? 'text-positive' : 'text-critical'
            }`}
          >
            {state.ok ? (
              <Check className="h-4 w-4" strokeWidth={2.4} />
            ) : (
              <AlertCircle className="h-4 w-4" strokeWidth={2.2} />
            )}
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
