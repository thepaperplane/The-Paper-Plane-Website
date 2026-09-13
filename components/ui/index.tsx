import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

/* ==========================================================================
   LAYOUT
   ========================================================================== */

export function Container({
  className,
  size = 'page',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: 'page' | 'content' | 'wide' }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-6 sm:px-8',
        size === 'page' && 'max-w-[80rem]',
        size === 'content' && 'max-w-[46rem]',
        size === 'wide' && 'max-w-[94rem]',
        className,
      )}
      {...props}
    />
  );
}

export function Section({
  className,
  tone = 'canvas',
  ...props
}: React.HTMLAttributes<HTMLElement> & { tone?: 'canvas' | 'sunken' | 'ink' }) {
  return (
    <section
      className={cn(
        'py-20 sm:py-28',
        tone === 'sunken' && 'bg-sunken',
        tone === 'ink' && 'bg-brand-950 text-white',
        className,
      )}
      {...props}
    />
  );
}

/* ==========================================================================
   TYPOGRAPHY
   ========================================================================== */

export function Eyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('eyebrow', className)} {...props}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          'text-ink font-semibold tracking-[-0.028em]',
          Tag === 'h1'
            ? 'text-[length:var(--text-display-m)] leading-[1.04]'
            : 'text-[length:var(--text-display-s)] leading-[1.08]',
        )}
      >
        {title}
      </Tag>
      {lede ? (
        <p
          className={cn(
            'text-ink-tertiary mt-5 text-lg leading-relaxed',
            align === 'center' && 'mx-auto',
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   BUTTON
   ========================================================================== */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

const BUTTON_BASE =
  'relative inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap ' +
  'transition-all duration-300 ease-[var(--ease-out-ios)] ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500';

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[var(--shadow-brand)] hover:bg-brand-700 hover:shadow-[0_20px_40px_-12px_rgba(33,139,224,0.45)]',
  secondary:
    'bg-white text-ink ring-1 ring-inset ring-[var(--color-hairline-strong)] shadow-[var(--shadow-sm)] hover:bg-sunken hover:shadow-[var(--shadow-md)]',
  ghost: 'text-ink-secondary hover:text-ink hover:bg-sunken',
  inverse: 'bg-white text-brand-900 shadow-[var(--shadow-lg)] hover:bg-brand-50',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 rounded-[var(--radius-sm)] px-4 text-[0.8125rem]',
  md: 'h-11 rounded-[var(--radius-md)] px-5 text-[0.9375rem]',
  lg: 'h-[3.25rem] rounded-[var(--radius-lg)] px-7 text-base',
};

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  href,
  external,
  children,
  ...props
}: ButtonBaseProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const classes = cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/* ==========================================================================
   SURFACES
   ========================================================================== */

export function Card({
  className,
  interactive,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div className={cn('card', interactive && 'card-interactive', className)} {...props} />
  );
}

export function Badge({
  className,
  tone = 'neutral',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger';
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
      {...props}
    />
  );
}

/** Hairline divider with a soft fade at both ends. */
export function Rule({ className }: { className?: string }) {
  return <div className={cn('rule', className)} role="presentation" />;
}

/* ==========================================================================
   ACCENT TOKENS
   Maps a pillar's accent name onto concrete classes, so accent colour is
   decided in one place rather than sprinkled through pages.
   ========================================================================== */

export const ACCENTS = {
  blue: { text: 'text-brand-600', bg: 'bg-brand-50', ring: 'ring-brand-500/20', dot: 'bg-brand-500' },
  navy: { text: 'text-brand-800', bg: 'bg-brand-100', ring: 'ring-brand-800/20', dot: 'bg-brand-800' },
  teal: { text: 'text-success', bg: 'bg-success-soft', ring: 'ring-success/20', dot: 'bg-success' },
  amber: { text: 'text-warning', bg: 'bg-warning-soft', ring: 'ring-warning/20', dot: 'bg-warning' },
  violet: { text: 'text-brand-700', bg: 'bg-brand-50', ring: 'ring-brand-700/20', dot: 'bg-brand-700' },
  rose: { text: 'text-danger', bg: 'bg-danger-soft', ring: 'ring-danger/20', dot: 'bg-danger' },
} as const;

export type AccentName = keyof typeof ACCENTS;
