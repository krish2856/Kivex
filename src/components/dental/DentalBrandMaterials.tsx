"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface BrandServiceItem {
  id: string;
  number: string;
  header: string;
  category: "identity" | "clinic" | "patient";
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
    | "rx-pad"
    | "appointment-card"
    | "patient-card"
    | "signage"
    | "reception-banner"
    | "brochure"
    | "flyers"
    | "price-list"
    | "qr-stand"
    | "staff-id";
}

/**
 * Reusable Dental Prime Logo Component matching the exact user-provided brand identity:
 * - Monogram: Italic serif "D" + "/"
 * - Wordmark: "DENTAL PRIME" in bold uppercase sans-serif
 * - Subline: "STUDIO & CLINIC" in tracked uppercase medium sans-serif
 */
export function DentalPrimeLogo({
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
      {/* The D/ Monogram Mark */}
      <div className={`flex items-baseline font-serif ${symbolSize} ${textColor} font-normal leading-none`}>
        <span className="italic font-normal">D</span>
        <span className="font-light italic ml-0.5 opacity-80">/</span>
      </div>

      {/* The Wordmark + Subtitle */}
      <div className="flex flex-col text-left justify-center leading-none">
        <span className={`font-sans font-bold uppercase ${mainTextSize} ${textColor}`}>
          DENTAL PRIME
        </span>
        <span className={`font-sans font-medium uppercase mt-0.5 ${subTextSize} ${subColor}`}>
          STUDIO &amp; CLINIC
        </span>
      </div>
    </div>
  );
}

