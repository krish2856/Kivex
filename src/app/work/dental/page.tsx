import type { Metadata } from "next";
import DentalPageClient from "@/components/dental/DentalPageClient";

export const metadata: Metadata = {
  title: "Dental Clinic Websites & Smart CRM Systems | Kivex Technology",
  description:
    "Websites that fill dental chairs. Custom high-converting clinic websites, intelligent patient CRM dashboards, and marketing automation engineered specifically for dental practices.",
  openGraph: {
    title: "Dental Clinic Websites & Smart CRM Systems | Kivex Technology",
    description:
      "Websites that fill dental chairs. Modern clinic design, CRM workflows, and automated patient booking.",
    url: "https://www.kivextechnology.com/work/dental",
  },
};

export default function DentalWorkPage() {
  return <DentalPageClient />;
}
