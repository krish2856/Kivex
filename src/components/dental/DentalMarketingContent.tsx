"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

interface DentalMarketingContentProps {
  onBack?: () => void;
}

const PINTEREST_EMBED = "https://assets.pinterest.com/ext/embed.html?id=";

interface Module {
  id: string;
  num: string;
  badge: string;
  badgeClass: string;
  fact: string;
  byLine: string;
  title: [string, string];
  dockTag: string;
  dockTitle: string;
  dockSub: string;
  dockCta: string;
  eyebrow: string;
  heading: string;
  copy: string;
  points: [string, string][];
  cta: string;
  media: "poster" | "pinterest" | "youtube";
  mediaId?: string;
  mediaLabel: string;
  sourceUrl?: string;
}

const modules: Module[] = [
  {
    id: "automated-social-post",
    num: "01",
    badge: "PILLAR 04",
    badgeClass: "text-blue-700 bg-blue-50 border-blue-200",
    fact: "Antigravity intelligence + Buffer automated scheduling across all platforms",
    byLine: "Social Automation by",
    title: ["Automated Social Posts", "That Fill Chairs"],
    dockTag: "AUTO.",
    dockTitle: "Social Media Automation",
    dockSub: "Antigravity AI • Buffer Publishing",
    dockCta: "Launch Social Engine",
    eyebrow: "PILLAR 04 • SOCIAL MEDIA AUTOMATION",
    heading: "Automated Content & Publishing System",
    copy: "We build an automated social media content system for the clinic. Antigravity acts as the intelligence layer generating captions, dental educational content, promotional creatives, and content calendars, while Buffer handles automated multi-platform scheduling.",
    points: [
      ["AI Content & Captions:", "Antigravity generates post ideas, educational dental explainers, and promotional creatives."],
      ["Buffer Publishing Workflow:", "Queues and automates posts across Instagram, Facebook, LinkedIn, and Twitter."],
      ["Direct WhatsApp Link:", "Transforms every post into an instant patient consultation and chair booking."],
    ],
    cta: "Explore Social Calendar",
    media: "poster",
    mediaLabel: "Antigravity by Google • AI Engine",
  },
  {
    id: "reels-with-model",
    num: "02",
    badge: "PILLAR 06",
    badgeClass: "text-rose-600 bg-rose-50 border-rose-200",
    fact: "High-retention vertical reels, smile reveals & promotional creatives",
    byLine: "Cinema Production by",
    title: ["Reels with Models", "That Build Desire"],
    dockTag: "REEL.",
    dockTitle: "Aspirational Model Shoots",
    dockSub: "9:16 Vertical • 4K HDR",
    dockCta: "Schedule Model Shoot",
    eyebrow: "PILLAR 06 • REELS & PROMOTIONAL CREATIVES",
    heading: "Real Models That Dissolve Patient Fear",
    copy: "Patients don't buy medical drills or surgical titanium; they buy the confidence of an irresistible smile. We produce professional reels, patient stories, and clinic videos that dissolve treatment fears and drive inquiries.",
    points: [
      ["Professional On-Camera Talent:", "Takes the burden off busy clinic staff and doctors."],
      ["High-Retention 9:16 Editing:", "Hook, reveal and CTA engineered for the algorithm."],
      ["Ready To Post:", "Delivered finished for Instagram, Facebook and YouTube Shorts."],
    ],
    cta: "Book Clinic Model Session",
    media: "pinterest",
    mediaId: "600315825367067723",
    mediaLabel: "Reel With Model",
    sourceUrl: "https://in.pinterest.com/pin/600315825367067723/",
  },
  {
    id: "small-interview-podcast",
    num: "03",
    badge: "PILLAR 06",
    badgeClass: "text-purple-600 bg-purple-50 border-purple-200",
    fact: "Doctor-led educational content and trust-building interviews",
    byLine: "Clinical Authority by",
    title: ["Doctor Interviews", "& Podcasts"],
    dockTag: "MIC.",
    dockTitle: "Interviews & Micro-Podcasts",
    dockSub: "Captioned • Studio Audio",
    dockCta: "Schedule Doctor Podcast",
    eyebrow: "PILLAR 06 • EDUCATIONAL DENTAL CONTENT",
    heading: "Podcasts That Convert Hesitation",
    copy: "Patients delay needed dental treatment because of fear of pain and fear of cost. In short interviews and podcasts, your doctors explain treatments with calm, authoritative clarity.",
    points: [
      ["Studio-Grade Audio:", "Recorded in your office in under 30 minutes."],
      ["Captioned Cuts:", "Reaches the viewers who watch without sound."],
      ["Objection Busting:", "Answers \"Does it hurt?\" and \"Is it worth it?\"."],
    ],
    cta: "View Podcast Episodes",
    media: "pinterest",
    mediaId: "1031394752189076989",
    mediaLabel: "Doctor Interview & Podcast",
    sourceUrl: "https://in.pinterest.com/pin/1031394752189076989/",
  },
  {
    id: "overviews-of-clinic",
    num: "04",
    badge: "PILLAR 06",
    badgeClass: "text-emerald-600 bg-emerald-50 border-emerald-200",
    fact: "Cinematic clinic overviews, operatory tours & brand assets",
    byLine: "Clinic Films by",
    title: ["Dental Hospital", "Overviews"],
    dockTag: "4K.",
    dockTitle: "Architectural Drone & Gimbal",
    dockSub: "Lounge • Operatory Suites",
    dockCta: "Book Clinic Film",
    eyebrow: "PILLAR 06 • CLINIC PRESTIGE & BRAND ASSETS",
    heading: "Tours That Justify Premium Fees",
    copy: "Patients who perceive a clinic as pristine and advanced don't haggle on price. Our cinematic overviews highlight your reception, operatory suites, sterilisation and diagnostic technology.",
    points: [
      ["4K Gimbal & Drone:", "Smooth, cinema-grade walkthroughs."],
      ["Trust Signals:", "Shows hygiene, technology and comfort."],
      ["One Film, Many Uses:", "Website, Google profile and ads."],
    ],
    cta: "Book Clinic Film",
    media: "youtube",
    mediaId: "yA3opAOaMck",
    mediaLabel: "Dental Hospital Overview",
    sourceUrl: "https://www.youtube.com/watch?v=yA3opAOaMck",
  },
];

