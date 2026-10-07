import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kivextechnology.com";
  const now = new Date();

  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/custom", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/dental", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/realestate", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/saas", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/custom-projects", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/crm", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/privacy-policy", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/terms", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/cookie-policy", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/refund-policy", changeFrequency: "monthly" as const, priority: 0.3 },
    { path: "/accessibility", changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
