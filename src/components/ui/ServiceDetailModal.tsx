"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { type ServiceItem, type ServiceCategory } from "@/data/services";
import { useLenis } from "@/components/ui/SmoothScroll";

interface ServiceDetailModalProps {
  category: ServiceCategory;
  service: ServiceItem;
  categoryColor: string;
  onClose: () => void;
  onStartProject: (serviceName: string) => void;
}

// 4-Phase Delivery Process tailored for each service
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Technical Scope",
    description:
      "We review your current workflow, system requirements, and target goals to define an exact scope of work.",
  },
  {
    step: "02",
    title: "Architecture & Interface Design",
    description:
      "We create clean responsive layouts, data schemas, and API blueprints so every interaction is clear and easy to use.",
  },
  {
    step: "03",
    title: "Production Build & Integration",
    description:
      "We write maintainable code, test edge cases, and integrate your third-party tools, payment processors, or databases.",
  },
  {
    step: "04",
    title: "Deployment & Team Handover",
    description:
      "We deploy to your live domain, verify analytics and performance, and provide full documentation and training.",
  },
];

export default function ServiceDetailModal({
  category,
  service,
  categoryColor,
  onClose,
  onStartProject,
}: ServiceDetailModalProps) {
  const { lenis } = useLenis();

  // Lock background scrolling and stop Lenis while modal is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, lenis]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
      data-lenis-prevent="true"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container: Flex column with constrained height and dedicated scrollable body */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/[0.12] rounded-3xl shadow-2xl z-10 text-[#F5EFE5] flex flex-col max-h-[88vh] overflow-hidden my-auto"
      >
        {/* 1. Header (Pinned & Fixed) */}
        <div className="p-5 sm:p-7 md:p-8 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4 shrink-0 bg-[#0A0A0A]/90 backdrop-blur-sm relative z-20">
          <div className="pr-6">


            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F5EFE5]">
              {service.name}
            </h3>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* 2. Scrollable Body (Independent Smooth Scroll) */}
        <div
          className="p-5 sm:p-7 md:p-8 overflow-y-auto flex-1 space-y-6 modal-scrollbar overscroll-contain"
          data-lenis-prevent="true"
        >
          {/* Service Description */}
          <p className="text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
            {service.description}
          </p>

          {/* "How We Deliver This" / Process Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/[0.08]">
              <h4 className="text-xs font-mono font-semibold tracking-widest uppercase text-white/90">
                How We Deliver This Work
              </h4>
              <span className="text-[10px] font-mono text-white/40 uppercase">
                4 Simple Steps
              </span>
            </div>

            <div className="space-y-2.5">
              {PROCESS_STEPS.map((stepItem) => (
                <div
                  key={stepItem.step}
                  className="p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-start gap-3.5 transition-colors hover:border-white/10"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${categoryColor}18`,
                      color: categoryColor,
                      border: `1px solid ${categoryColor}30`,
                    }}
                  >
                    {stepItem.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white">
                      {stepItem.title}
                    </div>
                    <div className="text-xs sm:text-[13px] text-[#A3A3A3] leading-relaxed mt-0.5">
                      {stepItem.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Highlights */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-white/[0.06] bg-[#141414] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/70">
            <div className="flex items-center gap-1.5">
              <span className="text-[#2D5FC7]">✦</span> 100% Custom Work
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#E8B62A]">⚡</span> On-Time Delivery
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#4A7AE8]">▣</span> Direct Team Support
            </div>
          </div>
        </div>

        {/* 3. Footer (Pinned & Fixed) */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0 relative z-20">
          <button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 px-5 py-2.5 rounded-full text-xs font-semibold text-white/60 hover:text-white transition-colors cursor-pointer text-center"
          >
            ← Back to Services
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onStartProject(service.name);
            }}
            className="order-1 sm:order-2 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            style={{
              backgroundColor: "#2D5FC7",
              boxShadow: "0 0 25px rgba(45,95,199,0.35)",
            }}
          >
            Start a Project with {service.name} →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
