"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Subtle vertical line accent — hidden on phones */}
      <div className="absolute left-6 md:left-16 top-0 bottom-0 w-[1px] bg-black/[0.06] hidden md:block" />
      <motion.div
        className="absolute left-6 md:left-16 top-0 w-[1px] origin-top hidden md:block"
        style={{ height: lineHeight, backgroundColor: "#2D5FC7" }}
      />

      {/* Top transition connecting thread from Hero */}
      <div className="flex justify-center pt-2 sm:pt-4">
        <div className="h-6 sm:h-10 w-[1px] bg-gradient-to-b from-black/15 via-[#2D5FC7]/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 lg:gap-24 items-start lg:items-center">
          {/* Left: Large statement */}
          <div>
            <TextReveal
              text="TECHNOLOGY SHOULD SIMPLIFY COMPLEXITY."
              as="h2"
              className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12]"
              style={{ color: "#0A0A0A" }}
            />
          </div>

          {/* Right: Supporting text + stats */}
          <div>
            <ScrollReveal delay={0.15}>
              <p
                className="text-base sm:text-lg md:text-xl leading-relaxed font-normal"
                style={{ color: "#404040" }}
              >
                Most software projects stall because teams reach for bloated templates instead of addressing the core operational need. At Kivex, we engineer web applications, client portals, and automation pipelines built around the specific way your business works.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              {/* Stats — clean balanced 3-column grid */}
              <div className="mt-8 sm:mt-10 pt-6 border-t border-black/[0.08] grid grid-cols-3 gap-3 sm:gap-6">
                <div>
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ color: "#2D5FC7" }}
                  >
                    100%
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-semibold mt-1 tracking-wider uppercase"
                    style={{ color: "#737373" }}
                  >
                    Custom Built
                  </div>
                </div>

                <div className="border-l border-black/10 pl-3 sm:pl-6">
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ color: "#2D5FC7" }}
                  >
                    AI-First
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-semibold mt-1 tracking-wider uppercase"
                    style={{ color: "#737373" }}
                  >
                    Architecture
                  </div>
                </div>

                <div className="border-l border-black/10 pl-3 sm:pl-6">
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                    style={{ color: "#2D5FC7" }}
                  >
                    End-to-End
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-semibold mt-1 tracking-wider uppercase"
                    style={{ color: "#737373" }}
                  >
                    Delivery
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Background floating shape */}
      <motion.div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full blur-[150px] md:blur-[200px] opacity-[0.03] pointer-events-none"
        style={{
          backgroundColor: "#2D5FC7",
          x: bgX,
        }}
      />
    </section>
  );
}
