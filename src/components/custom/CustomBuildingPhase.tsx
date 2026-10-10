"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import Image from "next/image";

export default function CustomBuildingPhase() {
  const { openProjectModal } = useProjectModal();
  const [activeSubTab, setActiveSubTab] = useState<"uiux" | "ai">("uiux");

  const uiUxFeatures = [
    {
      title: "Bespoke Design System & Typography",
      desc: "Tailored visual identity, tokenized design systems, crisp typography scales, and accessible high-contrast interfaces designed for prolonged daily usage.",
      badge: "Design Craft",
    },
    {
      title: "Sub-Second Next.js 15 & React Architecture",
      desc: "Zero bloat. Server components, streaming SSR, optimized client bundles, and smooth 60fps animations engineered for instant responsive feedback.",
      badge: "High Velocity",
    },
    {
      title: "Responsive Across Desktop, Tablet & Mobile",
      desc: "Pixel-perfect adaptation across 4K displays down to pocket smartphones with touch-friendly gestures, modal flows, and progressive web caching.",
      badge: "Universal UI",
    },
    {
      title: "Micro-Interactions & State Polish",
      desc: "Subtle physics-driven micro-interactions, feedback states, loading skeletons, and fluid transition layouts that make your platform feel premium.",
      badge: "User Delight",
    },
  ];

  const aiFeatures = [
    {
      title: "Workflow Automation Engine",
      desc: "Connected intelligence layer analyzing relational database entries, classifying user requests, and triggering background business actions automatically.",
      badge: "Smart Automation",
    },
    {
      title: "Webhook & Event Pipeline Automation",
      desc: "Eliminates repetitive manual admin work by wiring up instantaneous multi-app pipelines across CRMs, spreadsheets, payment gateways, and databases.",
      badge: "Zero Manual Ops",
    },
    {
      title: "Intelligent Chatbots & Document Parsers",
      desc: "Customer-facing agents and internal copilots trained on your proprietary data to answer inquiries, extract invoices, and summarize reports.",
      badge: "Smart Agents",
    },
    {
      title: "Instant WhatsApp & Email Notification Triggers",
      desc: "Automated instant customer alerts, status updates, booking confirmations, and escalation notifications dispatched in real-time.",
      badge: "Real-time Alerts",
    },
  ];

  return (
    <section id="building-phase" className="py-16 md:py-24 bg-[#EFE8DC] text-[#0A0A0A] border-y border-black/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/[0.08]">
          <div className="max-w-3xl">


            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase">
              Building Phase: <span className="text-[#2D5FC7]">Bespoke UI/UX</span> Meets AI Intelligence
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              We engineer world-class frontend interfaces designed for maximum user retention, then seamlessly connect custom AI autonomous workflows to eliminate manual work.
            </p>
          </div>

          {/* Sub-tab toggle */}
          <div className="flex items-center p-1.5 rounded-2xl bg-white/80 border border-slate-300 shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => setActiveSubTab("uiux")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSubTab === "uiux"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🎨 1. Bespoke UI / UX
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab("ai")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activeSubTab === "ai"
                  ? "bg-[#0A0A0A] text-[#E8B62A] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A]" />
              <span>⚡ 2. AI Integration</span>
            </button>
          </div>
        </div>

        {/* Dynamic Sub-tab content */}
        <div className="pt-10 sm:pt-14">
          <AnimatePresence mode="wait">
            {activeSubTab === "uiux" && (
              <motion.div
                key="uiux-subtab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left 4 Feature Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {uiUxFeatures.map((f, idx) => (
                    <div
                      key={f.title}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#2D5FC7]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#2D5FC7] font-bold border border-blue-100 mb-3">
                          {f.badge}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {f.title}
                        </h4>
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Interactive Mockup Visual */}
                <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-[#0A0A0A] text-white p-6 sm:p-8 border border-white/10 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      design-tokens.config.ts
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">Design Fidelity</span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">100% Custom</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#2D5FC7] to-emerald-400 h-full w-[96%]" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">Next.js 15 Server Components</span>
                        <span className="text-xs font-mono text-[#E8B62A] font-bold">Sub-Second SSR</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#E8B62A] h-full w-[92%]" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">Framer Motion Animation</span>
                        <span className="text-xs font-mono text-blue-400 font-bold">Fluid 60 FPS</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-blue-500 h-full w-[100%]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Design Framework:</span>
                    <span className="text-xs font-bold text-white">Tailwind + Radix + Motion</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubTab === "ai" && (
              <motion.div
                key="ai-subtab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left 4 Feature Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {aiFeatures.map((f, idx) => (
                    <div
                      key={f.title}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#C69432]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200 mb-3">
                          {f.badge}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          {f.title}
                        </h4>
                        <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Interactive AI Agent Engine Visual */}
                <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#081B4E] via-[#0A1633] to-[#030712] text-white p-6 sm:p-8 border border-white/15 shadow-2xl">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E8B62A] animate-ping" />
                      <span className="text-xs font-mono font-bold text-amber-300">
                        Internal AI Engine
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Automated Webhook Sync
                    </span>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white/10">
                      <Image
                        src="/dental/antigravity-engine.png"
                        alt="Smart AI Engine"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">Autonomous Agent Active</span>
                      <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                        Reads CRM events, executes background tasks &amp; triggers WhatsApp API
                      </p>
                    </div>
                  </div>

                  {/* 6 Connected Integrations Badges */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      Active Automation Bridges:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/10">
                        Claude 3.7
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/10">
                        OpenAI GPT-4o
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-[#E8B62A] border border-[#E8B62A]/30">
                        Webhook Queues
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-emerald-400 border border-emerald-500/30">
                        WhatsApp API
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/10">
                        Buffer Sync
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/10 text-blue-300 border border-blue-400/30">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => openProjectModal()}
                      className="w-full py-2.5 rounded-xl bg-[#2D5FC7] hover:bg-[#234ca1] text-white text-xs font-bold uppercase tracking-wider transition-all text-center cursor-pointer shadow-md"
                    >
                      Connect Your Business Workflows &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
