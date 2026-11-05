"use client";
// src/components/sections/PlanDetailsDialog.tsx
//
// Detalji ARCHIBUS plana. Markdown iz pageContent.ts dijeli se po "### "
// naslovima u zasebne kartice s ikonama.

import React, { useMemo } from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowRight,
  Building2,
  Check,
  Info,
  KeyRound,
  Package,
  Puzzle,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { archibusPlansData } from "@/data/pageContent";

export type ArchibusPlan = (typeof archibusPlansData)[number];

const SECTION_ICONS: Record<string, LucideIcon> = {
  "INCLUDED IN PLAN": Package,
  EXTENSIONS: Puzzle,
  "COMPANY'S PROFILE": Building2,
  "NUMBER OF LICENSES REQUIRED": KeyRound,
  CUSTOMIZATION: SlidersHorizontal,
  "OTHER INFORMATION": Info,
};

type Section = { key: string; heading: string; body: string; Icon: LucideIcon };

function parseSections(markdown: string): Section[] {
  return markdown
    .split(/^### /m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const nl = chunk.indexOf("\n");
      const raw = (nl === -1 ? chunk : chunk.slice(0, nl)).trim();
      const body = nl === -1 ? "" : chunk.slice(nl + 1).trim();
      const lower = raw.toLowerCase().replace(/’/g, "'");
      return {
        key: raw,
        heading: lower.charAt(0).toUpperCase() + lower.slice(1),
        body,
        Icon: SECTION_ICONS[raw.toUpperCase().replace(/’/g, "'")] ?? Info,
      };
    });
}

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-slate-600 [&:not(:last-child)]:mb-3">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="space-y-2.5">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900">{children}</strong>
  ),
};

function SectionCard({ section, wide = false }: { section: Section; wide?: boolean }) {
  const { Icon } = section;
  return (
    <section
      className={
        wide
          ? "rounded-xl border border-slate-200 bg-white p-5 md:col-span-2"
          : "rounded-xl border border-slate-200 bg-white p-5"
      }
    >
      <h3 className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-slate-900">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-4 w-4" />
        </span>
        {section.heading}
      </h3>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {section.body}
      </ReactMarkdown>
    </section>
  );
}

interface PlanDetailsDialogProps {
  plan: ArchibusPlan | null;
  onOpenChange: (open: boolean) => void;
}

export default function PlanDetailsDialog({ plan, onOpenChange }: PlanDetailsDialogProps) {
  const sections = useMemo(
    () => (plan?.modal ? parseSections(plan.modal.content) : []),
    [plan],
  );

  const intro = sections[0];
  const rest = sections.slice(1);

  return (
    <Dialog open={plan !== null} onOpenChange={onOpenChange}>
      {plan && (
        <DialogContent className="flex max-h-[90vh] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden rounded-2xl border-0 p-0 sm:max-w-3xl [&>button:last-child]:top-5 [&>button:last-child]:right-5 [&>button:last-child]:text-white [&>button:last-child]:opacity-80">
          {/* Zaglavlje */}
          <div className="relative isolate shrink-0 overflow-hidden bg-[#050b1f] px-6 pb-6 pt-7 text-white md:px-8">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid-dark opacity-60" />
              <div className="absolute -top-24 right-0 h-56 w-96 rounded-full bg-blue-600/30 blur-[80px]" />
            </div>
            <div className="flex items-start gap-4 pr-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-cyan-500/20">
                <plan.Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
                  ARCHIBUS plan
                </p>
                <DialogTitle className="mt-1 text-2xl font-semibold tracking-tight">
                  {plan.modal?.title ?? plan.title}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-slate-300">
                  {plan.description}
                </DialogDescription>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15">
                {plan.target}
              </span>
              {plan.keyPoints.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10"
                >
                  <Check className="h-3 w-3 text-cyan-300" strokeWidth={3} />
                  {point}
                </span>
              ))}
            </div>
          </div>

          {/* Sadržaj */}
          <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-6 md:px-8">
            {intro && (
              <div className="mb-4 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                <h3 className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-slate-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <intro.Icon className="h-4 w-4" />
                  </span>
                  {intro.heading}
                </h3>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {intro.body}
                </ReactMarkdown>
              </div>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((section) => (
                <SectionCard
                  key={section.key}
                  section={section}
                  wide={section.body.length > 420 || section.body.includes("\n- ")}
                />
              ))}
            </div>
          </div>

          {/* Podnožje */}
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <DialogClose asChild>
              <Button variant="ghost" className="text-slate-600">
                Close
              </Button>
            </DialogClose>
            <Button asChild className="rounded-full px-5">
              <Link href="/contact">
                Ask about {plan.title}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
