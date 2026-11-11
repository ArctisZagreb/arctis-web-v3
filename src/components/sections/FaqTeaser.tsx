// src/components/sections/FaqTeaser.tsx
//
// Nekoliko najčešćih pitanja na početnoj stranici (iz faqData.ts),
// s linkom na puni FAQ.

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { allFaqItems } from "@/data/faqData";

// Pitanja koja se najčešće postavljaju prije odluke o uvođenju
const HOME_FAQ_IDS = [
  "maintenanceManagment-1", // unos podataka
  "maintenanceManagment-4", // nacrti zgrada (AutoCAD / Revit)
  "maintenanceManagment-5", // rad na terenu
  "maintenanceManagment-9", // bez IT odjela → SaaS
  "maintenanceManagment-8", // postupno uvođenje modula
  "propertyManagment-4", // više zgrada / vlasnika
];

const FaqTeaser = () => {
  const items = HOME_FAQ_IDS.map((id) =>
    allFaqItems.find((item) => item.id === id),
  ).filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (items.length === 0) return null;

  return (
    <section className="w-full border-t border-slate-100 bg-slate-50 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
              Good to know
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 sm:text-4xl">
              Questions we hear before every project
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Short answers to what teams usually ask first. Need more detail?
              Browse the full FAQ or talk to us directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link
                href="/faq"
                className="group inline-flex items-center gap-1 text-blue-700 hover:text-blue-800"
              >
                View all FAQs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1 text-slate-700 hover:text-slate-900"
              >
                Ask our team
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion
              type="single"
              collapsible
              defaultValue={items[0].id}
              className="space-y-3"
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-xl border border-slate-200 bg-white px-5 transition-shadow last:border-b data-[state=open]:shadow-md data-[state=open]:shadow-blue-900/5"
                >
                  <AccordionTrigger className="py-5 text-base font-semibold text-slate-900 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-relaxed text-slate-600">
                    {item.answer.trim()}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default FaqTeaser;
