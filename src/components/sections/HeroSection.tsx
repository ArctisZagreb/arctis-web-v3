"use client";
// src/components/sections/HeroSection.tsx
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Globus se učitava samo na klijentu (WebGL); dok se učitava prikazuje se sjaj
const DynamicGlobe = dynamic(() => import("@/components/GlobeAnimation"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="aspect-square w-3/4 rounded-full bg-blue-500/10 blur-2xl animate-pulse" />
    </div>
  ),
});

const highlights = [
  "ARCHIBUS solution provider",
  "15+ years of IWMS expertise",
  "End-to-end delivery",
];

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#050b1f] text-white">
      {/* Pozadina: grid + svjetlosni efekti */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_40%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-8 py-16 md:py-20 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-6 lg:py-24 xl:grid-cols-[1fr_640px]">
          {/* Tekst */}
          <div className="flex flex-col space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-blue-100 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              ARCHIBUS #1 IWMS Provider
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl/[1.05]">
              Visibility and control for your{" "}
              <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-200 bg-clip-text text-transparent">
                workplace operations
              </span>
            </h1>

            <p className="max-w-xl text-base text-slate-300 md:text-lg leading-relaxed">
              Arctis is a proud ARCHIBUS provider, helping organisations manage
              real estate, infrastructure, assets and project data reliably —
              from strategy and implementation to day-to-day support.
            </p>

            <div className="flex flex-col gap-3 min-[420px]:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 px-6 bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25 group"
              >
                <Link href="/archibus">
                  Explore ARCHIBUS
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Talk to an expert</Link>
              </Button>
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-slate-400">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3D globus */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[520px] lg:max-w-none">
            <DynamicGlobe />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