function MediaFrame({ m, onOpen }: { m: Module; onOpen?: () => void }) {
  if (m.media === "youtube") {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] border border-slate-800">
        <iframe
          src={`https://www.youtube.com/embed/${m.mediaId}`}
          title={m.mediaLabel}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  if (m.media === "poster") {
    return (
      <div
        onClick={onOpen}
        className="relative w-full max-w-[380px] aspect-square rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] flex flex-col items-center justify-between text-center overflow-hidden group cursor-pointer"
      >
        {/* Subtle ambient gradient backglow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-transparent to-amber-50/40 pointer-events-none" />

        {/* Top Meta Header */}
        <div className="relative z-10 w-full flex items-center justify-between pb-3 border-b border-slate-100 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Agent System
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold border border-slate-200">
            Antigravity Architecture
          </span>
        </div>

        {/* Center Real Antigravity Icon & Branding */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-2xl mb-3 group-hover:scale-105 transition-transform duration-300 border-2 border-slate-100 bg-[#081B4E]">
            <Image
              src="/dental/antigravity-engine.png"
              alt="Antigravity by Google DeepMind"
              width={426}
              height={382}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] flex items-center justify-center gap-1.5">
              <span className="font-extrabold text-[#0F172A]">Antigravity</span>
              <span className="font-normal text-slate-500 text-xs sm:text-sm">by Google</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#2D5FC7] font-bold mt-1">
              AGENTIC CLINICAL MARKETING &amp; RETENTION
            </div>
            <p className="mt-2 text-xs text-slate-500 max-w-[270px] mx-auto leading-relaxed">
              Autonomous AI agent infrastructure orchestrating patient recall pipelines, 5-star Google review triggers, and local dental visibility.
            </p>
          </div>
        </div>

        {/* Bottom Specs Ribbon */}
        <div className="relative z-10 w-full pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#2D5FC7]" />
            Autonomous Pipeline
          </span>
          <span className="text-slate-400">100% HIPAA Safe</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[280px] sm:w-[320px] rounded-[44px] bg-[#0A0A0A] p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] border-4 border-slate-700/80">
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20" />
      <div className="relative rounded-[34px] overflow-hidden bg-black border border-slate-800">
        <iframe
          src={`${PINTEREST_EMBED}${m.mediaId}`}
          title={m.mediaLabel}
          loading="lazy"
          allowFullScreen
          className="w-full h-[560px] border-0 bg-white"
        />
      </div>
    </div>
  );
}

export default function DentalMarketingContent({ onBack }: DentalMarketingContentProps) {
  const { openProjectModal } = useProjectModal();

  return (
    <div className="relative w-full bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex items-center justify-between border-b border-black/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2D5FC7] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-800">
            MARKETING CONTENT SUITE &bull; 4 FULL PRODUCTION MODULES
          </span>
        </div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-1.5 rounded-full border border-black bg-black text-white hover:bg-[#2D5FC7] hover:border-[#2D5FC7] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>&larr;</span>
            <span>Back to Clinical Operations</span>
          </button>
        )}
      </div>

      {modules.map((m, i) => {
        const flipped = i % 2 === 1;
        return (
          <section
            key={m.id}
            id={m.id}
            className={`py-14 md:py-16 ${i < modules.length - 1 ? "border-b border-black/[0.08]" : ""}`}
          >
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
                  {m.title[0]}
                  <br />
                  {(() => {
                    const words = m.title[1].split(" ");
                    const last = words.pop();
                    return (
                      <>
                        {words.length > 0 ? `${words.join(" ")} ` : ""}
                        <span className="text-[#2D5FC7]">{last}</span>
                      </>
                    );
                  })()}
                </motion.h2>
              </div>

              {/* Pill Dock */}
              <div className="flex justify-center mb-12 sm:mb-14">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2.5 p-1.5 rounded-2xl bg-[#1E1E1E] text-white shadow-xl border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center font-bold text-sm text-white">
                    {m.dockTag}
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-xs font-bold tracking-tight text-white">{m.dockTitle}</span>
                    <span className="hidden sm:inline text-[10px] font-mono text-slate-400">{m.dockSub}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openProjectModal()}
                    className="px-4 py-2 rounded-xl bg-[#A7F3D0] hover:bg-[#86EFAC] text-[#064E3B] text-xs font-bold tracking-tight transition-all shadow-xs cursor-pointer"
                  >
                    {m.dockCta}
                  </button>
                </motion.div>
              </div>

              {/* Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4">
                <div
                  className={`lg:col-span-6 flex flex-col items-start ${flipped ? "lg:order-2" : ""}`}
                >
                  <span className="text-[11px] font-mono tracking-widest text-[#2D5FC7] uppercase font-bold">
                    {m.eyebrow}
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                    {m.heading}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl font-normal">
                    {m.copy}
                  </p>

                  <div className="mt-8 space-y-3.5 text-xs sm:text-sm text-slate-700 w-full">
                    {m.points.map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 mt-1.5" />
                        <div className="flex-1 leading-relaxed">
                          <span className="font-bold text-slate-900">{k}: </span>
                          <span className="text-slate-600">{v}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => openProjectModal()}
                      className="px-6 py-3 rounded-full bg-[#0A0A0A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#2D5FC7] hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
                    >
                      {m.cta} &rarr;
                    </button>
                    {m.sourceUrl && (
                      <a
                        href={m.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:text-black underline"
                      >
                        Open original
                      </a>
                    )}
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 flex flex-col items-center ${flipped ? "lg:order-1" : ""}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="w-full flex justify-center"
                  >
                    <MediaFrame m={m} onOpen={openProjectModal} />
                  </motion.div>
                  <p className="mt-4 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    {m.mediaLabel}
                  </p>
                </div>
              </div>

              {onBack && i === modules.length - 1 && (
                <div className="mt-16 text-center">
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 rounded-full border border-slate-400 bg-white text-slate-800 hover:text-black hover:border-black text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                  >
                    &larr; Return to Clinical Operations Flow
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
