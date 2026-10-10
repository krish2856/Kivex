"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import DentalHero from "@/components/dental/DentalHero";
import DentalProblemSolution from "@/components/dental/DentalProblemSolution";
import DentalWebsiteConverts from "@/components/dental/DentalWebsiteConverts";
import DentalTopProjects from "@/components/dental/DentalTopProjects";
import DentalFloatingBar from "@/components/dental/DentalFloatingBar";
import DentalCrmOperations from "@/components/dental/DentalCrmOperations";
import DentalMarketingAutomation from "@/components/dental/DentalMarketingAutomation";
import DentalRoiBanner from "@/components/dental/DentalRoiBanner";
import DentalDualCards from "@/components/dental/DentalDualCards";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import ProjectModal from "@/components/ui/ProjectModal";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

import { useState, useEffect } from "react";
import DentalSelectedWebsites from "@/components/dental/DentalSelectedWebsites";
import DentalBrandMaterials from "@/components/dental/DentalBrandMaterials";
import DentalMarketingContent from "@/components/dental/DentalMarketingContent";
import { type DentalTabId } from "@/components/dental/DentalFloatingBar";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/components/ui/SmoothScroll";

export default function DentalPageClient() {
  const [activeTab, setActiveTab] = useState<DentalTabId>(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.toLowerCase();
      if (
        hash === "#template-website" ||
        hash === "#selected-websites" ||
        hash === "#templates" ||
        hash === "#websites"
      ) {
        return "template-website";
      } else if (
        hash === "#our-live-projects" ||
        hash === "#live-projects" ||
        hash === "#projects"
      ) {
        return "our-live-projects";
      } else if (
        hash === "#brand-materials" ||
        hash === "#brand-physical-materials" ||
        hash === "#brand" ||
        hash === "#materials"
      ) {
        return "brand-materials";
      } else if (
        hash === "#marketing-content" ||
        hash === "#marketing" ||
        hash === "#content"
      ) {
        return "marketing-content";
      }
    }
    return "how-its-done";
  });
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (
        hash === "#template-website" ||
        hash === "#selected-websites" ||
        hash === "#templates" ||
        hash === "#websites"
      ) {
        setActiveTab("template-website");
      } else if (
        hash === "#our-live-projects" ||
        hash === "#live-projects" ||
        hash === "#projects"
      ) {
        setActiveTab("our-live-projects");
      } else if (
        hash === "#brand-materials" ||
        hash === "#brand-physical-materials" ||
        hash === "#brand" ||
        hash === "#materials"
      ) {
        setActiveTab("brand-materials");
      } else if (
        hash === "#marketing-content" ||
        hash === "#marketing" ||
        hash === "#content"
      ) {
        setActiveTab("marketing-content");
      } else if (hash === "#how-its-done" || hash === "#how-we-do-it") {
        setActiveTab("how-its-done");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const scrollToShowcaseTop = () => {
    const doScroll = () => {
      const targetEl = document.getElementById("dental-showcase-container");
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

    doScroll();
    setTimeout(doScroll, 60);
    setTimeout(doScroll, 250);
  };

  const handleSelectBrandMaterials = () => {
    setActiveTab("brand-materials");
    if (typeof window !== "undefined") {
      history.replaceState(null, "", "#brand-materials");
    }
    scrollToShowcaseTop();
  };

  const handleSelectMarketingContent = () => {
    setActiveTab("marketing-content");
    if (typeof window !== "undefined") {
      history.replaceState(null, "", "#marketing-content");
    }
    scrollToShowcaseTop();
  };

  return (
    <ProjectModalProvider>
      <SmoothScroll>
        <CustomCursor />

        <main
          id="main-content"
          className="relative w-full overflow-x-hidden bg-[#F5EFE5] text-[#0A0A0A]"
        >
          {/* Main Global Navigation */}
          <Navbar />

          {/* Section 1: Dental Hero */}
          <DentalHero />

          {/* DYNAMIC SHOWCASE CONTAINER */}
          <div id="dental-showcase-container" className="relative w-full">
            <AnimatePresence mode="wait">
              {activeTab === "how-its-done" && (
                <motion.div
                  key="how-its-done"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 1. How It's Done: From Clinical Bottlenecks to Financial Return & Growth Projection */}
                  <DentalProblemSolution />
                  <DentalWebsiteConverts />
                  <DentalCrmOperations />
                  <DentalMarketingAutomation />
                  <DentalRoiBanner />
                </motion.div>
              )}

              {activeTab === "brand-materials" && (
                <motion.div
                  key="brand-materials"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 1. Brand & Physical Materials: 13 Services Showcase */}
                  <DentalBrandMaterials
                    onBack={() => {
                      setActiveTab("how-its-done");
                      scrollToShowcaseTop();
                    }}
                  />
                </motion.div>
              )}

              {activeTab === "marketing-content" && (
                <motion.div
                  key="marketing-content"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 2. Marketing Content: 4 Formats Showcase */}
                  <DentalMarketingContent
                    onBack={() => {
                      setActiveTab("how-its-done");
                      scrollToShowcaseTop();
                    }}
                  />
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
                  {/* 2. Template Website: Selected Websites Showcase (Gallery matching screenshot) */}
                  <DentalSelectedWebsites />
                </motion.div>
              )}

              {activeTab === "our-live-projects" && (
                <motion.div
                  key="our-live-projects"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 3. Client Live Projects: Active Pipeline & Rapid Onboarding */}
                  <DentalTopProjects />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 8: Join The Elite Dental Network */}
          <DentalDualCards
            onSelectBrandMaterials={handleSelectBrandMaterials}
            onSelectMarketingContent={handleSelectMarketingContent}
          />

          {/* Section 9: Let's Create READY TO BUILD WHAT'S NEXT? */}
          <FinalCTA />

          {/* Section 10: Footer */}
          <Footer />

          {/* Persistent Floating Changing Bar at Bottom Middle - Only in Dental Section */}
          <DentalFloatingBar activeTab={activeTab} onTabChange={setActiveTab} />
        </main>

        <ProjectModal />
      </SmoothScroll>
    </ProjectModalProvider>
  );
}
