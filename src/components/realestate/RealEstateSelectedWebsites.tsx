"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

interface TemplateProject {
  id: string | number;
  title: string;
  categoryTag?: string;
  tagline?: string;
  badge?: string;
  description: string;
  technologies: string[];
  image_url: string;
  demo_url: string;
}

export default function RealEstateSelectedWebsites() {
  const { openProjectModal } = useProjectModal();
  const [dbTemplates, setDbTemplates] = useState<TemplateProject[]>([]);

  useEffect(() => {
    fetch("/api/templates?category=REAL_ESTATE")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.templates && data.templates.length > 0) {
          setDbTemplates(data.templates);
        }
      })
      .catch((err) => console.error("Error loading real estate templates:", err));
  }, []);

  return (
    <section id="selected-websites" className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Curated Showcase Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <div>


            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase">
              Real Estate <span className="text-[#2D5FC7]">Templates</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              We are actively developing our signature collection of high-velocity real estate website templates. Launching soon with built-in WhatsApp lead routing, 3D walkthrough embeds, and MLS integration.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>REQUEST EARLY ACCESS / CUSTOM BUILD</span>
              <span className="text-sm">&rarr;</span>
            </button>
          </div>
        </div>

        {dbTemplates.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dbTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="group flex flex-col rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={tpl.image_url}
                    alt={tpl.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {tpl.badge && (
                    <span className="absolute top-3 left-3 bg-[#0A0A0A]/85 backdrop-blur-md text-[#E8B62A] text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md">
                      {tpl.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2D5FC7] transition-colors">
                      {tpl.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={tpl.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5FC7] hover:text-[#1E3D8A] uppercase tracking-wider"
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => openProjectModal()}
                      className="px-3.5 py-1.5 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-[11px] font-semibold transition-colors"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Central Prominent Announcement Banner */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md text-center relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight uppercase">
                Real Estate Templates Coming Soon
              </h3>

              <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
                Our engineering team is finalizing pre-built, turn-key real estate themes designed to convert property searchers into booked private tours. Need a live website right now? We build completely bespoke platforms tailored to your brand.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className="px-6 py-3 rounded-full bg-[#2D5FC7] hover:bg-[#234ca1] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                >
                  Inquire About Custom Build &rarr;
                </button>
                <a
                  href="#our-live-projects"
                  className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase transition-all border border-slate-300"
                >
                  View Our Live Project (Aastha Realty) &darr;
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
