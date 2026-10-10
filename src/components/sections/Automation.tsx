"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/reactbits/CountUp/CountUp";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import ScrollStack, {
  ScrollStackItem,
} from "@/components/reactbits/ScrollStack/ScrollStack";

interface AutomationStep {
  code: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: AutomationStep[] = [
  {
    code: "01",
    label: "LEAD",
    title: "Every Inquiry Captured Automatically",
    description:
      "Form fills, landing page inquiries, and incoming messages are captured the instant a prospect reaches out—no spreadsheets or manual entry.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    code: "02",
    label: "AI",
    title: "Smart Qualification & Routing",
    description:
      "Understands what the lead is asking for, filters out noise, and assigns the inquiry to the right person on your team immediately.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3z" />
      </svg>
    ),
  },
  {
    code: "03",
    label: "CRM",
    title: "Instant CRM Record Creation",
    description:
      "Creates the contact, logs their inquiry details, and sets the deal stage inside your CRM automatically without anyone copying and pasting.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M9 10v10" />
      </svg>
    ),
  },
  {
    code: "04",
    label: "WHATSAPP",
    title: "Immediate WhatsApp & Team Alerts",
    description:
      "Sends a tailored WhatsApp message to the client within seconds while notifying your internal Slack or WhatsApp group.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    code: "05",
    label: "CALL",
    title: "Direct Call & Booking Connection",
    description:
      "Prompts your rep to connect right away or shares a direct calendar booking link while the prospect is still engaged.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    code: "06",
    label: "FOLLOW-UP",
    title: "Scheduled Follow-Ups That Never Miss",
    description:
      "If a prospect gets busy, timed reminders and follow-up messages go out automatically so no warm lead ever slips through the cracks.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
  },
  {
    code: "07",
    label: "CONVERSION",
    title: "Closed Client & Clear Attribution",
    description:
      "Marks the lead converted, kicks off client onboarding, and records which campaign generated the revenue.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
];

export default function Automation() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section
      id="automation"
      className="pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-32 px-5 sm:px-6 md:px-8 lg:px-12 relative"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Two-Column Layout: Sticky Left Intro + Right One-by-One ScrollStack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (Sticky on Desktop while cards stack on scroll) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <BlurText
              text="TURN REPETITIVE WORK INTO AUTOMATED SYSTEMS."
              delay={30}
              animateBy="words"
              direction="top"
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F5EFE5]"
            />

            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#A3A3A3]">
              When an inquiry arrives, our automations route the lead, trigger WhatsApp or Slack alerts, update your CRM, and log next steps without anyone copying and pasting data.
            </p>

            {/* Stats Grid */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { num: 10, suffix: "x", label: "Faster Lead Processing" },
                { num: 40, suffix: "%", label: "Higher Conversion Rate" },
                { num: 80, suffix: "%", label: "Less Manual Work" },
                { staticVal: "24/7", label: "Automated Operations" },
              ].map((stat) => (
                <SpotlightCard
                  key={stat.label}
                  theme="dark"
                  spotlightColor="rgba(45, 95, 199, 0.2)"
                  className="!p-4 sm:!p-5 !rounded-2xl border border-white/[0.08] bg-[#141414]"
                >
                  <div className="relative z-10">
                    <div
                      className="text-2xl sm:text-3xl font-bold tracking-tight"
                      style={{ color: "#E8B62A" }}
                    >
                      {stat.staticVal ? (
                        stat.staticVal
                      ) : (
                        <>
                          <CountUp to={stat.num!} duration={2} />
                          {stat.suffix}
                        </>
                      )}
                    </div>
                    <div className="mt-1 text-xs sm:text-sm font-medium text-[#A3A3A3]">
                      {stat.label}
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          {/* Right Column: One-by-One On-Scrolling Card Stack */}
          <div className="lg:col-span-7">
            <ScrollStack
              useWindowScroll={true}
              stackPosition={112}
              itemStackDistance={22}
              itemDistance={140}
              itemScale={0.025}
              baseScale={0.86}
              onActiveCardChange={setActiveCard}
              innerClassName="pb-12"
            >
              {steps.map((step, i) => {
                const isTopCard = i === activeCard;
                return (
                  <ScrollStackItem
                    key={step.code}
                    itemClassName="rounded-3xl transition-transform duration-150 ease-out"
                  >
                    <div
                      className={`w-full rounded-3xl p-6 sm:p-8 md:p-9 border transition-colors duration-300 shadow-[0_-14px_40px_rgba(0,0,0,0.75)] ${
                        isTopCard
                          ? "bg-[#141414] border-[#2D5FC7]/60"
                          : "bg-[#111111] border-white/[0.08]"
                      }`}
                    >
                      {/* Top Header Row (Remains visible as cards stack over each other) */}
                      <div className="flex items-center justify-between pb-5 border-b border-white/[0.07]">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                              isTopCard ? "bg-[#2D5FC7]" : "bg-white/25"
                            }`}
                          />
                          <span className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#F5EFE5]">
                            {step.label}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#F5EFE5]">
                          {step.icon}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="pt-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#F5EFE5] tracking-tight">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>
        </div>
      </div>
    </section>
  );
}
