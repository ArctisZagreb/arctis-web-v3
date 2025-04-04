import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getClientLogos } from "@/lib/sanity/sanity.queries";
import type { ProcessedLogo } from "@/types/sanity";

export default async function PartnersSection() {
  // Fetch partner logos from Sanity
  const partners: ProcessedLogo[] = await getClientLogos();

  // Fallback if no partners found
  if (!partners || partners.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <p className="text-lg text-gray-600">
            We collaborate with leading companies.
          </p>
          <p className="mt-8 text-muted-foreground">
            No partner information currently available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Our Valued Partners & Clients
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;ve had the privilege of delivering successful projects and
            valuable services to recognized companies in Croatia and worldwide.
          </p>
        </div>

        {/* Partner logos grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner) => (
            <div key={partner.key} className="text-center group">
              <div className="relative h-24 w-40 flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200/80 transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300 group-hover:bg-white">
                {partner.imageUrl ? (
                  <Image
                    src={partner.imageUrl}
                    alt={`${partner.alt} logo`}
                    width={140}
                    height={70}
                    className="max-h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-100 opacity-80"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Logo N/A
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-gray-600 transition-colors duration-300 group-hover:text-blue-700">
                {partner.alt}
              </p>
            </div>
          ))}
        </div>

        {/* References CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center shadow-sm border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Explore Our Success Stories
          </h3>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Discover detailed case studies and testimonials from our partners
            and clients. Learn how we&apos;ve helped organizations transform
            their facility management processes.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg" className="shadow-sm">
              <Link href="/references">View References</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
