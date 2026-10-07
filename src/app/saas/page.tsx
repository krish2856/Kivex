import type { Metadata } from "next";
import SaasPageClient from "@/components/saas/SaasPageClient";

export const metadata: Metadata = {
  title: "SaaS & Custom CRM Systems Engineering | Kivex Technology",
  description:
    "Software that powers enterprise operations. Custom high-concurrency SaaS platforms, multi-tenant database architectures, and intelligent CRM operations engines with 0% per-seat licensing tax.",
  openGraph: {
    title: "SaaS & Custom CRM Systems Engineering | Kivex Technology",
    description:
      "Enterprise SaaS and CRM engines. Multi-tenant database partitioning, real-time event queues, and 100% proprietary code ownership.",
    url: "https://www.kivextechnology.com/saas",
  },
};

export default function SaasPage() {
  return <SaasPageClient />;
}
