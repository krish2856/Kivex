"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface MarketingFormat {
  id: string;
  badge: string;
  title: string;
  role: string;
  description: string;
  specs: string[];
}

const formats: MarketingFormat[] = [
  {
    id: "launch-video",
    badge: "01 • VIDEO ENGINE",
    title: "Product Launch & Demo Video Motion",
    role: "Conversion & Discovery Engine",
    description:
      "High-energy 60-second product demo videos, feature sizzle reels, and interactive walkthrough animations tailored for Product Hunt, LinkedIn, and investors.",
    specs: ["4K Resolution", "60 FPS Render", "Custom Motion Graphics", "Narrated Script"],
  },
  {
    id: "landing-copy",
    badge: "02 • COPYWRITING",
    title: "High-Converting Product Storytelling",
    role: "Messaging & Value Architecture",
    description:
      "Clear, persuasive technical messaging that translates complex software capabilities into undeniable business ROI for decision-makers and buyers.",
    specs: ["AIDA Funnel", "Objection Handling", "SEO Keyword Targeting", "Feature Breakdown"],
  },
  {
    id: "case-studies",
    badge: "03 • PROOF ASSETS",
    title: "Technical Case Studies & Whitepapers",
    role: "Trust & Enterprise Verification",
    description:
      "Deep-dive technical architectural write-ups detailing real user problems, architectural decisions, benchmarks, and measurable business outcomes.",
    specs: ["System Diagrams", "Benchmark Graphs", "Client Quotes", "PDF & Web Formatting"],
  },
  {
    id: "automated-distribution",
    badge: "04 • DISTRIBUTION",
    title: "Automated Buffer Social Publishing",
    role: "Pipeline & Audience Growth",
    description:
      "Automated distribution pipelines connected to Buffer and LinkedIn API that regularly queue release notes, feature highlights, and customer updates.",
    specs: ["Multi-Network Queue", "Buffer Integration", "Analytics Tracking", "Scheduled Batches"],
  },
];

interface CustomMarketingContentProps {
  onBack?: () => void;
}

export default function CustomMarketingContent({ onBack }: CustomMarketingContentProps) {
  const { openProjectModal } = useProjectModal();

  return (
    <section id="marketing-content" className="py-14 sm:py-20 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Navigation & Return */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-black/[0.08]">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-300 shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <span>&larr;</span>
                <span>Back to Overview</span>
              </button>
            )}

          </div>

          <button
            type="button"
            onClick={() => openProjectModal()}
            className="px-5 py-2 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md self-start sm:self-auto"
          >
            Launch Marketing Engine &rarr;
          </button>
        </div>

        {/* Title */}
        <div className="my-8 sm:my-12 max-w-3xl">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#C69432] font-bold">
            GO-TO-MARKET INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase mt-2">
            Product Launch &amp; <span className="text-[#2D5FC7]">Growth Marketing</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Great software deserves an audience. We equip your platform with high-converting launch assets, compelling technical case studies, and automated distribution pipelines.
          </p>
        </div>

        {/* 4 Formats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formats.map((f, idx) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2D5FC7]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                  {f.badge}
                </span>

                <h3 className="text-xl font-bold text-slate-900 mt-4 leading-tight">
                  {f.title}
                </h3>
                <p className="text-xs font-semibold text-[#2D5FC7] mt-1 font-mono">
                  {f.role}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {f.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {f.specs.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
