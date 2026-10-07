import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Accessibility Statement | Kivex Technology",
  description: "Accessibility commitment and WCAG 2.2 standards compliance by Kivex Technology.",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5EFE5] selection:bg-[#2D5FC7] selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-white/[0.08] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity"
          >
            KIVEX
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5FC7]/10 border border-[#2D5FC7]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#4A7AE8]">
              Inclusion &amp; Standards
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5EFE5]">
            Accessibility Statement
          </h1>
          <p className="mt-3 text-sm text-[#A3A3A3]">
            Last updated: October 2026
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              1. Our Commitment
            </h2>
            <p>
              Kivex Technology is dedicated to ensuring digital accessibility for people of all abilities. We continually improve the user experience for everyone and apply the relevant accessibility standards, striving to adhere to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              2. Technical Measures Implemented
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-white/80">
              <li>
                <strong className="text-white">Semantic HTML:</strong> Proper landmark elements (`header`, `main`, `nav`, `footer`, `section`) and logical heading hierarchies (`h1` through `h4`).
              </li>
              <li>
                <strong className="text-white">Keyboard Operability:</strong> Full keyboard navigation support, visible focus rings, and skip-to-content links.
              </li>
              <li>
                <strong className="text-white">Reduced Motion Support:</strong> Explicit respect for the `prefers-reduced-motion` media query, disabling complex canvas animations and camera transitions for sensitive users.
              </li>
              <li>
                <strong className="text-white">Color Contrast:</strong> Minimum 4.5:1 text contrast ratios against dark backgrounds for high legibility.
              </li>
              <li>
                <strong className="text-white">Descriptive Alt Text:</strong> Meaningful descriptions for all informative images and icons.
              </li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              3. Feedback &amp; Support
            </h2>
            <p>
              We welcome your feedback on the accessibility of the Kivex Technology website. If you encounter any barriers, please let us know at{" "}
              <a href={`mailto:${companyInfo.email}`} className="text-[#2D5FC7] underline">
                {companyInfo.email}
              </a>. We strive to resolve reported issues promptly.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
