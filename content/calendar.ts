/**
 * Statutory compliance calendar.
 *
 * `recurring` entries repeat on the same day every month.
 * `annual` entries fall on one fixed date each year.
 *
 * Dates reflect the standard statutory position. The department issues
 * extensions from time to time; the UI states this explicitly rather than
 * implying these dates are guaranteed.
 */

export type ComplianceCategory =
  | 'Income Tax'
  | 'GST'
  | 'Payroll'
  | 'Audit'
  | 'MCA';

export type ComplianceEvent = {
  id: string;
  /** Day of month, 1–31. */
  day: number;
  /** Omitted for monthly recurring events. */
  month?: number;
  cadence: 'monthly' | 'quarterly' | 'annual';
  title: string;
  category: ComplianceCategory;
  description: string;
  statute: string;
  penalty?: string;
  appliesTo: string;
};

export const COMPLIANCE_EVENTS: ComplianceEvent[] = [
  {
    id: 'tds-tcs',
    day: 7,
    cadence: 'monthly',
    title: 'TDS / TCS deposit',
    category: 'Income Tax',
    description:
      'Deposit of tax deducted and collected at source for the preceding calendar month.',
    statute: 'Income Tax Act, 1961 — s.200',
    penalty: 'Interest at 1.5% per month, part months counted in full.',
    appliesTo: 'Every deductor and collector',
  },
  {
    id: 'gstr-1',
    day: 11,
    cadence: 'monthly',
    title: 'GSTR-1 — outward supplies',
    category: 'GST',
    description:
      'Invoice-level outward supply return: B2B, exports, credit and debit notes, and B2C summary.',
    statute: 'CGST Act, 2017 — s.37',
    penalty: 'Late fee ₹50 per day (₹20 for nil returns), subject to cap.',
    appliesTo: 'Monthly filers',
  },
  {
    id: 'pf-esi',
    day: 15,
    cadence: 'monthly',
    title: 'Provident fund & ESI remittance',
    category: 'Payroll',
    description:
      'Payment of employee and employer EPF contributions and ESI dues through the unified portal.',
    statute: 'EPF & MP Act, 1952 · ESI Act, 1948',
    penalty:
      'Employee contributions paid late are permanently disallowed as expenditure under s.36(1)(va).',
    appliesTo: 'Employers above threshold headcount',
  },
  {
    id: 'gstr-3b',
    day: 20,
    cadence: 'monthly',
    title: 'GSTR-3B — summary return & payment',
    category: 'GST',
    description:
      'Self-assessed summary return and payment of net cash liability after input tax credit set-off.',
    statute: 'CGST Act, 2017 — s.39',
    penalty: 'Interest at 18% per annum on delayed tax, plus late fee.',
    appliesTo: 'Monthly filers',
  },
  {
    id: 'itr-non-audit',
    day: 31,
    month: 7,
    cadence: 'annual',
    title: 'Income tax return — non-audit cases',
    category: 'Income Tax',
    description:
      'ITR-1, 2 and 4 for individuals, salaried taxpayers, HUFs and businesses not subject to audit.',
    statute: 'Income Tax Act, 1961 — s.139(1)',
    penalty: 'Late fee under s.234F (₹1,000–₹5,000) plus interest under s.234A.',
    appliesTo: 'Individuals and non-audit entities',
  },
  {
    id: 'tax-audit-report',
    day: 30,
    month: 9,
    cadence: 'annual',
    title: 'Tax audit report — Form 3CA/3CB-3CD',
    category: 'Audit',
    description:
      'Upload of the audit report certified by a practising chartered accountant.',
    statute: 'Income Tax Act, 1961 — s.44AB',
    penalty: 'Penalty under s.271B: 0.5% of turnover, capped at ₹1,50,000.',
    appliesTo: 'Entities crossing the audit threshold',
  },
  {
    id: 'itr-audit',
    day: 31,
    month: 10,
    cadence: 'annual',
    title: 'Income tax return — audit cases',
    category: 'Income Tax',
    description:
      'ITR-3, 5 and 6 for companies, working partners, and businesses subject to tax audit.',
    statute: 'Income Tax Act, 1961 — s.139(1)',
    penalty: 'Interest under s.234A/B/C and loss of carry-forward for losses.',
    appliesTo: 'Audited businesses and companies',
  },
  {
    id: 'mca-aoc-4',
    day: 30,
    month: 10,
    cadence: 'annual',
    title: 'MCA Form AOC-4 — financial statements',
    category: 'MCA',
    description:
      'Filing of balance sheet, profit and loss account and directors’ report with the Registrar.',
    statute: 'Companies Act, 2013 — s.137',
    penalty: '₹100 per day of delay, with separate officer liability.',
    appliesTo: 'Every registered company',
  },
  {
    id: 'mca-mgt-7',
    day: 29,
    month: 11,
    cadence: 'annual',
    title: 'MCA Form MGT-7 — annual return',
    category: 'MCA',
    description:
      'Annual return covering shareholding, board meetings and director particulars.',
    statute: 'Companies Act, 2013 — s.92',
    penalty: '₹100 per day of delay.',
    appliesTo: 'Every registered company',
  },
  {
    id: 'gstr-9',
    day: 31,
    month: 12,
    cadence: 'annual',
    title: 'GSTR-9 & 9C — annual return',
    category: 'GST',
    description:
      'Annual GST return and self-certified reconciliation statement for eligible taxpayers.',
    statute: 'CGST Act, 2017 — s.44',
    penalty: '₹200 per day, capped at 0.25% of turnover.',
    appliesTo: 'Registered taxpayers above threshold',
  },
];

