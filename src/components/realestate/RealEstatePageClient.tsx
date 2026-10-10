"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import RealEstateHero from "@/components/realestate/RealEstateHero";
import RealEstateProblemSolution from "@/components/realestate/RealEstateProblemSolution";
import RealEstateWebsiteConverts from "@/components/realestate/RealEstateWebsiteConverts";
import RealEstateCrmOperations from "@/components/realestate/RealEstateCrmOperations";
import RealEstateMarketingAutomation from "@/components/realestate/RealEstateMarketingAutomation";
import RealEstateRoiBanner from "@/components/realestate/RealEstateRoiBanner";
import RealEstateSelectedWebsites from "@/components/realestate/RealEstateSelectedWebsites";
import RealEstateBrandMaterials from "@/components/realestate/RealEstateBrandMaterials";
import RealEstateMarketingContent from "@/components/realestate/RealEstateMarketingContent";
import RealEstateTopProjects from "@/components/realestate/RealEstateTopProjects";
import RealEstateDualCards from "@/components/realestate/RealEstateDualCards";
import RealEstateFloatingBar, { type RealEstateTabId } from "@/components/realestate/RealEstateFloatingBar";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import SmoothScroll, { useLenis } from "@/components/ui/SmoothScroll";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import ProjectModal from "@/components/ui/ProjectModal";
import { AnimatePresence, motion } from "framer-motion";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function RealEstatePageClient() {
  const [activeTab, setActiveTab] = useState<RealEstateTabId>(() => {
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

          {/* Section 1: Real Estate Hero */}
          <RealEstateHero />

          {/* DYNAMIC SHOWCASE CONTAINER */}
          <div id="realestate-showcase-container" className="relative w-full">
            <AnimatePresence mode="wait">
              {activeTab === "how-its-done" && (
                <motion.div
                  key="how-its-done"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 1. How It's Done: From Brokerage Bottlenecks to Financial Return & Deal Revenue Projection */}
                  <RealEstateProblemSolution />
                  <RealEstateWebsiteConverts />
                  <RealEstateCrmOperations />
                  <RealEstateMarketingAutomation />
                  <RealEstateRoiBanner />
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
                  {/* 2. Brand & Physical Materials: 13 Services Showcase */}
                  <RealEstateBrandMaterials
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
                  {/* 3. Marketing Content: 4 Formats Showcase */}
                  <RealEstateMarketingContent
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
                  {/* 4. Template Website: Selected Websites Showcase */}
                  <RealEstateSelectedWebsites />
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
                  {/* 5. Our Live Project: Delivered Client Platforms */}
                  <RealEstateTopProjects />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 8: The Complete Single Real Estate Ecosystem */}
          <RealEstateDualCards
            onSelectBrandMaterials={handleSelectBrandMaterials}
            onSelectMarketingContent={handleSelectMarketingContent}
          />

          {/* Section 9: Final CTA */}
          <FinalCTA />

          {/* Section 10: Footer */}
          <Footer />

          {/* Persistent Floating Navigation Bar */}
          <RealEstateFloatingBar activeTab={activeTab} onTabChange={setActiveTab} />
        </main>

        <ProjectModal />
      </SmoothScroll>
    </ProjectModalProvider>
  );
}
