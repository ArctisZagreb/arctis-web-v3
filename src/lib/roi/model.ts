// src/lib/roi/model.ts
//
// Model ROI kalkulatora. Sve pretpostavke su na jednom mjestu, svaka s izvorom
// (industrijski benchmark) ili jasno označena kao procjena Arctisa.
//
// Logika u jednoj rečenici:
//   godišnja ušteda po području = trošak koji se može smanjiti × stopa poboljšanja
// uz tri scenarija (konzervativni / očekivani / optimistični), postupno
// ostvarivanje koristi kroz godine (ramp-up) te ROI, povrat i NPV kad korisnik
// unese trošak ulaganja.

// ---------------------------------------------------------------------------
// Tipovi
// ---------------------------------------------------------------------------

export type AreaKey =
  | "space"
  | "maintenance"
  | "productivity"
  | "energy"
  | "lease"
  | "assets";

export type Scenario = "conservative" | "expected" | "optimistic";

export const SCENARIOS: Scenario[] = ["conservative", "expected", "optimistic"];

export const SCENARIO_LABELS: Record<Scenario, string> = {
  conservative: "Conservative",
  expected: "Expected",
  optimistic: "Optimistic",
};

/** Prazno polje = null (još nije uneseno) */
export type Num = number | null;

export interface RoiInputs {
  space: { area: Num; costPerM2: Num; underusedPct: Num };
  maintenance: {
    staff: Num;
    costPerFte: Num;
    externalSpend: Num;
    reactivePct: Num;
  };
  productivity: { staff: Num; costPerFte: Num; manualPct: Num };
  energy: { annualCost: Num };
  lease: { annualCost: Num };
  assets: { annualSpend: Num };
  investment: { oneTime: Num; annual: Num };
}

export type AreaToggles = Record<AreaKey, boolean>;

export interface RoiSettings {
  /** Diskontna stopa za NPV, u postocima */
  discountRatePct: number;
}

export const HORIZON_YEARS = 5;

/**
 * Udio pune godišnje uštede koji se ostvari u pojedinoj godini.
 * Koristi ne dolaze prvi dan: prva godina uključuje implementaciju i uhodavanje.
 */
export const RAMP_UP = [0.5, 0.8, 1, 1, 1] as const;

export const DEFAULT_SETTINGS: RoiSettings = { discountRatePct: 8 };

// ---------------------------------------------------------------------------
// Pretpostavke (stope poboljšanja) s izvorima
// ---------------------------------------------------------------------------

export interface Assumption {
  /** Stopa po scenariju, u postocima */
  rates: Record<Scenario, number>;
  /** Na što se stopa primjenjuje */
  appliesTo: string;
  /** Izvor / obrazloženje */
  basis: string;
  /** "benchmark" = javno dostupan izvor; "estimate" = procjena Arctisa */
  kind: "benchmark" | "estimate";
  sourceLabel?: string;
  sourceUrl?: string;
}

/** Gornja granica uštede na prostoru kao udio ukupnog troška prostora */
export const SPACE_SAVINGS_CAP_PCT = 15;

