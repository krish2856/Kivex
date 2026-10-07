import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Cookie Policy | Kivex Technology",
  description: "Cookie policy explaining how Kivex Technology uses essential cookies and performance analytics.",
};

export default function CookiePolicyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B62A]/10 border border-[#E8B62A]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#E8B62A]">
              Compliance &amp; Transparency
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5EFE5]">
            Cookie Policy
          </h1>
          <p className="mt-3 text-sm text-[#A3A3A3]">
            Last updated: October 2026
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              1. What Are Cookies
            </h2>
            <p>
              Cookies are small text files stored on your browser or device when you visit websites. They help the website remember your preferences, provide security, and analyze site performance to deliver a smoother user experience.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              2. How Kivex Technology Uses Cookies
            </h2>
            <p className="mb-3">
              Kivex Technology minimizes cookie usage. We only use cookies for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/80">
              <li>
                <strong className="text-white">Strictly Necessary Cookies:</strong> Required for site navigation, security, and state persistence (e.g. CSRF tokens, session integrity).
              </li>
              <li>
                <strong className="text-white">Performance &amp; Diagnostics:</strong> Anonymous telemetry and error logging to ensure optimal server uptime and fast page load times.
              </li>
              <li>
                <strong className="text-white">Functional Preferences:</strong> Remembering UI preferences such as theme settings and reduced-motion states.
              </li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              3. Managing Your Cookie Preferences
            </h2>
            <p>
              You can block or delete cookies at any time through your browser settings. Please note that disabling essential cookies may impact specific platform features, forms, or animations.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              4. Contact
            </h2>
            <p>
              If you have any questions regarding our Cookie Policy, please contact our data team at{" "}
              <a href={`mailto:${companyInfo.email}`} className="text-[#2D5FC7] underline">
                {companyInfo.email}
              </a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
