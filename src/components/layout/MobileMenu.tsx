"use client";
// src/components/layout/MobileMenu.tsx
//
// Mobilni izbornik (ispod lg): gumb s tri crte + panel koji klizi zdesna.
// Grupe (Services, Solutions, Resources) su sklopive, aktivna stranica je
// označena, a na dnu su kontakt gumb, e-mail i telefon.

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { headerNavLinks } from "@/data/navigation";
import { siteInfo } from "@/data/siteInfo";
import { cn } from "@/lib/utils";
import logoBrand from "../../../public/assets/logo/arctis-logo-brand.png";

interface MobileMenuProps {
  isActive: (href: string) => boolean;
}

const rowClass =
  "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-[17px] font-semibold tracking-tight transition-colors";

export default function MobileMenu({ isActive }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const items = headerNavLinks.filter((item) => item.href !== "/contact");
  // Grupa s aktivnom stranicom je otvorena pri otvaranju izbornika
  const activeGroups = items
    .filter((item) => item.sublinks?.some((sub) => isActive(sub.href)))
    .map((item) => item.label);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="group flex h-11 w-11 cursor-pointer flex-col items-end justify-center gap-[5px] rounded-xl border border-slate-200 bg-white px-[11px] shadow-xs transition-colors hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="h-0.5 w-full rounded-full bg-slate-800 transition-colors group-hover:bg-blue-700" />
          <span className="h-0.5 w-full rounded-full bg-slate-800 transition-colors group-hover:bg-blue-700" />
          <span className="h-0.5 w-3 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:bg-blue-700" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-[400px] gap-0 border-l-0 p-0 sm:max-w-[400px] [&>button:last-child]:hidden"
      >
        <SheetTitle className="sr-only">Main menu</SheetTitle>
        <SheetDescription className="sr-only">
          Site navigation and contact details
        </SheetDescription>

        {/* Zaglavlje */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-4">
          <SheetClose asChild>
            <Link href="/" aria-label="Arctis – home">
              <Image
                src={logoBrand}
                alt="Arctis"
                sizes="112px"
                className="h-10 w-auto"
              />
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close menu"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        {/* Navigacija */}
        <nav
          aria-label="Mobile"
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-4"
        >
          <Accordion type="multiple" defaultValue={activeGroups}>
            <ul className="space-y-1">
              {items.map((item, index) => {
                const style = { animationDelay: `${60 + index * 45}ms` };
                const enter =
                  "animate-in fade-in slide-in-from-right-3 duration-300 fill-mode-both";

                if (!item.sublinks) {
                  const active = isActive(item.href);
                  return (
                    <li key={item.label} className={enter} style={style}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            rowClass,
                            active
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-900 hover:bg-slate-50",
                          )}
                        >
                          {item.label}
                          {active && (
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 rounded-full bg-blue-600"
                            />
                          )}
                        </Link>
                      </SheetClose>
                    </li>
                  );
                }

                const groupActive = item.sublinks.some((s) => isActive(s.href));
                return (
                  <li key={item.label} className={enter} style={style}>
                    <AccordionItem value={item.label} className="border-b-0">
                      <AccordionTrigger
                        className={cn(
                          rowClass,
                          "hover:bg-slate-50 hover:no-underline [&>svg]:size-5 [&>svg]:translate-y-0",
                          groupActive ? "text-blue-700" : "text-slate-900",
                        )}
                      >
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 pt-1">
                        <ul className="ml-5 space-y-0.5 border-l border-slate-200 pl-2">
                          {item.sublinks.map((sub) => {
                            const active = isActive(sub.href);
                            return (
                              <li key={sub.href}>
                                <SheetClose asChild>
                                  <Link
                                    href={sub.href}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                      "block rounded-lg px-3 py-2.5 transition-colors",
                                      active ? "bg-blue-50" : "hover:bg-slate-50",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "block text-[15px] font-medium",
                                        active ? "text-blue-700" : "text-slate-900",
                                      )}
                                    >
                                      {sub.label}
                                    </span>
                                    {sub.description && (
                                      <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">
                                        {sub.description}
                                      </span>
                                    )}
                                  </Link>
                                </SheetClose>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </li>
                );
              })}
            </ul>
          </Accordion>
        </nav>

        {/* Kontakt */}
        <div className="shrink-0 border-t border-slate-200 bg-slate-50 p-4">
          <SheetClose asChild>
            <Link
              href="/contact"
              className="group flex h-12 items-center justify-center gap-1.5 rounded-full bg-primary text-[15px] font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              Contact us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </SheetClose>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-slate-600">
            <a
              href={siteInfo.emailHref}
              className="inline-flex items-center gap-1.5 hover:text-blue-700"
            >
              <Mail className="h-4 w-4 text-blue-600" />
              {siteInfo.email}
            </a>
            <a
              href={siteInfo.phoneHref}
              className="inline-flex items-center gap-1.5 hover:text-blue-700"
            >
              <Phone className="h-4 w-4 text-blue-600" />
              {siteInfo.phone}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
