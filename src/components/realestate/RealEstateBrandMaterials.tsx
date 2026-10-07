"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface BrandServiceItem {
  id: string;
  number: string;
  header: string;
  category: "identity" | "brokerage" | "buyer";
  categoryLabel: string;
  smallInfo: string;
  materialSpec: string;
  finishSpec: string;
  turnaroundSpec: string;
  dimensionsSpec: string;
  mockupAccent: string;
  visualType:
    | "logo"
    | "business-card"
    | "letterhead"
    | "pitch-folder"
    | "showing-pass"
    | "investor-nfc"
    | "signage"
    | "reception-banner"
    | "brochure"
    | "flyers"
    | "price-list"
    | "qr-stand"
    | "staff-id";
}

export function RealEstatePrimeLogo({
  variant = "light",
  size = "md",
  className = "",
}: {
  variant?: "dark" | "light" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const isDark = variant === "dark";
  const isGold = variant === "gold";

  const symbolSize =
    size === "sm"
      ? "text-xl sm:text-2xl"
      : size === "lg"
      ? "text-4xl sm:text-5xl"
      : size === "xl"
      ? "text-5xl sm:text-6xl"
      : "text-2xl sm:text-3xl";

  const mainTextSize =
    size === "sm"
      ? "text-[11px] tracking-[0.16em]"
      : size === "lg"
      ? "text-base sm:text-lg tracking-[0.2em]"
      : size === "xl"
      ? "text-xl sm:text-2xl tracking-[0.22em]"
      : "text-xs sm:text-sm tracking-[0.18em]";

  const subTextSize =
    size === "sm"
      ? "text-[7px] tracking-[0.24em]"
      : size === "lg"
      ? "text-[9px] tracking-[0.28em]"
      : size === "xl"
      ? "text-[10px] sm:text-xs tracking-[0.3em]"
      : "text-[8px] sm:text-[9px] tracking-[0.24em]";

  const textColor = isGold
    ? "text-amber-500 drop-shadow-xs"
    : isDark
    ? "text-white"
    : "text-[#0A0A0A]";

  const subColor = isGold
    ? "text-amber-600/90"
    : isDark
    ? "text-slate-400"
    : "text-[#666666]";

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* The R/ Monogram Mark */}
      <div className={`flex items-baseline font-serif ${symbolSize} ${textColor} font-normal leading-none`}>
        <span className="italic font-normal">R</span>
        <span className="font-light italic ml-0.5 opacity-80">/</span>
      </div>

      {/* The Wordmark + Subtitle */}
      <div className="flex flex-col text-left justify-center leading-none">
        <span className={`font-sans font-bold uppercase ${mainTextSize} ${textColor}`}>
          REAL ESTATE PRIME
        </span>
        <span className={`font-sans font-medium uppercase mt-0.5 ${subTextSize} ${subColor}`}>
          ESTATES &amp; CAPITAL
        </span>
      </div>
    </div>
  );
}

