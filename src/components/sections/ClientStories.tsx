"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import RotatingText from "@/components/reactbits/RotatingText/RotatingText";
import LogoLoop, { LogoItem } from "@/components/reactbits/LogoLoop/LogoLoop";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import GlareHover from "@/components/reactbits/GlareHover/GlareHover";
import Magnet from "@/components/reactbits/Magnet/Magnet";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import Waves from "@/components/reactbits/Waves/Waves";

interface ClientStory {
  quote: string;
  name: string;
  role: string;
  company: string;
  impact: string;
  initials: string;
  rating: number;
}

const clientStories: ClientStory[] = [
  {
    quote:
      "Kivex rebuilt our booking system and customer tracking from scratch. Automatic WhatsApp updates for passengers cut our daily phone inquiries by more than half, and our dispatch team saves hours every single day.",
    name: "Varun Joshi",
    role: "Co-Founder & Director",
    company: "Ganga Travels",
    impact: "60% Fewer Support Calls",
    initials: "VJ",
    rating: 5,
  },
  {
    quote:
      "During festival rush, our old booking website used to slow down or crash. Since moving to the new platform Kivex built for us, seat selection and ticket booking stay fast and reliable even on our busiest days.",
    name: "Amit",
    role: "Co-Founder & Director",
    company: "NeoBus",
    impact: "Zero Rush-Hour Downtime",
    initials: "AP",
    rating: 5,
  },
  {
    quote:
      "Having our property listings, broker tracking, and WhatsApp lead follow-ups in one custom portal made a huge difference for our sales team. We respond to buyer inquiries much faster and book more site visits.",
    name: "Chirag Bhatt",
    role: "Founder",
    company: "Aastha Realty",
    impact: "3x Faster Lead Follow-Up",
    initials: "CB",
    rating: 5,
  },
];

const clientBrands = [
  {
    name: "Ganga Travels",
    category: "Travel & Fleet Operations",
    tag: "Fleet Dispatch & Booking",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V16Z"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path d="M4 11H20" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" />
        <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" />
        <path
          d="M6 17V19M18 17V19"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "NeoBus Mobility",
    category: "Transit Tech & Fleet",
    tag: "High-Concurrency Engine",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="4"
          width="16"
          height="13"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <line
          x1="4"
          y1="10"
          x2="20"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <circle cx="8" cy="14" r="1.5" fill="currentColor" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
        <path
          d="M6 17V20M18 17V20"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Aastha Realty",
    category: "Real Estate Development",
    tag: "Custom CRM & Portal",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 21H21M4 21V10L12 4L20 10V21M9 21V14H15V21"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="8" y="9" width="2" height="2" fill="currentColor" />
        <rect x="14" y="9" width="2" height="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "VR Enterprises",
    category: "Industrial Trade & Commercial",
    tag: "Enterprise Operations",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <polygon
          points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M8 9L12 15L16 9"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function ClientBrandCard({
  brand,
  index,
}: {
  brand: (typeof clientBrands)[number];
  index: number;
}) {
  return (
    <div className="w-[330px] sm:w-[380px] md:w-[410px] py-3 select-none">
      <GlareHover
        width="100%"
        height="100%"
        background="transparent"
        borderRadius="28px"
        borderColor="transparent"
        glareColor="#2D5FC7"
        glareOpacity={0.12}
        glareAngle={-35}
        glareSize={220}
        transitionDuration={600}
        className="!border-0 !place-items-stretch"
      >
        <SpotlightCard
          theme="light"
          spotlightColor="rgba(45, 95, 199, 0.22)"
          className="!p-6 sm:!p-7 !rounded-[28px] bg-white/95 hover:bg-white border border-black/[0.08] hover:border-[#2D5FC7]/50 shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(45,95,199,0.14)] transition-all duration-300 group cursor-pointer w-full"
        >
          <div className="relative z-10 flex items-center gap-5">
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, index % 2 === 0 ? 3 : -3, 0],
              }}
              transition={{
                duration: 3 + (index % 2) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="w-16 h-16 rounded-2xl bg-[#F5EFE5] group-hover:bg-[#2D5FC7] text-[#2D5FC7] group-hover:text-white border border-black/[0.07] flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm group-hover:scale-105"
            >
              {brand.icon}
            </motion.div>

            <div className="min-w-0 flex-1 text-left">
              <div className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0A0A0A] group-hover:text-[#2D5FC7] transition-colors truncate">
                {brand.name}
              </div>

              <div className="text-xs sm:text-sm font-medium text-black/55 mt-0.5 truncate">
                <DecryptedText
                  text={brand.category}
                  speed={25}
                  maxIterations={6}
                  animateOn="hover"
                  className="text-black/55 group-hover:text-black/80"
                  encryptedClassName="text-[#2D5FC7]"
                />
              </div>
            </div>
          </div>
        </SpotlightCard>
      </GlareHover>
    </div>
  );
}

