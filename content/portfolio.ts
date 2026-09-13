/**
 * Web development portfolio.
 *
 * `status` controls public visibility:
 *   'live'   — reachable, captured, shown on the public work page.
 *   'staged' — recorded here and editable in the admin console, but hidden
 *              from the public page until it is reachable.
 *
 * Verified on 13 September 2026:
 *   vihanadental.in   → 200 OK. Sends `X-Frame-Options: SAMEORIGIN`, so it
 *                       cannot be iframed; previews use captured screenshots.
 *   slmboutique.in    → Shopify storefront behind a password gate
 *                       (302 → /password) and `frame-ancestors 'none'`.
 *   thenilgiriroot.in → NXDOMAIN. The domain does not resolve at all.
 *
 * Once a staged site becomes reachable, flip `status` to 'live' (or do it
 * from the admin console) and the capture job will populate its screenshots.
 */

export type ProjectStatus = 'live' | 'staged';

export type Project = {
  slug: string;
  name: string;
  url: string;
  /** Hostname shown in the mockup chrome. */
  displayUrl: string;
  sector: string;
  year: number;
  summary: string;
  brief: string;
  stack: string[];
  highlights: { label: string; value: string }[];
  status: ProjectStatus;
  /** Reason surfaced in the admin console when staged. */
  statusNote?: string;
  /** Populated by the capture pipeline; null until first capture. */
  shots: {
    desktop: string | null;
    mobile: string | null;
    capturedAt: string | null;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: 'vihana-dental',
    name: 'Vihana Dental Care',
    url: 'https://vihanadental.in',
    displayUrl: 'vihanadental.in',
    sector: 'Healthcare · Dental practice',
    year: 2026,
    summary:
      'A patient-facing site for a multi-chair dental practice — treatment information, practitioner credentials and appointment enquiry, built to be found in local search.',
    brief:
      'The practice needed to be discoverable for treatment-intent searches and to convert that traffic into booked appointments, without a receptionist fielding every question first. We built a fast, content-led site with structured treatment pages and a low-friction enquiry path.',
    stack: ['Responsive web', 'Local SEO', 'Appointment enquiry', 'Performance budget'],
    highlights: [
      { label: 'Treatment pages', value: 'Structured' },
      { label: 'Enquiry path', value: 'Two taps' },
      { label: 'Built for', value: 'Local search' },
    ],
    status: 'live',
    shots: { desktop: null, mobile: null, capturedAt: null },
  },
  {
    slug: 'slm-boutique',
    name: 'SLM Boutique',
    url: 'https://slmboutique.in',
    displayUrl: 'slmboutique.in',
    sector: 'Retail · Fashion commerce',
    year: 2026,
    summary:
      'A commerce storefront for a boutique label — catalogue, collections and checkout, with the back-office kept simple enough for the owner to run unaided.',
    brief:
      'The brief was a storefront the owner could operate without a developer on call: product upload, collection curation and order management handled in-platform, with the visual identity carried through checkout.',
    stack: ['Shopify', 'Custom theme', 'Payments', 'Catalogue design'],
    highlights: [
      { label: 'Platform', value: 'Shopify' },
      { label: 'Theme', value: 'Custom' },
      { label: 'Owner-operated', value: 'End to end' },
    ],
    status: 'staged',
    statusNote:
      'Storefront is currently behind a Shopify password gate, so it is not publicly reachable and cannot be captured.',
    shots: { desktop: null, mobile: null, capturedAt: null },
  },
  {
    slug: 'the-nilgiri-root',
    name: 'The Nilgiri Root',
    url: 'https://thenilgiriroot.in',
    displayUrl: 'thenilgiriroot.in',
    sector: 'Food & beverage · Direct to consumer',
    year: 2026,
    summary:
      'A direct-to-consumer brand site for a Nilgiris-sourced produce label — origin storytelling paired with a straightforward purchase path.',
    brief:
      'Provenance is the product here, so the site leads with sourcing and process before it asks for a sale. The commerce layer stays deliberately plain so the storytelling carries the page.',
    stack: ['Brand site', 'Storytelling', 'Commerce', 'Content design'],
    highlights: [
      { label: 'Focus', value: 'Provenance' },
      { label: 'Model', value: 'Direct to consumer' },
      { label: 'Content', value: 'Long form' },
    ],
    status: 'staged',
    statusNote:
      'Domain does not currently resolve (NXDOMAIN). Registration or DNS needs to be pointed before the site can be captured.',
    shots: { desktop: null, mobile: null, capturedAt: null },
  },
];

export const LIVE_PROJECTS = PROJECTS.filter((p) => p.status === 'live');
export const STAGED_PROJECTS = PROJECTS.filter((p) => p.status === 'staged');

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
