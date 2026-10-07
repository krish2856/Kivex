"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

interface EcosystemNode {
  id: string;
  label: string;
  subtitle: string;
  detail: string;
  icon: string;
  angle: number;
  color: string;
}

const NODES: EcosystemNode[] = [
  {
    id: "ai",
    label: "AI",
    subtitle: "Neural Agents",
    detail: "Custom LLMs, autonomous task agents, and intelligent workflows tailored to business logic.",
    icon: "✦",
    angle: 0,
    color: "#E8B62A",
  },
  {
    id: "web",
    label: "WEB",
    subtitle: "High-Speed Platforms",
    detail: "Next.js applications and digital flagships engineered for speed, conversions, and scale.",
    icon: "< >",
    angle: 51.4,
    color: "#2D5FC7",
  },
  {
    id: "automation",
    label: "AUTOMATION",
    subtitle: "Autonomous Pipelines",
    detail: "Zero-touch operational pipelines connecting leads, CRM, messaging, and fulfillment.",
    icon: "⚡",
    angle: 102.8,
    color: "#E8B62A",
  },
  {
    id: "crm",
    label: "CRM",
    subtitle: "Operations Hub",
    detail: "Integrated customer relationship architecture with automated lead scoring and tracking.",
    icon: "▣",
    angle: 154.2,
    color: "#4A7AE8",
  },
  {
    id: "cloud",
    label: "CLOUD",
    subtitle: "Serverless Infra",
    detail: "Resilient, scalable cloud infrastructure and secure API backends with 99.9% uptime.",
    icon: "☁",
    angle: 205.6,
    color: "#2D5FC7",
  },
  {
    id: "data",
    label: "DATA",
    subtitle: "Real-Time Telemetry",
    detail: "Event tracking, unified databases, and business intelligence dashboards for decision-making.",
    icon: "◉",
    angle: 257.0,
    color: "#E8B62A",
  },
  {
    id: "marketing",
    label: "MARKETING",
    subtitle: "Growth Engines",
    detail: "Omnichannel campaigns, automated lead funnels, and programmatic attribution.",
    icon: "◎",
    angle: 308.4,
    color: "#4A7AE8",
  },
];

