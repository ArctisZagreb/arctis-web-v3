// src/app/aboutus/page.tsx
import React from "react";
import WhoWeAreSection from "@/components/sections/about/WhoWeAreSection";
import TechnologySection from "@/components/sections/about/TechnologySection";
import PartnersSection from "@/components/sections/about/PartnersSection";
import { Metadata } from "next";

// Page metadata for SEO
export const metadata: Metadata = {
  title: "About Arctis | IWMS Experts",
  description:
    "Learn more about ARCTIS, our expertise in IWMS, ARCHIBUS, BIM+FM synergy, the technologies we use, and our valued partners.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
        {/* Background visual elements */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="absolute inset-0 w-full h-full"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(79, 70, 229, 0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Animated background circles */}
        <div className="absolute top-10 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-5 -right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-3000"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            About Arctis
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our journey, expertise in IWMS & ARCHIBUS, the technologies
            driving our success, and the partners we collaborate with.
          </p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1">
        <WhoWeAreSection />
        <TechnologySection />
        <PartnersSection />
      </main>
    </div>
  );
}
