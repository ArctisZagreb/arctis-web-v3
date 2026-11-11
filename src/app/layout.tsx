import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { siteInfo } from "@/data/siteInfo";

// Load Inter font with Latin character subset
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// Display font za naslove (h1–h3) — daje stranici prepoznatljiviji karakter
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700"],
  display: "swap",
});

// Define global metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.siteUrl),
  title: {
    template: "%s | Arctis",
    default: "Arctis - IWMS Solutions",
  },
  description:
    "Experts in ARCHIBUS IWMS/CAFM/CMMS solutions and technology services.",
  keywords:
    "IWMS, CAFM, CMMS, ARCHIBUS, facility management, real estate management",

  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Arctis",
    title: "Arctis - IWMS Solutions",
    description:
      "Experts in ARCHIBUS IWMS/CAFM/CMMS solutions and technology services.",
  },
  // favicon dolazi iz src/app/favicon.ico (Next.js file convention)
};

// Structured data (schema.org) — pomaže tražilicama prikazati podatke o tvrtki
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteInfo.companyName,
  url: siteInfo.siteUrl,
  logo: `${siteInfo.siteUrl}/assets/logo/arctis-logo-blue.png`,
  email: siteInfo.email,
  telephone: siteInfo.phoneHref.replace("tel:", ""),
  vatID: siteInfo.legal.oib,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pavlinovićeva 6",
    postalCode: "10000",
    addressLocality: "Zagreb",
    addressCountry: "HR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteInfo.email,
      telephone: siteInfo.phoneHref.replace("tel:", ""),
    },
    {
      "@type": "ContactPoint",
      contactType: "data protection officer",
      email: siteInfo.dataProtection.email,
    },
  ],
};

/**
 * Root layout component
 * Provides the basic structure for all pages including header and footer
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          inter.variable,
          jakarta.variable
        )}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
