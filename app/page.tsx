import { Masthead } from '@/components/home/masthead';
import { TwoSides } from '@/components/home/two-sides';
import { Container, Label, Numeral, Section, TextLink } from '@/components/ui';
import { COMPLIANCE_EVENTS } from '@/content/calendar';
import { SERVICE_ANATOMY } from '@/content/knowledge';
import { loadContent, pick } from '@/lib/content';
import { ordinal } from '@/lib/utils';

export default async function HomePage() {
  const copy = await loadContent('home');
  const monthly = COMPLIANCE_EVENTS.filter((e) => e.cadence === 'monthly');
  const anatomy = SERVICE_ANATOMY[0];

  return (
    <>
      <Masthead
        title={pick(copy, 'home.hero.title')}
        titleAccent={pick(copy, 'home.hero.titleAccent')}
        lede={pick(copy, 'home.hero.lede')}
      />

      <TwoSides />

      {/* ------------------------------------------------------------------
          Position statement. A single held thought, set large, with acres of
          space around it — the page needs one place where it stops listing
          and simply says something.
         ------------------------------------------------------------------ */}
      <Section rhythm="lg" tone="inverse">
        <Container>
          <div className="grid grid-cols-12">
            <blockquote className="reveal col-span-12 lg:col-span-10 lg:col-start-2">
              <p className="font-[family-name:var(--font-display)] text-[length:var(--text-display-2)] leading-[1.08]">
                Most firms hand you off — a filing agent, a lawyer, an agency, none of whom
                speak to each other.{' '}
                <span className="italic opacity-70">
                  The handoff is where compliance actually fails.
                </span>
              </p>
            </blockquote>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          What you are paying for — a single anatomy, not a grid of teasers.
         ------------------------------------------------------------------ */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
            <div className="reveal">
              <div className="mb-5 flex items-center gap-3">
                <span className="bg-accent h-px w-6 shrink-0" />
                <Label>Knowledge</Label>
              </div>
              <h2 className="text-[length:var(--text-title-1)]">
                What you are actually paying for
              </h2>
              <p className="text-ink-2 mt-6 max-w-[40ch] text-[length:var(--text-small)] leading-[1.75]">
                Compliance work is mostly invisible, which is why it is easy to under-price and
                expensive to get wrong. We publish the anatomy of each engagement instead of
                asking you to take it on trust.
              </p>
              <div className="mt-8">
                <TextLink href="/knowledge">Open the Knowledge Corner</TextLink>
              </div>
            </div>

            <div className="reveal" data-reveal-delay="140">
              <Label>{anatomy.service}</Label>
              <p className="text-ink-3 mt-5 text-[length:var(--text-body-lg)] italic">
                {anatomy.perception}
              </p>
              <p className="text-ink mt-5 max-w-[52ch] text-[length:var(--text-body)] leading-[1.7]">
                {anatomy.reality}
              </p>

              <ol className="mt-12">
                {anatomy.steps.map((step, i) => (
                  <li key={step.label} className="grid grid-cols-[3rem_1fr_auto] gap-4 border-t py-4">
                    <Numeral value={i + 1} className="text-[length:var(--text-caption)] pt-1" />
                    <span className="text-ink text-[length:var(--text-small)]">{step.label}</span>
                    <span className="text-ink-3 pt-0.5 text-right text-[length:var(--text-micro)] tabular-nums">
                      {step.share}%
                    </span>
                  </li>
                ))}
              </ol>
              <p className="text-ink-3 mt-4 text-[length:var(--text-micro)]">
                Share of the work, not a duration. Timelines are agreed in writing once scope is
                known.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          The recurring month, as a horizontal index. Short rhythm — this is a
          breath between two larger sections, not a destination.
         ------------------------------------------------------------------ */}
      <Section rhythm="sm" tone="sunken" className="border-y">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <Label>Every month, without exception</Label>
            <TextLink href="/calendar" className="text-ink-3">
              Full compliance calendar
            </TextLink>
          </div>

          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {monthly.map((event, i) => (
              <li
                key={event.id}
                className="reveal border-t pt-5"
                data-reveal-delay={String(i * 80)}
              >
                <span className="numeral block text-[length:var(--text-title-1)] leading-none">
                  {ordinal(event.day)}
                </span>
                <h3 className="text-ink mt-4 font-[family-name:var(--font-sans)] text-[length:var(--text-small)] font-medium">
                  {event.title}
                </h3>
                <span className="ref text-ink-3 mt-2 block">{event.statute}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------
          Close.
         ------------------------------------------------------------------ */}
      <Section rhythm="lg">
        <Container>
          <div className="grid grid-cols-12">
            <div className="reveal col-span-12 lg:col-span-9">
              <h2 className="text-[length:var(--text-display-2)] leading-[1]">
                {pick(copy, 'home.cta.title')}
              </h2>
              <p className="text-ink-2 mt-8 max-w-[48ch] text-[length:var(--text-lede)] leading-[1.5]">
                {pick(copy, 'home.cta.lede')}
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
                <TextLink href="/contact" className="text-[length:var(--text-body)]">
                  Start a conversation
                </TextLink>
                <TextLink href="/work" className="text-ink-3 text-[length:var(--text-body)]">
                  See the work
                </TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
