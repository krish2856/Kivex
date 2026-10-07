"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function ProjectArchitectureBanner() {
  const { openProjectModal } = useProjectModal();

  return (
    <div className="w-full mb-10 sm:mb-14 md:mb-16">
      {/* Outer Engineering Framework Container */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-[#0A0D14]/95 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_24px_80px_rgba(0,0,0,0.65)] overflow-hidden">
        {/* Subtle Ambient Glow Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#2D5FC7]/15 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#E8B62A]/10 blur-[120px] pointer-events-none" />

        {/* Engineering Grid Underlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top Control Bar & Telemetry Status */}
        <div className="relative z-10 flex flex-col gap-6 pb-8 border-b border-white/[0.08]">

          {/* Split Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
                Custom Solutions for <br className="hidden sm:inline" />
                <span className="text-[#FBBF24]">Every Business</span>
              </h2>
            </div>
          </div>

          {/* Bigger Custom Guideline Banner connecting to /custom */}
          <div className="pt-6">
            <Link
              href="/custom"
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 w-full rounded-2xl sm:rounded-3xl border border-white/20 hover:border-[#38BDF8]/70 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] hover:bg-white/[0.09] px-7 sm:px-9 py-5 sm:py-6 transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:scale-[1.01]"
              title="Open Custom Systems & Guidelines (/custom)"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-3 h-3 rounded-full bg-[#38BDF8] animate-pulse shadow-[0_0_12px_#38BDF8]" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight group-hover:text-[#38BDF8] transition-colors">
                  Custom Guidelines, Architecture Specs &amp; Info
                </h3>
              </div>

              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-[#38BDF8] text-slate-950 font-black text-xs sm:text-sm tracking-tight shadow-md group-hover:bg-white group-hover:scale-105 transition-all self-start sm:self-auto">
                <span>Explore Custom Platform</span>
                <span className="text-base sm:text-lg">&rarr;</span>
              </div>
            </Link>
          </div>
        </div>

        {/* 3 High-Impact Vertical Solution Cards (Full Clickable Links) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 items-stretch">
          
          {/* CARD 01: DENTAL SOLUTION (Blue Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-[#2563EB]/40 bg-gradient-to-b from-[#0A162B] via-[#07101E] to-[#040810] shadow-[0_0_35px_rgba(37,99,235,0.18)] hover:shadow-[0_0_45px_rgba(37,99,235,0.28)] hover:border-[#3B82F6] transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <Link href="/dental" className="block p-6 sm:p-7 h-full flex flex-col justify-between" title="Explore Dental Solutions (/dental)">
              {/* Top Light Sheen */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#2563EB]/20 transition-all duration-500" />

              <div>
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#93C5FD] transition-colors">
                  Dental Website
                </h3>

                {/* Visual Artwork & Circular Arrow Button */}
                <div className="relative mt-5 mb-2 h-40 flex items-center justify-between">
                  <div className="relative w-full h-full flex items-center justify-end overflow-hidden rounded-2xl">
                    <img
                      src="/custom/art-dental.png"
                      alt="Dental Solution 3D"
                      className="h-full object-contain object-right group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div
                    className="absolute right-2 bottom-1 w-11 h-11 rounded-full bg-[#2563EB] group-hover:bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110 active:scale-95 z-10"
                  >
                    <span className="text-base font-bold">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CARD 02: REAL ESTATE SOLUTION (Amber / Gold Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-[#D97706]/40 bg-gradient-to-b from-[#1C160B] via-[#120E06] to-[#0A0803] shadow-[0_0_35px_rgba(217,119,6,0.15)] hover:shadow-[0_0_45px_rgba(217,119,6,0.25)] hover:border-[#F59E0B] transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <Link href="/realestate" className="block p-6 sm:p-7 h-full flex flex-col justify-between" title="Explore Real Estate Solutions (/realestate)">
              {/* Top Light Sheen */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D97706]/20 transition-all duration-500" />

              <div>
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#FDE68A] transition-colors">
                  Real Estate
                </h3>

                {/* Visual Artwork & Circular Arrow Button */}
                <div className="relative mt-5 mb-2 h-40 flex items-center justify-between">
                  <div className="relative w-full h-full flex items-center justify-end overflow-hidden rounded-2xl">
                    <img
                      src="/custom/art-realestate.png"
                      alt="Real Estate Solution"
                      className="h-full object-contain object-right group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div
                    className="absolute right-2 bottom-1 w-11 h-11 rounded-full bg-[#D97706] group-hover:bg-[#B45309] text-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110 active:scale-95 z-10"
                  >
                    <span className="text-base font-bold">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CARD 03: CRM / SAAS SOLUTION (Purple Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl border border-[#9333EA]/40 bg-gradient-to-b from-[#180E24] via-[#100819] to-[#09040E] shadow-[0_0_35px_rgba(147,51,234,0.18)] hover:shadow-[0_0_45px_rgba(147,51,234,0.28)] hover:border-[#A855F7] transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <Link href="/saas" className="block p-6 sm:p-7 h-full flex flex-col justify-between" title="Explore SaaS & CRM Solutions (/saas)">
              {/* Top Light Sheen */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#9333EA]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#9333EA]/20 transition-all duration-500" />

              <div>
                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#E9D5FF] transition-colors">
                  CRM / SaaS
                </h3>

                {/* Visual Artwork & Circular Arrow Button */}
                <div className="relative mt-5 mb-2 h-40 flex items-center justify-between">
                  <div className="relative w-full h-full flex items-center justify-end overflow-hidden rounded-2xl">
                    <img
                      src="/custom/art-crm.png"
                      alt="CRM SaaS Dashboard"
                      className="h-full object-contain object-right group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div
                    className="absolute right-2 bottom-1 w-11 h-11 rounded-full bg-[#9333EA] group-hover:bg-[#7E22CE] text-white flex items-center justify-center shadow-lg transition-all group-hover:scale-110 active:scale-95 z-10"
                  >
                    <span className="text-base font-bold">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
