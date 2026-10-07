"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface BrandServiceItem {
  id: string;
  number: string;
  header: string;
  category: "identity" | "product" | "marketing" | "enterprise";
  categoryLabel: string;
  smallInfo: string;
  materialSpec: string;
  finishSpec: string;
  turnaroundSpec: string;
  dimensionsSpec: string;
  mockupAccent: string;
}

const brandServices: BrandServiceItem[] = [
  {
    id: "logo-identity",
    number: "01",
    header: "Vector Brand Identity & Guidelines",
    category: "identity",
    categoryLabel: "Brand Identity",
    smallInfo: "Scalable vector logos, dark/light variations, favicon assets, responsive icon marks, and color token definitions.",
    materialSpec: "SVG / EPS / Figma Library",
    finishSpec: "WCAG AAA Accessible Contrast",
    turnaroundSpec: "Included in Discovery",
    dimensionsSpec: "16px Favicon to 8K Billboards",
    mockupAccent: "from-[#2D5FC7] to-[#1E3D8A]",
  },
  {
    id: "design-tokens",
    number: "02",
    header: "Tokenized UI Design System",
    category: "identity",
    categoryLabel: "Design System",
    smallInfo: "Complete Tailwind CSS theme tokens matching Figma variables: typography scale, semantic radii, and elevation shadows.",
    materialSpec: "Tailwind / CSS Variables",
    finishSpec: "Fluid Typography & Physics Easing",
    turnaroundSpec: "Sprint 01 Kickoff",
    dimensionsSpec: "Universal Responsive Spec",
    mockupAccent: "from-amber-600 to-amber-800",
  },
  {
    id: "pitch-deck",
    number: "03",
    header: "Investor & Customer Pitch Deck",
    category: "enterprise",
    categoryLabel: "Enterprise Collateral",
    smallInfo: "15-slide master slide deck formatted in 16:9 widescreen for investment rounds, enterprise procurement, and high-ticket sales.",
    materialSpec: "Figma / Keynote / PDF 300 DPI",
    finishSpec: "Custom Data Visualizations",
    turnaroundSpec: "3-5 Business Days",
    dimensionsSpec: "1920x1080 Full HD Widescreen",
    mockupAccent: "from-slate-900 to-slate-800",
  },
  {
    id: "api-docs-styling",
    number: "04",
    header: "API & Developer Documentation Styling",
    category: "product",
    categoryLabel: "Developer Experience",
    smallInfo: "Branded OpenAPI / Swagger / Mintlify theme with syntax highlighting, live request playgrounds, and code copy snippets.",
    materialSpec: "Markdown / MDX / Tailwind",
    finishSpec: "Dark Mode Default / Code Highlighting",
    turnaroundSpec: "Sprint 02",
    dimensionsSpec: "Responsive Web Portal",
    mockupAccent: "from-blue-600 to-indigo-900",
  },
  {
    id: "executive-one-pager",
    number: "05",
    header: "Product One-Pager & Spec Sheet",
    category: "enterprise",
    categoryLabel: "Sales Collateral",
    smallInfo: "High-density single-sheet product overview designed for C-suite decision-makers, CTO technical sign-off, and sales attachments.",
    materialSpec: "Vector PDF & Print Ready",
    finishSpec: "Matte 350 GSM Finish Available",
    turnaroundSpec: "48 Hours",
    dimensionsSpec: "Standard A4 / US Letter",
    mockupAccent: "from-emerald-700 to-slate-900",
  },
  {
    id: "onboarding-kit",
    number: "06",
    header: "Client Onboarding & Training Playbook",
    category: "product",
    categoryLabel: "Product Success",
    smallInfo: "Step-by-step user manual with annotated screenshots, role permission matrices, and quickstart cheat sheets for internal teams.",
    materialSpec: "Interactive PDF & Web Guide",
    finishSpec: "Hyperlinked Table of Contents",
    turnaroundSpec: "Included at Delivery",
    dimensionsSpec: "Digital & Printable",
    mockupAccent: "from-purple-700 to-indigo-950",
  },
  {
    id: "launch-video-motion",
    number: "07",
    header: "Product Launch & Demo Video Motion",
    category: "marketing",
    categoryLabel: "Marketing Video Engine",
    smallInfo: "High-energy 60-second product demo videos, feature sizzle reels, and interactive UI walkthrough animations for social and launch campaigns.",
    materialSpec: "4K 60FPS / Custom Motion",
    finishSpec: "Narrated Script & Sizzle Cut",
    turnaroundSpec: "4-6 Business Days",
    dimensionsSpec: "16:9 Widescreen & 9:16 Shorts",
    mockupAccent: "from-rose-600 to-red-900",
  },
  {
    id: "copywriting-funnel",
    number: "08",
    header: "High-Converting Product Copywriting",
    category: "marketing",
    categoryLabel: "Marketing Copy & Messaging",
    smallInfo: "Clear, persuasive technical messaging and AIDA value frameworks translating complex technical features into irresistible sales conversions.",
    materialSpec: "AIDA Messaging Framework",
    finishSpec: "Objection Handling & SEO Copy",
    turnaroundSpec: "Included with Build",
    dimensionsSpec: "Full Conversion Funnel",
    mockupAccent: "from-amber-600 to-orange-800",
  },
  {
    id: "case-studies-whitepapers",
    number: "09",
    header: "Technical Case Studies & Whitepapers",
    category: "marketing",
    categoryLabel: "Enterprise Proof",
    smallInfo: "Deep-dive technical architectural write-ups detailing real user benchmarks, architecture diagrams, and measurable enterprise business outcomes.",
    materialSpec: "PDF & Web MDX Format",
    finishSpec: "System Architecture Diagrams",
    turnaroundSpec: "3-4 Business Days",
    dimensionsSpec: "A4 / Web Responsive",
    mockupAccent: "from-blue-600 to-cyan-800",
  },
  {
    id: "buffer-social-sync",
    number: "10",
    header: "Automated Buffer Social Publishing",
    category: "marketing",
    categoryLabel: "Marketing Automation",
    smallInfo: "Automated social content distribution connected to Buffer and LinkedIn API that regularly publishes feature updates, announcements, and product metrics.",
    materialSpec: "Buffer API / Multi-Network",
    finishSpec: "Autonomous Queue & Analytics",
    turnaroundSpec: "Live Pipeline Sync",
    dimensionsSpec: "Multi-Platform Scheduled",
    mockupAccent: "from-emerald-600 to-teal-800",
  },
];

