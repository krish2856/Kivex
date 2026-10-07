"use client";

import { motion } from "framer-motion";

interface MatrixRow {
  challenge: string;
  question: string;
  solution: string;
}

const matrixData: MatrixRow[] = [
  {
    challenge: "Buyer & Investor Acquisition",
    question: "“How do we stop losing qualified property buyers to third-party listing portals and convert traffic into booked site visits?”",
    solution: "A modern responsive property showcase with 3D virtual walkthroughs, neighborhood demographics, agent portfolios, and Google SEO that generates exclusive direct buyer inquiries.",
  },
  {
    challenge: "Deal Flow & Agent Pipeline",
    question: "“Will our brokerage team struggle managing portal leads, site visits, contracts, and commission splits across disconnected spreadsheets?”",
    solution: "A centralized Real Estate CRM unifying MLS feeds, automated lead routing, WhatsApp follow-ups, viewing schedules, digital offer documents, and pipeline stages.",
  },
  {
    challenge: "Repetitive Follow-ups & Deal Intelligence",
    question: "“Can we automate viewing reminders and predict high-intent closings without agent follow-up burnout?”",
    solution: "Make.com automates instant WhatsApp/SMS booking confirmations and drip campaigns, while Antigravity AI acts as your deal intelligence assistant analyzing buyer intent and pipeline velocity.",
  },
];

interface RealEstateProblemSolutionProps {
  embedded?: boolean;
}

export default function RealEstateProblemSolution({ embedded = false }: RealEstateProblemSolutionProps) {
  return (
    <section id="how-its-done" className={`bg-[#F5EFE5] text-[#0A0A0A] ${embedded ? "pt-6 pb-8 md:pb-12" : "py-14 md:py-16"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Monumental Headline Strictly in Two Lines */}
        <div className="text-center my-6 sm:my-10 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase"
          >
            <span className="block">Brokerage Bottlenecks and</span>
            <span className="block">Practical <span className="text-[#2D5FC7]">Solutions</span></span>
          </motion.h2>
        </div>

        {/* 3-Column Clean Editorial Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="divide-y divide-slate-200/80">
            {matrixData.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 p-6 sm:p-8 items-center hover:bg-slate-50/50 transition-colors"
              >
                <div className="md:col-span-3 pb-3 md:pb-0 md:pr-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] tracking-tight">
                    {row.challenge}
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    Pillar 0{idx + 1}
                  </span>
                </div>

                <div className="md:col-span-4 py-4 md:py-0 md:px-6">
                  <p className="text-xs sm:text-sm font-serif italic text-[#334155] leading-relaxed">
                    {row.question}
                  </p>
                </div>

                <div className="md:col-span-5 pt-3 md:pt-0 md:pl-6">
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                    {row.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
