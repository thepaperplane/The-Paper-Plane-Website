import { ServicePillar } from "../types";

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "corporate-brand",
    title: "Corporate Brand & Visual Design",
    tagline: "High-impact visual identity & executive pitch assets",
    category: "design",
    description: "Crafting iconic brand systems, executive proposals, and visual marketing grids engineered for market dominance.",
    iconName: "Palette",
    services: [
      {
        id: "brand-identity",
        title: "Identity & Brand Marks",
        subtitle: "Minimalist Marks & Thought Clouds",
        description: "Custom geometric logos, minimalist emblems, conceptual thought clouds, typography guidelines, and complete corporate identity books.",
        features: [
          "Vector & 3D Logo Marks",
          "Typography Architecture",
          "Brand Color Palette & Saturation Scales",
          "Usage Guidelines & Asset Kits"
        ],
        iconName: "Compass",
        badge: "Core Identity"
      },
      {
        id: "corporate-collateral",
        title: "Corporate Pitch & Proposals",
        subtitle: "Cinematic Slide Transitions & Letterheads",
        description: "Executive letterheads, high-stakes investor pitch decks, cinematic presentation slides, formal business proposals, and tender books.",
        features: [
          "Investor Deck Architecture",
          "Cinematic Slide Deck Design",
          "Executive Letterhead Systems",
          "Confidential Proposal Layouts"
        ],
        iconName: "Presentation"
      },
      {
        id: "marketing-design",
        title: "Marketing & Packaging Systems",
        subtitle: "Product Packaging & Social Grids",
        description: "Premium product packaging, sleek catalogues, print posters, trade show banners, and cohesive social media visual grids.",
        features: [
          "Unboxing & Structural Packaging",
          "High-Resolution Print Catalogues",
          "Social Media Visual Architecture",
          "Trade Event Displays"
        ],
        iconName: "LayoutGrid"
      }
    ]
  },
  {
    id: "business-incorporation",
    title: "Business Structuring & Incorporation",
    tagline: "Solid legal foundations for high-growth ventures",
    category: "business",
    description: "End-to-end entity setup in Coimbatore and across India, complete with MCA registrations, statutory licenses, and project feasibility reports.",
    iconName: "Building2",
    services: [
      {
        id: "proprietorship-setup",
        title: "Proprietorship Setup",
        subtitle: "Fast-Track Single Ownership",
        description: "Streamlined registration including MSME Udyam, Trade License, Shop & Establishment, PAN, GST, and Current Account authorization.",
        features: [
          "MSME / Udyam Certificate",
          "Local Municipality License",
          "Bank Account Opening Dossier",
          "Same-Day Registration Guidance"
        ],
        iconName: "UserCheck"
      },
      {
        id: "partnership-firm",
        title: "Partnership Firm Registration",
        subtitle: "Deed Drafting & Registrar Filing",
        description: "Watertight partnership deed drafting, firm registration with District Registrar, partner PANs, and tax structure setup.",
        features: [
          "Custom Partnership Deed Drafting",
          "Registrar of Firms (ROF) Filing",
          "Partner Capital & Profit Split Logic",
          "Firm PAN & GST Allotment"
        ],
        iconName: "Users"
      },
      {
        id: "company-incorporation",
        title: "Pvt Ltd & LLP Incorporation",
        subtitle: "MCA SPICe+ & FiLLiP Fast-Track",
        description: "Complete incorporation of Private Limited Companies and Limited Liability Partnerships via MCA SPICe+ portal in 3-5 days.",
        features: [
          "DIN & Digital Signature (DSC)",
          "RUN Name Approval & SPICe+ Part A/B",
          "MoA / AoA / LLP Agreement Drafting",
          "PAN, TAN, EPFO, ESIC & Bank Account"
        ],
        iconName: "Building",
        badge: "Most Popular"
      },
      {
        id: "business-consultancy",
        title: "Business Consultancy & Project Reports",
        subtitle: "Bank Loan Dossiers & Feasibility Analysis",
        description: "Detailed project report (DPR) formulation, financial projections, cash flow models, bank loan syndication dossiers, and valuation reports.",
        features: [
          "5-Year Financial Forecast Models",
          "CMA Data for Bank Loans",
          "Break-Even & Valuation Analysis",
          "Investor Feasibility Dossiers"
        ],
        iconName: "FileSpreadsheet"
      }
    ]
  },
  {
    id: "digital-infrastructure",
    title: "Custom Digital Infrastructure & Web Development",
    tagline: "Architecting web platforms, SaaS tools & GenAI workflows",
    category: "digital",
    description: "Building ultra-fast, modern web apps, financial SaaS platforms, and automated AI agents to power your online takeover.",
    iconName: "Code2",
    services: [
      {
        id: "web-design-uiux",
        title: "Premium Web Design & UI/UX",
        subtitle: "Cinestage Micro-Interactions",
        description: "Custom, desktop-first fluid web architectures built with React, Vite, Tailwind CSS, and Framer Motion with zero boilerplate slop.",
        features: [
          "Scroll-Triggered Motion Graphics",
          "3D Canvas & WebGL Integration",
          "WCAG AA Accessible UX",
          "Ultra-Fast Core Web Vitals"
        ],
        iconName: "Monitor",
        badge: "Tech Forward"
      },
      {
        id: "custom-web-apps",
        title: "Custom Web Applications",
        subtitle: "Full-Stack Enterprise Portals",
        description: "Scalable full-stack applications with Express, Node, secure REST APIs, role-based access control, and seamless real-time dashboards.",
        features: [
          "Type-Safe Modular Codebases",
          "Real-Time Data Pipelines",
          "Custom Portal Workflows",
          "Cloud Infrastructure Hosting"
        ],
        iconName: "AppWindow"
      },
      {
        id: "financial-saas",
        title: "Financial SaaS & E-Commerce",
        subtitle: "Payment Gateways & Ledger Systems",
        description: "Custom billing, invoice generators, automated recurring subscription portals, and secure e-commerce checkout integration.",
        features: [
          "Razorpay / Stripe Payment Integration",
          "Automated GST Invoice Engine",
          "Customer Portal & Receipts",
          "Subscription Ledger Sync"
        ],
        iconName: "CreditCard"
      },
      {
        id: "genai-automation",
        title: "Workflow Automation & GenAI",
        subtitle: "AI Agents & Compliance Assistants",
        description: "Deployment of Gemini-powered AI agents, smart document parsers, automated compliance query handlers, and internal HR/Chatbots.",
        features: [
          "Gemini API Server Proxy",
          "Smart Document OCR & Summaries",
          "Automated Lead & WhatsApp Bots",
          "Internal Knowledge Base Search"
        ],
        iconName: "Bot"
      }
    ]
  },
  {
    id: "integrated-tax",
    title: "Integrated Tax Architecture & GST Compliance",
    tagline: "Precision tax engineering & seamless GST filings",
    category: "tax",
    description: "End-to-end Income Tax Return filings (ITR 1 to 7), master GST compliance, e-invoicing, ITC reconciliation, and Export/Import LUT.",
    iconName: "Receipt",
    services: [
      {
        id: "income-tax-filing",
        title: "Income Tax Filing (ITR 1 to 7)",
        subtitle: "Salaried, HNIs, Firms & Corporate Tax",
        description: "Flawless computation and submission of Income Tax Returns for individuals, salaried employees, capital gains traders, firms, and companies.",
        features: [
          "Form 26AS & AIS/TIS Reconciliation",
          "Capital Gains & Crypto Tax Optimization",
          "Old vs. New Tax Regime Evaluation",
          "Instant E-Verification Setup"
        ],
        iconName: "FileText",
        badge: "Annual Statutory"
      },
      {
        id: "master-gst",
        title: "Master GST Solutions",
        subtitle: "GSTR-1, 3B, 9/9C & e-Invoicing",
        description: "Monthly and quarterly GST filing, GSTR-2B automatic reconciliation, e-way bill management, and Annual Return (GSTR-9/9C) certification.",
        features: [
          "GSTR-1 Outward Supply Filings",
          "GSTR-3B Tax Liability Computation",
          "GSTR-2B Input Tax Credit Guard",
          "E-Way Bill & E-Invoicing Engine"
        ],
        iconName: "CheckCircle2"
      },
      {
        id: "export-import-tax",
        title: "Export & Import Compliance (IEC & LUT)",
        subtitle: "Zero-Rated Supply & Forex Duty",
        description: "Import Export Code (IEC) registration, Letter of Undertaking (LUT) for zero-rated export of services, and Forex realization certificates.",
        features: [
          "DGFT IEC Code Allotment",
          "Annual GST LUT Renewal",
          "Export Refunds & Duty Drawback",
          "Software & IT Services Export Tax"
        ],
        iconName: "Globe"
      }
    ]
  },
  {
    id: "scrutiny-defense",
    title: "Tax Scrutiny Defense & Appellate Representation",
    tagline: "Formidable legal defense against tax notices & reassessments",
    category: "scrutiny",
    description: "Specialized representation before Income Tax and GST authorities for scrutiny notices, reassessments, demands, penalties, and appeals.",
    iconName: "ShieldAlert",
    services: [
      {
        id: "sec-143-142",
        title: "Sec 143(1) & 142(1) Notice Reply",
        subtitle: "Preliminary Intimations & Document Production",
        description: "Drafting rigorous legal replies to Section 143(1) tax demand intimations and Section 142(1) inquiry notices within statutory deadlines.",
        features: [
          "Reconciliation of Discrepancies",
          "Detailed Written Submission Drafting",
          "Online E-Proceedings Upload",
          "Rectification u/s 154 Filings"
        ],
        iconName: "FileCode2"
      },
      {
        id: "sec-143-2-147",
        title: "Sec 143(2) & 147/148 Reassessment Defense",
        subtitle: "Full Scrutiny & Reopening Defense",
        description: "Defense strategy against full scrutiny notices (Sec 143(2)) and income escaping assessment re-openings (Sec 147/148).",
        features: [
          "Reason to Believe Challenge",
          "Legal Precedents & High Court Case Citation",
          "Oral Hearing & Faceless Representation",
          "Assessment Order Relief Strategy"
        ],
        iconName: "Scale"
      },
      {
        id: "demand-penalty-defense",
        title: "Demand & Penalty Defense",
        subtitle: "Penalty Immunity u/s 270A & Stay of Demand",
        description: "Representing clients against under-reporting/misreporting penalties u/s 270A, securing 20% stay of demand, and penalty waivers.",
        features: [
          "Stay of Tax Demand Applications",
          "Immunity u/s 270AA Petition",
          "GST Notice u/s 73/74 Counter-Drafting",
          "Interest & Penalty Waiver Petitions"
        ],
        iconName: "AlertTriangle"
      },
      {
        id: "sec-245-250-appeals",
        title: "Sec 245 & 250 (Appeals & Refunds)",
        subtitle: "CIT(A) First Appeals & Refund Recovery",
        description: "Filing Form 35 for First Appeals before CIT (Appeals), statement of facts drafting, grounds of appeal, and delayed tax refund recovery.",
        features: [
          "Form 35 CIT(A) Appeal Drafting",
          "Written Submissions & Paper Books",
          "GST Appellate Authority Representation",
          "Section 245 Set-Off Rectification"
        ],
        iconName: "Gavel",
        badge: "High Stakes Legal"
      }
    ]
  },
  {
    id: "statutory-audits",
    title: "Statutory Audits & Financial System Setup",
    tagline: "Rigorous financial assurance & cloud accounting infrastructure",
    category: "audit",
    description: "Independent statutory audits, internal controls evaluation, custom Tally/Zoho Books setup, and integrated payroll/HRMS.",
    iconName: "ShieldCheck",
    services: [
      {
        id: "statutory-internal-audits",
        title: "Statutory & Internal Audits",
        subtitle: "Companies Act & Tax Audit u/s 44AB",
        description: "Comprehensive audit services verifying financial statements accuracy, statutory compliance, Tax Audit u/s 44AB, and internal controls.",
        features: [
          "Tax Audit Form 3CA/3CB & 3CD",
          "Companies Act Statutory Audit",
          "Internal Operational Controls Audit",
          "Stock & Inventory Verification"
        ],
        iconName: "ClipboardCheck"
      },
      {
        id: "accounting-software-setup",
        title: "Accounting Software & Cloud Migration",
        subtitle: "Zoho Books, Tally Prime & Quickbooks",
        description: "Migration to modern cloud accounting software, chart of accounts setup, multi-currency ledger design, and automated bank feeds.",
        features: [
          "Zoho Books & Tally Prime Setup",
          "Automated Bank Feed Integration",
          "Custom Chart of Accounts",
          "Inventory & Cost Center Tagging"
        ],
        iconName: "CloudCog"
      },
      {
        id: "payroll-hrms",
        title: "Payroll Architecture & HRMS Setup",
        subtitle: "PF, ESI, Professional Tax & Payslips",
        description: "Automated monthly payroll processing, salary structure optimization for maximum tax savings, PF/ESI returns, and HRMS software.",
        features: [
          "Tax-Optimized Salary Structure",
          "PF & ESI Monthly Filings",
          "Professional Tax (PT) Compliance",
          "Automated Employee Payslips & Form 16"
        ],
        iconName: "BadgePercent"
      }
    ]
  }
];
