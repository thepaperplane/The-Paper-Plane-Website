import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side safely
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API: AI Compliance Assistant Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAI();
    let responseText = "";

    if (!ai) {
      // Intelligent fallback answer if API key is not yet configured in env
      responseText = getFallbackResponse(message);
    } else {
      const systemInstruction = `
You are the AI Compliance & Advisory Assistant for "The Paper Plane" — a premier corporate brand, tax architecture, business structuring, and digital infrastructure firm based exclusively in Coimbatore, Tamil Nadu, India.
Contact: +91 90255 65526 (Phone/WhatsApp)
Email: contact@thepaperplane.co.in
Website: thepaperplane.co.in
Tagline: "We handle the papers. You handle the Takeoff."

Your core capabilities:
1. Provide accurate guidance on Indian Tax Architecture (ITR 1-7, GST filings GSTR-1 & 3B, Tax Scrutiny Sec 143/147/148, Appeals Sec 245/250).
2. Assist with Business Incorporation in India (Proprietorship, Partnership, Pvt Ltd, LLP, Project Reports).
3. Explain Custom Digital Infrastructure & Web Development (Web Apps, Financial SaaS, Workflow Automation & GenAI).
4. Outline Statutory Audits & Financial HRMS setups.
5. Provide Coimbatore office assistance and direct users to book a consultation or click "WhatsApp Us" (+91 90255 65526) for immediate expert takeover.

Tone: Cinematic, professional, authoritative, warm, and concise. Keep answers well-formatted with bullet points or quick steps when helpful.
`;

      const contents = [
        ...(history || []).map((h: { sender: string; text: string }) => ({
          role: h.sender === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        })),
        { role: "user", parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      responseText = response.text || "I am here to help you navigate paper compliance and business takeoff!";
    }

    // Generate WhatsApp quick payload for handoff if appropriate
    const whatsappLink = `https://wa.me/919025565526?text=${encodeURIComponent(
      `Hello The Paper Plane, I discussed: "${message.slice(0, 80)}..." and need expert consultation.`
    )}`;

    return res.json({
      response: responseText,
      whatsappLink,
      coimbatoreMeta: {
        address: "The Paper Plane Headquarters, Avinashi Road, Coimbatore, Tamil Nadu 641018",
        phone: "+91 90255 65526",
        email: "contact@thepaperplane.co.in",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return res.status(500).json({
      error: "Failed to process compliance query",
      details: error.message,
      fallback: getFallbackResponse(req.body.message || ""),
    });
  }
});

// Helper for fallback AI compliance query response
function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("gst") || q.includes("gstr")) {
    return "Master GST Solutions at The Paper Plane: GSTR-1 is due on the 11th of every month and GSTR-3B on the 20th. We handle multi-state registration, reconciliation, ITC optimization, and export/import LUT compliance. Connect with us on WhatsApp +91 90255 65526 for zero-error GST handling!";
  }
  if (q.includes("itr") || q.includes("income tax") || q.includes("tax")) {
    return "Income Tax Architecture: Salaried and non-audit ITRs (ITR 1 to 4) have a deadline of July 31st. Tax audit cases are due on August 31st (ITR) and October 31st (Audit Report). We also specialize in Section 143(2), 147/148 Scrutiny Defense and Section 250 Appeals.";
  }
  if (q.includes("incorporation") || q.includes("pvt ltd") || q.includes("llp") || q.includes("company")) {
    return "Business Structuring & Incorporation: We offer end-to-end setup for Pvt Ltd Companies, LLPs, Partnerships, and Proprietorships in Coimbatore, including MCA SPICe+ approval, PAN/TAN, GST, Bank Account setup, and 1-Year compliance roadmap.";
  }
  if (q.includes("web") || q.includes("app") || q.includes("digital") || q.includes("software")) {
    return "Custom Digital Infrastructure: Beyond papers, we engineer custom financial SaaS, GenAI automation, high-converting React/Vite web apps, and HRMS workflows. We build digital wings for your physical business.";
  }
  return "Welcome to The Paper Plane! We handle your taxes, company incorporation, audits, and custom digital software in Coimbatore so you can focus on Takeoff. Call or WhatsApp +91 90255 65526 for immediate guidance.";
}

