"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

interface DentalDualCardsProps {
  onSelectBrandMaterials?: () => void;
  onSelectMarketingContent?: () => void;
}

export default function DentalDualCards({
  onSelectBrandMaterials,
  onSelectMarketingContent,
}: DentalDualCardsProps = {}) {
  const { openProjectModal } = useProjectModal();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const faqs = [
    {
      q: "What is included in Brand & Physical Materials?",
      a: "We design and produce luxury physical clinic collateral: tactile appointment cards, custom prescription slips, post-procedure care envelopes, waiting room guides, and architectural signage guidelines.",
    },
    {
      q: "How does Marketing Content drive new patient bookings?",
      a: "We produce clinical before-and-after smile transformation showcases, doctor Q&A video reels, and localized ad creatives engineered specifically to turn local searchers into confirmed cosmetic consultations.",
    },
    {
      q: "Can this integrate with our existing clinic branding?",
      a: "Yes. Whether you already have an established visual identity or need a complete bespoke luxury rebrand, we tailor all physical assets and video content to match your clinic aesthetic.",
    },
  ];

  return (
    <section id="elite-network" className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
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
            The Complete Single
            <br />
            Dental <span className="text-[#2D5FC7]">Ecosystem</span>
          </motion.h2>

          {/* Sequential Ecosystem Pipeline Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 max-w-4xl mx-auto px-2"
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-tight text-slate-700 bg-white/70 border border-black/[0.08] p-3 rounded-2xl shadow-2xs">
              <span className="px-2 py-0.5 rounded-md bg-[#2D5FC7] text-white">Website</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white">Booking</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white">CRM</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white">Patient Intake</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white">Notifications</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-[#2D5FC7] text-white">AI Insights</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white">Social Media</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white">Marketing</span>
              <span>&rarr;</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white">Growth</span>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We build the single digital ecosystem required to attract patients, manage daily clinic operations, automate repetitive work, and grow your practice.
            </p>
          </motion.div>
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
              ALL.
            </div>

            <div className="flex items-center gap-2 px-2">
              <span className="text-xs font-bold tracking-tight text-white">
                Kivex Dental Growth System
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Single Ecosystem
              </span>
            </div>

            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-4 py-2 rounded-xl bg-[#A7F3D0] hover:bg-[#86EFAC] text-[#064E3B] text-xs font-bold tracking-tight transition-all shadow-xs cursor-pointer"
            >
              Get Full System
            </button>
          </motion.div>
        </div>

        {/* The Two Cinematic Dark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Submit your website for visibility and recognition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col justify-between p-7 sm:p-9 text-white shadow-2xl border border-white/10"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/dental/card-speaker.jpg"
                alt="Speaker presenting on stage"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center brightness-75 contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />
            </div>

            <div
              className="relative z-10 cursor-pointer"
              onClick={() => {
                if (onSelectBrandMaterials) {
                  onSelectBrandMaterials();
                } else {
                  openProjectModal();
                }
              }}
            >
              <div className="flex items-center justify-end mb-3">
                <span className="text-xs font-mono text-slate-300 group-hover:text-blue-300 transition-colors">
                  Explore 13 Deliverables &rarr;
                </span>
              </div>

              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-sm group-hover:text-blue-300 transition-colors">
                Brand &amp; Physical Materials
              </h3>
              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-normal">
                Luxury physical clinic collateral, vector logo packages, stationery, prescription slips, tactile appointment cards, and premium signage.
              </p>

              <div className="mt-4 space-y-2">
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Clinic Stationery &amp; Rx Spec</span>
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Tactile Appointment Cards &amp; QR Stand</span>
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  if (onSelectBrandMaterials) {
                    onSelectBrandMaterials();
                  } else {
                    openProjectModal();
                  }
                }}
                className="text-xs font-bold text-[#93C5FD] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>View Brand Showcase</span>
                <span className="text-sm">&rarr;</span>
              </button>

              <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center group-hover:bg-[#2D5FC7] transition-colors">
                ↗
              </span>
            </div>
          </motion.div>

          {/* Card 2: 2. Marketing Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col justify-between p-7 sm:p-9 text-white shadow-2xl border border-white/10"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="/dental/card-auditorium.jpg"
                alt="Keynote auditorium conference hall"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center brightness-75 contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />

              <div className="absolute right-6 bottom-16 text-6xl sm:text-7xl font-serif font-bold text-white/5 pointer-events-none select-none">
                W.
              </div>
            </div>

            <div
              className="relative z-10 cursor-pointer"
              onClick={() => {
                if (onSelectMarketingContent) {
                  onSelectMarketingContent();
                } else {
                  openProjectModal();
                }
              }}
            >
              <div className="flex items-center justify-end mb-3">
                <span className="text-xs font-mono text-slate-300 group-hover:text-amber-300 transition-colors">
                  Explore 6 Formats &rarr;
                </span>
              </div>

              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-sm group-hover:text-amber-300 transition-colors">
                Marketing &amp; Media Engine
              </h3>
              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-normal">
                Cinematic model shoots, doctor-led educational podcasts, patient video reviews, and automated Buffer social publishing pipelines.
              </p>

              <div className="mt-4 space-y-2">
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">60-Second Treatment Reels</span>
                  <span className="text-emerald-400 font-bold">✓ 4K 60FPS</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Automated Social Sync</span>
                  <span className="text-emerald-400 font-bold">✓ Buffer API</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  if (onSelectMarketingContent) {
                    onSelectMarketingContent();
                  } else {
                    openProjectModal();
                  }
                }}
                className="text-xs font-bold text-[#FDE68A] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>View Growth Showcase</span>
                <span className="text-sm">&rarr;</span>
              </button>

              <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center group-hover:bg-[#D97706] transition-colors">
                ↗
              </span>
            </div>
          </motion.div>
        </div>

        {/* Kivex Positioning Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col items-start text-left max-w-2xl">
            <h4 className="mt-1 text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
              Building Digital Systems That Move Businesses Forward.
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              For dental clinics, we build the complete digital infrastructure required to attract patients, manage operations, automate repetitive work, and grow their practice.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openProjectModal()}
            className="shrink-0 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
          >
            Deploy For Your Clinic &rarr;
          </button>
        </motion.div>

        {/* Modal / Accordion Drawer for FAQs */}
        <AnimatePresence>
          {activeFaq && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-6 rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h4 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  Frequently Asked Questions
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveFaq(null)}
                  className="text-xs font-mono font-bold text-slate-400 hover:text-slate-800 px-2 py-1 rounded bg-slate-100"
                >
                  ✕ CLOSE
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                    <h5 className="text-xs font-bold text-[#0F172A] leading-snug">
                      {faq.q}
                    </h5>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
