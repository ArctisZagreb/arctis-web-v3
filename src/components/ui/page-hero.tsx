import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  /** Mali natpis iznad naslova; ujedno zadnja stavka breadcrumba */
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Gumbi ili drugi sadržaj ispod opisa */
  children?: React.ReactNode;
  align?: "center" | "left";
  size?: "default" | "compact";
  className?: string;
}

/**
 * Zajednički tamni hero za sve podstranice — isti vizualni jezik kao početna
 * (mreža, plavi sjaj, gradijentni detalji), uz breadcrumb za orijentaciju.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "center",
  size = "default",
  className,
}: PageHeroProps) {
  const centered = align === "center";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#050b1f] text-white",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_80%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute -top-36 left-1/2 h-[380px] w-[820px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div
        className={cn(
          "container mx-auto px-4 md:px-6",
          size === "compact" ? "py-14 md:py-16" : "py-16 md:py-24",
        )}
      >
        <div
          className={cn(
            "max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-700",
            centered && "mx-auto text-center",
          )}
        >
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "mb-5 flex items-center gap-1.5 text-sm text-slate-400",
              centered && "justify-center",
            )}
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-cyan-300" aria-current="page">
              {eyebrow}
            </span>
          </nav>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>

          {description && (
            <p
              className={cn(
                "mt-5 text-base leading-relaxed text-slate-300 md:text-lg",
                centered && "mx-auto max-w-2xl",
              )}
            >
              {description}
            </p>
          )}

          {children && (
            <div
              className={cn(
                "mt-8 flex flex-col gap-3 min-[420px]:flex-row",
                centered && "justify-center",
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Istaknuti dio naslova u gradijentu (za korištenje unutar PageHero title) */
export function HeroAccent({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-200 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
