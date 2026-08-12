"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { companyInfo } from "@/data/navigation";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function FinalCTA() {
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
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(45,95,199,0.4) 0%, rgba(45,95,199,0) 70%)",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,182,42,0.2) 0%, rgba(232,182,42,0) 70%)",
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
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
                  : "#F5EFE520",
            opacity: p.opacity,
            animation: `float ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-sm font-semibold tracking-widest uppercase mb-6"
          style={{ color: "#E8B62A" }}
        >
          Let&apos;s Create
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
          style={{ color: "#F5EFE5" }}
        >
          READY TO BUILD
          <br />
          <span style={{ color: "#2D5FC7" }}>WHAT&apos;S NEXT?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl max-w-xl mx-auto"
          style={{ color: "#A3A3A3" }}
        >
          Tell us what you&apos;re building. Let&apos;s turn the idea into a
          digital system that works.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20start%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(45,95,199,0.4)]"
            style={{ backgroundColor: "#2D5FC7" }}
          >
            START A PROJECT
          </a>
          <a
            href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-semibold border-2 transition-all duration-300 hover:bg-white/5"
            style={{ color: "#F5EFE5", borderColor: "#F5EFE540" }}
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
          style={{ color: "#525252" }}
        >
          {companyInfo.email}
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
