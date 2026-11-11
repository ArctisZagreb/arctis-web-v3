"use client";
// src/components/roi/RoiInputs.tsx
// Kartice za unos po područjima + kartica ulaganja.

import React from "react";
import Link from "next/link";
import {
  Building2,
  FileText,
  Info,
  Package,
  PiggyBank,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { formatEur } from "@/lib/roi/format";
import {
  AREAS,
  type AreaKey,
  type AreaToggles,
  type Num,
  type RoiInputs as Inputs,
  type RoiResult,
  type Scenario,
} from "@/lib/roi/model";
import { NumberField, PercentField } from "./RoiFields";

const AREA_ICONS: Record<AreaKey, LucideIcon> = {
  space: Building2,
  maintenance: Wrench,
  productivity: Users,
  energy: Zap,
  lease: FileText,
  assets: Package,
};

const AREA_QUESTIONS: Record<AreaKey, string> = {
  space: "How much space do you manage, and how much of it sits underused?",
  maintenance: "What does maintenance cost you, and how much of it is firefighting?",
  productivity: "How much of your team's time goes into manual administration?",
  energy: "What do you spend on energy across your buildings?",
  lease: "How much do you pay in rent and service charges?",
  assets: "What do you spend each year replacing furniture and equipment?",
};

interface RoiInputsProps {
  inputs: Inputs;
  toggles: AreaToggles;
  result: RoiResult;
  scenario: Scenario;
  onChange: <A extends keyof Inputs>(
    area: A,
    field: keyof Inputs[A],
    value: Num,
  ) => void;
  onToggle: (area: AreaKey) => void;
}

function AreaFields({
  area,
  inputs,
  onChange,
}: Pick<RoiInputsProps, "inputs" | "onChange"> & { area: AreaKey }) {
  switch (area) {
    case "space":
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            label="Total managed area"
            unit="m²"
            placeholder="e.g. 25,000"
            value={inputs.space.area}
            onChange={(v) => onChange("space", "area", v)}
          />
          <NumberField
            label="Annual cost per m²"
            unit="€ / m²"
            placeholder="e.g. 220"
            hint="Rent or ownership cost plus service charges, cleaning and utilities."
            value={inputs.space.costPerM2}
            onChange={(v) => onChange("space", "costPerM2", v)}
          />
          <PercentField
            className="sm:col-span-2"
            label="Underused space"
            scale={["Fully used", "Mostly empty"]}
            max={80}
            hint="Desks, rooms or floors that are empty most of the time. Occupancy studies typically find 40–50% of desks unused on an average day."
            value={inputs.space.underusedPct}
            onChange={(v) => onChange("space", "underusedPct", v)}
          />
        </div>
      );
    case "maintenance":
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            label="In-house maintenance staff"
            unit="FTE"
            placeholder="e.g. 8"
            value={inputs.maintenance.staff}
            onChange={(v) => onChange("maintenance", "staff", v)}
          />
          <NumberField
            label="Annual cost per employee"
            unit="€"
            placeholder="e.g. 32,000"
            hint="Gross salary plus employer contributions."
            value={inputs.maintenance.costPerFte}
            onChange={(v) => onChange("maintenance", "costPerFte", v)}
          />
          <NumberField
            className="sm:col-span-2"
            label="External contractors and materials"
            unit="€ / year"
            placeholder="e.g. 350,000"
            value={inputs.maintenance.externalSpend}
            onChange={(v) => onChange("maintenance", "externalSpend", v)}
          />
          <PercentField
            className="sm:col-span-2"
            label="Reactive work"
            scale={["All planned", "All emergency"]}
            hint="Share of maintenance done after something breaks, rather than planned in advance."
            value={inputs.maintenance.reactivePct}
            onChange={(v) => onChange("maintenance", "reactivePct", v)}
          />
        </div>
      );
    case "productivity":
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField
            label="FM and real-estate admin staff"
            unit="FTE"
            placeholder="e.g. 6"
            value={inputs.productivity.staff}
            onChange={(v) => onChange("productivity", "staff", v)}
          />
          <NumberField
            label="Annual cost per employee"
            unit="€"
            placeholder="e.g. 34,000"
            value={inputs.productivity.costPerFte}
            onChange={(v) => onChange("productivity", "costPerFte", v)}
          />
          <PercentField
            className="sm:col-span-2"
            label="Time spent on manual work"
            scale={["Fully automated", "All manual"]}
            hint="Data entry, searching for drawings and contracts, chasing requests by e-mail, compiling reports."
            value={inputs.productivity.manualPct}
            onChange={(v) => onChange("productivity", "manualPct", v)}
          />
        </div>
      );
    case "energy":
      return (
        <NumberField
          label="Annual energy cost"
          unit="€ / year"
          placeholder="e.g. 420,000"
          hint="Electricity, heating, cooling and gas across the buildings in scope."
          value={inputs.energy.annualCost}
          onChange={(v) => onChange("energy", "annualCost", v)}
        />
      );
    case "lease":
      return (
        <NumberField
          label="Annual lease and service-charge payments"
          unit="€ / year"
          placeholder="e.g. 2,400,000"
          hint="Total paid to landlords across all leased locations."
          value={inputs.lease.annualCost}
          onChange={(v) => onChange("lease", "annualCost", v)}
        />
      );
    case "assets":
      return (
        <NumberField
          label="Annual spend on furniture and equipment"
          unit="€ / year"
          placeholder="e.g. 300,000"
          hint="Replacement and new purchases, excluding construction."
          value={inputs.assets.annualSpend}
          onChange={(v) => onChange("assets", "annualSpend", v)}
        />
      );
  }
}

