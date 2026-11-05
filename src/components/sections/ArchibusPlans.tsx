// src/components/sections/ArchibusPlans.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { archibusPlansData, archibusPlansSection } from "@/data/pageContent";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import PlanDetailsDialog, { type ArchibusPlan } from "./PlanDetailsDialog";

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

const planAnchor = (plan: ArchibusPlan) => plan.ctaLink.split("#")[1];

interface ArchibusPlansProps {
  id?: string;
  className?: string;
}

const ArchibusPlans = ({ id, className }: ArchibusPlansProps) => {
  const [selectedPlan, setSelectedPlan] = useState<ArchibusPlan | null>(null);

  return (
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-20 border-y border-slate-100 bg-slate-50 py-20 md:py-28",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="Licensing options"
          title={archibusPlansSection.title}
          description={archibusPlansSection.subtitle}
          className="mb-14 lg:mb-16"
        />

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {archibusPlansData.map((plan) => (
            <motion.div key={plan.title} variants={cardVariants} id={planAnchor(plan)} className="scroll-mt-24">
              <button
                type="button"
                onClick={() => plan.modal && setSelectedPlan(plan)}
                aria-haspopup="dialog"
                className={cn(
                  "group relative flex h-full w-full flex-col rounded-2xl border bg-white p-7 text-left transition-all duration-300 cursor-pointer",
                  "hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  plan.featured
                    ? "border-blue-500 shadow-lg shadow-blue-600/10 ring-1 ring-blue-500"
                    : "border-slate-200 hover:border-blue-200",
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    Most popular
                  </span>
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      plan.featured
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
                        : "bg-blue-50 text-blue-600",
                    )}
                  >
                    <plan.Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                      {plan.title}
                    </h3>
                    <p className="text-sm text-slate-500">{plan.target}</p>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
                  {plan.description}
                </p>

                <ul className="mt-6 flex-grow space-y-3 border-t border-slate-100 pt-6">
                  {plan.keyPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold transition-colors",
                    plan.featured
                      ? "bg-blue-600 text-white group-hover:bg-blue-700"
                      : "bg-slate-100 text-slate-900 group-hover:bg-blue-50 group-hover:text-blue-700",
                  )}
                >
                  View plan details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <PlanDetailsDialog
        plan={selectedPlan}
        onOpenChange={(open) => !open && setSelectedPlan(null)}
      />
    </section>
  );
};

export default ArchibusPlans;
