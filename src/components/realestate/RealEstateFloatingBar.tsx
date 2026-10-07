"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/components/ui/SmoothScroll";

export type RealEstateTabId =
  | "how-its-done"
  | "template-website"
  | "our-live-projects"
  | "brand-materials"
  | "marketing-content";

interface TabItem {
  id: RealEstateTabId;
  label: string;
}

interface RealEstateFloatingBarProps {
  activeTab?: RealEstateTabId;
  onTabChange?: (tab: RealEstateTabId) => void;
}

export default function RealEstateFloatingBar({
  activeTab: controlledActiveTab,
  onTabChange,
}: RealEstateFloatingBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<RealEstateTabId>("how-its-done");
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const isManualScroll = useRef(false);
  const { scrollTo } = useLenis();

  // All 5 tabs permanently visible in the floating navigation bar
  const tabs: TabItem[] = [
    {
      id: "how-its-done",
      label: "HOW IT'S DONE",
    },
    {
      id: "template-website",
      label: "TEMPLATE WEBSITE",
    },
    {
      id: "brand-materials",
      label: "BRAND MATERIALS",
    },
    {
      id: "marketing-content",
      label: "MARKETING CONTENT",
    },
    {
      id: "our-live-projects",
      label: "OUR LIVE PROJECT",
    },
  ];

  const handleTabClick = (tabId: RealEstateTabId) => {
    setInternalActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
    isManualScroll.current = true;

    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${tabId}`);
    }

    const doScrollToShowcase = () => {
      const targetEl = document.getElementById("realestate-showcase-container");
      if (targetEl) {
        const navHeight = 75;
        const rect = targetEl.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset - navHeight;
        window.scrollTo({ top: Math.max(0, absoluteTop), behavior: "smooth" });
        try {
          scrollTo(targetEl, { offset: -navHeight, duration: 0.8 });
        } catch {}
      }
    };

    doScrollToShowcase();
    setTimeout(doScrollToShowcase, 60);
    setTimeout(doScrollToShowcase, 250);

    setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none px-3 max-w-[calc(100vw-1.5rem)]"
    >
      <div
        role="tablist"
        aria-label="Real Estate Section Floating Navigation"
        className="pointer-events-auto relative inline-flex items-center p-1 sm:p-1.5 rounded-full border border-black bg-[#F5EFE5]/95 backdrop-blur-md shadow-[0_16px_40px_-10px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.12)] max-w-full overflow-x-auto no-scrollbar"
      >
        {/* Back Option to Home Work Section */}
        <Link
          href="/#work"
          className="relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer select-none text-slate-800 hover:text-black hover:bg-black/[0.06] flex items-center gap-1 sm:gap-1.5 mr-0.5 sm:mr-1 border-r border-black/15 pr-2.5 sm:pr-3.5"
          title="Back to Home Work Section"
        >
          <span className="text-xs sm:text-sm font-black">&larr;</span>
          <span>BACK</span>
        </Link>

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabClick(tab.id)}
              className="relative px-2.5 sm:px-3.5 md:px-4.5 lg:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="realestateFloatingBarActivePill"
                  className="absolute inset-0 bg-[#2D5FC7] rounded-full z-0 shadow-sm"
                  transition={{ type: "spring", stiffness: 480, damping: 36 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-white font-bold" : "text-slate-800 hover:text-black font-semibold"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
