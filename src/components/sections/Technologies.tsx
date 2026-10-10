"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import LogoLoop from "@/components/reactbits/LogoLoop/LogoLoop";
import Waves from "@/components/reactbits/Waves/Waves";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import Magnet from "@/components/reactbits/Magnet/Magnet";

interface Technology {
  name: string;
  category: string;
  brandColor: string;
  icon: (color: string) => React.ReactNode;
}

const technologies: Technology[] = [
  {
    name: ".NET",
    category: "Backend & Enterprise",
    brandColor: "#512BD4",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" fill="#512BD4" />
        <path
          d="M14 28V20M20 28V20L28 28V20M34 20H30V28H34M30 24H33"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="24"
          y="38"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
          fontFamily="var(--font-inter), Inter, sans-serif"
        >
          CORE
        </text>
      </svg>
    ),
  },
  {
    name: "Flutter",
    category: "Cross-Platform Mobile",
    brandColor: "#02569B",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path d="M28 8L12 24L17 29L38 8H28Z" fill="#54C5F8" />
        <path d="M28 24L17 35L22 40L38 24H28Z" fill="#01579B" />
        <path d="M22 29L17 24L28 13H38L22 29Z" fill="#29B6F6" />
        <path d="M22 29L28 35H38L27.5 24.5L22 29Z" fill="#01579B" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "React",
    category: "Frontend & Web Apps",
    brandColor: "#61DAFB",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7"
          stroke="#61DAFB"
          strokeWidth="2"
          transform="rotate(60 24 24)"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7"
          stroke="#61DAFB"
          strokeWidth="2"
          transform="rotate(120 24 24)"
        />
        <circle cx="24" cy="24" r="3" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Runtime & Microservices",
    brandColor: "#339933",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 6L40 15V33L24 42L8 33V15L24 6Z"
          fill="#339933"
        />
        <path
          d="M24 16C19.5 16 16 19.5 16 24C16 28.5 19.5 32 24 32C28.5 32 32 28.5 32 24H28C28 26.2 26.2 28 24 28C21.8 28 20 26.2 20 24C20 21.8 21.8 20 24 20C25.5 20 26.8 20.8 27.5 22H31.8C30.8 18.5 27.7 16 24 16Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "SQL Server",
    category: "Relational Database",
    brandColor: "#CC292B",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="12" rx="14" ry="5" fill="#E8B62A" opacity="0.9" />
        <path
          d="M10 12V24C10 26.8 16.3 29 24 29C31.7 29 38 26.8 38 24V12"
          stroke="#C99A1A"
          strokeWidth="2"
        />
        <ellipse cx="24" cy="24" rx="14" ry="5" fill="#E8B62A" opacity="0.6" />
        <path
          d="M10 24V36C10 38.8 16.3 41 24 41C31.7 41 38 38.8 38 36V24"
          stroke="#C99A1A"
          strokeWidth="2"
        />
        <ellipse cx="24" cy="36" rx="14" ry="5" fill="#E8B62A" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Azure",
    category: "Cloud Infrastructure",
    brandColor: "#0078D4",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M17 10L9 36H19L27 10H17Z"
          fill="#0078D4"
        />
        <path
          d="M23 18L19 32L29 38L39 18H23Z"
          fill="#50E6FF"
          opacity="0.9"
        />
        <path
          d="M19 32H39L33 38H29L19 32Z"
          fill="#005A9E"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    category: "Containerization",
    brandColor: "#2496ED",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        {/* Containers */}
        <rect x="11" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="17" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="23" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="17" y="14" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="23" y="14" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="29" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        {/* Whale Body */}
        <path
          d="M8 26C8 32 13 36 24 36C35 36 39 30 40 27C38 27 36 26.5 35 25.5C36 24 37 23 39 23C35 22 31 24 29 25H8V26Z"
          fill="#2496ED"
        />
        <circle cx="15" cy="30" r="1.5" fill="white" />
      </svg>
    ),
  },
  {
    name: "Angular",
    category: "Single-Page Framework",
    brandColor: "#DD0031",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path d="M24 6L8 12L10 34L24 42L38 34L40 12L24 6Z" fill="#DD0031" />
        <path d="M24 6V42L38 34L40 12L24 6Z" fill="#C3002F" />
        <path
          d="M24 13L16 30H19.5L21.2 26H26.8L28.5 30H32L24 13ZM25.5 23H22.5L24 19.5L25.5 23Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "AI, Automation & Scripting",
    brandColor: "#3776AB",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M23.5 8C16 8 16 11 16 11V16H24V17.5H13C9 17.5 7 20 7 24.5C7 29 10 30 13 30H15V26.5C15 23 18 21.5 21.5 21.5H27C29 21.5 31 19.5 31 17.5V11.5C31 9.5 29 8 23.5 8Z"
          fill="#3776AB"
        />
        <circle cx="19.5" cy="11.5" r="1.2" fill="white" />
        <path
          d="M24.5 40C32 40 32 37 32 37V32H24V30.5H35C39 30.5 41 28 41 23.5C41 19 38 18 35 18H33V21.5C33 25 30 26.5 26.5 26.5H21C19 26.5 17 28.5 17 30.5V36.5C17 38.5 19 40 24.5 40Z"
          fill="#FFD43B"
        />
        <circle cx="28.5" cy="36.5" r="1.2" fill="#0A0A0A" />
      </svg>
    ),
  },
  {
    name: "WordPress",
    category: "CMS & Editorial",
    brandColor: "#21759B",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#21759B" />
        <circle cx="24" cy="24" r="15" stroke="white" strokeWidth="1.5" />
        <path
          d="M14 24C14 29 17.5 33 22 34L16 17C14.7 19 14 21.4 14 24ZM31.5 23C31.5 21 30.8 19.5 30 18C28.8 16 27.5 16 26.5 16C25.5 16 24 16.5 24 16.5L28.5 33C31 31 31.5 26.5 31.5 23ZM23.5 25L20 34C21.3 34.5 22.6 35 24 35C24.8 35 25.6 34.8 26.4 34.5L23.5 25Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    category: "Orchestration & DevOps",
    brandColor: "#326CE5",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <polygon
          points="24,8 38,16 38,32 24,40 10,32 10,16"
          fill="#326CE5"
        />
        <circle cx="24" cy="24" r="5" fill="white" />
        <line x1="24" y1="13" x2="24" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="19" x2="28" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="29" x2="28" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="35" x2="24" y2="29" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="29" x2="20" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="19" x2="20" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "AWS",
    category: "Cloud Compute & Storage",
    brandColor: "#FF9900",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <text
          x="24"
          y="23"
          textAnchor="middle"
          fill="#232F3E"
          fontSize="13"
          fontWeight="900"
          fontFamily="var(--font-inter), Inter, sans-serif"
          letterSpacing="1"
        >
          aws
        </text>
        <path
          d="M13 28C19 32 29 32 35 28"
          stroke="#FF9900"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M34 26L36.5 28.5L33.5 30.5"
          fill="#FF9900"
        />
      </svg>
    ),
  },
];

