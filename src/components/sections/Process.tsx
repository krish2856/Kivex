"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { processSteps, type ProcessStep } from "@/data/process";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/ui/SmoothScroll";

function StepItem({
  step,
  isActive,
  isPassed,
  onClick,
}: {
  step: ProcessStep;
  isActive: boolean;
  isPassed: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-3.5 xl:gap-4 cursor-pointer group transition-all duration-300 px-4 py-3 rounded-2xl border select-none",
        isActive
          ? "bg-white border-[#2D5FC7] shadow-lg shadow-[#2D5FC7]/10 translate-x-1"
          : isPassed
          ? "bg-white/60 border-black/[0.06] hover:bg-white"
          : "bg-white/30 border-transparent hover:bg-white/60"
      )}
    >
      {/* Step Circle */}
      <div
        className={cn(
          "w-9 h-9 xl:w-10 xl:h-10 rounded-full flex items-center justify-center text-xs xl:text-sm font-bold font-mono transition-all duration-300 shrink-0",
          isActive
            ? "bg-[#2D5FC7] text-white shadow-md shadow-[#2D5FC7]/30 scale-105"
            : isPassed
            ? "bg-[#2D5FC7]/15 text-[#2D5FC7] border border-[#2D5FC7]/30"
            : "bg-black/[0.05] text-black/50 group-hover:bg-black/10 group-hover:text-black/80"
        )}
      >
        {step.number}
      </div>

      {/* Title & Phase */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[10px] xl:text-[11px] font-mono uppercase tracking-wider font-semibold transition-colors",
              isActive ? "text-[#2D5FC7]" : "text-black/40"
            )}
          >
            Phase {step.number}
          </span>
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7] animate-pulse" />
          )}
        </div>
        <h4
          className={cn(
            "text-sm xl:text-base font-bold tracking-tight transition-colors truncate",
            isActive ? "text-[#0A0A0A]" : "text-black/70 group-hover:text-[#0A0A0A]"
          )}
        >
          {step.title}
        </h4>
        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-black/60 leading-relaxed mt-1 line-clamp-2"
            >
              {step.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  // Desktop scroll-driven animation
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return;
    }
    const stepCount = processSteps.length;
    const bounded = Math.max(0, Math.min(0.999, latest));
    const index = Math.min(stepCount - 1, Math.floor(bounded * stepCount));
    setActiveIndex(index);
  });

  const scrollToStep = (index: number) => {
    setActiveIndex(index);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return;
    }
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const trackTop = rect.top + scrollTop;
      const totalScrollable = trackRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const targetScroll =
          trackTop + (index / (processSteps.length - 1)) * totalScrollable;
        if (lenis) {
          lenis.scrollTo(targetScroll, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    }
  };

  const nextStep = () => {
    const nextIdx = (activeIndex + 1) % processSteps.length;
    scrollToStep(nextIdx);
  };

  const prevStep = () => {
    const prevIdx =
      (activeIndex - 1 + processSteps.length) % processSteps.length;
    scrollToStep(prevIdx);
  };

  const nextStepMobile = () => {
    setActiveIndex((prev) => (prev + 1) % processSteps.length);
  };

  const prevStepMobile = () => {
    setActiveIndex((prev) => (prev - 1 + processSteps.length) % processSteps.length);
  };

  return (
    <section
      ref={trackRef}
      id="process"
      className="relative lg:h-[320vh] rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-black/[0.06] shadow-[0_-25px_50px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Desktop Layout: Pinned Viewport with On-Scroll Card Transitions */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col justify-center items-center px-6 xl:px-12 pt-20 pb-8 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7]" />
              <span
                className="text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: "#2D5FC7" }}
              >
                Methodology
              </span>
            </div>
            <h2
              className="text-3xl xl:text-4xl font-bold tracking-tight"
              style={{ color: "#0A0A0A" }}
            >
              OUR PROCESS
            </h2>
            <p className="mt-1 text-xs xl:text-sm text-black/60 max-w-lg leading-relaxed">
              Scroll through to see each stage of our iterative engineering lifecycle.
            </p>
          </div>

          {/* Grid Layout: Left Timeline + Right Motion Showcase */}
          <div className="grid grid-cols-[1.05fr_0.95fr] gap-8 xl:gap-14 items-center">
            {/* Left Steps List */}
            <div className="space-y-2 relative">
              {processSteps.map((step, i) => (
                <StepItem
                  key={step.number}
                  step={step}
                  isActive={i === activeIndex}
                  isPassed={i < activeIndex}
                  onClick={() => scrollToStep(i)}
                />
              ))}
            </div>

            {/* Right Showcase Card with Framer Motion on Scroll */}
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.97 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative w-full aspect-[4/3] max-w-lg rounded-3xl flex flex-col justify-between p-8 xl:p-10 overflow-hidden border border-white/[0.08] shadow-2xl bg-[#0A0A0A]"
                >
                  {/* Subtle ambient spotlight */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(45,95,199,0.25) 0%, rgba(232,182,42,0.08) 50%, transparent 70%)",
                    }}
                  />

                  {/* Top header row */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#E8B62A]">
                      Phase {processSteps[activeIndex].number} of {String(processSteps.length).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-mono text-white/30 tracking-wider">
                      KIVEX FRAMEWORK
                    </span>
                  </div>

                  {/* Middle focus */}
                  <div className="relative z-10 py-4">
                    <div
                      className="text-7xl xl:text-8xl font-bold font-mono tracking-tighter mb-1.5"
                      style={{ color: "#2D5FC735" }}
                    >
                      {processSteps[activeIndex].number}
                    </div>
                    <h3
                      className="text-2xl xl:text-3xl font-bold mb-2.5 tracking-tight"
                      style={{ color: "#F5EFE5" }}
                    >
                      {processSteps[activeIndex].title}
                    </h3>
                    <p className="text-xs xl:text-sm leading-relaxed text-[#A3A3A3]">
                      {processSteps[activeIndex].description}
                    </p>
                  </div>

                  {/* Bottom progress bar & controls */}
                  <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    {/* Visual Segment Progress */}
                    <div className="flex items-center gap-1.5">
                      {processSteps.map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            i === activeIndex
                              ? "w-7 bg-[#2D5FC7]"
                              : i < activeIndex
                              ? "w-3 bg-[#2D5FC7]/40"
                              : "w-2 bg-white/10"
                          )}
                        />
                      ))}
                    </div>

                    {/* Step buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevStep}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                        aria-label="Previous phase"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextStep}
                        className="w-8 h-8 rounded-full bg-[#2D5FC7] hover:bg-[#4A7AE8] flex items-center justify-center text-white transition-colors shadow-md shadow-[#2D5FC7]/30"
                        aria-label="Next phase"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div
                    className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2"
                    style={{ borderColor: "#2D5FC7" }}
                  />
                  <div
                    className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2"
                    style={{ borderColor: "#2D5FC7" }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Interactive Layout */}
      <div className="lg:hidden px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7]" />
              <span
                className="text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: "#2D5FC7" }}
              >
                Methodology
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "#0A0A0A" }}
            >
              OUR PROCESS
            </h2>
            <p className="mt-2 text-sm text-black/60 leading-relaxed">
              A structured, iterative lifecycle from initial vision to autonomous scale.
            </p>
          </div>

          {/* Step Pills Selector */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
            {processSteps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all min-h-[44px]",
                  i === activeIndex
                    ? "bg-[#2D5FC7] text-white shadow-md shadow-[#2D5FC7]/25"
                    : "bg-white/80 text-black/60 border border-black/[0.08] hover:bg-white"
                )}
              >
                <span className="font-mono opacity-80">{step.number}</span>
                <span>{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Card */}
          <div className="mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-white/[0.08] shadow-xl"
                style={{ backgroundColor: "#0A0A0A" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#E8B62A]">
                    Phase {processSteps[activeIndex].number} of {String(processSteps.length).padStart(2, "0")}
                  </span>
                  <span
                    className="text-4xl font-bold font-mono"
                    style={{ color: "#2D5FC750" }}
                  >
                    {processSteps[activeIndex].number}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#F5EFE5] mb-2.5">
                  {processSteps[activeIndex].title}
                </h3>

                <p className="text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
                  {processSteps[activeIndex].description}
                </p>

                {/* Mobile Navigation Controls */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    onClick={prevStepMobile}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white/70 hover:text-white bg-white/5 active:bg-white/10 min-h-[44px] flex items-center gap-1.5"
                  >
                    ← Prev
                  </button>
                  <div className="flex gap-1.5">
                    {processSteps.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          i === activeIndex
                            ? "w-6 bg-[#2D5FC7]"
                            : "bg-white/20"
                        )}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextStepMobile}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#2D5FC7] hover:bg-[#4A7AE8] active:scale-98 min-h-[44px] flex items-center gap-1.5"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
