import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Logo } from "./Logo";

interface PreLoaderProps {
  onComplete: () => void;
}

const SESSION_KEY = "pp_preloaded";

export const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const alreadyVisited = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "true";
  const prefersReducedMotion = useReducedMotion();

  const [progress, setProgress] = useState(alreadyVisited ? 100 : 0);
  const [stepText, setStepText] = useState("Calibrating Liquid Glass Canvas...");
  const [isDone, setIsDone] = useState(alreadyVisited);

  useEffect(() => {
    if (alreadyVisited) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          sessionStorage.setItem(SESSION_KEY, "true");
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 6;
        if (next > 30 && next <= 60) {
          setStepText("Initializing 3D Paper Plane WebGL Mesh...");
        } else if (next > 60 && next <= 90) {
          setStepText("Compiling AI Workflows & Bento Matrix...");
        } else if (next > 90) {
          setStepText("Ready for Takeoff!");
        }
        return next > 100 ? 100 : next;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete, alreadyVisited]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="app-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 overflow-hidden font-sans"
        >
          {/* Ambient Liquid Glass Orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[550px] h-[550px] bg-indigo-600/20 blur-[160px] rounded-full pointer-events-none animate-pulse-glow" />

          {/* Animated Liquid Paper Plane Logo Badge */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -14, 0],
                      rotateZ: [0, 4, -4, 0],
                    }
              }
              transition={{
                duration: 2.5,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="relative mb-8 p-6 rounded-3xl liquid-glass border border-white/20 shadow-2xl flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-90" />
              <Logo className="w-20 h-20 object-contain relative z-10" />
            </motion.div>

            {/* Brand Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-sans uppercase">
              The Paper Plane
            </h1>
            <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide mb-8 uppercase font-mono">
              "We handle the papers. You handle the Takeoff."
            </p>

            {/* Progress Bar Container */}
            <div className="w-64 sm:w-80 bg-slate-900 border border-white/15 rounded-full h-3 overflow-hidden relative mb-4 p-0.5 shadow-2xl">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full shadow-lg"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress Percentage & Step Status */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold">{progress}%</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 font-bold uppercase text-[11px] tracking-wider text-slate-200">
                {progress === 100 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 motion-safe:animate-spin" />
                )}
                {stepText}
              </span>
            </div>
          </div>

          {/* Location Badge */}
          <div className="absolute bottom-8 text-[11px] font-mono text-slate-500 tracking-[0.2em] uppercase font-bold">
            Coimbatore, Tamil Nadu • India
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
