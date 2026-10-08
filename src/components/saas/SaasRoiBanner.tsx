"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function SaasRoiBanner() {
  const [teamSeats, setTeamSeats] = useState(25);
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [showDetails, setShowDetails] = useState(false);
  const { openProjectModal } = useProjectModal();

  // Commercial SaaS cost per seat (e.g., Salesforce / HubSpot + Slack + Jira stack)
  const monthlyCostPerSeat = currency === "USD" ? 95 : 7500;
  const monthlyCommercialSpend = teamSeats * monthlyCostPerSeat;
  const annualCommercialSpend = monthlyCommercialSpend * 12;
  const threeYearCommercialSpend = annualCommercialSpend * 3;

  // Custom Kivex cloud server cost (serverless compute & database)
  const annualCloudServerCost = currency === "USD" ? 1800 : 150000;
  const annualSavings = Math.max(0, annualCommercialSpend - annualCloudServerCost);

  const formattedAnnualSpend =
    currency === "USD"
      ? `$${annualCommercialSpend.toLocaleString("en-US")}`
      : `₹${annualCommercialSpend.toLocaleString("en-IN")}`;

  const formattedAnnualSavings =
    currency === "USD"
      ? `$${annualSavings.toLocaleString("en-US")}`
      : `₹${annualSavings.toLocaleString("en-IN")}`;

  const formattedThreeYearSpend =
    currency === "USD"
      ? `$${threeYearCommercialSpend.toLocaleString("en-US")}`
      : `₹${threeYearCommercialSpend.toLocaleString("en-IN")}`;

  return (
    <section className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Right: Currency Toggle */}
        <div className="flex justify-end pb-6 mb-6 border-b border-black/[0.08]">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 border border-black/[0.08] shadow-2xs">
            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                currency === "INR"
                  ? "bg-[#2D5FC7] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ₹ INR
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                currency === "USD"
                  ? "bg-[#2D5FC7] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">


          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-[-0.035em] leading-[1.05] uppercase">
            Stop The Endless <span className="text-[#2D5FC7]">Per-Seat Subscription Drain</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            See exactly how much recurring capital your company recovers each year by switching from third-party rental licenses to a bespoke, company-owned SaaS engine.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="rounded-3xl bg-white border border-black/[0.08] shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls: Sliders & Adjustments */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="team-seats-slider" className="text-xs sm:text-sm font-bold text-slate-900 font-mono uppercase">
                    Team Members / Users On Platform
                  </label>
                  <span className="px-3 py-1 rounded-full bg-[#2D5FC7]/10 border border-[#2D5FC7]/30 text-sm font-black text-[#2D5FC7] font-mono">
                    {teamSeats} Users
                  </span>
                </div>
                <input
                  id="team-seats-slider"
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={teamSeats}
                  onChange={(e) => setTeamSeats(Number(e.target.value))}
                  aria-label="Team Members / Users On Platform"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2D5FC7]"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-600 mt-1">
                  <span>5 Seats</span>
                  <span>50 Seats</span>
                  <span>100 Seats</span>
                  <span>150 Seats</span>
                </div>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-[#F5EFE5]/60 border border-black/[0.04]">
                  <span className="block text-[10px] font-mono text-slate-600 uppercase">Per Seat / Mo</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {currency === "USD" ? `$${monthlyCostPerSeat}` : `₹${monthlyCostPerSeat.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5EFE5]/60 border border-black/[0.04]">
                  <span className="block text-[10px] font-mono text-slate-600 uppercase">Kivex Seat Fee</span>
                  <span className="text-sm font-bold text-emerald-600 font-mono">$0 / Free</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5EFE5]/60 border border-black/[0.04]">
                  <span className="block text-[10px] font-mono text-slate-600 uppercase">Break-Even</span>
                  <span className="text-sm font-bold text-[#2D5FC7] font-mono">3–5 Months</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-blue-900 leading-relaxed font-normal">
                💡 <span className="font-bold">Did you know?</span> Over 3 years, commercial SaaS licenses inflate by an average of 14% annually due to tier upgrades and price increases. Owning your codebase locks in predictability.
              </div>
            </div>

            {/* Right Display: Big Numbers & Direct Annual Savings */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0A0A0A] text-white p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D5FC7]/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
                  <span>FINANCIAL COMPARISON SUMMARY</span>
                  <span className="text-emerald-400 font-bold">&bull; NET ANNUAL CAPITAL SAVED</span>
                </div>

                <div className="my-6">
                  <span className="block text-xs font-mono uppercase text-slate-400">
                    Recurring SaaS License Drain Recovered
                  </span>
                  <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white tracking-tight mt-1">
                    +{formattedAnnualSavings} <span className="text-xs sm:text-sm font-mono text-emerald-400 font-bold">/ yr</span>
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current 1-Year Rental Outflow:</span>
                    <span className="font-bold text-red-400 line-through">{formattedAnnualSpend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current 3-Year Rental Outflow:</span>
                    <span className="font-bold text-red-400 line-through">{formattedThreeYearSpend}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kivex Platform IP Rights:</span>
                    <span className="font-bold text-emerald-400">100% Owned by You</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3 justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Includes full documentation, architecture schemas &amp; deployment.
                </span>

                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#2D5FC7] hover:bg-[#234ca1] text-white text-xs font-bold font-mono tracking-wider uppercase transition-all shadow-md shrink-0 cursor-pointer hover:scale-102 active:scale-98"
                >
                  Claim Your Savings &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
