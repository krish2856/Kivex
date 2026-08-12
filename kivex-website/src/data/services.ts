export interface ServiceItem {
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  services: ServiceItem[];
}

export const services: ServiceCategory[] = [
  {
    id: "web",
    title: "WEB DEVELOPMENT",
    tagline: "Modern websites built for performance and conversion.",
    services: [
      { name: "Web Design", description: "Beautiful, conversion-focused designs that turn visitors into customers." },
      { name: "Web Development", description: "Full-stack web development using modern frameworks and scalable architecture." },
      { name: "Single-page Website", description: "Fast, focused single-page sites built for maximum impact and lead capture." },
      { name: "Shopify Stores", description: "Custom Shopify stores optimized for sales with premium themes and integrations." },
      { name: "Web Applications", description: "Complex web apps built with React, Next.js, and modern tech stacks." },
    ],
  },
  {
    id: "ai",
    title: "AI & AUTOMATION",
    tagline: "Turn manual work into intelligent systems.",
    services: [
      { name: "AI Marketing", description: "AI-powered marketing strategies that optimize campaigns and maximize ROI automatically." },
      { name: "Automation & CRM", description: "End-to-end business automation with integrated CRM systems that scale with you." },
      { name: "AI Chatbots", description: "Intelligent chatbots that handle customer queries, qualify leads, and run 24/7." },
      { name: "AI Workflow Automation", description: "Automate repetitive tasks with AI-powered workflows that learn and adapt." },
      { name: "Lead Generation Automation", description: "Automated lead capture, scoring, and nurturing systems that fill your pipeline." },
    ],
  },
  {
    id: "creative",
    title: "CREATIVE & MEDIA",
    tagline: "Visual content that captures attention and drives engagement.",
    services: [
      { name: "Custom Logo & Branding", description: "Unique brand identity design that stands out and communicates your value." },
      { name: "AI-generated Art", description: "Cutting-edge AI visuals and artwork curated by our creative team." },
      { name: "Promo Videos & Animations", description: "Professional video production and motion graphics for campaigns and brands." },
      { name: "Script for Reels & Video", description: "Engaging video scripts crafted for social media reels, YouTube, and ads." },
      { name: "Marketing Materials", description: "Digital and print marketing assets designed for consistency and impact." },
    ],
  },
  {
    id: "marketing",
    title: "DIGITAL MARKETING",
    tagline: "Strategic digital presence that generates measurable results.",
    services: [
      { name: "SEO Blog & Copywriting", description: "SEO-optimized content and copy that ranks on search and converts readers." },
      { name: "Email Newsletters", description: "Automated email sequences that nurture leads and retain customers." },
      { name: "Social Media Setup", description: "Complete social media profile setup optimized for your target audience." },
      { name: "Google Business Profile Setup", description: "Google Business Profile optimization for local visibility and discovery." },
      { name: "Social Media Management", description: "End-to-end social media management with content calendars and analytics." },
    ],
  },
  {
    id: "cloud",
    title: "CLOUD & INFRASTRUCTURE",
    tagline: "Scalable infrastructure built for reliability and performance.",
    services: [
      { name: "Servers & Hosting", description: "Production-grade hosting with zero-downtime deployments and monitoring." },
      { name: "Domain & DNS Management", description: "Domain registration, DNS configuration, and management across providers." },
      { name: "Website Maintenance & Support", description: "Ongoing updates, monitoring, and support to keep your site running perfectly." },
      { name: "Website Security & Backups", description: "Security hardening, SSL, firewall setup, and automated backup systems." },
    ],
  },
];
