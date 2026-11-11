// src/lib/roi/exportExcel.ts
//
// Excel izvoz ROI procjene (.xlsx) — četiri lista: sažetak, tok novca kroz
// 5 godina za sva tri scenarija, uneseni podaci i pretpostavke s izvorima.
// Biblioteka se učitava tek na klik (dinamički import u RoiExportButtons).

import writeExcelFile from "write-excel-file/browser";
import type { Row, Sheet } from "write-excel-file/browser";
import { formatPayback, todayIso } from "./format";
import {
  AREAS,
  AREA_BY_KEY,
  ASSUMPTIONS,
  HORIZON_YEARS,
  RAMP_UP,
  SCENARIOS,
  SCENARIO_LABELS,
  SPACE_SAVINGS_CAP_PCT,
  type AreaToggles,
  type RoiInputs,
  type RoiResult,
  type RoiSettings,
  type Scenario,
} from "./model";

const EUR = '#,##0 "€"';
const PCT = "0.0%";
const NAVY = "#050B1F";
const LIGHT = "#F1F5F9";

type SheetOf = Sheet<File | Blob | ArrayBuffer>;

const title = (text: string): Row => [
  { value: text, fontWeight: "bold", fontSize: 16, textColor: NAVY },
];
const note = (text: string): Row => [
  { value: text, textColor: "#64748B", wrap: true },
];
const header = (...labels: string[]): Row =>
  labels.map((value, i) => ({
    value,
    fontWeight: "bold" as const,
    textColor: "#FFFFFF",
    backgroundColor: NAVY,
    align: i === 0 ? ("left" as const) : ("right" as const),
  }));
const money = (value: number, bold = false) => ({
  value: Math.round(value),
  type: Number,
  format: EUR,
  align: "right" as const,
  ...(bold ? { fontWeight: "bold" as const } : {}),
});
const label = (value: string, bold = false) => ({
  value,
  ...(bold ? { fontWeight: "bold" as const } : {}),
});
const blank: Row = [];

export interface RoiExportData {
  inputs: RoiInputs;
  toggles: AreaToggles;
  result: RoiResult;
  scenario: Scenario;
  settings: RoiSettings;
}

function summarySheet({ result, scenario, inputs }: RoiExportData): SheetOf {
  const s = result.scenarios[scenario];
  const oneTime = inputs.investment.oneTime ?? 0;

  const rows: Row[] = [
    title("ARCHIBUS ROI estimate"),
    note(`Prepared with the Arctis ROI calculator on ${todayIso()} · ${SCENARIO_LABELS[scenario]} scenario`),
    blank,
    header("Key figures", "Conservative", "Expected", "Optimistic"),
    [
      label("Annual savings at full adoption"),
      ...SCENARIOS.map((k) => money(result.scenarios[k].annualSavings)),
    ],
    [
      label("  of which direct cost savings"),
      ...SCENARIOS.map((k) => money(result.scenarios[k].hardSavings)),
    ],
    [
      label("  of which released staff capacity"),
      ...SCENARIOS.map((k) => money(result.scenarios[k].softSavings)),
    ],
    [
      label(`Total savings over ${HORIZON_YEARS} years`),
      ...SCENARIOS.map((k) => money(result.scenarios[k].totalSavings)),
    ],
  ];

  if (result.hasInvestment) {
    rows.push(
      [
        label(`Total cost over ${HORIZON_YEARS} years`),
        ...SCENARIOS.map((k) => money(result.scenarios[k].totalCost)),
      ],
      [
        label(`Net benefit over ${HORIZON_YEARS} years`, true),
        ...SCENARIOS.map((k) => money(result.scenarios[k].netBenefit, true)),
      ],
      [
        label("Return on investment"),
        ...SCENARIOS.map((k) => ({
          value: (result.scenarios[k].roiPct ?? 0) / 100,
          type: Number,
          format: "0%",
          align: "right" as const,
        })),
      ],
      [
        label("Payback period"),
        ...SCENARIOS.map((k) => ({
          value: formatPayback(result.scenarios[k], oneTime),
          align: "right" as const,
        })),
      ],
      [
        label("Net present value"),
        ...SCENARIOS.map((k) => money(result.scenarios[k].npv ?? 0)),
      ],
    );
  } else {
    rows.push([
      label("Investment that pays back within 24 months (expected)"),
      money(result.breakEvenInvestment24m),
    ]);
  }

  rows.push(
    blank,
    header(
      `Savings by area (${SCENARIO_LABELS[scenario]})`,
      "Addressable cost",
      "Annual saving",
      "Share",
    ),
  );
  result.areas
    .filter((a) => a.annual[scenario] > 0)
    .forEach((a) => {
      rows.push([
        label(AREA_BY_KEY[a.key].label),
        money(a.baseCost),
        money(a.annual[scenario]),
        {
          value: s.annualSavings > 0 ? a.annual[scenario] / s.annualSavings : 0,
          type: Number,
          format: "0%",
          align: "right" as const,
        },
      ]);
    });
  rows.push([
    label("Total", true),
    null,
    money(s.annualSavings, true),
    { value: 1, type: Number, format: "0%", align: "right", fontWeight: "bold" },
  ]);

  rows.push(
    blank,
    note(
      "This is an estimate based on the figures you entered and the assumptions listed on the Assumptions sheet. Actual results depend on scope, data quality and adoption. Contact Arctis for a detailed assessment: info@arctis.hr",
    ),
  );

  return {
    data: rows,
    sheet: "Summary",
    columns: [{ width: 52 }, { width: 20 }, { width: 20 }, { width: 20 }],
  };
}

