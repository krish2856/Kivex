"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function RealEstateHero() {
  const { openProjectModal } = useProjectModal();
  const [isHovered, setIsHovered] = useState(false);
  const [heroPreviewMode, setHeroPreviewMode] = useState<"website" | "mobile" | "crm" | "antigravity">("website");

  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden bg-[#F5EFE5] text-[#0A0A0A]">
      {/* Luminous Champagne-Gold Glass Aura - Perfectly Seamless Blend into Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(198,148,50,0.30)_0%,rgba(232,182,42,0.16)_45%,transparent_85%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
      
      {/* Atmospheric Ambient Gold Orbs & Frosted Refraction */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(216,162,54,0.26),transparent_70%)] blur-[90px] pointer-events-none" />
      <div className="absolute top-6 left-1/4 w-80 h-80 rounded-full bg-[#C69432]/18 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#E8B62A]/22 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(198,148,50,0.14)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Monumental Hero Headline */}
        <div className="relative z-30 text-center my-6 sm:my-10 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0A0D14] tracking-[-0.035em] leading-[0.98] uppercase"
          >
            Websites That Sell
            <br />
            Luxury <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B701F] via-[#C69432] to-[#E8B62A] drop-shadow-2xs">Properties</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto font-normal"
          >
            Complete digital infrastructure, high-converting property portals, brokerage CRM, Antigravity AI assistant, and Make.com workflows engineered to attract high-net-worth buyers and close deals faster.
          </motion.p>
        </div>

        {/* The Browser Window / Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0A0A] shadow-[0_30px_90px_-20px_rgba(198,148,50,0.22),0_20px_50px_-15px_rgba(0,0,0,0.3)] border border-[#C69432]/30 ring-1 ring-white/20 group"
        >
          {/* Black Browser Top Bar with Interactive Showcase Switcher */}
          <div className="flex flex-wrap items-center justify-between px-3 sm:px-6 py-2.5 sm:py-0 sm:h-12 bg-[#0A0A0A] border-b border-slate-800 text-white select-none gap-2">
            {/* Left: Window Dots & Mode Tabs */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/90" />
              </div>

              {/* View Selector Tabs */}
              <div className="flex items-center gap-1 pl-2 border-l border-slate-800 text-[10px] sm:text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setHeroPreviewMode("website")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    heroPreviewMode === "website"
                      ? "bg-[#2D5FC7] text-white font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Demo Website
                </button>
                <button
                  type="button"
                  onClick={() => setHeroPreviewMode("mobile")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    heroPreviewMode === "mobile"
                      ? "bg-[#2D5FC7] text-white font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Mobile View
                </button>
                <button
                  type="button"
                  onClick={() => setHeroPreviewMode("crm")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    heroPreviewMode === "crm"
                      ? "bg-[#2D5FC7] text-white font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Broker CRM
                </button>
                <button
                  type="button"
                  onClick={() => setHeroPreviewMode("antigravity")}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    heroPreviewMode === "antigravity"
                      ? "bg-[#2D5FC7] text-white font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Antigravity AI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A]" />
                </button>
              </div>
            </div>

            {/* Right: Live Demo Button */}
            <div className="flex items-center gap-3">
              <span className="hidden 2xl:inline-block text-[10px] font-mono text-slate-400">
                aastharealty.realty.kivex.app
              </span>
              <button
                type="button"
                onClick={() => openProjectModal()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5FC7] text-white text-[10px] font-bold tracking-wider uppercase hover:bg-[#234ca1] transition-colors shadow-xs cursor-pointer"
              >
                <span>Live Demo</span>
                <span className="text-xs">↗</span>
              </button>
            </div>
          </div>

          {/* Viewport Interior with Dynamic Showcase Modes */}
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[640px] overflow-hidden bg-slate-950">
            <AnimatePresence mode="wait">
              {heroPreviewMode === "website" && (
                <motion.div
                  key="website-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/realestate/aastha-website-desktop.png"
                    alt="Aastha Realty Live Website Demo by Kivex"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-101"
                  />
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Aastha Realty &bull; Live Demo Showcase &bull; 1.8s Fast Load</span>
                  </div>
                </motion.div>
              )}

              {heroPreviewMode === "mobile" && (
                <motion.div
                  key="mobile-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-900 via-[#111827] to-slate-950"
                >
                  <div className="relative h-full max-h-[550px] aspect-[510/982] rounded-[38px] overflow-hidden shadow-2xl border-4 border-slate-700/80 bg-black">
                    <Image
                      src="/realestate/aastha-website-mobile.png"
                      alt="Aastha Realty Mobile Website"
                      fill
                      priority
                      sizes="(max-width: 768px) 80vw, 400px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>Aastha Realty &bull; Mobile Front Door</span>
                  </div>
                </motion.div>
              )}

              {heroPreviewMode === "crm" && (
                <motion.div
                  key="crm-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/realestate/aastha-crm-dashboard.png"
                    alt="Aastha Realty Live Real Estate Operations Engine & CRM"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-101"
                  />
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Real Estate Operations Engine &bull; Aastha Realty Console</span>
                  </div>
                </motion.div>
              )}

              {heroPreviewMode === "antigravity" && (
                <motion.div
                  key="antigravity-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#081B4E] via-[#0A1633] to-[#030712] text-white"
                >
                  <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-3xl overflow-hidden shadow-2xl mb-5 border-2 border-white/20 bg-[#081B4E] group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/dental/antigravity-engine.png"
                      alt="Antigravity by Google DeepMind"
                      fill
                      priority
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Antigravity by Google</h3>
                  <p className="text-xs sm:text-sm text-blue-300 font-mono tracking-widest uppercase mt-1">
                    AI BROKERAGE ASSISTANT &amp; WORKFLOW INTELLIGENCE
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md text-center mt-3 leading-relaxed">
                    Reads CRM buyer signals, handles high-intent lead qualification, schedules private showings, and dispatches luxury listings to social channels via Buffer.
                  </p>
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Antigravity AI Assistant</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Gradient Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

            {/* Interactive Hover Overlay with CTA Button */}
            <div
              className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="text-center p-6 max-w-md">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 font-bold">
                  Interactive Brokerage Experience
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white">
                  Experience The Full Digital Workflow
                </h3>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => openProjectModal()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#F59E0B] text-[#0F172A] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>See Live Demo</span>
                    <span>→</span>
                  </button>
                  <a
                    href="#how-its-done"
                    className="inline-flex items-center px-5 py-3 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold text-xs hover:bg-white/30 transition-all border border-white/30"
                  >
                    Explore System Architecture
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Trust Score Dial (Bottom Right) */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xl flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <svg className="w-11 h-11 sm:w-12 sm:h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#C69432]"
                    strokeDasharray="99, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs sm:text-sm font-extrabold text-slate-900">
                  9.9
                </span>
              </div>
              <div>
                <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  CLIENT TRUST SCORE
                </div>
                <div className="text-xs font-bold text-slate-800">
                  500+ Deals Closed
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
