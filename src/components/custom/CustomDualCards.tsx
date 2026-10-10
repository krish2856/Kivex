"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

interface CustomDualCardsProps {
  onSelectBrandMaterials?: () => void;
  onSelectMarketingContent?: () => void;
}

export default function CustomDualCards({
  onSelectBrandMaterials,
  onSelectMarketingContent,
}: CustomDualCardsProps = {}) {
  const { openProjectModal } = useProjectModal();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const faqs = [
    {
      q: "How fast can you deliver a custom platform from scratch?",
      a: "Our typical MVP timeline is 3 to 6 weeks. Because we begin with rigorous planning blueprints and use production-tested modular components, we deploy functional sprints rapidly without compromising code quality.",
    },
    {
      q: "Do we own the full intellectual property and code repository?",
      a: "Yes, 100%. Upon completion, all source code, Figma design files, cloud deployment scripts, and database schemas are transferred directly to your organization with full ownership.",
    },
    {
      q: "How do automated workflows connect to our existing database?",
      a: "We connect workflow automation securely using API keys and scoped database read permissions or webhook events (n8n, Supabase, PostgreSQL), ensuring zero unauthorized data leaks.",
    },
  ];

  return (
    <section id="custom-ecosystem" className="py-14 md:py-20 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="mb-10 max-w-3xl">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#C69432] font-bold">
            BEYOND JUST SOFTWARE DEVELOPMENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase mt-2">
            The Complete <span className="text-[#2D5FC7]">Digital Product</span> Stack
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Great technology requires cohesive brand authority and a relentless go-to-market engine. We deliver both alongside your custom web platform.
          </p>
        </div>

        {/* The Two Cinematic Dark Cards (Matching Dental & Real Estate) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Brand & Design Systems */}
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
                alt="Brand & Design Systems Keynote"
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
                  Explore 12 Deliverables &rarr;
                </span>
              </div>

              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-sm group-hover:text-blue-300 transition-colors">
                Brand Materials &amp; Design Systems
              </h3>
              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-normal">
                Scalable vector logo systems, Figma design tokens, investor pitch decks, documentation themes, and executive collateral designed to establish enterprise authority.
              </p>

              <div className="mt-4 space-y-2">
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Figma Design Token Spec</span>
                  <span className="text-emerald-400 font-bold">✓ Included</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">Investor &amp; Sales Pitch Deck</span>
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
                className="text-xs font-bold text-[#93C5FD] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Brand Showcase</span>
                <span className="text-sm">&rarr;</span>
              </button>

              <span className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center group-hover:bg-[#2D5FC7] transition-colors">
                ↗
              </span>
            </div>
          </motion.div>

          {/* Card 2: Marketing & Growth Engines */}
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
                alt="Product Launch & Marketing Event"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center brightness-75 contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />

              <div className="absolute right-6 bottom-16 text-6xl sm:text-7xl font-serif font-bold text-white/5 pointer-events-none select-none">
                S.
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
                  Explore 5 Formats &rarr;
                </span>
              </div>

              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-sm group-hover:text-amber-300 transition-colors">
                Product Launch &amp; Marketing Engine
              </h3>
              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-normal">
                Cinematic product demo motion graphics, conversion-optimized landing copy, technical case studies, and automated Buffer social publishing pipelines.
              </p>

              <div className="mt-4 space-y-2">
                <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200">60-Second Demo Video</span>
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
                className="text-xs font-bold text-[#FDE68A] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
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

        {/* Technical FAQ Accordion */}
        <div className="mt-16 pt-12 border-t border-black/[0.08]">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase mb-6">
            Frequently Asked Technical Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === `faq-${idx}`;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : `faq-${idx}`)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#2D5FC7] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-lg font-mono">{isOpen ? "−" : "+"}</span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                      >
                        <p className="pt-3">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