function cashFlowSheet({ result }: RoiExportData): SheetOf {
  const rows: Row[] = [
    title(`${HORIZON_YEARS}-year cash flow`),
    note(
      `Benefits ramp up over time: ${RAMP_UP.map((r, i) => `year ${i + 1} ${Math.round(r * 100)}%`).join(", ")}.`,
    ),
  ];

  SCENARIOS.forEach((key) => {
    const s = result.scenarios[key];
    rows.push(
      blank,
      header(
        `${SCENARIO_LABELS[key]} scenario`,
        ...s.years.map((y) => (y.year === 0 ? "Start" : `Year ${y.year}`)),
        "Total",
      ),
    );
    AREAS.forEach((area) => {
      const total = s.years.reduce((sum, y) => sum + y.byArea[area.key], 0);
      if (total <= 0) return;
      rows.push([
        label(`  ${area.label}`),
        ...s.years.map((y) => money(y.byArea[area.key])),
        money(total),
      ]);
    });
    rows.push(
      [
        label("Savings", true),
        ...s.years.map((y) => money(y.savings, true)),
        money(s.totalSavings, true),
      ],
      [
        label("Costs"),
        ...s.years.map((y) => money(-y.cost)),
        money(-s.totalCost),
      ],
      [
        label("Net cash flow", true),
        ...s.years.map((y) => money(y.net, true)),
        money(s.netBenefit, true),
      ],
      [
        { value: "Cumulative net", backgroundColor: LIGHT, fontWeight: "bold" },
        ...s.years.map((y) => ({
          ...money(y.cumulativeNet, true),
          backgroundColor: LIGHT,
        })),
        { backgroundColor: LIGHT },
      ],
    );
  });

  return {
    data: rows,
    sheet: "Cash flow",
    columns: [{ width: 34 }, ...Array(HORIZON_YEARS + 2).fill({ width: 16 })],
  };
}

