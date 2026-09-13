'use client';

import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { PILLARS } from '@/content/services';
import { whatsappLink } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const FIELD =
  'w-full rounded-[var(--radius-md)] bg-white px-4 text-[0.9375rem] text-ink ' +
  'placeholder:text-ink-quaternary ring-1 ring-inset ring-[var(--color-hairline)] ' +
  'outline-none transition-shadow focus:ring-2 focus:ring-brand-500';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus('error');
        setMessage(result.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setMessage(result.message ?? 'Thank you — we will be in touch.');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please email us directly instead.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-success-soft ring-success/20 rounded-[var(--radius-lg)] p-8 ring-1 ring-inset">
        <span className="bg-success flex h-12 w-12 items-center justify-center rounded-full">
          <Check className="h-6 w-6 text-white" strokeWidth={2.6} />
        </span>
        <h3 className="text-ink mt-5 text-[1.1875rem] font-semibold">Message received</h3>
        <p className="text-ink-secondary mt-2.5 text-[0.9375rem] leading-relaxed">{message}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-white px-5 text-[0.9375rem] font-semibold shadow-[var(--shadow-sm)] ring-1 ring-[var(--color-hairline)] ring-inset"
          >
            Continue on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-brand-700 hover:text-brand-800 inline-flex h-11 items-center justify-center px-2 text-[0.9375rem] font-semibold"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
            Your name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${FIELD} h-12`}
            placeholder="Full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${FIELD} h-12`}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
            Phone <span className="text-ink-quaternary font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${FIELD} h-12`}
            placeholder="+91"
          />
        </div>

        <div>
          <label htmlFor="company" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
            Company <span className="text-ink-quaternary font-normal">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={`${FIELD} h-12`}
            placeholder="Business name"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="serviceId" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
          What is this about?
        </label>
        <select id="serviceId" name="serviceId" defaultValue="" className={`${FIELD} h-12`}>
          <option value="">Select a service</option>
          {PILLARS.map((pillar) => (
            <optgroup key={pillar.id} label={pillar.title}>
              {pillar.services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-ink mb-1.5 block text-[0.875rem] font-medium">
          Tell us what you need <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${FIELD} resize-y py-3`}
          placeholder="A notice you have received, a deadline you are facing, or something you want built. Specifics help us give you a straight answer."
        />
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="sr-only-focusable absolute h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-brand-600 hover:bg-brand-700 mt-7 inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] px-7 text-base font-semibold text-white shadow-[var(--shadow-brand)] transition-all duration-300 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </>
        )}
      </button>

      {status === 'error' && message ? (
        <p role="alert" className="text-danger mt-3 text-[0.875rem]">
          {message}
        </p>
      ) : null}

      <p className="text-ink-quaternary mt-5 text-[0.8125rem] leading-relaxed">
        We reply within one working day. Nothing you send here is shared outside the practice,
        and we never add enquiry addresses to a mailing list without you asking.
      </p>
    </form>
  );
}
