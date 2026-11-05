"use client";
// src/components/archibus/ArchibusExplorer.tsx
//
// Preglednik ARCHIBUS proizvoda: lijevo popis područja (proizvoda), desno
// zaglavlje proizvoda, kartice modula i sadržaj odabranog modula.
// Odabir se zapisuje u URL (?product=…&module=…) pa se linkovi mogu dijeliti.

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Layers, MessageSquare } from "lucide-react";
import PortableTextRenderer from "@/components/common/PortableTextRenderer";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity/sanity.queries";
import { cn } from "@/lib/utils";
import type { QueryResultArchibusProduct } from "@/types/sanity";

type Product = QueryResultArchibusProduct;
type Module = NonNullable<Product["subMenuItem"]>[number];

const slugify = (value?: string | null) =>
  (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const hasBody = (module?: Module) =>
  Array.isArray(module?.body) &&
  module.body.some(
    (block) =>
      block._type !== "block" ||
      (Array.isArray((block as { children?: { text?: string }[] }).children) &&
        (block as { children: { text?: string }[] }).children.some(
          (child) => (child.text ?? "").trim().length > 0,
        )),
  );

function ProductIcon({
  product,
  active,
  size = 20,
}: {
  product: Product;
  active: boolean;
  size?: number;
}) {
  const iconUrl = product.icon
    ? urlFor(product.icon).width(64).height(64).quality(80).url()
    : null;
  if (!iconUrl) return <Layers className="h-5 w-5" />;
  return (
    <Image
      src={iconUrl}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={cn(
        "object-contain transition",
        active ? "brightness-0 invert" : "brightness-0 opacity-60",
      )}
    />
  );
}

interface ArchibusExplorerProps {
  products: Product[];
}

export default function ArchibusExplorer({ products }: ArchibusExplorerProps) {
  const [productIndex, setProductIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const contentTopRef = useRef<HTMLDivElement>(null);
  const productNavRef = useRef<HTMLElement>(null);
  const moduleListRef = useRef<HTMLDivElement>(null);
  const didInit = useRef(false);

  const product = products[productIndex];
  const modules = useMemo(() => product?.subMenuItem ?? [], [product]);
  const activeModule = modules[moduleIndex];

  // Početno stanje iz URL-a (nakon hidratacije, bez mismatcha)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("product");
    const m = params.get("module");
    if (p) {
      const pi = products.findIndex((x) => slugify(x.name) === p);
      if (pi >= 0) {
        setProductIndex(pi);
        const mi = (products[pi].subMenuItem ?? []).findIndex(
          (x) => slugify(x.name) === m,
        );
        setModuleIndex(mi >= 0 ? mi : 0);
      }
    }
    didInit.current = true;
  }, [products]);

  // Sinkronizacija odabira u URL
  useEffect(() => {
    if (!didInit.current || !product) return;
    const params = new URLSearchParams(window.location.search);
    params.set("product", slugify(product.name));
    if (activeModule) params.set("module", slugify(activeModule.name));
    else params.delete("module");
    window.history.replaceState(null, "", `?${params.toString()}${window.location.hash}`);
  }, [product, activeModule]);

  // Aktivni element u horizontalnim trakama (mobitel) drži vidljivim
  useEffect(() => {
    const centerActive = (container: HTMLElement | null, selector: string) => {
      if (!container || container.scrollWidth <= container.clientWidth) return;
      const el = container.querySelector<HTMLElement>(selector);
      if (!el) return;
      container.scrollTo({
        left: el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    };
    centerActive(productNavRef.current, '[aria-current="true"]');
    centerActive(moduleListRef.current, '[aria-selected="true"]');
  }, [productIndex, moduleIndex]);

  const scrollToContent = useCallback(() => {
    const el = contentTopRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const selectProduct = (index: number) => {
    setProductIndex(index);
    setModuleIndex(0);
    scrollToContent();
  };

  const selectModule = (index: number) => {
    setModuleIndex(index);
    scrollToContent();
  };

  if (!product) return null;

  const headerImgUrl = product.headerImg
    ? urlFor(product.headerImg).width(720).auto("format").quality(80).url()
    : null;
  const prevModule = moduleIndex > 0 ? modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < modules.length - 1 ? modules[moduleIndex + 1] : null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-10">
      {/* ---------------- Popis proizvoda ---------------- */}
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <p className="mb-3 hidden px-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 lg:block">
          Solution areas
        </p>
        <nav
          ref={productNavRef}
          aria-label="ARCHIBUS solution areas"
          className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {products.map((p, i) => {
            const active = i === productIndex;
            return (
              <button
                key={p._id}
                type="button"
                onClick={() => selectProduct(i)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group flex shrink-0 snap-start items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all cursor-pointer",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  active
                    ? "border-slate-200 bg-white text-slate-900 shadow-sm"
                    : "border-transparent text-slate-600 hover:bg-white/70 hover:text-slate-900",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-600/25"
                      : "bg-slate-100 group-hover:bg-slate-200/70",
                  )}
                >
                  <ProductIcon product={p} active={active} />
                </span>
                <span className="whitespace-nowrap lg:flex-1 lg:whitespace-normal lg:leading-snug">
                  {p.name}
                </span>
                <span
                  className={cn(
                    "hidden rounded-full px-2 py-0.5 text-xs tabular-nums lg:inline",
                    active ? "bg-blue-50 text-blue-700" : "text-slate-400",
                  )}
                >
                  {p.subMenuItem?.length ?? 0}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ---------------- Sadržaj ---------------- */}
      <div ref={contentTopRef} className="min-w-0 space-y-6">
        {/* Zaglavlje proizvoda */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid items-center md:grid-cols-[minmax(0,1fr)_280px]">
            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">
                Solution area
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                {product.name}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {modules.length} {modules.length === 1 ? "module" : "modules"} ·
                Select a module below to see its capabilities.
              </p>
            </div>
            {headerImgUrl && (
              <div className="relative hidden h-full min-h-[180px] border-l border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/60 md:block">
                <Image
                  key={headerImgUrl}
                  src={headerImgUrl}
                  alt=""
                  fill
                  sizes="280px"
                  className="object-contain p-5"
                />
              </div>
            )}
          </div>

          {/* Kartice modula */}
          {modules.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 md:px-6">
              <div
                ref={moduleListRef}
                role="tablist"
                aria-label={`${product.name} modules`}
                className="-mx-1 flex gap-1.5 overflow-x-auto px-1 py-1 [scrollbar-width:none] md:flex-wrap"
              >
                {modules.map((m, i) => {
                  const active = i === moduleIndex;
                  return (
                    <button
                      key={m._key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => selectModule(i)}
                      className={cn(
                        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all cursor-pointer",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                        active
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900 hover:ring-slate-300",
                      )}
                    >
                      {m.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sadržaj modula */}
        <div className="rounded-2xl border border-slate-200 bg-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={`${product._id}-${activeModule?._key ?? "none"}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-6 md:p-10"
              role="tabpanel"
            >
              {activeModule && (
                <header className="mb-6 border-b border-slate-100 pb-6">
                  <p className="text-sm text-slate-500">{product.name}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.75rem]">
                    {activeModule.name}
                  </h3>
                </header>
              )}

              {hasBody(activeModule) ? (
                <PortableTextRenderer
                  value={activeModule!.body}
                  className="prose-p:text-[15px] md:prose-p:text-base prose-img:max-h-[420px] prose-img:w-auto"
                />
              ) : (
                <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <p className="font-medium text-slate-900">
                    Want to know more about {activeModule?.name ?? product.name}?
                  </p>
                  <p className="mt-1 max-w-md text-sm text-slate-500">
                    Our consultants will walk you through the module, its
                    capabilities and how it fits your organisation.
                  </p>
                  <Button asChild className="mt-5 rounded-full">
                    <Link href="/contact">Contact our team</Link>
                  </Button>
                </div>
              )}

              {/* Prethodni / sljedeći modul */}
              {(prevModule || nextModule) && (
                <nav className="mt-10 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">
                  {prevModule ? (
                    <button
                      type="button"
                      onClick={() => selectModule(moduleIndex - 1)}
                      className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40 cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4 text-slate-400 transition group-hover:-translate-x-0.5 group-hover:text-blue-600" />
                      <span>
                        <span className="block text-xs text-slate-500">Previous</span>
                        <span className="text-sm font-medium text-slate-900">
                          {prevModule.name}
                        </span>
                      </span>
                    </button>
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  {nextModule && (
                    <button
                      type="button"
                      onClick={() => selectModule(moduleIndex + 1)}
                      className="group flex items-center justify-end gap-3 rounded-xl border border-slate-200 p-4 text-right transition hover:border-blue-200 hover:bg-blue-50/40 cursor-pointer"
                    >
                      <span>
                        <span className="block text-xs text-slate-500">Next</span>
                        <span className="text-sm font-medium text-slate-900">
                          {nextModule.name}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
                    </button>
                  )}
                </nav>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
