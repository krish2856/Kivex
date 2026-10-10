"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function RealEstateRoiBanner() {
  const [leadsPerDay, setLeadsPerDay] = useState(10);
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [showDetails, setShowDetails] = useState(false);
  const { openProjectModal } = useProjectModal();

  // Math calculations
  const minutesSavedPerLead = 20;
  const totalMinutesSavedDaily = leadsPerDay * minutesSavedPerLead;
  const hoursSavedDaily = (totalMinutesSavedDaily / 60).toFixed(1);
  const extraToursWeekly = Math.round(leadsPerDay * 0.4);
  const extraDealsMonthly = Math.max(1, Math.round(leadsPerDay / 10));

  const avgCommissionPerDeal = currency === "USD" ? 12500 : 350000;
  const monthlyRevenue = extraDealsMonthly * avgCommissionPerDeal;
  const formattedRevenue =
    currency === "USD"
      ? `$${monthlyRevenue.toLocaleString("en-US")}`
      : `₹${monthlyRevenue.toLocaleString("en-IN")}`;

  return (
    <section className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Massive Monumental Headline Strictly in Two Lines */}

        {/* Massive Monumental Headline Strictly in Two Lines */}
        <div className="text-center my-6 sm:my-10 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase"
          >
            <span className="block">Financial Return and</span>
            <span className="block">Projected Revenue <span className="text-[#2D5FC7]">Potential</span></span>
          </motion.h2>
        </div>

        {/* Floating Pill Dock below Title */}
        <div className="flex justify-center mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 p-1.5 rounded-2xl bg-[#1E1E1E] text-white shadow-xl border border-white/10"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center font-bold text-sm text-white">
              ROI.
            </div>

            <div className="flex items-center gap-2 px-2">
              <span className="text-xs font-bold tracking-tight text-white">
                Broker Yield Model
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Deal Revenue Projection
              </span>
            </div>

            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-4 py-2 rounded-xl bg-[#A7F3D0] hover:bg-[#86EFAC] text-[#064E3B] text-xs font-bold tracking-tight transition-all shadow-xs"
            >
              Request Custom Audit
            </button>
          </motion.div>
        </div>

        {/* Main 3-Column White Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.07)] overflow-hidden"
        >
          {/* Top 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 items-stretch">
            {/* Column 1: Financial ROI Title */}
            <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center items-start bg-white">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2D5FC7] font-bold mb-1">
                PROJECTED DEAL IMPACT
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Financial ROI
              </h3>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>30-Day Payback Horizon</span>
              </div>
            </div>

            {/* Column 2: The Core Question Quote */}
            <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-center items-start md:items-center text-left md:text-center bg-slate-50/40">
              <p className="text-xl sm:text-2xl font-serif italic text-[#1E293B] font-medium leading-relaxed">
                &ldquo;When will this investment pay for itself?&rdquo;
              </p>
              <span className="mt-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
                Broker Principal FAQ #1
              </span>
            </div>

            {/* Column 3: Direct Math & Revenue Impact */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-white">
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
                <strong className="font-bold text-[#0F172A]">Projected impact:</strong> If this
                saves <span className="font-semibold text-[#2D5FC7]">20 minutes</span> on{" "}
                <span className="font-semibold text-[#0F172A]">
                  {leadsPerDay} qualified inquiries a day
                </span>
                , your agents can conduct{" "}
                <span className="font-semibold text-emerald-600">
                  {extraToursWeekly} extra private showings weekly
                </span>
                , closing{" "}
                <span className="font-semibold text-[#2D5FC7]">
                  +{extraDealsMonthly} extra transaction monthly
                </span>
                , adding{" "}
                <span className="font-extrabold text-[#0F172A] bg-amber-100/70 px-1.5 py-0.5 rounded text-base">
                  {formattedRevenue}
                </span>{" "}
                to monthly brokerage revenue.
              </p>

              {/* Interactive Controls Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Leads/day:</span>
                  <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                    {[5, 10, 15, 20].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setLeadsPerDay(num)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                          leadsPerDay === num
                            ? "bg-[#2D5FC7] text-white shadow-xs"
                            : "text-slate-600 hover:text-black"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Currency:</span>
                  <button
                    type="button"
                    onClick={() => setCurrency(currency === "USD" ? "INR" : "USD")}
                    className="px-2.5 py-1 rounded-md border border-slate-300 bg-white text-xs font-mono font-bold text-slate-800 hover:border-slate-500 shadow-2xs transition-colors cursor-pointer"
                  >
                    {currency === "INR" ? "₹ INR" : "$ USD"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Calculation Breakdown Banner */}
          <div className="bg-slate-50 px-6 sm:px-8 py-3.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <span className="text-[#2D5FC7] font-bold">✓</span> {hoursSavedDaily} hrs agent time freed daily
              </span>
              <span className="text-slate-300 hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <span className="text-emerald-600 font-bold">✓</span> +{extraToursWeekly} private site tours / week
              </span>
              <span className="text-slate-300 hidden sm:inline">&bull;</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <span className="text-amber-600 font-bold">✓</span> {currency === "INR" ? "₹3,50,000" : "$12,500"} avg deal commission benchmark
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="font-semibold text-[#2D5FC7] hover:text-[#234ca1] transition-colors underline cursor-pointer"
            >
              {showDetails ? "Hide breakdown ↑" : "See where 20 min is saved ↓"}
            </button>
          </div>

          {/* Expandable Step-by-Step Time Savings */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-t border-slate-200/80 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="text-xs font-bold text-[#2D5FC7]">1. Automated WhatsApp Qualifier</div>
                <div className="text-lg font-extrabold text-slate-900 mt-0.5">Saves 8 Mins</div>
                <p className="text-xs text-slate-500 mt-1">
                  Inquiring buyers specify budget, configuration, and purchasing timeframe automatically via WhatsApp bot.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="text-xs font-bold text-[#2D5FC7]">2. Instant Broadsheet &amp; 3D Link</div>
                <div className="text-lg font-extrabold text-slate-900 mt-0.5">Saves 7 Mins</div>
                <p className="text-xs text-slate-500 mt-1">
                  High-res floor plans, architectural brochures, and 3D walkthroughs dispatched in 1 tap without manual emailing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="text-xs font-bold text-[#2D5FC7]">3. Showing &amp; Offer Automation</div>
                <div className="text-lg font-extrabold text-slate-900 mt-0.5">Saves 5 Mins</div>
                <p className="text-xs text-slate-500 mt-1">
                  Automated agent calendar invitations, directions, and instant digital heads-of-terms contract generation.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
