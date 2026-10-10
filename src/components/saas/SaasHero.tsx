"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function SaasHero() {
  const { openProjectModal } = useProjectModal();
  const [isHovered, setIsHovered] = useState(false);
  const [heroPreviewMode, setHeroPreviewMode] = useState<"dashboard" | "dispatch" | "antigravity">("dashboard");

  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden bg-[#F5EFE5] text-[#0A0A0A]">
      {/* Luminous Champagne-Gold Glass Aura - Perfectly Seamless Blend into Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(198,148,50,0.30)_0%,rgba(232,182,42,0.16)_45%,transparent_85%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />

      {/* Atmospheric Ambient Gold Orbs & Frosted Refraction */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(216,162,54,0.26),transparent_70%)] blur-[90px] pointer-events-none" />
      <div className="absolute top-6 left-1/4 w-80 h-80 rounded-full bg-[#2D5FC7]/14 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#C69432]/18 blur-3xl pointer-events-none" />
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
            Software That Powers
            <br />
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B701F] via-[#C69432] to-[#E8B62A] drop-shadow-2xs">Operations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-slate-700 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Centralized SaaS platforms, custom CRM operations engines, multi-tenant databases, and automated event pipelines engineered specifically for your business operations.
          </motion.p>
        </div>

        {/* The Black Browser Laptop / Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0A0A] shadow-[0_30px_90px_-20px_rgba(198,148,50,0.22),0_20px_50px_-15px_rgba(0,0,0,0.3)] border border-[#C69432]/30 ring-1 ring-white/20 group"
        >
          {/* Black Browser Top Bar */}
          <div className="flex flex-wrap items-center justify-between px-3 sm:px-6 py-2 sm:h-11 bg-[#0A0A0A] border-b border-white/10 text-white select-none gap-2">
            {/* Left: Window Dots & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/90" />
              </div>
              <div className="flex items-center gap-1.5 pl-2 border-l border-white/10 text-[10px] sm:text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-white">Rcargo &bull; Live Operations Console</span>
                <span className="text-slate-400 hidden sm:inline">&bull; by Kivex</span>
              </div>
            </div>

            {/* Middle: Preview Mode Toggles */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setHeroPreviewMode("dashboard")}
                className={`px-3 py-0.5 rounded-full transition-all cursor-pointer ${
                  heroPreviewMode === "dashboard"
                    ? "bg-[#2D5FC7] text-white font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Dashboard Overview
              </button>
              <button
                type="button"
                onClick={() => setHeroPreviewMode("dispatch")}
                className={`px-3 py-0.5 rounded-full transition-all cursor-pointer ${
                  heroPreviewMode === "dispatch"
                    ? "bg-[#2D5FC7] text-white font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Fleet &amp; Dispatch
              </button>
              <button
                type="button"
                onClick={() => setHeroPreviewMode("antigravity")}
                className={`px-3 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  heroPreviewMode === "antigravity"
                    ? "bg-[#2D5FC7] text-white font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>Smart AI Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A]" />
              </button>
            </div>

            {/* Right: Live Demo Button */}
            <div className="flex items-center gap-3">
              <span className="hidden 2xl:inline-block text-[10px] font-mono text-slate-400">
                rcargo.vercel.app
              </span>
              <a
                href="https://rcargo.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5FC7] text-white text-[10px] font-bold tracking-wider uppercase hover:bg-[#234ca1] transition-colors shadow-xs cursor-pointer"
              >
                <span>Live Demo</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>

          {/* Viewport Interior with Uploaded Dashboard Image */}
          <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[640px] overflow-hidden bg-slate-950">
            <AnimatePresence mode="wait">
              {heroPreviewMode === "dashboard" && (
                <motion.div
                  key="dashboard-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/saas/rcargo-dashboard-overview.png"
                    alt="Rcargo & Ganga Travels Live Dashboard Overview by Kivex"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-101"
                  />
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Rcargo Logistics &bull; Ganga Travels Operator Console &bull; Live in Production</span>
                  </div>
                </motion.div>
              )}

              {heroPreviewMode === "dispatch" && (
                <motion.div
                  key="dispatch-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/projects/rcargo.jpg"
                    alt="Rcargo Live Fleet & Dispatch Engine by Kivex"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-101"
                  />
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>Live Consignment Logging &amp; Route Telemetry</span>
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
                  className="relative w-full h-full"
                >
                  <Image
                    src="/dental/antigravity-engine.png"
                    alt="Smart AI Operations Engine"
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-101"
                  />
                  <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#E8B62A] animate-ping" />
                    <span>Smart AI Assistant &bull; Automated Operations &bull; 24/7 Monitoring</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Hero Bottom Strip: Trust Score & Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0A0A0A] text-white text-xs font-bold border-2 border-[#F5EFE5]">
                RC
              </span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#2D5FC7] text-white text-xs font-bold border-2 border-[#F5EFE5]">
                GT
              </span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#C69432] text-white text-xs font-bold border-2 border-[#F5EFE5]">
                FT
              </span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#10B981] text-white text-xs font-bold border-2 border-[#F5EFE5]">
                AR
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900">100% Owned SaaS Infrastructure</span>
                <span className="text-[#C69432]">★★★★★</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Zero per-seat licensing penalties &bull; Multi-region cloud deployment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:scale-102 active:scale-98"
            >
              Architect Your SaaS Platform &rarr;
            </button>
            <a
              href="#our-live-projects"
              className="px-6 py-3 rounded-full bg-white/70 hover:bg-white text-slate-800 text-xs font-bold tracking-wider uppercase transition-all border border-slate-300 shadow-2xs"
            >
              Explore Live Apps &darr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
