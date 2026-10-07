"use client";

import { useMemo } from "react";

const MARQUEE_ITEMS = [
  "WEBSITE",
  "CRM",
  "SAAS",
  "ANTIGRAVITY AI",
  "AUTOMATION",
  "CLOUD ARCHITECTURE",
  "MOBILE APPS",
  "DIGITAL SYSTEMS",
];

export default function ServiceMarqueeBar() {
  const repeatedItems = useMemo(
    () => [
      ...MARQUEE_ITEMS,
      ...MARQUEE_ITEMS,
      ...MARQUEE_ITEMS,
      ...MARQUEE_ITEMS,
    ],
    []
  );

  return (
    <div
      aria-label="Capabilities Marquee"
      className="relative w-full overflow-hidden bg-[#0A0A0A] py-3.5 sm:py-4 border-y border-white/[0.08] select-none z-10"
    >
      {/* Edge gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />

      {/* Slow endless scrolling loop */}
      <div className="animate-marquee-slow">
        {repeatedItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="inline-flex items-center shrink-0 px-4 sm:px-6 md:px-8"
          >
            <span className="text-xs sm:text-[13px] font-black font-mono tracking-[0.22em] uppercase text-white/90 hover:text-white transition-colors">
              {item}
            </span>
            <span className="ml-4 sm:ml-6 md:ml-8 w-1.5 h-1.5 rounded-full bg-[#2D5FC7] shrink-0 shadow-[0_0_8px_#2D5FC7]" />
          </div>
        ))}
      </div>
    </div>
  );
}