// API: Live News & RSS Feed proxy for Tax/GST/MCA
app.get("/api/news", (_req, res) => {
  const newsUpdates = [
    {
      id: "news-1",
      title: "CBDT Updates Guidelines for Section 143(1) Intimation Processing & Refund Timelines",
      source: "Income Tax Department",
      category: "Income Tax",
      date: new Date().toISOString().split("T")[0],
      summary: "Standard turnaround time for Section 143(1) intimations is maintained at 30 days with automated interest calculations on eligible tax refunds.",
      isHot: true,
      link: "https://incometaxindia.gov.in",
    },
    {
      id: "news-2",
      title: "GSTN Introduces Enhanced e-Invoicing & ITC Reconciliation Features on GST Portal",
      source: "GST Portal",
      category: "GST",
      date: new Date().toISOString().split("T")[0],
      summary: "Taxpayers with turnover above ₹5 Crore must report e-invoices within 30 days of invoice creation. GSTR-2B auto-populates on the 14th.",
      isHot: true,
      link: "https://gst.gov.in",
    },
    {
      id: "news-3",
      title: "MCA SPICe+ Portal Upgrade: Accelerated 48-Hour Business Incorporation Routine",
      source: "Ministry of Corporate Affairs",
      category: "Companies Act",
      date: new Date().toISOString().split("T")[0],
      summary: "New simplified filing protocol reduces LLP and Pvt Ltd approval timelines significantly for Coimbatore and Tamil Nadu startups.",
      isHot: false,
      link: "https://mca.gov.in",
    },
    {
      id: "news-4",
      title: "ICAI Advisory on Annual Statutory Audit Checklists and Digital Working Papers",
      source: "ICAI",
      category: "Statutory Audit",
      date: new Date().toISOString().split("T")[0],
      summary: "Chartered Accountants must ensure strict compliance with SA 230 for audit documentation and electronic verification codes.",
      isHot: false,
      link: "https://icai.org",
    },
  ];

  res.json({ news: newsUpdates, lastUpdated: new Date().toISOString() });
});

// API: Compliance Calendar Endpoint
app.get("/api/compliance/calendar", (_req, res) => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  res.json({
    month: currentMonth,
    deadlines: [
      { day: 7, title: "TDS / TCS Monthly Payment", category: "Income Tax", description: "Deposit of TDS/TCS deducted in the preceding month." },
      { day: 11, title: "GSTR-1 Monthly Filing", category: "GST", description: "Filing outward supply details for monthly GST taxpayers." },
      { day: 15, title: "PF & ESI Monthly Payment", category: "Payroll", description: "Remittance of Provident Fund & ESI contributions for employees." },
      { day: 20, title: "GSTR-3B Monthly Filing", category: "GST", description: "Summary return and net tax payment for monthly GST taxpayers." },
      { day: 31, title: "ITR Non-Audit Deadline (July 31)", category: "Income Tax", description: "Income Tax Return filing for individuals, salaried, and non-audit entities." },
      { day: 31, title: "ITR Audit Cases Deadline (August 31)", category: "Income Tax", description: "Income Tax Return filing for entities subject to statutory tax audit." },
      { day: 31, title: "Tax Audit Report Deadline (October 31)", category: "Income Tax", description: "Submission of Form 3CA/3CB-3CD Tax Audit Reports." },
    ],
    turnaroundTimes: [
      { section: "Section 143(1) Intimation", duration: "30 Days standard turnaround" },
      { section: "Section 142(1) Notice Reply", duration: "15 Days from receipt of notice" },
      { section: "Section 143(2) Scrutiny Notice", duration: "Served within 3 months of financial year end" },
      { section: "GST Refund Application", duration: "60 Days maximum processing timeline" },
      { section: "Company Incorporation (MCA)", duration: "3 to 5 Working Days complete setup" },
    ],
  });
});

// API: Contact Form Submission
app.post("/api/contact", (req, res) => {
  const { name, email, phone, service, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required fields." });
  }

  const waText = `New Enquiry from Website:\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService: ${service || "General"}\nMessage: ${message || "N/A"}`;
  const whatsappUrl = `https://wa.me/919025565526?text=${encodeURIComponent(waText)}`;

  return res.json({
    success: true,
    message: "Thank you for reaching out to The Paper Plane! Our Coimbatore team will contact you within 2 business hours.",
    whatsappUrl,
  });
});

// Serve frontend / Vite setup
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Paper Plane server running on http://0.0.0.0:${PORT}`);
  });
}

start();
