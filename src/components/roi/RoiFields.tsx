"use client";
// src/components/roi/RoiFields.tsx
// Polja za unos: broj (s razdjelnicima tisućica) i postotak (klizač + broj).

import React, { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/roi/format";
import type { Num } from "@/lib/roi/model";

/** "1.250.000", "1,250,000", "1250000,5" → broj; prazno → null */
function parseNumber(raw: string): Num {
  const cleaned = raw.replace(/[^\d.,]/g, "");
  if (!cleaned) return null;
  // Zadnji separator iza kojeg su 1–2 znamenke tretiramo kao decimalni
  const decimalMatch = cleaned.match(/[.,](\d{1,2})$/);
  const integerPart = (
    decimalMatch ? cleaned.slice(0, decimalMatch.index) : cleaned
  ).replace(/[.,]/g, "");
  const value = Number(
    decimalMatch ? `${integerPart || "0"}.${decimalMatch[1]}` : integerPart,
  );
  return Number.isFinite(value) ? value : null;
}

interface NumberFieldProps {
  label: string;
  value: Num;
  onChange: (value: Num) => void;
  unit?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  unit,
  hint,
  placeholder,
  className,
}: NumberFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");

  const display = focused ? draft : value === null ? "" : formatNumber(value);

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={display}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onFocus={() => {
            setDraft(value === null ? "" : String(value));
            setFocused(true);
          }}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setDraft(e.target.value);
            onChange(parseNumber(e.target.value));
          }}
          className={cn(
            "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-[15px] tabular-nums text-slate-900 shadow-xs outline-none transition",
            "placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15",
            unit && "pr-14",
          )}
        />
        {unit && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            {unit}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}

interface PercentFieldProps {
  label: string;
  value: Num;
  onChange: (value: Num) => void;
  hint?: string;
  /** Oznake ispod klizača, npr. ["Fully used", "Half empty"] */
  scale?: [string, string];
  max?: number;
  className?: string;
}

export function PercentField({
  label,
  value,
  onChange,
  hint,
  scale,
  max = 100,
  className,
}: PercentFieldProps) {
  const id = useId();
  const current = value ?? 0;

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-slate-800">
          {label}
        </label>
        <div className="relative w-20 shrink-0">
          <input
            type="text"
            inputMode="numeric"
            aria-label={`${label} (percent)`}
            value={value === null ? "" : String(value)}
            placeholder="0"
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              onChange(digits === "" ? null : Math.min(max, Number(digits)));
            }}
            className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-3 pr-7 text-right text-sm font-medium tabular-nums text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
          />
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            %
          </span>
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={1}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="roi-range mt-3 w-full"
        style={{ "--fill": `${(current / max) * 100}%` } as React.CSSProperties}
      />
      {scale && (
        <div className="mt-1 flex justify-between text-[11px] text-slate-400">
          <span>{scale[0]}</span>
          <span>{scale[1]}</span>
        </div>
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