function AnimatedTestimonialCard({
  story,
  index,
  isActive,
  onSelect,
}: {
  story: ClientStory;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), {
    damping: 24,
    stiffness: 170,
    mass: 1.1,
  });
  const rotateY = useSpring(useMotionValue(0), {
    damping: 24,
    stiffness: 170,
    mass: 1.1,
  });
  const scale = useSpring(1, {
    damping: 24,
    stiffness: 180,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -8);
    rotateY.set((offsetX / (rect.width / 2)) * 8);
  };

  const handleMouseEnter = () => {
    scale.set(1.025);
    onSelect();
  };

  const handleMouseLeave = () => {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onSelect}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        y: isActive ? -12 : [0, -6, 0],
      }}
      transition={{
        y: isActive
          ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          : {
              duration: 4.2 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            },
        opacity: { duration: 0.5, delay: index * 0.12 },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="h-full will-change-transform cursor-pointer"
    >
      <GlareHover
        width="100%"
        height="100%"
        background="transparent"
        borderRadius="32px"
        borderColor="transparent"
        glareColor="#2D5FC7"
        glareOpacity={0.1}
        glareAngle={-35}
        glareSize={240}
        transitionDuration={650}
        className="!border-0 !place-items-stretch h-full"
      >
        <SpotlightCard
          theme="light"
          spotlightColor="rgba(45, 95, 199, 0.18)"
          className={cn(
            "group relative !p-8 sm:!p-9 md:!p-10 !rounded-[32px] flex flex-col justify-between transition-all duration-500 border h-full w-full text-left overflow-hidden",
            isActive
              ? "bg-white border-[#2D5FC7]/45 shadow-[0_24px_60px_rgba(45,95,199,0.16)]"
              : "bg-white/90 hover:bg-white border-black/[0.08] shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
          )}
        >
          {/* Top Progress / Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/[0.04] overflow-hidden">
            {isActive && (
              <motion.div
                key={`progress-${story.name}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#2D5FC7] via-[#4A7AE8] to-[#E8B62A]"
              />
            )}
          </div>

          <div className="relative z-10">
            {/* Top Row: Large Quote Glyph + Impact Badge */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-3xl font-serif leading-none transition-colors duration-300",
                  isActive
                    ? "bg-[#2D5FC7] text-white shadow-md shadow-[#2D5FC7]/25"
                    : "bg-[#F5EFE5] text-[#0A0A0A]/40 group-hover:text-[#2D5FC7]"
                )}
              >
                &ldquo;
              </div>

              <span
                className={cn(
                  "text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-colors duration-300",
                  isActive
                    ? "bg-[#2D5FC7]/10 text-[#2D5FC7] border-[#2D5FC7]/30"
                    : "bg-[#F5EFE5] text-[#0A0A0A]/70 border-black/[0.08]"
                )}
              >
                {story.impact}
              </span>
            </div>

            {/* Animated Star Rating */}
            <div className="flex items-center gap-1.5 mb-6">
              {Array.from({ length: story.rating }).map((_, s) => (
                <motion.span
                  key={s}
                  animate={
                    isActive
                      ? { scale: [1, 1.25, 1], rotate: [0, 8, 0] }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: s * 0.07,
                  }}
                  className="text-[#E8B62A] text-base sm:text-lg inline-block"
                >
                  ★
                </motion.span>
              ))}
            </div>

            {/* Larger Review Text */}
            <p className="text-base sm:text-[17px] leading-relaxed text-[#0A0A0A]/85 font-normal">
              {story.quote}
            </p>
          </div>

          {/* Author Row */}
          <div className="relative z-10 mt-9 pt-6 border-t border-black/[0.08] flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <Magnet padding={24} magnetStrength={4}>
                <div
                  className={cn(
                    "w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base tracking-wider shrink-0 shadow-md transition-colors duration-300",
                    isActive
                      ? "bg-[#2D5FC7] text-white"
                      : "bg-[#0A0A0A] text-[#F5EFE5] group-hover:bg-[#2D5FC7]"
                  )}
                >
                  {story.initials}
                </div>
              </Magnet>

              <div className="min-w-0">
                <h4 className="text-base sm:text-lg font-extrabold text-[#0A0A0A] tracking-tight truncate">
                  {story.name}
                </h4>
                <p className="text-xs sm:text-sm font-medium text-black/55 truncate mt-0.5">
                  {story.role} •{" "}
                  <span className="text-[#2D5FC7] font-semibold">
                    {story.company}
                  </span>
                </p>
              </div>
            </div>

            {/* Verified Check Badge */}
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300",
                isActive
                  ? "bg-[#2D5FC7]/10 border-[#2D5FC7]/30 text-[#2D5FC7]"
                  : "bg-black/[0.03] border-black/10 text-black/40"
              )}
              title="Verified Client Partner"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </div>
        </SpotlightCard>
      </GlareHover>
    </motion.div>
  );
}

