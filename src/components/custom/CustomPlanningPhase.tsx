"use client";

import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function CustomPlanningPhase() {
  const { openProjectModal } = useProjectModal();

  const steps = [
    {
      num: "01",
      title: "Stakeholder Discovery & Operational Audit",
      desc: "We analyze your existing manual bottlenecks, customer workflows, and operational gaps to determine precise software requirements.",
      tags: ["Workflow Mapping", "Bottleneck Audit", "Security Constraints"],
    },
    {
      num: "02",
      title: "Architecture & Data Schema Blueprinting",
      desc: "Our engineers architect the foundational schema: PostgreSQL / MongoDB models, Redis caching, microservices, and third-party API contracts.",
      tags: ["Relational Schemas", "Vector DB Specs", "API Specifications"],
    },
    {
      num: "03",
      title: "Interactive Wireframes & UX User Journeys",
      desc: "Every click, modal, screen transition, and permission tier is mapped out in low-fidelity prototypes before a single sprint begins.",
      tags: ["User Flow Maps", "Role Permission Matrix", "Interactive Wireframes"],
    },
    {
      num: "04",
      title: "Milestone Roadmap & Fixed Delivery Timeline",
      desc: "Transparent sprint commitments, clear deliverables for each sprint milestone, and transparent weekly code releases with zero scope creep.",
      tags: ["Fixed Deadlines", "Bi-Weekly Demos", "Continuous Code Delivery"],
    },
  ];

  return (
    <section id="planning-phase" className="py-16 md:py-24 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/[0.08]">
          <div className="max-w-3xl">


            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase">
              How We Plan: <span className="text-[#2D5FC7]">Requirements</span> &amp; Architecture Blueprint
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              We never guess or write code blindly. Every custom build begins with rigorous discovery, detailed operational modeling, and architectural blueprints that eliminate risk, scope creep, and unexpected delays.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>Schedule Architecture Call</span>
              <span className="text-sm">&rarr;</span>
            </button>
          </div>
        </div>

        {/* 4 Interactive Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 sm:pt-14">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2D5FC7]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#C69432] group-hover:text-[#2D5FC7] transition-colors">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Step {step.num} of 04
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#2D5FC7] transition-colors">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deliverables Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#0C0D12] text-white border border-white/10 shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B62A] font-bold">
                GUARANTEED PLANNING DELIVERABLES
              </span>
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
                Zero Ambiguity Before Development Begins
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                You receive a complete Specification Document, Entity Relationship Diagram (ERD), API schema specs, and signed milestone timelines before development kickoff.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="block text-base font-bold text-[#E8B62A]">48-72 hrs</span>
                <span className="text-[10px] font-mono text-slate-400">Spec Blueprint</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="block text-base font-bold text-emerald-400">100% Fixed</span>
                <span className="text-[10px] font-mono text-slate-400">Budget &amp; Scope</span>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="block text-base font-bold text-[#2D5FC7]">Weekly</span>
                <span className="text-[10px] font-mono text-slate-400">Sprint Demos</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
