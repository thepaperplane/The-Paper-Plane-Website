import React, { useState } from "react";
import { motion } from "motion/react";
import { HERO_GLASS_IMAGES } from "../data/imageAssets";
import {
  Code2,
  Cpu,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface BentoServicesGridProps {
  onOpenFullMatrix: () => void;
}

const useSpotlight = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return { pos, handleMouseMove };
};

const SpotlightGlow: React.FC<{ x: number; y: number; color?: string }> = ({ x, y, color = "6, 182, 212" }) => (
  <div
    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    style={{
      background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(${color}, 0.15), transparent 40%)`,
    }}
  />
);

const CardBadge: React.FC<{ icon: React.ReactNode; iconBgClass: string; label: string; labelClass: string }> = ({
  icon,
  iconBgClass,
  label,
  labelClass,
}) => (
  <div className="flex items-center justify-between">
    <div className={`p-3.5 rounded-2xl border ${iconBgClass}`}>{icon}</div>
    <span className={`px-3 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${labelClass}`}>
      {label}
    </span>
  </div>
);

const CardFooter: React.FC<{ deskLabel: string; ctaLabel: string; ctaColorClass: string; id: string; onClick: () => void }> = ({
  deskLabel,
  ctaLabel,
  ctaColorClass,
  id,
  onClick,
}) => (
  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 relative z-10">
    <span>{deskLabel}</span>
    <button id={id} onClick={onClick} className={`font-bold group-hover:underline inline-flex items-center gap-1 ${ctaColorClass}`}>
      <span>{ctaLabel}</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </div>
);

export const BentoServicesGrid: React.FC<BentoServicesGridProps> = ({ onOpenFullMatrix }) => {
  const card1 = useSpotlight();
  const card2 = useSpotlight();
  const card3 = useSpotlight();
  const card4 = useSpotlight();

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10 text-white">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass border border-white/10 text-cyan-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Power-Pack Bento Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Architectural Services & Digital Solutions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 max-w-xl font-medium">
            Bridging custom web engineering, AI workflow automation, fast-track business incorporations, and statutory tax scrutiny defense.
          </p>
        </div>

        <button
          id="bento-matrix-view-all"
          onClick={onOpenFullMatrix}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full liquid-glass border border-cyan-500/30 hover:border-cyan-400 text-xs font-bold uppercase tracking-widest text-cyan-300 hover:text-white transition-all duration-300 group shadow-lg"
        >
          <span>Explore All 6 Pillars</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: Next-Gen Web Development (Featured Large 7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onMouseMove={card1.handleMouseMove}
          className="md:col-span-7 rounded-3xl liquid-glass-card p-8 flex flex-col justify-between group relative overflow-hidden border border-white/15"
        >
          <SpotlightGlow x={card1.pos.x} y={card1.pos.y} color="6, 182, 212" />

          <div className="space-y-6 relative z-10">
            <CardBadge
              icon={<Code2 className="w-6 h-6" />}
              iconBgClass="bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
              label="Digital Engineering"
              labelClass="bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
            />

            <div>
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                Next-Gen Website Development & Web Architectures
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mt-2 font-medium">
                Designing lightning-fast 60fps React & Vite web applications, 3D interactive canvases, liquid glass UI systems, and secure API gateways.
              </p>
            </div>

            {/* Visual Generated Image Banner */}
            <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={HERO_GLASS_IMAGES.webDev}
                alt="Website Development & Digital Architecture"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-cyan-300">
                <span>Stack: React • Vite • Tailwind • Three.js</span>
                <span className="font-bold text-white uppercase tracking-wider">60FPS Performance</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Custom Full-Stack Apps</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Liquid Glass UI/UX</span>
              </div>
            </div>
          </div>

          <CardFooter
            deskLabel="Coimbatore Tech Desk"
            ctaLabel="Explore Specs"
            ctaColorClass="text-cyan-400"
            id="bento-web-dev-cta"
            onClick={onOpenFullMatrix}
          />
        </motion.div>

        {/* Card 2: AI & Automated Workflows (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseMove={card2.handleMouseMove}
          className="md:col-span-5 rounded-3xl liquid-glass-card p-8 flex flex-col justify-between group relative overflow-hidden border border-white/15"
        >
          <SpotlightGlow x={card2.pos.x} y={card2.pos.y} color="99, 102, 241" />

          <div className="space-y-6 relative z-10">
            <CardBadge
              icon={<Cpu className="w-6 h-6" />}
              iconBgClass="bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
              label="Automated Workflows"
              labelClass="bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
            />

            <div>
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
                AI Workflows & Business Tools
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mt-2 font-medium">
                Eliminate manual paperwork with intelligent OCR invoice extraction, automated WhatsApp updates, and GenAI document classification.
              </p>
            </div>

            {/* Generated Image */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={HERO_GLASS_IMAGES.automatedWorkflows}
                alt="Automated Workflows & Business Tools"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            </div>

            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Automated GSTR-2B & Invoice Sync</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>GenAI Document Classification & OCR</span>
              </li>
            </ul>
          </div>

          <CardFooter
            deskLabel="Automation Stack"
            ctaLabel="Explore Engine"
            ctaColorClass="text-indigo-400"
            id="bento-workflows-cta"
            onClick={onOpenFullMatrix}
          />
        </motion.div>

        {/* Card 3: Business Incorporation & Fast-Track MCA (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onMouseMove={card3.handleMouseMove}
          className="md:col-span-5 rounded-3xl liquid-glass-card p-8 flex flex-col justify-between group relative overflow-hidden border border-white/15"
        >
          <SpotlightGlow x={card3.pos.x} y={card3.pos.y} color="16, 185, 129" />

          <div className="space-y-6 relative z-10">
            <CardBadge
              icon={<Building2 className="w-6 h-6" />}
              iconBgClass="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              label="Fast-Track MCA"
              labelClass="bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            />

            <div>
              <h3 className="text-xl font-extrabold text-white uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
                Pvt Ltd & LLP Incorporation
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mt-2 font-medium">
                48-Hour fast-track incorporation with SPICe+ MCA filing, Digital Signature Certificates (DSC), Director Identification (DIN), and Bank Account Setup.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest font-extrabold block">
                Turnaround Benchmark: 48 Hours
              </span>
              <p className="text-slate-300 text-xs font-medium">
                Includes Company Name Approval, MOA/AOA Drafting, PAN, TAN & Director KYC.
              </p>
            </div>
          </div>

          <CardFooter
            deskLabel="Coimbatore Incorporation"
            ctaLabel="View Packages"
            ctaColorClass="text-emerald-400"
            id="bento-incorporation-cta"
            onClick={onOpenFullMatrix}
          />
        </motion.div>

        {/* Card 4: Sec 148 Tax Scrutiny Defense & Tech Solutions (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onMouseMove={card4.handleMouseMove}
          className="md:col-span-7 rounded-3xl liquid-glass-card p-8 flex flex-col justify-between group relative overflow-hidden border border-white/15"
        >
          <SpotlightGlow x={card4.pos.x} y={card4.pos.y} color="168, 85, 247" />

          <div className="space-y-6 relative z-10">
            <CardBadge
              icon={<ShieldCheck className="w-6 h-6" />}
              iconBgClass="bg-purple-500/10 border-purple-500/20 text-purple-400"
              label="High-Stakes Legal Desk"
              labelClass="bg-purple-500/10 border-purple-500/30 text-purple-300"
            />

            <div>
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wider group-hover:text-purple-400 transition-colors">
                Sec 148 Scrutiny Defense & Tax Architecture
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mt-2 font-medium">
                High-stakes representation before Income Tax and GST Authorities for Section 148, 143(2), and 270A notices with full electronic paper trail compilation.
              </p>
            </div>

            {/* Generated Image Banner */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={HERO_GLASS_IMAGES.techSolutions}
                alt="Tech-Enabled Business Solutions & Scrutiny Defense"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>
          </div>

          <CardFooter
            deskLabel="Coimbatore Scrutiny Desk"
            ctaLabel="Consult Counsel"
            ctaColorClass="text-purple-400"
            id="bento-scrutiny-cta"
            onClick={onOpenFullMatrix}
          />
        </motion.div>
      </div>
    </section>
  );
};