const BRAND_SERVICES: BrandServiceItem[] = [
  {
    id: "brokerage-logo",
    number: "01",
    header: "Brokerage & estate logo",
    category: "identity",
    categoryLabel: "Identity",
    smallInfo:
      "Bespoke architectural monogram, luxury vector typography & complete master visual identity system.",
    materialSpec: "Vector AI, SVG, EPS & High-Res PNG master suite",
    finishSpec: "CMYK Print + RGB Web + Monochrome variations",
    turnaroundSpec: "3-5 Business Days",
    dimensionsSpec: "Scalable Vector & Digital Suite",
    mockupAccent: "#2D5FC7",
    visualType: "logo",
  },
  {
    id: "visiting-business-cards",
    number: "02",
    header: "Visiting/business cards",
    category: "identity",
    categoryLabel: "Identity",
    smallInfo:
      "600 GSM heavy-weight cotton cardstock with embossed gold-foil crest & soft-touch velvet lamination.",
    materialSpec: "600 GSM Ultra-thick Cotton Cardstock",
    finishSpec: "Embossed Gold Foil + Soft-Touch Velvet Matte",
    turnaroundSpec: "48-72h Batch Printing",
    dimensionsSpec: "3.5\" x 2.0\" Standard Die-Cut",
    mockupAccent: "#D97706",
    visualType: "business-card",
  },
  {
    id: "letterhead",
    number: "03",
    header: "Broker letterhead",
    category: "identity",
    categoryLabel: "Identity",
    smallInfo:
      "Executive stationery for formal offers, heads-of-terms agreements & development advisory memos.",
    materialSpec: "120 GSM Royal Executive Bond Paper",
    finishSpec: "Security Watermark + Metallic Foil Crest",
    turnaroundSpec: "Next-Day Dispatch",
    dimensionsSpec: "A4 (210 x 297 mm)",
    mockupAccent: "#0D9488",
    visualType: "letterhead",
  },
  {
    id: "pitch-folder",
    number: "04",
    header: "Presentation pitch folder",
    category: "identity",
    categoryLabel: "Identity",
    smallInfo:
      "Heavyweight presentation folder with foil stamped crest and interior pockets for floor plans & contract drafts.",
    materialSpec: "350 GSM Silk Artboard with Gusset Pocket",
    finishSpec: "Matte Anti-Scratch Lamination + Gold Foil Stamp",
    turnaroundSpec: "4 Business Days",
    dimensionsSpec: "9\" x 12\" Standard Presentation Folder",
    mockupAccent: "#2D5FC7",
    visualType: "pitch-folder",
  },
  {
    id: "showing-pass",
    number: "05",
    header: "VIP site showing card",
    category: "buyer",
    categoryLabel: "Buyer",
    smallInfo:
      "Tactile showing invitation cards with gate access code, private tour time slot & assigned broker contact.",
    materialSpec: "400 GSM Uncoated Linen Cardstock",
    finishSpec: "Dual-Sided Matt with QR Verification Grid",
    turnaroundSpec: "48h Print Ready",
    dimensionsSpec: "3.5\" x 2.0\" Pocket Friendly",
    mockupAccent: "#7C3AED",
    visualType: "showing-pass",
  },
  {
    id: "investor-nfc-card",
    number: "06",
    header: "Investor smart NFC pass",
    category: "buyer",
    categoryLabel: "Buyer",
    smallInfo:
      "Durable PVC/NFC smart cards for high-net-worth investors giving instant tap access to off-market inventory.",
    materialSpec: "Premium Rigid PVC with Embedded NFC Chip",
    finishSpec: "Matte Frosting + Hot Stamped Gold Member ID",
    turnaroundSpec: "5 Business Days",
    dimensionsSpec: "CR80 (85.6 x 54 mm) Credit Card Size",
    mockupAccent: "#059669",
    visualType: "investor-nfc",
  },
  {
    id: "signage",
    number: "07",
    header: "Development site signage",
    category: "brokerage",
    categoryLabel: "Signage",
    smallInfo:
      "Architectural exterior 3D acrylic backlit lettering, brushed steel site hoardings & directional signs.",
    materialSpec: "Weatherproof Cast Acrylic & Marine Grade Steel",
    finishSpec: "IP67 Warm LED Halo Illumination",
    turnaroundSpec: "7-10 Days Fabrication",
    dimensionsSpec: "Custom Architectural Sizing",
    mockupAccent: "#F59E0B",
    visualType: "signage",
  },
  {
    id: "reception-banner",
    number: "08",
    header: "Sales lounge banner",
    category: "brokerage",
    categoryLabel: "Signage",
    smallInfo:
      "Freestanding luxury roll-up displays for sales galleries, showcasing master site plans & penthouses.",
    materialSpec: "Anti-Curl Polypropylene Film",
    finishSpec: "Anodized Aluminum Cassette Stand",
    turnaroundSpec: "2 Business Days",
    dimensionsSpec: "33\" x 81\" (85 x 205 cm)",
    mockupAccent: "#EC4899",
    visualType: "reception-banner",
  },
  {
    id: "brochure",
    number: "09",
    header: "Luxury property brochure",
    category: "buyer",
    categoryLabel: "Buyer",
    smallInfo:
      "Full-color tri-fold and booklet guides showcasing architectural renders, floor layouts & finish options.",
    materialSpec: "250 GSM Silk Coated Art Paper",
    finishSpec: "Spot UV Gloss on Architectural Photography",
    turnaroundSpec: "3 Business Days",
    dimensionsSpec: "A4 Tri-Fold (6 Pages)",
    mockupAccent: "#06B6D4",
    visualType: "brochure",
  },
  {
    id: "flyers",
    number: "10",
    header: "Neighborhood flyers",
    category: "buyer",
    categoryLabel: "Marketing",
    smallInfo:
      "Direct-mail promotional leaflets for luxury listings, open house invitations & newly released phases.",
    materialSpec: "170 GSM Gloss Artpaper",
    finishSpec: "Double-Sided Full Color Process",
    turnaroundSpec: "24-48h Fast Batch",
    dimensionsSpec: "A5 (148 x 210 mm)",
    mockupAccent: "#EA580C",
    visualType: "flyers",
  },
  {
    id: "price-list",
    number: "11",
    header: "Unit inventory & price sheet",
    category: "brokerage",
    categoryLabel: "Brokerage",
    smallInfo:
      "Transparent unit availability tariffs with clear square footage, payment schedules & milestone breakdowns.",
    materialSpec: "350 GSM Heavy Board with Acrylic Stand",
    finishSpec: "Matte Anti-Glare Lamination",
    turnaroundSpec: "2 Business Days",
    dimensionsSpec: "A4 Vertical Display",
    mockupAccent: "#6366F1",
    visualType: "price-list",
  },
  {
    id: "qr-stand",
    number: "12",
    header: "QR code desk stand",
    category: "brokerage",
    categoryLabel: "Brokerage",
    smallInfo:
      "Laser-engraved acrylic stands linking directly to 3D virtual walkthroughs & WhatsApp brochure downloads.",
    materialSpec: "Laser-cut 5mm Clear Acrylic & Solid Walnut Base",
    finishSpec: "High-Contrast Scratch-Resistant UV Printing",
    turnaroundSpec: "3-5 Business Days",
    dimensionsSpec: "6\" x 8\" Tabletop Footprint",
    mockupAccent: "#10B981",
    visualType: "qr-stand",
  },
  {
    id: "staff-id",
    number: "13",
    header: "Broker & agent ID badges",
    category: "brokerage",
    categoryLabel: "Brokerage",
    smallInfo:
      "Professional magnetic lanyard badges with agent portrait, license credentials & sales suite RFID access.",
    materialSpec: "Rigid CR80 Composite PVC Card",
    finishSpec: "RFID Chip Integration & Matte Overlay",
    turnaroundSpec: "48h Replacement Service",
    dimensionsSpec: "85.6 x 54 mm Standard ISO",
    mockupAccent: "#4F46E5",
    visualType: "staff-id",
  },
];

