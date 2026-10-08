"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface DeliveredProject {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  liveUrl: string;
  displayUrl: string;
  deliveryDays: string;
  status: string;
  description: string;
  rating: number;
  reviewCount: string;
  reviewSource: string;
  testimonial: string;
  client: {
    name: string;
    role: string;
    credentials: string;
    avatarInitials: string;
    avatarBg: string;
  };
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  browserPreview: {
    headline: string;
    italicPart: string;
    bottomHeadline: string;
    specialtyBadge: string;
    metricBadge: string;
    accentColor: string;
    image?: string;
  };
}

const deliveredProjects: DeliveredProject[] = [
  {
    id: "aastharealty",
    name: "Aastha Realty",
    subtitle: "Premium Real Estate Portal • Ahmedabad • GIFT City • Dholera SIR • Dubai",
    location: "A-104, Revati Plaza, Nikol, Ahmedabad",
    liveUrl: "https://www.aastharealty.in/",
    displayUrl: "aastharealty.in",
    deliveryDays: "Official Kivex Client",
    status: "LIVE IN PRODUCTION",
    description:
      "A flagship luxury real estate portal engineered by Kivex Technology for Aastha Realty. Powers multi-city property showcases across Ahmedabad (Nikol), GIFT City financial hub, Dholera Special Investment Region (SIR), and Dubai. Features 1-tap WhatsApp lead intake, automated property valuation requests, digital RERA documentation, and high-velocity mobile discovery.",
    rating: 5.0,
    reviewCount: "450+ Verified Client Deals",
    reviewSource: "Google Verified Real Estate Review",
    testimonial:
      "“Kivex Technology completely transformed our digital presence. From our local Ahmedabad and Nikol developments to international investors in Dubai and GIFT City, our buyers experience a world-class platform with instant WhatsApp connectivity. Our lead inquiries and site tour bookings have reached record highs.”",
    client: {
      name: "Aastha Realty Team",
      credentials: "RERA Registered Advisory",
      role: "Lead Brokerage & Investment Advisory",
      avatarInitials: "AR",
      avatarBg: "bg-[#0b1c3e]",
    },
    technologies: [
      "Next.js & Modern Web",
      "WhatsApp Business API",
      "Cloudflare Global CDN",
      "Automated Valuation Forms",
      "Virtual Tour Video Engine",
      "Multi-Hub Portfolio Engine",
      "Google SEO Architecture",
    ],
    metrics: [
      { label: "Active Markets", value: "4 Hubs" },
      { label: "Mobile Load Speed", value: "1.8s" },
      { label: "WhatsApp Lead Flow", value: "3.8x" },
    ],
    browserPreview: {
      headline: "Find Your",
      italicPart: "Perfect Property with",
      bottomHeadline: "Aastha Realty",
      specialtyBadge: "AHMEDABAD • GIFT CITY • DUBAI",
      metricBadge: "100% Verified RERA",
      accentColor: "from-amber-50 to-orange-100/70 border-amber-200/60 text-amber-800",
      image: "/realestate/aastha-website-desktop.png",
    },
  },
];

interface RealEstateTopProjectsProps {
  embedded?: boolean;
}