export const ASSUMPTIONS: Record<AreaKey, Assumption> = {
  space: {
    rates: { conservative: 25, expected: 40, optimistic: 60 },
    appliesTo: "share of underused space you can release, sublet or repurpose",
    basis: `Capped at ${SPACE_SAVINGS_CAP_PCT}% of total space cost. Gartner estimated that improving space use can reduce annual facilities costs by 10–15%; recent occupancy measurements find roughly half of desks empty on a typical day.`,
    kind: "benchmark",
    sourceLabel: "Gartner, cited by Planon",
    sourceUrl:
      "https://planonsoftware.com/us/resources/blogs/more-than-numbers-understanding-the-value-of-an-iwms/",
  },
  maintenance: {
    rates: { conservative: 10, expected: 15, optimistic: 18 },
    appliesTo: "maintenance spend currently going to reactive work",
    basis:
      "A preventive maintenance programme saves an estimated 12–18% compared with a reactive one.",
    kind: "benchmark",
    sourceLabel: "US Department of Energy, O&M Best Practices Guide 3.0",
    sourceUrl:
      "https://www.pnnl.gov/projects/om-best-practices/advanced-maintenance-approach-reliability-centered-maintenance",
  },
  productivity: {
    rates: { conservative: 15, expected: 25, optimistic: 35 },
    appliesTo: "staff time spent on manual data entry, searching and reporting",
    basis:
      "Arctis estimate from implementation projects: one shared database, self-service requests and automated reports remove a share of manual work. Treated as released capacity, not a cash saving.",
    kind: "estimate",
  },
  energy: {
    rates: { conservative: 3, expected: 5, optimistic: 9 },
    appliesTo: "annual energy cost",
    basis:
      "Median savings of 3–4% with energy information systems and about 9% with fault detection and diagnostics, across a large multi-site sample.",
    kind: "benchmark",
    sourceLabel: "Berkeley Lab, Smart Energy Analytics Campaign",
    sourceUrl:
      "https://buildings.lbl.gov/sites/default/files/Smart%20Energy%20Analytics%20Campaign%20Year%203%20Report_LBNL_11.1.19.pdf",
  },
  lease: {
    rates: { conservative: 1, expected: 2, optimistic: 3 },
    appliesTo: "annual lease and service-charge payments",
    basis:
      "Arctis estimate, kept deliberately low: missed indexation and break dates, duplicate or incorrect charges, late-payment penalties.",
    kind: "estimate",
  },
  assets: {
    rates: { conservative: 3, expected: 5, optimistic: 8 },
    appliesTo: "annual spend on replacing furniture and equipment",
    basis:
      "Arctis estimate: fewer duplicate purchases and longer asset life once every asset has a location, owner and history. Asset registers are commonly reported to contain 10–30% untraceable items.",
    kind: "estimate",
  },
};

// ---------------------------------------------------------------------------
// Opis područja (za UI, PDF i Excel)
// ---------------------------------------------------------------------------

export interface AreaMeta {
  key: AreaKey;
  label: string;
  shortLabel: string;
  /** "hard" = izravan novčani učinak; "soft" = oslobođeno vrijeme */
  savingType: "hard" | "soft";
  /** Kako ARCHIBUS / Arctis ostvaruje uštedu */
  how: string;
  /** ARCHIBUS područje i slug za link na /archibus?product=… */
  archibusArea: string;
  archibusSlug: string;
  color: string;
}

export const AREAS: AreaMeta[] = [
  {
    key: "space",
    label: "Space & occupancy",
    shortLabel: "Space",
    savingType: "hard",
    how: "A live space inventory linked to floor plans shows who uses what. Chargeback makes departments accountable for their footprint, so underused areas are released, sublet or reassigned instead of leased again.",
    archibusArea: "Space Planning Management",
    archibusSlug: "space-planning-management",
    color: "#2a78d6",
  },
  {
    key: "maintenance",
    label: "Maintenance operations",
    shortLabel: "Maintenance",
    savingType: "hard",
    how: "Preventive schedules, SLA tracking and mobile work orders move work from emergency call-outs to planned jobs, with full cost history per asset and per contractor.",
    archibusArea: "Building Operations & Maintenance",
    archibusSlug: "building-operations-and-maintenance",
    color: "#eb6834",
  },
  {
    key: "productivity",
    label: "Team productivity",
    shortLabel: "Productivity",
    savingType: "soft",
    how: "One system replaces spreadsheets and e-mail chains. Staff raise requests through a self-service portal, and reports that took days are generated on demand.",
    archibusArea: "Workplace Services",
    archibusSlug: "workplace-services",
    color: "#1baf7a",
  },
  {
    key: "energy",
    label: "Energy",
    shortLabel: "Energy",
    savingType: "hard",
    how: "Consumption is tracked per building and benchmarked, so abnormal use, billing errors and the worst-performing sites become visible and can be acted on.",
    archibusArea: "Sustainability & Risk Management",
    archibusSlug: "sustainability-and-risk-management",
    color: "#eda100",
  },
  {
    key: "lease",
    label: "Lease administration",
    shortLabel: "Leases",
    savingType: "hard",
    how: "Every lease, clause and critical date lives in one place with automatic alerts, so options and indexation are handled on time and charges are checked against the contract.",
    archibusArea: "Real Estate Property",
    archibusSlug: "real-estate-property",
    color: "#e87ba4",
  },
  {
    key: "assets",
    label: "Assets & equipment",
    shortLabel: "Assets",
    savingType: "hard",
    how: "Each asset has a location, an owner and a maintenance history. Idle equipment is redeployed before new items are bought, and replacement is planned on condition rather than guesswork.",
    archibusArea: "Asset Management",
    archibusSlug: "asset-management",
    color: "#008300",
  },
];

