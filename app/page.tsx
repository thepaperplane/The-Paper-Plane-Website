import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Hero } from '@/components/home/hero';
import {
  ACCENTS,
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  type AccentName,
} from '@/components/ui';
import { PILLARS } from '@/content/services';
import { SERVICE_ANATOMY, MYTHS } from '@/content/knowledge';
import { PROJECTS } from '@/content/portfolio';
import { loadContent, pick } from '@/lib/content';

export default async function HomePage() {
  const copy = await loadContent('home');
  const featured = PROJECTS.filter((p) => p.status === 'live').slice(0, 1);

  return (
    <>
      <Hero
        eyebrow={pick(copy, 'home.hero.eyebrow')}
        title={pick(copy, 'home.hero.title')}
        titleAccent={pick(copy, 'home.hero.titleAccent')}
        lede={pick(copy, 'home.hero.lede')}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Practice pillars                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="sunken" id="practice">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="The practice"
              title={pick(copy, 'home.pillars.title')}
              lede={pick(copy, 'home.pillars.lede')}
            />
            <Link
              href="/services"
              className="text-brand-700 hover:text-brand-800 group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-semibold transition-colors"
            >
              All services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => {
              const accent = ACCENTS[pillar.accent as AccentName];
              const Icon =
                (Icons[pillar.icon as keyof typeof Icons] as React.ElementType) ?? Icons.Sparkles;

              return (
                <Card
                  key={pillar.id}
                  interactive
                  className="group flex flex-col bg-white p-7"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ring-1 ring-inset ${accent.bg} ${accent.ring}`}
                  >
                    <Icon className={`h-5 w-5 ${accent.text}`} strokeWidth={1.9} />
                  </span>

                  <h3 className="text-ink mt-5 text-[1.0625rem] font-semibold">{pillar.title}</h3>
                  <p className="text-ink-tertiary mt-2 text-[0.9375rem] leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--color-hairline)] pt-4">
                    <span className="text-ink-quaternary text-[0.8125rem]">
                      {pillar.services.length} services
                    </span>
                    <Link
                      href={`/services#${pillar.id}`}
                      className="text-brand-700 inline-flex items-center gap-1 text-[0.8125rem] font-semibold opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      View
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      <span className="sr-only">{pillar.title}</span>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What you're paying for                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Knowledge Corner"
            title={pick(copy, 'home.knowledge.title')}
            lede={pick(copy, 'home.knowledge.lede')}
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {SERVICE_ANATOMY.slice(0, 2).map((item) => (
              <Card key={item.id} className="bg-white p-7 sm:p-8">
                <Eyebrow>{item.service}</Eyebrow>

                <p className="text-ink mt-4 text-[1.0625rem] leading-relaxed font-medium">
                  {item.perception}
                </p>
                <p className="text-ink-tertiary mt-3 text-[0.9375rem] leading-relaxed">
                  {item.reality}
                </p>

                {/* Depth is shown through scope and review passes, never hours —
                    a published duration reads as a commitment. */}
                <dl className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="bg-sunken rounded-[var(--radius-md)] p-4">
                    <dt className="text-ink-quaternary text-[0.75rem] font-medium">
                      What you hand over
                    </dt>
                    <dd className="text-ink mt-1.5 text-[0.9375rem] leading-relaxed">
                      {item.clientInput}
                    </dd>
                  </div>
                  <div className="bg-brand-50 flex flex-col justify-center rounded-[var(--radius-md)] p-4 text-center sm:w-32">
                    <dt className="text-brand-700 text-[0.75rem] font-medium">Review passes</dt>
                    <dd className="text-brand-900 mt-1 text-[1.75rem] leading-none font-semibold tabular-nums">
                      {item.reviewLayers}
                    </dd>
                    <dd className="text-brand-700/70 mt-1 text-[0.6875rem]">before filing</dd>
                  </div>
                </dl>

                <Link
                  href={`/knowledge#${item.id}`}
                  className="text-brand-700 hover:text-brand-800 mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold transition-colors"
                >
                  See the full breakdown
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
              </Card>
            ))}
          </div>

          {/* Myths */}
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {MYTHS.slice(0, 3).map((item) => (
              <Card key={item.myth} className="bg-white p-6">
                <p className="text-ink-quaternary text-[0.8125rem] font-medium line-through decoration-[var(--color-danger)]/40">
                  {item.myth}
                </p>
                <p className="text-ink mt-3 text-[0.9375rem] leading-relaxed">{item.reality}</p>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <ButtonLink href="/knowledge" variant="secondary" size="lg">
              Open the Knowledge Corner
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Selected work                                                     */}
      {/* ---------------------------------------------------------------- */}
      {featured.length > 0 ? (
        <Section tone="sunken">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Selected work"
                title="We ship the software too"
                lede="The same practice that files your returns builds the platforms your business runs on."
              />
              <Link
                href="/work"
                className="text-brand-700 hover:text-brand-800 group inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-semibold transition-colors"
              >
                All work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-12">
              {featured.map((project) => (
                <Card key={project.slug} className="overflow-hidden bg-white">
                  <div className="grid items-center gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                    <div>
                      <Eyebrow>{project.sector}</Eyebrow>
                      <h3 className="text-ink mt-3 text-[length:var(--text-title-2)] font-semibold tracking-[-0.02em]">
                        {project.name}
                      </h3>
                      <p className="text-ink-tertiary mt-3 text-[0.9375rem] leading-relaxed">
                        {project.summary}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech) => (
                          <li
                            key={tech}
                            className="bg-sunken text-ink-secondary rounded-full px-2.5 py-1 text-[0.75rem] font-medium"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/work"
                        className="text-brand-700 hover:text-brand-800 mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold transition-colors"
                      >
                        View the case study
                        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                      </Link>
                    </div>

                    <div className="bg-sunken rounded-[var(--radius-lg)] p-6">
                      <p className="text-ink-quaternary text-center text-[0.8125rem]">
                        Live preview on the work page
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section className="py-20 sm:py-24">
        <Container>
          <div className="bg-brand-950 relative overflow-hidden rounded-[var(--radius-2xl)] px-8 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(48,154,230,0.35), transparent 70%)',
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-[length:var(--text-display-s)] leading-[1.1] font-semibold tracking-[-0.03em] text-white">
                {pick(copy, 'home.cta.title')}
              </h2>
              <p className="text-brand-100 mt-5 text-lg leading-relaxed">
                {pick(copy, 'home.cta.lede')}
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href="/contact" variant="inverse" size="lg">
                  Book a consultation
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </ButtonLink>
                <ButtonLink
                  href="/calendar"
                  size="lg"
                  className="bg-white/10 text-white ring-1 ring-white/25 ring-inset hover:bg-white/15"
                >
                  Get the monthly calendar
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
