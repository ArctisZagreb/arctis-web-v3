// src/components/roi/RoiPdfDocument.tsx
//
// PDF izvještaj ROI procjene (3 stranice):
//  1. sažetak — ključne brojke, uštede po područjima, usporedba scenarija
//  2. kako ARCHIBUS ostvaruje uštede + tok novca kroz 5 godina
//  3. uneseni podaci, pretpostavke s izvorima, napomena i kontakt

import React from "react";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { siteInfo } from "@/data/siteInfo";
import type { RoiExportData } from "@/lib/roi/exportExcel";
import { formatEur, formatNumber, formatPayback, todayIso } from "@/lib/roi/format";
import {
  AREAS,
  AREA_BY_KEY,
  ASSUMPTIONS,
  HORIZON_YEARS,
  RAMP_UP,
  SCENARIOS,
  SCENARIO_LABELS,
  type Num,
} from "@/lib/roi/model";

const C = {
  navy: "#050b1f",
  ink: "#0f172a",
  body: "#334155",
  muted: "#64748b",
  line: "#e2e8f0",
  soft: "#f1f5f9",
  blue: "#2563eb",
  cyan: "#67e8f9",
};

const s = StyleSheet.create({
  page: {
    paddingBottom: 54,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: C.body,
    lineHeight: 1.4,
  },
  band: { backgroundColor: C.navy, paddingHorizontal: 36, paddingVertical: 26 },
  eyebrow: { fontSize: 8, color: C.cyan, letterSpacing: 1.2, marginBottom: 6 },
  h1: {
    fontSize: 22,
    lineHeight: 1.2,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  bandMeta: { marginTop: 6, fontSize: 9, color: "#cbd5e1" },
  body: { paddingHorizontal: 36, paddingTop: 20 },
  h2: {
    fontSize: 12,
    lineHeight: 1.3,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
    marginBottom: 8,
    marginTop: 18,
  },
  kpiRow: { flexDirection: "row", gap: 8 },
  kpi: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 6,
    padding: 10,
  },
  kpiPrimary: { backgroundColor: C.navy, borderColor: C.navy },
  kpiLabel: { fontSize: 7.5, color: C.muted, marginBottom: 4 },
  kpiValue: {
    fontSize: 15,
    lineHeight: 1.25,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
  },
  kpiSub: { fontSize: 7.5, color: C.muted, marginTop: 3 },
  areaRow: { marginBottom: 9 },
  areaHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  areaName: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  bold: { fontFamily: "Helvetica-Bold", color: C.ink },
  track: { height: 6, backgroundColor: C.soft, borderRadius: 3 },
  fill: { height: 6, borderRadius: 3 },
  small: { fontSize: 7.5, color: C.muted },
  howItem: { marginBottom: 7 },
  table: { borderWidth: 1, borderColor: C.line, borderRadius: 4 },
  tr: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: C.line },
  trLast: { flexDirection: "row" },
  th: {
    backgroundColor: C.soft,
    fontFamily: "Helvetica-Bold",
    color: C.ink,
    fontSize: 8,
  },
  cell: { paddingVertical: 5, paddingHorizontal: 6, fontSize: 8 },
  right: { textAlign: "right" },
  twoCol: { flexDirection: "row", gap: 16 },
  col: { flex: 1 },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2.5,
    borderBottomWidth: 0.5,
    borderBottomColor: C.line,
  },
  disclaimer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: C.soft,
    borderRadius: 4,
    fontSize: 7.5,
    color: C.muted,
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7.5,
    color: C.muted,
    borderTopWidth: 0.5,
    borderTopColor: C.line,
    paddingTop: 8,
  },
});

const val = (value: Num, unit = "") =>
  value === null ? "—" : `${formatNumber(value)}${unit}`;
const eurVal = (value: Num) => (value === null ? "—" : formatEur(value));

