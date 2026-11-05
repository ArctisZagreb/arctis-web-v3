import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { getArchibusProducts } from "@/lib/sanity/sanity.queries";
import ArchibusExplorer from "@/components/archibus/ArchibusExplorer";
import ArchibusPlans from "@/components/sections/ArchibusPlans";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ARCHIBUS Products",
  description:
    "Explore the complete ARCHIBUS IWMS suite offered by Arctis — space planning, maintenance, real estate, assets, sustainability, workplace services and more.",
  alternates: { canonical: "/archibus" },
};

export default async function ArchibusPage() {
  const products = await getArchibusProducts();
  const moduleCount = products.reduce(
    (sum, p) => sum + (p.subMenuItem?.length ?? 0),
    0,
  );

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#050b1f] text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_40%,transparent_100%)]" />
          <div className="absolute -top-32 left-1/2 h-[380px] w-[820px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
              ARCHIBUS Products
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              One integrated platform for your entire{" "}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-200 bg-clip-text text-transparent">
                built environment
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              From space planning and maintenance to real estate, assets and
              sustainability — explore the ARCHIBUS applications we implement
              and support.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-blue-500 px-6 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400"
              >
                <Link href="#solutions">
                  Browse solutions
                  <ArrowDown className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#plans">
                  Compare plans
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {products.length > 0 && (
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-white/10 pt-8">
              <div>
                <dt className="text-sm text-slate-400">Solution areas</dt>
                <dd className="mt-1 text-3xl font-semibold tabular-nums">
                  {products.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">Application modules</dt>
                <dd className="mt-1 text-3xl font-semibold tabular-nums">
                  {moduleCount}
                </dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      {/* Preglednik proizvoda */}
      <section
        id="solutions"
        className="scroll-mt-20 bg-slate-50 py-12 md:py-16"
      >
        <div className="container mx-auto px-4 md:px-6">
          {products.length > 0 ? (
            <ArchibusExplorer products={products} />
          ) : (
            <p className="py-16 text-center text-slate-500">
              Product information is not available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Planovi licenciranja */}
      <ArchibusPlans id="plans" className="bg-white" />
    </>
  );
}
