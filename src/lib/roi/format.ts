// src/lib/roi/format.ts
import type { ScenarioResult } from "./model";

const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurCompact = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const number = new Intl.NumberFormat("en-IE", { maximumFractionDigits: 0 });

/** €1,234,567 */
export const formatEur = (value: number) => eur.format(Math.round(value));

/** €1.2M — za osi grafova i velike brojke */
export const formatEurCompact = (value: number) => eurCompact.format(value);

export const formatNumber = (value: number) => number.format(value);

export const formatPct = (value: number, digits = 0) =>
  `${value.toFixed(digits)}%`;

/** Povrat ulaganja kao tekst */
export function formatPayback(result: ScenarioResult, oneTimeCost: number) {
  if (result.paybackMonths !== null) {
    const m = result.paybackMonths;
    if (m < 12) return `${m} months`;
    const years = m / 12;
    return `${years.toFixed(1).replace(/\.0$/, "")} years`;
  }
  if (oneTimeCost <= 0 && result.netBenefit > 0) return "From year 1";
  return "Beyond 5 years";
}

export const todayIso = () => new Date().toISOString().split("T")[0];