interface RealEstateBrandMaterialsProps {
  onBack?: () => void;
}

export default function RealEstateBrandMaterials({ onBack }: RealEstateBrandMaterialsProps) {
  const [activeItem, setActiveItem] = useState<BrandServiceItem>(BRAND_SERVICES[0]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "identity" | "brokerage" | "buyer">("all");
  const { openProjectModal } = useProjectModal();

  const filteredItems = BRAND_SERVICES.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const listRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (offset: number) => {
    if (listRef.current) {
      listRef.current.scrollBy({ top: offset, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section id="brand-materials" className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {onBack && (
          <div className="pb-6 mb-6 border-b border-black/[0.08] flex justify-start">
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 rounded-full border border-slate-400 hover:border-black text-xs font-bold text-slate-800 hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Return to Brokerage Flow"
            >
              <span>&larr;</span>
              <span className="hidden sm:inline">Back to Brokerage Operations</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        )}

        {/* Massive Monumental Headline */}
        <div className="text-center max-w-4xl mx-auto my-6 sm:my-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[11px] font-mono tracking-widest text-[#2D5FC7] uppercase font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-3">
              PHYSICAL REAL ESTATE BRANDING SUITE
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase"
          >
            Brand &amp; Physical
            <br />
            Materials <span className="text-[#2D5FC7]">Suite</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Every physical and visual touchpoint reflects your brokerage&apos;s prestige. From bespoke presentations, architectural brochures, and executive cards to tactile showing passes, offer folios, sales gallery stands, and development hoardings—we build a cohesive brand identity for your firm.
          </motion.p>
        </div>

        {/* Floating Pill Dock below Title */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 p-1.5 rounded-2xl bg-[#1E1E1E] text-white shadow-xl border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center font-bold text-sm text-white">
              PRINT.
            </div>

            <div className="flex items-center gap-2 px-2">
              <span className="text-xs font-bold tracking-tight text-white">
                Kivex Real Estate Brand Kit
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                13 Studio Assets
              </span>
            </div>

            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-4 py-2 rounded-xl bg-[#A7F3D0] hover:bg-[#86EFAC] text-[#064E3B] text-xs font-bold tracking-tight transition-all shadow-xs"
            >
              Order Sample Kit Box
            </button>
          </motion.div>
        </div>

        {/* The Balanced Split Grid: Mockup Console on Left, Modular 13 Items on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pt-2">
          {/* Left Column: Visual Showcase Mockup Console */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 self-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl bg-[#0A0A0A] p-3 sm:p-4 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] border border-slate-800"
            >
              {/* Laptop screen top notch */}
              <div className="flex items-center justify-between px-2 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  REAL ESTATE PRIME &bull; BRAND DECK
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Inner Mockup Canvas */}
              <div className="rounded-2xl overflow-hidden bg-[#0F141E] text-white p-4 sm:p-5 border border-slate-800 min-h-[640px] sm:min-h-[700px] flex flex-col justify-between relative">
                {/* Top Bar with Asset Profile */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                  <RealEstatePrimeLogo variant="dark" size="sm" />

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold bg-white/5 border border-white/10 px-2 py-0.5 rounded-md hidden sm:inline">
                      ASSET {activeItem.number} / 13
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2D5FC7]/20 text-[#2D5FC7] text-[10px] font-mono font-bold border border-[#2D5FC7]/30">
                      PRINT READY
                    </span>
                  </div>
                </div>

                {/* Center Visual Mockup Display (Expanded 2x Window) */}
                <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#182030] via-[#0E1522] to-[#080C14] border border-slate-800/90 p-6 sm:p-10 flex flex-col items-center justify-center overflow-hidden my-auto min-h-[580px] sm:min-h-[640px]">
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 w-full flex flex-col items-center text-center"
                    >
                      {/* 01. LOGO */}
                      {activeItem.visualType === "logo" && (
                        <div className="w-full max-w-[460px] sm:max-w-[500px] rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200/90 text-left">
                          <div className="w-full h-24 sm:h-32 rounded-xl bg-slate-50 flex items-center justify-center p-3 mb-4 border border-slate-100">
                            <RealEstatePrimeLogo variant="light" size="xl" />
                          </div>
                          <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs font-mono text-slate-600">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-900">MONOGRAM:</span>
                              <span className="text-[#2D5FC7] font-semibold">Italic Serif R/</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-900">WORDMARK:</span>
                              <span className="text-slate-800 font-semibold">REAL ESTATE PRIME</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-900">DESCRIPTOR:</span>
                              <span className="text-slate-500 font-semibold">ESTATES &amp; CAPITAL</span>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded-full bg-[#0A0A0A] border border-black/10 shadow-xs" title="Carbon" />
                              <span className="w-4 h-4 rounded-full bg-[#2D5FC7] border border-black/10 shadow-xs" title="Cobalt" />
                              <span className="w-4 h-4 rounded-full bg-[#D97706] border border-black/10 shadow-xs" title="Gold" />
                              <span className="w-4 h-4 rounded-full bg-[#F5EFE5] border border-black/20 shadow-xs" title="Cream" />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400 font-semibold">
                              VECTOR AI &bull; SVG &bull; EPS &bull; 8K
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 02. BUSINESS CARDS */}
                      {activeItem.visualType === "business-card" && (
                        <div className="w-full max-w-[440px] sm:max-w-[480px] aspect-[1.75/1] rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <RealEstatePrimeLogo variant="light" size="md" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              600 GSM COTTON
                            </span>
                          </div>
                          <div className="my-2">
                            <div className="text-base sm:text-lg font-extrabold text-[#0A0A0A] tracking-tight">
                              Marcus Sterling, MRICS
                            </div>
                            <div className="text-xs text-[#2D5FC7] font-mono font-bold mt-1">
                              Managing Principal &bull; Luxury &amp; Capital Markets
                            </div>
                          </div>
                          <div className="text-[10px] sm:text-xs font-mono text-slate-600 flex justify-between border-t border-slate-100 pt-3">
                            <span>+1 (800) 492-REALTY</span>
                            <span>m.sterling@realestateprime.com</span>
                          </div>
                        </div>
                      )}

                      {/* 03. LETTERHEAD */}
                      {activeItem.visualType === "letterhead" && (
                        <div className="w-full max-w-[280px] aspect-[1/1.32] bg-white text-slate-900 rounded-2xl p-5 shadow-2xl text-left flex flex-col justify-between text-[8px] border border-slate-200/90 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none font-serif text-8xl italic">
                            R/
                          </div>
                          <div className="border-b border-slate-200 pb-2 flex justify-between items-center relative z-10">
                            <RealEstatePrimeLogo variant="light" size="sm" />
                            <span className="text-[7px] font-mono text-slate-500 uppercase">
                              Official Deal Memo
                            </span>
                          </div>
                          <div className="space-y-1.5 my-2 relative z-10">
                            <div className="text-[8px] font-bold text-slate-800">
                              HEADS OF TERMS &bull; EXCLUSIVE ACQUISITION OFFER
                            </div>
                            <div className="h-1 bg-slate-200 rounded w-2/3" />
                            <div className="h-1 bg-slate-100 rounded w-full" />
                            <div className="h-1 bg-slate-100 rounded w-5/6" />
                            <div className="h-1 bg-slate-100 rounded w-4/5" />
                          </div>
                          <div className="border-t border-slate-200 pt-1.5 text-[7px] text-slate-500 flex justify-between items-center relative z-10">
                            <span>Broker Lic: RE-88492-USA</span>
                            <span className="font-bold text-[#2D5FC7]">★ SEALED MASTER DOCUMENT</span>
                          </div>
                        </div>
                      )}

                      {/* 04. PITCH FOLDER */}
                      {activeItem.visualType === "pitch-folder" && (
                        <div className="w-full max-w-[300px] aspect-[1.3/1] bg-[#0A0A0A] text-white rounded-2xl p-5 shadow-2xl text-left flex flex-col justify-between text-[8px] border border-amber-500/40 relative">
                          <div className="flex justify-between items-center">
                            <RealEstatePrimeLogo variant="gold" size="sm" />
                            <span className="text-[7px] font-mono text-amber-400 uppercase font-bold">
                              Gold Foil Stamped
                            </span>
                          </div>
                          <div className="my-2">
                            <div className="text-xs font-black tracking-tight text-white">
                              EXCLUSIVE INVESTMENT PROSPECTUS
                            </div>
                            <div className="text-[8px] text-slate-400 mt-1">
                              Waterfront Penthouses &amp; Sky Villa Collections
                            </div>
                          </div>
                          <div className="border-t border-white/20 pt-2 flex justify-between text-[7px] font-mono text-slate-300">
                            <span>Pocket Folder with Die-Cut Card Slot</span>
                            <span className="text-amber-400">350 GSM Silk</span>
                          </div>
                        </div>
                      )}

                      {/* 05. SHOWING PASS */}
                      {activeItem.visualType === "showing-pass" && (
                        <div className="w-full max-w-[300px] aspect-[1.8/1] rounded-2xl bg-white text-slate-900 p-4 sm:p-5 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <RealEstatePrimeLogo variant="light" size="sm" />
                            <span className="text-[8px] font-mono bg-blue-50 text-[#2D5FC7] px-2 py-0.5 rounded-full border border-blue-200 font-bold">
                              VIP SHOWING PASS
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[9px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 my-1">
                            <div>
                              <span className="text-slate-400 block text-[8px] font-mono">DATE &amp; TIME</span>
                              <span className="font-bold text-slate-900">Friday, Oct 16 &bull; 3 PM</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[8px] font-mono">RESIDENCE</span>
                              <span className="font-bold text-slate-900">Penthouse A (Gate #4)</span>
                            </div>
                          </div>
                          <div className="text-[8px] text-slate-500 flex justify-between font-mono border-t border-slate-100 pt-2">
                            <span>Marcus Sterling (Lead Broker)</span>
                            <span>Direct: +1 800-492-REALTY</span>
                          </div>
                        </div>
                      )}

                      {/* 06. INVESTOR NFC */}
                      {activeItem.visualType === "investor-nfc" && (
                        <div className="w-full max-w-[300px] aspect-[1.6/1] rounded-2xl bg-white text-slate-900 p-4 sm:p-5 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <RealEstatePrimeLogo variant="light" size="sm" />
                            <span className="text-[8px] font-mono text-[#059669] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              NFC SMART PASS
                            </span>
                          </div>
                          <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-400 flex items-center justify-center shadow-xs my-1">
                            <div className="w-6 h-4 border border-amber-800/40 rounded-xs" />
                          </div>
                          <div className="flex justify-between items-end border-t border-slate-100 pt-2">
                            <div>
                              <div className="text-[8px] font-mono text-slate-400">INVESTOR ID</div>
                              <div className="text-xs font-mono font-bold text-slate-900 tracking-widest">
                                REP-9942-VIP
                              </div>
                            </div>
                            <span className="text-[9px] text-[#2D5FC7] font-semibold flex items-center gap-1">
                              Tap to View Off-Market &rarr;
                            </span>
                          </div>
                        </div>
                      )}

                      {/* 07. SIGNAGE */}
                      {activeItem.visualType === "signage" && (
                        <div className="w-full max-w-[320px] py-7 px-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xl flex flex-col items-center text-center relative">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute top-3 left-3 shadow-inner" />
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute top-3 right-3 shadow-inner" />
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute bottom-3 left-3 shadow-inner" />
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute bottom-3 right-3 shadow-inner" />
                          <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">
                            ARCHITECTURAL DEVELOPMENT HOARDING
                          </span>
                          <div className="mt-3">
                            <RealEstatePrimeLogo variant="light" size="lg" />
                          </div>
                          <div className="mt-2 text-[9px] tracking-[0.25em] text-slate-600 font-mono uppercase">
                            LUXURY WATERFRONT SKY RESIDENCES
                          </div>
                        </div>
                      )}

                      {/* 08. RECEPTION BANNER */}
                      {activeItem.visualType === "reception-banner" && (
                        <div className="w-full max-w-[220px] aspect-[1/1.7] rounded-2xl bg-white p-4 text-slate-900 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left">
                          <RealEstatePrimeLogo variant="light" size="sm" />
                          <div className="my-auto py-2">
                            <span className="text-[8px] font-mono text-[#2D5FC7] uppercase font-bold">
                              Sales Gallery Standee
                            </span>
                            <div className="text-xs font-black text-slate-900 leading-tight mt-1">
                              EXPERIENCE THE PINNACLE OF MODERN LIVING
                            </div>
                            <div className="text-[8px] text-slate-600 mt-1">
                              Sky Mansions &bull; Private Infinity Pools &bull; 360° Vistas
                            </div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg text-[7px] text-slate-600 border border-slate-200 font-mono">
                            Scan counter QR for interactive 3D virtual tour.
                          </div>
                        </div>
                      )}

                      {/* 09. BROCHURE */}
                      {activeItem.visualType === "brochure" && (
                        <div className="w-full max-w-[320px] grid grid-cols-3 gap-1.5 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xl text-[7px] text-slate-700">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                            <RealEstatePrimeLogo variant="light" size="sm" />
                            <p className="mt-2 leading-snug">Architectural mastery &amp; skyline luxury.</p>
                            <span className="text-[6px] text-[#2D5FC7] font-mono font-bold">Cover Panel</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col justify-between">
                            <span className="font-bold text-slate-900">Amenities</span>
                            <p className="mt-1 leading-snug">Helipad, private marina &amp; wellness club.</p>
                            <span className="text-[6px] text-[#2D5FC7] font-mono font-bold">Inside Center</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                            <span className="font-bold text-slate-900">Floor Plans</span>
                            <p className="mt-1 leading-snug">4,800 to 9,200 sq ft layouts.</p>
                            <span className="text-[6px] text-[#2D5FC7] font-mono font-bold">Inside Flap</span>
                          </div>
                        </div>
                      )}

                      {/* 10. FLYERS */}
                      {activeItem.visualType === "flyers" && (
                        <div className="w-full max-w-[270px] aspect-[1/1.25] bg-white text-slate-900 rounded-2xl p-5 shadow-2xl text-left flex flex-col justify-between text-[8px] border border-slate-200/90">
                          <div>
                            <RealEstatePrimeLogo variant="light" size="sm" />
                            <div className="text-xs font-black mt-2 leading-tight text-slate-900">
                              PRIVATE OPEN HOUSE PREVIEW
                            </div>
                            <div className="text-[8px] text-slate-600 mt-1">
                              Exclusive invitation for accredited investors &amp; high-value buyers.
                            </div>
                          </div>
                          <div className="bg-slate-50 text-slate-900 p-2.5 rounded-xl font-bold text-[8px] flex justify-between items-center border border-slate-200">
                            <span>PASS: PRIME-PREVIEW</span>
                            <span className="text-[#2D5FC7] font-black">RESERVE &rarr;</span>
                          </div>
                        </div>
                      )}

                      {/* 11. PRICE LIST */}
                      {activeItem.visualType === "price-list" && (
                        <div className="w-full max-w-[290px] rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xl text-left text-[8px]">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-2">
                            <RealEstatePrimeLogo variant="light" size="sm" />
                            <span className="text-[7px] font-mono text-[#2D5FC7] bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">
                              UNIT TARIFF
                            </span>
                          </div>
                          <div className="space-y-1.5 text-slate-700">
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                              <span>3 BHK Sky Mansion (3,200 sq ft)</span>
                              <span className="font-bold text-slate-900">₹3.85 Cr / $1.8M</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                              <span>4 BHK Panoramic Duplex (4,900 sq ft)</span>
                              <span className="font-bold text-slate-900">₹6.20 Cr / $2.9M</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                              <span>Penthouse Collection (7,800 sq ft)</span>
                              <span className="font-bold text-slate-900">₹11.50 Cr / $5.4M</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 12. QR STAND */}
                      {activeItem.visualType === "qr-stand" && (
                        <div className="w-full max-w-[260px] py-6 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xl flex flex-col items-center text-center">
                          <RealEstatePrimeLogo variant="light" size="sm" />
                          <div className="w-24 h-24 my-3 bg-slate-900 rounded-xl p-2 flex items-center justify-center border border-slate-800">
                            <div className="w-20 h-20 bg-white rounded-lg p-1 flex items-center justify-center">
                              <span className="text-xl">📱</span>
                            </div>
                          </div>
                          <span className="text-[8px] font-mono font-bold text-[#2D5FC7] uppercase tracking-wider">
                            SCAN FOR 3D VIRTUAL TOUR
                          </span>
                          <span className="text-[7px] text-slate-400 mt-0.5">
                            Laser-Cut Acrylic &bull; Solid Oak Base
                          </span>
                        </div>
                      )}

                      {/* 13. STAFF ID */}
                      {activeItem.visualType === "staff-id" && (
                        <div className="w-full max-w-[240px] aspect-[1/1.5] rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-4 flex flex-col justify-between items-center text-center">
                          <div className="w-6 h-1.5 bg-slate-300 rounded-full mb-1" />
                          <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                            MS
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Marcus Sterling</div>
                            <div className="text-[8px] font-mono text-[#2D5FC7] font-semibold">
                              Licensed Real Estate Broker
                            </div>
                            <div className="text-[7px] text-slate-400 mt-0.5">RERA #RE-44920</div>
                          </div>
                          <div className="w-full pt-2 border-t border-slate-100 flex justify-between text-[7px] font-mono text-slate-500">
                            <span>RFID Access</span>
                            <span className="text-emerald-600 font-bold">Active</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 13 Interactive Service List with Scrolling Mechanism */}
          <div className="lg:col-span-6 flex flex-col items-start w-full">
            {/* Category Filter Tabs & Scroll Controls */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 p-1.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-black/[0.08] shadow-2xs">
              <div className="flex flex-wrap items-center gap-1">
                {(
                  [
                    { id: "all", label: `All (${BRAND_SERVICES.length})` },
                    { id: "identity", label: "Identity (4)" },
                    { id: "brokerage", label: "Brokerage & Signage (5)" },
                    { id: "buyer", label: "Buyer Collateral (4)" },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-[#0A0A0A] text-white shadow-xs"
                        : "text-slate-600 hover:text-black"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Interactive Scroll Controls */}
              <div className="flex items-center gap-1.5 pr-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold hidden sm:inline mr-1">
                  Scroll:
                </span>
                <button
                  type="button"
                  onClick={() => scrollByAmount(-160)}
                  aria-label="Scroll assets up"
                  title="Scroll Up"
                  className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-black/10 shadow-2xs flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  &uarr;
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount(160)}
                  aria-label="Scroll assets down"
                  title="Scroll Down"
                  className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-black/10 shadow-2xs flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  &darr;
                </button>
              </div>
            </div>

            {/* List of 13 Cards with smooth scrolling */}
            <div
              ref={listRef}
              data-lenis-prevent="true"
              style={{ overscrollBehavior: "contain", scrollBehavior: "smooth" }}
              className="mt-3.5 space-y-2.5 w-full max-h-[600px] sm:max-h-[660px] overflow-y-auto pr-2 brand-scrollbar"
            >
              {filteredItems.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#2D5FC7] shadow-md ring-1 ring-[#2D5FC7]"
                        : "bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                            isSelected
                              ? "bg-[#2D5FC7] text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.number}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-[#0F172A]">
                            {item.header}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {item.smallInfo}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll indicator, Asset count & Quick Jump */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7] animate-pulse" />
                <span>Showing {filteredItems.length} Brand Assets</span>
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollByAmount(160)}
                  className="text-[#2D5FC7] font-semibold hover:underline cursor-pointer"
                >
                  Scroll Down &darr;
                </button>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="text-slate-600 hover:text-black font-semibold hover:underline cursor-pointer"
                >
                  Top &uarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
