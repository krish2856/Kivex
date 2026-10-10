"use client";

import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "MODERN DENTAL WEBSITES",
  "PRACTICE CRM & OPERATIONS",
  "SMART PATIENT RECALLS",
  "WHATSAPP BOOKING WORKFLOWS",
  "SOCIAL & EDUCATIONAL CONTENT",
  "CLINIC BRANDING & ASSETS",
  "QR APPOINTMENTS & CHECK-IN",
  "LIVE CLINIC ANALYTICS",
];

export default function DentalMarqueeBar() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0A0A0A] py-3.5 border-y border-white/10 select-none z-20 shadow-lg">
      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-6 sm:gap-8 whitespace-nowrap will-change-transform"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <div key={index} className="flex items-center gap-5 sm:gap-7">
              <span className="text-xs sm:text-[13px] font-black font-mono tracking-[0.16em] uppercase text-white/90">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2D5FC7] shrink-0 shadow-[0_0_8px_#2D5FC7]" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
