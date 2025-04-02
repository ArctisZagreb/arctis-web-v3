"use client";

import { useEffect, useRef, useState, memo } from "react";
import Image from "next/image";
import type { ProcessedLogo } from "@/types/sanity";

// Memoize individual logo components to prevent unnecessary rerenders
const LogoItem = memo(({ logo }: { logo: ProcessedLogo }) => (
  <div className="flex-shrink-0 mx-2 sm:mx-8 py-2">
    <div className="h-16 w-32 relative flex items-center justify-center bg-transparent p-2">
      {logo.imageUrl ? (
        <Image
          src={logo.imageUrl}
          alt={logo.alt || "Client Logo"}
          width={220}
          height={160}
          loading="eager" // Load eagerly to prevent layout shift
          priority={true} // Prioritize loading these images
          className="max-h-[200px] w-auto object-contain grayscale opacity-80 transition-opacity duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-muted-foreground">
          Missing Logo
        </div>
      )}
    </div>
  </div>
));

LogoItem.displayName = "LogoItem";

interface LogoCarouselClientProps {
  logos: ProcessedLogo[];
  title?: string;
}

function LogoCarouselClient({
  logos = [],
  title = "Companies That Chose Us",
}: LogoCarouselClientProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const width =
          logos.length > 2
            ? containerRef.current.scrollWidth / 2
            : containerRef.current.scrollWidth;
        setContainerWidth(width);
        setIsLoaded(true);
      }
    };

    // Use ResizeObserver for more accurate size detection
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);

    // Also measure after a delay to account for image loading
    const timeoutId = setTimeout(updateWidth, 300);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      clearTimeout(timeoutId);
    };
  }, [logos.length]);
  // Animation effect

  // Only duplicate if we have enough logos to make it worthwhile
  const duplicatedLogos = logos.length > 2 ? [...logos, ...logos] : logos;

  useEffect(() => {
    if (
      !isLoaded ||
      isPaused ||
      containerWidth === 0 ||
      duplicatedLogos.length === 0
    ) {
      return;
    }

    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      setScrollPosition((prev) => {
        // Speed adjustment - smaller = slower
        const speed = Math.min(0.03, 30 / duplicatedLogos.length); // Adjust speed based on logo count
        const newPosition = prev + delta * speed;
        return newPosition >= containerWidth
          ? newPosition - containerWidth
          : newPosition;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [containerWidth, isPaused, duplicatedLogos.length, isLoaded]);

  // Early return if no logos to prevent unnecessary rendering
  if (!logos || logos.length === 0) {
    return (
      <section className="py-12 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>
          <p className="text-muted-foreground">No client logos found.</p>
        </div>
      </section>
    );
  }

  // Measure container width once all images are loaded

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={containerRef}
            className="flex items-center"
            style={{
              transform: isLoaded ? `translateX(-${scrollPosition}px)` : "none",
              width: "fit-content",
              // Subtle opacity transition when loaded
              opacity: isLoaded ? 1 : 0.7,
              transition: "opacity 0.5s ease-in",
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <LogoItem key={`${logo.key}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Export memoized version to prevent unnecessary re-renders
export default memo(LogoCarouselClient);
