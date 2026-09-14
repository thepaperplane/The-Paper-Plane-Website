import type { Metadata } from 'next';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight, Check } from 'lucide-react';
import {
  ACCENTS,
  Badge,
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  type AccentName,
} from '@/components/ui';
import { PILLARS } from '@/content/services';
import { SITE, pageOg } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Tax filing and GST, scrutiny defence and appeals, company incorporation, statutory audit, payroll, custom web development and brand design — the full practice, in detail.',
  alternates: { canonical: '/services' },
  openGraph: pageOg({
    title: 'Services',
    description:
      'Six practice pillars: tax, scrutiny defence, incorporation, audit, digital infrastructure and design.',
    path: '/services',
  }),
};

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="ambient-wash pointer-events-none absolute inset-0 -z-10" />
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="Everything the practice does"
            lede="Six disciplines that are normally bought from five different vendors. Buying them from one is the point — the handoffs are where compliance usually fails."
          />

          {/* Jump nav */}
          <nav aria-label="Service pillars" className="mt-10 flex flex-wrap gap-2">
            {PILLARS.map((pillar) => {
              const accent = ACCENTS[pillar.accent as AccentName];
              return (
                <Link
                  key={pillar.id}
                  href={`#${pillar.id}`}
                  className="text-ink-secondary hover:text-ink inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.875rem] font-medium shadow-[var(--shadow-xs)] ring-1 ring-[var(--color-hairline)] ring-inset transition-all hover:shadow-[var(--shadow-sm)]"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                  {pillar.title}
                </Link>
              );
            })}
          </nav>
        </Container>
      </Section>

      {/* Pillars */}
      {PILLARS.map((pillar, index) => {
        const accent = ACCENTS[pillar.accent as AccentName];
        const Icon =
          (Icons[pillar.icon as keyof typeof Icons] as React.ElementType) ?? Icons.Sparkles;

        return (
          <Section
            key={pillar.id}
            id={pillar.id}
            tone={index % 2 === 1 ? 'sunken' : 'canvas'}
            className="scroll-mt-24 py-16 sm:py-20"
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-14">
                {/* Pillar intro */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span
                    className={`flex h-13 w-13 items-center justify-center rounded-[var(--radius-md)] p-3 ring-1 ring-inset ${accent.bg} ${accent.ring}`}
                  >
                    <Icon className={`h-6 w-6 ${accent.text}`} strokeWidth={1.9} />
                  </span>

                  <h2 className="text-ink mt-5 text-[length:var(--text-title-2)] font-semibold tracking-[-0.025em]">
                    {pillar.title}
                  </h2>
                  <p className={`mt-2 text-[0.9375rem] font-medium ${accent.text}`}>
                    {pillar.tagline}
                  </p>
                  <p className="text-ink-tertiary mt-4 text-[0.9375rem] leading-relaxed">
                    {pillar.description}
                  </p>

                  <ButtonLink
                    href="/contact"
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                  >
                    Discuss this
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </ButtonLink>
                </div>

                {/* Services */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {pillar.services.map((service) => (
                    <Card
                      key={service.id}
                      interactive
                      className="flex flex-col bg-white p-6"
                      id={service.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-ink text-[1.0625rem] leading-snug font-semibold">
                            {service.title}
                          </h3>
                          <p className="text-ink-quaternary mt-1 text-[0.8125rem]">
                            {service.subtitle}
                          </p>
                        </div>
                        {service.badge ? (
                          <Badge tone="brand" className="shrink-0">
                            {service.badge}
                          </Badge>
                        ) : null}
                      </div>

                      <p className="text-ink-tertiary mt-4 text-[0.9375rem] leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="mt-5 space-y-2 border-t border-[var(--color-hairline)] pt-5">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-ink-secondary flex items-start gap-2.5 text-[0.875rem]"
                          >
                            <Check
                              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.text}`}
                              strokeWidth={2.6}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Closing */}
      <Section className="py-20">
        <Container>
          <Card className="bg-white p-9 text-center sm:p-12">
            <Eyebrow>Not sure where you sit?</Eyebrow>
            <h2 className="text-ink mx-auto mt-4 max-w-2xl text-[length:var(--text-title-1)] leading-tight font-semibold tracking-[-0.028em]">
              Most engagements start with one problem and uncover three more
            </h2>
            <p className="text-ink-tertiary mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed">
              Send us the notice, the deadline or the idea. We will tell you what it actually
              involves and what it should cost before you commit to anything.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Book a consultation
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </ButtonLink>
              <ButtonLink href="/knowledge" variant="secondary" size="lg">
                Understand the work first
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
