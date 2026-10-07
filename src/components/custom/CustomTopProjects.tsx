"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface CustomDeliveredProject {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  liveUrl: string;
  displayUrl: string;
  status: string;
  description: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  isExternal: boolean;
}

const liveProjects: CustomDeliveredProject[] = [
  {
    id: "neobus",
    name: "NeoBus Mobility",
    subtitle: "High-Speed Bus Booking & Transit Fleet Engine",
    category: "Transit Tech & Fleet SaaS",
    liveUrl: "https://neobus.vercel.app/",
    displayUrl: "neobus.vercel.app",
    status: "LIVE IN PRODUCTION",
    description:
      "A high-concurrency bus booking and fleet tracking engine engineered by Kivex. Features instant route reservation, multi-branch agent dispatch, real-time docket telemetry, and automated passenger notifications.",
    technologies: ["React", "Node.js", "Vercel Cloud", "Real-Time Telemetry", "Multi-Branch RBAC"],
    metrics: [
      { label: "Response Time", value: "< 200ms" },
      { label: "Concurrency", value: "High Volume" },
      { label: "Fleet Tracking", value: "Real-Time" },
    ],
    image: "/projects/neobus.png",
    isExternal: true,
  },
  {
    id: "rcargo",
    name: "Rcargo Logistics",
    subtitle: "Freight Management & Live Dispatch Portal",
    category: "Logistics & Supply Chain",
    liveUrl: "https://rcargo.vercel.app/",
    displayUrl: "rcargo.vercel.app",
    status: "LIVE IN PRODUCTION",
    description:
      "A complete digital logistics platform engineered for freight operators. Replaces paper manifests with instant consignment logging, automated status tracking, fleet route coordination, and real-time transit telemetry.",
    technologies: ["React", "Node.js", "Tailwind CSS", "Vercel Cloud", "Real-time Telemetry"],
    metrics: [
      { label: "Paperless Ops", value: "100%" },
      { label: "Dispatch Speed", value: "< 2s" },
      { label: "Fleet Coverage", value: "Nationwide" },
    ],
    image: "/projects/rcargo-live.png",
    isExternal: true,
  },
  {
    id: "financetrack",
    name: "Sunrise Finance ERP",
    subtitle: "Lending Operations & Loan Management ERP",
    category: "Fintech & Lending ERP",
    liveUrl: "https://finance-ruby-one.vercel.app/login.html",
    displayUrl: "finance-ruby-one.vercel.app",
    status: "LIVE IN PRODUCTION",
    description:
      "An enterprise loan and credit management ERP engineered for private financers. Tracks 2,400+ active loans, manages daily/monthly EMI collections, automated borrower reminders, and generates visual portfolio reports.",
    technologies: ["HTML5", "CSS3", "JavaScript", "JWT Auth", "Client State Management"],
    metrics: [
      { label: "Active Loans", value: "2,400+" },
      { label: "Monthly Collections", value: "₹4.2 Cr" },
      { label: "System Uptime", value: "99.9%" },
    ],
    image: "/projects/financetrack-live.png",
    isExternal: true,
  },
  {
    id: "otherbooking",
    name: "OtherBooking",
    subtitle: "Automated Slot Reservation & Provider System",
    category: "Booking Engine & CRM",
    liveUrl: "https://otherbooking.vercel.app/",
    displayUrl: "otherbooking.vercel.app",
    status: "LIVE IN PRODUCTION",
    description:
      "A high-velocity appointment scheduling engine. Customers view live calendar slots, choose service providers, and secure appointments with instant automated email confirmations and zero double-booking.",
    technologies: ["React", "Tailwind CSS", "Vercel Edge", "Calendar Sync", "Email Automation"],
    metrics: [
      { label: "Booking Time", value: "< 45s" },
      { label: "Double Booking", value: "0%" },
      { label: "Mobile Share", value: "85%+" },
    ],
    image: "/projects/otherbooking-live.png",
    isExternal: true,
  },
  {
    id: "gym",
    name: "Gym Platform",
    subtitle: "Fitness Member Portal & Roster System",
    category: "Health & Fitness",
    liveUrl: "https://gym-alpha-peach.vercel.app/",
    displayUrl: "gym-alpha-peach.vercel.app",
    status: "LIVE IN PRODUCTION",
    description:
      "A modern fitness facility platform engineered for rapid member acquisition. Features tiered membership checkout, trainer class rosters, interactive schedules, and mobile-friendly onboarding.",
    technologies: ["React", "Tailwind CSS", "Vercel Cloud", "Dynamic Schedules"],
    metrics: [
      { label: "Checkout Funnel", value: "3 Steps" },
      { label: "Mobile First", value: "100%" },
      { label: "Class Schedules", value: "Live" },
    ],
    image: "/projects/gym-live.png",
    isExternal: true,
  },
];

