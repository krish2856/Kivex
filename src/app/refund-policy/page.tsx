import type { Metadata } from "next";
import Link from "next/link";
import { companyInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Refund Policy | Kivex Technology",
  description: "Refund and cancellation policy for custom software development, digital systems, and consulting services by Kivex Technology.",
};

export default function RefundPolicyPage() {
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
              Commercial Terms
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F5EFE5]">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-3 text-sm text-[#A3A3A3]">
            Last updated: October 2026
          </p>
        </div>

        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-[#A3A3A3]">
          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              1. Custom Engineering &amp; Milestone Billing
            </h2>
            <p>
              Kivex Technology delivers bespoke software development, SaaS builds, AI workflows, and cloud engineering services. Because work is scheduled and dedicated to specific client deliverables, project payments are typically structured around predefined milestone deliverables.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              2. Deposit &amp; Discovery Phase
            </h2>
            <p>
              Initial deposits cover project architecture, UI/UX specification, scoping, and infrastructure reservation. Deposits are non-refundable once architectural and design sprints have commenced.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              3. Project Termination &amp; Dispute Resolution
            </h2>
            <p>
              Either party may terminate a project agreement according to the terms set forth in the executed Master Services Agreement (MSA) or Statement of Work (SOW). In the event of termination, fees for milestones approved and code delivered prior to notice are retained by Kivex Technology. Any unallocated prepaid funds for uncommenced milestones are refunded within 30 business days.
            </p>
          </section>

          <section className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#141414]/60">
            <h2 className="text-xl font-bold text-[#F5EFE5] mb-3">
              4. Questions &amp; Inquiries
            </h2>
            <p>
              For commercial inquiries or invoice questions, please contact our accounts department at{" "}
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
