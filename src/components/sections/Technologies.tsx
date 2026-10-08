"use client";

import { motion } from "framer-motion";

interface Technology {
  name: string;
  category: string;
  brandColor: string;
  icon: (color: string) => React.ReactNode;
}

const technologies: Technology[] = [
  {
    name: ".NET",
    category: "Backend & Enterprise",
    brandColor: "#512BD4",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" fill="#512BD4" />
        <path
          d="M14 28V20M20 28V20L28 28V20M34 20H30V28H34M30 24H33"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="24"
          y="38"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
          fontFamily="monospace"
        >
          CORE
        </text>
      </svg>
    ),
  },
  {
    name: "Flutter",
    category: "Cross-Platform Mobile",
    brandColor: "#02569B",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path d="M28 8L12 24L17 29L38 8H28Z" fill="#54C5F8" />
        <path d="M28 24L17 35L22 40L38 24H28Z" fill="#01579B" />
        <path d="M22 29L17 24L28 13H38L22 29Z" fill="#29B6F6" />
        <path d="M22 29L28 35H38L27.5 24.5L22 29Z" fill="#01579B" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: "React",
    category: "Frontend & Web Apps",
    brandColor: "#61DAFB",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="24" rx="18" ry="7" stroke="#61DAFB" strokeWidth="2" />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7"
          stroke="#61DAFB"
          strokeWidth="2"
          transform="rotate(60 24 24)"
        />
        <ellipse
          cx="24"
          cy="24"
          rx="18"
          ry="7"
          stroke="#61DAFB"
          strokeWidth="2"
          transform="rotate(120 24 24)"
        />
        <circle cx="24" cy="24" r="3" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Runtime & Microservices",
    brandColor: "#339933",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 6L40 15V33L24 42L8 33V15L24 6Z"
          fill="#339933"
        />
        <path
          d="M24 16C19.5 16 16 19.5 16 24C16 28.5 19.5 32 24 32C28.5 32 32 28.5 32 24H28C28 26.2 26.2 28 24 28C21.8 28 20 26.2 20 24C20 21.8 21.8 20 24 20C25.5 20 26.8 20.8 27.5 22H31.8C30.8 18.5 27.7 16 24 16Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "SQL Server",
    category: "Relational Database",
    brandColor: "#CC292B",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="12" rx="14" ry="5" fill="#E8B62A" opacity="0.9" />
        <path
          d="M10 12V24C10 26.8 16.3 29 24 29C31.7 29 38 26.8 38 24V12"
          stroke="#C99A1A"
          strokeWidth="2"
        />
        <ellipse cx="24" cy="24" rx="14" ry="5" fill="#E8B62A" opacity="0.6" />
        <path
          d="M10 24V36C10 38.8 16.3 41 24 41C31.7 41 38 38.8 38 36V24"
          stroke="#C99A1A"
          strokeWidth="2"
        />
        <ellipse cx="24" cy="36" rx="14" ry="5" fill="#E8B62A" opacity="0.3" />
      </svg>
    ),
  },
  {
    name: "Azure",
    category: "Cloud Infrastructure",
    brandColor: "#0078D4",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M17 10L9 36H19L27 10H17Z"
          fill="#0078D4"
        />
        <path
          d="M23 18L19 32L29 38L39 18H23Z"
          fill="#50E6FF"
          opacity="0.9"
        />
        <path
          d="M19 32H39L33 38H29L19 32Z"
          fill="#005A9E"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    category: "Containerization",
    brandColor: "#2496ED",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        {/* Containers */}
        <rect x="11" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="17" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="23" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="17" y="14" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="23" y="14" width="4" height="4" rx="0.5" fill="#2496ED" />
        <rect x="29" y="20" width="4" height="4" rx="0.5" fill="#2496ED" />
        {/* Whale Body */}
        <path
          d="M8 26C8 32 13 36 24 36C35 36 39 30 40 27C38 27 36 26.5 35 25.5C36 24 37 23 39 23C35 22 31 24 29 25H8V26Z"
          fill="#2496ED"
        />
        <circle cx="15" cy="30" r="1.5" fill="white" />
      </svg>
    ),
  },
  {
    name: "Angular",
    category: "Single-Page Framework",
    brandColor: "#DD0031",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path d="M24 6L8 12L10 34L24 42L38 34L40 12L24 6Z" fill="#DD0031" />
        <path d="M24 6V42L38 34L40 12L24 6Z" fill="#C3002F" />
        <path
          d="M24 13L16 30H19.5L21.2 26H26.8L28.5 30H32L24 13ZM25.5 23H22.5L24 19.5L25.5 23Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "AI, Automation & Scripting",
    brandColor: "#3776AB",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <path
          d="M23.5 8C16 8 16 11 16 11V16H24V17.5H13C9 17.5 7 20 7 24.5C7 29 10 30 13 30H15V26.5C15 23 18 21.5 21.5 21.5H27C29 21.5 31 19.5 31 17.5V11.5C31 9.5 29 8 23.5 8Z"
          fill="#3776AB"
        />
        <circle cx="19.5" cy="11.5" r="1.2" fill="white" />
        <path
          d="M24.5 40C32 40 32 37 32 37V32H24V30.5H35C39 30.5 41 28 41 23.5C41 19 38 18 35 18H33V21.5C33 25 30 26.5 26.5 26.5H21C19 26.5 17 28.5 17 30.5V36.5C17 38.5 19 40 24.5 40Z"
          fill="#FFD43B"
        />
        <circle cx="28.5" cy="36.5" r="1.2" fill="#0A0A0A" />
      </svg>
    ),
  },
  {
    name: "WordPress",
    category: "CMS & Editorial",
    brandColor: "#21759B",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" fill="#21759B" />
        <circle cx="24" cy="24" r="15" stroke="white" strokeWidth="1.5" />
        <path
          d="M14 24C14 29 17.5 33 22 34L16 17C14.7 19 14 21.4 14 24ZM31.5 23C31.5 21 30.8 19.5 30 18C28.8 16 27.5 16 26.5 16C25.5 16 24 16.5 24 16.5L28.5 33C31 31 31.5 26.5 31.5 23ZM23.5 25L20 34C21.3 34.5 22.6 35 24 35C24.8 35 25.6 34.8 26.4 34.5L23.5 25Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    category: "Orchestration & DevOps",
    brandColor: "#326CE5",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <polygon
          points="24,8 38,16 38,32 24,40 10,32 10,16"
          fill="#326CE5"
        />
        <circle cx="24" cy="24" r="5" fill="white" />
        <line x1="24" y1="13" x2="24" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="19" x2="28" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="29" x2="28" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="35" x2="24" y2="29" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="29" x2="20" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="19" x2="20" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "AWS",
    category: "Cloud Compute & Storage",
    brandColor: "#FF9900",
    icon: () => (
      <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
        <text
          x="24"
          y="23"
          textAnchor="middle"
          fill="#232F3E"
          fontSize="13"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          aws
        </text>
        <path
          d="M13 28C19 32 29 32 35 28"
          stroke="#FF9900"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M34 26L36.5 28.5L33.5 30.5"
          fill="#FF9900"
        />
      </svg>
    ),
  },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      className="relative px-5 sm:px-6 md:px-8 py-20 sm:py-24 md:py-28 overflow-hidden rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[48px] border-t border-black/[0.06] shadow-[0_-25px_50px_rgba(0,0,0,0.25)]"
      style={{ backgroundColor: "#F5EFE5" }}
    >
      {/* Subtle ambient spotlight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(45,95,199,0.2) 0%, rgba(232,182,42,0.15) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">


          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0A]"
          >
            Technologies We Use
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3.5 text-sm sm:text-base text-black/60 max-w-xl mx-auto leading-relaxed"
          >
            Battle-tested frameworks, cloud infrastructure, and modern databases
            selected for rapid execution and dependable scale.
          </motion.p>
        </div>

        {/* 6-Column Grid (clean non-selectable showcase display cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-center bg-white/75 hover:bg-white border border-black/[0.06] hover:border-black/15 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 select-none cursor-default"
            >
              {/* Tech Icon */}
              <div className="relative mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {tech.icon(tech.brandColor)}
              </div>

              {/* Tech Name */}
              <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] tracking-tight transition-colors">
                {tech.name}
              </span>

              {/* Tech Category Subtitle */}
              <span className="text-[10px] text-black/45 tracking-wide text-center mt-1 truncate max-w-full px-1">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
