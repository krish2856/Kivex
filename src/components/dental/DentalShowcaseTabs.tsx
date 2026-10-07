"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DentalProblemSolution from "@/components/dental/DentalProblemSolution";
import DentalWebsiteConverts from "@/components/dental/DentalWebsiteConverts";
import DentalTopProjects from "@/components/dental/DentalTopProjects";

export type ShowcaseTabId = "how-its-done" | "template-website" | "live-project";

interface TabItem {
  id: ShowcaseTabId;
  number: string;
  label: string;
  fullLabel: string;
}

const tabs: TabItem[] = [
  {
    id: "how-its-done",
    number: "1.",
    label: "HOW IT'S DONE",
    fullLabel: "1. HOW IT'S DONE",
  },
  {
    id: "template-website",
    number: "2.",
    label: "TEMPLATE WEBSITE",
    fullLabel: "2. TEMPLATE WEBSITE",
  },
  {
    id: "live-project",
    number: "3.",
    label: "CLIENT LIVE PROJECT",
    fullLabel: "3. CLIENT LIVE PROJECT",
  },
];

export default function DentalShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<ShowcaseTabId>("how-its-done");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sync with URL hash if present on load or hash change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#how-its-done" || hash === "#how-we-do-it") {
        setActiveTab("how-its-done");
      } else if (hash === "#template-website" || hash === "#website") {
        setActiveTab("template-website");
      } else if (hash === "#live-project" || hash === "#projects") {
        setActiveTab("live-project");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);

  const handleTabChange = (tabId: ShowcaseTabId) => {
    if (tabId === activeTab) return;
    setActiveTab(tabId);

    // Update URL hash smoothly
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${tabId}`);
    }

    // Scroll up to showcase section if scrolled down past it
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < 0) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handlePrev = () => {
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    handleTabChange(tabs[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    handleTabChange(tabs[nextIdx].id);
  };

  return (
    <div ref={sectionRef} id="showcase-tabs" className="relative w-full bg-[#F5EFE5]">
      {/* Sticky Changing Bar Dock matching screenshot reference */}
      <div className="sticky top-16 sm:top-20 z-40 py-4 sm:py-6 px-4 bg-[#F5EFE5]/90 backdrop-blur-md border-b border-black/[0.08] transition-all duration-300">
        <div className="flex justify-center items-center">
          <div
            role="tablist"
            aria-label="Dental Section Showcase Views"
            className="relative inline-flex items-center p-1 sm:p-1.5 rounded-full border border-black/15 bg-[#F5EFE5] shadow-sm max-w-full overflow-x-auto no-scrollbar"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(tab.id)}
                  className="relative px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer select-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="changingBarActivePill"
                      className="absolute inset-0 bg-[#2D5FC7] rounded-full z-0 shadow-sm"
                      transition={{ type: "spring", stiffness: 480, damping: 36 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-slate-800 hover:text-black"
                    }`}
                  >
                    {tab.fullLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Content Views */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {activeTab === "how-its-done" && (
            <motion.div
              key="how-its-done"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <DentalProblemSolution embedded />
            </motion.div>
          )}

          {activeTab === "template-website" && (
            <motion.div
              key="template-website"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <DentalWebsiteConverts embedded />
            </motion.div>
          )}

          {activeTab === "live-project" && (
            <motion.div
              key="live-project"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <DentalTopProjects embedded hidePagination />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Unified Minimalist Awwwards Pagination Strip matching screenshot */}
      <div className="pb-16 sm:pb-24 pt-4 flex justify-center items-center gap-3 text-xs font-mono text-slate-500">
        <button
          type="button"
          onClick={handlePrev}
          className="hover:text-black transition-colors uppercase font-semibold cursor-pointer px-2 py-1"
        >
          &larr; PREV
        </button>
        <span className="w-12 h-[1px] bg-slate-400" />
        <span className="font-bold text-slate-900 tracking-wider">
          0{currentIndex + 1} / 03
        </span>
        <span className="w-12 h-[1px] bg-slate-400" />
        <button
          type="button"
          onClick={handleNext}
          className="hover:text-black transition-colors uppercase font-semibold cursor-pointer px-2 py-1"
        >
          NEXT &rarr;
        </button>
      </div>
    </div>
  );
}
