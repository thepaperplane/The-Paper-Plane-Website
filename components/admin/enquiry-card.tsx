'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Building2, Mail, Phone, UserPlus } from 'lucide-react';
import {
  convertEnquiryToClient,
  saveEnquiryNote,
  setEnquiryState,
} from '@/app/admin/enquiries/actions';
import { Pill } from '@/components/admin/ui';
import type { EnquiryRow, EnquiryState } from '@/lib/database.types';
import { formatRelative } from '@/lib/utils';

const TONE = {
  new: 'accent',
  contacted: 'neutral',
  qualified: 'positive',
  converted: 'positive',
  archived: 'neutral',
  spam: 'critical',
} as const;

const STATES: EnquiryState[] = ['new', 'contacted', 'qualified', 'converted', 'archived', 'spam'];

export function EnquiryCard({ enquiry, editable }: { enquiry: EnquiryRow; editable: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState(enquiry.internal_note ?? '');
  const [noteSaved, setNoteSaved] = useState(false);
  const [feedback, setFeedback] = useState('');

  function convert() {
    startTransition(async () => {
      const result = await convertEnquiryToClient(enquiry.id);
      if (result.ok && result.clientId) {
        router.push(`/admin/clients/${result.clientId}`);
      } else {
        setFeedback(result.message);
      }
    });
  }

  return (
    <article
      id={enquiry.id}
      className="bg-surface scroll-mt-24 rounded-[var(--radius-md)] border p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-ink text-[1rem] font-semibold">{enquiry.name}</h2>
            <Pill tone={TONE[enquiry.state]}>{enquiry.state}</Pill>
          </div>

          <div className="text-ink-3 mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8125rem]">
            <a
              href={`mailto:${enquiry.email}`}
              className="hover:text-accent inline-flex items-center gap-1.5"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={2} />
              {enquiry.email}
            </a>
            {enquiry.phone ? (
              <a
                href={`tel:${enquiry.phone}`}
                className="hover:text-accent inline-flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                {enquiry.phone}
              </a>
            ) : null}
            {enquiry.company ? (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" strokeWidth={2} />
                {enquiry.company}
              </span>
            ) : null}
            <span className="text-ink-3">{formatRelative(enquiry.created_at)}</span>
          </div>
        </div>

        {editable ? (
          <div className="flex shrink-0 items-center gap-2">
            <select
              aria-label={`Status for ${enquiry.name}`}
              value={enquiry.state}
              disabled={pending}
              onChange={(e) =>
                startTransition(async () => {
                  await setEnquiryState(enquiry.id, e.target.value as EnquiryState);
                })
              }
              className="text-ink-2 bg-surface h-9 rounded-[var(--radius-sm)] px-2.5 text-[0.8125rem] ring-1 ring-[var(--hairline)] outline-none ring-inset disabled:opacity-60"
            >
              {STATES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            {!enquiry.client_id ? (
              <button
                type="button"
                onClick={convert}
                disabled={pending}
                className="text-accent hover:bg-accent-wash inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-[0.8125rem] font-semibold transition-colors disabled:opacity-60"
              >
                <UserPlus className="h-3.5 w-3.5" strokeWidth={2.2} />
                Make client
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {enquiry.service_id ? (
        <p className="text-ink-3 mt-3 text-[0.75rem]">
          Interested in: <span className="text-ink-3">{enquiry.service_id}</span>
        </p>
      ) : null}

      <p className="text-ink-2 bg-sunken mt-4 rounded-[var(--radius-md)] p-4 text-[0.875rem] leading-relaxed whitespace-pre-wrap">
        {enquiry.message}
      </p>

      {editable ? (
        <div className="mt-4">
          <label
            htmlFor={`note-${enquiry.id}`}
            className="text-ink-3 mb-1.5 block text-[0.75rem] font-medium"
          >
            Internal note
          </label>
          <textarea
            id={`note-${enquiry.id}`}
            value={note}
            rows={2}
            onChange={(e) => {
              setNote(e.target.value);
              setNoteSaved(false);
            }}
            onBlur={() =>
              startTransition(async () => {
                await saveEnquiryNote(enquiry.id, note);
                setNoteSaved(true);
              })
            }
            placeholder="Not visible to the sender."
            className="text-ink placeholder:text-ink-3 focus:ring-accent bg-surface w-full resize-y rounded-[var(--radius-md)] px-3.5 py-2.5 text-[0.875rem] ring-1 ring-[var(--hairline)] outline-none ring-inset focus:ring-2"
          />
          {noteSaved ? <p className="text-positive mt-1 text-[0.75rem]">Note saved.</p> : null}
        </div>
      ) : null}

      {feedback ? (
        <p role="alert" className="text-critical mt-3 text-[0.8125rem]">
          {feedback}
        </p>
      ) : null}
    </article>
  );
}
