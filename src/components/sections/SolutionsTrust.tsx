// src/components/sections/SolutionsTrust.tsx
import React from "react";
import Image from "next/image";
import { Globe2 } from "lucide-react";

// Globalne organizacije koje koriste ARCHIBUS
const trustedLogos = [
  { name: "Caterpillar", path: "/assets/logo/companies/cat.png", width: 120, height: 50 },
  { name: "Hrvatski Telekom", path: "/assets/logo/companies/tht-logo.png", width: 150, height: 40 },
  { name: "Vodafone", path: "/assets/logo/companies/vodafone.png", width: 100, height: 60 },
  { name: "NOAA", path: "/assets/logo/companies/noaa.png", width: 130, height: 55 },
];

const SolutionsTrust = () => {
  if (trustedLogos.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-10 md:px-12 md:py-12 lg:flex-row lg:gap-12">
          <div className="max-w-sm text-center lg:text-left">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
              <Globe2 className="h-4 w-4" />
              Trusted worldwide
            </div>
            <p className="text-lg font-medium leading-snug text-slate-800">
              Some of the most recognised companies globally rely on ARCHIBUS
              for their enterprise software needs.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-4">
            {trustedLogos.map((logo) => (
              <div key={logo.name} className="flex items-center justify-center">
                <Image
                  src={logo.path}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="max-h-10 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:max-h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsTrust;