export default function CustomTopProjects() {
  const { openProjectModal } = useProjectModal();

  return (
    <section id="our-live-projects" className="py-14 sm:py-20 md:py-24 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Curated Showcase Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-emerald-900 uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              PORTFOLIO &bull; PRODUCTION PROVEN
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase">
              Our Live <span className="text-[#2D5FC7]">Projects</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Explore our real, deployed digital platforms. Every build is engineered from scratch for verified business impact, sub-second speeds, and zero-compromise security.
            </p>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>Build Your Platform</span>
              <span className="text-sm">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Flagship Highlight: Rcargo Logistics */}
        <div className="mt-10 sm:mt-12">
          {liveProjects.slice(0, 1).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-200">
                        {project.status}
                      </span>
                      <span className="text-xs font-mono text-slate-400">&bull;</span>
                      <span className="text-xs font-mono text-slate-500 uppercase">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#2D5FC7] mt-0.5">
                      {project.subtitle}
                    </p>

                    <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 py-4 border-y border-slate-100">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-left">
                        <span className="block text-base sm:text-lg font-black text-slate-900">
                          {m.value}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target={project.isExternal ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D5FC7] hover:bg-[#234ca1] text-white text-xs font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer"
                    >
                      <span>VISIT LIVE PLATFORM</span>
                      <span className="text-sm">↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => openProjectModal()}
                      className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase transition-all border border-slate-300 cursor-pointer"
                    >
                      Request Similar Architecture
                    </button>
                  </div>
                </div>

                {/* Browser preview mockup */}
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-slate-800 shadow-2xl group">
                  <div className="h-8 bg-slate-900 px-3 flex items-center gap-1.5 border-b border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    <span className="ml-3 text-[10px] font-mono text-slate-400">
                      https://{project.displayUrl}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 5 Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {liveProjects.slice(1).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#2D5FC7]/40 transition-all duration-300 overflow-hidden group"
            >
              <div>
                {/* Browser bar & image */}
                <div className="relative aspect-[16/10] w-full bg-[#0A0A0A] overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-6 bg-black/60 backdrop-blur-xs px-2.5 flex items-center gap-1 z-10 border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-red-400/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-[9px] font-mono text-white/50 truncate">
                      {project.displayUrl}
                    </span>
                  </div>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover object-top pt-6 transition-transform duration-500 group-hover:scale-103"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#2D5FC7] font-bold">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#2D5FC7] transition-colors">
                    {project.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {project.subtitle}
                  </p>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={project.liveUrl}
                  target={project.isExternal ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                >
                  <span>VISIT LIVE SITE</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

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
            {[
              {
                number: "01",
                title: "14-Day Delivery SLA",
                description:
                  "We engineer and deploy complete, production-ready digital platforms in two weeks flat with daily staging updates.",
              },
              {
                number: "02",
                title: "100% Custom Engineering",
                description:
                  "Zero cookie-cutter WordPress bloat or slow builders. Powered by ultra-fast Next.js, TypeScript, and modern edge CDN hosting.",
              },
              {
                number: "03",
                title: "Enterprise Cloud & Security",
                description:
                  "Encrypted user sessions, SSL-verified routing, high-concurrency cloud databases, and automated daily backup routines.",
              },
              {
                number: "04",
                title: "Dedicated Engineering Support",
                description:
                  "90 days of complimentary engineering maintenance, speed audits, and continuous conversion optimization after launch.",
              },
            ].map((item, idx) => (
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
      </div>
    </section>
  );
}
