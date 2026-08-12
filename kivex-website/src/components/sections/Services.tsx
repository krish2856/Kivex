"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { services, type ServiceItem } from "@/data/services";
import { cn } from "@/lib/utils";

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

function ServiceCard({ service, index, color }: { service: ServiceItem; index: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{
        delay: index * 0.07,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative rounded-2xl border p-6 transition-all duration-500 cursor-default overflow-hidden",
          "border-black/[0.06] bg-white/50 hover:bg-white hover:shadow-lg hover:shadow-black/5 hover:border-transparent"
        )}
      >
        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}08 0%, transparent 70%)`,
          }}
        />

        <div className="relative">
          {/* Number badge */}
          <div className="flex items-start justify-between mb-4">
            <span
              className="text-[10px] font-mono font-bold tracking-wider opacity-30"
              style={{ color }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"
              style={{ backgroundColor: color }}
            />
          </div>

          <h4
            className="text-base font-bold text-[#0A0A0A] group-hover:translate-x-1 transition-transform duration-300"
          >
            {service.name}
          </h4>

          <p className="mt-2 text-sm leading-relaxed text-black/40 group-hover:text-black/55 transition-colors duration-300">
            {service.description}
          </p>

          {/* Bottom accent line */}
          <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="h-[2px] w-0 group-hover:w-8 transition-all duration-500" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color }}>
              Learn more
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeId, setActiveId] = useState<string>(services[0].id);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activeCategory = services.find((s) => s.id === activeId) ?? services[0];

  const toggleMobile = (id: string) => {
    setOpenMobile((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#F5EFE5] overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: categoryColors[activeId] }}
      />

      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2D5FC7]">
            Our Expertise
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl md:text-6xl">
            WHAT WE BUILD
          </h2>
        </motion.div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCategory.services.map((svc, i) => (
                    <ServiceCard
                      key={svc.name}
                      service={svc}
                      index={i}
                      color={categoryColors[activeCategory.id]}
                    />
                  ))}
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
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
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
                      "ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs transition-all duration-300",
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
                    <div className="border-t border-black/[0.06] px-5 pb-5 pt-4">
                      <p
                        className="mb-4 text-xs font-medium uppercase tracking-wider"
                        style={{ color: categoryColors[cat.id] }}
                      >
                        {cat.tagline}
                      </p>
                      <div className="space-y-3">
                        {cat.services.map((svc, i) => (
                          <motion.div
                            key={svc.name}
                            initial={isOpen ? { opacity: 0, x: -10 } : false}
                            animate={isOpen ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            className="flex gap-3"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: categoryColors[cat.id] }}
                            />
                            <div>
                              <p className="text-sm font-semibold text-[#0A0A0A]">
                                {svc.name}
                              </p>
                              <p className="mt-0.5 text-xs leading-relaxed text-black/45">
                                {svc.description}
                              </p>
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
    </section>
  );
}
