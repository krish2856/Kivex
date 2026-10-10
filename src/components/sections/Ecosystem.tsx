"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import Magnet from "@/components/reactbits/Magnet/Magnet";

interface EcosystemNode {
  id: string;
  label: string;
  subtitle: string;
  detail: string;
  metric: string;
  initialOffset: number;
  icon: React.ReactNode;
}

const NODES: EcosystemNode[] = [
  {
    id: "ai",
    label: "AI",
    subtitle: "Smart Assistants",
    detail:
      "Custom AI chatbots and workflow assistants trained on your business data.",
    metric: "24/7 Instant Replies",
    initialOffset: 0,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "web",
    label: "WEB",
    subtitle: "Websites & Apps",
    detail:
      "Fast Next.js websites and web portals built for mobile speed, search rankings, and conversions.",
    metric: "99+ Speed Score",
    initialOffset: 14.28,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 7L3 12L8 17M16 7L21 12L16 17M13.5 5L10.5 19"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "automation",
    label: "AUTOMATION",
    subtitle: "Task Workflows",
    detail:
      "Automated workflows connecting your forms, WhatsApp, Slack, billing, and daily operations.",
    metric: "80% Less Manual Work",
    initialOffset: 28.57,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "crm",
    label: "CRM",
    subtitle: "Client & Sales Hub",
    detail:
      "Custom client portals and sales pipelines with automatic lead assignment and follow-up tracking.",
    metric: "100% Lead Tracking",
    initialOffset: 42.85,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="4"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <rect x="7.5" y="7.5" width="9" height="9" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "cloud",
    label: "CLOUD",
    subtitle: "Cloud & Hosting",
    detail:
      "Secure cloud servers, daily backups, and reliable hosting that keeps your business online.",
    metric: "99.9% Uptime",
    initialOffset: 57.14,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.5 19H18C20.2091 19 22 17.2091 22 15C22 12.9317 20.4301 11.2302 18.4149 11.021C17.6512 7.58016 14.5812 5 10.9 5C6.64741 5 3.2 8.44741 3.2 12.7C3.2 13.0631 3.22514 13.4203 3.2738 13.7699C2.50212 14.4267 2 15.4054 2 16.5C2 18.433 3.567 20 5.5 20"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "data",
    label: "DATA",
    subtitle: "Live Dashboards",
    detail:
      "Clear business dashboards showing your daily bookings, sales numbers, and team performance.",
    metric: "Real-Time Reports",
    initialOffset: 71.42,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "marketing",
    label: "MARKETING",
    subtitle: "SEO & Growth",
    detail:
      "Search engine optimization, landing pages, and targeted campaigns that bring qualified leads.",
    metric: "3.4x Lead Growth",
    initialOffset: 85.71,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

function generateHarmonicOrbitPath(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  waveAmp = 14,
  lobes = 3
): string {
  const steps = 120;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wave = Math.sin(t * lobes) * waveAmp;
    const x = cx + (rx + wave) * Math.cos(t);
    const y = cy + (ry - wave * 0.6) * Math.sin(t);
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ") + " Z";
}

function KivexKMark({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -83 95 95"
      className={className}
      fill="none"
      aria-label="Kivex K Logo"
    >
      <path
        d="M7.421875 -71.58203125H29.541015625V-44.53125L52.734375 -71.58203125H82.12890625L56.0546875 -44.580078125L83.30078125 0.0H56.0546875L40.966796875 -29.443359375L29.541015625 -17.48046875V0.0H7.421875Z"
        fill="#2D5FC7"
      />
    </svg>
  );
}

function OrbitingEcosystemCard({
  node,
  path,
  progress,
  isActive,
  onSelect,
}: {
  node: EcosystemNode;
  path: string;
  progress: MotionValue<number>;
  isActive: boolean;
  onSelect: (node: EcosystemNode) => void;
}) {
  const offsetDistance = useTransform(progress, (p: number) => {
    const offset = (((p + node.initialOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  return (
    <motion.div
      className="absolute top-0 left-0 will-change-transform select-none z-20"
      style={{
        width: 210,
        height: 66,
        offsetPath: `path("${path}")`,
        offsetRotate: "0deg",
        offsetAnchor: "center center",
        offsetDistance,
      }}
      onMouseEnter={() => onSelect(node)}
      onClick={() => onSelect(node)}
    >
      <Magnet
        padding={30}
        magnetStrength={3.5}
        wrapperClassName="w-full h-full !block"
        innerClassName="w-full h-full"
      >
        <SpotlightCard
          theme="light"
          spotlightColor="rgba(45, 95, 199, 0.18)"
          className={`group relative w-full h-full !p-3 !rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-3 border ${
            isActive
              ? "bg-white border-[#2D5FC7]/40 shadow-[0_12px_32px_-6px_rgba(45,95,199,0.16)] scale-105"
              : "bg-white/95 hover:bg-white border-black/[0.07] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Simple Clean Icon Badge */}
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#2D5FC7]/[0.08] text-[#2D5FC7] border border-[#2D5FC7]/15 transition-transform duration-300 group-hover:scale-105">
            {node.icon}
          </div>

          {/* Label + Subtitle */}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0A0A0A] truncate">
              {node.label}
            </span>
            <span className="text-[11px] text-black/50 truncate mt-0.5">
              {node.subtitle}
            </span>
          </div>
        </SpotlightCard>
      </Magnet>
    </motion.div>
  );
}

export default function Ecosystem() {
  const [activeNode, setActiveNode] = useState<EcosystemNode>(NODES[0]);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const baseWidth = 900;
  const baseHeight = 580;
  const cx = baseWidth / 2;
  const cy = baseHeight / 2;

  const [scale, setScale] = useState<number>(1);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      const availableWidth = containerRef.current.clientWidth;
      setScale(Math.min(1, availableWidth / baseWidth));
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const mainOrbitPath = generateHarmonicOrbitPath(cx, cy, 315, 205, 14, 3);
  const innerOrbitPath = generateHarmonicOrbitPath(cx, cy, 190, 125, -8, 3);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (isPaused) return;
    const current = progress.get();
    const controls = animate(progress, current + 100, {
      duration: 50,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [progress, isPaused]);

  return (
    <section
      id="ecosystem"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Clean Minimal Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="flex justify-center">
            <BlurText
              text="THE KIVEX ECOSYSTEM"
              delay={35}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] justify-center"
            />
          </div>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-black/60 max-w-xl mx-auto leading-relaxed">
            Every part of your digital setup—from your website and CRM to automated follow-ups—connected in one place.
          </p>
        </div>

        {/* Desktop & Tablet Orbital Stage */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full max-w-[900px] mx-auto hidden sm:flex items-center justify-center overflow-visible"
          style={{
            height: `${Math.round(baseHeight * scale)}px`,
          }}
        >
          <div
            className="relative shrink-0"
            style={{
              width: baseWidth,
              height: baseHeight,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            {/* Simple, Minimal Dashed Orbital Tracks */}
            <svg
              width={baseWidth}
              height={baseHeight}
              viewBox={`0 0 ${baseWidth} ${baseHeight}`}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Inner Dashed Track */}
              <path
                d={innerOrbitPath}
                fill="none"
                stroke="#0A0A0A"
                strokeOpacity="0.09"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />

              {/* Outer Main Track */}
              <path
                d={mainOrbitPath}
                fill="none"
                stroke="#0A0A0A"
                strokeOpacity="0.12"
                strokeWidth="1.2"
                strokeDasharray="5 7"
              />
            </svg>

            {/* 7 Orbiting Ecosystem Cards */}
            {NODES.map((node) => (
              <OrbitingEcosystemCard
                key={node.id}
                node={node}
                path={mainOrbitPath}
                progress={progress}
                isActive={activeNode.id === node.id}
                onSelect={setActiveNode}
              />
            ))}

            {/* Central Hub — Simple White Squircle with Exact Solid Blue "K" Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="pointer-events-auto w-28 h-28 sm:w-32 sm:h-32 rounded-[30px] bg-white border border-black/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.08)] flex items-center justify-center select-none"
              >
                <KivexKMark className="w-12 h-12 sm:w-14 sm:h-14" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden mt-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-[26px] bg-white border border-black/[0.06] shadow-[0_12px_32px_rgba(0,0,0,0.07)] flex items-center justify-center">
              <KivexKMark className="w-11 h-11" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {NODES.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? "bg-white border-[#2D5FC7]/40 shadow-sm"
                      : "bg-white/85 border-black/[0.06]"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#2D5FC7]/[0.08] text-[#2D5FC7]">
                    {node.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
                      {node.label}
                    </div>
                    <div className="text-[11px] text-black/50">{node.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