export default function ClientStories() {
  const [activeStory, setActiveStory] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % clientStories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const loopItems: LogoItem[] = useMemo(
    () =>
      [...clientBrands, ...clientBrands].map((brand, idx) => ({
        node: <ClientBrandCard brand={brand} index={idx} />,
        title: brand.name,
      })),
    []
  );

  return (
    <section
      id="clients"
      className="relative px-5 sm:px-6 md:px-8 py-24 sm:py-28 md:py-36 overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-black/[0.06] shadow-[0_-25px_50px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Interactive React Bits Waves Background */}
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <Waves
          lineColor="rgba(45, 95, 199, 0.14)"
          backgroundColor="transparent"
          waveSpeedX={0.015}
          waveSpeedY={0.008}
          waveAmpX={36}
          waveAmpY={18}
          xGap={18}
          yGap={36}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ======================================================== */}
        {/* Block 1: OUR CLIENTS — Larger Header + Full-Bleed Stream */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="flex justify-center">
            <BlurText
              text="Our Clients"
              delay={40}
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A] justify-center"
            />
          </div>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-black/60 max-w-xl mx-auto leading-relaxed">
            Powering high-volume bookings, real estate pipelines, and commercial operations across India.
          </p>
        </div>

        {/* Full-Bleed Horizontal Moving Stream (Bigger Cards, No Scrollbar) */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 mb-24 sm:mb-32 overflow-hidden no-scrollbar">
          <LogoLoop
            logos={loopItems}
            speed={58}
            direction="left"
            logoHeight={125}
            gap={28}
            pauseOnHover={true}
            scaleOnHover={false}
            fadeOut={true}
            fadeOutColor="#F5EFE5"
            ariaLabel="Our Clients Horizontal Stream"
            className="overflow-hidden no-scrollbar"
          />
        </div>

        {/* ======================================================== */}
        {/* Block 2: WHAT OUR CLIENTS SAY — Larger Animated Deck     */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="flex justify-center">
            <BlurText
              text="What Our Clients Say"
              delay={35}
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
            className="mt-4 text-base sm:text-lg text-black/65 max-w-2xl mx-auto leading-relaxed"
          >
            Direct feedback from business owners who use Kivex websites, booking systems, and CRMs every day.
          </motion.p>
        </div>

        {/* 3 Large Animated Testimonial Cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {clientStories.map((story, i) => (
            <AnimatedTestimonialCard
              key={story.name}
              story={story}
              index={i}
              isActive={i === activeStory}
              onSelect={() => setActiveStory(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
