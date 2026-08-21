import React from "react";
import { Phone, Mail, MapPin, Globe, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { COMPANY_INFO } from "../data/companyInfo";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const whatsappUrl = "https://wa.me/919025565526?text=Hello%20The%20Paper%20Plane%2C%20I%20want%20to%20discuss%20tax%20and%20business%20solutions.";

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-300 text-xs relative z-10 pt-20 pb-12 overflow-hidden font-sans">
      {/* Background Accent Liquid Ambient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-40 bg-gradient-to-r from-cyan-500/10 via-indigo-500/15 to-purple-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Logo className="w-full h-full object-contain" />
              </div>
              <span className="text-base font-extrabold tracking-widest text-white uppercase font-sans">
                {COMPANY_INFO.name}
              </span>
            </div>
            <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest font-mono">
              "{COMPANY_INFO.tagline}"
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md font-medium">
              Architecting next-gen web applications, AI automated business workflows, fast-track MCA incorporations, and statutory Section 148 Tax Scrutiny defense for visionary leaders in Coimbatore & globally.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                id="footer-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.phone}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                id="footer-email-btn"
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass border border-white/15 text-slate-200 hover:text-white hover:border-cyan-400/40 text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-bold mb-5">
              Navigation
            </h3>
            <ul className="space-y-3 text-xs">
              {["home", "services", "about", "news", "knowledge", "calendar", "contact"].map((tab) => (
                <li key={tab}>
                  <button
                    id={`footer-link-${tab}`}
                    onClick={() => {
                      setActiveTab(tab);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors uppercase tracking-wider text-[11px] font-medium text-left text-slate-400 hover:text-cyan-400"
                  >
                    {tab === "knowledge" ? "Knowledge Corner" : tab === "about" ? "About Us" : tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Matrix Summary */}
          <div>
            <h3 className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-bold mb-5">
              Service Pillars
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>Website Development & WebGL</li>
              <li>AI Workflows & Automation</li>
              <li>Pvt Ltd & LLP Incorporation</li>
              <li>Income Tax (ITR 1-7) & GST</li>
              <li>Sec 148 Scrutiny Defense Desk</li>
              <li>Statutory Audit & HRMS Setup</li>
            </ul>
          </div>

          {/* Location Schema & Headquarters */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono tracking-[0.2em] text-cyan-400 uppercase font-bold mb-5">
              Headquarters
            </h3>
            <div className="space-y-3 text-xs text-slate-400 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  {COMPANY_INFO.fullAddress}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={COMPANY_INFO.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                  {COMPANY_INFO.website}
                </a>
              </div>
            </div>

            {/* Local Business Schema Markup for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "AccountingService",
                  name: COMPANY_INFO.name,
                  image: "https://thepaperplane.co.in/assets/logo.png",
                  telephone: COMPANY_INFO.phoneIntl,
                  email: COMPANY_INFO.email,
                  url: COMPANY_INFO.websiteUrl,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: COMPANY_INFO.streetAddress,
                    addressLocality: COMPANY_INFO.locality,
                    addressRegion: COMPANY_INFO.region,
                    postalCode: COMPANY_INFO.postalCode,
                    addressCountry: "IN",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 11.0168,
                    longitude: 76.9558,
                  },
                  openingHours: "Mo-Sa 09:00-19:00",
                  priceRange: "₹₹₹",
                }),
              }}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4 font-mono">
          <div>
            © {new Date().getFullYear()} The Paper Plane. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Coimbatore Local Business Schema Verified</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">ISO 27001 Data Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
