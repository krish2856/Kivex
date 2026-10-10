"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

export default function DentalMarketingAutomation() {
  const { openProjectModal } = useProjectModal();

  return (
    <section className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Header Meta Bar with Creative Logo & Recall Fact */}
        {/* Massive Monumental Headline */}
        <div className="text-center my-6 sm:my-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase"
          >
            Automate Your
            <br />
            Clinic <span className="text-[#2D5FC7]">Marketing</span>
          </motion.h2>
        </div>

        {/* Floating Tool Card Dock below Title */}
        <div className="flex justify-center mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-2xl bg-[#141414] text-white shadow-2xl border border-white/10 ring-1 ring-white/5"
          >
            {/* Left AI Engine Badge */}
            <div className="flex items-center gap-2.5 pl-2 pr-3 sm:pr-4 border-r border-white/10">
              <div className="w-8 h-8 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center font-bold text-xs text-[#E8B62A]">
                AI.
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                  Automated Intelligence Stack
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A] animate-pulse" />
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Google &amp; WhatsApp Engine
                </span>
              </div>
            </div>

            {/* 6 Connected Tool Logos Card */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-2 py-1 rounded-xl bg-black/40 border border-white/10">
              {/* 1. Claude */}
              <div
                title="Claude (Anthropic)"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xs"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="#D97757">
                  <path d="M12 2a1.5 1.5 0 0 1 1.5 1.5v4.586l3.243-3.243a1.5 1.5 0 0 1 2.121 2.121l-3.243 3.243h4.586a1.5 1.5 0 0 1 0 3h-4.586l3.243 3.243a1.5 1.5 0 0 1-2.121 2.121L13.5 15.321V19.9a1.5 1.5 0 0 1-3 0v-4.579l-3.243 3.243a1.5 1.5 0 0 1-2.121-2.121l3.243-3.243H3.793a1.5 1.5 0 0 1 0-3h4.586L5.136 7.007a1.5 1.5 0 0 1 2.121-2.121l3.243 3.243V3.5A1.5 1.5 0 0 1 12 2z"/>
                </svg>
              </div>

              {/* 2. Buffer */}
              <div
                title="Buffer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xs text-white"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor">
                  <path d="M12 2L2 6.8l10 4.8 10-4.8L12 2zm0 7.2L4.5 12.8 12 16.4l7.5-3.6L12 9.2zm0 6.4L4.5 19.2 12 22.8l7.5-3.6L12 15.6z" />
                </svg>
              </div>

              {/* 3. Make.com */}
              <div
                title="Make.com"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xs"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none">
                  <path d="M3.5 17.5L8.5 6.5L12 13.5L15.5 6.5L20.5 17.5" stroke="#A855F7" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="13.5" r="1.5" fill="#E9D5FF"/>
                </svg>
              </div>

              {/* 4. WhatsApp */}
              <div
                title="WhatsApp"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xs"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>

              {/* 5. Google / Gemini */}
              <div
                title="Google Gemini"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xs"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="none">
                  <path d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z" fill="url(#gemini-star-grad-dental)" />
                  <defs>
                    <linearGradient id="gemini-star-grad-dental" x1="2" y1="2" x2="22" y2="22">
                      <stop stopColor="#4285F4" />
                      <stop offset="0.5" stopColor="#9B72CF" />
                      <stop offset="1" stopColor="#D96570" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* 6. OpenAI */}
              <div
                title="OpenAI"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xs"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="#10A37F">
                  <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.654a4.472 4.472 0 0 1 2.365-1.994V12.18a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.654zm16.597 3.855l-5.833-3.387L15.119 8a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.988V7.656a.08.08 0 0 1 .033-.061l4.83-2.791a4.5 4.5 0 0 1 6.665 4.686zM8.306 15.352l-2.015-1.163a.08.08 0 0 1-.038-.057V8.549a4.499 4.499 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681v6.737zm1.143-2.617l3.05-1.76 3.051 1.76v3.52l-3.05 1.76-3.051-1.76v-3.52z"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Split Grid (Specs + Google Antigravity Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4">
          {/* Left Column: Copy & Specs */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[11px] font-mono tracking-widest text-[#2D5FC7] uppercase font-bold">
              AI ASSISTANT &amp; AUTOMATED WORKFLOWS
            </span>
            <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              AI Practice Assistant &amp; Automation
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-normal">
              Give your clinic an AI-powered assistant connected directly to your systems. Using smart AI models for analysis and automated workflows for client messaging—your clinic analyzes patient trends, handles administrative reminders, alerts staff, and queues updates automatically.
            </p>

            <div className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-700 w-full">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Smart AI Assistant: </span>
                  <span className="text-slate-600">Reads CRM data, identifies appointment trends, helps with decisions, and drafts admin emails.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Automated Workflows: </span>
                  <span className="text-slate-600">Appointment confirmations, reminders, staff alerts, review requests &amp; follow-up notifications.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                <div className="flex-1 leading-relaxed">
                  <span className="font-bold text-slate-900">Social Engine: </span>
                  <span className="text-slate-600">Generates captions, educational dental posts &amp; calendars, scheduling content automatically.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openProjectModal()}
                className="px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#2D5FC7] hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
              >
                Explore Automation Engine &rarr;
              </button>
            </div>
          </div>

          {/* Right Column: Real Antigravity by Google Showcase Card */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() => openProjectModal()}
              className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-white border border-slate-200/90 p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.09)] flex flex-col items-center justify-between text-center overflow-hidden group cursor-pointer"
            >
              {/* Subtle ambient gradient backglow */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-transparent to-amber-50/40 pointer-events-none" />

              {/* Top Meta Header */}
              <div className="relative z-10 w-full flex items-center justify-between pb-3 border-b border-slate-100 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  AI Business Assistant
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                  Smart AI Engine
                </span>
              </div>

              {/* Center Real Antigravity Icon & Branding */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
                {/* Real Antigravity Icon Image */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden shadow-2xl mb-4 group-hover:scale-105 transition-transform duration-300 border-2 border-slate-100 bg-[#081B4E]">
                  <Image
                    src="/dental/antigravity-engine.png"
                    alt="Smart AI Practice Engine"
                    width={426}
                    height={382}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Typography: Smart AI Assistant */}
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] flex items-center justify-center gap-1.5">
                    <span className="font-extrabold text-[#0F172A]">Smart AI</span>
                    <span className="font-normal text-slate-500 text-sm sm:text-base">Assistant</span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#2D5FC7] font-bold mt-1">
                    AI BUSINESS ASSISTANT &amp; AUTOMATION
                  </div>
                  <p className="mt-2 text-xs text-slate-500 max-w-[270px] mx-auto leading-relaxed">
                    Connected AI layer reading CRM data, identifying patient trends, automating appointment follow-ups, and queueing social posts.
                  </p>
                </div>
              </div>

              {/* Bottom Specs Ribbon */}
              <div className="relative z-10 w-full pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#2D5FC7]" />
                  Automated Reminders &amp; Sync
                </span>
                <span className="text-slate-400">100% HIPAA Safe</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
