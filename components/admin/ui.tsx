import * as React from 'react';
import { cn } from '@/lib/utils';

/** Shared admin-console primitives. Same design tokens as the public site. */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-ink text-[1.5rem] font-semibold tracking-[-0.025em]">{title}</h1>
        {description ? (
          <p className="text-ink-tertiary mt-1.5 max-w-2xl text-[0.9375rem] leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Panel({
  className,
  title,
  description,
  action,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-white',
        className,
      )}
      {...props}
    >
      {title ? (
        <header className="flex items-start justify-between gap-4 border-b border-[var(--color-hairline)] px-6 py-4">
          <div>
            <h2 className="text-ink text-[0.9375rem] font-semibold">{title}</h2>
            {description ? (
              <p className="text-ink-tertiary mt-1 text-[0.8125rem] leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'neutral' | 'brand' | 'warning' | 'danger' | 'success';
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-white p-5">
      <p className="text-ink-quaternary text-[0.75rem] font-medium">{label}</p>
      <p
        className={cn(
          'mt-1.5 text-[1.75rem] leading-none font-semibold tabular-nums',
          tone === 'neutral' && 'text-ink',
          tone === 'brand' && 'text-brand-700',
          tone === 'warning' && 'text-warning',
          tone === 'danger' && 'text-danger',
          tone === 'success' && 'text-success',
        )}
      >
        {value}
      </p>
      {hint ? <p className="text-ink-quaternary mt-2 text-[0.75rem]">{hint}</p> : null}
    </div>
  );
}

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ring-1 ring-inset',
        tone === 'neutral' && 'bg-sunken text-ink-tertiary ring-[var(--color-hairline)]',
        tone === 'brand' && 'bg-brand-50 text-brand-700 ring-brand-500/20',
        tone === 'success' && 'bg-success-soft text-success ring-success/20',
        tone === 'warning' && 'bg-warning-soft text-warning ring-warning/20',
        tone === 'danger' && 'bg-danger-soft text-danger ring-danger/20',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon: Icon,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="px-6 py-14 text-center">
      {Icon ? (
        <span className="bg-sunken mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <Icon className="text-ink-quaternary h-5 w-5" strokeWidth={1.8} />
        </span>
      ) : null}
      <p className="text-ink mt-4 text-[0.9375rem] font-semibold">{title}</p>
      {description ? (
        <p className="text-ink-tertiary mx-auto mt-1.5 max-w-sm text-[0.875rem] leading-relaxed">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

/** Table shell that keeps wide content scrolling inside its own lane. */
export function DataTable({
  head,
  children,
  caption,
}: {
  head: string[];
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="scroll-lane">
      <table className="w-full min-w-[44rem] border-collapse text-left">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-[var(--color-hairline)]">
            {head.map((label) => (
              <th
                key={label}
                scope="col"
                className="text-ink-quaternary px-6 py-3 text-[0.6875rem] font-semibold tracking-[0.05em] uppercase"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-hairline)]">{children}</tbody>
      </table>
    </div>
  );
}

export const ADMIN_FIELD =
  'h-11 w-full rounded-[var(--radius-md)] bg-white px-3.5 text-[0.9375rem] text-ink ' +
  'ring-1 ring-inset ring-[var(--color-hairline)] outline-none transition-shadow ' +
  'focus:ring-2 focus:ring-brand-500 placeholder:text-ink-quaternary';

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-ink mb-1.5 block text-[0.8125rem] font-medium">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="text-ink-quaternary mt-1.5 text-[0.75rem]">{hint}</p> : null}
    </div>
  );
}
