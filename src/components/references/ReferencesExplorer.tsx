"use client";
// src/components/references/ReferencesExplorer.tsx
//
// Stranica referenci: filter po vrsti usluge, kartice klijenata (logo, naziv,
// usluge) i dialog s detaljima projekta (usluge s podstavkama + galerija).

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, ExternalLink, Images } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { urlFor } from "@/lib/sanity/sanity.client";
import { cn } from "@/lib/utils";
import type { QueryResultReference } from "@/types/sanity";

// Nazivi usluga u CMS-u nisu ujednačeni ("ARCHIBUS Support", "IT Consulting"…)
// pa ih za filter svodimo na nekoliko kategorija.
const CATEGORIES = [
  { id: "implementation", label: "Implementation", match: /implement/i },
  { id: "development", label: "Development", match: /develop/i },
  { id: "integration", label: "Integration", match: /integrat/i },
  { id: "support", label: "Support", match: /support/i },
  { id: "consulting", label: "Consulting", match: /consult/i },
  { id: "project", label: "Project management", match: /project/i },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

type Reference = QueryResultReference & {
  services: { key: string; name: string; subservices: string[] }[];
  categories: CategoryId[];
  website: string | null;
};

function prepare(reference: QueryResultReference): Reference {
  const services = (reference.servicesProvided ?? [])
    .filter((s) => s?.serviceName)
    .map((s) => ({
      key: s._key,
      name: s.serviceName as string,
      subservices: (s.subservices ?? []).filter(
        (x): x is string => typeof x === "string" && x.trim() !== "",
      ),
    }));
  const categories = CATEGORIES.filter((c) =>
    services.some((s) => c.match.test(s.name)),
  ).map((c) => c.id);
  // Placeholder adrese (vlastita stranica) ne prikazujemo kao web klijenta
  const url = reference.client?.url ?? null;
  const website = url && !/arctis\.hr/i.test(url) ? url : null;
  return { ...reference, services, categories, website };
}

const hostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

function Logo({
  reference,
  className,
}: {
  reference: Reference;
  className?: string;
}) {
  const asset = reference.logo?.asset;
  const name = reference.client?.name ?? "Client";
  if (!asset) {
    return (
      <span className="text-sm font-semibold text-slate-500">{name}</span>
    );
  }
  return (
    <Image
      src={urlFor(asset).width(360).fit("max").auto("format").quality(85).url()}
      alt={`${name} logo`}
      width={180}
      height={90}
      className={cn("w-auto object-contain", className)}
    />
  );
}

function ReferenceDialog({
  reference,
  onClose,
}: {
  reference: Reference | null;
  onClose: () => void;
}) {
  const images = (reference?.imageGallery ?? []).filter((img) => img?.asset);

  return (
    <Dialog open={reference !== null} onOpenChange={(open) => !open && onClose()}>
      {reference && (
        <DialogContent className="flex max-h-[90vh] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden rounded-2xl border-0 p-0 sm:max-w-4xl">
          {/* Zaglavlje */}
          <div className="flex shrink-0 items-center gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 pr-14 md:px-8">
            <div className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5">
              <Logo reference={reference} className="max-h-11" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                Client reference
              </p>
              <DialogTitle className="mt-0.5 text-lg leading-snug sm:text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                {reference.client?.name}
              </DialogTitle>
              {reference.website ? (
                <a
                  href={reference.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-700"
                >
                  {hostname(reference.website)}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <DialogDescription className="sr-only">
                  Services delivered by Arctis for this client
                </DialogDescription>
              )}
            </div>
          </div>

          {/* Sadržaj */}
          <div className="grid flex-1 gap-8 overflow-y-auto px-6 py-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                What we delivered
              </h3>
              <ul className="mt-4 space-y-4">
                {reference.services.map((service) => (
                  <li
                    key={service.key}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <p className="flex items-center gap-2.5 font-semibold text-slate-900">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {service.name}
                    </p>
                    {service.subservices.length > 0 && (
                      <ul className="mt-3 space-y-1.5 pl-[34px]">
                        {service.subservices.map((sub) => (
                          <li
                            key={sub}
                            className="relative text-sm leading-relaxed text-slate-600 before:absolute before:-left-3.5 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-slate-400"
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
                <Images className="h-4 w-4" />
                Project gallery
              </h3>
              {images.length > 0 ? (
                <Carousel
                  opts={{ align: "start", loop: images.length > 1 }}
                  className="mt-4 w-full"
                >
                  <CarouselContent>
                    {images.map((img, index) => (
                      <CarouselItem key={(img as { _key?: string })._key ?? index}>
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                          <Image
                            src={urlFor(img.asset!)
                              .width(1200)
                              .height(750)
                              .fit("crop")
                              .auto("format")
                              .quality(80)
                              .url()}
                            alt={
                              img.alt ||
                              `${reference.client?.name ?? "Project"} – image ${index + 1}`
                            }
                            width={1200}
                            height={750}
                            sizes="(max-width: 1024px) 90vw, 460px"
                            className="aspect-[16/10] h-auto w-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-3 cursor-pointer border-0 bg-white/90 text-slate-900 shadow-md hover:bg-white" />
                      <CarouselNext className="right-3 cursor-pointer border-0 bg-white/90 text-slate-900 shadow-md hover:bg-white" />
                    </>
                  )}
                </Carousel>
              ) : (
                <p className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                  No images for this project.
                </p>
              )}
              {images.length > 1 && (
                <p className="mt-2 text-xs text-slate-500">
                  {images.length} images
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default function ReferencesExplorer({
  references,
}: {
  references: QueryResultReference[];
}) {
  const items = useMemo(() => references.map(prepare), [references]);
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filters = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count: items.filter((i) => i.categories.includes(c.id)).length,
      })).filter((c) => c.count > 0),
    [items],
  );

  const visible =
    filter === "all" ? items : items.filter((i) => i.categories.includes(filter));
  const selected = items.find((i) => i._id === selectedId) ?? null;

  const chip = (active: boolean) =>
    cn(
      "inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
      active
        ? "bg-slate-900 text-white shadow-sm"
        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900 hover:ring-slate-300",
    );

  return (
    <div>
      {/* Filter */}
      <div
        role="group"
        aria-label="Filter references by service"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:px-0"
      >
        <button
          type="button"
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className={chip(filter === "all")}
        >
          All clients
          <span className="tabular-nums opacity-60">{items.length}</span>
        </button>
        {filters.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            aria-pressed={filter === c.id}
            className={chip(filter === c.id)}
          >
            {c.label}
            <span className="tabular-nums opacity-60">{c.count}</span>
          </button>
        ))}
      </div>

      {/* Kartice */}
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((reference) => {
            const shown = reference.services.slice(0, 3);
            const more = reference.services.length - shown.length;
            const imageCount = (reference.imageGallery ?? []).length;
            return (
              <motion.li
                key={reference._id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(reference._id)}
                  aria-haspopup="dialog"
                  className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <div className="relative flex h-36 items-center justify-center border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-8">
                    <Logo
                      reference={reference}
                      className="max-h-16 max-w-[70%] transition-transform duration-300 group-hover:scale-105"
                    />
                    {imageCount > 1 && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs text-slate-500 ring-1 ring-slate-200">
                        <Images className="h-3 w-3" />
                        {imageCount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                      {reference.client?.name}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {shown.map((service) => (
                        <li
                          key={service.key}
                          className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
                        >
                          {service.name}
                        </li>
                      ))}
                      {more > 0 && (
                        <li className="rounded-md px-1.5 py-1 text-xs font-medium text-slate-500">
                          +{more}
                        </li>
                      )}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-blue-700">
                      View project
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      <ReferenceDialog reference={selected} onClose={() => setSelectedId(null)} />
    </div>
  );
}
