"use client";

import Link from "next/link";
import { navLinks, companyInfo } from "@/data/navigation";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/[0.08]"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block transition-transform duration-300 hover:scale-105"
              aria-label="Kivex Technology - Return to Top"
            >
              <Logo className="h-9 sm:h-10 w-auto" />
            </a>
            <p
              className="mt-4 text-sm leading-relaxed max-w-md"
              style={{ color: "#A3A3A3" }}
            >
              {companyInfo.tagline}
            </p>
            <p className="mt-2 text-xs text-[#737373] max-w-sm">
              Digital Systems · Web Applications · SaaS Development · AI &amp; Automation · CRM Architecture · Cloud Hosting.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "#A3A3A3" }}
              >
                LinkedIn
              </a>
              <a
                href={companyInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "#A3A3A3" }}
              >
                Twitter / X
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "#A3A3A3" }}
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "#F5EFE5" }}
            >
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-[#4A7AE8]"
                    style={{ color: "#A3A3A3" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "#F5EFE5" }}
            >
              Location &amp; Inquiries
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-xs text-[#737373] block uppercase tracking-wider font-mono">Headquarters</span>
                <span className="text-sm text-[#F5EFE5]">Ahmedabad, Gujarat, India</span>
              </li>
              <li>
                <span className="text-xs text-[#737373] block uppercase tracking-wider font-mono">Direct Email</span>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm transition-colors duration-200 hover:text-[#4A7AE8]"
                  style={{ color: "#A3A3A3" }}
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <span className="text-xs text-[#737373] block uppercase tracking-wider font-mono">Phone Support</span>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-sm transition-colors duration-200 hover:text-[#4A7AE8]"
                  style={{ color: "#A3A3A3" }}
                >
                  {companyInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with All Legal Policies */}
        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: "#1E1E1E" }}
        >
          <p style={{ color: "#525252" }}>
            &copy; {new Date().getFullYear()} Kivex Technology. All rights reserved. Ahmedabad, India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: "#737373" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: "#737373" }}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: "#737373" }}
            >
              Cookie Policy
            </Link>
            <Link
              href="/refund-policy"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: "#737373" }}
            >
              Refund Policy
            </Link>
            <Link
              href="/accessibility"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: "#737373" }}
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
