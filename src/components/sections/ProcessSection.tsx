// src/components/sections/ProcessSection.tsx
//
// "How we deliver" — šest faza implementacije (sažeto sa stranice
// /implementation), prikazano kao numerirani tijek.

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  DatabaseZap,
  DraftingCompass,
  FileSearch,
  Rocket,
  Settings2,
  TestTubeDiagonal,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const steps: { title: string; description: string; Icon: LucideIcon }[] = [
  {
    title: "Analysis & planning",
    description:
      "We analyse your processes, workflows and reporting needs, then plan a standard, customised or hybrid implementation.",
    Icon: FileSearch,
  },
  {
    title: "Design & customisation",
    description:
      "Design documents define the technical and functional architecture, tailored to your requirements.",
    Icon: DraftingCompass,
  },
  {
    title: "Development & configuration",
    description:
      "Custom functionality is developed and the system is configured to the agreed design.",
    Icon: Settings2,
  },
  {
    title: "Data migration",
    description:
      "We help capture, organise and standardise your data and migrate it from legacy systems.",
    Icon: DatabaseZap,
  },
  {
    title: "Testing & training",
    description:
      "Rigorous testing, plus personalised training so your team can use the system with confidence.",
    Icon: TestTubeDiagonal,
  },
  {
    title: "Deployment & go-live",
    description:
      "The production environment is established and you move to the live ARCHIBUS solution.",
    Icon: Rocket,
  },
];

const ProcessSection = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
          {/* Lijevo: naslov (sticky na desktopu) */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
              How we deliver
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
              A structured path from analysis to go-live
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Large rollouts fail on surprises. Our methodology, refined over
              more than a decade, keeps scope, data and people aligned at every
              phase.
            </p>
            <Button asChild className="mt-7 rounded-full px-5" size="lg">
              <Link href="/implementation">
                Our implementation approach
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>

          {/* Desno: koraci */}
          <ol className="relative grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {steps.map(({ title, description, Icon }, index) => (
              <Reveal as="li" key={title} delay={(index % 2) * 0.08}>
                <div className="group relative h-full rounded-2xl border border-transparent p-5 transition-colors duration-300 hover:border-slate-200 hover:bg-slate-50/70">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-sm font-medium text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"
                    />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
