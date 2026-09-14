import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clock, Eye, EyeOff, TriangleAlert } from 'lucide-react';
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from '@/components/ui';
import { Walkthrough } from '@/components/knowledge/walkthrough';
import { DecoderSearch } from '@/components/knowledge/decoder-search';
import { ARTICLES, MYTHS, PENALTY_EXPOSURE, TIMELINE_POSITION } from '@/content/knowledge';
import { pageOg } from '@/lib/site';
import { formatDate } from '@/lib/utils';
import { loadContent, pick } from '@/lib/content';
import { FlightRule } from '@/components/site/flight-rule';

export const metadata: Metadata = {
  title: 'Knowledge Corner',
  description:
    'What compliance work actually involves, what it costs to get wrong, and what the jargon means. Written so you can judge the work you are paying for.',
  alternates: { canonical: '/knowledge' },
  openGraph: pageOg({
    title: 'Knowledge Corner',
    description:
      'Service anatomy, penalty exposure, decoded jargon and long-form explainers — client education, not marketing.',
    path: '/knowledge',
  }),
};

export default async function KnowledgePage() {
  const copy = await loadContent('knowledge');

  return (
    <>
      {/* Header */}
      <Section className="pt-[calc(4.5rem+var(--space-section-sm))] pb-14">
        <div className="pointer-events-none absolute inset-0 -z-10" />
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Knowledge Corner"
            title={pick(copy, 'knowledge.hero.title')}
            lede={pick(copy, 'knowledge.hero.lede')}
          />
        </Container>
      </Section>

      <Container>
        <FlightRule className="py-2" />
      </Container>

      {/* 1 — Service anatomy */}
      <Section tone="sunken" id="anatomy" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Service anatomy"
            title="What you are actually paying for"
            lede="Pick a service, then step through it. Each stage is the work that determines whether the filing holds up under examination — and what happens when it is skipped."
          />
          <div className="mt-10">
            <Walkthrough />
          </div>

          {/* Stated plainly so nothing above can be read as a delivery
              commitment for work whose scope we have not yet seen. */}
          <Card className="bg-surface mt-6 p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="bg-accent-wash ring-accent/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] ring-1 ring-inset">
                <Clock className="text-accent h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <h3 className="text-ink text-[1.0625rem] font-semibold">
                  {TIMELINE_POSITION.heading}
                </h3>
                <p className="text-ink-3 mt-2.5 text-[0.9375rem] leading-relaxed">
                  {TIMELINE_POSITION.body}
                </p>
                <p className="text-ink-3 mt-3 border-t border-[var(--hairline)] pt-3 text-[0.8125rem] leading-relaxed">
                  {TIMELINE_POSITION.note}
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* 2 — Myths */}
      <Section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Assumptions worth correcting"
            title="Five things clients usually believe"
            lede="None of these are foolish. All of them are expensive."
          />

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {MYTHS.map((item, i) => (
              <li key={item.myth}>
                <Card className="bg-surface h-full p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="bg-sunken text-ink-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-semibold tabular-nums">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-ink-3 flex items-start gap-2 text-[0.9375rem] font-medium">
                        <EyeOff className="mt-1 h-4 w-4 shrink-0 opacity-50" strokeWidth={2} />
                        <span>{item.myth}</span>
                      </p>
                      <p className="text-ink mt-3 flex items-start gap-2 text-[0.9375rem] leading-relaxed">
                        <Eye className="text-accent mt-1 h-4 w-4 shrink-0" strokeWidth={2} />
                        <span>{item.reality}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 3 — Penalty exposure */}
      <Section tone="sunken" id="exposure" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The other side of the invoice"
            title="What getting it wrong costs"
            lede="Compliance fees are easy to compare. The exposure they exist to prevent is not — so here it is, stated plainly."
          />

          <Card className="bg-surface mt-10 overflow-hidden">
            <div className="scroll-lane">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <caption className="sr-only">Penalty exposure by compliance failure</caption>
                <thead>
                  <tr className="border-b border-[var(--hairline)]">
                    {['Trigger', 'Statute', 'Exposure', 'How it compounds'].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="text-ink-3 px-5 py-4 text-[0.75rem] font-semibold tracking-[0.04em] uppercase"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hairline)]">
                  {PENALTY_EXPOSURE.map((item) => (
                    <tr key={item.trigger} className="hover:bg-sunken/60 transition-colors">
                      <th scope="row" className="px-5 py-4 align-top">
                        <span className="text-ink block text-[0.9375rem] font-semibold">
                          {item.trigger}
                        </span>
                        <Badge tone="neutral" className="mt-1.5">
                          {item.category}
                        </Badge>
                      </th>
                      <td className="text-ink-3 px-5 py-4 align-top text-[0.875rem]">
                        {item.statute}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="text-critical inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold">
                          <TriangleAlert className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
                          {item.exposure}
                        </span>
                      </td>
                      <td className="text-ink-3 px-5 py-4 align-top text-[0.875rem] leading-relaxed">
                        {item.compounding}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-ink-3 mt-4 text-[0.8125rem]">
            Figures reflect the standard statutory position and are stated before any case-specific
            relief. They are not a substitute for advice on your own facts.
          </p>
        </Container>
      </Section>

      {/* 4 — Decoder */}
      <Section id="decoder" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Jargon, decoded"
            title="What the section number on your notice means"
            lede="Search a section or form — plain English, what to do about it, and how long you have."
          />
          <div className="mt-10">
            <DecoderSearch />
          </div>
        </Container>
      </Section>

      {/* 5 — Articles */}
      <Section tone="sunken" id="articles" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Long form"
            title="Explainers worth the ten minutes"
            lede="Written for the person signing the return, not for search engines."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {ARTICLES.map((article) => (
              <Card key={article.slug} interactive className="group bg-surface">
                <Link href={`/knowledge/${article.slug}`} className="flex h-full flex-col p-7">
                  <div className="flex items-center gap-2">
                    <Badge tone="accent">{article.category}</Badge>
                    <span className="text-ink-3 text-[0.8125rem]">{article.readingTime}</span>
                  </div>

                  <h3 className="text-ink group-hover:text-accent mt-4 text-[1.1875rem] leading-snug font-semibold tracking-[-0.015em] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-ink-3 mt-3 flex-1 text-[0.9375rem] leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--hairline)] pt-4">
                    <span className="text-ink-3 text-[0.8125rem]">
                      {article.author} · {formatDate(article.date)}
                    </span>
                    <ArrowUpRight className="text-ink-3 group-hover:text-accent h-4 w-4 transition-colors" />
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing */}
      <Section className="py-20">
        <Container>
          <Card className="bg-surface p-9 text-center sm:p-12">
            <Eyebrow>Still have a question</Eyebrow>
            <h2 className="text-ink mx-auto mt-4 max-w-2xl text-[length:var(--text-title-1)] leading-tight font-semibold tracking-[-0.028em]">
              Ask it before it becomes a deadline
            </h2>
            <p className="text-ink-3 mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed">
              If something here raised a question about your own position, that is exactly the
              conversation worth having early.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Ask us directly
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </ButtonLink>
              <ButtonLink href="/calendar" tone="outline" size="lg">
                See what is due next
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
