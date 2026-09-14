/**
 * The six practice pillars.
 *
 * Content rules applied here:
 *  - No physical office, street address, or locality claims.
 *  - No AI vendor product names — capabilities are described generically,
 *    which is both correct positioning and avoids dating the copy.
 */

export type PillarId = 'tax' | 'scrutiny' | 'incorporation' | 'books' | 'digital' | 'design';

export type Service = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  badge?: string;
};

export type Pillar = {
  id: PillarId;
  title: string;
  tagline: string;
  description: string;
  /** lucide-react icon name, resolved at render time. */
  icon: string;
  /** Used for the accent treatment on cards and section headers. */
  accent: 'blue' | 'navy' | 'teal' | 'amber' | 'violet' | 'rose';
  services: Service[];
};

export const PILLARS: Pillar[] = [
  {
    id: 'tax',
    title: 'Tax Architecture & GST',
    tagline: 'Precision filing, engineered to survive scrutiny',
    description:
      'End-to-end income tax returns (ITR 1–7), monthly and annual GST compliance, e-invoicing, input credit reconciliation, and export documentation.',
    icon: 'Receipt',
    accent: 'blue',
    services: [
      {
        id: 'income-tax-filing',
        title: 'Income tax filing — ITR 1 to 7',
        subtitle: 'Salaried, HNI, firms and corporates',
        description:
          'Computation and submission for individuals, capital-gains investors, partnerships and companies, reconciled against the department’s own records before we file.',
        features: [
          'Form 26AS, AIS and TIS reconciliation',
          'Capital gains and virtual digital asset treatment',
          'Old versus new regime comparison, in writing',
          'E-verification and refund tracking',
        ],
        badge: 'Annual statutory',
      },
      {
        id: 'master-gst',
        title: 'Master GST solutions',
        subtitle: 'GSTR-1, 3B, 9 and 9C',
        description:
          'Monthly and quarterly filing with automated GSTR-2B reconciliation, e-way bill management and annual return certification.',
        features: [
          'GSTR-1 outward supply filing',
          'GSTR-3B liability computation',
          'GSTR-2B input tax credit guard',
          'E-way bill and e-invoicing setup',
        ],
      },
      {
        id: 'export-import',
        title: 'Export & import compliance',
        subtitle: 'IEC registration and LUT renewal',
        description:
          'Import Export Code allotment, Letter of Undertaking for zero-rated export of services, and foreign exchange realisation documentation.',
        features: [
          'DGFT IEC code allotment',
          'Annual GST LUT renewal',
          'Export refunds and duty drawback',
          'Software and IT services export treatment',
        ],
      },
    ],
  },
  {
    id: 'scrutiny',
    title: 'Scrutiny Defence & Appeals',
    tagline: 'Representation when the department comes calling',
    description:
      'Specialist defence before income tax and GST authorities — notices, reassessments, demands, penalties and first appeals.',
    icon: 'ShieldAlert',
    accent: 'amber',
    services: [
      {
        id: 'sec-143-142',
        title: 'Section 143(1) and 142(1) replies',
        subtitle: 'Intimations and document production',
        description:
          'Rigorous written replies to tax demand intimations and inquiry notices, filed inside the statutory window.',
        features: [
          'Reconciliation of flagged discrepancies',
          'Detailed written submissions',
          'E-proceedings portal upload',
          'Rectification under section 154',
        ],
      },
      {
        id: 'sec-148',
        title: 'Section 143(2) and 147/148 defence',
        subtitle: 'Full scrutiny and reassessment',
        description:
          'Defence strategy against full scrutiny selection and income-escaping reassessment, built on the procedural record and case law.',
        features: [
          '“Reason to believe” challenge',
          'High Court precedent citation',
          'Faceless hearing representation',
          'Assessment order relief strategy',
        ],
        badge: 'High stakes',
      },
      {
        id: 'demand-penalty',
        title: 'Demand & penalty defence',
        subtitle: 'Immunity petitions and stay of demand',
        description:
          'Representation against under-reporting and misreporting penalties, securing stay of demand and pursuing waivers.',
        features: [
          'Stay of demand applications',
          'Immunity petition under 270AA',
          'GST notice counter-drafting (73/74)',
          'Interest and penalty waiver petitions',
        ],
      },
      {
        id: 'appeals',
        title: 'Appeals & refund recovery',
        subtitle: 'CIT(A) first appeals',
        description:
          'Form 35 filing, statement of facts, grounds of appeal, paper books, and recovery of delayed refunds.',
        features: [
          'Form 35 CIT(A) drafting',
          'Written submissions and paper books',
          'GST appellate authority representation',
          'Section 245 set-off rectification',
        ],
      },
    ],
  },
  {
    id: 'incorporation',
    title: 'Structuring & Incorporation',
    tagline: 'Legal foundations that hold under growth',
    description:
      'Entity setup across India — MCA registrations, statutory licences, partnership deeds and bankable project reports.',
    icon: 'Building2',
    accent: 'teal',
    services: [
      {
        id: 'company-incorporation',
        title: 'Private Limited & LLP',
        subtitle: 'MCA SPICe+ and FiLLiP',
        description:
          'Complete incorporation through the MCA portal, from structure advisory and name reservation to the certificate itself.',
        features: [
          'DIN and digital signature',
          'Name approval, SPICe+ Part A and B',
          'MoA, AoA and LLP agreement drafting',
          'PAN, TAN, EPFO, ESIC and bank account',
        ],
        badge: 'Most requested',
      },
      {
        id: 'proprietorship',
        title: 'Proprietorship setup',
        subtitle: 'Fast-track single ownership',
        description:
          'Udyam registration, trade licence, shop and establishment, PAN, GST and current account documentation.',
        features: [
          'MSME / Udyam certificate',
          'Municipal trade licence',
          'Bank account dossier',
          'Guidance from the first conversation',
        ],
      },
      {
        id: 'partnership',
        title: 'Partnership firm registration',
        subtitle: 'Deed drafting and registrar filing',
        description:
          'Watertight deed drafting, registration with the Registrar of Firms, and the tax structure that follows from it.',
        features: [
          'Custom partnership deed',
          'Registrar of Firms filing',
          'Capital and profit-share logic',
          'Firm PAN and GST allotment',
        ],
      },
      {
        id: 'project-reports',
        title: 'Project reports & consultancy',
        subtitle: 'Bank loan dossiers and feasibility',
        description:
          'Detailed project reports, financial projections, cash-flow models, CMA data and valuation for lenders and investors.',
        features: [
          'Five-year forecast models',
          'CMA data for bank loans',
          'Break-even and valuation analysis',
          'Investor feasibility dossiers',
        ],
      },
    ],
  },
  {
    id: 'books',
    title: 'Books & Audit Readiness',
    tagline: 'Books kept so that an audit is a formality',
    description:
      'Book-keeping, monthly verification and internal audit, so the accounts are already in order when someone comes to examine them. Statutory audit and tax audit under section 44AB are reserved to a practising chartered accountant and are not carried out here — this is the work that makes those straightforward.',
    icon: 'ShieldCheck',
    accent: 'violet',
    services: [
      {
        id: 'bookkeeping',
        title: 'Book-keeping & monthly verification',
        subtitle: 'Closed every month, not every March',
        description:
          'Day-to-day book-keeping with a proper monthly close: bank and ledger reconciled, vouchers matched to entries, and the month signed off before the next one starts.',
        features: [
          'Bank and ledger reconciled monthly',
          'Every entry matched to its voucher',
          'Month-end close checklist',
          'Receivables and payables ageing',
        ],
      },
      {
        id: 'internal-audit',
        title: 'Internal audit & controls review',
        subtitle: 'Finding it before anyone else does',
        description:
          'An internal examination of your own records and processes — which entries are unsupported, where a process is letting errors through, and what to correct before the accounts go anywhere else.',
        features: [
          'Sample testing of entries and vouchers',
          'Gaps in process and control',
          'Stock and fixed-asset verification',
          'Written findings, with the fix for each',
        ],
      },
      {
        id: 'accounting-systems',
        title: 'Accounting systems & migration',
        subtitle: 'Zoho Books, Tally Prime, QuickBooks',
        description:
          'Moving your accounts onto software that suits the business, with a chart of accounts that matches how you actually operate and bank feeds that fill themselves in.',
        features: [
          'Setup and migration from your current books',
          'Bank statements imported automatically',
          'Chart of accounts built around your business',
          'Stock and cost-centre tagging',
        ],
      },
      {
        id: 'payroll-hrms',
        title: 'Payroll & HRMS',
        subtitle: 'PF, ESI, professional tax and Form 16',
        description:
          'Monthly payroll run end to end — salary structures arranged for legitimate tax efficiency, statutory deductions filed on time, and payslips out without anyone chasing.',
        features: [
          'Salary structures arranged tax-efficiently',
          'PF and ESI filed monthly',
          'Professional tax compliance',
          'Payslips and Form 16 issued automatically',
        ],
      },
    ],
  },
  {
    id: 'digital',
    title: 'Digital Infrastructure',
    tagline: 'The software your business actually runs on',
    description:
      'Websites, customer portals, billing systems and the small automations that remove repetitive work — built by the same people who handle your filings.',
    icon: 'Code2',
    accent: 'navy',
    services: [
      {
        id: 'web-design',
        title: 'Web design & front-end',
        subtitle: 'Marketing sites and product surfaces',
        description:
          'A site that loads quickly, reads well on a phone, and is built properly rather than assembled from a template.',
        features: [
          'Built to be found on Google',
          'Readable for everyone, screen readers included',
          'Fast on a phone and a slow connection',
          'One consistent look across every page',
        ],
        badge: 'Built in-house',
      },
      {
        id: 'web-apps',
        title: 'Custom web applications',
        subtitle: 'Portals and dashboards for your team',
        description:
          'Private systems for your staff or your customers — everyone signs in, everyone sees only what they should, and every change leaves a record.',
        features: [
          'Built to be maintained, not rewritten',
          'Each person sees only what they should',
          'Figures update as they change',
          'Hosted, backed up and monitored for you',
        ],
      },
      {
        id: 'financial-saas',
        title: 'Financial SaaS & commerce',
        subtitle: 'Billing, invoicing and payments',
        description:
          'Invoices that go out correctly the first time, subscriptions that bill themselves, and a place customers can see what they owe and what they have paid.',
        features: [
          'Card, UPI and netbanking payments',
          'Invoices that satisfy GST rules',
          'A portal where customers find their receipts',
          'Recurring billing kept in step with the books',
        ],
      },
      {
        id: 'automation',
        title: 'Workflow automation & AI',
        subtitle: 'Taking the repetitive work off people',
        description:
          'Software that reads figures off invoices and bank statements, checks them against your records, and tells someone when they do not agree.',
        features: [
          'Reads figures off invoices and statements',
          'Matches them against your books automatically',
          'Enquiries captured and answered quickly',
          'Your own documents, searchable',
        ],
      },
    ],
  },
  {
    id: 'design',
    title: 'Brand & Visual Design',
    tagline: 'Identity systems and the documents that close deals',
    description:
      'Brand marks, typography systems, investor decks, proposals and packaging — designed as a coherent system.',
    icon: 'Palette',
    accent: 'rose',
    services: [
      {
        id: 'brand-identity',
        title: 'Identity & brand marks',
        subtitle: 'Marks, type and guidelines',
        description:
          'A logo, typefaces and colours that work together, with simple rules so everything you produce afterwards still looks like you.',
        features: [
          'A logo that works at every size',
          'Typefaces chosen to pair',
          'A colour palette that holds together',
          'Simple rules, and every file you need',
        ],
      },
      {
        id: 'pitch-collateral',
        title: 'Pitch decks & proposals',
        subtitle: 'Investor and tender documents',
        description:
          'Investor decks, formal proposals, letterhead systems and tender books built to be read by decision-makers.',
        features: [
          'Investor deck architecture',
          'Executive letterhead systems',
          'Confidential proposal layouts',
          'Tender and RFP documents',
        ],
      },
      {
        id: 'marketing-systems',
        title: 'Marketing & packaging',
        subtitle: 'Print, packaging and social',
        description:
          'Product packaging, catalogues, print collateral, event displays and coherent social visual systems.',
        features: [
          'Structural and unboxing packaging',
          'High-resolution print catalogues',
          'A consistent look across social posts',
          'Trade event displays',
        ],
      },
    ],
  },
];

export function getPillar(id: string): Pillar | undefined {
  return PILLARS.find((p) => p.id === id);
}

export const ALL_SERVICES: (Service & { pillar: Pillar })[] = PILLARS.flatMap((pillar) =>
  pillar.services.map((service) => ({ ...service, pillar })),
);
