import Link from "next/link";
import React from "react";
import { footerQuickLinks } from "@/data/navigation"; // Uvezi linkove
import { siteInfo } from "@/data/siteInfo"; // Uvezi kontakt info
import { footerContent } from "@/data/pageContent"; // Uvezi tekstove

// TODO: Replace with actual Image component later
const ArctisLogo = () => (
  <span className="text-lg font-semibold text-gray-700">
    ARCTIS {/* Placeholder */}
  </span>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About Snippet */}
          <div className="space-y-4">
            <ArctisLogo />
            {/* Koristi tekst iz pageContent.ts */}
            <p className="text-sm text-muted-foreground">
              {footerContent.shortDescription}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            {/* Koristi linkove iz navigation.ts */}
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
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            {/* Koristi podatke iz siteInfo.ts */}
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{siteInfo.address}</li>
              <li>
                <a href={siteInfo.emailHref} className="hover:text-primary">
                  {siteInfo.email}
                </a>
              </li>
              <li>
                <a href={siteInfo.phoneHref} className="hover:text-primary">
                  {siteInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Placeholder/Empty */}
          <div>{/* Optional content */}</div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-muted-foreground">
            {/* Koristi ime iz siteInfo.ts */}© {currentYear}{" "}
            {siteInfo.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
