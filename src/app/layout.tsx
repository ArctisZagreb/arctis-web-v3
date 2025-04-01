// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Možeš promijeniti font ako želiš
import "./globals.css";
import Header from "@/components/layout/Header"; // Uvezi Header
import Footer from "@/components/layout/Footer"; // Uvezi Footer
import { cn } from "@/lib/utils"; // Shadcn utility za class names

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); // Primjer s Inter fontom

export const metadata: Metadata = {
  title: "Arctis - IWMS Solutions", // Zadani naslov
  description:
    "Experts in ARCHIBUS IWMS/CAFM/CMMS solutions and technology services.", // Zadani opis
  // TODO: Dodaj ikone, open graph meta tagove itd.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col", // Osiguraj flex stupac
          inter.variable // Primijeni font varijablu ako koristiš custom font
        )}
      >
        <Header /> {/* Prikaz Headera */}
        <main className="flex-grow ">{children}</main>
        <Footer /> {/* Prikaz Footera */}
      </body>
    </html>
  );
}
