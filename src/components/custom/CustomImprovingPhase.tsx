"use client";

import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function CustomImprovingPhase() {
  const { openProjectModal } = useProjectModal();

  const metrics = [
    {
      metric: "99.99%",
      label: "Uptime SLA",
      detail: "Multi-region redundant cloud deployment with instant failover.",
      accent: "text-emerald-500",
    },
    {
      metric: "< 1.2s",
      label: "Largest Contentful Paint",
      detail: "Ultra-fast global edge caching and asset optimization.",
      accent: "text-[#2D5FC7]",
    },
    {
      metric: "98+",
      label: "Google Lighthouse Score",
      detail: "Flawless technical SEO, accessibility, and clean DOM hierarchy.",
      accent: "text-[#C69432]",
    },
    {
      metric: "24/7",
      label: "Error Telemetry",
      detail: "Automated alert traps for uncaught exceptions before users notice.",
      accent: "text-[#E8B62A]",
    },
  ];

  const improvementPillars = [
    {
      title: "Real User Monitoring & Session Telemetry",
      desc: "We analyze real-world user heatmaps, drop-off funnels, and navigation bottlenecks to pinpoint friction points and optimize conversion paths.",
    },
    {
      title: "Automated CI/CD Zero-Downtime Releases",
      desc: "Every new feature, bugfix, or schema migration is verified through automated test suites and deployed without a single second of service disruption.",
    },
    {
      title: "Performance Audits & Core Web Vitals Tuning",
      desc: "We continuously measure server response times, optimize database query indices, and fine-tune browser rendering speeds as your traffic scales.",
    },
    {
      title: "Sprint-Based Feature Iterations",
      desc: "Your product evolves with your business. We provide dedicated sprint capacity for user-requested features, integrations, and operational expansion.",
    },
  ];

  return (
    <section id="improving-phase" className="py-16 md:py-24 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              PHASE 03 &bull; CONTINUOUS IMPROVING &amp; SCALE
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase">
              The Improving Phase: <span className="text-emerald-600">Telemetry</span>, Speed &amp; Rapid Iteration
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Launch day is just the beginning. We continuously monitor live telemetry, optimize performance, and rapidly roll out requested features so your software stays fast, secure, and ahead of the competition.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>Discuss Scaling Strategy</span>
              <span className="text-sm">&rarr;</span>
            </button>
          </div>
        </div>

        {/* 4 Large Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 sm:pt-14">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center flex flex-col justify-between"
            >
              <div>
                <span className={`block text-3xl sm:text-4xl font-black tracking-tight ${m.accent}`}>
                  {m.metric}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 mt-1 block">
                  {m.label}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-2 font-mono">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 4 Improvement Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
          {improvementPillars.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/80 shadow-2xs flex items-start gap-4"
            >
              <span className="w-8 h-8 rounded-xl bg-[#0A0A0A] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <div>
                <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
