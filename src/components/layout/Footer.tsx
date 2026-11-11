import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { headerNavLinks } from "@/data/navigation";
import { siteInfo } from "@/data/siteInfo";
import { footerContent } from "@/data/pageContent";
import logoWhite from "../../../public/assets/logo/arctis-logo-brand-white.png";

// Stupci navigacije: grupe iz glavnog izbornika + "Company"
const navGroups = [
  ...headerNavLinks
    .filter((item) => item.sublinks && item.sublinks.length > 0)
    .map((item) => ({ title: item.label, links: item.sublinks! })),
  {
    title: "Company",
    links: [
      { href: "/aboutus", label: "About us" },
      { href: "/references", label: "References" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];

const linkClass =
  "text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white";
const headingClass =
  "mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#050b1f] text-slate-300">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -bottom-40 left-1/2 h-[320px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          {/* Brand + kontakt */}
          <div>
            <Link href="/" aria-label="Arctis – home" className="inline-block">
              <Image
                src={logoWhite}
                alt="Arctis"
                sizes="140px"
                className="h-[50px] w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              {footerContent.shortDescription}
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <a
                  href={siteInfo.addressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {siteInfo.address}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <a href={siteInfo.emailHref} className={linkClass}>
                  {siteInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <a href={siteInfo.phoneHref} className={linkClass}>
                  {siteInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Navigacija */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
          >
            {navGroups.map((group) => (
              <div key={group.title}>
                <h3 className={headingClass}>{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Zaštita podataka (GDPR) */}
        <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-cyan-300 ring-1 ring-white/10">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">
                {siteInfo.dataProtection.title} (GDPR)
              </p>
              <p className="text-sm text-slate-400">
                Questions about your personal data or your rights?
              </p>
            </div>
          </div>
          <a
            href={siteInfo.dataProtection.emailHref}
            className="inline-flex items-center gap-2 break-all text-sm font-medium text-cyan-300 hover:text-cyan-200"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {siteInfo.dataProtection.email}
          </a>
        </div>

        {/* Donja traka */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {currentYear} {siteInfo.companyName} All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span>OIB: {siteInfo.legal.oib}</span>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
