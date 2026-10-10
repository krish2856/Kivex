"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import HeroScene from "@/components/three/HeroScene";
import ParticleField from "@/components/three/ParticleField";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useProjectModal } from "@/context/ProjectModalContext";
import WarpText from "@/components/reactbits/WarpText/WarpText";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false }
);

const HERO_WORD_COLORS: Record<string, string> = {
  WE: "#0A0A0A",
  BUILD: "#0A0A0A",
  DIGITAL: "#2D5FC7",
  SYSTEMS: "#2D5FC7",
  THAT: "#0A0A0A",
  MOVE: "#0A0A0A",
  BUSINESSES: "#E8B62A",
  "FORWARD.": "#2D5FC7",
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
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 pt-20 pb-16 sm:py-20 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-8 items-center">
          <motion.div
            className="order-2 lg:order-1 flex flex-col gap-5 sm:gap-6 z-10"
            style={{ y: textY }}
          >
            {/* WebGL Liquid Distortion Headline (WarpText) in Black (#0A0A0A), Blue (#2D5FC7), and Yellow (#E8B62A) */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="z-10 w-full"
            >
              <span className="sr-only">
                WE BUILD DIGITAL SYSTEMS THAT MOVE BUSINESSES FORWARD.
              </span>
              <WarpText
                text={
                  "WE BUILD\nDIGITAL\nSYSTEMS THAT\nMOVE\nBUSINESSES\nFORWARD."
                }
                color="#0A0A0A"
                wordColors={HERO_WORD_COLORS}
                align="left"
                warpStrength={0.16}
                warpScale={2.0}
                speed={0.8}
                pointerInfluence={0.38}
                pointerStrength={0.5}
                refraction={0}
                ripple={true}
                fontSize="clamp(2.4rem, 5.2vw, 4.4rem)"
                fontWeight={800}
                letterSpacing="-0.03em"
                lineHeight={1.06}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-base sm:text-lg md:text-xl max-w-lg leading-relaxed text-[#0A0A0A]/75"
            >
              We engineer custom websites, client web applications, and automated workflows that help growing businesses cut manual overhead and acquire clients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mt-1 sm:mt-2"
            >
              <MagneticButton
                as="button"
                onClick={() => openProjectModal()}
                strength={0.2}
              >
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
            className="order-1 lg:order-2 h-[280px] sm:h-[360px] md:h-[480px] lg:h-[600px] w-full"
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
    </section>
  );
}
