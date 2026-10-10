"use client";

import { motion } from "framer-motion";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import BlurText from "@/components/reactbits/BlurText/BlurText";

const propositions = [
  {
    title: "Built for Your Workflow",
    description:
      "We do not use generic page builders or off-the-shelf templates. Every database schema, UI component, and API call is built around how your company operates.",
  },
  {
    title: "Tested Web Architecture",
    description:
      "We build with Next.js, React, Node, and TypeScript, backed by automated testing, edge caching, and reliable cloud deployments.",
  },
  {
    title: "Hands-Off Automation",
    description:
      "We connect forms, payments, and CRMs directly to your WhatsApp or Slack channels so your team never wastes time copying data between tabs.",
  },
  {
    title: "Verified Load Speed",
    description:
      "We test on real mobile phones and throttled mobile data networks to ensure sub-second initial loads and top performance scores.",
  },
  {
    title: "Solid Infrastructure",
    description:
      "Stateless API endpoints, isolated database connections, and CDN caching ensure your app stays fast as customer volume multiplies.",
  },
  {
    title: "Direct Conversion Focus",
    description:
      "Every page section, callout, and inquiry form is placed to reduce user hesitation and increase qualified leads.",
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
      className="relative px-5 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-white/[0.08] shadow-[0_-25px_50px_rgba(0,0,0,0.3)]"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
        >
          <BlurText
            text="DIGITAL SYSTEMS ENGINEERED TO RUN YOUR BUSINESS."
            delay={30}
            animateBy="words"
            direction="top"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F5EFE5]"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {propositions.map((prop, i) => (
            <motion.div
              key={prop.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <SpotlightCard
                theme="dark"
                spotlightColor="rgba(45, 95, 199, 0.3)"
                className="!p-6 sm:!p-7 !rounded-2xl border border-white/[0.08] bg-[#141414]/80 hover:bg-[#141414] hover:border-[#2D5FC7]/50 transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-8 h-[2px] transition-all duration-300 group-hover:w-14"
                      style={{ backgroundColor: "#2D5FC7" }}
                    />
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold mb-2.5 text-[#F5EFE5] group-hover:text-white transition-colors"
                  >
                    {prop.title}
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed text-[#A3A3A3]"
                  >
                    {prop.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
