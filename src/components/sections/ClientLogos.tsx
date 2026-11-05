// src/components/sections/ClientLogos.tsx
import React from "react";
import { getClientLogos } from "@/lib/sanity/sanity.queries";
import LogoCarouselClient from "./LogoCarouselClient";

async function ClientLogos() {
  try {
    // getClientLogos već koristi Next.js fetch cache (revalidate + tag),
    // dodatni unstable_cache bi samo duplicirao cache zapise (ISR writes).
    const processedLogos = await getClientLogos();

    return <LogoCarouselClient logos={processedLogos} />;
  } catch (error) {
    console.error("Error in ClientLogos component:", error);
    // Fallback UI
    return (
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-center mb-8 text-red-600">
            Error Loading Partners
          </h2>
          <p className="text-muted-foreground">Could not load client logos.</p>
        </div>
      </section>
    );
  }
}

export default ClientLogos;
