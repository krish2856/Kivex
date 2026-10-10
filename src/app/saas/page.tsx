import type { Metadata } from "next";
import SaasPageClient from "@/components/saas/SaasPageClient";

export const metadata: Metadata = {
  title: "SaaS & Custom CRM Systems | Kivex Technology",
  description:
    "Software that powers business operations. Custom SaaS platforms, multi-tenant database systems, and tailored CRM dashboards with zero per-seat fees.",
  openGraph: {
    title: "SaaS & Custom CRM Systems | Kivex Technology",
    description:
      "Custom SaaS and CRM platforms with multi-tenant databases, background task queues, and 100% code ownership.",
    url: "https://www.kivextechnology.com/saas",
  },
};

export default function SaasPage() {
  return <SaasPageClient />;
}