export type Turnaround = {
  section: string;
  service: string;
  duration: string;
  detail: string;
};

export const TURNAROUNDS: Turnaround[] = [
  {
    section: 'Section 143(1)',
    service: 'Processing & refund order',
    duration: '30 days',
    detail:
      'Automated processing by the Centralised Processing Centre. Adjustments or refunds follow verification.',
  },
  {
    section: 'Section 142(1)',
    service: 'Preliminary inquiry reply',
    duration: '15 days',
    detail:
      'The window the assessing officer grants to furnish accounts, documents or written explanation.',
  },
  {
    section: 'Section 143(2)',
    service: 'Full scrutiny notice',
    duration: 'Within 3 months of FY end',
    detail:
      'Served to verify the return. Defence submissions follow the hearing schedule that is issued with it.',
  },
  {
    section: 'Section 250',
    service: 'CIT(A) first appeal',
    duration: 'File within 30 days',
    detail:
      'Form 35 must be filed within 30 days of receiving an adverse assessment or penalty order.',
  },
  {
    section: 'Section 54 (GST)',
    service: 'Export / unutilised ITC refund',
    duration: '60 days',
    detail:
      'Provisional refund of 90% is released within 7 days of acknowledgement; the final order follows within 60 days.',
  },
  {
    section: 'MCA SPICe+',
    service: 'Private Limited / LLP setup',
    duration: '3–5 working days',
    detail:
      'From name reservation and digital signatures through to the certificate of incorporation.',
  },
];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Every event that falls in a given month (1-indexed), sorted by day. */
export function eventsForMonth(month: number): ComplianceEvent[] {
  return COMPLIANCE_EVENTS.filter(
    (event) => event.cadence === 'monthly' || event.month === month,
  ).sort((a, b) => a.day - b.day);
}

export const CATEGORY_STYLES: Record<
  ComplianceCategory,
  { label: string; dot: string; chip: string }
> = {
  'Income Tax': {
    label: 'Income Tax',
    dot: 'bg-brand-500',
    chip: 'bg-brand-50 text-brand-700 ring-brand-500/20',
  },
  GST: {
    label: 'GST',
    dot: 'bg-success',
    chip: 'bg-success-soft text-success ring-success/20',
  },
  Payroll: {
    label: 'Payroll',
    dot: 'bg-warning',
    chip: 'bg-warning-soft text-warning ring-warning/20',
  },
  Audit: {
    label: 'Audit',
    dot: 'bg-brand-800',
    chip: 'bg-brand-100 text-brand-900 ring-brand-800/20',
  },
  MCA: {
    label: 'MCA',
    dot: 'bg-danger',
    chip: 'bg-danger-soft text-danger ring-danger/20',
  },
};