export default function Ecosystem() {
  const [activeNode, setActiveNode] = useState<EcosystemNode | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const radius = 220;
  const nodePositions = NODES.map((node) => {
    const rad = (node.angle * Math.PI) / 180;
    const x = Math.round(Math.cos(rad) * radius);
    const y = Math.round(Math.sin(rad) * radius);
    return { ...node, x, y };
  });

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-white/[0.08] shadow-[0_-25px_50px_rgba(0,0,0,0.3)]"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, #2D5FC7 0%, #E8B62A 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B62A]/10 border border-[#E8B62A]/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A] animate-pulse" />
              <span
                className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#E8B62A" }}
              >
                Connected by Design
              </span>
            </div>
          </ScrollReveal>
          <TextReveal
            text="THE KIVEX ECOSYSTEM"
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ color: "#F5EFE5" }}
          />
        </div>

        {/* Desktop Interactive Constellation & Radar */}
        <div className="relative mt-6 lg:mt-8 hidden md:flex items-center justify-center min-h-[520px]">
          {/* Clockwise Rotating Planetary Orbit Wrapper */}
          <div className="orbit-system absolute inset-0 flex items-center justify-center">
            {/* Orbital SVG Canvas */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="-330 -330 660 660"
            >
              <defs>
                <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8B62A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2D5FC7" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Outer Orbital Orbit Ring */}
              <circle
                cx="0"
                cy="0"
                r="220"
                fill="none"
                stroke="#2D5FC7"
                strokeWidth="1"
                strokeOpacity="0.18"
                strokeDasharray="6 8"
              />

              {/* Inner Orbital Orbit Ring */}
              <circle
                cx="0"
                cy="0"
                r="140"
                fill="none"
                stroke="#E8B62A"
                strokeWidth="1"
                strokeOpacity="0.15"
                strokeDasharray="4 6"
              />

              {/* Connection Lines from Center to each Node */}
              {nodePositions.map((node) => {
                const isSelected = activeNode?.id === node.id;
                return (
                  <g key={`beam-${node.id}`}>
                    {/* Base beam */}
                    <line
                      x1="0"
                      y1="0"
                      x2={node.x}
                      y2={node.y}
                      stroke={isSelected ? node.color : "#2D5FC7"}
                      strokeWidth={isSelected ? 2 : 1}
                      strokeOpacity={isSelected ? 0.8 : 0.25}
                      className="transition-all duration-300"
                    />

                    {/* Traveling Energy Packet (Pulse Animation) */}
                    <motion.circle
                      r={isSelected ? 3.5 : 2.5}
                      fill={node.color}
                      animate={{
                        cx: [0, node.x],
                        cy: [0, node.y],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: isSelected ? 1.5 : 2.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (node.angle / 360) * 2,
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* 7 Orbital Nodes (Positioned along circular orbit, counter-rotating to stay upright) */}
            {nodePositions.map((node) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `calc(50% + ${node.x}px)`,
                    top: `calc(50% + ${node.y}px)`,
                  }}
                >
                  <div
                    className="orbit-node"
                    onMouseEnter={() => setActiveNode(node)}
                    onMouseLeave={() => setActiveNode(null)}
                    onClick={() => setActiveNode(node)}
                  >
                    <div
                      className={cn(
                        "cursor-pointer group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl border transition-all duration-300 backdrop-blur-md min-w-[130px] hover:scale-110",
                        isSelected
                          ? "bg-[#141414] shadow-[0_0_30px_rgba(45,95,199,0.4)]"
                          : "bg-[#141414]/90 border-white/[0.08] hover:border-[#2D5FC7] hover:bg-[#141414]"
                      )}
                      style={{
                        borderColor: isSelected ? node.color : undefined,
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${node.color}15`,
                          color: node.color,
                          border: `1px solid ${node.color}30`,
                        }}
                      >
                        {node.icon}
                      </div>

                      <div className="flex flex-col">
                        <span
                          className="text-xs font-bold tracking-wider uppercase transition-colors"
                          style={{ color: isSelected ? node.color : "#FFFFFF" }}
                        >
                          {node.label}
                        </span>
                        <span className="text-[9px] font-mono text-white/40 truncate max-w-[85px]">
                          {node.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Reactor / Nucleus (Stationary at center) */}
          <motion.div
            className="relative z-30 flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-[#E8B62A]/60 bg-[#0A0A0A] shadow-[0_0_50px_rgba(232,182,42,0.35)] cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveNode(null)}
          >
            {/* Glowing backdrop circle */}
            <div
              className="absolute inset-0 rounded-full opacity-35"
              style={{
                background: "radial-gradient(circle, rgba(232,182,42,0.6) 0%, transparent 70%)",
              }}
            />

            <span className="text-base font-black tracking-widest text-[#F5EFE5] relative z-10">
              KIVEX
            </span>
            <div className="flex items-center gap-1.5 mt-1 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A] animate-ping" />
              <span className="text-[9px] font-mono tracking-widest text-[#E8B62A] uppercase font-bold">
                CORE
              </span>
            </div>
          </motion.div>
        </div>


        {/* Mobile View: High-Tech Connected Grid */}
        <div className="mt-12 md:hidden">
          {/* Mobile Central Core */}
          <div className="flex justify-center mb-8">
            <div className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-[#E8B62A]/60 bg-[#0A0A0A] shadow-[0_0_35px_rgba(232,182,42,0.3)]">
              <span className="text-base font-black tracking-widest text-[#F5EFE5]">
                KIVEX
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A] animate-ping" />
                <span className="text-[8px] font-mono tracking-widest text-[#E8B62A] uppercase font-bold">
                  ECOSYSTEM
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Connected Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {NODES.map((node, i) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  onClick={() => setActiveNode(isSelected ? null : node)}
                  className={cn(
                    "p-3.5 rounded-xl border transition-all duration-300 bg-[#141414] cursor-pointer",
                    isSelected
                      ? "border-[#2D5FC7] shadow-lg shadow-[#2D5FC7]/20"
                      : "border-white/[0.08]"
                  )}
                  style={{
                    borderColor: isSelected ? node.color : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: `${node.color}15`,
                          color: node.color,
                        }}
                      >
                        {node.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-white">
                          {node.label}
                        </div>
                        <div className="text-[10px] font-mono text-white/40">
                          {node.subtitle}
                        </div>
                      </div>
                    </div>

                    <span
                      className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${node.color}15`,
                        color: node.color,
                      }}
                    >
                      SYNCED
                    </span>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2.5 pt-2.5 border-t border-white/[0.06] text-xs leading-relaxed text-white/60"
                      >
                        {node.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-white/40">
            Tap any service to view autonomous integration details
          </p>
        </div>
      </div>
    </section>
  );
}
