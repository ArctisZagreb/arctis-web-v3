// src/components/sections/LogoCarouselClient.tsx
// Beskonačni marquee logotipa — čisti CSS (bez re-rendera na svaki frame).
import Image from "next/image";
import type { ProcessedLogo } from "@/types/sanity";

interface LogoCarouselClientProps {
  logos: ProcessedLogo[];
  title?: string;
}

function LogoRow({
  logos,
  ariaHidden = false,
}: {
  logos: ProcessedLogo[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16"
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((logo) =>
        logo.imageUrl ? (
          <li key={logo.key} className="flex h-14 w-32 items-center justify-center">
            <Image
              src={logo.imageUrl}
              alt={ariaHidden ? "" : logo.alt || "Client logo"}
              width={160}
              height={64}
              className="max-h-12 w-auto object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ) : null,
      )}
    </ul>
  );
}

export default function LogoCarouselClient({
  logos = [],
  title = "Companies that chose us",
}: LogoCarouselClientProps) {
  if (!logos || logos.length === 0) return null;

  // Trajanje proporcionalno broju logotipa → konstantna brzina
  const duration = `${Math.max(25, logos.length * 3.5)}s`;

  return (
    <section className="border-b border-slate-100 bg-slate-50/70 py-12 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
          {title}
        </p>

        <div className="pause-on-hover relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div
            className="flex w-max animate-marquee"
            style={{ "--marquee-duration": duration } as React.CSSProperties}
          >
            <LogoRow logos={logos} />
            <LogoRow logos={logos} ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
