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
    tagline: "Fast websites and platforms built for measurable business conversion.",
    services: [
      { name: "Web Design", description: "Clean, intentional interfaces designed to convert first-time visitors into paying clients." },
      { name: "Web Development", description: "Full-stack web engineering with clean code, sub-second load times, and responsive layouts." },
      { name: "Single-page Website", description: "Focused landing pages engineered for specific marketing campaigns and product launches." },
      { name: "Shopify Stores", description: "Custom Shopify storefronts with optimized checkout flows, inventory sync, and custom apps." },
      { name: "Web Applications", description: "Interactive client portals, SaaS apps, and internal dashboards built with React and Next.js." },
    ],
  },
  {
    id: "ai",
    title: "AI & AUTOMATION",
    tagline: "Replace repetitive manual tasks with reliable automated pipelines.",
    services: [
      { name: "AI Marketing", description: "Audience segmentation, programmatic copy generation, and data-backed ad optimization." },
      { name: "Automation & CRM", description: "Connect your CRM, intake forms, and databases so leads move through your sales pipeline without manual data entry." },
      { name: "AI Chatbots", description: "Customer-facing agents trained on your product documentation to answer questions and qualify leads around the clock." },
      { name: "AI Workflow Automation", description: "Automated document processing, email categorization, and multi-step background tasks." },
      { name: "Lead Generation Automation", description: "Automated lead scraping, qualification filters, and instant WhatsApp or email notifications for sales reps." },
    ],
  },
  {
    id: "creative",
    title: "CREATIVE & MEDIA",
    tagline: "Brand assets and media production that look distinct and professional.",
    services: [
      { name: "Custom Logo & Branding", description: "Vector logos, color palettes, and typography guidelines tailored to your company's market position." },
      { name: "Custom Brand Visuals", description: "Custom branded imagery, campaign graphics, and high-resolution visuals for web headers and social media." },
      { name: "Promo Videos & Animations", description: "Product demo videos, motion graphics, and animated explainers for launches and social feeds." },
      { name: "Script for Reels & Video", description: "Paced, conversational scripts written for TikTok, Instagram Reels, and YouTube ads." },
      { name: "Marketing Materials", description: "Pitch decks, one-pagers, brochures, and digital banners formatted for both screen and print." },
    ],
  },
  {
    id: "marketing",
    title: "DIGITAL MARKETING",
    tagline: "Search rankings and targeted campaigns that bring qualified traffic.",
    services: [
      { name: "SEO Blog & Copywriting", description: "Keyword-researched technical articles and landing page copy written to rank on Google." },
      { name: "Email Newsletters", description: "Automated drip campaigns, product updates, and customer re-engagement sequences." },
      { name: "Social Media Setup", description: "Complete profile setup, bio optimization, and branded banners across LinkedIn, X, and Instagram." },
      { name: "Google Business Profile Setup", description: "Local SEO optimization, verified listings, and review management for search map discovery." },
      { name: "Social Media Management", description: "Content planning, scheduled posts, graphic production, and monthly analytics reviews." },
    ],
  },
  {
    id: "cloud",
    title: "CLOUD & INFRASTRUCTURE",
    tagline: "Secure hosting and infrastructure that keeps your software online.",
    services: [
      { name: "Servers & Hosting", description: "Edge hosting, automated CI/CD pipelines, and zero-downtime server setups." },
      { name: "Domain & DNS Management", description: "Domain routing, DNS record verification, email deliverability records (SPF, DKIM, DMARC)." },
      { name: "Website Maintenance & Support", description: "Scheduled dependency updates, security patches, uptime monitoring, and prompt bug fixes." },
      { name: "Website Security & Backups", description: "Daily automated database backups, SSL certificate management, and DDoS protection." },
    ],
  },
];
