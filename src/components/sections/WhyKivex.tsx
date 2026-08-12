"use client";

import { motion } from "framer-motion";

const propositions = [
  {
    title: "Custom Solutions",
    description:
      "No templates. No shortcuts. Every solution is built from scratch to fit your exact business needs.",
  },
  {
    title: "Modern Technology",
    description:
      "We use the latest frameworks, tools, and AI capabilities to build systems that are fast, reliable, and future-proof.",
  },
  {
    title: "Automation-First Thinking",
    description:
      "We design systems that eliminate manual work, reduce errors, and scale without adding headcount.",
  },
  {
    title: "Performance Driven",
    description:
      "Speed matters. Every project is optimized for Core Web Vitals, load times, and real-world performance.",
  },
  {
    title: "Scalable Architecture",
    description:
      "Systems built to grow with you. From 100 users to 100,000 — the architecture handles it.",
  },
  {
    title: "Business-Focused Design",
    description:
      "Beautiful design that converts. Every interface decision is tied to a business outcome, not just aesthetics.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function WhyKivex() {
  return (
    <section
      id="why-kivex"
      className="section-padding"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 max-w-4xl"
        >
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#E8B62A" }}
          >
            Why Kivex
          </span>
          <h2
            className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ color: "#F5EFE5" }}
          >
            WE DON&apos;T JUST BUILD DIGITAL PRODUCTS. WE BUILD DIGITAL
            SYSTEMS.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {propositions.map((prop, i) => (
            <motion.div
              key={prop.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="group"
            >
              <div
                className="w-8 h-[2px] mb-6 transition-all duration-300 group-hover:w-16 group-hover:bg-yellow"
                style={{ backgroundColor: "#2D5FC7" }}
              />
              <h3
                className="text-lg md:text-xl font-bold mb-3"
                style={{ color: "#F5EFE5" }}
              >
                {prop.title}
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "#A3A3A3" }}
              >
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
