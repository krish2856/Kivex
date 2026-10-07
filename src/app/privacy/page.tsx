import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | Kivex Technology",
  description: "Privacy policy describing how Kivex Technology collects, protects, and handles personal and project information.",
};

export default function PrivacyPage() {
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
        {/* Page Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8B62A]/10 border border-[#E8B62A]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B62A]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#E8B62A]">
              Privacy & Trust
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5EFE5]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#A3A3A3]">
            Last updated: September 2026
          </p>
        </div>

        {/* Legal Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              When you interact with Kivex Technology via our website, contact forms, or direct inquiries, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/75">
              <li><strong className="text-white">Contact details:</strong> Name, business email address, phone number, and company name.</li>
              <li><strong className="text-white">Project information:</strong> Business descriptions, technical requirements, service preferences, and budgets.</li>
              <li><strong className="text-white">Technical data:</strong> IP addresses, browser types, session interactions, and device characteristics collected through analytics.</li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use your collected information strictly to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-white/75">
              <li>Review project requirements and prepare technical architectural proposals.</li>
              <li>Deliver, manage, and communicate progress regarding software engineering contracts.</li>
              <li>Provide customer support, billing updates, and post-deployment monitoring.</li>
              <li>Improve site performance, user experience, and service reliability.</li>
            </ul>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              3. Data Security & Storage
            </h2>
            <p>
              We implement enterprise-grade technical and organizational safeguards to protect your personal and proprietary data from unauthorized access, loss, or alteration. All client credentials, API tokens, and source code are handled with zero-trust protocols and encrypted in transit and at rest.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              4. Third-Party Services
            </h2>
            <p>
              We do not sell, rent, or trade your personal information. We may utilize verified third-party infrastructure providers (such as cloud hosting, messaging APIs, CRM tools, or telemetry analytics) solely to facilitate our operations and project execution.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              5. Your Rights & Inquiries
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data stored with us at any time. For privacy inquiries or requests, contact our data protection team:
            </p>
            <div className="mt-4 p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0A] font-mono text-xs text-white/80 space-y-1">
              <div>Kivex Technology Privacy Team</div>
              <div>Email: <a href={`mailto:${companyInfo.email}`} className="text-[#2D5FC7]">{companyInfo.email}</a></div>
              <div>Phone: <a href={`tel:${companyInfo.phone}`} className="text-[#2D5FC7]">{companyInfo.phone}</a></div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-xs text-[#525252]">
        &copy; {new Date().getFullYear()} Kivex Technology. All rights reserved.
      </footer>
    </div>
  );
}
