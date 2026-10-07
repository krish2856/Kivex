"use client";

import { useMemo } from "react";

const COUNTRIES_LIST_1 = [
  "SINGAPORE",
  "GERMANY",
  "FRANCE",
  "USA",
  "CANADA",
  "UK",
  "AUSTRALIA",
  "UAE",
  "NEW ZEALAND",
  "JAPAN",
  "SAUDI ARABIA",
  "SOUTH AFRICA",
  "IRELAND",
  "INDIA",
];

const COUNTRIES_LIST_2 = [
  "USA",
  "UK",
  "UAE",
  "SINGAPORE",
  "GERMANY",
  "AUSTRALIA",
  "CANADA",
  "JAPAN",
  "FRANCE",
  "INDIA",
  "IRELAND",
  "SAUDI ARABIA",
  "NEW ZEALAND",
  "SOUTH AFRICA",
];

export default function GlobalReachTicker() {
  // Duplicate arrays 4 times to ensure seamless infinite looping with -50% translation
  const row1Countries = useMemo(
    () => [...COUNTRIES_LIST_1, ...COUNTRIES_LIST_1, ...COUNTRIES_LIST_1, ...COUNTRIES_LIST_1],
    []
  );

  const row2Countries = useMemo(
    () => [...COUNTRIES_LIST_2, ...COUNTRIES_LIST_2, ...COUNTRIES_LIST_2, ...COUNTRIES_LIST_2],
    []
  );

  return (
    <section
      aria-label="Global Reach"
      className="relative w-full py-8 sm:py-10 md:py-12 overflow-hidden select-none"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full blur-[140px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(45,95,199,0.3) 0%, rgba(232,182,42,0.2) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Viewport Edge Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 md:w-52 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 md:w-52 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />

      {/* Dual Angled Ribbon Wrap */}
      <div className="relative py-2 sm:py-4 w-[108%] -ml-[4%] sm:w-[112%] sm:-ml-[6%] origin-center">
        {/* Ribbon 1: Cream background, tilted downward, scrolls LEFT */}
        <div className="relative z-10 -rotate-1 sm:-rotate-1.5 md:-rotate-2 transition-transform duration-300">
          <div className="bg-[#F5EFE5] text-[#0A0A0A] py-2.5 sm:py-3.5 shadow-xl shadow-black/40 border-y border-black/10 overflow-hidden">
            <div className="animate-marquee-left">
              {row1Countries.map((country, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="inline-flex items-center shrink-0 px-3 sm:px-4 md:px-5"
                >
                  <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest uppercase font-mono text-[#0A0A0A]">
                    {country}
                  </span>
                  <span className="ml-3 sm:ml-4 md:ml-5 text-[#2D5FC7] font-bold text-xs sm:text-sm md:text-base opacity-75">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ribbon 2: Crisp white background, tilted upward, scrolls RIGHT, overlapping Ribbon 1 */}
        <div className="relative z-10 rotate-1 sm:rotate-1.5 md:rotate-2 -mt-3.5 sm:-mt-5 md:-mt-6 transition-transform duration-300">
          <div className="bg-white text-[#0A0A0A] py-2.5 sm:py-3.5 shadow-2xl shadow-black/60 border-y border-black/10 overflow-hidden">
            <div className="animate-marquee-right">
              {row2Countries.map((country, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="inline-flex items-center shrink-0 px-3 sm:px-4 md:px-5"
                >
                  <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest uppercase font-mono text-[#0A0A0A]">
                    {country}
                  </span>
                  <span className="ml-3 sm:ml-4 md:ml-5 text-[#E8B62A] font-bold text-xs sm:text-sm md:text-base opacity-90">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
