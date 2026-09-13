import Link from 'next/link';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { LogoMark } from '@/components/brand/logo';
import { Container, ButtonLink } from '@/components/ui';
import { COMPLIANCE_EVENTS } from '@/content/calendar';
import { ordinal } from '@/lib/utils';

/**
 * Light, typographic hero.
 *
 * Replaces the previous full-bleed Three.js canvas. That version shipped
 * ~285 KB of WebGL before first paint and — critically — rendered nothing
 * legible on a 375 px viewport: the headline and both CTAs were pushed off
 * screen entirely. Here the headline is the first paint on every breakpoint,
 * and the supporting visual is plain SVG/CSS.
 */
export function Hero({
  eyebrow,
  title,
  titleAccent,
  lede,
}: {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
}) {
  const monthly = COMPLIANCE_EVENTS.filter((e) => e.cadence === 'monthly').slice(0, 4);

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="ambient-wash pointer-events-none absolute inset-0 -z-10" />

      {/* Hairline grid, fading out before it reaches the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent 75%)',
        }}
      />

      <Container>
        <div className="grid min-w-0 grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Copy */}
          <div className="min-w-0 max-w-2xl">
            <p className="border-brand-200/70 text-brand-700 inline-flex items-center gap-2 rounded-full border bg-white/70 px-3.5 py-1.5 text-[0.8125rem] font-medium backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
              {eyebrow}
            </p>

            <h1 className="text-ink mt-6 text-[length:var(--text-display-l)] leading-[1.02] font-semibold tracking-[-0.035em]">
              {title}
              <br />
              <span className="text-gradient-brand">{titleAccent}</span>
            </h1>

            <p className="text-ink-tertiary mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
              {lede}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" size="lg">
                Book a consultation
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary" size="lg">
                Explore the practice
              </ButtonLink>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {[
                'ITR 1–7 & GST filing',
                'Section 148 defence',
                'Incorporation in 3–5 days',
              ].map((item) => (
                <li key={item} className="text-ink-secondary flex items-center gap-2 text-[0.9375rem]">
                  <Check className="text-success h-4 w-4 shrink-0" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual — a glass panel showing the recurring monthly cycle */}
          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className="from-brand-200/40 absolute -inset-6 -z-10 rounded-[var(--radius-3xl)] bg-gradient-to-br to-transparent blur-2xl"
            />

            <div className="glass-strong rounded-[var(--radius-2xl)] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="ring-brand-100 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-white shadow-[var(--shadow-sm)] ring-1">
                    <LogoMark className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-ink text-[0.9375rem] font-semibold">Every month</p>
                    <p className="text-ink-quaternary text-[0.8125rem]">
                      The cycle we run for you
                    </p>
                  </div>
                </div>
                <span className="bg-success-soft text-success ring-success/20 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ring-1 ring-inset">
                  On track
                </span>
              </div>

              <ol className="mt-6 space-y-1">
                {monthly.map((event) => (
                  <li
                    key={event.id}
                    className="flex items-center gap-4 rounded-[var(--radius-sm)] px-2.5 py-3 transition-colors hover:bg-white/70"
                  >
                    <span className="bg-brand-50 text-brand-700 ring-brand-500/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] text-[0.8125rem] font-semibold ring-1 ring-inset tabular-nums">
                      {ordinal(event.day)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-ink block truncate text-[0.9375rem] font-medium">
                        {event.title}
                      </span>
                      <span className="text-ink-quaternary block truncate text-[0.8125rem]">
                        {event.statute}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <Link
                href="/calendar"
                className="text-brand-700 hover:text-brand-800 mt-5 inline-flex items-center gap-1.5 border-t border-[var(--color-hairline)] pt-5 text-[0.9375rem] font-semibold transition-colors"
              >
                See the full compliance calendar
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
