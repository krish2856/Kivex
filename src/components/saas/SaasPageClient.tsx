"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import SaasHero from "@/components/saas/SaasHero";
import SaasProblemSolution from "@/components/saas/SaasProblemSolution";
import SaasCrmOperations from "@/components/saas/SaasCrmOperations";
import SaasRoiBanner from "@/components/saas/SaasRoiBanner";
import SaasSelectedWebsites from "@/components/saas/SaasSelectedWebsites";
import SaasTopProjects from "@/components/saas/SaasTopProjects";
import SaasFloatingBar, { type SaasTabId } from "@/components/saas/SaasFloatingBar";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import SmoothScroll, { useLenis } from "@/components/ui/SmoothScroll";
import { ProjectModalProvider } from "@/context/ProjectModalContext";
import ProjectModal from "@/components/ui/ProjectModal";
import { AnimatePresence, motion } from "framer-motion";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function SaasPageClient() {
  const [activeTab, setActiveTab] = useState<SaasTabId>(() => {
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
        hash === "#how-its-done" ||
        hash === "#how-we-do-it" ||
        hash === "#how-it-works"
      ) {
        setActiveTab("how-its-done");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
          <SaasHero />

          {/* DYNAMIC SHOWCASE CONTAINER */}
          <div id="saas-showcase-container" className="relative w-full">
            <AnimatePresence mode="wait">
              {activeTab === "how-its-done" && (
                <motion.div
                  key="how-its-done"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* 1. How We Do It: From Software Bottlenecks to Core Engine Operations & ROI Economics */}
                  <SaasProblemSolution />
                  <SaasCrmOperations />
                  <SaasRoiBanner />
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
                  {/* 2. Templates: Pre-Engineered SaaS & CRM Foundations */}
                  <SaasSelectedWebsites />
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
                  {/* 3. Our Live Project: Delivered Client Platforms */}
                  <SaasTopProjects />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Final CTA */}
          <FinalCTA />

          {/* Footer */}
          <Footer />

          {/* Persistent Floating Navigation Bar with 3 Tabs */}
          <SaasFloatingBar activeTab={activeTab} onTabChange={setActiveTab} />
        </main>

        <ProjectModal />
      </SmoothScroll>
    </ProjectModalProvider>
  );
}
