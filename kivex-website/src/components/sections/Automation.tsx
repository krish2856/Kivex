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
      className="section-padding overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#E8B62A" }}
          >
            Automation
          </span>
          <h2
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            style={{ color: "#F5EFE5" }}
          >
            TURN REPETITIVE WORK INTO AUTOMATED SYSTEMS.
          </h2>
          <p
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "#A3A3A3" }}
          >
            From lead capture to conversion — we build intelligent pipelines
            that eliminate repetitive tasks, reduce human error, and scale your
            operations without scaling your team.
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
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all duration-500"
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
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-stretch"
            >
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center w-12 shrink-0">
                <div
                  className="w-4 h-4 rounded-full border-2 mt-5"
                  style={{
                    backgroundColor: "#2D5FC7",
                    borderColor: "#2D5FC7",
                    boxShadow: "0 0 12px rgba(45,95,199,0.3)",
                  }}
                />
                {i < steps.length - 1 && (
                  <div className="flex-1 w-[2px]" style={{ backgroundColor: "#2D5FC7" }} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 py-4 px-4 mb-4 rounded-xl" style={{ backgroundColor: "#141414", border: "1px solid rgba(45,95,199,0.2)" }}>
                <div className="flex items-center gap-3">
                  <span style={{ color: "#E8B62A" }}>{step.icon}</span>
                  <span
                    className="text-sm font-bold tracking-widest uppercase"
                    style={{ color: "#F5EFE5" }}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "10x", label: "Faster Lead Processing" },
            { value: "40%", label: "Higher Conversion Rate" },
            { value: "80%", label: "Less Manual Work" },
            { value: "24/7", label: "Automated Operations" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#E8B62A" }}
              >
                {stat.value}
              </div>
              <div
                className="mt-2 text-sm font-medium"
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