export default function RealEstateTopProjects({
  embedded = false,
}: RealEstateTopProjectsProps) {
  const { openProjectModal } = useProjectModal();

  return (
    <section
      id="our-live-projects"
      className={`bg-[#F5EFE5] text-[#0A0A0A] ${
        embedded ? "pt-6 pb-8 md:pb-12" : "py-14 md:py-16"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">


        {/* Monumental Headline */}
        <div className="text-center my-6 sm:my-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase"
          >
            Our Live Project and
            <br />
            Delivered <span className="text-[#2D5FC7]">Platform</span>
          </motion.h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
            Real client platform case study, live domain link, verified client review, delivered technology stack, and direct transaction volume.
          </p>
        </div>

        {/* Delivered Project Card (Aastha Realty) */}
        <div className="flex flex-col gap-12 sm:gap-16 pt-4">
          {deliveredProjects.map((currentProj, idx) => (
            <motion.div
              key={currentProj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-white border border-slate-300/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Card Top Banner: Status, Location, Live Link */}
              <div className="p-6 sm:p-8 bg-[#F8F7F4] border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-mono font-bold tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {currentProj.status}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    <strong className="text-slate-800">{currentProj.deliveryDays}</strong>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span className="text-xs font-mono text-slate-600">
                    {currentProj.location}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={currentProj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D5FC7] hover:bg-[#234ca1] text-white text-xs font-bold tracking-wider uppercase shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <span>Visit Live Website</span>
                    <span className="text-sm">↗</span>
                  </a>
                </div>
              </div>

              {/* Main Card Content: Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
                {/* Left Column: Live Browser Display Mockup */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#2D5FC7] font-bold">
                      DELIVERED CLIENT PLATFORM
                    </span>
                    <h3 className="mt-1 text-2xl font-black text-[#0F172A] tracking-tight">
                      {currentProj.name}
                    </h3>
                    <p className="mt-1 text-xs font-serif text-slate-500">
                      {currentProj.subtitle}
                    </p>

                    {/* Laptop Browser Mockup Frame */}
                    <div className="mt-6 rounded-2xl overflow-hidden bg-[#0A0A0A] p-2.5 shadow-xl border border-slate-800">
                      {/* Browser Address Bar */}
                      <div className="flex items-center justify-between px-2 pb-2 pt-1 border-b border-slate-800 text-[10px] font-mono text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                          <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                          <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                        </div>
                        <a
                          href={currentProj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="truncate max-w-[180px] text-slate-300 hover:text-white font-mono text-[9px] bg-slate-900 px-2 py-0.5 rounded"
                        >
                          https://{currentProj.displayUrl}
                        </a>
                        <span className="text-[9px] uppercase tracking-wider text-blue-400">SSL 🔒</span>
                      </div>

                      {/* Browser Interior Viewport */}
                      <div className="relative bg-[#0b1c3e] rounded-xl overflow-hidden text-white min-h-[220px] flex flex-col justify-between border border-slate-800">
                        {currentProj.browserPreview.image && (
                          <div className="relative w-full h-44 overflow-hidden">
                            <Image
                              src={currentProj.browserPreview.image}
                              alt={currentProj.name}
                              fill
                              className="object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c3e] via-transparent to-transparent" />
                          </div>
                        )}

                        <div className="p-3 bg-[#0b1c3e] border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-slate-300">
                          <span className="text-amber-300 font-bold">AHMEDABAD &bull; GIFT CITY &bull; DUBAI</span>
                          <span className="text-emerald-400 font-bold">★ 5.0 LIVE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct Link Anchor */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Live Domain:
                    </span>
                    <a
                      href={currentProj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-[#2D5FC7] hover:underline"
                    >
                      https://{currentProj.displayUrl} &rarr;
                    </a>
                  </div>
                </div>

                {/* Right Column: Delivered Details, Tech Stack, Review & Testimonial */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#2D5FC7] font-bold">
                      DELIVERY SPECIFICATIONS
                    </span>
                    <p className="mt-2 text-sm text-[#334155] leading-relaxed font-normal">
                      {currentProj.description}
                    </p>

                    {/* Delivered Impact Metrics Strip */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {currentProj.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3.5 rounded-2xl bg-[#F8F7F4] border border-slate-200/80 text-center"
                        >
                          <div className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-0.5 uppercase tracking-wide">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivered Technologies Badges */}
                    <div className="mt-6">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-2.5">
                        DELIVERED TECHNOLOGIES &amp; STACK
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentProj.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-mono font-semibold text-slate-700 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Verified Client Testimonial & Review Card */}
                  <div className="mt-8 pt-6 border-t border-slate-200/80 bg-gradient-to-br from-amber-50/40 via-white to-slate-50/40 p-5 rounded-2xl border border-amber-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-amber-400 text-sm">
                            ★
                          </span>
                        ))}
                        <span className="text-xs font-bold text-slate-900 ml-1">
                          {currentProj.rating}.0
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                        {currentProj.reviewSource}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-serif italic text-slate-700 leading-relaxed">
                      {currentProj.testimonial}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full ${currentProj.client.avatarBg} text-white font-bold text-xs flex items-center justify-center shadow-xs`}
                        >
                          {currentProj.client.avatarInitials}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                            <span>{currentProj.client.name}</span>
                            <span className="text-[10px] font-mono font-medium text-slate-500">
                              {currentProj.client.credentials}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {currentProj.client.role}
                          </div>
                        </div>
                      </div>

                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span>✓</span> Verified Client
                      </span>
                    </div>
                  </div>
                </div>
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
                  "We engineer and deploy complete, production-ready brokerage ecosystems in two weeks flat with daily staging updates.",
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
                  "Encrypted inquiry leads, SSL-verified routing, Cloudflare DDoS shielding, and automated daily backup routines.",
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
