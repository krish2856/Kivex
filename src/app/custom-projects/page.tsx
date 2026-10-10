import type { Metadata } from "next";
import CustomPageClient from "@/components/custom/CustomPageClient";

export const metadata: Metadata = {
  title: "Custom Web Applications & Business Systems | Kivex Technology",
  description:
    "Digital systems that move businesses forward. Custom web applications, logistics platforms, financial dashboards, and automated AI integrations.",
  openGraph: {
    title: "Custom Web Applications & Business Systems | Kivex Technology",
    description:
      "Custom software development, UI/UX design, and workflow automation built for growing teams.",
    url: "https://www.kivextechnology.com/custom-projects",
  },
};

export default function CustomProjectsPage() {
  return <CustomPageClient />;
}
