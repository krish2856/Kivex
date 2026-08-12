import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kivex Technology | Digital Solutions, AI & Automation",
    template: "%s | Kivex Technology",
  },
  description:
    "Kivex Technology builds websites, web applications, AI solutions, CRM systems, and business automation designed around real business needs.",
  keywords: [
    "web development",
    "AI automation",
    "digital transformation",
    "software development",
    "CRM systems",
    "cloud infrastructure",
    "business automation",
    "Kivex Technology",
  ],
  authors: [{ name: "Kivex Technology" }],
  openGraph: {
    title: "Kivex Technology | Digital Solutions, AI & Automation",
    description:
      "Kivex Technology builds websites, web applications, AI solutions, CRM systems, and business automation designed around real business needs.",
    url: "https://www.kivextechnology.com",
    siteName: "Kivex Technology",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kivex Technology",
    description:
      "Building digital systems that move businesses forward.",
  },
  metadataBase: new URL("https://www.kivextechnology.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.kivextechnology.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
