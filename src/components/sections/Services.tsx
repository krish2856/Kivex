"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, type ServiceItem, type ServiceCategory } from "@/data/services";
import { cn } from "@/lib/utils";
import { useProjectModal } from "@/context/ProjectModalContext";
import ServiceDetailModal from "@/components/ui/ServiceDetailModal";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import PixelCard from "@/components/reactbits/PixelCard/PixelCard";
import SplitText from "@/components/reactbits/SplitText/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categoryIcons: Record<string, string> = {
  web: "< >",
  ai: "✦",
  creative: "◈",
  marketing: "◎",
  cloud: "☁",
};

const categoryColors: Record<string, string> = {
  web: "#2D5FC7",
  ai: "#E8B62A",
  creative: "#C99A1A",
  marketing: "#4A7AE8",
  cloud: "#1E3D8A",
};

function ServiceVectorIcon({ index, color }: { index: number; color: string }) {
  const icons = [
    // 0: Architectural Layout / Grid
    <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>,
    // 1: Code / Terminal Architecture
    <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>,
    // 2: Precision Target / Conversion
    <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>,
    // 3: Commerce / Modular Cube
    <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>,
    // 4: Dynamic System / Pulse
    <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>,
  ];
  return icons[index % icons.length];
}

function ServiceCard({
  service,
  index,
  color,
  onLearnMore,
}: {
  service: ServiceItem;
  index: number;
  color: string;
  onLearnMore: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isLeftCol = index % 2 === 0;

    gsap.set(el, {
      opacity: 0,
      y: 64,
      x: isLeftCol ? -36 : 36,
      rotateX: -26,
      rotateY: isLeftCol ? 12 : -12,
      scale: 0.88,
      transformPerspective: 1100,
      transformOrigin: "center bottom",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "bottom 12%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(el, {
      opacity: 1,
      y: 0,
      x: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.85,
      delay: index * 0.08,
      ease: "expo.out",
    });

    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 0.35,
          duration: 0.9,
          delay: 0.25 + index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 7,
      rotateY: x * 7,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer h-full will-change-transform"
      onClick={onLearnMore}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-full transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        <PixelCard
          gap={7}
          speed={32}
          colors={`${color},#93C5FD,#E8B62A`}
          noFocus={true}
          autoPulseOnScroll={true}
          pulseDelayMs={200 + index * 110}
          className="rounded-2xl h-full border border-black/[0.08] bg-white/80 backdrop-blur-md hover:bg-white hover:border-black/15 hover:shadow-[0_22px_48px_-12px_rgba(10,10,10,0.1)] transition-all duration-500"
        >
          <SpotlightCard
            theme="light"
            spotlightColor={color}
            className="!p-6 sm:!p-7 !rounded-2xl !border-0 !bg-transparent h-full min-h-[175px] sm:min-h-[195px] flex flex-col justify-between"
          >
            {/* Top Architectural Bar: Custom Vector Icon + Interactive Action Circle */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm"
                style={{
                  backgroundColor: `${color}12`,
                  border: `1px solid ${color}28`,
                }}
              >
                <ServiceVectorIcon index={index} color={color} />
              </div>

              <div
                className="w-9 h-9 rounded-full border border-black/[0.08] bg-[#F5EFE5]/80 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-45 group-hover:border-transparent"
                style={{
                  backgroundColor: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? color : undefined,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-colors duration-300"
                  style={{
                    color: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? "#FFFFFF" : "#0A0A0A",
                  }}
                >
                  <path
                    d="M3.5 7H10.5M10.5 7L7 3.5M10.5 7L7 10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Title & Animated Progress Sweep */}
            <div className="relative z-10 mt-7">
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <SplitText
                  text={service.name}
                  tag="h4"
                  textAlign="left"
                  splitType="words"
                  delay={40}
                  duration={0.65}
                  ease="power3.out"
                  from={{ opacity: 0, y: 16 }}
                  to={{ opacity: 1, y: 0 }}
                  rootMargin="-15px"
                  className="text-lg sm:text-[21px] font-bold tracking-tight text-[#0A0A0A] leading-snug"
                />
              </div>

              {/* Animated Scroll & Hover Progress Sweep */}
              <div className="mt-4 mb-3 h-[2px] w-full rounded-full bg-black/[0.06] overflow-hidden relative">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-left transition-transform duration-500 group-hover:!scale-x-100"
                  style={{ backgroundColor: color }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] font-bold tracking-[0.14em] uppercase flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color }}
                >
                  Learn more
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>
          </SpotlightCard>
        </PixelCard>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeId, setActiveId] = useState<string>(services[0].id);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<{
    category: ServiceCategory;
    service: ServiceItem;
  } | null>(null);

  const { openProjectModal } = useProjectModal();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeCategory = services.find((s) => s.id === activeId) ?? services[0];

  const toggleMobile = (id: string) => {
    setOpenMobile((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#F5EFE5]">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.03]"
          style={{ backgroundColor: categoryColors[activeId] }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-4 sm:pt-6 md:pt-8 pb-16 sm:pb-20 md:pb-28 lg:pb-32">
        {/* Header with React Bits SplitText On-Scroll Reveal */}
        <div>
          <SplitText
            text="WHAT WE BUILD"
            tag="h2"
            textAlign="left"
            splitType="chars"
            delay={28}
            duration={0.75}
            ease="power3.out"
            from={{ opacity: 0, y: 28, rotateX: -40 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            rootMargin="-50px"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0A0A]"
          />
        </div>

        {/* Desktop tabs + content */}
        <div className="mt-14 hidden md:block">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex gap-1 border-b border-black/10 overflow-x-auto pb-0"
          >
            {services.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                onMouseEnter={() => setHoveredTab(cat.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative whitespace-nowrap px-5 py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-300",
                  cat.id === activeId
                    ? "text-[#0A0A0A]"
                    : "text-black/40 hover:text-black/70"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className="text-[10px] transition-colors duration-300"
                    style={{ color: cat.id === activeId ? categoryColors[cat.id] : "inherit" }}
                  >
                    {categoryIcons[cat.id]}
                  </span>
                  {cat.title}
                </span>

                {/* Active underline */}
                {cat.id === activeId && (
                  <motion.div
                    layoutId="activeServiceTab"
                    className="absolute bottom-0 left-0 h-[3px] w-full rounded-t"
                    style={{ backgroundColor: categoryColors[cat.id] }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover underline */}
                {hoveredTab === cat.id && cat.id !== activeId && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    className="absolute bottom-0 left-0 h-[3px] w-full rounded-t origin-left"
                    style={{ backgroundColor: `${categoryColors[cat.id]}40` }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Content area */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-12"
              >
                {/* Left: Category info */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-4"
                    style={{
                      backgroundColor: `${categoryColors[activeCategory.id]}10`,
                      color: categoryColors[activeCategory.id],
                    }}
                  >
                    {categoryIcons[activeCategory.id]}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0A]">
                    {activeCategory.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-black/50">
                    {activeCategory.tagline}
                  </p>

                  {/* Stats */}
                  <div className="mt-8 flex items-center gap-6">
                    <div>
                      <div className="text-2xl font-bold" style={{ color: categoryColors[activeCategory.id] }}>
                        {activeCategory.services.length}
                      </div>
                      <div className="text-xs text-black/40 mt-1">Services</div>
                    </div>
                    <div className="w-[1px] h-8 bg-black/10" />
                    <div>
                      <div className="text-2xl font-bold" style={{ color: categoryColors[activeCategory.id] }}>
                        100%
                      </div>
                      <div className="text-xs text-black/40 mt-1">Custom</div>
                    </div>
                  </div>
                </div>

                {/* Right: Service cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {activeCategory.services.map((svc, i) => {
                    const isLastOdd =
                      activeCategory.services.length % 2 === 1 &&
                      i === activeCategory.services.length - 1;
                    return (
                      <div
                        key={svc.name}
                        className={cn(isLastOdd && "sm:col-span-2")}
                      >
                        <ServiceCard
                          service={svc}
                          index={i}
                          color={categoryColors[activeCategory.id]}
                          onLearnMore={() =>
                            setSelectedServiceForDetail({
                              category: activeCategory,
                              service: svc,
                            })
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 space-y-3 md:hidden">
          {services.map((cat) => {
            const isOpen = openMobile === cat.id;
            return (
              <div
                key={cat.id}
                className={cn(
                  "rounded-xl border transition-all duration-300",
                  isOpen
                    ? "bg-white shadow-lg shadow-black/5"
                    : "border-black/[0.06] bg-white/50"
                )}
                style={{
                  borderColor: isOpen ? `${categoryColors[cat.id]}30` : undefined,
                }}
              >
                <button
                  onClick={() => toggleMobile(cat.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left min-h-[52px]"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="text-sm font-bold transition-colors duration-300"
                      style={{ color: isOpen ? categoryColors[cat.id] : "#525252" }}
                    >
                      {categoryIcons[cat.id]}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-semibold uppercase tracking-widest transition-colors duration-300",
                        isOpen ? "text-[#0A0A0A]" : "text-black/50"
                      )}
                    >
                      {cat.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition-all duration-300",
                      isOpen
                        ? "text-white rotate-180"
                        : "bg-black/5 text-black/40"
                    )}
                    style={{
                      backgroundColor: isOpen ? categoryColors[cat.id] : undefined,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-400 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-black/[0.06] px-4 pb-5 pt-4">
                      <p
                        className="mb-4 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: categoryColors[cat.id] }}
                      >
                        {cat.tagline}
                      </p>
                      <div className="space-y-3">
                        {cat.services.map((svc, i) => (
                          <motion.div
                            key={svc.name}
                            initial={isOpen ? { opacity: 0, y: 16, scale: 0.96 } : false}
                            animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="flex gap-3.5 items-center p-4 rounded-xl border border-black/[0.06] bg-[#F5EFE5]/45 active:scale-[0.99] transition-all cursor-pointer"
                            onClick={() =>
                              setSelectedServiceForDetail({
                                category: cat,
                                service: svc,
                              })
                            }
                          >
                            <div
                              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                              style={{
                                backgroundColor: `${categoryColors[cat.id]}12`,
                                border: `1px solid ${categoryColors[cat.id]}28`,
                              }}
                            >
                              <ServiceVectorIcon index={i} color={categoryColors[cat.id]} />
                            </div>
                            <div className="flex-1 flex items-center justify-between gap-2">
                              <p className="text-base font-bold text-[#0A0A0A]">
                                {svc.name}
                              </p>
                              <span
                                className="text-[10px] font-bold uppercase tracking-wider shrink-0"
                                style={{ color: categoryColors[cat.id] }}
                              >
                                Learn more →
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Process Detail Modal */}
      <AnimatePresence>
        {selectedServiceForDetail && (
          <ServiceDetailModal
            category={selectedServiceForDetail.category}
            service={selectedServiceForDetail.service}
            categoryColor={
              categoryColors[selectedServiceForDetail.category.id] || "#2D5FC7"
            }
            onClose={() => setSelectedServiceForDetail(null)}
            onStartProject={(serviceName) => {
              setSelectedServiceForDetail(null);
              openProjectModal(serviceName);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
