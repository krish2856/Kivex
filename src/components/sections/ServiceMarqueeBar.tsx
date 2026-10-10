"use client";

import React from "react";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity/ScrollVelocity";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";

const MARQUEE_ITEMS = [
  "WEBSITES",
  "CUSTOM CRM",
  "SAAS APPS",
  "AI AUTOMATION",
  "WHATSAPP FLOWS",
  "CLOUD HOSTING",
  "MOBILE APPS",
  "CUSTOM SOFTWARE",
];

export default function ServiceMarqueeBar() {
  const primaryRow = (
    <div className="inline-flex items-center">
      {MARQUEE_ITEMS.map((item) => (
        <div
          key={`primary-${item}`}
          className="group inline-flex items-center shrink-0 px-5 sm:px-7 md:px-9"
        >
          <span className="text-xs sm:text-sm md:text-[15px] font-black font-mono tracking-[0.22em] uppercase text-[#F5EFE5]">
            <DecryptedText
              text={item}
              speed={25}
              maxIterations={6}
              animateOn="hover"
              className="text-[#F5EFE5] group-hover:text-white transition-colors"
              encryptedClassName="text-[#2D5FC7]"
            />
          </span>
          <span className="ml-10 sm:ml-14 md:ml-18 w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 shadow-[0_0_10px_#2D5FC7]" />
        </div>
      ))}
    </div>
  );

  const secondaryRow = (
    <div className="inline-flex items-center">
      {[...MARQUEE_ITEMS].reverse().map((item) => (
        <div
          key={`secondary-${item}`}
          className="inline-flex items-center shrink-0 px-5 sm:px-7 md:px-9"
        >
          <span className="text-xs sm:text-sm md:text-[15px] font-black font-mono tracking-[0.22em] uppercase text-[#F5EFE5]">
            {item}
          </span>
          <span className="ml-10 sm:ml-14 md:ml-18 w-2 h-2 rounded-full bg-[#F5EFE5]/70 shrink-0" />
        </div>
      ))}
    </div>
  );

  return (
    <div
      aria-label="Capabilities Marquee"
      className="relative w-full overflow-hidden bg-[#F5EFE5] py-8 sm:py-12 md:py-14 select-none z-10"
    >
      {/* Back Ribbon: Brand Blue Counter-Scrolling Band (+1.6deg tilt) */}
      <div className="relative -mx-8 bg-[#2D5FC7] py-3 sm:py-3.5 rotate-[1.6deg] translate-y-2 opacity-95 shadow-lg border-y border-white/15">
        <ScrollVelocity
          texts={[secondaryRow]}
          velocity={-60}
          damping={45}
          stiffness={380}
          numCopies={5}
          velocityMapping={{ input: [0, 900], output: [0, 5] }}
          skewOnScroll={true}
        />
      </div>

      {/* Front Ribbon: Obsidian Primary Band (-1.6deg tilt) */}
      <div className="relative -mx-8 bg-[#0A0A0A] py-3.5 sm:py-4 -rotate-[1.6deg] -translate-y-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)] border-y border-white/10">
        <ScrollVelocity
          texts={[primaryRow]}
          velocity={65}
          damping={45}
          stiffness={380}
          numCopies={5}
          velocityMapping={{ input: [0, 900], output: [0, 5] }}
          skewOnScroll={true}
        />
      </div>
    </div>
  );
}
