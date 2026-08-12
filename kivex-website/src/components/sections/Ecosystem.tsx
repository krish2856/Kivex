"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";

const OUTER_NODES = [
  { label: "AI", angle: 0 },
  { label: "WEB", angle: 51 },
  { label: "AUTOMATION", angle: 103 },
  { label: "CRM", angle: 154 },
  { label: "CLOUD", angle: 206 },
  { label: "DATA", angle: 257 },
  { label: "MARKETING", angle: 308 },
];

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const nodePositions = OUTER_NODES.map((node, i) => {
    const angle = (node.angle * Math.PI) / 180;
    const radius = 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { ...node, x, y, index: i };
  });

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,182,42,0.05) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="text-center">
          <ScrollReveal>
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#E8B62A" }}
            >
              Connected by Design
            </p>
          </ScrollReveal>
          <TextReveal
            text="THE KIVEX ECOSYSTEM"
            as="h2"
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: "#F5EFE5" }}
          />
          <ScrollReveal delay={0.2}>
            <p
              className="mx-auto mt-5 max-w-md text-base"
              style={{ color: "#F5EFE550" }}
            >
              One integrated technology ecosystem. Everything connected.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop visualization */}
        <div className="relative mt-16 hidden md:flex items-center justify-center min-h-[450px]">
          {/* Central node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-20 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#E8B62A]/40 bg-[#E8B62A] shadow-[0_0_40px_rgba(232,182,42,0.2)]"
          >
            <span className="text-sm font-bold tracking-wider text-[#0A0A0A]">
              KIVEX
            </span>
          </motion.div>

          {/* Connection lines from center to nodes */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="-250 -250 500 500"
          >
            {nodePositions.map((node, i) => (
              <motion.line
                key={`line-${i}`}
                x1="0"
                y1="0"
                x2={node.x}
                y2={node.y}
                stroke="#2D5FC7"
                strokeWidth="1"
                strokeOpacity="0.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
              />
            ))}
          </svg>

          {/* Outer nodes */}
          {nodePositions.map((node) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + node.index * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute z-10"
              style={{
                left: `calc(50% + ${node.x}px)`,
                top: `calc(50% + ${node.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#2D5FC7]/30 bg-[#141414] transition-all duration-300 hover:border-[#2D5FC7] hover:bg-[#2D5FC7]/10 hover:shadow-[0_0_20px_rgba(45,95,199,0.15)] cursor-default">
                <span className="text-[9px] font-bold uppercase tracking-wider text-white">
                  {node.label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Subtle pulsing ring around center */}
          <motion.div
            className="absolute z-10 h-40 w-40 rounded-full border border-[#E8B62A]/10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Mobile grid layout */}
        <div className="mt-12 md:hidden">
          <div className="flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#E8B62A]/40 bg-[#E8B62A]">
              <span className="text-base font-bold tracking-wider text-[#0A0A0A]">
                KIVEX
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {OUTER_NODES.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex aspect-square items-center justify-center rounded-xl border border-[#2D5FC7]/30 bg-[#2D5FC7]"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-white">
                  {node.label}
                </span>
              </motion.div>
            ))}
          </div>

          <p
            className="mt-6 text-center text-xs"
            style={{ color: "#F5EFE530" }}
          >
            All services work together seamlessly
          </p>
        </div>
      </div>
    </section>
  );
}
