"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "@/components/reactbits/CountUp/CountUp";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import BlurText from "@/components/reactbits/BlurText/BlurText";

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="relative w-full overflow-hidden py-10 sm:py-14 md:py-16"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Short 2-line animated introduction above */}
        <div className="max-w-4xl mb-8 sm:mb-10">
          <BlurText
            text="From customer-facing websites to internal CRMs and WhatsApp automation, we build software tailored to how your team actually works."
            delay={30}
            animateBy="words"
            direction="bottom"
            stepDuration={0.3}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium text-[#0A0A0A]/80"
          />
        </div>

        {/* Full-width simple text row (no cards) with React Bits text animations */}
        <div className="pt-8 sm:pt-10 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 w-full">
          {/* Stat 1: 100% CUSTOM BUILT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
              style={{ color: "#2D5FC7" }}
            >
              <ShinyText
                color="#2D5FC7"
                shineColor="#7BA4FA"
                speed={2.8}
                shineWidth={35}
                followPointer={true}
              >
                <CountUp from={0} to={100} duration={2} />%
              </ShinyText>
            </div>
            <div className="text-xs sm:text-sm font-semibold mt-2.5 tracking-[0.16em] uppercase text-[#737373]">
              <DecryptedText
                text="CUSTOM BUILT"
                speed={40}
                maxIterations={8}
                animateOn="inViewHover"
                className="text-[#737373]"
                encryptedClassName="text-[#2D5FC7]"
              />
            </div>
          </motion.div>

          {/* Stat 2: AI-First ARCHITECTURE */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="sm:border-l sm:border-black/10 sm:pl-6 lg:pl-12"
          >
            <div
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
              style={{ color: "#2D5FC7" }}
            >
              <ShinyText
                color="#2D5FC7"
                shineColor="#7BA4FA"
                speed={2.8}
                shineWidth={35}
                followPointer={true}
              >
                <DecryptedText
                  text="AI-First"
                  speed={38}
                  maxIterations={10}
                  animateOn="inViewHover"
                  className="text-[#2D5FC7]"
                  encryptedClassName="text-[#E8B62A]"
                />
              </ShinyText>
            </div>
            <div className="text-xs sm:text-sm font-semibold mt-2.5 tracking-[0.16em] uppercase text-[#737373]">
              <DecryptedText
                text="ARCHITECTURE"
                speed={40}
                maxIterations={8}
                animateOn="inViewHover"
                className="text-[#737373]"
                encryptedClassName="text-[#2D5FC7]"
              />
            </div>
          </motion.div>

          {/* Stat 3: End-to-End DELIVERY */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="sm:border-l sm:border-black/10 sm:pl-6 lg:pl-12"
          >
            <div
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
              style={{ color: "#2D5FC7" }}
            >
              <ShinyText
                color="#2D5FC7"
                shineColor="#7BA4FA"
                speed={2.8}
                shineWidth={35}
                followPointer={true}
              >
                <DecryptedText
                  text="End-to-End"
                  speed={38}
                  maxIterations={10}
                  animateOn="inViewHover"
                  className="text-[#2D5FC7]"
                  encryptedClassName="text-[#E8B62A]"
                />
              </ShinyText>
            </div>
            <div className="text-xs sm:text-sm font-semibold mt-2.5 tracking-[0.16em] uppercase text-[#737373]">
              <DecryptedText
                text="DELIVERY"
                speed={40}
                maxIterations={8}
                animateOn="inViewHover"
                className="text-[#737373]"
                encryptedClassName="text-[#2D5FC7]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
