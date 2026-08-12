"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import HeroScene from "@/components/three/HeroScene";
import ParticleField from "@/components/three/ParticleField";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
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

      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            className="flex flex-col gap-6 z-10"
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
          >
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#2D5FC7" }}
            >
              Kivex Technology
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
              style={{ color: "#0A0A0A" }}
            >
              WE BUILD DIGITAL SYSTEMS THAT MOVE BUSINESSES FORWARD.
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg md:text-xl max-w-lg leading-relaxed"
              style={{ color: "#0A0A0A", opacity: 0.7 }}
            >
              Kivex Technology builds websites, software, automation systems
              and digital experiences designed to turn ambitious ideas into
              scalable businesses.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-4 mt-4"
            >
              <MagneticButton href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20start%20a%20project." as="a" strength={0.2}>
                <span
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,95,199,0.3)]"
                  style={{ backgroundColor: "#2D5FC7" }}
                >
                  Start a Project
                </span>
              </MagneticButton>
              <MagneticButton href="#work" as="a" strength={0.2}>
                <span
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold border-2 transition-all duration-300 hover:bg-black/5"
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
            className="h-[400px] md:h-[500px] lg:h-[600px] w-full"
            style={{ scale: canvasScale }}
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
              dpr={[1, 1.5]}
            >
              <HeroScene scrollProgress={scrollProgress} />
              <ParticleField count={reducedMotion ? 50 : 200} />
            </Canvas>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span
          className="text-[10px] font-mono tracking-widest uppercase"
          style={{ color: "#A3A3A3" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8"
          style={{ backgroundColor: "#A3A3A3" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
