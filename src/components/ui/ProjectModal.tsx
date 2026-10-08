"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectModal } from "@/context/ProjectModalContext";
import { useLenis } from "@/components/ui/SmoothScroll";
import { companyInfo } from "@/data/navigation";
import { cn } from "@/lib/utils";

const AVAILABLE_SERVICES = [
  "Web Development",
  "AI & Neural Agents",
  "Intelligent Automation & CRM",
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
    if (!email.trim() || !email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!businessDescription.trim())
      newErrors.businessDescription = "Business description is required";
    if (selectedServices.length === 0)
      newErrors.services = "Please select at least one required service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Compose formatted WhatsApp inquiry text
    const cleanPhone = companyInfo.phone.replace(/[^0-9]/g, "");
    const messageLines = [
      "🚀 *NEW PROJECT INQUIRY — KIVEX TECHNOLOGY*",
      "",
      `*Full Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Email:* ${email.trim()}`,
      `*Business Description:* ${businessDescription.trim()}`,
      `*Required Services:* ${selectedServices.join(", ")}`,
      summary.trim() ? `*Summary / Goals:* ${summary.trim()}` : "",
      "",
      "_Sent via kivextechnology.com project inquiry form_",
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
                  Phone Number <span className="text-[#E8B62A]">*</span>
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

            {/* Row 2: Email */}
            <div>
              <label className="block text-xs font-mono font-medium text-white/80 mb-1">
                Email Address <span className="text-[#E8B62A]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="john@example.com"
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
                Submit Project Brief →
              </button>
              <p className="text-center text-[11px] text-white/40 mt-2.5">
                Your brief will be formatted and securely transmitted to our engineering team.
              </p>
            </div>
          </form>
        </div>
      ) : (
        /* Success View */
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 rounded-full bg-[#2D5FC7]/20 border border-[#2D5FC7] flex items-center justify-center text-2xl text-[#2D5FC7] mx-auto mb-5 shadow-[0_0_40px_rgba(45,95,199,0.3)]">
            ✓
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F5EFE5] mb-2">
            Inquiry Received!
          </h3>
          <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed mb-6">
            Thank you, <strong className="text-white">{name}</strong>. Your project brief has been routed to our technical architects. We will review your requirements and reach out via WhatsApp and Email.
          </p>
          <button
            onClick={closeProjectModal}
            className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Done
          </button>
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
