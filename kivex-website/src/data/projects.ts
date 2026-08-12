export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  url?: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Aastha Realty",
    category: "Web Development",
    description: "A premium real estate platform designed to showcase properties with elegance, streamline client interactions, and drive conversions through a modern digital experience.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    url: "https://aastharealty.in/",
    featured: true,
  },
  {
    id: "2",
    title: "Rcargo",
    category: "Web Application",
    description: "A logistics and cargo management platform built for efficiency — handling shipments, tracking, and operational workflows in real time.",
    technologies: ["React", "Node.js", "Tailwind CSS", "Vercel"],
    url: "https://rcargo.vercel.app/",
    featured: true,
  },
  {
    id: "3",
    title: "FinanceTrack",
    category: "Web Application",
    description: "A financial analytics dashboard with interactive charts, automated reporting, and portfolio management tools for data-driven decisions.",
    technologies: ["HTML", "CSS", "JavaScript", "Charts"],
    url: "https://finance-ruby-one.vercel.app/login.html",
    featured: false,
  },
  {
    id: "4",
    title: "OtherBooking",
    category: "Web Development",
    description: "A seamless booking platform designed for quick reservations, schedule management, and a smooth user experience across devices.",
    technologies: ["React", "Tailwind CSS", "Vercel"],
    url: "https://otherbooking.vercel.app/",
    featured: false,
  },
  {
    id: "5",
    title: "Gym Platform",
    category: "Web Development",
    description: "A modern fitness platform featuring membership management, workout tracking, and a bold design that matches the energy of the brand.",
    technologies: ["React", "Tailwind CSS", "Vercel"],
    url: "https://gym-alpha-peach.vercel.app/",
    featured: false,
  },
  {
    id: "6",
    title: "Dental CRM System",
    category: "AI & Automation",
    description: "An intelligent CRM system built specifically for dental practices — managing patient records, appointments, follow-ups, and automated reminders in one place.",
    technologies: ["React", "Node.js", "AI", "CRM"],
    comingSoon: true,
  },
  {
    id: "7",
    title: "DealFinder — Discount Web App",
    category: "AI & Automation",
    description: "A smart discount discovery app where users search for any product and instantly get the best deals, price comparisons, and full details from across the web.",
    technologies: ["Next.js", "AI", "Web Scraping", "Real-time Data"],
    comingSoon: true,
  },
  {
    id: "8",
    title: "Real Estate CRM & Lead Automation",
    category: "AI & Automation",
    description: "An end-to-end real estate automation system — capturing leads, AI-powered scoring, automated follow-ups, and complete pipeline management for agents.",
    technologies: ["React", "Python", "AI", "WhatsApp API", "CRM"],
    comingSoon: true,
  },
];
