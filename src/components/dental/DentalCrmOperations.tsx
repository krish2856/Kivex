"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function DentalCrmOperations() {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <section className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Massive Monumental Headline */}
        <div className="text-center my-6 sm:my-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase"
          >
            CRM For Smooth
            <br />
            Clinic <span className="text-[#2D5FC7]">Operations</span>
          </motion.h2>
        </div>

        {/* Floating Pill Dock below Title */}
        <div className="flex justify-center mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 p-1.5 rounded-2xl bg-[#1E1E1E] text-white shadow-xl border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center font-bold text-sm text-white">
              CRM.
            </div>

            <div className="flex items-center gap-2 px-2">
              <span className="text-xs font-bold tracking-tight text-white">
                Dental Prime Studio CRM
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Clinical Operations Console
              </span>
            </div>

            <a
              href="https://dentalprimeweb3.onrender.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#A7F3D0] hover:bg-[#86EFAC] text-[#064E3B] text-xs font-bold tracking-tight transition-all shadow-xs cursor-pointer"
            >
              Live Console Demo
            </a>
          </motion.div>
        </div>

        {/* The Split Grid (Mockup + Specs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-4">
          {/* Left Column: Real CRM Dashboard Window Mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl bg-[#0A0A0A] p-2.5 sm:p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-800 group cursor-pointer"
              onClick={() => setIsZoomOpen(true)}
            >
              {/* Window Header Bar with macOS Controls & Live URL */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold ml-1 hidden sm:inline">
                    dentalprime.kivex.app/crm
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE ENGINE
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Click to Zoom 🔍
                  </span>
                </div>
              </div>

              {/* Real CRM Dashboard Image Screenshot */}
              <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80">
                <Image
                  src="/dental/dental-crm-dashboard.png"
                  alt="Dental Prime Studio CRM & Clinical Studio by Kivex"
                  width={1024}
                  height={576}
                  priority
                  className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>

              {/* Bottom Quick Telemetry Bar from Screenshot */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 grid grid-cols-4 gap-2 text-center text-white">
                <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[8px] font-mono text-slate-400 uppercase">Walk-in</div>
                  <div className="text-xs sm:text-sm font-bold text-amber-400">3 Lounge</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[8px] font-mono text-slate-400 uppercase">Online</div>
                  <div className="text-xs sm:text-sm font-bold text-blue-400">2 Review</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[8px] font-mono text-slate-400 uppercase">EMR Files</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400">6 Active</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[8px] font-mono text-slate-400 uppercase">Collections</div>
                  <div className="text-xs sm:text-sm font-bold text-white">₹36,000</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start justify-center">
            <span className="text-[11px] font-mono tracking-widest text-[#2D5FC7] uppercase font-bold">
              PRACTICE CRM &amp; OPERATIONS
            </span>
            <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Centralized Daily Clinic Operations
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-normal">
              A centralized CRM designed to manage your clinic&apos;s daily operations and entire patient journey. Manage online appointments, walk-in/offline bookings, in-clinic QR check-ins, doctor rosters, patient clinical notes, prescriptions, and financial performance from one unified console.
            </p>

            <div className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-700 w-full">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Online, Walk-In &amp; QR Booking: </span>
                  <span className="text-slate-600">Convert online bookings into clinic walk-ins with real-time chair queue management.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Notes, Rx &amp; Follow-Ups: </span>
                  <span className="text-slate-600">Doctor &amp; treatment management, clinical notes, digital prescriptions, and history.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Revenue, Expenses &amp; KPIs: </span>
                  <span className="text-slate-600">Financial tracking, weekly/monthly performance reports, and executive analytics.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://dentalprimeweb3.onrender.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#2D5FC7] hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
              >
                Explore CRM Architecture &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen CRM Dashboard Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-2xl bg-black border border-white/20 p-2 sm:p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/80 border border-white/30 text-white flex items-center justify-center text-sm hover:bg-white hover:text-black transition-colors cursor-pointer"
                aria-label="Close zoom"
              >
                ✕
              </button>
              <Image
                src="/dental/dental-crm-dashboard.png"
                alt="Dental Prime Studio CRM Full View"
                width={1024}
                height={576}
                className="w-full h-auto rounded-xl block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
