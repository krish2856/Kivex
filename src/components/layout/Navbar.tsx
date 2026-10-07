"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { services } from "@/data/services";
import { useLenis } from "@/components/ui/SmoothScroll";
import { useProjectModal } from "@/context/ProjectModalContext";
import Logo from "@/components/ui/Logo";

const workPlatforms = [
  {
    title: "Custom Platform",
    subtitle: "Custom Guidelines, Architecture Specs & Info",
    href: "/custom",
    badge: "CUSTOM ENGINE",
    badgeColor: "text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/20",
    accentHover: "hover:border-[#38BDF8]/50 hover:bg-[#38BDF8]/5",
  },
  {
    title: "Dental Website",
    subtitle: "Clinical Operations & Patient Funnel",
    href: "/dental",
    badge: "HEALTHCARE",
    badgeColor: "text-[#93C5FD] bg-[#93C5FD]/10 border-[#93C5FD]/20",
    accentHover: "hover:border-[#2563EB]/50 hover:bg-[#2563EB]/5",
  },
  {
    title: "Real Estate",
    subtitle: "Luxury Portals & Property Engines",
    href: "/realestate",
    badge: "PROPERTY",
    badgeColor: "text-[#FDE68A] bg-[#FDE68A]/10 border-[#FDE68A]/20",
    accentHover: "hover:border-[#D97706]/50 hover:bg-[#D97706]/5",
  },
  {
    title: "CRM / SaaS",
    subtitle: "High-Concurrency Platform & Engine",
    href: "/saas",
    badge: "SOFTWARE",
    badgeColor: "text-[#C084FC] bg-[#C084FC]/10 border-[#C084FC]/20",
    accentHover: "hover:border-[#A855F7]/50 hover:bg-[#A855F7]/5",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const workTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { lenis, scrollTo } = useLenis();
  const { openProjectModal } = useProjectModal();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
      const scrollPos = window.scrollY + 160;

      if (window.scrollY < 80) {
        setActiveSection("");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [mobileOpen, lenis]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (mobileOpen) setMobileOpen(false);
      setServicesDropdownOpen(false);
      setWorkDropdownOpen(false);

      if (href === "#" || href === "") {
        if (typeof window !== "undefined" && window.location.pathname !== "/") {
          router.push("/");
          return;
        }
        scrollTo(0, { duration: 1.2 });
      } else {
        const target = document.querySelector(href);
        if (target) {
          const offset = href === "#process" ? 0 : -80;
          scrollTo(target as HTMLElement, { offset, duration: 1.2 });
          history.pushState(null, "", href);
        } else {
          router.push(`/${href}`);
        }
      }
    }
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 180);
  };

  const handleWorkMouseEnter = () => {
    if (workTimeoutRef.current) clearTimeout(workTimeoutRef.current);
    setWorkDropdownOpen(true);
  };

  const handleWorkMouseLeave = () => {
    workTimeoutRef.current = setTimeout(() => {
      setWorkDropdownOpen(false);
    }, 180);
  };

  return (
    <>
      <header>
        <nav
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            scrolled
              ? "bg-[#0A0A0A]/90 backdrop-blur-md text-white shadow-lg shadow-black/10 border-b border-white/[0.06]"
              : "bg-transparent text-dark"
          )}
          aria-label="Main navigation"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <a
                href="#"
                onClick={(e) => handleNavClick(e, "#")}
                className="transition-transform duration-300 hover:scale-105 shrink-0 flex items-center py-1"
                aria-label="Kivex Technology - Home"
              >
                <Logo className="h-7 sm:h-8 md:h-9 w-auto drop-shadow-sm" />
              </a>

              {/* Desktop Links (All Sections) */}
              <div className="hidden items-center gap-3 lg:gap-5 xl:gap-7 md:flex">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  const isServices = link.label === "Services";

                  if (isServices) {
                    return (
                      <div
                        key={link.label}
                        className="relative py-2"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={cn(
                            "inline-flex items-center gap-1 text-xs lg:text-sm font-medium tracking-tight lg:tracking-wide transition-all duration-300 relative py-1",
                            isActive
                              ? "text-[#2D5FC7] font-semibold"
                              : scrolled
                                ? "text-white/75 hover:text-white"
                                : "text-dark/70 hover:text-[#2D5FC7]"
                          )}
                        >
                          {link.label}
                          <svg
                            className={cn(
                              "w-3.5 h-3.5 transition-transform duration-300",
                              servicesDropdownOpen ? "rotate-180 text-[#2D5FC7]" : "opacity-60"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>

                          {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#2D5FC7]" />
                          )}
                        </a>

                        {/* Dropdown Bar Showing A to Z Services */}
                        <AnimatePresence>
                          {servicesDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="absolute top-full -left-28 sm:-left-36 w-[640px] lg:w-[700px] pt-3 z-50"
                            >
                              <div className="rounded-2xl border border-white/[0.12] bg-[#0C0D12]/98 backdrop-blur-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-[#F5EFE5] overflow-hidden">
                                {/* 3-Column Categorized A to Z Directory Grid */}
                                <div className="grid grid-cols-3 gap-5 text-left">
                                  {/* Col 1: Web & Applications */}
                                  <div>
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#2D5FC7] mb-2 flex items-center gap-1.5">
                                      <span>WEB &amp; PLATFORMS</span>
                                    </div>
                                    <ul className="space-y-1">
                                      {services[0]?.services.map((item) => (
                                        <li key={item.name}>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              handleNavClick(e, "#services");
                                            }}
                                            className="w-full text-left text-xs py-1 px-1.5 rounded text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
                                          >
                                            <span className="truncate">{item.name}</span>
                                            <span className="text-[10px] text-white/0 group-hover:text-[#4A7AE8] transition-colors">
                                              →
                                            </span>
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Col 2: AI & Automation */}
                                  <div>
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#E8B62A] mb-2 flex items-center gap-1.5">
                                      <span>AI &amp; AUTOMATION</span>
                                    </div>
                                    <ul className="space-y-1">
                                      {services[1]?.services.map((item) => (
                                        <li key={item.name}>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              handleNavClick(e, "#services");
                                            }}
                                            className="w-full text-left text-xs py-1 px-1.5 rounded text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
                                          >
                                            <span className="truncate">{item.name}</span>
                                            <span className="text-[10px] text-white/0 group-hover:text-[#E8B62A] transition-colors">
                                              →
                                            </span>
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Col 3: Marketing & Cloud Infrastructure */}
                                  <div>
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#4A7AE8] mb-2 flex items-center gap-1.5">
                                      <span>MARKETING &amp; CLOUD</span>
                                    </div>
                                    <ul className="space-y-1">
                                      {services[3]?.services.slice(0, 3).map((item) => (
                                        <li key={item.name}>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              handleNavClick(e, "#services");
                                            }}
                                            className="w-full text-left text-xs py-1 px-1.5 rounded text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
                                          >
                                            <span className="truncate">{item.name}</span>
                                            <span className="text-[10px] text-white/0 group-hover:text-[#4A7AE8] transition-colors">
                                              →
                                            </span>
                                          </button>
                                        </li>
                                      ))}
                                      {services[4]?.services.slice(0, 3).map((item) => (
                                        <li key={item.name}>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              handleNavClick(e, "#services");
                                            }}
                                            className="w-full text-left text-xs py-1 px-1.5 rounded text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
                                          >
                                            <span className="truncate">{item.name}</span>
                                            <span className="text-[10px] text-white/0 group-hover:text-[#4A7AE8] transition-colors">
                                              →
                                            </span>
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                {/* Dropdown Quick Action Footer */}
                                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-end text-xs">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setServicesDropdownOpen(false);
                                      openProjectModal();
                                    }}
                                    className="font-semibold text-[#4A7AE8] hover:text-white transition-colors cursor-pointer"
                                  >
                                    Start a Project Brief →
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  if (link.label === "Work") {
                    return (
                      <div
                        key={link.label}
                        className="relative py-2"
                        onMouseEnter={handleWorkMouseEnter}
                        onMouseLeave={handleWorkMouseLeave}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={cn(
                            "inline-flex items-center gap-1 text-xs lg:text-sm font-medium tracking-tight lg:tracking-wide transition-all duration-300 relative py-1",
                            isActive
                              ? "text-[#2D5FC7] font-semibold"
                              : scrolled
                                ? "text-white/75 hover:text-white"
                                : "text-dark/70 hover:text-[#2D5FC7]"
                          )}
                        >
                          {link.label}
                          <svg
                            className={cn(
                              "w-3.5 h-3.5 transition-transform duration-300",
                              workDropdownOpen ? "rotate-180 text-[#2D5FC7]" : "opacity-60"
                            )}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>

                          {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#2D5FC7]" />
                          )}
                        </a>

                        {/* Dropdown Bar Showing 4 Core Work Platforms */}
                        <AnimatePresence>
                          {workDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                              className="absolute top-full -left-36 sm:-left-44 w-[540px] lg:w-[600px] pt-3 z-50"
                            >
                              <div className="rounded-2xl border border-white/[0.12] bg-[#0C0D12]/98 backdrop-blur-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-[#F5EFE5] overflow-hidden">
                                {/* 4 Work Cards Grid (2x2) */}
                                <div className="grid grid-cols-2 gap-3 text-left">
                                  {workPlatforms.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setWorkDropdownOpen(false)}
                                      className={cn(
                                        "p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] transition-all duration-200 group flex flex-col justify-between",
                                        item.accentHover
                                      )}
                                    >
                                      <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                          <span
                                            className={cn(
                                              "text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border uppercase",
                                              item.badgeColor
                                            )}
                                          >
                                            {item.badge}
                                          </span>
                                          <span className="text-xs text-white/40 group-hover:text-white transition-colors">
                                            ↗
                                          </span>
                                        </div>
                                        <div className="text-sm font-bold text-white group-hover:text-[#4A7AE8] transition-colors">
                                          {item.title}
                                        </div>
                                        <p className="text-[11px] text-white/50 mt-1 leading-relaxed line-clamp-2">
                                          {item.subtitle}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>

                                {/* Dropdown Footer */}
                                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-end text-xs">
                                  <a
                                    href="#work"
                                    onClick={(e) => {
                                      setWorkDropdownOpen(false);
                                      handleNavClick(e, "#work");
                                    }}
                                    className="font-semibold text-[#4A7AE8] hover:text-white transition-colors cursor-pointer"
                                  >
                                    View Full Work Section →
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        "text-xs lg:text-sm font-medium tracking-tight lg:tracking-wide transition-all duration-300 relative py-1",
                        isActive
                          ? "text-[#2D5FC7] font-semibold"
                          : scrolled
                            ? "text-white/75 hover:text-white"
                            : "text-dark/70 hover:text-[#2D5FC7]"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#2D5FC7]" />
                      )}
                    </a>
                  );
                })}
                
                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className={cn(
                    "rounded-full px-4 lg:px-6 py-2.5 text-xs lg:text-sm font-semibold transition-all duration-300 shrink-0 cursor-pointer",
                    scrolled
                      ? "bg-[#2D5FC7] text-white hover:bg-[#4A7AE8] hover:shadow-[0_0_20px_rgba(45,95,199,0.4)]"
                      : "bg-[#2D5FC7] text-white hover:bg-[#1E3D8A]"
                  )}
                >
                  Start a Project
                </button>
              </div>

              {/* Mobile Hamburger */}
              <button
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 md:hidden w-11 h-11 rounded-full transition-all duration-300 focus:outline-none shrink-0",
                  scrolled
                    ? "bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/15"
                    : "bg-[#F5EFE5] hover:bg-black/5 text-[#0A0A0A] border border-black/10 shadow-xs"
                )}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <span className="block h-[2px] w-5 rounded-full bg-current transition-all duration-300" />
                <span className="block h-[2px] w-5 rounded-full bg-current transition-all duration-300" />
                <span className="block h-[2px] w-5 rounded-full bg-current transition-all duration-300" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col items-center justify-start transition-all duration-500 md:hidden px-6 py-8 overflow-y-auto",
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="2" y1="2" x2="18" y2="18" />
            <line x1="18" y1="2" x2="2" y2="18" />
          </svg>
        </button>

        {/* Mobile Menu Logo */}
        <div className="mb-4 pt-4">
          <Logo className="h-9 w-auto" />
        </div>

        {/* Links */}
        <div className="flex flex-col items-center gap-4 py-4 w-full max-w-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            const isServices = link.label === "Services";
            const isWork = link.label === "Work";

            if (isServices) {
              return (
                <div key={link.label} className="w-full text-center">
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={link.href}
                      className={cn(
                        "text-2xl font-bold tracking-wide transition-all duration-300",
                        isActive ? "text-[#2D5FC7]" : "text-white hover:text-[#2D5FC7]"
                      )}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                      aria-label="Toggle all capabilities list"
                    >
                      <span className="text-[11px] font-mono">Directory</span>
                      <svg
                        className={cn("w-3 h-3 transition-transform duration-300", mobileServicesOpen && "rotate-180")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Expandable Mobile Services Directory */}
                  {mobileServicesOpen && (
                    <div className="mt-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-left max-h-48 overflow-y-auto">
                      <span className="text-[10px] font-mono text-[#4A7AE8] uppercase tracking-wider block mb-2 font-bold">
                        Complete Capabilities Index
                      </span>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {services.flatMap((s) => s.services).map((item) => (
                          <button
                            key={item.name}
                            type="button"
                            onClick={(e) => handleNavClick(e, "#services")}
                            className="text-left py-1 text-white/70 hover:text-white truncate"
                          >
                            • {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (isWork) {
              return (
                <div key={link.label} className="w-full text-center">
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={link.href}
                      className={cn(
                        "text-2xl font-bold tracking-wide transition-all duration-300",
                        isActive ? "text-[#2D5FC7]" : "text-white hover:text-[#2D5FC7]"
                      )}
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                    <button
                      type="button"
                      onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#2D5FC7]/20 text-[#38BDF8] hover:bg-[#2D5FC7]/30 transition-colors"
                      aria-label="Toggle all work solutions list"
                    >
                      <span className="text-[11px] font-mono">4 Solutions</span>
                      <svg
                        className={cn("w-3 h-3 transition-transform duration-300", mobileWorkOpen && "rotate-180")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Expandable Mobile Work Solutions */}
                  {mobileWorkOpen && (
                    <div className="mt-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-left space-y-2">
                      <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider block mb-1 font-bold">
                        Core Platform Solutions
                      </span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {workPlatforms.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-between transition-colors"
                          >
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{item.title}</span>
                                <span className={cn("text-[9px] font-mono px-1.5 py-0.2 rounded border", item.badgeColor)}>
                                  {item.badge}
                                </span>
                              </div>
                              <div className="text-[11px] text-white/50">{item.subtitle}</div>
                            </div>
                            <span className="text-xs text-[#38BDF8]">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "text-2xl font-bold tracking-wide transition-all duration-300",
                  isActive ? "text-[#2D5FC7]" : "text-white hover:text-[#2D5FC7]"
                )}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}

          <button
            type="button"
            className="mt-4 w-full rounded-full bg-[#2D5FC7] px-8 py-3.5 text-base font-semibold text-white transition-all duration-500 hover:bg-[#4A7AE8] cursor-pointer"
            onClick={() => {
              setMobileOpen(false);
              openProjectModal();
            }}
          >
            Start a Project
          </button>
        </div>
      </div>
    </>
  );
}
