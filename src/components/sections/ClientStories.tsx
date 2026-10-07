"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClientStory {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
}

const clientStories: ClientStory[] = [
  {
    quote:
      "Kivex completely revamped our fleet dispatch and booking infrastructure. Automated milestone alerts and client dashboards cut our daily support calls by 60%. The delivery was on time, communication was seamless, and the software runs with zero downtime.",
    name: "Varun Joshi",
    role: "Co-Founder & Director",
    company: "Ganga Travels",
    initials: "VJ",
    rating: 5,
  },
  {
    quote:
      "Deploying our high-concurrency bus booking and fleet tracking engine with Kivex was effortless. Even under heavy holiday booking volume, the platform response time remains sub-second. Their engineering depth and proactive support are top-tier.",
    name: "Amit",
    role: "Co-Founders & Directors",
    company: "NeoBus",
    initials: "AP",
    rating: 5,
  },
  {
    quote:
      "Kivex engineered a custom CRM and property showcase platform that directly accelerated our site visit conversions. The automated WhatsApp lead follow-ups and broker management tools gave our sales team a massive competitive edge.",
    name: "Chirag Bhatt",
    role: "Founder",
    company: "Aastha Realty",
    initials: "CB",
    rating: 5,
  },
];

const clientBrands = [
  {
    name: "Ganga Travels",
    category: "Travel & Fleet Operations",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M4 16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V16Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 11H20" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" />
        <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" />
        <path d="M6 17V19M18 17V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "NeoBus Mobility",
    category: "Transit Tech & Fleet",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="4" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="14" r="1.5" fill="currentColor" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
        <path d="M6 17V20M18 17V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Aastha Realty",
    category: "Real Estate Development",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M3 21H21M4 21V10L12 4L20 10V21M9 21V14H15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="8" y="9" width="2" height="2" fill="currentColor" />
        <rect x="14" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "VR Enterprises",
    category: "Industrial Trade & Commercial",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 9L12 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ClientStories() {
  return (
    <section
      id="clients"
      className="relative px-5 sm:px-6 md:px-8 py-20 sm:py-24 md:py-28 overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-black/[0.06] shadow-[0_-25px_50px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Warm ambient spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 left-1/3 w-[700px] h-[700px] rounded-full blur-[140px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(232,182,42,0.3) 0%, rgba(45,95,199,0.12) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(232,182,42,0.25) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ======================================================== */}
        {/* Block 1: TRUSTED BY - Our Clients Logo Grid              */}
        {/* ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A]" />
            <span
              className="text-[11px] font-semibold tracking-widest uppercase font-mono"
              style={{ color: "#0A0A0A" }}
            >
              Trusted By
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]"
          >
            Our Clients
          </motion.h2>
        </div>

        {/* Client Brands Cards Row (4 Clients) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24">
          {clientBrands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-2xl bg-white/70 hover:bg-white border border-black/[0.06] hover:border-[#2D5FC7]/30 hover:shadow-lg p-5 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[110px]"
            >
              <div className="text-black/50 group-hover:text-[#2D5FC7] transition-colors mb-2">
                {brand.icon}
              </div>
              <span className="text-xs font-bold tracking-tight text-black/80 group-hover:text-black leading-snug line-clamp-2">
                {brand.name}
              </span>
              <span className="text-[10px] text-black/40 mt-1 line-clamp-1">
                {brand.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* Block 2: CLIENT STORIES - What Our Clients Say           */}
        {/* ======================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] mb-3.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7]" />
            <span
              className="text-[11px] font-semibold tracking-widest uppercase font-mono"
              style={{ color: "#2D5FC7" }}
            >
              Client Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3.5 text-sm sm:text-base text-black/60 max-w-xl mx-auto leading-relaxed"
          >
            Real feedback from founders and engineering leaders who rely on Kivex
            systems for mission-critical operations.
          </motion.p>
        </div>

        {/* 3 Testimonials Grid matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {clientStories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-400 border",
                "bg-white/80 hover:bg-white border-black/[0.06] hover:border-black/15 shadow-sm hover:shadow-xl hover:-translate-y-1"
              )}
            >
              {/* Radio dot accent top right */}
              <div className="absolute top-6 right-6 w-5 h-5 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#2D5FC7] transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#2D5FC7] transition-colors" />
              </div>

              <div>
                {/* Quotation Mark */}
                <div className="text-3xl sm:text-4xl font-serif text-black/25 leading-none mb-3">
                  &ldquo;
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: story.rating }).map((_, s) => (
                    <span key={s} className="text-[#E8B62A] text-sm">
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-black/75 font-normal">
                  {story.quote}
                </p>
              </div>

              {/* Author Row */}
              <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center gap-3.5">
                {/* Initials Circle */}
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] text-[#F5EFE5] flex items-center justify-center font-bold text-xs tracking-wider shrink-0 shadow-sm">
                  {story.initials}
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[#0A0A0A] tracking-tight truncate">
                    {story.name}
                  </h4>
                  <p className="text-xs text-black/55 truncate">
                    {story.role}, {story.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
