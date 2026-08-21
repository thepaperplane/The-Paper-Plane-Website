import React, { useState } from "react";
import { SERVICE_PILLARS } from "../data/servicesData";
import { ServiceItem, ServicePillar } from "../types";
import { Modal } from "../components/Modal";
import {
  Search,
  Compass,
  Building2,
  Code2,
  Receipt,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  X,
  PhoneCall,
} from "lucide-react";

interface ServicesPageProps {
  setActiveTab: (tab: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalService, setActiveModalService] = useState<{
    pillar: ServicePillar;
    service: ServiceItem;
  } | null>(null);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case "Palette": return <Compass className="w-6 h-6 text-cyan-400" />;
      case "Building2": return <Building2 className="w-6 h-6 text-emerald-400" />;
      case "Code2": return <Code2 className="w-6 h-6 text-indigo-400" />;
      case "Receipt": return <Receipt className="w-6 h-6 text-cyan-400" />;
      case "ShieldAlert": return <ShieldAlert className="w-6 h-6 text-amber-400" />;
      case "ShieldCheck": return <ShieldCheck className="w-6 h-6 text-purple-400" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  const categories = [
    { id: "all", label: "All 6 Pillars" },
    { id: "design", label: "Corporate Brand & Visual" },
    { id: "business", label: "Business Incorporation" },
    { id: "digital", label: "Custom Digital & Web" },
    { id: "tax", label: "Tax & Master GST" },
    { id: "scrutiny", label: "Scrutiny Defense & Appeals" },
    { id: "audit", label: "Statutory Audit & HRMS" },
  ];

  const filteredPillars = SERVICE_PILLARS.filter((pillar) => {
    const matchesCategory = selectedCategory === "all" || pillar.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const matchesPillarTitle = pillar.title.toLowerCase().includes(q) || pillar.description.toLowerCase().includes(q);
    const matchesService = pillar.services.some(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.subtitle && s.subtitle.toLowerCase().includes(q))
    );

    return matchesPillarTitle || matchesService;
  });

  const getWhatsAppServiceLink = (serviceName: string) => {
    return `https://wa.me/919025565526?text=${encodeURIComponent(
      `Hello The Paper Plane, I am inquiring about your service: "${serviceName}". Please share details and pricing.`
    )}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 px-6 lg:px-12 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-cyan-400 text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Matrix</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
            Services & Architectural Capabilities
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium">
            Grid-based, specialized solutions bridging traditional accounting, legal scrutiny defense, corporate design, and custom web infrastructure in Coimbatore.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="p-4 rounded-2xl liquid-glass border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto no-scrollbar pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sections, ITR, GST, Web..."
              className="liquid-glass-input w-full rounded-full pl-10 pr-8 py-2 text-xs text-white placeholder-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Pillars & Service Cards Matrix */}
        <div className="space-y-16">
          {filteredPillars.map((pillar) => (
            <div key={pillar.id} className="space-y-6">
              {/* Pillar Header */}
              <div className="p-8 rounded-2xl liquid-glass border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                      {pillar.title}
                    </h2>
                    <p className="text-[11px] text-cyan-400 font-mono uppercase tracking-[0.2em] mt-1 font-bold">
                      {pillar.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 max-w-md leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>

              {/* Sub-Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillar.services.map((service) => (
                  <div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    onClick={() => setActiveModalService({ pillar, service })}
                    className="p-8 rounded-2xl liquid-glass-card border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                          {service.subtitle || pillar.title}
                        </span>
                        {service.badge && (
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                            {service.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 group-hover:text-cyan-400 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-6 font-medium">
                        {service.description}
                      </p>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-[11px] text-slate-500 font-mono uppercase tracking-wider pl-5">
                            +{service.features.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono uppercase tracking-wider font-bold">
                      <span>View Specifications</span>
                      <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredPillars.length === 0 && (
            <div className="text-center py-16 liquid-glass-card rounded-3xl border border-white/10 space-y-4">
              <p className="text-sm text-slate-300 font-medium">
                No services found matching "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Service Specification Modal */}
      <Modal
        open={!!activeModalService}
        onClose={() => setActiveModalService(null)}
        labelledBy="service-modal-title"
      >
        {activeModalService && (
          <>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1 font-bold">
                {activeModalService.pillar.title}
              </span>
              <h2 id="service-modal-title" className="text-2xl font-extrabold text-white uppercase font-sans">
                {activeModalService.service.title}
              </h2>
              {activeModalService.service.subtitle && (
                <p className="text-xs text-slate-400 font-mono mt-0.5 font-semibold">
                  {activeModalService.service.subtitle}
                </p>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {activeModalService.service.description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-extrabold">
                Included Deliverables & Specifications:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalService.service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono font-bold">
                Location: Coimbatore Desk • Tamil Nadu
              </div>

              <a
                id="modal-whatsapp-request"
                href={getWhatsAppServiceLink(activeModalService.service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Request Custom Quote on WhatsApp</span>
              </a>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
