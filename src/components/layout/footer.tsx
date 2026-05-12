"use client";

import Link from "next/link";
import {
  LayoutPanelTop,
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
} from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { useState, useEffect } from "react";

const navItems = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "What We Do" },
  { href: "/contact", label: "Contact Us" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/raquadrant_energy?igsh=MW9lYWZxdm5xYm8xOA%3D%3D&utm_source=qr",
    icon: InstagramIcon,
    label: "Instagram",
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white hover:border-pink-400",
  },
  {
    href: "https://www.facebook.com/raquadrantenergy",
    icon: FacebookIcon,
    label: "Facebook",
    color: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
  },
  {
    href: "https://www.linkedin.com/company/raquadrant-energy/",
    icon: LinkedInIcon,
    label: "LinkedIn",
    color: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
  },
];

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 sm:gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand block - larger on left */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-orange-500/40">
                <LayoutPanelTop className="h-7 w-7" />
              </div>
              <span className="font-headline text-2xl font-bold text-white">
                RaQuadrant Energy
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              Powering a sustainable tomorrow with innovative solar solutions.
              Your trusted partner for clean, reliable energy across Eastern India.
            </p>
            {/* CTA pill */}
            <Link
              href="/contact"
              className="group/cta mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/40"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-orange-400">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-orange-400"
                  >
                    <span className="h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-5">
            <h3 className="font-headline text-sm font-bold uppercase tracking-wider text-orange-400">
              Contact Us
            </h3>
            <div className="mt-5 space-y-4">
              <a
                href="https://maps.google.com/?q=1997+Rajdanga+Main+Road+E.K.T+Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-gray-400 transition-colors hover:text-orange-400"
              >
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500/80" />
                <span>
                  BL-E, 1st Floor, FL-1A, 1997 Rajdanga Main Road, E.K.T, Kolkata,
                  West Bengal, India - 700107
                </span>
              </a>
              <a
                href="mailto:info@raquadrantenergy.com"
                className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-orange-400"
              >
                <Mail className="h-5 w-5 shrink-0 text-orange-500/80" />
                info@raquadrantenergy.com
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <a
                  href="tel:+918910855185"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-orange-400"
                >
                  <Phone className="h-5 w-5 shrink-0 text-orange-500/80" />
                  +91-8910855185
                </a>
                <a
                  href="tel:+918017337117"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-orange-400"
                >
                  <Phone className="h-5 w-5 shrink-0 text-orange-500/80" />
                  +91-8017337117
                </a>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1">
                <a
                  href="https://www.raquadrantenergy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-orange-400"
                >
                  <Globe className="h-5 w-5 shrink-0 text-orange-500/80" />
                  raquadrantenergy.com
                </a>
                <a
                  href="https://www.Sun2Solar.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-orange-400"
                >
                  <Globe className="h-5 w-5 shrink-0 text-orange-500/80" />
                  Sun2Solar.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social + divider */}
        <div className="mt-14 flex flex-col items-center gap-6 border-t border-gray-800 pt-10 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="font-headline text-xs font-semibold uppercase tracking-wider text-gray-500">
              Follow us
            </span>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 bg-gray-800/50 text-gray-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 sm:text-right">
            © {year} RaQuadrant Energy Solutions. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-2 bg-gradient-to-r from-orange-600/20 via-amber-500/20 to-yellow-500/20" />
    </footer>
  );
}
