"use client";

import { motion } from "framer-motion";
import { companyInfo } from "@/data/navigation";
import { useProjectModal } from "@/context/ProjectModalContext";
import Threads from "@/components/reactbits/Threads/Threads";
import BorderGlow from "@/components/reactbits/BorderGlow/BorderGlow";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import Magnet from "@/components/reactbits/Magnet/Magnet";

export default function FinalCTA() {
  const { openProjectModal } = useProjectModal();

  return (
    <section
      id="contact"
      className="relative px-4 sm:px-6 md:px-8 py-14 sm:py-20 md:py-24 overflow-hidden"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      <div className="mx-auto max-w-7xl">
        <BorderGlow
          backgroundColor="#0A0A0A"
          borderRadius={36}
          glowColor="220 80 60"
          glowRadius={45}
          glowIntensity={1.15}
          colors={["#2D5FC7", "#E8B62A", "#4A7AE8"]}
          animated={true}
          className="w-full shadow-[0_28px_80px_rgba(10,10,10,0.24)]"
        >
          <div className="relative overflow-hidden rounded-[36px] px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 md:py-24 lg:py-28">
            {/* Ambient Dual-Tone Architectural Glows */}
            <div
              className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full blur-[130px] pointer-events-none opacity-45"
              style={{
                background:
                  "radial-gradient(circle, rgba(45, 95, 199, 0.45) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-36 right-1/4 w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(232, 182, 42, 0.35) 0%, transparent 70%)",
              }}
            />

            {/* Interactive React Bits WebGL Silk/Contour Threads */}
            <div className="absolute inset-0 pointer-events-none opacity-75">
              <Threads
                color="#2D5FC7"
                accentColor="#E8B62A"
                amplitude={1.25}
                distance={0.25}
                lineCount={36}
                thickness={1.4}
                softness={1.3}
                speed={0.45}
                waves={1.2}
                split={0.35}
                fray={0.3}
                angle={-14}
                parting={0.35}
                taper={0.7}
                brightness={1.25}
                fade={0.6}
                opacity={0.85}
                enableMouseInteraction={true}
              />
            </div>

            {/* Subtle Center Readability Radial Shield */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 55% 50% at 50% 52%, rgba(10, 10, 10, 0.68) 0%, rgba(10, 10, 10, 0.25) 65%, transparent 100%)",
              }}
            />

            {/* Main Content (Original Text Style) */}
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-[#F5EFE5]"
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

              {/* Action Buttons (Unchanged Logic) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 max-w-md sm:max-w-none mx-auto"
              >
                <Magnet padding={24} magnetStrength={4}>
                  <button
                    type="button"
                    onClick={() => openProjectModal()}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3.5 rounded-full pl-7 pr-3 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#0A0A0A] bg-[#F5EFE5] hover:bg-white transition-all duration-300 shadow-[0_12px_35px_rgba(45,95,199,0.28)] hover:shadow-[0_16px_45px_rgba(232,182,42,0.3)] active:scale-98 min-h-[54px] cursor-pointer"
                  >
                    <span>START A PROJECT</span>
                    <span className="w-9 h-9 rounded-full bg-[#2D5FC7] group-hover:bg-[#0A0A0A] text-white flex items-center justify-center transition-colors duration-300">
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </Magnet>

                <StarBorder
                  as="a"
                  href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  theme="dark"
                  color="#E8B62A"
                  trailColor="#2D5FC7"
                  backgroundColor="#12141C"
                  textColor="#F5EFE5"
                  borderColor="rgba(255,255,255,0.14)"
                  radius={999}
                  duration={6}
                  glow={12}
                  hover="brighten"
                  className="w-full sm:w-auto !px-8 !py-4 text-xs sm:text-sm !font-bold tracking-wider uppercase min-h-[54px] cursor-pointer"
                >
                  LET&apos;S TALK
                </StarBorder>
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
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}

