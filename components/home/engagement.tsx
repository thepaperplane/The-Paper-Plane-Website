'use client';

import {
  AftercareDiagram,
  GroundworkDiagram,
  ReadDiagram,
  ReviewDiagram,
  ScopeDiagram,
} from '@/components/home/engagement-diagrams';
import { Container, Label, Section } from '@/components/ui';
import { Slideshow, type Slide } from '@/components/site/slideshow';

/**
 * How an engagement actually runs.
 *
 * The single most common reason a prospective client hesitates is that they
 * cannot picture what happens after they send the first email. This section
 * answers that directly and in order, one stage at a time, rather than listing
 * five value propositions and hoping.
 */

const SLIDES: Slide[] = [
  {
    id: 'read',
    label: 'First read',
    title: 'Someone reads the actual document',
    body: 'Not a summary of it. The notice, the contract, the brief — read in full, against the section it cites, before anyone quotes a fee. Most of what determines the outcome is decided by which clause you are actually answering.',
    note: 'No charge for this, and no obligation after it.',
    render: (active) => <ReadDiagram active={active} />,
  },
  {
    id: 'scope',
    label: 'Scope',
    title: 'Scope is agreed in writing first',
    body: 'What is included, what is explicitly not, what it costs, and what we need from you and by when. The out-of-scope column is written down with the same care as the in-scope one, because that is the column that causes arguments later.',
    note: 'If the work turns out to be larger than the notice suggested, you hear it then — not in an invoice.',
    render: (active) => <ScopeDiagram active={active} />,
  },
  {
    id: 'groundwork',
    label: 'Groundwork',
    title: 'The invisible majority of the work',
    body: 'Reconciliation, ledger repair, evidence gathering, the discovery pass on a build. It is the part nobody sees and the only part that decides whether the filing survives being examined a year later.',
    note: 'This is typically three-quarters of the hours on a compliance engagement.',
    render: (active) => <GroundworkDiagram active={active} />,
  },
  {
    id: 'review',
    label: 'Review',
    title: 'Nothing leaves on one pair of eyes',
    body: 'Preparation and review are separate passes by separate people. The reviewer works from the underlying records rather than the draft, because checking a document against itself finds nothing.',
    render: (active) => <ReviewDiagram active={active} />,
  },
  {
    id: 'aftercare',
    label: 'Aftercare',
    title: 'The file stays open after the deadline',
    body: 'Working papers are retained and indexed, so when a notice arrives fourteen months later the reply is assembled from the file rather than reconstructed from memory. Reconstruction is where positions get lost.',
    note: 'Queries on work already filed are answered as part of the engagement.',
    render: (active) => <AftercareDiagram active={active} />,
  },
];

export function Engagement() {
  return (
    <Section rhythm="lg">
      <Container>
        <div className="grid grid-cols-12">
          <div className="reveal col-span-12 lg:col-span-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-accent h-px w-6 shrink-0" />
              <Label>How an engagement runs</Label>
            </div>
            <h2 className="text-[length:var(--text-display-2)] leading-[1.04]">
              Five stages, in this order, <span className="em-serif">every time.</span>
            </h2>
            <p className="text-ink-2 mt-7 max-w-[52ch] text-[length:var(--text-lede)] leading-[1.5]">
              The same sequence whether it is a scrutiny notice or a product build. It runs on its
              own below — take it over whenever you like.
            </p>
          </div>
        </div>

        <Slideshow
          slides={SLIDES}
          ariaLabel="How an engagement runs"
          stepMs={7000}
          className="mt-16"
        />
      </Container>
    </Section>
  );
}
