"use client";

import { navLinks, companyInfo } from "@/data/navigation";

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "#0A0A0A", borderColor: "#1E1E1E" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-bold tracking-widest uppercase" style={{ color: "#F5EFE5" }}>
              KIVEX
            </a>
            <p
              className="mt-4 text-sm leading-relaxed max-w-sm"
              style={{ color: "#A3A3A3" }}
            >
              {companyInfo.tagline}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 hover:text-blue"
                style={{ color: "#A3A3A3" }}
              >
                LinkedIn
              </a>
              <a
                href={companyInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 hover:text-blue"
                style={{ color: "#A3A3A3" }}
              >
                Twitter
              </a>
              <a
                href={companyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-200 hover:text-blue"
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
                    className="text-sm transition-colors duration-200 hover:text-blue"
                    style={{ color: "#A3A3A3" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: "#F5EFE5" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm transition-colors duration-200 hover:text-blue"
                  style={{ color: "#A3A3A3" }}
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-sm transition-colors duration-200 hover:text-blue"
                  style={{ color: "#A3A3A3" }}
                >
                  {companyInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "#1E1E1E" }}
        >
          <p className="text-xs" style={{ color: "#525252" }}>
            &copy; 2026 Kivex Technology. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs transition-colors duration-200 hover:text-blue"
              style={{ color: "#525252" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs transition-colors duration-200 hover:text-blue"
              style={{ color: "#525252" }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
