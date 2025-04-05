import React from "react";
import WhoWeAreSection from "@/components/sections/about/WhoWeAreSection";
import TechnologySection from "@/components/sections/about/TechnologySection";
import PartnersSection from "@/components/sections/about/PartnersSection";
import { Metadata } from "next";
import { HeaderBackground } from "@/components/ui/header-background";

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
        <HeaderBackground />
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
