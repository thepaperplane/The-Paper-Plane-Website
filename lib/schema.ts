import { DECODER, MYTHS } from '@/content/knowledge';
import { ALL_SERVICES, PILLARS } from '@/content/services';
import { SITE } from '@/lib/site';

/**
 * Structured data.
 *
 * Three audiences, one vocabulary:
 *
 *   search engines  want to know what this page is and how it relates to the
 *                   rest of the site — BreadcrumbList, ProfessionalService,
 *                   OfferCatalog.
 *   answer engines  want a question and its answer adjacent and unambiguous,
 *                   so they can lift one into a featured snippet or read it
 *                   aloud — FAQPage, DefinedTerm, HowTo.
 *   generative      want entities with stable identifiers and explicit
 *                   relationships, so a model can cite the practice as the
 *                   source of a claim rather than paraphrasing it anonymously
 *                   — @id everywhere, `about`, `mentions`, `knowsAbout`.
 *
 * Everything here is generated from the same content the page renders. Schema
 * that disagrees with the visible page is worse than none: it is the one SEO
 * error that gets a site penalised rather than ignored, and it goes stale the
 * moment someone edits copy without remembering the markup.
 */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

/** The entity everything else hangs off. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

/**
 * Topical authority, stated explicitly.
 *
 * `knowsAbout` is how a generative engine decides whether this practice is a
 * plausible source on a subject. Kept to what the site actually publishes
 * depth on — claiming breadth the content does not support is how a site ends
 * up cited for things it has no business being cited for.
 */
export function expertiseJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    knowsAbout: [
      'Goods and Services Tax compliance in India',
      'Income tax return filing in India',
      'Income tax scrutiny assessment and reassessment',
      'Company incorporation and LLP registration in India',
      'Book-keeping and monthly financial verification',
      'Internal audit and controls review',
      'Payroll processing and statutory deductions',
      'Web application development',
      'Business process automation',
    ],
    areaServed: { '@type': 'Country', name: 'India' },
    knowsLanguage: ['en', 'ta'],
  };
}

/** Where the reader is. Improves sitelinks and gives models the hierarchy. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

/**
 * The offering as a catalogue.
 *
 * One OfferCatalog per discipline rather than twenty-two loose Services, which
 * is what actually surfaces as a structured result — and it mirrors how the
 * page itself is organised.
 */
export function serviceCatalogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${SITE.name} — services`,
      itemListElement: PILLARS.map((pillar) => ({
        '@type': 'OfferCatalog',
        name: pillar.title,
        description: pillar.tagline,
        itemListElement: pillar.services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            '@id': `${SITE.url}/services#${service.id}`,
            name: service.title,
            description: service.description,
            serviceType: pillar.title,
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'India' },
          },
        })),
      })),
    },
  };
}

/**
 * FAQ, built from the myths the Knowledge Corner already corrects.
 *
 * These are genuine questions with direct answers, which is the only kind
 * Google will surface — a marketing question whose answer is "contact us" gets
 * the whole block ignored, and repeat offences get structured data on the
 * domain distrusted.
 */
export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE.url}/knowledge#faq`,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: MYTHS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.reality },
    })),
  };
}

/**
 * The statutory decoder as defined terms.
 *
 * The site's strongest answer-engine asset: sections of Indian tax law with a
 * one-paragraph plain-English definition each — exactly the shape a voice
 * assistant reads out and a model cites. Generated from DECODER, so it grows
 * as that does rather than needing to be kept in step by hand.
 */
export function definedTermsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE.url}/knowledge#decoder`,
    name: 'Indian tax and compliance terms, in plain English',
    description:
      'Statutory sections and forms a business is likely to receive, each explained in one paragraph with what to do about it.',
    publisher: { '@id': ORG_ID },
    hasDefinedTerm: DECODER.map((entry) => ({
      '@type': 'DefinedTerm',
      '@id': `${SITE.url}/knowledge#term-${encodeURIComponent(entry.key)}`,
      name: entry.title,
      termCode: entry.key,
      description: entry.plainEnglish,
      inDefinedTermSet: `${SITE.url}/knowledge#decoder`,
    })),
  };
}

/** The engagement sequence, which is a genuine procedure rather than a pitch. */
export function engagementHowToJsonLd() {
  const steps = [
    [
      'Send the document',
      'Send the notice, the deadline or the brief. It is read in full, against the section it cites, before anyone quotes a fee.',
    ],
    [
      'Agree the scope in writing',
      'What is included, what is explicitly not, what it costs, and what is needed from you and by when.',
    ],
    [
      'Groundwork',
      'Reconciliation, ledger repair and evidence gathering — typically three-quarters of the hours, and the part that decides whether the filing survives examination.',
    ],
    [
      'Review',
      'Preparation and review are separate passes by separate people, with the reviewer working from the underlying records rather than the draft.',
    ],
    [
      'Aftercare',
      'Working papers are retained and indexed, so a notice arriving months later is answered from the file rather than reconstructed.',
    ],
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE.url}/#engagement`,
    name: 'How an engagement runs at The Paper Plane',
    description:
      'The five stages every engagement follows, whether it is a scrutiny notice or a product build.',
    step: steps.map(([name, text], i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name,
      text,
      url: `${SITE.url}/#engagement`,
    })),
  };
}

/** Serialises a set of graphs into one script payload. */
export function jsonLdScript(...graphs: object[]) {
  return JSON.stringify(graphs.length === 1 ? graphs[0] : graphs);
}

export const SERVICE_COUNT = ALL_SERVICES.length;
