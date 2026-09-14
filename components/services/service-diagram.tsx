import { SCRUTINY_SET, STRUCTURE_SET, TAX_SET } from '@/components/services/service-diagrams';
import { BOOKS_SET, DESIGN_SET, DIGITAL_SET } from '@/components/services/service-diagrams-2';

/**
 * Service id to drawing.
 *
 * Keyed by the `id` in content/services.ts. A service with no entry renders
 * nothing rather than a placeholder — a missing drawing should be invisible,
 * not a grey box announcing that something is missing.
 */
const REGISTRY: Record<string, (p: { className?: string }) => React.ReactElement> = {
  /* Tax Architecture & GST */
  'income-tax-filing': TAX_SET.IncomeTaxFiling,
  'master-gst': TAX_SET.MasterGst,
  'export-import': TAX_SET.ExportImport,

  /* Scrutiny Defence & Appeals */
  'sec-143-142': SCRUTINY_SET.Sec143142,
  'sec-148': SCRUTINY_SET.Sec148,
  'demand-penalty': SCRUTINY_SET.DemandPenalty,
  appeals: SCRUTINY_SET.Appeals,

  /* Structuring & Incorporation */
  'company-incorporation': STRUCTURE_SET.CompanyIncorporation,
  proprietorship: STRUCTURE_SET.Proprietorship,
  partnership: STRUCTURE_SET.Partnership,
  'project-reports': STRUCTURE_SET.ProjectReports,

  /* Books & Audit Readiness */
  bookkeeping: BOOKS_SET.Bookkeeping,
  'internal-audit': BOOKS_SET.InternalAudit,
  'accounting-systems': BOOKS_SET.AccountingSystems,
  'payroll-hrms': BOOKS_SET.PayrollHrms,

  /* Digital Infrastructure */
  'web-design': DIGITAL_SET.WebDesign,
  'web-apps': DIGITAL_SET.WebApps,
  'financial-saas': DIGITAL_SET.FinancialSaas,
  automation: DIGITAL_SET.Automation,

  /* Brand & Visual Design */
  'brand-identity': DESIGN_SET.BrandIdentity,
  'pitch-collateral': DESIGN_SET.PitchCollateral,
  'marketing-systems': DESIGN_SET.MarketingSystems,
};

export function ServiceDiagram({ id }: { id: string }) {
  const Drawing = REGISTRY[id];
  if (!Drawing) return null;
  return (
    <div className="dg-mini-wrap bg-sunken mb-5 px-4 py-3 sm:px-5 sm:py-4">
      <Drawing />
    </div>
  );
}

export const SERVICE_DIAGRAM_IDS = Object.keys(REGISTRY);