const BRAND_SERVICES: BrandServiceItem[] = [
  {
    id: "dental-clinic-logo",
    number: "01",
    header: "Dental clinic logo",
    category: "identity",
    categoryLabel: "Identity",
    smallInfo:
      "Bespoke geometric emblem, precision vector typography & complete clinical master identity system.",
    materialSpec: "Vector AI, SVG, EPS & High-Res PNG master kit",
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
      "600 GSM heavy-weight cotton cardstock with embossed gold-foil logo & soft-touch velvet lamination.",
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
    header: "Letterhead",
    category: "identity",
    categoryLabel: "Identity",
    smallInfo:
      "Formal clinic stationery for specialist referrals, official hospital correspondence & clinical reports.",
    materialSpec: "120 GSM Royal Executive Bond Paper",
    finishSpec: "Security Watermark + Metallic Foil Crest",
    turnaroundSpec: "Next-Day Dispatch",
    dimensionsSpec: "A4 (210 x 297 mm)",
    mockupAccent: "#0D9488",
    visualType: "letterhead",
  },
  {
    id: "prescription-pad-design",
    number: "04",
    header: "Prescription pad design",
    category: "identity",
    categoryLabel: "Identity",
    smallInfo:
      "Anti-counterfeit tamper-evident Rx sheets with clear dosage charts, doctor reg. ID & safety watermark.",
    materialSpec: "90 GSM Medical-Grade Bond Paper",
    finishSpec: "Padded Spine & Micro-Perforated Sheets",
    turnaroundSpec: "3 Business Days",
    dimensionsSpec: "5.5\" x 8.5\" (Half Letter)",
    mockupAccent: "#2D5FC7",
    visualType: "rx-pad",
  },
  {
    id: "appointment-card",
    number: "05",
    header: "Appointment card",
    category: "patient",
    categoryLabel: "Patient",
    smallInfo:
      "Compact pocket recall cards with next-visit date, time slots, and emergency clinic contact details.",
    materialSpec: "400 GSM Uncoated Write-Friendly Cardstock",
    finishSpec: "Dual-Sided Matt with Stamp Grid",
    turnaroundSpec: "48h Print Ready",
    dimensionsSpec: "3.5\" x 2.0\" Pocket Friendly",
    mockupAccent: "#7C3AED",
    visualType: "appointment-card",
  },
  {
    id: "patient-card",
    number: "06",
    header: "Patient card",
    category: "patient",
    categoryLabel: "Patient",
    smallInfo:
      "Durable PVC/NFC smart dental member cards for priority check-in, treatment history & digital records.",
    materialSpec: "Premium Rigid PVC with Embedded NFC Chip",
    finishSpec: "Matte Frosting + Hot Stamped Gold ID",
    turnaroundSpec: "5 Business Days",
    dimensionsSpec: "CR80 (85.6 x 54 mm) Credit Card Size",
    mockupAccent: "#059669",
    visualType: "patient-card",
  },
  {
    id: "clinic-signage",
    number: "07",
    header: "Clinic signage",
    category: "clinic",
    categoryLabel: "Signage",
    smallInfo:
      "Architectural exterior 3D acrylic backlit lettering, stainless steel clinic plaques & directional door signs.",
    materialSpec: "Weatherproof Cast Acrylic & Brushed Marine Steel",
    finishSpec: "IP67 Warm LED Halo Illumination",
    turnaroundSpec: "7-10 Days Fabrication",
    dimensionsSpec: "Custom Architectural Sizing",
    mockupAccent: "#F59E0B",
    visualType: "signage",
  },
  {
    id: "reception-banner",
    number: "08",
    header: "Reception banner",
    category: "clinic",
    categoryLabel: "Signage",
    smallInfo:
      "Freestanding luxury roll-up displays for waiting lounges, highlighting clear aligners & smile makeovers.",
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
    header: "Brochure",
    category: "patient",
    categoryLabel: "Patient",
    smallInfo:
      "Full-color tri-fold educational guides explaining dental implants, Invisalign, veneers & post-op recovery.",
    materialSpec: "250 GSM Silk Coated Art Paper",
    finishSpec: "Spot UV Gloss on Treatment Photography",
    turnaroundSpec: "3 Business Days",
    dimensionsSpec: "A4 Tri-Fold (6 Pages)",
    mockupAccent: "#06B6D4",
    visualType: "brochure",
  },
  {
    id: "flyers",
    number: "10",
    header: "Flyers",
    category: "patient",
    categoryLabel: "Marketing",
    smallInfo:
      "Direct-mail promotional leaflets for local neighborhood outreach, corporate checkup offers & family packages.",
    materialSpec: "170 GSM Gloss Artpaper",
    finishSpec: "Double-Sided Full Color Process",
    turnaroundSpec: "24-48h Fast Batch",
    dimensionsSpec: "A5 (148 x 210 mm)",
    mockupAccent: "#EA580C",
    visualType: "flyers",
  },
  {
    id: "service-price-list",
    number: "11",
    header: "Service price list",
    category: "clinic",
    categoryLabel: "Clinic",
    smallInfo:
      "Transparent operatory menus with clear tiered procedure costs, financing plans & insurance FAQs.",
    materialSpec: "350 GSM Heavy Board with Acrylic Stand",
    finishSpec: "Matte Anti-Glare Lamination",
    turnaroundSpec: "2 Business Days",
    dimensionsSpec: "A4 Vertical Display",
    mockupAccent: "#6366F1",
    visualType: "price-list",
  },
  {
    id: "qr-code-stand",
    number: "12",
    header: "QR code stand",
    category: "clinic",
    categoryLabel: "Clinic",
    smallInfo:
      "Laser-engraved acrylic counter stands linking to Google Reviews, WhatsApp booking & digital payment.",
    materialSpec: "Laser-cut 5mm Clear Cast Acrylic & Solid Oak Wood Base",
    finishSpec: "High-Contrast Scratch-Resistant UV Printing",
    turnaroundSpec: "3-5 Business Days",
    dimensionsSpec: "6\" x 8\" Tabletop Footprint",
    mockupAccent: "#10B981",
    visualType: "qr-stand",
  },
  {
    id: "staff-id-cards",
    number: "13",
    header: "Staff ID cards",
    category: "clinic",
    categoryLabel: "Clinic",
    smallInfo:
      "Professional magnetic lanyard badges with doctor photo, specialty designation, and RFID door access.",
    materialSpec: "Rigid CR80 Composite PVC Card",
    finishSpec: "RFID Chip Integration & Matte Overlay",
    turnaroundSpec: "48h Replacement Service",
    dimensionsSpec: "85.6 x 54 mm Standard ISO",
    mockupAccent: "#4F46E5",
    visualType: "staff-id",
  },
];