export const AREA_BY_KEY = Object.fromEntries(
  AREAS.map((a) => [a.key, a]),
) as Record<AreaKey, AreaMeta>;

// ---------------------------------------------------------------------------
// Početno stanje i primjeri
// ---------------------------------------------------------------------------

export const EMPTY_INPUTS: RoiInputs = {
  space: { area: null, costPerM2: null, underusedPct: null },
  maintenance: {
    staff: null,
    costPerFte: null,
    externalSpend: null,
    reactivePct: null,
  },
  productivity: { staff: null, costPerFte: null, manualPct: null },
  energy: { annualCost: null },
  lease: { annualCost: null },
  assets: { annualSpend: null },
  investment: { oneTime: null, annual: null },
};

export const DEFAULT_TOGGLES: AreaToggles = {
  space: true,
  maintenance: true,
  productivity: true,
  energy: false,
  lease: false,
  assets: false,
};

export interface ExampleProfile {
  id: string;
  label: string;
  description: string;
  inputs: RoiInputs;
  toggles: AreaToggles;
}

/** Ilustrativni profili — služe samo kao primjer popunjavanja, nisu benchmark. */
export const EXAMPLE_PROFILES: ExampleProfile[] = [
  {
    id: "corporate",
    label: "Corporate offices",
    description:
      "Illustrative example: a company with 25,000 m² of leased offices in several locations and a hybrid working model.",
    inputs: {
      space: { area: 25000, costPerM2: 220, underusedPct: 30 },
      maintenance: {
        staff: 8,
        costPerFte: 32000,
        externalSpend: 350000,
        reactivePct: 55,
      },
      productivity: { staff: 6, costPerFte: 34000, manualPct: 35 },
      energy: { annualCost: 420000 },
      lease: { annualCost: 2400000 },
      assets: { annualSpend: 300000 },
      investment: { oneTime: null, annual: null },
    },
    toggles: {
      space: true,
      maintenance: true,
      productivity: true,
      energy: true,
      lease: true,
      assets: true,
    },
  },
  {
    id: "hotel",
    label: "Hotel group",
    description:
      "Illustrative example: a hotel group with 5 owned properties, about 30,000 m² in total, and an in-house maintenance team.",
    inputs: {
      space: { area: 30000, costPerM2: 200, underusedPct: 12 },
      maintenance: {
        staff: 15,
        costPerFte: 38000,
        externalSpend: 80000,
        reactivePct: 55,
      },
      productivity: { staff: 5, costPerFte: 35000, manualPct: 35 },
      energy: { annualCost: 250000 },
      lease: { annualCost: null },
      assets: { annualSpend: 150000 },
      investment: { oneTime: null, annual: null },
    },
    toggles: {
      space: true,
      maintenance: true,
      productivity: true,
      energy: true,
      lease: false,
      assets: true,
    },
  },
  {
    id: "public",
    label: "Public sector campus",
    description:
      "Illustrative example: a public institution with a 60,000 m² owned campus, a large maintenance team and mostly reactive work.",
    inputs: {
      space: { area: 60000, costPerM2: 120, underusedPct: 20 },
      maintenance: {
        staff: 20,
        costPerFte: 26000,
        externalSpend: 500000,
        reactivePct: 65,
      },
      productivity: { staff: 10, costPerFte: 26000, manualPct: 40 },
      energy: { annualCost: 900000 },
      lease: { annualCost: null },
      assets: { annualSpend: 250000 },
      investment: { oneTime: null, annual: null },
    },
    toggles: {
      space: true,
      maintenance: true,
      productivity: true,
      energy: true,
      lease: false,
      assets: true,
    },
  },
];

// ---------------------------------------------------------------------------
// Izračun
// ---------------------------------------------------------------------------

const n = (value: Num) =>
  typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
const pct = (value: Num) => Math.min(100, n(value)) / 100;

