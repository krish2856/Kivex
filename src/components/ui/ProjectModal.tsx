"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import { useLenis } from "@/components/ui/SmoothScroll";
import Link from "next/link";
import { companyInfo } from "@/data/navigation";
import { cn } from "@/lib/utils";

const AVAILABLE_SERVICES = [
  "Web Development",
  "AI & Automation",
  "Custom CRM & Workflows",
  "Cloud Infrastructure",
  "Custom Logo & Creative",
  "Digital Marketing & SEO",
];

function ProjectModalDialog() {
  const { preSelectedService, closeProjectModal } = useProjectModal();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preSelectedService ? [preSelectedService] : []
  );
  const [summary, setSummary] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!email.trim() || !email.includes("@") || email.trim().split("@")[0].length < 2)
      newErrors.email = "Please enter your valid Google Mail ID (e.g. yourname@gmail.com)";
    if (!businessDescription.trim())
      newErrors.businessDescription = "Business description is required";
    if (selectedServices.length === 0)
      newErrors.services = "Please select at least one required service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Persist inquiry directly to Neon DB for Company CRM
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim().toLowerCase(),
          businessDescription: businessDescription.trim(),
          services: selectedServices,
          summary: summary.trim(),
        }),
      });
    } catch (err) {
      console.error("Could not persist inquiry to Neon DB:", err);
    }

    // Compose formatted WhatsApp inquiry text with Email Verification & Approval note
    const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, "");
    const origin = typeof window !== "undefined" ? window.location.origin : "https://kivextechnology.com";
    const messageLines = [
      "🚀 *NEW PROJECT INQUIRY — KIVEX TECHNOLOGY*",
      "",
      `*Full Name:* ${name.trim()}`,
      `*WhatsApp Number:* ${phone.trim()}`,
      `*Google Email (Portal Login):* ${email.trim().toLowerCase()}`,
      `*Business Description:* ${businessDescription.trim()}`,
      `*Required Services:* ${selectedServices.join(", ")}`,
      summary.trim() ? `*Summary / Goals:* ${summary.trim()}` : "",
      "",
      "🔐 *Next Step — Email Verification & CRM Approval:*",
      `I am verifying my Google Email (${email.trim().toLowerCase()}) on the Kivex Client Portal (${origin}/client). Once verified, please approve my project from the Kivex CRM so my portal unlocks and send me the approval confirmation on WhatsApp!`,
    ].filter(Boolean);

    const waText = encodeURIComponent(messageLines.join("\n"));
    const waUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    // Open WhatsApp
    window.open(waUrl, "_blank");
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      data-lenis-prevent="true"
      className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/[0.12] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl z-10 my-auto text-[#F5EFE5] max-h-[90vh] overflow-y-auto modal-scrollbar overscroll-contain"
    >
      {/* Close Button */}
      <button
        onClick={closeProjectModal}
        className="absolute top-5 right-5 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Close dialog"
      >
        ✕
      </button>

      {!isSubmitted ? (
        <div>
          {/* Header */}
          <div className="mb-6 pr-8">

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5EFE5]">
              Tell Us What You&apos;re Building
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Fill out the brief below and our engineering team will connect with you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-white/80 mb-1">
                  Full Name <span className="text-[#E8B62A]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  placeholder="John Doe"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/30 focus:outline-none transition-colors",
                    errors.name ? "border-red-500/70" : "border-white/10 focus:border-[#2D5FC7]"
                  )}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-white/80 mb-1">
                  WhatsApp Phone Number <span className="text-[#E8B62A]">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  placeholder="+91 98765 43210"
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/30 focus:outline-none transition-colors",
                    errors.phone ? "border-red-500/70" : "border-white/10 focus:border-[#2D5FC7]"
                  )}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Row 2: Google Email */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono font-medium text-white/80">
                  Google Email ID (For Client Portal Login) <span className="text-[#E8B62A]">*</span>
                </label>
                <span className="text-[10px] text-[#E8B62A] font-mono">Must be your real Google Account</span>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="yourname@gmail.com"
                className={cn(
                  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/30 focus:outline-none transition-colors",
                  errors.email ? "border-red-500/70" : "border-white/10 focus:border-[#2D5FC7]"
                )}
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Row 3: Business Description */}
            <div>
              <label className="block text-xs font-mono font-medium text-white/80 mb-1">
                Business Description <span className="text-[#E8B62A]">*</span>
              </label>
              <textarea
                rows={2}
                value={businessDescription}
                onChange={(e) => {
                  setBusinessDescription(e.target.value);
                  if (errors.businessDescription)
                    setErrors((prev) => ({ ...prev, businessDescription: "" }));
                }}
                placeholder="What does your company do? Industry, target users, or current product..."
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/30 focus:outline-none transition-colors resize-none",
                  errors.businessDescription ? "border-red-500/70" : "border-white/10 focus:border-[#2D5FC7]"
                )}
              />
              {errors.businessDescription && (
                <p className="text-[11px] text-red-400 mt-1">{errors.businessDescription}</p>
              )}
            </div>

            {/* Row 4: Required Services (Pill Multi-select) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-medium text-white/80">
                  Required Services <span className="text-[#E8B62A]">*</span>
                </label>
                <span className="text-[10px] text-white/40">Select all that apply</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SERVICES.map((svc) => {
                  const isSelected = selectedServices.includes(svc);
                  return (
                    <button
                      key={svc}
                      type="button"
                      onClick={() => toggleService(svc)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer",
                        isSelected
                          ? "bg-[#2D5FC7] border-[#2D5FC7] text-white shadow-md shadow-[#2D5FC7]/30 scale-102"
                          : "bg-white/[0.03] border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                      )}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {svc}
                    </button>
                  );
                })}
              </div>
              {errors.services && (
                <p className="text-[11px] text-red-400 mt-1">{errors.services}</p>
              )}
            </div>

            {/* Row 5: Short Summary (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono font-medium text-white/80">
                  Short Summary <span className="text-white/40">(Optional)</span>
                </label>
                <span className="text-[10px] text-white/40">Timeline, budget, or key goals</span>
              </div>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="e.g. Need an MVP ready in 60 days with custom AI chatbot and CRM integration..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#2D5FC7] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#2D5FC7] hover:bg-[#4A7AE8] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#2D5FC7]/30 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                Submit Project Brief & Notify via WhatsApp →
              </button>
              <p className="text-center text-[11px] text-white/40 mt-2.5">
                After submitting, verify your Google Email on the Client Portal to unlock project approval.
              </p>
            </div>
          </form>
        </div>
      ) : (
        /* Success View: Directed to Client Portal for Google Email Verification */
        <div className="text-center py-4 sm:py-8">
          <div className="w-16 h-16 rounded-full bg-[#2D5FC7]/20 border border-[#2D5FC7] flex items-center justify-center text-2xl text-[#2D5FC7] mx-auto mb-4 shadow-[0_0_40px_rgba(45,95,199,0.3)]">
            ✓
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-bold tracking-wide mb-3">
            ● STEP 1 COMPLETE: WHATSAPP NOTIFICATION SENT
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#F5EFE5] mb-2">
            Verify Your Google Email, {name}!
          </h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed mb-6">
            Your project brief has been sent on WhatsApp and logged in our CRM. Now <strong className="text-white">sign in with your Google Account ({email})</strong> on our Client Portal so we can verify your email and approve your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link
              href={`/client?email=${encodeURIComponent(email.trim().toLowerCase())}&name=${encodeURIComponent(name.trim())}&phone=${encodeURIComponent(phone.trim())}`}
              onClick={closeProjectModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2D5FC7] hover:bg-[#4A7AE8] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#2D5FC7]/30 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <span>Verify Google Email on Client Portal</span>
              <span>→</span>
            </Link>

            <button
              onClick={closeProjectModal}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-white/10"
            >
              Return to Site
            </button>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left max-w-lg mx-auto space-y-2.5">
            <div className="text-[10px] font-mono font-bold text-[#E8B62A] uppercase tracking-wider">
              How Your Project Approval Works:
            </div>
            <div className="text-[11px] text-white/70 flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1.</span>
              <span>
                <strong className="text-white">Verify Email:</strong> Click the button above and sign in with your real Google Account (<span className="text-[#E8B62A] font-mono">{email}</span>).
              </span>
            </div>
            <div className="text-[11px] text-white/70 flex items-start gap-2">
              <span className="text-[#2D5FC7] font-bold">2.</span>
              <span>
                <strong className="text-white">Admin CRM Approval:</strong> Once our team sees your verified Google Email in the Kivex CRM, we will approve your project.
              </span>
            </div>
            <div className="text-[11px] text-white/70 flex items-start gap-2">
              <span className="text-[#E8B62A] font-bold">3.</span>
              <span>
                <strong className="text-white">WhatsApp Confirmation:</strong> You will receive an instant approval message on your WhatsApp (<span className="text-white font-mono">{phone}</span>) and your portal dashboard will unlock!
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function ProjectModal() {
  const { isOpen, closeProjectModal } = useProjectModal();
  const { lenis } = useLenis();

  // Lock background scroll and pause Lenis when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeProjectModal();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        lenis?.start();
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
  }, [isOpen, closeProjectModal, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          data-lenis-prevent="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeProjectModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <ProjectModalDialog />
        </div>
      )}
    </AnimatePresence>
  );
}
