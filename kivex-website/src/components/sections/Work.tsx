"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
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
    "group relative flex flex-col gap-5 rounded-2xl overflow-hidden transition-all duration-500 border-2",
    project.comingSoon && "cursor-default",
    !project.comingSoon && "cursor-pointer",
    hovered ? "border-[#2D5FC7]" : "border-transparent"
  );

  const cardStyle = {
    backgroundColor: "#141414",
    transform: hovered
      ? `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`
      : "perspective(1000px) rotateY(0deg) rotateX(0deg)",
    transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease",
  };

  const cardContent = (
    <>
      <div className="relative h-[250px] md:h-[320px] overflow-hidden bg-gradient-to-br from-[#1E1E1E] to-[#0A0A0A]">
        <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[120px] md:text-[160px] font-bold leading-none transition-all duration-700" style={{ color: hovered ? "#2D5FC715" : "#FFFFFF08", transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}>
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 300">
            {[...Array(5)].map((_, i) => (
              <line key={i} x1="0" y1={60 + i * 50} x2="400" y2={60 + i * 50} stroke={hovered ? "#2D5FC7" : "#F5EFE5"} strokeWidth="0.5" strokeOpacity={hovered ? 0.4 : 0.1} />
            ))}
          </svg>
        </div>
        <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-500", hovered ? "opacity-100" : "opacity-0")} style={{ background: "radial-gradient(circle at center, rgba(45,95,199,0.15) 0%, transparent 70%)" }}>
          <span className="text-sm font-bold tracking-[0.2em] text-white/80 uppercase">{project.comingSoon ? "Soon" : "Explore"}</span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#2D5FC7" }}>{project.category}</span>
          {project.comingSoon && (
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: "#E8B62A15", color: "#E8B62A", border: "1px solid #E8B62A30" }}>Coming Soon</span>
          )}
          {project.featured && (
            <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: "#2D5FC715", color: "#2D5FC7", border: "1px solid #2D5FC730" }}>Featured</span>
          )}
        </div>

        <h3 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold leading-tight transition-colors duration-300" style={{ color: hovered ? "#2D5FC7" : "#FFFFFF" }}>
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed line-clamp-2" style={{ color: "#A3A3A3" }}>{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full px-3 py-1 text-[10px] font-medium transition-all duration-300" style={{ backgroundColor: hovered ? "#2D5FC715" : "#FFFFFF08", color: hovered ? "#2D5FC7" : "#737373" }}>
              {tech}
            </span>
          ))}
        </div>

        <div className={cn("mt-6 flex items-center gap-2 transition-all duration-300", project.comingSoon ? "opacity-100" : hovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2")}>
          <span className="text-sm font-semibold" style={{ color: project.comingSoon ? "#E8B62A" : "#2D5FC7" }}>
            {project.comingSoon ? "In Development →" : "View Project →"}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <ScrollReveal delay={index * 0.1} direction="up">
      <div ref={cardRef} className={cardClasses} style={cardStyle} data-cursor-project onMouseEnter={() => setHovered(true)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        {project.comingSoon ? (
          cardContent
        ) : (
          <a href={project.url || "#"} target="_blank" rel="noopener noreferrer" className="contents">
            {cardContent}
          </a>
        )}
      </div>
    </ScrollReveal>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={sectionRef} id="work" className="relative section-padding overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: "radial-gradient(circle, rgba(45,95,199,0.06) 0%, transparent 70%)" }} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#2D5FC7" }}>Portfolio</span>
        </ScrollReveal>
        <TextReveal text="SELECTED WORK" as="h2" className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "#F5EFE5" }} />
        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-lg max-w-xl" style={{ color: "#A3A3A3" }}>Digital systems built for performance, scale, and business impact.</p>
        </ScrollReveal>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
