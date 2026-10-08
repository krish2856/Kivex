"use client";

import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

interface DentalTopProjectsProps {
  embedded?: boolean;
  hidePagination?: boolean;
}

export default function DentalTopProjects({
  embedded = false,
  hidePagination = false,
}: DentalTopProjectsProps = {}) {
  const { openProjectModal } = useProjectModal();



  const deliveryGuarantees = [
    {
      number: "01",
      title: "14-Day Delivery SLA",
      description:
        "We engineer and deploy complete, production-ready dental ecosystems in two weeks flat with daily staging updates.",
    },
    {
      number: "02",
      title: "100% Custom Engineering",
      description:
        "Zero cookie-cutter WordPress bloat or slow builders. Powered by ultra-fast Next.js, TypeScript, and modern edge CDN hosting.",
    },
    {
      number: "03",
      title: "HIPAA Compliant & Secure",
      description:
        "Encrypted patient records, SSL-verified routing, and secure cloud intake forms that keep clinic and patient data protected.",
    },
    {
      number: "04",
      title: "Dedicated Engineering Support",
      description:
        "90 days of complimentary engineering maintenance, speed audits, and continuous conversion optimization after launch.",
    },
  ];

  const launchMilestones = [
    {
      step: "01",
      name: "Clinical Discovery & Architecture",
      days: "Days 1–3",
      detail: "Practice analysis, service breakdown, booking funnel design, and technical wireframing.",
    },
    {
      step: "02",
      name: "Custom 3D & Mobile Development",
      days: "Days 4–10",
      detail: "Pixel-perfect frontend build, 3D anatomical visualizers, interactive forms, and CRM integration.",
    },
    {
      step: "03",
      name: "HIPAA Audit, Training & Launch",
      days: "Days 11–14",
      detail: "Security penetration testing, staff portal training, DNS cutover, and public deployment.",
    },
  ];

  return (
    <section id="top-projects" className="py-14 md:py-20 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Monumental Headline */}

        {/* Monumental Headline */}
        <div className="text-center my-6 sm:my-10">


          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase"
          >
            Client Live <span className="text-[#2D5FC7]">Projects</span>
          </motion.h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Our custom client dental platforms are currently undergoing private staging, HIPAA compliance verification, and clinical EMR integrations prior to public deployment.
          </p>
        </div>

        {/* Hero Spotlight: Become The Next Featured Client */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-14 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] text-white p-8 sm:p-12 border border-slate-700/60 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2D5FC7]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">


              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase leading-tight">
                Launch Your Clinic’s <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300">
                  Custom Live Platform
                </span>
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                We accept only <strong>2 dental practices per month</strong> to maintain dedicated engineering focus, rapid 14-day turnaround, and bespoke territorial exclusivity.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>14-Day Rapid Turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Zero Generic Templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Full HIPAA Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
                  <span>Exclusive Zip Code Territory</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 p-6 sm:p-8 rounded-2xl w-full max-w-md">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-slate-700">
                  <span>DEPLOYMENT SLOT</span>
                  <span className="text-emerald-400 font-bold">1 SLOT AVAILABLE</span>
                </div>

                <div className="my-4">
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Custom Clinic Build
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete front desk triage, 3D interactive models, mobile booking & AI patient recall.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#2D5FC7] hover:bg-[#234ca1] text-white font-bold text-sm tracking-wide uppercase shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Reserve Clinic Deployment</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>

                <p className="mt-3 text-[11px] text-center text-slate-400">
                  Includes free consultation & technical architecture roadmap.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section: Delivery SLA Guarantees */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-black/[0.08]">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#2D5FC7] uppercase">
              DELIVERY STANDARDS
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight uppercase mt-2">
              What Every Client Live Project Receives
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Rigorous engineering guarantees backed by written SLAs and post-launch maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryGuarantees.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-300/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-[#2D5FC7]/40 font-mono">
                    {item.number}
                  </span>
                  <h4 className="mt-2 text-base font-bold text-[#0F172A] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: 3-Step Milestone Roadmap */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-white border border-slate-300/80 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold tracking-widest text-[#2D5FC7] uppercase">
              DEVELOPMENT TIMELINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight uppercase mt-1">
              How A Client Project Goes Live
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {launchMilestones.map((m, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-[#F8F7F4] border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-full bg-[#2D5FC7] text-white flex items-center justify-center font-bold text-xs font-mono">
                      {m.step}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#2D5FC7] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
                      {m.days}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#0F172A] tracking-tight">
                    {m.name}
                  </h4>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-mono text-center sm:text-left">
              Ready to begin your practice roadmap? Schedule an introductory consultation today.
            </div>

            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-6 py-2.5 rounded-full bg-[#0F172A] hover:bg-[#2D5FC7] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              Start Your Project &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
