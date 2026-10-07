"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectArchitectureBanner from "@/components/ui/ProjectArchitectureBanner";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(pointer: fine)").matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const cardClasses = cn(
    "group relative flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-500 border-2 w-full",
    project.comingSoon ? "cursor-default" : "cursor-pointer",
    hovered ? "border-[#2D5FC7] shadow-[0_0_30px_rgba(45,95,199,0.2)]" : "border-white/[0.08]"
  );

  const cardStyle = {
    backgroundColor: "#141414",
    transform: hovered
      ? `perspective(1000px) rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 3}deg)`
      : "perspective(1000px) rotateY(0deg) rotateX(0deg)",
    transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const cardInner = (
    <>
      <div className="relative h-[190px] sm:h-[220px] lg:h-[240px] overflow-hidden bg-gradient-to-br from-[#1E1E1E] to-[#0A0A0A] border-b border-white/[0.06]">
        {/* Project Browser Mockup Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-7 bg-black/60 backdrop-blur-md border-b border-white/[0.06] px-3.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
          <span className="ml-2 text-[10px] font-mono text-white/40 truncate">
            {project.url ? project.url.replace("https://", "").replace(/\/$/, "") : `${project.title.toLowerCase().replace(/\s+/g, "")}.kivex.app`}
          </span>
        </div>

        {/* Real Project Preview Image or Stylized Graphic */}
        {project.image ? (
          <div
            className="absolute inset-0 pt-7 transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            {/* Smooth gradient blend into the card */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20 pointer-events-none" />
          </div>
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-[120px] md:text-[160px] font-bold leading-none transition-all duration-700"
                style={{
                  color: hovered ? "#2D5FC718" : "#FFFFFF08",
                  transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        )}

        {/* Hover Action Badge */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-500 z-10 pointer-events-none",
            hovered ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "radial-gradient(circle at center, rgba(45,95,199,0.25) 0%, rgba(10,10,10,0.6) 80%)",
          }}
        >
          <span className="px-4 py-2 rounded-full bg-[#2D5FC7] text-white text-xs font-bold tracking-widest uppercase shadow-lg shadow-[#2D5FC7]/40">
            {project.comingSoon ? "In Development" : "Explore Project →"}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-semibold tracking-widest uppercase font-mono"
              style={{ color: "#2D5FC7" }}
            >
              {project.category}
            </span>
            {project.comingSoon && (
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: "#E8B62A15",
                  color: "#E8B62A",
                  border: "1px solid #E8B62A30",
                }}
              >
                Coming Soon
              </span>
            )}
            {project.featured && !project.comingSoon && (
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#2D5FC7]/15 text-[#4A7AE8] border border-[#2D5FC7]/30 shadow-[0_0_12px_rgba(45,95,199,0.2)]"
              >
                ★ Top Project
              </span>
            )}
          </div>

          <h3
            className="mt-2.5 text-lg sm:text-xl font-bold leading-snug transition-colors duration-300"
            style={{ color: hovered ? "#4A7AE8" : "#FFFFFF" }}
          >
            {project.title}
          </h3>

          <p
            className="mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2"
            style={{ color: "#A3A3A3" }}
          >
            {project.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all duration-300"
                style={{
                  backgroundColor: hovered ? "#2D5FC715" : "#FFFFFF08",
                  color: hovered ? "#4A7AE8" : "#8A8A8A",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            className={cn(
              "mt-5 flex items-center gap-2 transition-all duration-300",
              project.comingSoon
                ? "opacity-100"
                : hovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-60 -translate-x-1"
            )}
          >
            <span
              className="text-xs sm:text-sm font-semibold"
              style={{ color: project.comingSoon ? "#E8B62A" : "#2D5FC7" }}
            >
              {project.comingSoon ? "In Development →" : "View Project →"}
            </span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      {project.comingSoon ? (
        <div
          ref={cardRef}
          className={cardClasses}
          style={cardStyle}
          data-cursor-project
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {cardInner}
        </div>
      ) : project.url?.startsWith("/") ? (
        <Link
          href={project.url}
          ref={cardRef as unknown as React.RefObject<HTMLAnchorElement>}
          className={cardClasses}
          style={cardStyle}
          data-cursor-project
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {cardInner}
        </Link>
      ) : (
        <a
          href={project.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          ref={cardRef as unknown as React.RefObject<HTMLAnchorElement>}
          className={cardClasses}
          style={cardStyle}
          data-cursor-project
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {cardInner}
        </a>
      )}
    </ScrollReveal>
  );
}

const CATEGORIES = [
  "Top 3 Projects",
  "All",
  "Real Estate",
  "Custom",
  "CRM",
] as const;

export default function Work() {
  const [activeCategory, setActiveCategory] = useState<string>("Top 3 Projects");
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const filteredProjects = (() => {
    if (activeCategory === "Top 3 Projects") {
      return projects.filter((p) => p.featured).slice(0, 3);
    }
    if (activeCategory === "All") return projects;
    return projects.filter(
      (p) =>
        (p.categories && p.categories.includes(activeCategory)) ||
        p.category === activeCategory
    );
  })();

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAllMobile(false);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-5 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-white/[0.08] shadow-[0_-25px_50px_rgba(0,0,0,0.3)]"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(45,95,199,0.06) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14 md:mb-16 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5FC7]/10 border border-[#2D5FC7]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7]" />
            <span
              className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#2D5FC7" }}
            >
              Selected Case Studies
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{ color: "#F5EFE5" }}
          >
            OUR WORK
          </h2>
          <p
            className="mt-3 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed text-[#A3A3A3]"
          >
            Digital systems built for performance, scale, and business impact.
          </p>
        </motion.div>

        {/* Solutions Architecture Diagram matching user sketch */}
        <ProjectArchitectureBanner />

        {/* Top Projects Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5FC7]/15 border border-[#2D5FC7]/30 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#4A7AE8]">
                Featured Portfolio
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F5EFE5]">
              Top Projects
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#A3A3A3] max-w-lg leading-relaxed">
              Explore our live client applications, verified production systems, and scalable digital platforms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:items-end gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border cursor-pointer",
                      isActive
                        ? "bg-[#2D5FC7] border-[#2D5FC7] text-white shadow-md shadow-[#2D5FC7]/30 scale-102"
                        : "bg-white/[0.04] border-white/10 text-white/70 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {cat === "Top 3 Projects" ? "★ Top 3 Projects" : cat}
                  </button>
                );
              })}
            </div>

            {/* Top "See More" / Mobile View Toggle Button */}
            {filteredProjects.length > 3 && (
              <div className="flex md:hidden items-center justify-between pt-1">
                <span className="text-[11px] font-mono text-[#A3A3A3]">
                  {showAllMobile
                    ? `Showing all ${filteredProjects.length} projects`
                    : `Showing 3 of ${filteredProjects.length} projects`}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAllMobile(!showAllMobile)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2D5FC7]/15 text-[#4A7AE8] border border-[#2D5FC7]/30 hover:bg-[#2D5FC7]/25 transition-all cursor-pointer"
                >
                  <span>{showAllMobile ? "Show Top 3 ↑" : `View All (${filteredProjects.length}) ↓`}</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Projects Grid: 3 visible cards in one line on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className={cn(
                !showAllMobile && i >= 3 ? "hidden md:block" : "block"
              )}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom "See More" Button for Mobile */}
        {filteredProjects.length > 3 && (
          <div className="mt-8 flex md:hidden flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-[#141414] hover:bg-[#1A1A1A] text-white border border-white/10 hover:border-[#2D5FC7]/40 shadow-lg shadow-black/40 transition-all duration-300 cursor-pointer"
            >
              <span>
                {showAllMobile
                  ? "Show Fewer Projects ↑"
                  : `See More Projects (${filteredProjects.length - 3} more) ↓`}
              </span>
            </button>
            <span className="text-[11px] font-mono text-white/40">
              Tap to view full portfolio on mobile
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
