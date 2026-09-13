/**
 * The six practice pillars.
 *
 * Content rules applied here:
 *  - No physical office, street address, or locality claims.
 *  - No AI vendor product names — capabilities are described generically,
 *    which is both correct positioning and avoids dating the copy.
 */

export type PillarId =
  | 'tax'
  | 'scrutiny'
  | 'incorporation'
  | 'audit'
  | 'digital'
  | 'design';

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
    id: 'audit',
    title: 'Audit & Financial Systems',
    tagline: 'Assurance, and the books worth assuring',
    description:
      'Statutory and internal audit, tax audit under section 44AB, cloud accounting migration, and payroll architecture.',
    icon: 'ShieldCheck',
    accent: 'violet',
    services: [
      {
        id: 'statutory-audit',
        title: 'Statutory & internal audit',
        subtitle: 'Companies Act and section 44AB',
        description:
          'Verification of financial statements, statutory compliance, tax audit, and evaluation of internal controls.',
        features: [
          'Form 3CA/3CB and 3CD',
          'Companies Act statutory audit',
          'Internal controls review',
          'Stock and inventory verification',
        ],
      },
      {
        id: 'accounting-systems',
        title: 'Accounting systems & migration',
        subtitle: 'Zoho Books, Tally Prime, QuickBooks',
        description:
          'Migration to cloud accounting, chart of accounts design, multi-currency ledgers and automated bank feeds.',
        features: [
          'Platform setup and migration',
          'Automated bank feed integration',
          'Custom chart of accounts',
          'Inventory and cost-centre tagging',
        ],
      },
      {
        id: 'payroll-hrms',
        title: 'Payroll & HRMS',
        subtitle: 'PF, ESI, professional tax and Form 16',
        description:
          'Monthly payroll processing, salary structures optimised for legitimate tax efficiency, and statutory returns.',
        features: [
          'Tax-optimised salary structure',
          'PF and ESI monthly filings',
          'Professional tax compliance',
          'Automated payslips and Form 16',
        ],
      },
    ],
  },
  {
    id: 'digital',
    title: 'Digital Infrastructure',
    tagline: 'The software your compliance actually runs on',
    description:
      'Production web platforms, financial SaaS, internal portals and workflow automation — built by the same firm that understands the filings.',
    icon: 'Code2',
    accent: 'navy',
    services: [
      {
        id: 'web-design',
        title: 'Web design & front-end',
        subtitle: 'Marketing sites and product surfaces',
        description:
          'Fast, accessible, server-rendered sites with considered motion — not page-builder output.',
        features: [
          'Server-rendered for search visibility',
          'WCAG AA accessible by default',
          'Core Web Vitals budgeted up front',
          'Design system, not one-off pages',
        ],
        badge: 'In-house build',
      },
      {
        id: 'web-apps',
        title: 'Custom web applications',
        subtitle: 'Full-stack portals and dashboards',
        description:
          'Type-safe applications with authentication, role-based access, audit trails and real-time dashboards.',
        features: [
          'Type-safe modular codebases',
          'Role-based access control',
          'Real-time data pipelines',
          'Managed cloud hosting',
        ],
      },
      {
        id: 'financial-saas',
        title: 'Financial SaaS & commerce',
        subtitle: 'Billing, invoicing and payments',
        description:
          'Invoice engines, recurring subscription portals, payment gateway integration and customer-facing ledgers.',
        features: [
          'Razorpay and Stripe integration',
          'GST-compliant invoice engine',
          'Customer portal and receipts',
          'Subscription ledger sync',
        ],
      },
      {
        id: 'automation',
        title: 'Workflow automation & AI',
        subtitle: 'Document intelligence and assistants',
        description:
          'Document parsing, data extraction, automated status checks and internal assistants that remove manual re-keying.',
        features: [
          'Document OCR and extraction',
          'Automated reconciliation routines',
          'Lead capture and messaging bots',
          'Internal knowledge base search',
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
          'Geometric logo systems, typography architecture, colour scales, and the guidelines that keep them consistent.',
        features: [
          'Vector and dimensional logo marks',
          'Typography architecture',
          'Colour palette and tonal scales',
          'Usage guidelines and asset kits',
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
          'Social visual architecture',
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
