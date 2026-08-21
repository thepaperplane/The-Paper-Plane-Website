export interface DecoderEntry {
  title: string;
  act: string;
  summary: string;
  action: string;
  timeline: string;
}

export const DECODER_DATABASE: Record<string, DecoderEntry> = {
  "148": {
    title: "Section 148 / 148A - Income Escaping Assessment",
    act: "Income Tax Act, 1961",
    summary: "Show-cause notice issued when AO believes income has escaped tax assessment based on AIS/TIS data.",
    action: "Mandatory show-cause reply u/s 148A(b) challenging evidence relevance and statutory time limits.",
    timeline: "Reply due within 7 to 30 days as specified in show-cause notice.",
  },
  "143(1)": {
    title: "Section 143(1) - Intimation & Tax Adjustment",
    act: "Income Tax Act, 1961",
    summary: "Automated CPC processing statement calculating tax refund, demand, or arithmetical adjustments.",
    action: "File Rectification u/s 154 or pay demand to prevent bank account lien.",
    timeline: "Standard CPC processing turnaround is 30 days.",
  },
  "143(2)": {
    title: "Section 143(2) - Notice for Full Tax Scrutiny",
    act: "Income Tax Act, 1961",
    summary: "Notice issued selecting return for full scrutiny assessment.",
    action: "Prepare comprehensive paper books, bank statements, and legal argument notes for faceless hearing.",
    timeline: "Notice served within 3 months from end of financial year in which return was filed.",
  },
  "270a": {
    title: "Section 270A - Penalty for Under-Reporting Income",
    act: "Income Tax Act, 1961",
    summary: "Penalty of 50% for under-reporting or 200% for misreporting of income.",
    action: "File Immunity Petition u/s 270AA if tax and interest are paid without appeal.",
    timeline: "File petition within 1 month from receipt of assessment order.",
  },
  "44ab": {
    title: "Section 44AB - Statutory Tax Audit",
    act: "Income Tax Act, 1961",
    summary: "Mandatory audit for businesses with turnover exceeding ₹1 Crore (₹10 Cr if cash transactions < 5%).",
    action: "Submit Form 3CA/3CB-3CD certified by a Chartered Accountant.",
    timeline: "Due on or before October 31st.",
  },
  "gstr-3b": {
    title: "GSTR-3B - Monthly Summary Return",
    act: "CGST Act, 2017",
    summary: "Self-assessed return detailing outward supplies, ITC claimed, and net tax payable.",
    action: "Reconcile GSTR-2B before claiming ITC to avoid interest u/s 50.",
    timeline: "Due on the 20th of every month.",
  },
};

export const getDecoderEntry = (section: string): DecoderEntry => {
  const match = DECODER_DATABASE[section.toLowerCase().trim()];
  if (match) return match;

  return {
    title: `Section / Provision ${section}`,
    act: "Statutory Provision Query",
    summary: `Analysis for section ${section}: requires verification against current Tax & GST statutes.`,
    action: "Consult The Paper Plane Coimbatore Tax Desk for tailored opinion.",
    timeline: "Turnaround: Same-day review.",
  };
};
