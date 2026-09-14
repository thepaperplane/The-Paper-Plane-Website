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
          <p className="text-ink-3 mt-1.5 max-w-2xl text-[0.9375rem] leading-relaxed">
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
    <section className={cn('bg-surface rounded-[var(--radius-md)] border', className)} {...props}>
      {title ? (
        <header className="flex items-start justify-between gap-4 border-b border-[var(--hairline)] px-6 py-4">
          <div>
            <h2 className="text-ink text-[0.9375rem] font-semibold">{title}</h2>
            {description ? (
              <p className="text-ink-3 mt-1 text-[0.8125rem] leading-relaxed">{description}</p>
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
  tone?: 'neutral' | 'accent' | 'caution' | 'critical' | 'positive';
}) {
  return (
    <div className="bg-surface rounded-[var(--radius-md)] border p-5">
      <p className="text-ink-3 text-[0.75rem] font-medium">{label}</p>
      <p
        className={cn(
          'mt-1.5 text-[1.75rem] leading-none font-semibold tabular-nums',
          tone === 'neutral' && 'text-ink',
          tone === 'accent' && 'text-accent',
          tone === 'caution' && 'text-caution',
          tone === 'critical' && 'text-critical',
          tone === 'positive' && 'text-positive',
        )}
      >
        {value}
      </p>
      {hint ? <p className="text-ink-3 mt-2 text-[0.75rem]">{hint}</p> : null}
    </div>
  );
}

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'positive' | 'caution' | 'critical';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ring-1 ring-inset',
        tone === 'neutral' && 'bg-sunken text-ink-3 ring-[var(--hairline)]',
        tone === 'accent' && 'bg-accent-wash text-accent ring-accent/20',
        tone === 'positive' && 'bg-positive/10 text-positive ring-positive/20',
        tone === 'caution' && 'bg-caution/10 text-caution ring-caution/20',
        tone === 'critical' && 'bg-critical/10 text-critical ring-critical/20',
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
          <Icon className="text-ink-3 h-5 w-5" strokeWidth={1.8} />
        </span>
      ) : null}
      <p className="text-ink mt-4 text-[0.9375rem] font-semibold">{title}</p>
      {description ? (
        <p className="text-ink-3 mx-auto mt-1.5 max-w-sm text-[0.875rem] leading-relaxed">
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
          <tr className="border-b border-[var(--hairline)]">
            {head.map((label) => (
              <th
                key={label}
                scope="col"
                className="text-ink-3 px-6 py-3 text-[0.6875rem] font-semibold tracking-[0.05em] uppercase"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--hairline)]">{children}</tbody>
      </table>
    </div>
  );
}

export const ADMIN_FIELD =
  'h-11 w-full rounded-[var(--radius-md)] bg-surface px-3.5 text-[0.9375rem] text-ink ' +
  'ring-1 ring-inset ring-[var(--hairline)] outline-none transition-shadow ' +
  'focus:ring-2 focus:ring-accent placeholder:text-ink-3';

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
        {required ? <span className="text-critical"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="text-ink-3 mt-1.5 text-[0.75rem]">{hint}</p> : null}
    </div>
  );
}
