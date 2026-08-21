import React, { useState, useEffect } from "react";
import { Menu, X, PhoneCall, ArrowUpRight, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "news", label: "News" },
    { id: "knowledge", label: "Knowledge Corner" },
    { id: "calendar", label: "Calendar" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappUrl = "https://wa.me/919025565526?text=Hello%20The%20Paper%20Plane%20team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.";

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 lg:px-12 py-3.5 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
          : "bg-slate-950/60 backdrop-blur-xl border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-all">
            <Logo className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-widest text-white uppercase block leading-none font-sans group-hover:text-cyan-400 transition-colors">
              The Paper Plane
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-[0.2em] uppercase block mt-1 font-bold">
              Coimbatore • Tech & Tax
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 liquid-glass p-1.5 rounded-full border border-white/15">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* WhatsApp Us CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            id="whatsapp-cta-desktop"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl liquid-glass border border-white/20 text-white hover:text-cyan-400 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] liquid-glass border-b border-white/20 p-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <a
                id="whatsapp-cta-mobile"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp (+91 90255 65526)</span>
              </a>
              <div className="text-center text-[10px] text-cyan-400 font-mono tracking-wider font-bold">
                contact@thepaperplane.co.in • Coimbatore
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