export interface AreaResult {
  key: AreaKey;
  enabled: boolean;
  /** Ima li dovoljno podataka za izračun */
  hasData: boolean;
  /** Godišnji trošak na koji se stopa primjenjuje ("addressable cost") */
  baseCost: number;
  /** Opis osnovice, npr. "Cost of underused space" */
  baseLabel: string;
  /** Godišnja ušteda pri punoj primjeni, po scenariju */
  annual: Record<Scenario, number>;
}

export interface YearRow {
  year: number; // 0 = početno ulaganje
  /** Bruto ušteda po području u toj godini (odabrani scenarij) */
  byArea: Record<AreaKey, number>;
  savings: number;
  cost: number;
  net: number;
  cumulativeNet: number;
}

export interface ScenarioResult {
  scenario: Scenario;
  /** Godišnja ušteda pri punoj primjeni (godina 3+) */
  annualSavings: number;
  hardSavings: number;
  softSavings: number;
  /** Ukupna bruto ušteda kroz horizont */
  totalSavings: number;
  totalCost: number;
  netBenefit: number;
  /** null ako trošak ulaganja nije unesen */
  roiPct: number | null;
  /** null ako nema ulaganja ili se ne vrati unutar horizonta */
  paybackMonths: number | null;
  npv: number | null;
  years: YearRow[];
}

export interface RoiResult {
  areas: AreaResult[];
  scenarios: Record<Scenario, ScenarioResult>;
  hasInvestment: boolean;
  hasAnySavings: boolean;
  /** Ukupan godišnji trošak koji je korisnik unio za uključena područja */
  annualCostInScope: number;
  /** Ulaganje koje bi se vratilo unutar 24 mjeseca (očekivani scenarij) */
  breakEvenInvestment24m: number;
  /** Trošak nedjelovanja: propuštena ušteda kroz horizont (očekivani scenarij) */
  costOfInaction: number;
}

function areaBase(
  key: AreaKey,
  inputs: RoiInputs,
): { baseCost: number; baseLabel: string; scopeCost: number; hasData: boolean } {
  switch (key) {
    case "space": {
      const total = n(inputs.space.area) * n(inputs.space.costPerM2);
      const base = total * pct(inputs.space.underusedPct);
      return {
        baseCost: base,
        baseLabel: "Annual cost of underused space",
        scopeCost: total,
        hasData: base > 0,
      };
    }
    case "maintenance": {
      const total =
        n(inputs.maintenance.staff) * n(inputs.maintenance.costPerFte) +
        n(inputs.maintenance.externalSpend);
      const base = total * pct(inputs.maintenance.reactivePct);
      return {
        baseCost: base,
        baseLabel: "Annual spend on reactive maintenance",
        scopeCost: total,
        hasData: base > 0,
      };
    }
    case "productivity": {
      const total =
        n(inputs.productivity.staff) * n(inputs.productivity.costPerFte);
      const base = total * pct(inputs.productivity.manualPct);
      return {
        baseCost: base,
        baseLabel: "Annual cost of manual administrative work",
        scopeCost: total,
        hasData: base > 0,
      };
    }
    case "energy": {
      const base = n(inputs.energy.annualCost);
      return {
        baseCost: base,
        baseLabel: "Annual energy cost",
        scopeCost: base,
        hasData: base > 0,
      };
    }
    case "lease": {
      const base = n(inputs.lease.annualCost);
      return {
        baseCost: base,
        baseLabel: "Annual lease payments",
        scopeCost: base,
        hasData: base > 0,
      };
    }
    case "assets": {
      const base = n(inputs.assets.annualSpend);
      return {
        baseCost: base,
        baseLabel: "Annual asset replacement spend",
        scopeCost: base,
        hasData: base > 0,
      };
    }
  }
}

function areaSaving(
  key: AreaKey,
  inputs: RoiInputs,
  baseCost: number,
  scenario: Scenario,
): number {
  const rate = ASSUMPTIONS[key].rates[scenario] / 100;
  const saving = baseCost * rate;
  if (key === "space") {
    // Ušteda na prostoru ne može premašiti benchmark gornju granicu
    const totalSpaceCost = n(inputs.space.area) * n(inputs.space.costPerM2);
    return Math.min(saving, (totalSpaceCost * SPACE_SAVINGS_CAP_PCT) / 100);
  }
  return saving;
}

