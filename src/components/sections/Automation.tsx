"use client";

import { motion } from "framer-motion";

const steps = [
  { label: "LEAD", icon: "◎" },
  { label: "AI", icon: "✦" },
  { label: "CRM", icon: "▣" },
  { label: "WHATSAPP", icon: "💬" },
  { label: "CALL", icon: "📞" },
  { label: "FOLLOW-UP", icon: "↻" },
  { label: "CONVERSION", icon: "★" },
];

export default function Automation() {
  return (
    <section
      id="automation"
      className="pt-8 sm:pt-12 md:pt-14 pb-16 sm:pb-20 md:pb-24 px-5 sm:px-6 md:px-8 lg:px-12 overflow-hidden relative"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20 max-w-3xl"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: "#F5EFE5" }}
          >
            TURN REPETITIVE WORK INTO AUTOMATED SYSTEMS.
          </h2>
          <p
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl text-[#A3A3A3]"
          >
            When an inquiry arrives, our automations route the lead, trigger WhatsApp or Slack alerts, update your CRM, and log next steps without anyone copying and pasting data.
          </p>
        </motion.div>

        {/* Desktop Pipeline */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-between">
            {/* Connecting Line */}
            <div
              className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
              style={{ backgroundColor: "#1E1E1E" }}
            />
            <motion.div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2"
              style={{ backgroundColor: "#2D5FC7" }}
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Data Pulses */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 h-[2px] w-16 -translate-y-1/2 rounded-full"
                style={{
                  backgroundColor: "#E8B62A",
                  boxShadow: "0 0 12px #E8B62A",
                }}
                initial={{ left: "-10%", opacity: 0 }}
                whileInView={{
                  left: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 3,
                  delay: i * 1,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "linear",
                }}
              />
            ))}

            {/* Nodes */}
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all duration-500 hover:scale-110"
                  style={{
                    backgroundColor: "#141414",
                    borderColor: "#2D5FC7",
                    color: "#2D5FC7",
                    boxShadow: "0 0 20px rgba(45,95,199,0.3)",
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "#F5EFE5" }}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Pipeline - Vertical */}
        <div className="md:hidden flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-stretch"
            >
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center w-10 shrink-0">
                <div
                  className="w-3.5 h-3.5 rounded-full border-2 mt-4"
                  style={{
                    backgroundColor: "#2D5FC7",
                    borderColor: "#4A7AE8",
                    boxShadow: "0 0 10px rgba(45,95,199,0.4)",
                  }}
                />
                {i < steps.length - 1 && (
                  <div className="flex-1 w-[2px] bg-gradient-to-b from-[#2D5FC7] to-[#1E3D8A]/50 my-1" />
                )}
              </div>

              {/* Content */}
              <div
                className="flex-1 py-3 px-4 mb-3 rounded-xl flex items-center justify-between border border-white/[0.08] bg-[#141414]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-base" style={{ color: "#E8B62A" }}>{step.icon}</span>
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#F5EFE5" }}
                  >
                    {step.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {[
            { value: "10x", label: "Faster Lead Processing" },
            { value: "40%", label: "Higher Conversion Rate" },
            { value: "80%", label: "Less Manual Work" },
            { value: "24/7", label: "Automated Operations" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 sm:p-5 rounded-2xl border border-white/[0.06] bg-[#141414]/60 backdrop-blur-sm"
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: "#E8B62A" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-1.5 text-xs sm:text-sm font-medium leading-snug"
                style={{ color: "#A3A3A3" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
