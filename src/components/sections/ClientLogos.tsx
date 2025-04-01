// src/components/sections/ClientLogos.tsx
import React from "react";
import { getClientLogos } from "@/lib/sanity/sanity.queries";
import LogoCarouselClient from "./LogoCarouselClient";
import { unstable_cache } from "next/cache";

// Cache the getClientLogos function using Next.js unstable_cache
// This will prevent redundant database calls
const getCachedClientLogos = unstable_cache(
  async () => {
    return await getClientLogos();
  },
  ["client-logos"], // Cache key
  {
    revalidate: 3600, // Revalidate every hour (or adjust as needed)
    tags: ["client-logos"], // Tag for manual revalidation
  }
);

async function ClientLogos() {
  try {
    // Use the cached function instead of direct database call
    const processedLogos = await getCachedClientLogos();

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
