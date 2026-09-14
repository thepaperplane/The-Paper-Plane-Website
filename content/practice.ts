import { PILLARS, type Pillar } from './services';

/**
 * The two halves of the practice.
 *
 * The site's central claim is that advisory and engineering are equally
 * credible here, so this structure exists to guarantee the design treats them
 * identically: same shape, same field names, same rendering. Neither side can
 * become an afterthought because neither has a richer data model than the
 * other.
 */

export type PracticeSide = {
  id: 'advisory' | 'engineering';
  /** Short name used in navigation and labels. */
  name: string;
  /** Display heading — set in the serif. */
  heading: string;
  /** One sentence on what this half actually is. */
  statement: string;
  /** The proposition, in the practice's own voice. */
  body: string;
  /** Four capabilities. Four on both sides, deliberately. */
  capabilities: { title: string; detail: string }[];
  /** Pillar ids from content/services.ts that belong to this half. */
  pillarIds: string[];
  href: string;
  /** A concrete proof point rather than a claim. */
  proof: { figure: string; caption: string };
};

export const PRACTICE: PracticeSide[] = [
  {
    id: 'advisory',
    name: 'Financial & Legal',
    heading: 'Advisory',
    statement: 'Compliance, structuring and representation.',
    body: 'Returns filed against the department’s own records before they are signed. Notices answered on the procedural record first and the merits second. Books closed so they can be defended three years later, not just accepted this year.',
    capabilities: [
      {
        title: 'Tax & GST compliance',
        detail: 'ITR 1–7, monthly and annual GST, input credit reconciliation, export documentation.',
      },
      {
        title: 'Scrutiny & litigation support',
        detail: 'Notices under s.142(1), s.143(2) and s.148. Penalty defence, first appeals, paper books.',
      },
      {
        title: 'Structuring & registration',
        detail: 'Private Limited, LLP, partnership and proprietorship. MCA filings and constitutional drafting.',
      },
      {
        title: 'Audit & financial systems',
        detail: 'Statutory and tax audit under s.44AB, cloud accounting migration, payroll architecture.',
      },
    ],
    pillarIds: ['tax', 'scrutiny', 'incorporation', 'audit'],
    href: '/services#advisory',
    proof: {
      figure: 'Three-way',
      caption: 'Every purchase invoice matched against the portal and the ledger before credit is claimed.',
    },
  },
  {
    id: 'engineering',
    name: 'Digital & Tech',
    heading: 'Engineering',
    statement: 'Products, platforms and the systems beneath them.',
    body: 'The same practice that files the returns specifies the software. Invoicing that produces GST-valid documents, portals that capture what an audit will ask for later, interfaces built to a performance budget rather than to a template.',
    capabilities: [
      {
        title: 'Web & product development',
        detail: 'Server-rendered applications, client portals, dashboards, role-based access and audit trails.',
      },
      {
        title: 'Interface & experience design',
        detail: 'Design systems rather than one-off screens. Accessible to WCAG AA as a floor, not a feature.',
      },
      {
        title: 'Brand & identity',
        detail: 'Marks, typography systems, investor documents and the collateral that closes a room.',
      },
      {
        title: 'Automation & document intelligence',
        detail: 'Reconciliation routines, document extraction, status checks — the manual re-keying removed.',
      },
    ],
    pillarIds: ['digital', 'design'],
    href: '/services#engineering',
    proof: {
      figure: '106 kB',
      caption: 'First-load payload of this site — a performance budget we hold our client work to as well.',
    },
  },
];

export function pillarsFor(side: PracticeSide): Pillar[] {
  return PILLARS.filter((p) => side.pillarIds.includes(p.id));
}
