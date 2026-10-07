"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import HeroScene from "@/components/three/HeroScene";
import ParticleField from "@/components/three/ParticleField";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useProjectModal } from "@/context/ProjectModalContext";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { openProjectModal } = useProjectModal();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollProgress(v);
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 py-16 sm:py-20 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center">
          <motion.div
            className="flex flex-col gap-5 sm:gap-6 z-10"
            style={{ y: textY }}
          >
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#2D5FC7" }}
            >
              Kivex Technology
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.08] tracking-tight"
              style={{ color: "#0A0A0A" }}
            >
              WE BUILD DIGITAL SYSTEMS THAT MOVE BUSINESSES FORWARD.
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-base sm:text-lg md:text-xl max-w-lg leading-relaxed text-[#0A0A0A]/75"
            >
              We engineer custom websites, client web applications, and automated workflows that help growing businesses cut manual overhead and acquire clients.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mt-2 sm:mt-4"
            >
              <MagneticButton as="button" onClick={() => openProjectModal()} strength={0.2}>
                <span
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,95,199,0.3)] active:scale-98 min-h-[48px] cursor-pointer"
                  style={{ backgroundColor: "#2D5FC7" }}
                >
                  Start a Project
                </span>
              </MagneticButton>
              <MagneticButton href="#work" as="a" strength={0.2}>
                <span
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold border-2 transition-all duration-300 hover:bg-black/5 active:scale-98 min-h-[48px]"
                  style={{ color: "#0A0A0A", borderColor: "#0A0A0A" }}
                >
                  Explore Our Work
                </span>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px] w-full"
            style={{ scale: canvasScale }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
              dpr={[1, 1.5]}
            >
              <HeroScene scrollProgress={scrollProgress} />
              <ParticleField count={reducedMotion ? 40 : 120} />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator & transition bridge */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <a
          href="#introduction"
          className="group flex flex-col items-center gap-1.5 focus:outline-none"
          aria-label="Scroll to introduction"
        >
          <span
            className="text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 group-hover:text-[#2D5FC7]"
            style={{ color: "#737373" }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-7 sm:h-9 bg-black/15 relative overflow-hidden rounded-full">
            <motion.div
              className="w-full h-1/2 bg-[#2D5FC7] rounded-full"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
