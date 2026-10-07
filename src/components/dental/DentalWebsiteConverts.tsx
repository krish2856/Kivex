"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

interface DentalWebsiteConvertsProps {
  embedded?: boolean;
}

export default function DentalWebsiteConverts({ embedded = false }: DentalWebsiteConvertsProps) {
  const { openProjectModal } = useProjectModal();

  return (
    <section id="template-website" className={`bg-[#F5EFE5] text-[#0A0A0A] ${embedded ? "pt-6 pb-8 md:pb-12" : "py-14 md:py-16"}`}>
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
            Websites That Fill
            <br />
            Dental <span className="text-[#2D5FC7]">Chairs</span>
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
            {/* Dark Square Monogram Badge */}
            <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center font-bold text-sm text-white">
              D/
            </div>

            {/* Clinic / Practice metadata */}
            <div className="flex items-center gap-2 px-2">
              <span className="text-xs font-bold tracking-tight text-white">
                Dental Prime Studio &amp; Clinic
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Dr. Aditi Rao
              </span>
            </div>

            {/* Mint Green Action Pill Button */}
            <a
              href="https://dentalprimeweb3-ac8z.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#A7F3D0] hover:bg-[#86EFAC] text-[#064E3B] text-xs font-bold tracking-tight transition-all shadow-xs cursor-pointer"
            >
              Live Demo
            </a>
          </motion.div>
        </div>

        {/* The Split Showcase Grid (Specs + Real Mobile Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center pt-4">
          {/* Left Column: Clinical Specs & Copy */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            <span className="text-[11px] font-mono tracking-widest text-[#2D5FC7] uppercase font-bold">
              PILLAR 01 &bull; PREMIUM DENTAL WEBSITE
            </span>
            <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              High-Velocity Clinical Front Door
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-normal">
              A modern, premium, high-performance dental website designed specifically for your clinic. Engineered with professional UI/UX, responsive mobile design, online booking, treatment showcases, patient FAQs, and Google-friendly SEO structure.
            </p>

            {/* Logical Editorial Bullet List */}
            <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-700 w-full">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Responsive UI/UX &amp; 1.8s Speed: </span>
                  <span className="text-slate-600">Mobile, tablet &amp; desktop optimized with premium visual animations.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Treatments, Doctors &amp; FAQs: </span>
                  <span className="text-slate-600">Dedicated service pages, doctor profiles, patient FAQs, and location maps.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">SEO &amp; Online Booking: </span>
                  <span className="text-slate-600">Google-friendly structure and direct appointment intake routing straight to CRM.</span>
                </div>
              </div>
            </div>

            {/* Bottom Conversion Telemetry Bar - Aligns height with right column */}
            <div className="mt-5 grid grid-cols-3 gap-2.5 w-full text-center">
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/90 shadow-2xs">
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Load Velocity</div>
                <div className="text-xs sm:text-sm font-black text-[#2D5FC7] mt-0.5">1.8s LCP</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/90 shadow-2xs">
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Mobile Traffic</div>
                <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">78% Share</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-slate-200/90 shadow-2xs">
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Direct Intake</div>
                <div className="text-xs sm:text-sm font-black text-emerald-600 mt-0.5">Zero Drop</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openProjectModal()}
                className="px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#2D5FC7] hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
              >
                Explore Website Architecture &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Titanium Mobile Device Mockup with Real Screenshot */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-[285px] sm:max-w-[305px] group"
            >
              {/* Subtle ambient drop glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#2D5FC7]/20 via-amber-500/10 to-transparent rounded-[50px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Device Frame */}
              <div className="relative rounded-[42px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-[7px] border-slate-900 bg-black ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.015]">
                {/* Dynamic Island Header Mockup */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-20 flex items-center justify-end pr-1.5 pointer-events-none shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e293b] border border-white/10" />
                </div>

                {/* Patient-Centric Mobile Website Screenshot */}
                <Image
                  src="/dental/dental-website-mobile.png"
                  alt="Dental Prime Studio & Clinic Mobile Website by Kivex"
                  width={548}
                  height={1132}
                  priority
                  className="w-full h-auto object-cover block"
                />

                {/* Subtle Apple Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/25 rounded-full pointer-events-none" />
              </div>

              {/* External Floating Badge */}
              <div className="mt-3 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-black/[0.08] shadow-2xs text-[11px] font-mono text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold">Live Mobile Screen</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="text-slate-600">Responsive Architecture</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