export default function RoiInputs({
  inputs,
  toggles,
  result,
  scenario,
  onChange,
  onToggle,
}: RoiInputsProps) {
  return (
    <div className="space-y-4">
      {AREAS.map((area, index) => {
        const Icon = AREA_ICONS[area.key];
        const enabled = toggles[area.key];
        const saving =
          result.areas.find((a) => a.key === area.key)?.annual[scenario] ?? 0;

        return (
          <section
            key={area.key}
            aria-labelledby={`roi-area-${area.key}`}
            className={cn(
              "rounded-2xl border bg-white transition-colors",
              enabled ? "border-slate-200 shadow-sm" : "border-slate-200/70",
            )}
          >
            <div className="flex items-start gap-4 p-5 md:p-6">
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                  enabled
                    ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                    : "bg-slate-100 text-slate-400",
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3
                    id={`roi-area-${area.key}`}
                    className={cn(
                      "text-lg font-semibold tracking-tight",
                      enabled ? "text-slate-900" : "text-slate-500",
                    )}
                  >
                    <span className="mr-2 font-mono text-sm font-medium text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {area.label}
                  </h3>
                  {enabled && saving > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium tabular-nums text-slate-700">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: area.color }}
                      />
                      {formatEur(saving)} / year
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {AREA_QUESTIONS[area.key]}
                </p>
              </div>

              <Switch
                checked={enabled}
                onCheckedChange={() => onToggle(area.key)}
                aria-label={`Include ${area.label} in the estimate`}
                className="mt-1 shrink-0"
              />
            </div>

            {enabled && (
              <div className="border-t border-slate-100 p-5 md:p-6">
                <AreaFields area={area.key} inputs={inputs} onChange={onChange} />
              </div>
            )}
          </section>
        );
      })}

      {/* Ulaganje */}
      <section
        aria-labelledby="roi-investment"
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="flex items-start gap-4 p-5 md:p-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
            <PiggyBank className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <h3
              id="roi-investment"
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              Your investment{" "}
              <span className="text-sm font-normal text-slate-400">
                (optional)
              </span>
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add a budget or a quote to see ROI, payback period and net
              present value.
            </p>
          </div>
        </div>
        <div className="grid gap-5 border-t border-slate-100 p-5 sm:grid-cols-2 md:p-6">
          <NumberField
            label="One-time cost"
            unit="€"
            placeholder="Your budget or quote"
            hint="Licences, implementation, data migration and training."
            value={inputs.investment.oneTime}
            onChange={(v) => onChange("investment", "oneTime", v)}
          />
          <NumberField
            label="Annual running cost"
            unit="€ / year"
            placeholder="Your budget or quote"
            hint="Subscription or maintenance, hosting and support."
            value={inputs.investment.annual}
            onChange={(v) => onChange("investment", "annual", v)}
          />
          <p className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 sm:col-span-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <span>
              No quote yet? Leave this empty and we&apos;ll show how large an
              investment your savings would justify.{" "}
              <Link
                href="/contact"
                className="font-medium text-blue-700 underline-offset-2 hover:underline"
              >
                Ask us for an indicative quote
              </Link>
              .
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}
