"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function SaasCrmOperations() {
  const { openProjectModal } = useProjectModal();
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <section className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">


          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase">
            A Single Cockpit For Your <span className="text-[#2D5FC7]">Entire Business</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Stop forcing staff to jump between 6 different SaaS windows. We consolidate client intake, dynamic dispatching, automated status pipelines, and financial analytics into one bespoke console.
          </p>
        </div>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Screen / Dashboard Mockup with Click-to-Zoom */}
          <div className="lg:col-span-7">
            <div
              onClick={() => setIsZoomOpen(true)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0A0A] border border-black shadow-2xl cursor-pointer hover:border-[#2D5FC7]/60 transition-all duration-300"
            >
              {/* Browser bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F131D] border-b border-white/10 text-white text-[11px] font-mono select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  <span className="text-slate-400 ml-2">kivex-saas-core.internal</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-300 transition-colors">
                  <span>Click to Expand</span>
                  <span>🔍</span>
                </div>
              </div>

              {/* Viewport with Uploaded Real Dashboard Image */}
              <div className="relative aspect-[16/10] bg-[#07090E] overflow-hidden">
                <Image
                  src="/saas/rcargo-dashboard-overview.png"
                  alt="Rcargo & Ganga Travels Live Operations Engine by Kivex"
                  fill
                  sizes="(max-width: 1200px) 100vw, 700px"
                  className="object-cover object-top filter transition-transform duration-500 group-hover:scale-102"
                />

                {/* Ambient live pulse pill */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-emerald-400 z-10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE CLOUD ORCHESTRATION</span>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-4 py-2.5 bg-[#0A0D14] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Multi-Tenant Architecture &bull; PostgreSQL 16</span>
                <span className="text-[#2D5FC7] font-bold">Sub-Second Queries</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Architecture Feature Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:border-[#2D5FC7]/30 transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#2D5FC7]/15 text-[#2D5FC7] flex items-center justify-center font-bold text-xs">
                  01
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Multi-Tenant Database Partitioning
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal pl-8">
                Isolate customer organizations securely while maintaining shared cloud compute efficiency. PostgreSQL Row-Level Security ensures zero cross-tenant data leakage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:border-[#2D5FC7]/30 transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#2D5FC7]/15 text-[#2D5FC7] flex items-center justify-center font-bold text-xs">
                  02
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Real-Time Queue &amp; Event Bus
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal pl-8">
                Heavy jobs run seamlessly in the background via Redis BullMQ clusters: invoice generation, status alerts, external API synchronization, and data batch imports.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:border-[#2D5FC7]/30 transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#2D5FC7]/15 text-[#2D5FC7] flex items-center justify-center font-bold text-xs">
                  03
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Granular Role-Based Access Control (RBAC)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal pl-8">
                Define exact visibility permissions for Super Admins, Operations Managers, Dispatchers, and External Clients. Every click and state modification is immutably logged.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-black/[0.08] shadow-sm hover:border-[#2D5FC7]/30 transition-all">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-6 h-6 rounded-lg bg-[#2D5FC7]/15 text-[#2D5FC7] flex items-center justify-center font-bold text-xs">
                  04
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Zero Per-Seat Fee Architecture
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal pl-8">
                Unlike commercial SaaS that penalizes team growth, Kivex builds platforms with zero seat license fees. Expand your team from 5 to 500 without paying an extra dollar per user.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0A0A0A] text-white border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Ready to replace disconnected software with your own custom SaaS?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-normal">
              Fixed roadmap delivery &bull; Full source code &amp; database IP ownership &bull; 99.99% uptime
            </p>
          </div>

          <button
            type="button"
            onClick={() => openProjectModal()}
            className="px-6 py-3 rounded-full bg-[#2D5FC7] hover:bg-[#234ca1] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shrink-0 hover:scale-102 active:scale-98 cursor-pointer"
          >
            Start SaaS Discovery &rarr;
          </button>
        </div>
      </div>

      {/* Expanded Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsZoomOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl w-full bg-[#0A0A0A] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold">Rcargo &bull; Live Operations Console Full View</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="relative mt-4 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center bg-[#07090E] rounded-xl overflow-hidden">
                <Image
                  src="/saas/rcargo-dashboard-overview.png"
                  alt="Full SaaS Console View"
                  fill
                  sizes="(max-width: 1400px) 100vw, 1200px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
