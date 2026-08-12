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
      className="relative overflow-hidden"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Subtle vertical line accent — hidden on phones */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-[1px] bg-black/[0.06] hidden md:block" />
      <motion.div
        className="absolute left-8 md:left-16 top-0 w-[1px] origin-top hidden md:block"
        style={{ height: lineHeight, backgroundColor: "#2D5FC7" }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-20 sm:py-28 md:py-36 lg:py-40 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 sm:gap-14 lg:gap-24 items-start lg:items-center">
          {/* Left: Large statement */}
          <div>
            <ScrollReveal>
              <span
                className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
                style={{ color: "#2D5FC7" }}
              >
                Introduction
              </span>
            </ScrollReveal>
            <TextReveal
              text="TECHNOLOGY SHOULD SIMPLIFY COMPLEXITY."
              as="h2"
              className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "#0A0A0A" }}
            />
          </div>

          {/* Right: Supporting text + stats */}
          <div>
            <ScrollReveal delay={0.15}>
              <p
                className="text-base sm:text-lg md:text-xl leading-relaxed"
                style={{ color: "#525252" }}
              >
                Kivex Technology combines design, engineering, AI, and
                automation to create digital systems built around real business
                needs. We don&apos;t believe in one-size-fits-all. Every project
                starts with understanding your business, your users, and your
                goals.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              {/* Stats — row on tablet+, stacked on phone */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8">
                <div>
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    style={{ color: "#2D5FC7" }}
                  >
                    100%
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-medium mt-1 tracking-wider uppercase"
                    style={{ color: "#A3A3A3" }}
                  >
                    Custom Built
                  </div>
                </div>
                <div className="w-[1px] h-10 sm:h-12 bg-black/10 hidden sm:block" />
                <div>
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    style={{ color: "#2D5FC7" }}
                  >
                    AI-First
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-medium mt-1 tracking-wider uppercase"
                    style={{ color: "#A3A3A3" }}
                  >
                    Architecture
                  </div>
                </div>
                <div className="w-[1px] h-10 sm:h-12 bg-black/10 hidden sm:block" />
                <div>
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    style={{ color: "#2D5FC7" }}
                  >
                    End-to-End
                  </div>
                  <div
                    className="text-[10px] sm:text-xs font-medium mt-1 tracking-wider uppercase"
                    style={{ color: "#A3A3A3" }}
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
