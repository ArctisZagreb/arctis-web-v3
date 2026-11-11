"use client";
// src/components/roi/RoiResults.tsx
// Puna analiza: ključne brojke, grafovi, kako ARCHIBUS ostvaruje uštede,
// tablica toka novca, pretpostavke s izvorima i izvoz.

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { RoiExportData } from "@/lib/roi/exportExcel";
import { formatEur, formatPayback } from "@/lib/roi/format";
import {
  AREAS,
  AREA_BY_KEY,
  ASSUMPTIONS,
  HORIZON_YEARS,
  RAMP_UP,
  SCENARIOS,
  SCENARIO_LABELS,
  SPACE_SAVINGS_CAP_PCT,
  type Scenario,
} from "@/lib/roi/model";
import {
  CumulativeChart,
  SavingsByAreaBars,
  YearlyStackChart,
} from "./RoiCharts";
import RoiExportButtons from "./RoiExportButtons";

interface RoiResultsProps {
  data: RoiExportData;
  onScenarioChange: (scenario: Scenario) => void;
  onDiscountRateChange: (rate: number) => void;
}

export function ScenarioSwitch({
  scenario,
  onChange,
  tone = "light",
}: {
  scenario: Scenario;
  onChange: (scenario: Scenario) => void;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      role="radiogroup"
      aria-label="Scenario"
      className={cn(
        "inline-flex rounded-full p-1",
        dark ? "bg-white/10" : "bg-slate-100",
      )}
    >
      {SCENARIOS.map((key) => {
        const active = key === scenario;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(key)}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
              active
                ? dark
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-white text-slate-900 shadow-sm"
                : dark
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-600 hover:text-slate-900",
            )}
          >
            {SCENARIO_LABELS[key]}
          </button>
        );
      })}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 md:p-7",
        className,
      )}
    >
      <h3 className="text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </h3>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Kpi({
  label,
  value,
  sub,
  primary = false,
}: {
  label: string;
  value: string;
  sub: string;
  primary?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 md:p-6",
        primary
          ? "border-[#050b1f] bg-[#050b1f] text-white"
          : "border-slate-200 bg-white",
      )}
    >
      <p className={cn("text-sm", primary ? "text-slate-300" : "text-slate-500")}>
        {label}
      </p>
      <p
        className={cn(
          "mt-2 text-3xl font-semibold tracking-tight md:text-[2rem]",
          primary ? "text-white" : "text-slate-900",
        )}
      >
        {value}
      </p>
      <p className={cn("mt-1.5 text-sm", primary ? "text-slate-400" : "text-slate-500")}>
        {sub}
      </p>
    </div>
  );
}