function Footer() {
  return (
    <View style={s.footer} fixed>
      <Text>
        {siteInfo.companyName} · {siteInfo.email} · {siteInfo.phone}
      </Text>
      <Text
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

export function RoiPdfDocument({
  inputs,
  toggles,
  result,
  scenario,
  settings,
}: RoiExportData) {
  const sel = result.scenarios[scenario];
  const oneTime = inputs.investment.oneTime ?? 0;
  const areaRows = result.areas
    .filter((a) => a.annual[scenario] > 0)
    .sort((a, b) => b.annual[scenario] - a.annual[scenario]);
  const maxArea = Math.max(...areaRows.map((a) => a.annual[scenario]), 1);

  const kpis = result.hasInvestment
    ? [
        {
          label: "ANNUAL SAVINGS AT FULL ADOPTION",
          value: formatEur(sel.annualSavings),
          sub: `${formatEur(sel.hardSavings)} direct cost savings`,
        },
        {
          label: `NET BENEFIT OVER ${HORIZON_YEARS} YEARS`,
          value: formatEur(sel.netBenefit),
          sub: `NPV ${formatEur(sel.npv ?? 0)} at ${settings.discountRatePct}%`,
        },
        {
          label: "RETURN ON INVESTMENT",
          value: `${Math.round(sel.roiPct ?? 0)}%`,
          sub: `over ${HORIZON_YEARS} years`,
        },
        {
          label: "PAYBACK PERIOD",
          value: formatPayback(sel, oneTime),
          sub: "from project start",
        },
      ]
    : [
        {
          label: "ANNUAL SAVINGS AT FULL ADOPTION",
          value: formatEur(sel.annualSavings),
          sub: `${formatEur(sel.hardSavings)} direct cost savings`,
        },
        {
          label: `SAVINGS OVER ${HORIZON_YEARS} YEARS`,
          value: formatEur(sel.totalSavings),
          sub: "with gradual adoption",
        },
        {
          label: "INVESTMENT JUSTIFIED",
          value: formatEur(result.breakEvenInvestment24m),
          sub: "pays back within 24 months",
        },
        {
          label: "SCENARIO RANGE",
          value: formatEur(result.scenarios.conservative.annualSavings),
          sub: `up to ${formatEur(result.scenarios.optimistic.annualSavings)} per year`,
        },
      ];

  type InputGroup = { title: string; on: boolean; rows: [string, string][] };
  const allGroups: InputGroup[] = [
    {
      title: "Space & occupancy",
      on: toggles.space,
      rows: [
        ["Total managed area", val(inputs.space.area, " m²")],
        ["Annual cost per m²", eurVal(inputs.space.costPerM2)],
        ["Underused space", val(inputs.space.underusedPct, "%")],
      ],
    },
    {
      title: "Maintenance operations",
      on: toggles.maintenance,
      rows: [
        ["In-house staff (FTE)", val(inputs.maintenance.staff)],
        ["Annual cost per employee", eurVal(inputs.maintenance.costPerFte)],
        ["External contractors and materials", eurVal(inputs.maintenance.externalSpend)],
        ["Reactive work", val(inputs.maintenance.reactivePct, "%")],
      ],
    },
    {
      title: "Team productivity",
      on: toggles.productivity,
      rows: [
        ["Admin staff (FTE)", val(inputs.productivity.staff)],
        ["Annual cost per employee", eurVal(inputs.productivity.costPerFte)],
        ["Time on manual work", val(inputs.productivity.manualPct, "%")],
      ],
    },
    {
      title: "Energy",
      on: toggles.energy,
      rows: [["Annual energy cost", eurVal(inputs.energy.annualCost)]],
    },
    {
      title: "Lease administration",
      on: toggles.lease,
      rows: [["Annual lease payments", eurVal(inputs.lease.annualCost)]],
    },
    {
      title: "Assets & equipment",
      on: toggles.assets,
      rows: [["Annual replacement spend", eurVal(inputs.assets.annualSpend)]],
    },
  ];
  const inputGroups = allGroups.filter((g) => g.on);

  if (result.hasInvestment) {
    inputGroups.push({
      title: "Investment",
      on: true,
      rows: [
        ["One-time cost", eurVal(inputs.investment.oneTime)],
        ["Annual running cost", eurVal(inputs.investment.annual)],
      ],
    });
  }

  const half = Math.ceil(inputGroups.length / 2);
  const inputColumns = [inputGroups.slice(0, half), inputGroups.slice(half)];

  return (
    <Document
      title="ARCHIBUS ROI estimate"
      author={siteInfo.companyName}
      subject="Estimated savings and return on investment"
    >
      {/* ------------------------------ Stranica 1 ------------------------------ */}
      <Page size="A4" style={s.page}>
        <View style={s.band}>
          <Text style={s.eyebrow}>ARCTIS · ROI ESTIMATE</Text>
          <Text style={s.h1}>The business case for ARCHIBUS</Text>
          <Text style={s.bandMeta}>
            {SCENARIO_LABELS[scenario]} scenario · {HORIZON_YEARS}-year horizon ·
            prepared {todayIso()}
          </Text>
        </View>

        <View style={s.body}>
          <View style={s.kpiRow}>
            {kpis.map((kpi, i) => (
              <View key={kpi.label} style={[s.kpi, i === 0 ? s.kpiPrimary : {}]}>
                <Text style={[s.kpiLabel, i === 0 ? { color: "#94a3b8" } : {}]}>
                  {kpi.label}
                </Text>
                <Text style={[s.kpiValue, i === 0 ? { color: "#ffffff" } : {}]}>
                  {kpi.value}
                </Text>
                <Text style={[s.kpiSub, i === 0 ? { color: "#94a3b8" } : {}]}>
                  {kpi.sub}
                </Text>
              </View>
            ))}
          </View>

          <Text style={s.h2}>Where the savings come from</Text>
          {areaRows.map((row) => {
            const meta = AREA_BY_KEY[row.key];
            const value = row.annual[scenario];
            return (
              <View key={row.key} style={s.areaRow} wrap={false}>
                <View style={s.areaHead}>
                  <View style={s.areaName}>
                    <View style={[s.dot, { backgroundColor: meta.color }]} />
                    <Text style={s.bold}>{meta.label}</Text>
                    {meta.savingType === "soft" && (
                      <Text style={s.small}>(released capacity)</Text>
                    )}
                  </View>
                  <Text style={s.bold}>
                    {formatEur(value)} / year ·{" "}
                    {Math.round((value / sel.annualSavings) * 100)}%
                  </Text>
                </View>
                <View style={s.track}>
                  <View
                    style={[
                      s.fill,
                      {
                        width: `${Math.max(2, (value / maxArea) * 100)}%`,
                        backgroundColor: meta.color,
                      },
                    ]}
                  />
                </View>
                <Text style={[s.small, { marginTop: 2 }]}>
                  {row.baseLabel}: {formatEur(row.baseCost)} · improvement rate{" "}
                  {ASSUMPTIONS[row.key].rates[scenario]}% · range{" "}
                  {formatEur(row.annual.conservative)} to{" "}
                  {formatEur(row.annual.optimistic)}
                </Text>
              </View>
            );
          })}

          <Text style={s.h2}>Scenario comparison</Text>
          <View style={s.table} wrap={false}>
            <View style={[s.tr, s.th]}>
              <Text style={[s.cell, { width: "40%" }]}> </Text>
              {SCENARIOS.map((k) => (
                <Text key={k} style={[s.cell, s.right, { width: "20%" }]}>
                  {SCENARIO_LABELS[k]}
                </Text>
              ))}
            </View>
            {(
              [
                ["Annual savings at full adoption", (k) => formatEur(result.scenarios[k].annualSavings)],
                [`Total savings over ${HORIZON_YEARS} years`, (k) => formatEur(result.scenarios[k].totalSavings)],
                ...(result.hasInvestment
                  ? ([
                      [`Net benefit over ${HORIZON_YEARS} years`, (k) => formatEur(result.scenarios[k].netBenefit)],
                      ["Return on investment", (k) => `${Math.round(result.scenarios[k].roiPct ?? 0)}%`],
                      ["Payback period", (k) => formatPayback(result.scenarios[k], oneTime)],
                      ["Net present value", (k) => formatEur(result.scenarios[k].npv ?? 0)],
                    ] as [string, (k: (typeof SCENARIOS)[number]) => string][])
                  : []),
              ] as [string, (k: (typeof SCENARIOS)[number]) => string][]
            ).map(([name, get], rowIndex, all) => (
              <View key={name} style={rowIndex === all.length - 1 ? s.trLast : s.tr}>
                <Text style={[s.cell, { width: "40%" }]}>{name}</Text>
                {SCENARIOS.map((k) => (
                  <Text
                    key={k}
                    style={[
                      s.cell,
                      s.right,
                      { width: "20%" },
                      k === scenario ? s.bold : {},
                    ]}
                  >
                    {get(k)}
                  </Text>
                ))}
              </View>
            ))}
          </View>

        </View>
        <Footer />
      </Page>

      {/* ------------------------------ Stranica 2 ------------------------------ */}
      <Page size="A4" style={[s.page, { paddingTop: 30 }]}>
        <View style={[s.body, { paddingTop: 0 }]}>
          <Text style={[s.h2, { marginTop: 0 }]}>
            How ARCHIBUS delivers these savings
          </Text>
          {areaRows.map((row) => {
            const meta = AREA_BY_KEY[row.key];
            return (
              <View key={row.key} style={s.howItem} wrap={false}>
                <Text style={s.bold}>
                  {meta.label} — {meta.archibusArea}
                </Text>
                <Text>{meta.how}</Text>
              </View>
            );
          })}
          <Text style={s.h2}>
            {HORIZON_YEARS}-year cash flow ({SCENARIO_LABELS[scenario]} scenario)
          </Text>
          <View style={s.table} wrap={false}>
            <View style={[s.tr, s.th]}>
              <Text style={[s.cell, { width: "22%" }]}> </Text>
              {sel.years.map((y) => (
                <Text key={y.year} style={[s.cell, s.right, { width: "13%" }]}>
                  {y.year === 0 ? "Start" : `Year ${y.year}`}
                </Text>
              ))}
            </View>
            {(
              [
                ["Savings", (i: number) => sel.years[i].savings],
                ["Costs", (i: number) => -sel.years[i].cost],
                ["Net cash flow", (i: number) => sel.years[i].net],
                ["Cumulative net", (i: number) => sel.years[i].cumulativeNet],
              ] as [string, (i: number) => number][]
            ).map(([name, get], rowIndex, all) => (
              <View key={name} style={rowIndex === all.length - 1 ? s.trLast : s.tr}>
                <Text
                  style={[
                    s.cell,
                    { width: "22%" },
                    rowIndex >= 2 ? s.bold : {},
                  ]}
                >
                  {name}
                </Text>
                {sel.years.map((y, i) => (
                  <Text
                    key={y.year}
                    style={[
                      s.cell,
                      s.right,
                      { width: "13%" },
                      rowIndex >= 2 ? s.bold : {},
                    ]}
                  >
                    {formatEur(get(i))}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <Text style={[s.small, { marginTop: 4 }]}>
            Benefits ramp up as the system is adopted:{" "}
            {RAMP_UP.map((r, i) => `year ${i + 1} ${Math.round(r * 100)}%`).join(", ")}{" "}
            of full annual savings.
          </Text>

        </View>
        <Footer />
      </Page>

      {/* ------------------------------ Stranica 3 ------------------------------ */}
      <Page size="A4" style={[s.page, { paddingTop: 30 }]}>
        <View style={[s.body, { paddingTop: 0 }]}>
          <Text style={[s.h2, { marginTop: 0 }]}>Your inputs</Text>
          <View style={s.twoCol}>
            {inputColumns.map((groups, i) => (
              <View key={i} style={s.col}>
                {groups.map((group) => (
                  <View key={group.title} style={{ marginBottom: 8 }} wrap={false}>
                    <Text style={[s.bold, { marginBottom: 2 }]}>{group.title}</Text>
                    {group.rows.map(([name, value]) => (
                      <View key={name} style={s.inputRow}>
                        <Text>{name}</Text>
                        <Text style={s.bold}>{value}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </View>

          <Text style={s.h2}>Assumptions and sources</Text>
          {AREAS.filter((a) => toggles[a.key]).map((area) => {
            const a = ASSUMPTIONS[area.key];
            return (
              <View key={area.key} style={{ marginBottom: 6 }} wrap={false}>
                <Text>
                  <Text style={s.bold}>{area.label}: </Text>
                  {a.rates.conservative}% / {a.rates.expected}% /{" "}
                  {a.rates.optimistic}% of {a.appliesTo}.
                </Text>
                <Text style={s.small}>
                  {a.kind === "benchmark" ? "Published benchmark" : "Arctis estimate"}.{" "}
                  {a.basis}
                  {a.sourceLabel ? ` Source: ${a.sourceLabel}.` : ""}
                </Text>
              </View>
            );
          })}

          <View style={s.disclaimer} wrap={false}>
            <Text>
              This document is an estimate, not a quotation or a guarantee. It
              is based on the figures entered in the Arctis ROI calculator and
              on the improvement rates listed above. Actual results depend on
              project scope, data quality and how widely the system is adopted.
              For an assessment based on your own data, contact Arctis at{" "}
              {siteInfo.email} or {siteInfo.phone}. Full methodology:{" "}
              {siteInfo.siteUrl}/roi-info
            </Text>
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
}
