"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Services from "@/components/sections/Services";
import Ecosystem from "@/components/sections/Ecosystem";
import Work from "@/components/sections/Work";
import Automation from "@/components/sections/Automation";
import Process from "@/components/sections/Process";
import WhyKivex from "@/components/sections/WhyKivex";
import About from "@/components/sections/About";
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

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />

      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <main
        className={`transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <Hero />
        <Introduction />
        <Services />
        <Ecosystem />
        <Work />
        <Automation />
        <Process />
        <WhyKivex />
        <About />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
