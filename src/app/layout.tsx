import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

// Load Inter font with Latin character subset
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Define global metadata for SEO
export const metadata: Metadata = {
  title: {
    template: "%s | Arctis",
    default: "Arctis - IWMS Solutions",
  },
  description:
    "Experts in ARCHIBUS IWMS/CAFM/CMMS solutions and technology services.",
  keywords:
    "IWMS, CAFM, CMMS, ARCHIBUS, facility management, real estate management",

  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arctis.com",
    siteName: "Arctis",
    title: "Arctis - IWMS Solutions",
    description:
      "Experts in ARCHIBUS IWMS/CAFM/CMMS solutions and technology services.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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
          inter.variable
        )}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
