"use client";

import { motion } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";

export interface TemplateProject {
  id: string;
  title: string;
  categoryTag: string;
  badge: string;
  featured?: boolean;
  description: string;
  technologies: string[];
  image: string;
  gridClass: string;
  imageHeight: string;
  url: string;
}

const templateWebsites: TemplateProject[] = [
  // ROW 1: Wide (7 cols) + Narrow (5 cols)
  {
    id: "dental-prime",
    title: "Dental Prime Studio & Clinic",
    categoryTag: "Flagship Dental Practice",
    badge: "DENTAL / FLAGSHIP PRACTICE",
    featured: true,
    description:
      "A flagship clinical portal and patient acquisition system. Features instant appointment triage, cosmetic smile assessments, doctor bios, and high-converting consultation flows.",
    technologies: ["NEXT.JS", "TAILWIND CSS", "APPOINTMENT ENGINE"],
    image: "/dental/templates/dental-prime-eight.png",
    gridClass: "col-span-1 lg:col-span-7",
    imageHeight: "h-[280px] sm:h-[340px] md:h-[400px]",
    url: "https://dentalprime-eight.vercel.app/",
  },
  {
    id: "premium-dental-care",
    title: "Smile Dental Care & Aesthetics",
    categoryTag: "Modern Family & Cosmetic Clinic",
    badge: "DENTAL / FAMILY & COSMETIC",
    featured: true,
    description:
      "Modern family and cosmetic dentistry portal with interactive treatment previews, doctor credentials, before-and-after smile galleries, and instant appointment triage.",
    technologies: ["NEXT.JS", "RESPONSIVE UX", "APPOINTMENT TRIAGE"],
    image: "/dental/templates/premium-dental-care.png",
    gridClass: "col-span-1 lg:col-span-5",
    imageHeight: "h-[280px] sm:h-[340px] md:h-[400px]",
    url: "https://premium-dental-care-fwlt.vercel.app/",
  },

  // ROW 2: Narrow (5 cols) + Wide (7 cols)
  {
    id: "denta-bio-implant",
    title: "Denta Bio-Aesthetic & Implant Center",
    categoryTag: "Implantology & Surgery",
    badge: "DENTAL / SURGICAL & IMPLANTS",
    featured: true,
    description:
      "Comprehensive implant, surgical, and restorative dental suite with transparent procedural pricing, step-by-step care pathways, and digital diagnostic overviews.",
    technologies: ["NEXT.JS", "FRAMER MOTION", "INTERACTIVE SHOWCASE"],
    image: "/dental/templates/denta-wheat.png",
    gridClass: "col-span-1 lg:col-span-5",
    imageHeight: "h-[280px] sm:h-[340px] md:h-[400px]",
    url: "https://denta-wheat.vercel.app/",
  },
  {
    id: "dental-swiss-clinical",
    title: "Denta Swiss Clinical Suite",
    categoryTag: "Swiss Precision Dentistry",
    badge: "DENTAL / SWISS CLINICAL",
    featured: false,
    description:
      "Minimalist Swiss-standard clinical experience emphasizing sterilization protocols, high-precision CAD/CAM prosthetics, and frictionless new-patient onboarding.",
    technologies: ["TYPESCRIPT", "TAILWIND CSS", "CLINICAL PROTOCOLS"],
    image: "/dental/templates/dentalclinical-theta.png",
    gridClass: "col-span-1 lg:col-span-7",
    imageHeight: "h-[280px] sm:h-[340px] md:h-[400px]",
    url: "https://dentalclinical-theta.vercel.app/",
  },

  // ROW 3: Three Equal Columns (4 cols each)
  {
    id: "denta-luxe-care",
    title: "Denta Luxe Care Studio",
    categoryTag: "Luxury Restorative Care",
    badge: "DENTAL / BOUTIQUE CARE",
    featured: false,
    description:
      "Calm, reassuring dental sanctuary design engineered to alleviate patient dental anxiety through soft aesthetics, interactive treatment exploration, and one-tap consultation booking.",
    technologies: ["REACT", "MODERN CSS", "LEAD GENERATION"],
    image: "/dental/templates/denta2-gules.png",
    gridClass: "col-span-1 md:col-span-4",
    imageHeight: "h-[250px] sm:h-[300px] md:h-[320px]",
    url: "https://denta2-gules.vercel.app/",
  },
  {
    id: "denta-clear-aligners",
    title: "Denta Clear Aligners & Ortho",
    categoryTag: "Orthodontics & Clear Aligners",
    badge: "ORTHODONTICS / COSMETIC",
    featured: true,
    description:
      "Specialized clear aligner and smile makeover studio showcasing digital before-and-after smile transformations, bite analysis tools, and financing calculators.",
    technologies: ["NEXT.JS", "ANIMATED UI", "SMILE ASSESSMENT"],
    image: "/dental/templates/denta-website.png",
    gridClass: "col-span-1 md:col-span-4",
    imageHeight: "h-[250px] sm:h-[300px] md:h-[320px]",
    url: "https://denta-website.vercel.app/",
  },
  {
    id: "dentacare-3d-anatomy",
    title: "DentaCare 3D Anatomy & Clinic",
    categoryTag: "3D Interactive Dentistry",
    badge: "3D DENTAL / ADVANCED TECH",
    featured: true,
    description:
      "Interactive 3D dental experience showcasing real-time jaw anatomy, tooth replacement simulations, and state-of-the-art operatory tour for high-trust conversions.",
    technologies: ["THREE.JS / 3D", "WEBGL", "NEXT.JS"],
    image: "/dental/templates/dentalcareclinic3d-eta.png",
    gridClass: "col-span-1 md:col-span-4",
    imageHeight: "h-[250px] sm:h-[300px] md:h-[320px]",
    url: "https://dentalcareclinic3d-eta.vercel.app/",
  },

  // ROW 4: Two Half Columns (6 cols each)
  {
    id: "dentalcare-multi-operatory",
    title: "DentalCare Multi-Operatory Clinic",
    categoryTag: "Multi-Location Dental Group",
    badge: "DENTAL / MULTI-PROVIDER",
    featured: false,
    description:
      "Enterprise-ready multi-provider dental platform with location selector, doctor specialty matching, real-time insurance verification, and automated recall reminders.",
    technologies: ["REACT", "TAILWIND CSS", "MULTI-LOCATION"],
    image: "/dental/templates/dentalcare1234-delta.png",
    gridClass: "col-span-1 lg:col-span-6",
    imageHeight: "h-[260px] sm:h-[320px] md:h-[360px]",
    url: "https://dentalcare1234-delta.vercel.app/",
  },
  {
    id: "dentacare-guided-3d-implant",
    title: "DentalCare Guided 3D Implant Center",
    categoryTag: "Digital Implant Planning",
    badge: "3D SURGICAL / IMPLANTS",
    featured: false,
    description:
      "Cutting-edge digital implantology portal integrating 3D CBCT guided surgery visuals, patient education modules, and specialized implant consultation booking.",
    technologies: ["WEBGL / 3D", "REACT", "DIGITAL WORKFLOW"],
    image: "/dental/templates/3ddental4-seven.png",
    gridClass: "col-span-1 lg:col-span-6",
    imageHeight: "h-[260px] sm:h-[320px] md:h-[360px]",
    url: "https://3ddental4-seven.vercel.app/",
  },

  // ROW 5: Three Equal Columns (4 cols each)
  {
    id: "aura-dental-atelier",
    title: "Aura Dental Atelier",
    categoryTag: "Biomimetic Prosthodontics & Implants",
    badge: "SWISS DENTAL / ROBOTIC IMPLANTS",
    featured: true,
    description:
      "Swiss biomimetic prosthodontics and robotic implant architecture featuring sub-micron ceramic restorations, 3D facial aesthetic workflows, and frictionless booking.",
    technologies: ["NEXT.JS", "ROBOTIC IMPLANTS", "BIOMIMETIC CERAMICS"],
    image: "/dental/templates/auradental-banner.png",
    gridClass: "col-span-1 md:col-span-4",
    imageHeight: "h-[250px] sm:h-[300px] md:h-[320px]",
    url: "https://auradental-nine.vercel.app/",
  },
  {
    id: "ortosense-orthodontics",
    title: "Orto Sense Smart Orthodontics",
    categoryTag: "Orthodontics & Clear Aligners",
    badge: "ORTHODONTICS / SMART TECH",
    featured: true,
    description:
      "Next-generation clear aligner portal and orthodontic diagnosis system featuring 3D digital smile simulation, bite assessment tools, and patient consultation booking.",
    technologies: ["REACT", "DIGITAL DIAGNOSIS", "CLEAR ALIGNERS"],
    image: "/dental/templates/ortosense.png",
    gridClass: "col-span-1 md:col-span-4",
    imageHeight: "h-[250px] sm:h-[300px] md:h-[320px]",
    url: "https://ortosense-six.vercel.app/",
  },
  {
    id: "dr-bocharov-surgery",
    title: "Dr. Maxim Bocharov Surgery & Implants",
    categoryTag: "Surgical Dentistry & Implants",
    badge: "DENTAL / SURGICAL EXCELLENCE",
    featured: false,
    description:
      "Precision surgical dentistry and navigated 3D dental implantation practice portal with All-on-4 total restorations, bone grafting pathways, and surgical consultation booking.",
    technologies: ["NEXT.JS", "3D IMPLANTS", "SURGICAL PROTOCOLS"],
    image: "/dental/templates/dr-bocharov.png",
    gridClass: "col-span-1 md:col-span-4",
    imageHeight: "h-[250px] sm:h-[300px] md:h-[320px]",
    url: "https://bocharov-kappa.vercel.app/",
  },
];

