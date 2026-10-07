"use client";

import { motion } from "framer-motion";

interface MatrixRow {
  challenge: string;
  question: string;
  solution: string;
}

const matrixData: MatrixRow[] = [
  {
    challenge: "Per-Seat License Trap & Vendor Lock-In",
    question: "“Why are we paying $80–$150/user every month to commercial CRM giants for features we don't use, while our database stays hostage on their cloud?”",
    solution: "Kivex engineers a 100% proprietary SaaS / CRM platform owned by your company. Add unlimited team members, operators, and clients with $0 per-seat licensing tax forever.",
  },
  {
    challenge: "Rigid Schemas & Broken Spreadsheets",
    question: "“Will our operational team remain constrained by rigid pre-packaged SaaS fields, forcing staff back to disconnected spreadsheets and messy workarounds?”",
    solution: "A bespoke PostgreSQL architecture modeled precisely around your real-world business logic. Multi-stage pipelines, custom relation models, role-based permissions, and sub-second queries.",
  },
  {
    challenge: "Manual Data Entry & Disconnected Tools",
    question: "“Can we automate high-volume operations, instant client updates, and invoice syncing without manual administrative bottlenecks?”",
    solution: "Direct event-driven webhooks, background queue workers via Redis, and Antigravity AI deal intelligence automating repetitive admin chores and status dispatches 24/7.",
  },
];

interface SaasProblemSolutionProps {
  embedded?: boolean;
}

export default function SaasProblemSolution({ embedded = false }: SaasProblemSolutionProps) {
  return (
    <section id="how-its-done" className={`bg-[#F5EFE5] text-[#0A0A0A] ${embedded ? "pt-6 pb-8 md:pb-12" : "py-14 md:py-16"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase">
            From Software Chaos to <span className="text-[#2D5FC7]">Centralized Engine</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Most businesses operate across fragmented third-party platforms that don&apos;t talk to each other, inflate monthly bills, and leak customer data. Here is how Kivex restores full control.
          </p>
        </div>

        {/* Matrix Grid: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matrixData.map((item, index) => (
            <motion.div
              key={item.challenge}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl p-6 sm:p-7 bg-white border border-black/[0.08] shadow-sm hover:shadow-xl hover:border-[#2D5FC7]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-black/[0.06]">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#2D5FC7] uppercase">
                    PILLAR 0{index + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#2D5FC7]/30" />
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {item.challenge}
                </h3>

                <blockquote className="my-4 text-xs sm:text-sm font-medium italic text-slate-600 bg-[#F5EFE5]/70 p-3.5 rounded-xl border-l-2 border-[#2D5FC7]">
                  {item.question}
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {item.solution}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Architecture Verified</span>
                <span className="text-[#2D5FC7] font-bold">100% Custom &bull; 0 Lock-in</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
