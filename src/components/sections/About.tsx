"use client";

import { motion } from "framer-motion";
import { companyInfo } from "@/data/navigation";

const keyPoints = [
  {
    label: "What We Build",
    value: "Websites, software, automation systems, and digital products.",
  },
  {
    label: "Who We Work With",
    value:
      "Startups, SMEs, and enterprises looking to digitize or scale.",
  },
  {
    label: "How We Work",
    value:
      "Strategy-first approach. Clean code. Automation at every layer.",
  },
  {
    label: "Where We Ship",
    value: "Global. Our systems serve users across multiple continents.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: "#F5EFE5" }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#2D5FC7" }}
          >
            About
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: "#0A0A0A" }}
          >
            ABOUT KIVEX
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="text-xl md:text-2xl lg:text-3xl font-medium leading-snug"
              style={{ color: "#0A0A0A" }}
            >
              {companyInfo.name} is a digital systems company. We design, build,
              and automate technology that helps businesses move faster, operate
              smarter, and scale without limits.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <a
                href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20start%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: "#2D5FC7" }}
              >
                Get In Touch
              </a>
              <a
                href="#work"
                className="text-sm font-semibold transition-colors duration-200 hover:opacity-70"
                style={{ color: "#2D5FC7" }}
              >
                See Our Work →
              </a>
            </div>
          </motion.div>

          {/* Right: Key Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {keyPoints.map((point, i) => (
              <motion.div
                key={point.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group"
              >
                <div
                  className="w-8 h-[2px] mb-4 transition-all duration-300 group-hover:w-12"
                  style={{ backgroundColor: "#E8B62A" }}
                />
                <h4
                  className="text-xs font-semibold tracking-widest uppercase mb-2"
                  style={{ color: "#2D5FC7" }}
                >
                  {point.label}
                </h4>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#525252" }}
                >
                  {point.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
