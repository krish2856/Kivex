"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-dark/80 backdrop-blur-md text-white shadow-lg"
            : "bg-transparent text-dark"
        )}
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a href="#" className="text-xl font-bold tracking-widest uppercase">
              KIVEX
            </a>

            {/* Desktop Links */}
            <div className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors duration-300 hover:text-blue",
                    scrolled ? "text-white/80 hover:text-white" : "text-dark/70 hover:text-dark"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20start%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300",
                  scrolled
                    ? "bg-blue text-white hover:bg-blue-light"
                    : "bg-blue text-white hover:bg-blue-dark"
                )}
              >
                Start a Project
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="flex flex-col items-center justify-center gap-[5px] md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <span className="block h-[2px] w-6 bg-current transition-all duration-300" />
              <span className="block h-[2px] w-6 bg-current transition-all duration-300" />
              <span className="block h-[2px] w-4 bg-current transition-all duration-300 self-end" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-dark flex flex-col items-center justify-center transition-all duration-500 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="2" y1="2" x2="18" y2="18" />
            <line x1="18" y1="2" x2="2" y2="18" />
          </svg>
        </button>

        {/* Links */}
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-4xl font-bold tracking-wide text-white transition-all duration-500 hover:text-blue",
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
              style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/917041888899?text=Hi%20Kivex%20Technology%2C%20I%20want%20to%20start%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-4 rounded-full bg-blue px-8 py-3.5 text-lg font-semibold text-white transition-all duration-500 hover:bg-blue-light",
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 80}ms` : "0ms",
            }}
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
          </a>
        </div>
      </div>
    </>
  );
}
