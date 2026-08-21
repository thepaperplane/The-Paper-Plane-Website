import React from "react";
import { PaperPlaneHero3D } from "../components/PaperPlaneHero3D";
import { BentoServicesGrid } from "../components/BentoServicesGrid";
import { InteractiveShowcase } from "../components/InteractiveShowcase";
import { SERVICE_PILLARS } from "../data/servicesData";
import { COMPLIANCE_DEADLINES, TURNAROUND_TIMES } from "../data/calendarData";
import { KNOWLEDGE_ARTICLES } from "../data/knowledgeData";
import {
  ArrowRight,
  Compass,
  Building2,
  Code2,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  BookOpen,
  PhoneCall,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

interface HomeProps {
  setActiveTab: (tab: string) => void;
  setSelectedServiceId?: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const getPillarIcon = (name: string) => {
    switch (name) {
      case "Palette":
        return <Compass className="w-6 h-6 text-cyan-400" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-emerald-400" />;
      case "Code2":
        return <Code2 className="w-6 h-6 text-indigo-400" />;
      case "Receipt":
        return <Receipt className="w-6 h-6 text-cyan-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-amber-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-purple-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Liquid Glass 3D Hero Section */}
      <PaperPlaneHero3D
        onExploreServices={() => {
          const bentoEl = document.getElementById("bento-services-section");
          if (bentoEl) {
            bentoEl.scrollIntoView({ behavior: "smooth" });
          } else {
            setActiveTab("services");
          }
        }}
        onContactClick={() => setActiveTab("contact")}
      />

      {/* 2. Bento-Box Power-Pack Services Grid */}
      <div id="bento-services-section">
        <BentoServicesGrid
          onOpenFullMatrix={() => setActiveTab("services")}
        />
      </div>

      {/* 3. Immersive Interactive Showcase Sandbox */}
      <InteractiveShowcase onContactClick={() => setActiveTab("contact")} />

      {/* 4. Six Pillars Breakdown */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-3 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full Service Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              Six Pillars of Corporate Mastery
            </h2>
          </div>
          <button
            id="home-view-all-services"
            onClick={() => setActiveTab("services")}
            className="mt-6 md:mt-0 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors group"
          >
            <span>View Full Service Matrix</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => setActiveTab("services")}
              className="p-8 rounded-3xl liquid-glass-card border border-white/10 hover:border-cyan-400/50 shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 w-fit mb-5 group-hover:scale-105 transition-transform">
                  {getPillarIcon(pillar.iconName)}
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3 group-hover:text-cyan-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-6 font-medium">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono tracking-wider uppercase font-semibold">
                <span>{pillar.services.length} Specialized Sub-Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Synchronized Compliance Radar Teaser */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-indigo-400 uppercase tracking-[0.2em] font-extrabold">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Live Statutory Radar</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-none">
              Compliance Timeline & Turnarounds
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Synchronized dashboard tracking GSTR-1, GSTR-3B, Tax Audit u/s 44AB, and Section 143(1) processing timelines.
            </p>

            <button
              id="home-open-calendar"
              onClick={() => setActiveTab("calendar")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-indigo-500/25 transition-all"
            >
              <span>Open Compliance Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-7 space-y-3.5">
            <h3 className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-3 font-extrabold">
              Upcoming Monthly Milestones
            </h3>
            {COMPLIANCE_DEADLINES.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveTab("calendar")}
                className="p-5 rounded-2xl liquid-glass border border-white/10 shadow-sm flex items-center justify-between hover:border-cyan-400/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col items-center justify-center text-cyan-400 font-mono">
                    <span className="text-xs font-bold leading-none">{item.day}th</span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold mt-1">Due</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{item.title}</h4>
                    <span className="text-xs text-slate-400 font-mono">{item.statute}</span>
                  </div>
                </div>

                <span className="px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-white/5 text-slate-300 border border-white/10">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Direct Contact CTA Banner */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="p-10 sm:p-16 rounded-3xl liquid-glass border border-white/20 text-center relative overflow-hidden shadow-2xl text-white">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              Ready for Smooth Business Takeoff?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium">
              Let us handle your paperwork, tax scrutiny defense, MCA business incorporations, and custom web applications.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                id="home-bottom-whatsapp"
                href="https://wa.me/919025565526?text=Hello%20The%20Paper%20Plane%2C%20I%20am%20ready%20for%20Takeoff."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/25 flex items-center gap-2 hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp (+91 90255 65526)</span>
              </a>
              <button
                id="home-bottom-contact"
                onClick={() => setActiveTab("contact")}
                className="px-8 py-4 rounded-full liquid-glass border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors shadow-lg"
              >
                Send Proposal Request
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
