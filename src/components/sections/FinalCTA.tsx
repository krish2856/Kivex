"use client";

import { useMemo, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { companyInfo } from "@/data/navigation";
import { useProjectModal } from "@/context/ProjectModalContext";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const emptySubscribe = () => () => {};

export default function FinalCTA() {
  const { openProjectModal } = useProjectModal();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      width: seededRandom(i * 5 + 1) * 4 + 1,
      height: seededRandom(i * 5 + 2) * 4 + 1,
      left: seededRandom(i * 5 + 3) * 100,
      top: seededRandom(i * 5 + 4) * 100,
      opacity: seededRandom(i * 5 + 5) * 0.5 + 0.1,
      duration: seededRandom(i * 5 + 6) * 10 + 10,
      delay: seededRandom(i * 5 + 7) * 5,
      colorIndex: i % 3,
    }));
  }, []);

  return (
    <section
      id="contact"
      className="relative px-5 sm:px-6 md:px-8 py-20 sm:py-24 md:py-28 lg:py-32 overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-white/[0.08] shadow-[0_-25px_50px_rgba(0,0,0,0.3)]"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(45,95,199,0.2) 0%, rgba(232,182,42,0.08) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(45,95,199,0.15) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating particles */}
      {isMounted &&
        particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              backgroundColor:
                p.colorIndex === 0
                  ? "#2D5FC7"
                  : p.colorIndex === 1
                    ? "#E8B62A"
                    : "#FFFFFF",
              opacity: p.colorIndex === 2 ? 0.08 : p.opacity * 0.7,
              animation: `float ${p.duration}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        ))}

      <div className="relative mx-auto max-w-4xl text-center">


        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-[#F5EFE5]"
        >
          READY TO BUILD
          <br />
          <span style={{ color: "#4A7AE8" }}>WHAT&apos;S NEXT?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-5 text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-[#A3A3A3]"
        >
          Tell us what you&apos;re building. Let&apos;s turn the idea into a
          digital system that works.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto"
        >
          <button
            type="button"
            onClick={() => openProjectModal()}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 sm:px-10 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-102 hover:shadow-[0_10px_30px_rgba(45,95,199,0.35)] active:scale-98 min-h-[48px] cursor-pointer"
            style={{ backgroundColor: "#2D5FC7" }}
          >
            START A PROJECT
          </button>
          <a
            href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 sm:px-10 py-4 text-sm font-semibold border-2 border-white/20 text-white transition-all duration-300 hover:bg-white/5 hover:border-white/40 active:scale-98 min-h-[48px]"
          >
            LET&apos;S TALK
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-sm"
          style={{ color: "#737373" }}
        >
          <a
            href={`mailto:${companyInfo.email}`}
            className="hover:text-[#4A7AE8] transition-colors"
          >
            {companyInfo.email}
          </a>
        </motion.p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
          75% {
            transform: translateY(-25px) translateX(8px);
          }
        }
      `}</style>
    </section>
  );
}
