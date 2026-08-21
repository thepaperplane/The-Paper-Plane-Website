import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { getDecoderEntry } from "../data/decoderData";
import {
  Calculator,
  SearchCode,
  Zap,
  Layers,
  CheckCircle2,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  FileCheck,
  Building2,
  PhoneCall,
} from "lucide-react";

export const InteractiveShowcase: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"calculator" | "decoder" | "workflow">("workflow");

  // Workflow Simulator State
  const [workflowStep, setWorkflowStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Estimator State
  const [turnover, setTurnover] = useState<number>(3500000);
  const [entityType, setEntityType] = useState<string>("Pvt Ltd");

  // Decoder State
  const [lookupSec, setLookupSec] = useState<string>("148");

  const runWorkflowSimulation = () => {
    setIsSimulating(true);
    setWorkflowStep(1);
    const interval = setInterval(() => {
      setWorkflowStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 900);
  };

  const resetSimulation = () => {
    setWorkflowStep(0);
    setIsSimulating(false);
  };

  // Estimator formulas
  const isAuditReq = turnover > 10000000 || (entityType === "Pvt Ltd" && turnover > 50000000);
  const isGstReq = turnover > 2000000;
  const itrDeadline = isAuditReq ? "August 31st" : "July 31st";

  const currentSec = getDecoderEntry(lookupSec);

  const tabTransition = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -15 }, transition: { duration: 0.3 } };

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative z-10 text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Digital Playground</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
          Experience Our Tech-Enabled Systems
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-medium">
          Test real-time workflow automation triggers, statutory compliance deadline estimators, and section legal decoders.
        </p>
      </div>

      {/* Selector Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-full liquid-glass border border-white/15 gap-1 shadow-2xl">
          <button
            id="tab-workflow-sim"
            onClick={() => setActiveTab("workflow")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeTab === "workflow"
                ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>AI Workflow Sandbox</span>
          </button>

          <button
            id="tab-compliance-calc"
            onClick={() => setActiveTab("calculator")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeTab === "calculator"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Compliance Estimator</span>
          </button>

          <button
            id="tab-legal-decoder"
            onClick={() => setActiveTab("decoder")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
              activeTab === "decoder"
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <SearchCode className="w-3.5 h-3.5" />
            <span>Legal Section Decoder</span>
          </button>
        </div>
      </div>

      {/* Main Glass Card Sandbox Container */}
      <div className="p-8 sm:p-12 rounded-3xl liquid-glass border border-white/15 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* TAB 1: AI WORKFLOW SIMULATOR */}
          {activeTab === "workflow" && (
            <motion.div
              key="workflow"
              {...tabTransition}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-cyan-400 text-[10px] font-mono uppercase tracking-[0.2em] font-bold block mb-1">
                    Live System Simulator
                  </span>
                  <h3 className="text-xl font-extrabold text-white uppercase">
                    Automated Invoice & Tax Processing Pipeline
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    id="run-workflow-btn"
                    onClick={runWorkflowSimulation}
                    disabled={isSimulating}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isSimulating ? "Processing Pipeline..." : "Trigger Test Workflow"}</span>
                  </button>

                  <button
                    id="reset-workflow-btn"
                    onClick={resetSimulation}
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Workflow Visual Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {[
                  { title: "1. Document Ingestion", desc: "PDF / Scan Invoice Upload", icon: FileCheck },
                  { title: "2. GenAI OCR Extraction", desc: "Line Item & GSTIN Parse", icon: Sparkles },
                  { title: "3. Portal Validation", desc: "GSTR-2B & MCA Verification", icon: Building2 },
                  { title: "4. Instant Dispatch", desc: "WhatsApp & Ledger Sync", icon: PhoneCall },
                ].map((step, idx) => {
                  const StepIcon = step.icon;
                  const isActive = workflowStep > idx;
                  const isCurrent = workflowStep === idx + 1;

                  return (
                    <div
                      key={idx}
                      className={`p-6 rounded-2xl border transition-all duration-500 relative ${
                        isCurrent
                          ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] scale-105"
                          : isActive
                          ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                          : "bg-white/5 border-white/10 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl ${
                            isCurrent
                              ? "bg-cyan-400 text-slate-950 animate-bounce"
                              : isActive
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-white/5 text-slate-400"
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>

                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{step.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1 font-medium">{step.desc}</p>

                      {isCurrent && (
                        <div className="mt-3 w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                          <div className="bg-cyan-400 h-full animate-pulse w-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Demo Simulation • Illustrative Timings</span>
                <span className="text-cyan-400 font-bold">Execution Engine: Paper Plane Automated Stack</span>
              </div>
            </motion.div>
          )}

          {/* TAB 2: COMPLIANCE ESTIMATOR */}
          {activeTab === "calculator" && (
            <motion.div
              key="calculator"
              {...tabTransition}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-indigo-400 text-[10px] font-mono uppercase tracking-[0.2em] font-bold block mb-1">
                    Turnover & Entity Calculator
                  </span>
                  <h3 className="text-xl font-extrabold text-white uppercase">
                    Statutory Obligation Estimator
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-2 uppercase tracking-wider font-bold">
                      Annual Turnover: <span className="text-cyan-400 font-extrabold">₹{(turnover / 100000).toFixed(1)} Lakhs</span>
                    </label>
                    <input
                      type="range"
                      min={500000}
                      max={200000000}
                      step={500000}
                      value={turnover}
                      onChange={(e) => setTurnover(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(6,182,212,0.6)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-cyan-400 [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(6,182,212,0.6)] [&::-moz-range-thumb]:cursor-pointer"
                    />
                    <div className="flex items-center justify-between mt-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      <span>₹5 Lakhs</span>
                      <span>₹20 Crore</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 block mb-2 uppercase tracking-wider font-bold">
                      Entity Structure:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Proprietorship", "LLP", "Pvt Ltd"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setEntityType(type)}
                          className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                            entityType === type
                              ? "bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold shadow-lg"
                              : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-extrabold">
                  Calculated Output for {entityType} (₹{(turnover / 100000).toFixed(1)} L)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">ITR Filing Deadline:</span>
                    <span className="text-sm font-bold text-white mt-1 block">{itrDeadline}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Statutory Tax Audit:</span>
                    <span className={`text-sm font-bold mt-1 block ${isAuditReq ? "text-amber-400" : "text-emerald-400"}`}>
                      {isAuditReq ? "Mandatory u/s 44AB" : "Exempt / Presumptive"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">GST Registration:</span>
                    <span className={`text-sm font-bold mt-1 block ${isGstReq ? "text-cyan-400" : "text-slate-400"}`}>
                      {isGstReq ? "Mandatory (> ₹20L)" : "Optional"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 text-[10px] uppercase font-mono block">Coimbatore Desk Review:</span>
                    <span className="text-sm font-bold text-emerald-400 mt-1 block">Same-Day Review</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="calc-confirm-desk-btn"
                    onClick={onContactClick}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                  >
                    Confirm Scope With Paper Plane Desk
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: LEGAL DECODER */}
          {activeTab === "decoder" && (
            <motion.div
              key="decoder"
              {...tabTransition}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-purple-400 text-[10px] font-mono uppercase tracking-[0.2em] font-bold block mb-1">
                    Statutory Notice Decoder
                  </span>
                  <h3 className="text-xl font-extrabold text-white uppercase">
                    Select Section or Provision
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["148", "143(1)", "44AB", "GSTR-3B"].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setLookupSec(sec)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                        lookupSec.toLowerCase() === sec.toLowerCase()
                          ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                          : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      Sec {sec}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-extrabold">
                    Provision Title
                  </span>
                  <h4 className="text-sm font-bold text-white uppercase">{currentSec.title}</h4>
                  <p className="text-cyan-400 text-[10px] font-mono uppercase font-bold">{currentSec.act}</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-extrabold">
                    Statutory Impact
                  </span>
                  <p className="text-slate-300 leading-relaxed font-medium">{currentSec.summary}</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-extrabold">
                    Recommended Defense Action
                  </span>
                  <p className="text-slate-300 leading-relaxed font-medium">{currentSec.action}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
