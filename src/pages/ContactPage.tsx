import React, { useState } from "react";
import { SERVICE_PILLARS } from "../data/servicesData";
import { COMPANY_INFO } from "../data/companyInfo";
import {
  PhoneCall,
  Mail,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Income Tax & Master GST",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappDirectUrl = "https://wa.me/919025565526?text=Hello%20The%20Paper%20Plane%2C%20I%20would%20like%20to%20request%20an%20immediate%20consultation.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please complete your name and email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      // Fallback redirect directly to WhatsApp
      const waText = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`;
      window.open(`https://wa.me/919025565526?text=${encodeURIComponent(waText)}`, "_blank");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-24 px-6 lg:px-12 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Coimbatore Advisory Desk</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight">
            Schedule Takeoff Consultation
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium">
            Reach out directly to our Coimbatore headquarters for website development, automated workflows, MCA incorporation, or tax scrutiny defense.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Channels & Coimbatore Location Meta */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl liquid-glass border border-white/15 space-y-6 shadow-2xl">
              <h2 className="text-xl font-extrabold text-white uppercase tracking-tight">
                Direct Contact Channels
              </h2>

              <div className="space-y-4 text-xs">
                {/* Click to WhatsApp Link */}
                <a
                  id="contact-whatsapp-direct"
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-between transition-colors group shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="block text-white uppercase tracking-wider text-[11px]">Instant WhatsApp Routing</span>
                      <span className="text-emerald-400 font-mono text-[11px]">{COMPANY_INFO.phone}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider group-hover:underline">Chat Now →</span>
                </a>

                {/* Email Direct */}
                <a
                  id="contact-email-direct"
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="p-4 rounded-2xl liquid-glass-card hover:border-cyan-400/50 text-slate-300 font-bold flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <span className="block text-white uppercase tracking-wider text-[11px]">Official Correspondence</span>
                      <span className="text-slate-400 font-mono text-[11px]">{COMPANY_INFO.email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono group-hover:underline">Send Email →</span>
                </a>

                {/* Website URL */}
                <a
                  id="contact-web-direct"
                  href={COMPANY_INFO.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl liquid-glass-card hover:border-indigo-400/50 text-slate-300 font-bold flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <span className="block text-white uppercase tracking-wider text-[11px]">Official Web Portal</span>
                      <span className="text-indigo-400 font-mono text-[11px]">{COMPANY_INFO.website}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono group-hover:underline">Visit Site →</span>
                </a>
              </div>

              {/* Coimbatore Location Card */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Headquarters (Coimbatore):</strong>
                    <span>{COMPANY_INFO.fullAddress}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
                  Operating Hours: {COMPANY_INFO.hours}
                </div>
              </div>
            </div>
          </div>

          {/* Frosted Glass Contact Form with Liquid Ripple Accent */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl liquid-glass border border-white/15 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-2xl shadow-cyan-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                  Proposal Request Transmitted
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
                  Thank you for reaching out to The Paper Plane. Our Coimbatore advisory desk will contact you within 2 business hours.
                </p>
                <div className="pt-4">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Open WhatsApp Chat Directly</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mb-2">
                  Submit Proposal Enquiry
                </h2>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Form Fields with Liquid Focus Ripple Border */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1.5 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full liquid-glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 ${
                        focusedField === "name" ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : ""
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1.5 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@company.com"
                      className={`w-full liquid-glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 ${
                        focusedField === "email" ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]" : ""
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1.5 font-bold">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 90255 65526"
                      className={`w-full liquid-glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 ${
                        focusedField === "phone" ? "border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)]" : ""
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1.5 font-bold">
                      Service Category Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full liquid-glass-input rounded-xl px-4 py-3 text-xs text-white bg-slate-900 focus:outline-none"
                    >
                      {SERVICE_PILLARS.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-1.5 font-bold">
                    Message / Project Scope Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your web application project, AI workflow request, or statutory notice..."
                    className={`w-full liquid-glass-input rounded-xl p-4 text-xs text-white placeholder-slate-500 ${
                      focusedField === "message" ? "border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]" : ""
                    }`}
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Transmitting Request..." : "Submit Proposal Request"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
