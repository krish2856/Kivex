import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Terms and Conditions | Kivex Technology",
  description: "Terms and conditions governing the use of services, deliverables, and digital systems built by Kivex Technology.",
};

export default function TermsPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5FC7]/10 border border-[#2D5FC7]/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D5FC7]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#2D5FC7]">
              Legal
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5EFE5]">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-sm text-[#A3A3A3]">
            Last updated: September 2026
          </p>
        </div>

        {/* Legal Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing our website (<a href={companyInfo.domain} className="text-[#2D5FC7] underline">{companyInfo.domain}</a>), engaging our engineering services, or commissioning custom digital solutions from Kivex Technology (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              2. Scope of Services
            </h2>
            <p>
              Kivex Technology designs, develops, and deploys custom software, web applications, AI neural agent workflows, automation pipelines, CRM architectures, and digital brand experiences. Specific deliverables, project milestones, acceptance criteria, and timelines are established in mutually executed Statements of Work (SOW) or project agreements.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              3. Intellectual Property Rights
            </h2>
            <p className="mb-3">
              <strong className="text-white">Client Deliverables:</strong> Upon receipt of full and final payment, the client receives full ownership rights to all custom code, graphical designs, and specific assets produced specifically for the project, excluding pre-existing frameworks and open-source libraries.
            </p>
            <p>
              <strong className="text-white">Company Pre-Existing IP:</strong> Kivex retains all rights to its proprietary starter modules, developer utilities, algorithms, and general engineering methodologies developed independently of the client&apos;s project.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              4. Payment Terms & Invoicing
            </h2>
            <p>
              Projects typically operate on milestone-based billing (e.g., upfront commencement deposit, milestone sign-offs, and final deployment balance). Invoices are payable upon receipt unless otherwise designated in writing. Delinquent payments may result in temporary suspension of active development or delayed deployment.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              5. Confidentiality & Non-Disclosure
            </h2>
            <p>
              Both parties agree to protect and treat as strictly confidential all proprietary business information, customer datasets, source code, and trade secrets disclosed during discussions or execution of the project.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Kivex Technology shall not be liable for any indirect, incidental, consequential, special, or punitive damages, or loss of profits, data, or business opportunities arising from the use of or inability to use our systems or deliverables.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              7. Contact Information
            </h2>
            <p>
              For legal inquiries or questions regarding these terms, please contact us at:
            </p>
            <div className="mt-4 p-4 rounded-xl border border-white/[0.06] bg-[#0A0A0A] font-mono text-xs text-white/80 space-y-1">
              <div>Kivex Technology</div>
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
