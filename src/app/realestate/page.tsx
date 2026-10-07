import type { Metadata } from "next";
import RealEstatePageClient from "@/components/realestate/RealEstatePageClient";

export const metadata: Metadata = {
  title: "Real Estate Websites & Smart Brokerage CRM Systems | Kivex Technology",
  description:
    "Websites that sell luxury properties. Custom high-converting real estate portals, intelligent lead CRM dashboards, and marketing automation engineered specifically for brokerages and developers.",
  openGraph: {
    title: "Real Estate Websites & Smart Brokerage CRM Systems | Kivex Technology",
    description:
      "Websites that sell luxury properties. Modern brokerage design, CRM workflows, and automated tour booking.",
    url: "https://www.kivextechnology.com/realestate",
  },
};

export default function RealEstatePage() {
  return <RealEstatePageClient />;
}
