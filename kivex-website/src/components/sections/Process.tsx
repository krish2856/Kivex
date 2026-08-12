"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { processSteps, type ProcessStep } from "@/data/process";
import { cn } from "@/lib/utils";

function StepItem({
  step,
  index,
  isActive,
  onClick,
}: {
  step: ProcessStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex gap-6 md:gap-8 cursor-pointer group transition-all duration-700",
        isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
      )}
      onClick={onClick}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={cn(
            "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-700 border-2 shrink-0",
            isActive
              ? "border-blue bg-blue/10 shadow-[0_0_20px_rgba(45,95,199,0.25)]"
              : "border-gray-300 bg-white"
          )}
          style={{ color: isActive ? "#2D5FC7" : "#A3A3A3" }}
        >
          {step.number}
        </div>
        {index < processSteps.length - 1 && (
          <div
            className={cn(
              "w-[2px] flex-1 min-h-[40px] transition-all duration-1000",
              isActive ? "bg-blue" : "bg-gray-200"
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 md:pb-14">
        <h3
          className={cn(
            "text-lg md:text-xl font-bold tracking-wide transition-colors duration-500",
            isActive ? "text-blue" : "text-dark group-hover:text-blue"
          )}
        >
          {step.title}
        </h3>
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-base leading-relaxed max-w-md"
              style={{ color: "#525252" }}
            >
              {step.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / (sectionHeight - viewportHeight), 1);
      const newIndex = Math.min(
        Math.floor(progress * processSteps.length),
        processSteps.length - 1
      );
      if (newIndex >= 0) setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding min-h-screen"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#2D5FC7" }}
          >
            How We Work
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: "#0A0A0A" }}
          >
            OUR PROCESS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Timeline Steps */}
          <div>
            {processSteps.map((step, i) => (
              <StepItem
                key={step.number}
                step={step}
                index={i}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Desktop Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-md aspect-square rounded-3xl flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: "#0A0A0A" }}
            >
              <div className="text-center px-10">
                <div
                  className="text-8xl font-bold mb-4"
                  style={{ color: "#2D5FC730" }}
                >
                  {processSteps[activeIndex].number}
                </div>
                <h3
                  className="text-3xl font-bold mb-4"
                  style={{ color: "#F5EFE5" }}
                >
                  {processSteps[activeIndex].title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#A3A3A3" }}
                >
                  {processSteps[activeIndex].description}
                </p>
              </div>

              {/* Decorative corner accents */}
              <div
                className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2"
                style={{ borderColor: "#2D5FC7" }}
              />
              <div
                className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2"
                style={{ borderColor: "#2D5FC7" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
