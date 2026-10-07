"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Services from "@/components/sections/Services";
import Ecosystem from "@/components/sections/Ecosystem";
import ServiceMarqueeBar from "@/components/sections/ServiceMarqueeBar";
import Automation from "@/components/sections/Automation";
import Process from "@/components/sections/Process";
import Technologies from "@/components/sections/Technologies";
import WhyKivex from "@/components/sections/WhyKivex";
import Work from "@/components/sections/Work";
import ClientStories from "@/components/sections/ClientStories";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

const LoadingScreen = dynamic(
  () => import("@/components/ui/LoadingScreen"),
  { ssr: false }
);

import { ProjectModalProvider } from "@/context/ProjectModalContext";
import ProjectModal from "@/components/ui/ProjectModal";

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <ProjectModalProvider>
      <SmoothScroll>
        <CustomCursor />

        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

        <main
          id="main-content"
          className={`relative w-full overflow-x-clip transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Navbar />
          <Hero />
          <Introduction />
          <Services />
          <Ecosystem />
          <ServiceMarqueeBar />
          <Automation />
          <Process />
          <WhyKivex />
          <Technologies />
          <Work />
          <ClientStories />
          <FinalCTA />
          <Footer />
        </main>

        <ProjectModal />
      </SmoothScroll>
    </ProjectModalProvider>
  );
}
