import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, Clock3, FileDown, LockKeyhole } from "lucide-react";
import { PageHero, HeroAccent } from "@/components/ui/page-hero";
import RoiCalculator from "@/components/roi/RoiCalculator";

export const metadata: Metadata = {
  title: "ARCHIBUS ROI Calculator | Estimate Savings, Payback and NPV",
  description:
    "Estimate what ARCHIBUS could save your organisation across space, maintenance, energy, leases and assets. See ROI, payback and a 5-year cash flow, then download a PDF or Excel business case.",
  alternates: { canonical: "/roi" },
};

const facts = [
  {
    Icon: Clock3,
    title: "About three minutes",
    text: "A handful of figures you already know. Results update as you type.",
  },
  {
    Icon: BookOpenCheck,
    title: "Transparent assumptions",
    text: "Every rate shows its basis: a published benchmark or a clearly labelled Arctis estimate.",
  },
  {
    Icon: FileDown,
    title: "PDF and Excel",
    text: "Download a report and the full model to share with decision-makers.",
  },
  {
    Icon: LockKeyhole,
    title: "Private by design",
    text: "Everything is calculated in your browser. Nothing you enter is sent to us.",
  },
];

export default function RoiCalculatorPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="ROI calculator"
        title={
          <>
            What could ARCHIBUS <HeroAccent>return to your organisation?</HeroAccent>
          </>
        }
        description="Build a 5-year business case in minutes: savings by area, ROI, payback period and net present value, in conservative, expected and optimistic scenarios."
        size="compact"
      />

      {/* Što korisnik dobiva */}
      <div className="border-b border-slate-200 bg-white">
        <ul className="container mx-auto grid gap-x-8 gap-y-5 px-4 py-7 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
          {facts.map(({ Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-0.5 text-sm leading-snug text-slate-600">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-slate-50 py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <RoiCalculator />
          <p className="mt-10 text-center text-sm text-slate-500">
            Want to know exactly how each number is calculated?{" "}
            <Link
              href="/roi-info"
              className="font-medium text-blue-700 underline-offset-2 hover:underline"
            >
              Read the methodology
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