interface CustomBrandMaterialsProps {
  onBack?: () => void;
  defaultFilter?: "all" | "identity" | "product" | "marketing" | "enterprise";
}

export default function CustomBrandMaterials({ onBack, defaultFilter = "all" }: CustomBrandMaterialsProps) {
  const { openProjectModal } = useProjectModal();
  const [activeFilter, setActiveFilter] = useState<"all" | "identity" | "product" | "marketing" | "enterprise">(defaultFilter);

  const filtered = activeFilter === "all"
    ? brandServices
    : brandServices.filter((s) => s.category === activeFilter);

  return (
    <section id="brand-materials" className="py-14 sm:py-20 bg-[#F5EFE5] text-[#0A0A0A]">
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
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Deliverables &bull; Brand, Design &amp; Marketing Suite
            </span>
          </div>

          <button
            type="button"
            onClick={() => openProjectModal()}
            className="px-5 py-2 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md self-start sm:self-auto"
          >
            Request Brand &amp; Marketing Kit &rarr;
          </button>
        </div>

        {/* Title */}
        <div className="my-8 sm:my-12 max-w-3xl">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#C69432] font-bold">
            EXPANDED BRANDING &amp; MARKETING SUITE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase mt-2">
            Brand Assets, Design Systems &amp; <span className="text-[#2D5FC7]">Marketing Engines</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            A software application requires more than just code. We deliver the full design system, pitch decks, high-converting launch videos, case studies, and automated Buffer social publishing pipelines that establish your market authority.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Deliverables (10)" },
              { id: "identity", label: "Brand Identity" },
              { id: "product", label: "Design Systems & UI" },
              { id: "marketing", label: "Marketing & Growth Engine" },
              { id: "enterprise", label: "Enterprise Collateral" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-[#2D5FC7] text-white shadow-sm"
                    : "bg-white/80 hover:bg-white text-slate-700 border border-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2D5FC7]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#C69432]">
                    {item.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.categoryLabel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {item.header}
                </h3>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal">
                  {item.smallInfo}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5 text-[11px] font-mono text-slate-500">
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="text-slate-800 font-semibold">{item.materialSpec}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard:</span>
                  <span className="text-slate-800 font-semibold">{item.finishSpec}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="text-emerald-600 font-semibold">{item.turnaroundSpec}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
