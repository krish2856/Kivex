export interface Project {
  id: string;
  title: string;
  category: string;
  categories?: string[];
  description: string;
  technologies: string[];
  image?: string;
  url?: string;
  featured?: boolean;
  comingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Aastha Realty",
    category: "Real Estate",
    categories: ["Real Estate", "Custom"],
    description: "A flagship luxury real estate portal for residential and commercial listings, featuring instant WhatsApp inquiry triggers, neighborhood filters, and fast mobile galleries.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    image: "/realestate/aastha-website-desktop.png",
    url: "https://aastharealty.in/",
    featured: true,
  },
  {
    id: "2",
    title: "Rcargo",
    category: "Custom",
    categories: ["Custom"],
    description: "A cargo logistics portal that lets freight operators log consignments, monitor dispatch statuses, and manage fleet routes without paper manifests.",
    technologies: ["React", "Node.js", "Tailwind CSS", "Vercel"],
    image: "/projects/rcargo-live.png",
    url: "https://rcargo.vercel.app/",
    featured: true,
  },
  {
    id: "3",
    title: "Gym Platform",
    category: "Custom",
    categories: ["Custom"],
    description: "A gym landing page and member portal with tier pricing, trainer rosters, and membership checkout designed for mobile devices.",
    technologies: ["React", "Tailwind CSS", "Vercel"],
    image: "/projects/gym-live.png",
    url: "https://gym-alpha-peach.vercel.app/",
    featured: true,
  },
  {
    id: "4",
    title: "NeoBus Mobility",
    category: "Custom",
    categories: ["Custom", "CRM"],
    description: "A high-concurrency bus booking and fleet tracking engine engineered by Kivex. Features instant route reservation, multi-branch dispatch, and real-time transit telemetry.",
    technologies: ["React", "Node.js", "Vercel", "Telemetry"],
    image: "/projects/neobus.png",
    url: "https://neobus.vercel.app/",
    featured: false,
  },
  {
    id: "5",
    title: "FinanceTrack",
    category: "Custom",
    categories: ["Custom"],
    description: "A financial dashboard for tracking monthly expenses, loan management, and net worth trends with interactive visual charts.",
    technologies: ["HTML", "CSS", "JavaScript", "Charts"],
    image: "/projects/financetrack-live.png",
    url: "https://finance-ruby-one.vercel.app/login.html",
    featured: false,
  },
  {
    id: "6",
    title: "OtherBooking",
    category: "Custom",
    categories: ["Custom", "CRM"],
    description: "An appointment reservation tool that lets clients pick open time slots, view provider availability, and receive instant confirmation emails.",
    technologies: ["React", "Tailwind CSS", "Vercel"],
    image: "/projects/otherbooking-live.png",
    url: "https://otherbooking.vercel.app/",
    featured: false,
  },
];
