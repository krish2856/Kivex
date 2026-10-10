"use client";

import { motion } from "framer-motion";

interface MatrixRow {
  challenge: string;
  question: string;
  solution: string;
}

const matrixData: MatrixRow[] = [
  {
    challenge: "Per-Seat Pricing & Recurring Overhead",
    question: "“Why are we paying steep per-user monthly fees for commercial tools with features we never use, while our data stays locked in someone else's system?”",
    solution: "Kivex builds a custom system fully owned by your company. Add unlimited team members and operators with zero per-seat license fees.",
  },
  {
    challenge: "Rigid Fields & Disconnected Spreadsheets",
    question: "“Will our operations team stay constrained by generic software templates, forcing staff back to disconnected spreadsheets?”",
    solution: "A custom PostgreSQL database built around your real-world workflow. Clear status stages, role-based access, and sub-second load times.",
  },
  {
    challenge: "Manual Data Entry & Repetitive Chores",
    question: "“Can we automate high-volume operations, instant client updates, and invoice syncing without manual administrative bottlenecks?”",
    solution: "Direct event webhooks, background queue workers via Redis, and smart AI automations that handle status dispatches, notifications, and client updates 24/7.",
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
            From Fragmented Tools to <span className="text-[#2D5FC7]">One Unified System</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Most growing companies juggle multiple disconnected subscriptions. We engineer one centralized platform built around how your business actually runs.
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
                    0{index + 1}
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
