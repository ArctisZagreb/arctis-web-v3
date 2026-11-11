"use client";
// src/components/roi/RoiCharts.tsx
//
// Grafovi rezultata:
//  1. SavingsByAreaBars — odakle dolaze uštede (vodoravne trake, HTML/CSS)
//  2. CumulativeChart   — kumulativna neto korist kroz 5 godina; linija je
//                         odabrani scenarij, osjenčani pojas raspon scenarija
//  3. YearlyStackChart  — uštede po godinama i područjima (stupci)
//
// Boje područja dolaze iz modela (validirana paleta za daltoniste); tekst je
// uvijek u neutralnim tonovima, a identitet nosi obojena oznaka uz tekst.

import React from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import { formatEur, formatEurCompact } from "@/lib/roi/format";
import {
  AREAS,
  AREA_BY_KEY,
  SCENARIO_LABELS,
  type AreaKey,
  type RoiResult,
  type Scenario,
} from "@/lib/roi/model";

const INK = {
  primary: "#0f172a",
  secondary: "#475569",
  muted: "#94a3b8",
  grid: "#e2e8f0",
  axis: "#cbd5e1",
  accent: "#2563eb",
};

const axisTick = { fill: INK.secondary, fontSize: 12 };

// ---------------------------------------------------------------------------
// 1. Uštede po području
// ---------------------------------------------------------------------------