function TechCard({
  tech,
  index,
  inLoop = false,
}: {
  tech: Technology;
  index: number;
  inLoop?: boolean;
}) {
  return (
    <div
      className={
        inLoop
          ? "w-[175px] sm:w-[205px] md:w-[220px] h-[160px] sm:h-[175px] py-2 select-none"
          : "w-full h-full select-none"
      }
    >
      <SpotlightCard
        theme="light"
        spotlightColor={`${tech.brandColor}35`}
        className="group relative h-full w-full !rounded-2xl sm:!rounded-3xl !p-4 sm:!p-5 flex flex-col items-center justify-center bg-white/85 hover:bg-white border border-black/[0.06] hover:border-black/15 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Subtle brand accent bar at top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-8 group-hover:w-20 rounded-b-full transition-all duration-500 opacity-50 group-hover:opacity-100"
          style={{ backgroundColor: tech.brandColor }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          {/* Continuously Floating Tech Icon */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: tech.name === "React" || tech.name === "Kubernetes" ? [0, 8, -8, 0] : [0, 0, 0],
            }}
            transition={{
              duration: 3.2 + (index % 4) * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (index % 6) * 0.25,
            }}
            className="relative mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-115"
          >
            {/* Soft brand halo behind icon on hover */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-35 transition-opacity duration-300 scale-125 pointer-events-none"
              style={{ backgroundColor: tech.brandColor }}
            />
            {tech.icon(tech.brandColor)}
          </motion.div>

          {/* Tech Name with DecryptedText */}
          <div className="text-xs sm:text-sm font-bold text-[#0A0A0A] tracking-tight transition-colors">
            <DecryptedText
              text={tech.name}
              speed={25}
              maxIterations={6}
              animateOn="hover"
              className="font-bold"
              encryptedClassName="text-[#2D5FC7] font-mono"
            />
          </div>

          {/* Tech Category Subtitle */}
          <span className="text-[10px] text-black/50 group-hover:text-black/75 tracking-wide text-center mt-1 truncate max-w-full px-1 transition-colors">
            {tech.category}
          </span>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function Technologies() {
  const row1Logos = useMemo(
    () =>
      technologies.slice(0, 6).map((tech, i) => ({
        node: <TechCard tech={tech} index={i} inLoop />,
        title: tech.name,
      })),
    []
  );

  const row2Logos = useMemo(
    () =>
      technologies.slice(6, 12).map((tech, i) => ({
        node: <TechCard tech={tech} index={i + 6} inLoop />,
        title: tech.name,
      })),
    []
  );

  return (
    <section
      id="technologies"
      className="relative px-5 sm:px-6 md:px-8 py-20 sm:py-24 md:py-28 overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-black/[0.06] shadow-[0_-25px_50px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Interactive Moving Waves Background from React Bits */}
      <div className="absolute inset-0 pointer-events-none opacity-35 overflow-hidden">
        <Waves
          lineColor="rgba(45, 95, 199, 0.14)"
          backgroundColor="transparent"
          waveSpeedX={0.018}
          waveSpeedY={0.01}
          waveAmpX={36}
          waveAmpY={18}
          xGap={16}
          yGap={36}
          friction={0.92}
          tension={0.005}
          maxCursorMove={100}
        />
      </div>

      {/* Subtle ambient spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(45,95,199,0.2) 0%, rgba(232,182,42,0.15) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex justify-center">
            <BlurText
              text="Technologies We Use"
              delay={40}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] justify-center"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3.5 text-sm sm:text-base text-black/60 max-w-xl mx-auto leading-relaxed"
          >
            Battle-tested frameworks, cloud infrastructure, and modern databases
            selected for rapid execution and dependable scale.
          </motion.p>
        </div>

        {/* Continuous Dual-Direction Moving Marquee (React Bits LogoLoop) */}
        <div className="space-y-4 sm:space-y-6 py-2">
          <LogoLoop
            logos={row1Logos}
            direction="left"
            speed={45}
            gap={20}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="#F5EFE5"
            scaleOnHover={false}
            ariaLabel="Frontend, Mobile and Backend Technologies"
          />
          <LogoLoop
            logos={row2Logos}
            direction="right"
            speed={45}
            gap={20}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="#F5EFE5"
            scaleOnHover={false}
            ariaLabel="Cloud, DevOps and AI Technologies"
          />
        </div>
      </div>
    </section>
  );
}
