import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  title: {
    default: "Kivex Technology | Web Development, SaaS, AI & Automation in Ahmedabad, India",
    template: "%s | Kivex Technology — Ahmedabad & India",
  },
  description:
    "Kivex Technology is a premier digital systems, SaaS, web development, and AI automation company based in Ahmedabad, Gujarat, India. We design, build, and automate high-performance websites, custom software, CRM workflows, and AI solutions for modern businesses across India and globally.",
  keywords: [
    "Web Development Company in Ahmedabad",
    "SaaS Development Company India",
    "AI Development Company Ahmedabad",
    "Software Development Company Ahmedabad",
    "Custom Software Development India",
    "AI Automation Company India",
    "Web Application Development Ahmedabad",
    "Business Automation India",
    "CRM Development Ahmedabad",
    "Digital Product Agency Ahmedabad",
    "Kivex Technology",
    "Kivex Technology Ahmedabad",
    "IT Company in Ahmedabad Gujarat",
    "Digital Marketing & SEO Services India",
    "Shopify Store Development Ahmedabad",
    "Cloud Infrastructure Solutions India",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.png",
  },
  authors: [{ name: "Kivex Technology", url: "https://www.kivextechnology.com" }],
  creator: "Kivex Technology",
  publisher: "Kivex Technology",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Kivex Technology | Web Development, SaaS, AI & Automation in Ahmedabad, India",
    description:
      "Premier digital systems, custom web applications, SaaS platforms, AI automation, and cloud infrastructure engineered in Ahmedabad, India.",
    url: "https://www.kivextechnology.com",
    siteName: "Kivex Technology",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Kivex Technology — Web Development & AI Automation in Ahmedabad, India",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kivex Technology | Web Development, SaaS, AI & Automation in Ahmedabad, India",
    description:
      "Building digital systems that move businesses forward with AI, automation, SaaS, and full-stack software development in Ahmedabad, India.",
    creator: "@kivextechnology",
    images: ["/logo.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.kivextechnology.com"),
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
  other: {
    "geo.region": "IN-GJ",
    "geo.placename": "Ahmedabad",
    "geo.position": "23.0225;72.5714",
    "ICBM": "23.0225, 72.5714",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.kivextechnology.com/#organization",
      name: "Kivex Technology",
      legalName: "Kivex Technology",
      url: "https://www.kivextechnology.com",
      logo: "https://www.kivextechnology.com/logo.png",
      description:
        "Digital product engineering and systems company specializing in web development, SaaS platforms, AI automation, CRM systems, and cloud infrastructure.",
      email: "hello@kivextechnology.com",
      telephone: "+91-70418-88899",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      sameAs: [
        "https://twitter.com/kivextechnology",
        "https://linkedin.com/company/kivextechnology",
        "https://instagram.com/kivextechnology",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-70418-88899",
          contactType: "customer service",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.kivextechnology.com/#website",
      url: "https://www.kivextechnology.com",
      name: "Kivex Technology",
      description: "Building Digital Systems That Move Businesses Forward.",
      publisher: {
        "@id": "https://www.kivextechnology.com/#organization",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.kivextechnology.com/#service",
      name: "Kivex Technology",
      url: "https://www.kivextechnology.com",
      telephone: "+91-70418-88899",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 23.0225,
        longitude: 72.5714,
      },
      provider: {
        "@id": "https://www.kivextechnology.com/#organization",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Products & Systems Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Full-Stack Web & SaaS Development",
              description: "High-performance web applications, SaaS platforms, and digital products engineered for scalability.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI & Neural Agent Automation",
              description: "Custom AI workflows, autonomous task agents, and intelligent chatbots tailored to business operations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CRM Systems & Business Automation",
              description: "Integrated customer operations hubs, lead scoring pipelines, and automated multi-channel messaging.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cloud Infrastructure & Maintenance",
              description: "Secure cloud architectures, automated deployments, monitoring, and high-availability hosting.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip to Main Content Link for WCAG 2.2 AA Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#2D5FC7] focus:text-white focus:font-semibold focus:rounded-full focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
