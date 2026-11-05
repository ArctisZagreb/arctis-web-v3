import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { footerQuickLinks } from "@/data/navigation";
import { siteInfo } from "@/data/siteInfo";
import { footerContent } from "@/data/pageContent";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & About Snippet */}
          <div className="space-y-4">
            <Link href="/" aria-label="Arctis – home" className="inline-block">
              <Image
                src="/assets/logo/arctis-logo-blue.png"
                alt="Arctis Logo"
                width={110}
                height={37}
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              {footerContent.shortDescription}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a
                  href={siteInfo.addressLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  {siteInfo.address}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href={siteInfo.emailHref} className="hover:text-primary">
                  {siteInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href={siteInfo.phoneHref} className="hover:text-primary">
                  {siteInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Data Protection (GDPR) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Data Protection
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700">
                    {siteInfo.dataProtection.title}
                  </p>
                  <a
                    href={siteInfo.dataProtection.emailHref}
                    className="hover:text-primary break-all"
                  >
                    {siteInfo.dataProtection.email}
                  </a>
                </div>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            © {currentYear} {siteInfo.companyName} All rights reserved.
          </p>
          <p>OIB: {siteInfo.legal.oib}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