export default function RoiResults({
  data,
  onScenarioChange,
  onDiscountRateChange,
}: RoiResultsProps) {
  const { result, scenario, inputs, settings } = data;
  const sel = result.scenarios[scenario];
  const oneTime = inputs.investment.oneTime ?? 0;
  const activeAreas = result.areas.filter((a) => a.annual[scenario] > 0);

  return (
    <div id="roi-analysis" className="scroll-mt-24">
      {/* Zaglavlje analize */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
            Your business case
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {HORIZON_YEARS}-year analysis
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Every figure below updates as you change the inputs. Switch
            scenario to see how sensitive the result is to our assumptions.
          </p>
        </div>
        <ScenarioSwitch scenario={scenario} onChange={onScenarioChange} />
      </div>

      {/* Ključne brojke */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          primary
          label="Annual savings at full adoption"
          value={formatEur(sel.annualSavings)}
          sub={
            sel.softSavings > 0
              ? `${formatEur(sel.hardSavings)} direct savings + ${formatEur(sel.softSavings)} released capacity`
              : "Direct cost savings"
          }
        />
        {result.hasInvestment ? (
          <>
            <Kpi
              label={`Net benefit over ${HORIZON_YEARS} years`}
              value={formatEur(sel.netBenefit)}
              sub={`NPV ${formatEur(sel.npv ?? 0)} at ${settings.discountRatePct}% discount rate`}
            />
            <Kpi
              label="Return on investment"
              value={`${Math.round(sel.roiPct ?? 0)}%`}
              sub={`${formatEur(sel.totalSavings)} saved for ${formatEur(sel.totalCost)} invested`}
            />
            <Kpi
              label="Payback period"
              value={formatPayback(sel, oneTime)}
              sub="From project start, including ramp-up"
            />
          </>
        ) : (
          <>
            <Kpi
              label={`Savings over ${HORIZON_YEARS} years`}
              value={formatEur(sel.totalSavings)}
              sub="With gradual adoption in years 1 and 2"
            />
            <Kpi
              label="Investment justified"
              value={formatEur(result.breakEvenInvestment24m)}
              sub="Would pay back within 24 months (expected scenario)"
            />
            <Kpi
              label="Range across scenarios"
              value={`${formatEur(result.scenarios.conservative.annualSavings)}+`}
              sub={`Up to ${formatEur(result.scenarios.optimistic.annualSavings)} per year`}
            />
          </>
        )}
      </div>

      {/* Grafovi */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel
          title="Where the savings come from"
          subtitle={`Annual savings at full adoption, ${SCENARIO_LABELS[scenario].toLowerCase()} scenario`}
        >
          <SavingsByAreaBars result={result} scenario={scenario} />
        </Panel>
        <Panel
          title={
            result.hasInvestment
              ? "Cumulative net benefit"
              : "Cumulative savings"
          }
          subtitle={
            result.hasInvestment
              ? "Savings minus one-time and running costs"
              : "Add your investment to see net benefit and break-even"
          }
        >
          <CumulativeChart result={result} scenario={scenario} />
        </Panel>
      </div>

      <Panel
        className="mt-4"
        title="How savings build up year by year"
        subtitle={`Benefits ramp up as the system is adopted: ${RAMP_UP.slice(0, 3)
          .map((r, i) => `${Math.round(r * 100)}% in year ${i + 1}`)
          .join(", ")}, then 100%.`}
      >
        <YearlyStackChart result={result} scenario={scenario} />

        {/* Tablični prikaz istih podataka */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">
              {HORIZON_YEARS}-year cash flow, {SCENARIO_LABELS[scenario]} scenario
            </caption>
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th scope="col" className="py-2 pr-4 font-medium"></th>
                {sel.years.map((y) => (
                  <th key={y.year} scope="col" className="px-3 py-2 text-right font-medium">
                    {y.year === 0 ? "Start" : `Year ${y.year}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tabular-nums text-slate-700">
              <tr className="border-b border-slate-100">
                <th scope="row" className="py-2.5 pr-4 text-left font-medium text-slate-900">
                  Savings
                </th>
                {sel.years.map((y) => (
                  <td key={y.year} className="px-3 py-2.5 text-right">
                    {formatEur(y.savings)}
                  </td>
                ))}
              </tr>
              {result.hasInvestment && (
                <>
                  <tr className="border-b border-slate-100">
                    <th scope="row" className="py-2.5 pr-4 text-left font-medium text-slate-900">
                      Costs
                    </th>
                    {sel.years.map((y) => (
                      <td key={y.year} className="px-3 py-2.5 text-right">
                        {formatEur(-y.cost)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <th scope="row" className="py-2.5 pr-4 text-left font-medium text-slate-900">
                      Net cash flow
                    </th>
                    {sel.years.map((y) => (
                      <td key={y.year} className="px-3 py-2.5 text-right">
                        {formatEur(y.net)}
                      </td>
                    ))}
                  </tr>
                </>
              )}
              <tr className="bg-slate-50 font-semibold text-slate-900">
                <th scope="row" className="rounded-l-lg py-2.5 pl-3 pr-4 text-left">
                  Cumulative{result.hasInvestment ? " net" : ""}
                </th>
                {sel.years.map((y, i) => (
                  <td
                    key={y.year}
                    className={cn(
                      "px-3 py-2.5 text-right",
                      i === sel.years.length - 1 && "rounded-r-lg",
                    )}
                  >
                    {formatEur(y.cumulativeNet)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Kako ARCHIBUS ostvaruje uštede */}
      <div className="mt-14">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">
          From estimate to reality
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          How ARCHIBUS delivers these savings
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Each saving above maps to a specific ARCHIBUS solution area that
          Arctis implements, integrates and supports.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeAreas.map((row) => {
            const meta = AREA_BY_KEY[row.key];
            return (
              <Link
                key={row.key}
                href={`/archibus?product=${meta.archibusSlug}#solutions`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    {meta.label}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-slate-900">
                    {formatEur(row.annual[scenario])}
                    <span className="font-normal text-slate-500"> / yr</span>
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
                  {meta.archibusArea}
                </h3>
                <p className="mt-2 flex-grow text-[15px] leading-relaxed text-slate-600">
                  {meta.how}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                  Explore the modules
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Pretpostavke */}
      <Accordion type="single" collapsible className="mt-10">
        <AccordionItem
          value="assumptions"
          className="rounded-2xl border border-slate-200 bg-white px-6 last:border-b"
        >
          <AccordionTrigger className="py-5 text-base font-semibold text-slate-900 hover:no-underline">
            Assumptions and sources behind these numbers
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th scope="col" className="py-2 pr-4 font-medium">Area</th>
                    {SCENARIOS.map((k) => (
                      <th key={k} scope="col" className="px-3 py-2 text-right font-medium">
                        {SCENARIO_LABELS[k]}
                      </th>
                    ))}
                    <th scope="col" className="py-2 pl-4 font-medium">Applied to and basis</th>
                  </tr>
                </thead>
                <tbody>
                  {AREAS.map((area) => {
                    const a = ASSUMPTIONS[area.key];
                    return (
                      <tr key={area.key} className="border-b border-slate-100 align-top">
                        <th scope="row" className="py-3 pr-4 text-left font-medium text-slate-900">
                          <span className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ backgroundColor: area.color }}
                            />
                            {area.label}
                          </span>
                        </th>
                        {SCENARIOS.map((k) => (
                          <td
                            key={k}
                            className={cn(
                              "px-3 py-3 text-right tabular-nums",
                              k === scenario
                                ? "font-semibold text-slate-900"
                                : "text-slate-600",
                            )}
                          >
                            {a.rates[k]}%
                          </td>
                        ))}
                        <td className="py-3 pl-4 text-slate-600">
                          <p>
                            <span className="text-slate-900">Of {a.appliesTo}.</span>{" "}
                            {a.basis}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {a.kind === "benchmark" ? "Published benchmark" : "Arctis estimate"}
                            {a.sourceUrl && (
                              <>
                                {" · "}
                                <a
                                  href={a.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-blue-700 underline-offset-2 hover:underline"
                                >
                                  {a.sourceLabel}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </>
                            )}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>
                <span className="font-medium text-slate-900">Space cap:</span>{" "}
                space savings never exceed {SPACE_SAVINGS_CAP_PCT}% of your total
                space cost, whatever share is underused.
              </li>
              <li>
                <span className="font-medium text-slate-900">Ramp-up:</span>{" "}
                {RAMP_UP.map((r, i) => `year ${i + 1} ${Math.round(r * 100)}%`).join(", ")}{" "}
                of full annual savings.
              </li>
              <li>
                <span className="font-medium text-slate-900">Released capacity:</span>{" "}
                productivity gains are staff time freed for other work, not a
                reduction in payroll. They are shown separately from direct
                savings.
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <label htmlFor="roi-discount" className="font-medium text-slate-900">
                  Discount rate for NPV:
                </label>
                <span className="relative inline-block w-20">
                  <input
                    id="roi-discount"
                    type="number"
                    min={0}
                    max={30}
                    step={0.5}
                    value={settings.discountRatePct}
                    onChange={(e) =>
                      onDiscountRateChange(
                        Math.min(30, Math.max(0, Number(e.target.value) || 0)),
                      )
                    }
                    className="h-8 w-full rounded-md border border-slate-200 pl-2 pr-6 text-right text-sm tabular-nums outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
                    %
                  </span>
                </span>
              </li>
            </ul>
            <Link
              href="/roi-info"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Read the full methodology
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Izvoz + CTA */}
      <div className="relative isolate mt-10 overflow-hidden rounded-3xl bg-[#050b1f] p-7 text-white md:p-10">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid-dark opacity-60" />
          <div className="absolute -top-24 right-0 h-64 w-[520px] rounded-full bg-blue-600/30 blur-[100px]" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Take this business case with you
            </h2>
            <p className="mt-3 max-w-xl text-slate-300">
              Download a PDF report to share with decision-makers, or the Excel
              model with your inputs, all three scenarios and the yearly cash
              flow. Nothing you entered leaves your browser.
            </p>
            <RoiExportButtons data={data} tone="dark" className="mt-6" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:max-w-xs">
            <p className="font-semibold">Want it validated on your data?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Our consultants will review the assumptions with you and turn
              this estimate into a scoped proposal.
            </p>
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Talk to an expert
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-slate-500">
        This calculator provides an estimate, not a quotation or a guarantee.
        Actual results depend on project scope, data quality and how widely the
        system is adopted.
      </p>
    </div>
  );
}