function inputsSheet({ inputs, toggles, settings }: RoiExportData): SheetOf {
  const num = (value: number | null, format?: string) =>
    value === null
      ? { value: "—", align: "right" as const }
      : { value, type: Number, format, align: "right" as const };
  const pctCell = (value: number | null) =>
    value === null
      ? { value: "—", align: "right" as const }
      : { value: value / 100, type: Number, format: "0%", align: "right" as const };
  const inScope = (key: keyof AreaToggles) => (toggles[key] ? "Included" : "Not included");

  const rows: Row[] = [
    title("Your inputs"),
    blank,
    header("Space & occupancy", inScope("space")),
    [label("Total managed area (m²)"), num(inputs.space.area, "#,##0")],
    [label("Annual cost per m²"), num(inputs.space.costPerM2, EUR)],
    [label("Underused space"), pctCell(inputs.space.underusedPct)],
    blank,
    header("Maintenance operations", inScope("maintenance")),
    [label("In-house maintenance staff (FTE)"), num(inputs.maintenance.staff, "#,##0.0")],
    [label("Annual cost per employee"), num(inputs.maintenance.costPerFte, EUR)],
    [label("External contractors and materials"), num(inputs.maintenance.externalSpend, EUR)],
    [label("Reactive work"), pctCell(inputs.maintenance.reactivePct)],
    blank,
    header("Team productivity", inScope("productivity")),
    [label("FM and real-estate admin staff (FTE)"), num(inputs.productivity.staff, "#,##0.0")],
    [label("Annual cost per employee"), num(inputs.productivity.costPerFte, EUR)],
    [label("Time spent on manual work"), pctCell(inputs.productivity.manualPct)],
    blank,
    header("Energy", inScope("energy")),
    [label("Annual energy cost"), num(inputs.energy.annualCost, EUR)],
    blank,
    header("Lease administration", inScope("lease")),
    [label("Annual lease and service-charge payments"), num(inputs.lease.annualCost, EUR)],
    blank,
    header("Assets & equipment", inScope("assets")),
    [label("Annual spend on furniture and equipment"), num(inputs.assets.annualSpend, EUR)],
    blank,
    header("Investment", ""),
    [label("One-time cost"), num(inputs.investment.oneTime, EUR)],
    [label("Annual running cost"), num(inputs.investment.annual, EUR)],
    [label("Discount rate (for NPV)"), pctCell(settings.discountRatePct)],
  ];

  return {
    data: rows,
    sheet: "Inputs",
    columns: [{ width: 46 }, { width: 22 }],
  };
}

function assumptionsSheet(): SheetOf {
  const rows: Row[] = [
    title("Assumptions and sources"),
    note(
      "Improvement rates are applied to the addressable cost of each area. Benchmarks come from published sources; estimates are Arctis assumptions from implementation projects.",
    ),
    blank,
    header("Area", "Conservative", "Expected", "Optimistic", "Applied to", "Type", "Basis", "Source"),
  ];

  AREAS.forEach((area) => {
    const a = ASSUMPTIONS[area.key];
    rows.push([
      label(area.label, true),
      ...SCENARIOS.map((k) => ({
        value: a.rates[k] / 100,
        type: Number,
        format: PCT,
        align: "right" as const,
      })),
      { value: a.appliesTo, wrap: true },
      { value: a.kind === "benchmark" ? "Published benchmark" : "Arctis estimate" },
      { value: a.basis, wrap: true },
      { value: a.sourceUrl ? `${a.sourceLabel} — ${a.sourceUrl}` : "", wrap: true },
    ]);
  });

  rows.push(
    blank,
    [label("Space savings cap", true), { value: SPACE_SAVINGS_CAP_PCT / 100, type: Number, format: PCT, align: "right" }, { value: "of total annual space cost" }],
    [label("Analysis horizon", true), { value: HORIZON_YEARS, type: Number, align: "right" }, { value: "years" }],
    ...RAMP_UP.map(
      (r, i): Row => [
        label(i === 0 ? "Benefit ramp-up" : "", true),
        { value: r, type: Number, format: "0%", align: "right" },
        { value: `of full annual savings realised in year ${i + 1}` },
      ],
    ),
  );

  return {
    data: rows,
    sheet: "Assumptions",
    columns: [
      { width: 26 },
      { width: 14 },
      { width: 14 },
      { width: 14 },
      { width: 44 },
      { width: 20 },
      { width: 70 },
      { width: 60 },
    ],
  };
}

export async function exportRoiExcel(data: RoiExportData) {
  await writeExcelFile([
    summarySheet(data),
    cashFlowSheet(data),
    inputsSheet(data),
    assumptionsSheet(),
  ]).toFile(`Arctis_ARCHIBUS_ROI_estimate_${todayIso()}.xlsx`);
}