interface DentalBrandMaterialsProps {
  onBack?: () => void;
}

export default function DentalBrandMaterials({ onBack }: DentalBrandMaterialsProps) {
  const [activeItem, setActiveItem] = useState<BrandServiceItem>(BRAND_SERVICES[0]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "identity" | "clinic" | "patient">("all");
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
              title="Return to Clinical Operations Flow"
            >
              <span>&larr;</span>
              <span className="hidden sm:inline">Back to Clinical Operations</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        )}

        {/* Massive Monumental Headline with Eyebrow and Description */}
        <div className="text-center max-w-4xl mx-auto my-6 sm:my-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[11px] font-mono tracking-widest text-[#2D5FC7] uppercase font-bold px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 mb-3">
              PHYSICAL CLINIC BRANDING SUITE
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
            Every physical and visual touchpoint reflects your clinical excellence. From posters, brochures, business cards, and clinic cards to tactile appointment cards, prescription slips, in-clinic QR booking stands, and exterior signage—we build a cohesive brand identity for your practice.
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
                Kivex Physical Brand Kit
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
          {/* Left Column: Visual Showcase Mockup Console (Every card inside is WHITE with D/ DENTAL PRIME) */}
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
                  DENTAL PRIME &bull; BRAND DECK
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Inner Mockup Canvas */}
              <div className="rounded-2xl overflow-hidden bg-[#0F141E] text-white p-4 sm:p-5 border border-slate-800 min-h-[640px] sm:min-h-[700px] flex flex-col justify-between relative">
                {/* Top Bar with Asset Profile */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                  <DentalPrimeLogo variant="dark" size="sm" />

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
                  {/* Subtle Grid Watermark Background */}
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
                      {/* ================= 01. LOGO (WHITE CARD) ================= */}
                      {activeItem.visualType === "logo" && (
                        <div className="w-full max-w-[460px] sm:max-w-[500px] rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200/90 text-left">
                          {/* Master Image */}
                          <div className="relative w-full h-24 sm:h-32 rounded-xl overflow-hidden bg-white flex items-center justify-center p-2 mb-4">
                            <Image
                              src="/dental/dental-prime-logo.png"
                              alt="Dental Prime Studio & Clinic Logo"
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>

                          <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs font-mono text-slate-600">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-900">MONOGRAM:</span>
                              <span className="text-[#2D5FC7] font-semibold">Italic Serif D/</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-900">WORDMARK:</span>
                              <span className="text-slate-800 font-semibold">DENTAL PRIME</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-900">DESCRIPTOR:</span>
                              <span className="text-slate-500 font-semibold">STUDIO &amp; CLINIC</span>
                            </div>
                          </div>

                          {/* Color Swatches */}
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

                      {/* ================= 02. BUSINESS CARDS (WHITE CARD) ================= */}
                      {activeItem.visualType === "business-card" && (
                        <div className="w-full max-w-[440px] sm:max-w-[480px] aspect-[1.75/1] rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <DentalPrimeLogo variant="light" size="md" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              600 GSM COTTON
                            </span>
                          </div>

                          <div className="my-2">
                            <div className="text-base sm:text-lg font-extrabold text-[#0A0A0A] tracking-tight">
                              Dr. Julian Hayes, DDS
                            </div>
                            <div className="text-xs text-[#2D5FC7] font-mono font-bold mt-1">
                              Clinical Director &bull; Implantology &amp; Aesthetics
                            </div>
                          </div>

                          <div className="text-[10px] sm:text-xs font-mono text-slate-600 flex justify-between border-t border-slate-100 pt-3">
                            <span>+1 (800) 492-PRIME</span>
                            <span>appointments@dentalprime.clinic</span>
                          </div>
                        </div>
                      )}

                      {/* ================= 03. LETTERHEAD (WHITE CARD) ================= */}
                      {activeItem.visualType === "letterhead" && (
                        <div className="w-full max-w-[280px] aspect-[1/1.32] bg-white text-slate-900 rounded-2xl p-5 shadow-2xl text-left flex flex-col justify-between text-[8px] border border-slate-200/90 relative overflow-hidden">
                          {/* Translucent D/ watermark */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none font-serif text-8xl italic">
                            D/
                          </div>

                          <div className="border-b border-slate-200 pb-2 flex justify-between items-center relative z-10">
                            <DentalPrimeLogo variant="light" size="sm" />
                            <span className="text-[7px] font-mono text-slate-500 uppercase">
                              Clinical File
                            </span>
                          </div>

                          <div className="space-y-1.5 my-2 relative z-10">
                            <div className="text-[8px] font-bold text-slate-800">
                              PATIENT CLINICAL REFERRAL &bull; SPECIALTY REPORT
                            </div>
                            <div className="h-1 bg-slate-200 rounded w-2/3" />
                            <div className="h-1 bg-slate-100 rounded w-full" />
                            <div className="h-1 bg-slate-100 rounded w-5/6" />
                            <div className="h-1 bg-slate-100 rounded w-4/5" />
                          </div>

                          <div className="border-t border-slate-200 pt-1.5 text-[7px] text-slate-500 flex justify-between items-center relative z-10">
                            <span>Reg. Lic: DP-99420-USA</span>
                            <span className="font-bold text-[#2D5FC7]">★ SEALED MASTER DOCUMENT</span>
                          </div>
                        </div>
                      )}

                      {/* ================= 04. RX PAD (WHITE CARD) ================= */}
                      {activeItem.visualType === "rx-pad" && (
                        <div className="w-full max-w-[280px] aspect-[1/1.3] bg-white text-slate-900 rounded-2xl p-5 shadow-2xl text-left flex flex-col justify-between text-[8px] border-2 border-slate-300 relative">
                          <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
                            <DentalPrimeLogo variant="light" size="sm" />
                            <span className="text-[#2D5FC7] font-serif font-black text-base">
                              Rx
                            </span>
                          </div>

                          <div className="space-y-1.5 text-[8px] text-slate-700 my-1">
                            <div className="text-[7px] font-mono text-[#2D5FC7] font-bold">
                              Dr. Julian Hayes, DDS &bull; DEA #DP-8849201
                            </div>
                            <div className="border-b border-slate-200 pb-1 text-slate-800 font-medium">
                              Patient: Johnathan Doe &bull; Date: Oct 2026
                            </div>
                            <div className="h-1 bg-slate-200 rounded w-3/4" />
                            <div className="h-1 bg-slate-200 rounded w-5/6" />
                          </div>

                          <div className="border-t border-slate-200 pt-1.5 flex justify-between items-end">
                            <div className="text-[7px] text-slate-500 font-mono">
                              Anti-Tamper Microline Security
                            </div>
                            <div className="border-t border-slate-800 w-20 text-center text-[7px] font-bold">
                              Doctor Signature
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ================= 05. APPOINTMENT CARD (WHITE CARD) ================= */}
                      {activeItem.visualType === "appointment-card" && (
                        <div className="w-full max-w-[300px] aspect-[1.8/1] rounded-2xl bg-white text-slate-900 p-4 sm:p-5 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <DentalPrimeLogo variant="light" size="sm" />
                            <span className="text-[8px] font-mono bg-blue-50 text-[#2D5FC7] px-2 py-0.5 rounded-full border border-blue-200 font-bold">
                              RECALL PASS
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[9px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 my-1">
                            <div>
                              <span className="text-slate-400 block text-[8px] font-mono">APPOINTMENT</span>
                              <span className="font-bold text-slate-900">Thursday, Nov 12</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[8px] font-mono">TIME &bull; CHAIR</span>
                              <span className="font-bold text-slate-900">10:30 AM (Suite 2)</span>
                            </div>
                          </div>

                          <div className="text-[8px] text-slate-500 flex justify-between font-mono border-t border-slate-100 pt-2">
                            <span>Dr. Julian Hayes</span>
                            <span>Direct: +1 800-492-PRIME</span>
                          </div>
                        </div>
                      )}

                      {/* ================= 06. PATIENT CARD (WHITE CARD) ================= */}
                      {activeItem.visualType === "patient-card" && (
                        <div className="w-full max-w-[300px] aspect-[1.6/1] rounded-2xl bg-white text-slate-900 p-4 sm:p-5 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <DentalPrimeLogo variant="light" size="sm" />
                            <span className="text-[8px] font-mono text-[#059669] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              NFC SMART PASS
                            </span>
                          </div>

                          {/* Gold Contact Chip */}
                          <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-400 flex items-center justify-center shadow-xs my-1">
                            <div className="w-6 h-4 border border-amber-800/40 rounded-xs" />
                          </div>

                          <div className="flex justify-between items-end border-t border-slate-100 pt-2">
                            <div>
                              <div className="text-[8px] font-mono text-slate-400">PATIENT ID</div>
                              <div className="text-xs font-mono font-bold text-slate-900 tracking-widest">
                                DP-9942-PRIME
                              </div>
                            </div>
                            <span className="text-[9px] text-[#2D5FC7] font-semibold flex items-center gap-1">
                              Tap to Check-in &rarr;
                            </span>
                          </div>
                        </div>
                      )}

                      {/* ================= 07. CLINIC SIGNAGE (WHITE CARD) ================= */}
                      {activeItem.visualType === "signage" && (
                        <div className="w-full max-w-[320px] py-7 px-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xl flex flex-col items-center text-center relative">
                          {/* 4 Standoff Pins */}
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute top-3 left-3 shadow-inner" />
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute top-3 right-3 shadow-inner" />
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute bottom-3 left-3 shadow-inner" />
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400 absolute bottom-3 right-3 shadow-inner" />

                          <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">
                            ARCHITECTURAL CLINIC SIGNAGE PLAQUE
                          </span>
                          <div className="mt-3">
                            <DentalPrimeLogo variant="light" size="lg" />
                          </div>
                          <div className="mt-2 text-[9px] tracking-[0.25em] text-slate-600 font-mono uppercase">
                            FACIAL AESTHETICS &bull; IMPLANTOLOGY SUITES
                          </div>
                        </div>
                      )}

                      {/* ================= 08. RECEPTION BANNER (WHITE CARD) ================= */}
                      {activeItem.visualType === "reception-banner" && (
                        <div className="w-full max-w-[220px] aspect-[1/1.7] rounded-2xl bg-white p-4 text-slate-900 border border-slate-200/90 shadow-2xl flex flex-col justify-between text-left">
                          <DentalPrimeLogo variant="light" size="sm" />
                          <div className="my-auto py-2">
                            <span className="text-[8px] font-mono text-[#2D5FC7] uppercase font-bold">
                              Waiting Lounge Display
                            </span>
                            <div className="text-xs font-black text-slate-900 leading-tight mt-1">
                              TRANSFORM YOUR SMILE WITH CONFIDENCE
                            </div>
                            <div className="text-[8px] text-slate-600 mt-1">
                              Digital Aligners &bull; Porcelain Veneers &bull; Same-Day Implants
                            </div>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg text-[7px] text-slate-600 border border-slate-200 font-mono">
                            Ask reception for your complimentary 3D intraoral smile scan.
                          </div>
                        </div>
                      )}

                      {/* ================= 09. BROCHURE (WHITE CARD) ================= */}
                      {activeItem.visualType === "brochure" && (
                        <div className="w-full max-w-[320px] grid grid-cols-3 gap-1.5 p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xl text-[7px] text-slate-700">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                            <DentalPrimeLogo variant="light" size="sm" />
                            <p className="mt-2 leading-snug">Precision modern oral health systems.</p>
                            <span className="text-[6px] text-[#2D5FC7] font-mono font-bold">Cover Panel</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col justify-between">
                            <span className="font-bold text-slate-900">Treatments</span>
                            <p className="mt-1 leading-snug">Full arch rehabilitation &amp; cosmetic veneers.</p>
                            <span className="text-[6px] text-[#2D5FC7] font-mono font-bold">Inside Center</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                            <span className="font-bold text-slate-900">Care Guide</span>
                            <p className="mt-1 leading-snug">Post-op instructions &amp; warranty coverage.</p>
                            <span className="text-[6px] text-[#2D5FC7] font-mono font-bold">Inside Flap</span>
                          </div>
                        </div>
                      )}

                      {/* ================= 10. FLYERS (WHITE CARD) ================= */}
                      {activeItem.visualType === "flyers" && (
                        <div className="w-full max-w-[270px] aspect-[1/1.25] bg-white text-slate-900 rounded-2xl p-5 shadow-2xl text-left flex flex-col justify-between text-[8px] border border-slate-200/90">
                          <div>
                            <DentalPrimeLogo variant="light" size="sm" />
                            <div className="text-xs font-black mt-2 leading-tight text-slate-900">
                              NEW PATIENT COMPREHENSIVE VISIT
                            </div>
                            <div className="text-[8px] text-slate-600 mt-1">
                              Full digital panoramic 3D scans + clinical consultation.
                            </div>
                          </div>
                          <div className="bg-slate-50 text-slate-900 p-2.5 rounded-xl font-bold text-[8px] flex justify-between items-center border border-slate-200">
                            <span>VOUCHER: PRIME-VIP</span>
                            <span className="text-[#2D5FC7] font-black">CLAIM &rarr;</span>
                          </div>
                        </div>
                      )}

                      {/* ================= 11. PRICE LIST (WHITE CARD) ================= */}
                      {activeItem.visualType === "price-list" && (
                        <div className="w-full max-w-[290px] rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xl text-left text-[8px]">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-2">
                            <DentalPrimeLogo variant="light" size="sm" />
                            <span className="text-[7px] font-mono text-[#2D5FC7] bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">
                              TRANSPARENT TARIFF
                            </span>
                          </div>
                          <div className="space-y-1.5 text-slate-700">
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                              <span>Comprehensive Oral Diagnostics</span>
                              <span className="font-bold text-slate-900">₹1,500 / $120</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                              <span>In-Office Laser Whitening</span>
                              <span className="font-bold text-slate-900">₹12,000 / $450</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-1">
                              <span>Clear Aligner Consultation</span>
                              <span className="font-bold text-[#059669]">Complimentary</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Titanium Dental Implant</span>
                              <span className="font-bold text-slate-900">from ₹35,000</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ================= 12. QR STAND (WHITE CARD) ================= */}
                      {activeItem.visualType === "qr-stand" && (
                        <div className="w-full max-w-[260px] aspect-[1/1.18] rounded-2xl bg-white border-2 border-slate-200/90 p-4 shadow-2xl flex flex-col items-center justify-between text-center">
                          <DentalPrimeLogo variant="light" size="sm" />
                          <div className="w-20 h-20 bg-slate-50 p-2 rounded-xl flex items-center justify-center border border-slate-200 shadow-inner my-1">
                            <svg className="w-16 h-16 text-black" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 2h2v3h-2v-3zm3 3h3v3h-3v-3zm-5 1h2v2h-2v-2zm3-3h2v1h-2v-1z" />
                            </svg>
                          </div>
                          <div className="text-[9px] font-bold text-slate-900">
                            Tap or Scan for 5-Star Reviews &bull; WhatsApp Booking
                          </div>
                        </div>
                      )}

                      {/* ================= 13. STAFF ID (WHITE CARD) ================= */}
                      {activeItem.visualType === "staff-id" && (
                        <div className="w-full max-w-[230px] aspect-[1/1.4] rounded-2xl bg-white border-2 border-slate-200/90 p-4 shadow-2xl flex flex-col items-center justify-between text-center relative overflow-hidden">
                          <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto" />
                          <DentalPrimeLogo variant="light" size="sm" />
                          <div className="w-13 h-13 rounded-full bg-slate-100 border-2 border-[#2D5FC7] flex items-center justify-center text-xs font-bold text-[#2D5FC7] my-1 shadow-sm">
                            JH
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Dr. Julian Hayes, DDS</div>
                            <div className="text-[8px] text-[#2D5FC7] font-mono font-bold">Lead Clinical Surgeon</div>
                          </div>
                          <div className="w-full bg-slate-50 py-1 rounded-md text-[7px] font-mono text-slate-500 border border-slate-200">
                            RFID #DP-SURGEON-01 &bull; LEVEL 1 ACCESS
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Filter Tabs & 13 Brand Service Cards (Strictly Side-by-Side with Left Screen) */}
          <div className="lg:col-span-6 flex flex-col items-start w-full">
            {/* Quick Filter Tabs for 13 items */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 p-1.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-black/[0.08] shadow-2xs">
              <div className="flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                    selectedCategory === "all"
                      ? "bg-[#0A0A0A] text-white shadow-xs"
                      : "text-slate-600 hover:text-black"
                  }`}
                >
                  All (13)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("identity")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                    selectedCategory === "identity"
                      ? "bg-[#0A0A0A] text-white shadow-xs"
                      : "text-slate-600 hover:text-black"
                  }`}
                >
                  Identity (4)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("clinic")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                    selectedCategory === "clinic"
                      ? "bg-[#0A0A0A] text-white shadow-xs"
                      : "text-slate-600 hover:text-black"
                  }`}
                >
                  Clinic &amp; Signage (5)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCategory("patient")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all cursor-pointer ${
                    selectedCategory === "patient"
                      ? "bg-[#0A0A0A] text-white shadow-xs"
                      : "text-slate-600 hover:text-black"
                  }`}
                >
                  Patient (4)
                </button>
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

            {/* The 13 Brand Service Cards: NO POINTER NOTING, JUST HEADER AND SMALL INFORMATION.
                Equipped with data-lenis-prevent and custom visible scrollbar for effortless smooth scrolling */}
            <div
              ref={listRef}
              data-lenis-prevent="true"
              style={{ overscrollBehavior: "contain", scrollBehavior: "smooth" }}
              className="mt-3.5 space-y-2.5 w-full max-h-[600px] sm:max-h-[660px] overflow-y-auto pr-2 brand-scrollbar"
            >
              {filteredItems.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItem(item)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-white border-[#2D5FC7] shadow-md ring-1 ring-[#2D5FC7]/30 translate-x-1"
                        : "bg-white/70 hover:bg-white border-black/[0.06] shadow-2xs hover:border-black/15"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${
                            isSelected
                              ? "bg-[#2D5FC7] text-white"
                              : "bg-black/[0.05] text-slate-600"
                          }`}
                        >
                          {item.number}
                        </span>
                        <div className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                          {item.header}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold shrink-0">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal pl-8.5">
                      {item.smallInfo}
                    </p>
                  </button>
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

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openProjectModal()}
                className="px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#2D5FC7] hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
              >
                Order Physical Brand Kit Sample &rarr;
              </button>

              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-5 py-3 rounded-full border border-black/15 bg-white/80 text-slate-800 text-xs font-bold tracking-wider uppercase hover:bg-white hover:border-black transition-all cursor-pointer"
                >
                  &larr; Back to Clinical Operations
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
