// src/components/sections/CallToActionSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { ctaSectionData } from "@/data/pageContent";
import { siteInfo } from "@/data/siteInfo";
import { SectionHeading } from "@/components/ui/section-heading";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const CallToActionSection = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#050b1f] py-20 text-white md:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_30%,transparent_100%)]" />
        <div className="absolute left-1/2 top-0 h-[360px] w-[760px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          tone="dark"
          eyebrow="Get started"
          title={ctaSectionData.title}
          description={ctaSectionData.subtitle}
          className="mb-12 lg:mb-14"
        />

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {ctaSectionData.actions.map((action) => {
            const IconComponent = action.icon;
            return (
              <motion.div key={action.title} variants={itemVariants}>
                <Link
                  href={action.link}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.07] md:p-8"
                >
                  {IconComponent && (
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                      <IconComponent className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold tracking-tight">
                    {action.title}
                  </h3>
                  <p className="mt-3 flex-grow text-[15px] leading-relaxed text-slate-300">
                    {action.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                    {action.buttonText}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Izravan kontakt */}
        <div className="mx-auto mt-6 flex max-w-5xl flex-col items-start gap-5 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/20 via-white/[0.04] to-cyan-500/10 p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              Prefer to talk it through?
            </p>
            <div className="mt-2 flex flex-col gap-x-6 gap-y-1.5 text-sm text-slate-300 sm:flex-row">
              <a
                href={siteInfo.emailHref}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="h-4 w-4 text-cyan-300" />
                {siteInfo.email}
              </a>
              <a
                href={siteInfo.phoneHref}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Phone className="h-4 w-4 text-cyan-300" />
                {siteInfo.phone}
              </a>
            </div>
          </div>
          <Link
            href="/contact"
            className="group inline-flex h-12 shrink-0 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-50"
          >
            Talk to an expert
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
