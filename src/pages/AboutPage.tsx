import React from "react";
import { MapPin, ShieldCheck, Sparkles, Building2, PhoneCall, Mail, Globe, ArrowRight } from "lucide-react";
import { Logo } from "../components/Logo";
import { COMPANY_INFO } from "../data/companyInfo";

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 px-6 lg:px-12 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header Story Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-cyan-400 text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coimbatore Headquarters</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
            Bridging Paper Compliance & Digital Architecture
          </h1>
          <p className="text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            "{COMPANY_INFO.tagline}"
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-xs text-slate-300 leading-relaxed font-sans font-medium">
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight">
              The Paper Plane Philosophy
            </h2>
            <p className="text-sm">
              Founded in the industrial and technology hub of <strong className="text-white font-extrabold">Coimbatore, Tamil Nadu</strong>, <span className="text-white font-bold">The Paper Plane</span> was born out of a critical observation: modern high-growth companies were drowning in fragmented statutory compliance while relying on outdated software stacks.
            </p>
            <p className="text-sm">
              Traditional accounting firms stop at filing returns. Software agencies build apps without understanding tax laws. We bridge this divide by deploying an integrated architecture — pairing high-stakes Tax Scrutiny Defense (Sec 148), Master GST Solutions, and MCA Business Incorporation with custom full-stack Web Applications, Financial SaaS, and GenAI workflows.
            </p>

            <div className="p-6 rounded-2xl liquid-glass-card border border-white/10 space-y-3">
              <h3 className="text-[11px] font-mono text-cyan-400 uppercase tracking-[0.2em] font-extrabold">
                Locked Exclusively to Coimbatore
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed font-medium">
                Operating directly from Avinashi Road, Coimbatore, our team serves manufacturing giants, IT exporters, healthcare providers, and venture-backed startups across Tamil Nadu and South India.
              </p>
            </div>

            <button
              id="about-explore-services-cta"
              onClick={() => setActiveTab("services")}
              className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <span>Explore Our Full Service Matrix</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="lg:col-span-5 p-8 rounded-2xl liquid-glass-card border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <Logo className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{COMPANY_INFO.name}</h3>
                <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider font-semibold">Coimbatore Desk</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-medium">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold">{COMPANY_INFO.phone} (Phone & WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{COMPANY_INFO.website}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                id="about-whatsapp-cta"
                href="https://wa.me/919025565526?text=Hello%20The%20Paper%20Plane%20team%2C%20I%20would%20like%20to%20visit%20your%20Coimbatore%20office."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Schedule Coimbatore Visit</span>
              </a>
            </div>
          </div>
        </div>

        {/* Core Pillars / Values Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight text-center">
            Our Architectural Directives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl liquid-glass-card border border-white/10">
              <ShieldCheck className="w-6 h-6 text-cyan-400 mb-4" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Zero Compliance Failure</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Automated statutory tracking ensuring 100% on-time GSTR, ITR, and MCA filings without penalty risks.
              </p>
            </div>

            <div className="p-8 rounded-2xl liquid-glass-card border border-white/10">
              <Building2 className="w-6 h-6 text-emerald-400 mb-4" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Local Desk Authority</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Direct physical presence and rapid response desk for Coimbatore and South India business owners.
              </p>
            </div>

            <div className="p-8 rounded-2xl liquid-glass-card border border-white/10">
              <Sparkles className="w-6 h-6 text-purple-400 mb-4" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Custom Software Suite</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Tailor-made web applications and GenAI integrations to streamline financial and operational workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
