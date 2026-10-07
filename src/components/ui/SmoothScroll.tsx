"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import Lenis from "lenis";

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  easing?: (t: number) => number;
}

interface LenisContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement | number,
    options?: ScrollToOptions
  ) => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    queueMicrotask(() => {
      setLenisInstance(lenis);
    });

    // Global listener for smooth anchor link scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        if (href === "#" || href === "") {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.2 });
          return;
        }

        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          const offset = href === "#process" ? 0 : -80;
          lenis.scrollTo(element as HTMLElement, {
            offset,
            duration: 1.2,
          });
          history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: ScrollToOptions
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else if (typeof window !== "undefined") {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
