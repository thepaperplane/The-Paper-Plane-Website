import type { Metadata } from 'next';
import { Container, Heading, Label, Numeral, Section } from '@/components/ui';
import { Glass } from '@/components/glass';
import { MotionLab, SpringTrack } from '@/components/lab/motion-lab';
import { DIAGRAMS } from '@/components/knowledge/diagrams';
import { PRACTICE_MARKS } from '@/components/practice/marks';
import { ServiceDiagram } from '@/components/services/service-diagram';
import { SERVICE_DIAGRAM_IDS } from '@/components/services/service-diagram';

/**
 * The design lab.
 *
 * A live page rather than a separate Storybook, deliberately: it deploys with
 * the site, so a stakeholder reviews the real material at a real URL with no
 * install step, and it renders with the same tokens the site does. A component
 * gallery that runs in its own harness can drift from production without
 * anyone noticing — this one physically cannot.
 *
 * It is noindex. It is an internal review surface, not a page anyone should
 * arrive at from a search result.
 */

export const metadata: Metadata = {
  title: 'Design lab',
  description: 'Internal review surface for the glass material, motion system and drawings.',
  robots: { index: false, follow: false },
};

const GLASS_MATERIALS = [
  ['regular', 'The default. Panels, cards, sheets.'],
  ['thin', 'Bars over content that must stay readable through them.'],
  ['thick', 'Surfaces that should obscure what they cover.'],
  ['clear', 'Barely there; for surfaces that only need an edge.'],
  ['static', 'The look with no backdrop filter — for anything that repeats.'],
] as const;

export default function LabPage() {
  const diagramKeys = Object.keys(DIAGRAMS) as (keyof typeof DIAGRAMS)[];

  return (
    <>
      <Section rhythm="sm" className="pt-[calc(4.5rem+var(--space-section-sm))]">
        <Container>
          <Heading
            as="h1"
            size="large"
            eyebrow="Design lab"
            title={
              <>
                Every material and motion, <span className="em-serif">on one page.</span>
              </>
            }
            lede="An internal review surface. It uses the same tokens and the same components as the live site, so anything that looks right here looks right there."
          />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section className="border-t">
        <Container>
          <Label className="block">Glass materials</Label>
          <p className="text-ink-2 mt-4 max-w-[54ch] text-[length:var(--text-small)] leading-relaxed">
            The material is a budget, not a style choice. Each live surface makes the compositor
            re-sample everything behind it on every frame it changes, so anything that repeats down
            a list uses the static variant.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GLASS_MATERIALS.map(([material, note]) => (
              <Glass key={material} material={material} interactive className="p-6">
                <p className="text-ink font-[family-name:var(--font-sans)] text-[length:var(--text-body)] font-medium">
                  {material}
                </p>
                <p className="text-ink-2 mt-2 text-[length:var(--text-caption)] leading-relaxed">
                  {note}
                </p>
              </Glass>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tone="sunken" className="border-y">
        <Container>
          <Label className="block">Motion</Label>
          <p className="text-ink-2 mt-4 max-w-[54ch] text-[length:var(--text-small)] leading-relaxed">
            The size of the thing moving sets how long it takes. Press has to answer before it can
            be perceived; a section arriving can afford to take its time. Getting that ordering
            wrong is what makes an interface feel cheap even when every individual animation is
            smooth.
          </p>
          <MotionLab />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <Label className="block">Springs</Label>
          <p className="text-ink-2 mt-4 max-w-[54ch] text-[length:var(--text-small)] leading-relaxed">
            Solved and sampled as <code className="ref">linear()</code> ramps — real physics without
            a JavaScript animation runtime. Both must terminate at exactly 1; a ramp ending at 1.12
            does not read as a bounce, it lands every animation permanently 12% past its target.
          </p>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <SpringTrack name="--spring-snappy" note="Overshoots and settles. Controls." />
            <SpringTrack name="--spring-gentle" note="Softer peak. Anything large." />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tone="sunken" className="border-y">
        <Container>
          <Label className="block">Practice marks</Label>
          <p className="text-ink-2 mt-4 max-w-[54ch] text-[length:var(--text-small)] leading-relaxed">
            One per half of the practice. These play once on reveal and hold — a loop beside a
            paragraph someone is reading is a distraction.
          </p>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {(['advisory', 'engineering'] as const).map((side) => {
              const Mark = PRACTICE_MARKS[side];
              return (
                <Glass key={side} className="reveal p-6" data-shown="true">
                  <Mark />
                </Glass>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <Label className="block">Process diagrams</Label>
          <p className="text-ink-2 mt-4 max-w-[54ch] text-[length:var(--text-small)] leading-relaxed">
            Nine, covering the twenty stages of the service walkthrough. These loop, because one is
            on screen at a time and the loop is the explanation. Structure stays put; only the
            action repeats.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {diagramKeys.map((key, i) => {
              const Diagram = DIAGRAMS[key];
              return (
                <div key={key}>
                  <div className="flex items-baseline gap-3">
                    <Numeral value={i + 1} className="text-[length:var(--text-micro)]" />
                    <span className="text-ink-2 text-[length:var(--text-caption)]">{key}</span>
                  </div>
                  <Glass className="mt-3 p-5">
                    <div className="aspect-[320/176] w-full">
                      <Diagram active />
                    </div>
                  </Glass>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      <Section tone="sunken" className="border-t">
        <Container>
          <Label className="block">Service drawings</Label>
          <p className="text-ink-2 mt-4 max-w-[54ch] text-[length:var(--text-small)] leading-relaxed">
            One per service. All {SERVICE_DIAGRAM_IDS.length} of them, at the size they render on
            the services page.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_DIAGRAM_IDS.map((id) => (
              <div key={id} className="reveal" data-shown="true">
                <span className="text-ink-2 text-[length:var(--text-caption)]">{id}</span>
                <div className="mt-2">
                  <ServiceDiagram id={id} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
