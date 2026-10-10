"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import Magnet from "@/components/reactbits/Magnet/Magnet";

interface SolutionCardItem {
  code: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  features: string[];
  variant: "blue" | "yellow" | "black";
  icon: React.ReactNode;
}

const SOLUTIONS: SolutionCardItem[] = [
  {
    code: "01",
    tag: "HEALTHCARE SYSTEMS",
    title: "Dental Website",
    description:
      "Patient-first clinical web platforms with instant appointment booking, treatment showcases, and automated patient reminders.",
    href: "/dental",
    features: ["Online Booking", "Treatment Pages", "Patient Recall"],
    variant: "blue",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c-3.2 0-6 2.2-6 5.8 0 2.4 1.1 4.4 1.6 6.8.4 1.9.9 5.4 2.3 5.4 1.1 0 1.4-2.8 2.1-2.8s1 2.8 2.1 2.8c1.4 0 1.9-3.5 2.3-5.4.5-2.4 1.6-4.4 1.6-6.8C18 5.2 15.2 3 12 3z" />
      </svg>
    ),
  },
  {
    code: "02",
    tag: "PROPERTY PLATFORMS",
    title: "Real Estate",
    description:
      "High-converting property portals engineered for fast listing discovery, interactive map search, and automated buyer routing.",
    href: "/realestate",
    features: ["Dynamic Listings", "Lead Routing", "Virtual Showcases"],
    variant: "yellow",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01M9 13v.01M9 17v.01" />
      </svg>
    ),
  },
  {
    code: "03",
    tag: "ENTERPRISE SOFTWARE",
    title: "CRM / SaaS",
    description:
      "Custom internal tools, multi-tenant SaaS products, and unified CRM pipelines tailored around your exact operational workflow.",
    href: "/saas",
    features: ["Pipeline Engine", "Role Permissions", "Live Analytics"],
    variant: "black",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
];

export default function ProjectArchitectureBanner() {
  return (
    <div className="w-full mb-12 sm:mb-16 md:mb-20">
      {/* Outer Container in Light Orange (#F5EFE5) */}
      <div
        className="relative rounded-3xl border border-black/[0.08] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden"
        style={{ backgroundColor: "#F5EFE5" }}
      >
        {/* Header & Top Custom Platform Bar */}
        <div className="relative z-10 flex flex-col gap-6 pb-8 border-b border-black/[0.08]">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A0A0A] leading-[1.08]">
              Custom Solutions for{" "}
              <span className="text-[#2D5FC7]">Every Business</span>
            </h2>
          </div>

          {/* Simple Clean Custom Platform Link Banner */}
          <div className="pt-2">
            <Link
              href="/custom"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full rounded-2xl border border-black/10 bg-white hover:border-[#2D5FC7]/40 px-6 sm:px-8 py-5 transition-all duration-300 shadow-sm hover:shadow-md"
              title="Open Custom Systems & Guidelines (/custom)"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D5FC7]" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A0A0A] tracking-tight group-hover:text-[#2D5FC7] transition-colors">
                  Custom Guidelines, Architecture Specs &amp; Info
                </h3>
              </div>

              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#2D5FC7] text-white font-bold text-xs sm:text-sm tracking-tight group-hover:bg-[#0A0A0A] transition-colors duration-300 self-start sm:self-auto shrink-0">
                <span>Explore Custom Platform</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* 3 Simple Solution Cards:
            1. Dental -> Blue (#101829 / #2D5FC7)
            2. Real Estate -> Website Yellow (#E8B62A)
            3. CRM / SaaS -> Website Black (#0A0A0A)
        */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 items-stretch">
          {SOLUTIONS.map((item, i) => {
            const isYellow = item.variant === "yellow";
            const isBlue = item.variant === "blue";

            const cardBg = isBlue
              ? "#101829"
              : isYellow
              ? "#E8B62A"
              : "#0A0A0A";

            const cardBorder = isBlue
              ? "border-[#2D5FC7]/40 hover:border-[#2D5FC7]"
              : isYellow
              ? "border-[#C99A1A]/40 hover:border-[#0A0A0A]/30"
              : "border-white/10 hover:border-white/25";

            const spotlightTone = isBlue
              ? "rgba(45, 95, 199, 0.28)"
              : isYellow
              ? "rgba(255, 255, 255, 0.35)"
              : "rgba(45, 95, 199, 0.22)";

            return (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <SpotlightCard
                  theme={isYellow ? "light" : "dark"}
                  spotlightColor={spotlightTone}
                  className={`!p-0 !rounded-3xl border transition-all duration-300 shadow-lg h-full ${cardBorder}`}
                  style={{ backgroundColor: cardBg }}
                >
                  <Link
                    href={item.href}
                    className="group relative z-10 flex flex-col justify-between p-6 sm:p-7 md:p-8 h-full w-full text-left"
                    title={`Explore ${item.title} (${item.href})`}
                  >
                    {/* Top Row: Icon + Title + Description */}
                    <div>
                      <div className="flex items-center justify-end mb-5">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-105 ${
                            isYellow
                              ? "bg-[#0A0A0A]/10 border-[#0A0A0A]/15 text-[#0A0A0A]"
                              : isBlue
                              ? "bg-[#2D5FC7]/20 border-[#2D5FC7]/40 text-[#F5EFE5]"
                              : "bg-white/[0.06] border-white/15 text-[#F5EFE5]"
                          }`}
                        >
                          {item.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                          isYellow ? "text-[#0A0A0A]" : "text-[#F5EFE5]"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`mt-3 text-sm leading-relaxed ${
                          isYellow ? "text-[#0A0A0A]/80" : "text-[#F5EFE5]/70"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Row: Action Button */}
                    <div className="pt-6 mt-6 flex items-center justify-end">
                      <Magnet padding={20} magnetStrength={4}>
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-md group-hover:scale-110 ${
                            isYellow
                              ? "bg-[#0A0A0A] text-[#F5EFE5]"
                              : isBlue
                              ? "bg-[#2D5FC7] text-[#F5EFE5] group-hover:bg-[#F5EFE5] group-hover:text-[#0A0A0A]"
                              : "bg-[#F5EFE5] text-[#0A0A0A] group-hover:bg-[#2D5FC7] group-hover:text-[#F5EFE5]"
                          }`}
                        >
                          <span className="text-base font-bold transition-transform duration-300 group-hover:translate-x-0.5">
                            &rarr;
                          </span>
                        </div>
                      </Magnet>
                    </div>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
