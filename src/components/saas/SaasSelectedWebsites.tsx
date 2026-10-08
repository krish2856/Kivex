"use client";

import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface SaasTemplateArchitecture {
  id: string;
  title: string;
  categoryTag: string;
  badge: string;
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
}

const saasTemplates: SaasTemplateArchitecture[] = [
  {
    id: "b2b-saas-portal",
    title: "Enterprise Multi-Tenant B2B SaaS",
    categoryTag: "Subscription Platform",
    badge: "FOUNDATION 01 &bull; MULTI-TENANT",
    description:
      "A complete foundation for modern B2B SaaS companies. Pre-configured with tenant organization isolation, Stripe subscription billing, granular team permissions, and transactional notification pipelines.",
    technologies: ["Next.js 15", "PostgreSQL", "Stripe Billing", "BullMQ", "Tailwind CSS"],
    metrics: [
      { label: "Auth & RBAC", value: "Built-In" },
      { label: "Billing Engine", value: "Stripe Subscriptions" },
      { label: "Deployment", value: "Edge Cloud" },
    ],
    accentColor: "#9333EA",
  },
  {
    id: "logistics-crm-engine",
    title: "Operations & Logistics Fleet CRM",
    categoryTag: "Fleet & Dispatch Software",
    badge: "FOUNDATION 02 &bull; HIGH CONCURRENCY",
    description:
      "Engineered for high-velocity dispatch operators. Real-time driver manifests, automated status notifications, vehicle telematics intake, and instantaneous client tracking dashboards.",
    technologies: ["React", "Node.js", "Redis Queues", "WebSockets", "Vercel"],
    metrics: [
      { label: "Dispatch Velocity", value: "< 2s" },
      { label: "Paperless Ops", value: "100%" },
      { label: "Telemetry", value: "Real-time" },
    ],
    accentColor: "#2D5FC7",
  },
  {
    id: "wealth-analytics-dashboard",
    title: "Wealth & Portfolio Analytics Engine",
    categoryTag: "Fintech & Analytics",
    badge: "FOUNDATION 03 &bull; REAL-TIME DATA",
    description:
      "Financial intelligence console with interactive expense classification, multi-wallet balance aggregation, vector portfolio graphs, and automated monthly executive statements.",
    technologies: ["Next.js", "Chart.js", "PostgreSQL", "Client State", "Antigravity AI"],
    metrics: [
      { label: "Render Speed", value: "60 FPS" },
      { label: "Sync Latency", value: "< 100ms" },
      { label: "Multi-Wallet", value: "Unified" },
    ],
    accentColor: "#C69432",
  },
];

export default function SaasSelectedWebsites() {
  const { openProjectModal } = useProjectModal();

  return (
    <section id="template-website" className="py-14 sm:py-20 md:py-24 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Curated Showcase Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <div>


            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase">
              SaaS &amp; CRM <span className="text-[#2D5FC7]">Templates</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Accelerate time-to-market by 60%. Launch on verified architectural foundations designed for zero per-seat licensing, rapid customization, and enterprise reliability.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>Request Custom SaaS Build</span>
              <span className="text-sm">&rarr;</span>
            </button>
          </div>
        </div>

        {/* 3 Architecture Foundation Cards */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {saasTemplates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-lg hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 text-[10px] font-mono font-bold uppercase tracking-wider border border-blue-200">
                    {tpl.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    {tpl.categoryTag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {tpl.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {tpl.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {tpl.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 py-2 mb-4 text-left">
                  {tpl.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="block text-xs font-black text-slate-900 font-mono">
                        {m.value}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 truncate block">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className="w-full py-2.5 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold font-mono tracking-wider uppercase transition-all text-center block cursor-pointer"
                >
                  Deploy This Architecture &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Announcement Banner: Coming Soon Additions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-md text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-[11px] font-mono font-bold uppercase tracking-wider border border-blue-200 mb-3">
              ★ MORE STARTER FOUNDATIONS IN PRODUCTION
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight uppercase">
              Need A Custom SaaS Architecture?
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every business model has unique schemas, access tiers, and third-party integrations. We engineer custom production-grade SaaS engines from scratch with complete IP transfer.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openProjectModal()}
                className="px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:scale-102 active:scale-98"
              >
                Schedule Technical Architecture Call &rarr;
              </button>
              <a
                href="#our-live-projects"
                className="px-6 py-3 rounded-full bg-[#F5EFE5] hover:bg-white text-slate-800 text-xs font-bold tracking-wider uppercase transition-all border border-slate-300"
              >
                View Our Live Projects &darr;
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