export function SavingsByAreaBars({
  result,
  scenario,
}: {
  result: RoiResult;
  scenario: Scenario;
}) {
  const rows = result.areas
    .filter((a) => a.annual[scenario] > 0)
    .sort((a, b) => b.annual[scenario] - a.annual[scenario]);
  const max = Math.max(...rows.map((r) => r.annual[scenario]), 1);
  const total = rows.reduce((sum, r) => sum + r.annual[scenario], 0);

  return (
    <ul className="space-y-5">
      {rows.map((row) => {
        const meta = AREA_BY_KEY[row.key];
        const value = row.annual[scenario];
        const share = total > 0 ? (value / total) * 100 : 0;
        return (
          <li key={row.key}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                {meta.label}
                {meta.savingType === "soft" && (
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-normal text-slate-500">
                    capacity
                  </span>
                )}
              </span>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {formatEur(value)}
                <span className="ml-1.5 font-normal text-slate-500">
                  {share.toFixed(0)}%
                </span>
              </span>
            </div>
            <div
              className="mt-2 h-3 rounded-r-[4px] bg-slate-100"
              role="img"
              aria-label={`${meta.label}: ${formatEur(value)} per year, ${share.toFixed(0)}% of total`}
            >
              <div
                className="h-full rounded-r-[4px] transition-[width] duration-500 ease-out"
                style={{
                  width: `${Math.max(2, (value / max) * 100)}%`,
                  backgroundColor: meta.color,
                }}
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              {row.baseLabel}: {formatEur(row.baseCost)} · range{" "}
              {formatEur(row.annual.conservative)} –{" "}
              {formatEur(row.annual.optimistic)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Zajednički tooltip
// ---------------------------------------------------------------------------

function TooltipCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs shadow-lg">
      {children}
    </div>
  );
}

const yearLabel = (year: number) => (year === 0 ? "Start" : `Year ${year}`);

// ---------------------------------------------------------------------------
// 2. Kumulativna neto korist
// ---------------------------------------------------------------------------

interface CumulativePoint {
  year: number;
  value: number;
  range: [number, number];
  low: number;
  high: number;
}

function CumulativeTooltip({
  active,
  payload,
  scenario,
}: TooltipProps<number, string> & { scenario: Scenario }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as CumulativePoint;
  return (
    <TooltipCard>
      <p className="mb-1.5 font-semibold text-slate-900">{yearLabel(point.year)}</p>
      <dl className="space-y-1">
        <div className="flex items-center justify-between gap-6">
          <dt className="flex items-center gap-1.5 text-slate-600">
            <span className="h-0.5 w-3 rounded bg-blue-600" aria-hidden="true" />
            {SCENARIO_LABELS[scenario]}
          </dt>
          <dd className="font-semibold tabular-nums text-slate-900">
            {formatEur(point.value)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-6">
          <dt className="flex items-center gap-1.5 text-slate-600">
            <span className="h-2 w-3 rounded-sm bg-blue-600/15" aria-hidden="true" />
            Range
          </dt>
          <dd className="tabular-nums text-slate-700">
            {formatEur(point.low)} – {formatEur(point.high)}
          </dd>
        </div>
      </dl>
    </TooltipCard>
  );
}

export function CumulativeChart({
  result,
  scenario,
}: {
  result: RoiResult;
  scenario: Scenario;
}) {
  const selected = result.scenarios[scenario];
  const data: CumulativePoint[] = selected.years.map((row, i) => {
    const low = result.scenarios.conservative.years[i].cumulativeNet;
    const high = result.scenarios.optimistic.years[i].cumulativeNet;
    return {
      year: row.year,
      value: row.cumulativeNet,
      range: [low, high],
      low,
      high,
    };
  });

  const last = data[data.length - 1];
  const payback = selected.paybackMonths;
  const showZero = result.hasInvestment;

  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
        <li className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded bg-blue-600" aria-hidden="true" />
          {SCENARIO_LABELS[scenario]} scenario
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-2.5 w-4 rounded-sm bg-blue-600/15" aria-hidden="true" />
          Conservative to optimistic range
        </li>
        {payback !== null && (
          <li className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-900 ring-1 ring-slate-900"
              aria-hidden="true"
            />
            Break-even
          </li>
        )}
      </ul>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 24, right: 64, bottom: 4, left: 4 }}>
            <CartesianGrid stroke={INK.grid} vertical={false} />
            <XAxis
              dataKey="year"
              type="number"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickFormatter={yearLabel}
              tick={axisTick}
              tickLine={false}
              axisLine={{ stroke: INK.axis }}
            />
            <YAxis
              tickFormatter={formatEurCompact}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              width={64}
            />
            <Tooltip
              content={<CumulativeTooltip scenario={scenario} />}
              cursor={{ stroke: INK.axis, strokeWidth: 1 }}
            />
            <Area
              dataKey="range"
              stroke="none"
              fill={INK.accent}
              fillOpacity={0.1}
              isAnimationActive={false}
              activeDot={false}
            />
            {showZero && <ReferenceLine y={0} stroke={INK.muted} strokeWidth={1} />}
            <Line
              dataKey="value"
              stroke={INK.accent}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              dot={false}
              activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
              isAnimationActive={false}
            />
            {/* Izravna oznaka na kraju linije */}
            <ReferenceDot
              x={last.year}
              y={last.value}
              r={4}
              fill={INK.accent}
              stroke="#fff"
              strokeWidth={2}
              label={{
                value: formatEurCompact(last.value),
                position: "right",
                fill: INK.primary,
                fontSize: 12,
                fontWeight: 600,
              }}
            />
            {payback !== null && (
              <ReferenceDot
                x={payback / 12}
                y={0}
                r={5}
                fill={INK.primary}
                stroke="#fff"
                strokeWidth={2}
                label={{
                  value: `Break-even · ${payback} mo`,
                  position: "top",
                  fill: INK.primary,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. Uštede po godinama i područjima
// ---------------------------------------------------------------------------

function YearlyTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum, p) => sum + (Number(p.value) || 0), 0);
  return (
    <TooltipCard>
      <p className="mb-1.5 font-semibold text-slate-900">Year {label}</p>
      <dl className="space-y-1">
        {[...payload].reverse().map((p) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-6">
            <dt className="flex items-center gap-1.5 text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: p.color }}
                aria-hidden="true"
              />
              {AREA_BY_KEY[p.dataKey as AreaKey].label}
            </dt>
            <dd className="tabular-nums text-slate-900">
              {formatEur(Number(p.value) || 0)}
            </dd>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between gap-6 border-t border-slate-100 pt-1.5">
          <dt className="font-medium text-slate-700">Total</dt>
          <dd className="font-semibold tabular-nums text-slate-900">
            {formatEur(total)}
          </dd>
        </div>
      </dl>
    </TooltipCard>
  );
}

export function YearlyStackChart({
  result,
  scenario,
}: {
  result: RoiResult;
  scenario: Scenario;
}) {
  const activeAreas = AREAS.filter(
    (a) => (result.areas.find((r) => r.key === a.key)?.annual[scenario] ?? 0) > 0,
  );
  const data = result.scenarios[scenario].years
    .filter((row) => row.year > 0)
    .map((row) => ({ year: row.year, ...row.byArea }));

  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
        {activeAreas.map((a) => (
          <li key={a.key} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: a.color }}
              aria-hidden="true"
            />
            {a.label}
          </li>
        ))}
      </ul>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 4 }}>
            <CartesianGrid stroke={INK.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickFormatter={(y) => `Year ${y}`}
              tick={axisTick}
              tickLine={false}
              axisLine={{ stroke: INK.axis }}
            />
            <YAxis
              tickFormatter={formatEurCompact}
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              width={64}
            />
            <Tooltip content={<YearlyTooltip />} cursor={{ fill: "rgba(148,163,184,0.12)" }} />
            {activeAreas.map((a, i) => (
              <Bar
                key={a.key}
                dataKey={a.key}
                stackId="savings"
                fill={a.color}
                stroke="#ffffff"
                strokeWidth={2}
                maxBarSize={40}
                radius={i === activeAreas.length - 1 ? [4, 4, 0, 0] : 0}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
