import type { Metadata } from "next";
import CustomPageClient from "@/components/custom/CustomPageClient";

export const metadata: Metadata = {
  title: "Custom Web Applications & Intelligent Systems | Kivex Technology",
  description:
    "Digital systems that move businesses forward. Custom high-converting web applications, logistics platforms, financial dashboards, and autonomous AI integrations.",
  openGraph: {
    title: "Custom Web Applications & Intelligent Systems | Kivex Technology",
    description:
      "Bespoke software development, UI/UX architecture, and AI workflow automation engineered for operational velocity.",
    url: "https://www.kivextechnology.com/custom-projects",
  },
};

export default function CustomProjectsPage() {
  return <CustomPageClient />;
}