export default function DentalSelectedWebsites() {
  const { openProjectModal } = useProjectModal();

  return (
    <section id="selected-websites" className="py-14 md:py-16 bg-[#F5EFE5] text-[#0A0A0A]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Curated Showcase Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/[0.08]">
          <div>


            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-[-0.035em] leading-[0.98] uppercase">
              Selected <span className="text-[#2D5FC7]">Websites</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl font-normal leading-relaxed">
              Explore our live, high-converting dental practice website templates. Built with responsive medical triage, 3D anatomy visualizers, and seamless patient booking.
            </p>
          </div>
        </div>

        {/* The Grid of Website Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pt-12 sm:pt-16">
          {templateWebsites.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              className={`flex flex-col group ${template.gridClass}`}
            >
              {/* Image Frame with Badges and Floating Live Link Button */}
              <div
                onClick={() => window.open(template.url, "_blank", "noopener,noreferrer")}
                className={`relative w-full ${template.imageHeight} rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-300/80 shadow-sm group-hover:shadow-xl transition-all duration-500 cursor-pointer`}
              >
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

                {/* Top Left Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider border border-white/10">
                    {template.badge}
                  </span>
                </div>

                {/* Top Right Featured Badge */}
                {template.featured && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FACC15] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-xs">
                      ★ FEATURED
                    </span>
                  </div>
                )}

                {/* Floating "View Live Site ↗" Pill Button */}
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-10">
                  <a
                    href={template.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#2D5FC7] hover:bg-[#234ca3] text-white text-xs font-semibold shadow-lg group-hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <span>View Live Site</span>
                    <span className="font-bold text-sm">↗</span>
                  </a>
                </div>
              </div>

              {/* Card Meta Description */}
              <div className="mt-4 px-1">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3
                    onClick={() => window.open(template.url, "_blank", "noopener,noreferrer")}
                    className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#2D5FC7] transition-colors cursor-pointer"
                  >
                    {template.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    {template.categoryTag}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal line-clamp-3">
                  {template.description}
                </p>

                {/* Tech Pills and Consultation Trigger */}
                <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500">
                    {template.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">{tech}</span>
                        {tIdx < template.technologies.length - 1 && (
                          <span className="text-slate-400">&bull;</span>
                        )}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => openProjectModal()}
                    className="text-[11px] font-medium text-[#2D5FC7] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Inquire for Clinic &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
