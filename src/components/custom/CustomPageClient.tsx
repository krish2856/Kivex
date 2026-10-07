"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import SmoothScroll, { useLenis } from "@/components/ui/SmoothScroll";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import ProjectModal from "@/components/ui/ProjectModal";

import CustomHero from "@/components/custom/CustomHero";
import CustomPlanningPhase from "@/components/custom/CustomPlanningPhase";
import CustomBuildingPhase from "@/components/custom/CustomBuildingPhase";
import CustomImprovingPhase from "@/components/custom/CustomImprovingPhase";
import CustomSelectedWebsites from "@/components/custom/CustomSelectedWebsites";
import CustomBrandMaterials from "@/components/custom/CustomBrandMaterials";
import CustomMarketingContent from "@/components/custom/CustomMarketingContent";
import CustomTopProjects from "@/components/custom/CustomTopProjects";
import CustomDualCards from "@/components/custom/CustomDualCards";
import CustomFloatingBar, { type CustomTabId } from "@/components/custom/CustomFloatingBar";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function CustomPageClient() {
  const [activeTab, setActiveTab] = useState<CustomTabId>(() => {
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
      const targetEl = document.getElementById("custom-showcase-container");
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

          {/* Section 1: Hero */}
          <CustomHero />

          {/* DYNAMIC SHOWCASE CONTAINER */}
          <div id="custom-showcase-container" className="relative w-full">
            <AnimatePresence mode="wait">
              {activeTab === "how-its-done" && (
                <motion.div
                  key="how-its-done"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 3 Dedicated Sections on How It's Done: Planning -> Building with UI/UX & AI -> Improving */}
                  <CustomPlanningPhase />
                  <CustomBuildingPhase />
                  <CustomImprovingPhase />
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
                  <CustomBrandMaterials
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
                  <CustomMarketingContent
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
                  <CustomSelectedWebsites />
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
                  <CustomTopProjects />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section: Ecosystem Dual Cards */}
          <CustomDualCards
            onSelectBrandMaterials={handleSelectBrandMaterials}
            onSelectMarketingContent={handleSelectMarketingContent}
          />

          {/* Section: Final CTA */}
          <FinalCTA />

          {/* Section: Footer */}
          <Footer />

          {/* Persistent Floating Bar at Bottom Middle */}
          <CustomFloatingBar activeTab={activeTab} onTabChange={setActiveTab} />
        </main>

        <ProjectModal />
      </SmoothScroll>
    </ProjectModalProvider>
  );
}
