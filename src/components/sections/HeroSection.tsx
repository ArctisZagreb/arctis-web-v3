"use client";
// src/components/sections/HeroSection.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dinamički uvezi GlobeAnimation komponentu bez serverskog renderiranja (SSR)
// Prikazat će fallback dok se komponenta ne učita na klijentu
const DynamicGlobe = dynamic(() => import("@/components/GlobeAnimation"), {
  ssr: false,
  // Opcionalno: Pokaži privremeni sadržaj dok se globus učitava
  loading: () => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground rounded-lg">
      Loading Globe...
    </div>
  ),
});

const HeroSection = () => {
  return (
    // Vanjska sekcija zauzima punu širinu i ima pozadinu/padding
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-r from-blue-50 via-white to-cyan-50">
      {/* Unutarnji div služi kao kontejner za sadržaj */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          {/* Lijeva strana - Tekst */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium mb-2">
                ARCHIBUS #1 IWMS Provider
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-gray-900">
                Visibility and Control for Your Workplace Operations
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We @Arctis are proud providers of ARCHIBUS, designed to manage
                your real estate, infrastructure, assets, and project data
                reliably.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/archibus">Explore ARCHIBUS</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Desna strana - 3D Globus Animacija */}
          <div className="flex items-center justify-center w-full h-64 mx-auto md:h-80 lg:h-96 xl:h-[500px]">
            <DynamicGlobe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