function paybackMonths(years: YearRow[]): number | null {
  if (years[0].cumulativeNet >= 0) return null; // nema početnog ulaganja
  for (let i = 1; i < years.length; i++) {
    const prev = years[i - 1].cumulativeNet;
    const curr = years[i].cumulativeNet;
    if (curr >= 0) {
      const gained = curr - prev;
      const fraction = gained > 0 ? -prev / gained : 1;
      return Math.max(1, Math.round((i - 1 + fraction) * 12));
    }
  }
  return null;
}

export function calculateRoi(
  inputs: RoiInputs,
  toggles: AreaToggles,
  settings: RoiSettings = DEFAULT_SETTINGS,
): RoiResult {
  let annualCostInScope = 0;

  const areas: AreaResult[] = AREAS.map(({ key }) => {
    const enabled = toggles[key];
    const { baseCost, baseLabel, scopeCost, hasData } = areaBase(key, inputs);
    const active = enabled && hasData;
    if (enabled) annualCostInScope += scopeCost;
    return {
      key,
      enabled,
      hasData,
      baseCost: enabled ? baseCost : 0,
      baseLabel,
      annual: {
        conservative: active
          ? areaSaving(key, inputs, baseCost, "conservative")
          : 0,
        expected: active ? areaSaving(key, inputs, baseCost, "expected") : 0,
        optimistic: active ? areaSaving(key, inputs, baseCost, "optimistic") : 0,
      },
    };
  });

  const oneTime = n(inputs.investment.oneTime);
  const annualCost = n(inputs.investment.annual);
  const hasInvestment = oneTime > 0 || annualCost > 0;
  const discount = Math.max(0, settings.discountRatePct) / 100;

  const buildScenario = (scenario: Scenario): ScenarioResult => {
    const annualSavings = areas.reduce((sum, a) => sum + a.annual[scenario], 0);
    const softSavings = areas
      .filter((a) => AREA_BY_KEY[a.key].savingType === "soft")
      .reduce((sum, a) => sum + a.annual[scenario], 0);

    const emptyByArea = () =>
      Object.fromEntries(AREAS.map((a) => [a.key, 0])) as Record<AreaKey, number>;

    const years: YearRow[] = [
      {
        year: 0,
        byArea: emptyByArea(),
        savings: 0,
        cost: oneTime,
        net: -oneTime,
        cumulativeNet: -oneTime,
      },
    ];

    let cumulative = -oneTime;
    let npv = -oneTime;
    for (let y = 1; y <= HORIZON_YEARS; y++) {
      const ramp = RAMP_UP[y - 1];
      const byArea = emptyByArea();
      areas.forEach((a) => (byArea[a.key] = a.annual[scenario] * ramp));
      const savings = annualSavings * ramp;
      const net = savings - annualCost;
      cumulative += net;
      npv += net / Math.pow(1 + discount, y);
      years.push({
        year: y,
        byArea,
        savings,
        cost: annualCost,
        net,
        cumulativeNet: cumulative,
      });
    }

    const totalSavings = years.reduce((s, r) => s + r.savings, 0);
    const totalCost = years.reduce((s, r) => s + r.cost, 0);
    const netBenefit = totalSavings - totalCost;

    return {
      scenario,
      annualSavings,
      hardSavings: annualSavings - softSavings,
      softSavings,
      totalSavings,
      totalCost,
      netBenefit,
      roiPct: hasInvestment && totalCost > 0 ? (netBenefit / totalCost) * 100 : null,
      paybackMonths: hasInvestment ? paybackMonths(years) : null,
      npv: hasInvestment ? npv : null,
      years,
    };
  };

  const scenarios = {
    conservative: buildScenario("conservative"),
    expected: buildScenario("expected"),
    optimistic: buildScenario("optimistic"),
  };

  const expected = scenarios.expected;

  return {
    areas,
    scenarios,
    hasInvestment,
    hasAnySavings: expected.annualSavings > 0,
    annualCostInScope,
    breakEvenInvestment24m: expected.annualSavings * (RAMP_UP[0] + RAMP_UP[1]),
    costOfInaction: expected.totalSavings,
  };
}
