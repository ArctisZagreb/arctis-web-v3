"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Odgoda u sekundama (za "stagger" efekt između susjednih elemenata) */
  delay?: number;
  /** Pomak po Y osi iz kojeg element ulazi */
  y?: number;
  as?: "div" | "li" | "section";
}

/**
 * Element se jednom nježno pojavi kad uđe u vidno polje.
 * Uz "prefers-reduced-motion" prikazuje se odmah, bez animacije.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </Component>
  );
}
