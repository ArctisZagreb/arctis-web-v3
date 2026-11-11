"use client";
// src/components/roi/RoiCalculator.tsx
//
// ROI kalkulator: lijevo unos po područjima, desno sažetak koji se računa
// uživo, ispod puna analiza (grafovi, tok novca, pretpostavke, izvoz).
// Uneseni podaci ostaju u pregledniku samo za trajanja sesije (sessionStorage,
// briše se zatvaranjem kartice) — ništa se ne šalje na poslužitelj.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatEur, formatPayback } from "@/lib/roi/format";
import {
  AREA_BY_KEY,
  DEFAULT_SETTINGS,
  DEFAULT_TOGGLES,
  EMPTY_INPUTS,
  EXAMPLE_PROFILES,
  SCENARIO_LABELS,
  calculateRoi,
  type AreaKey,
  type AreaToggles,
  type Num,
  type RoiInputs as Inputs,
  type RoiSettings,
  type Scenario,
} from "@/lib/roi/model";
import RoiInputs from "./RoiInputs";
import RoiResults, { ScenarioSwitch } from "./RoiResults";

const STORAGE_KEY = "arctis-roi-v2";

interface StoredState {
  inputs: Inputs;
  toggles: AreaToggles;
  scenario: Scenario;
  settings: RoiSettings;
}

export default function RoiCalculator() {
  const [inputs, setInputs] = useState<Inputs>(EMPTY_INPUTS);
  const [toggles, setToggles] = useState<AreaToggles>(DEFAULT_TOGGLES);
  const [scenario, setScenario] = useState<Scenario>("expected");
  const [settings, setSettings] = useState<RoiSettings>(DEFAULT_SETTINGS);
  const [exampleId, setExampleId] = useState<string | null>(null);
  const loaded = useRef(false);
  const summaryRef = useRef<HTMLElement>(null);
  const [summaryReached, setSummaryReached] = useState(false);

  // Mobitel: traka s procjenom na dnu ekrana dok korisnik ne dođe do sažetka
  useEffect(() => {
    const onScroll = () => {
      const el = summaryRef.current;
      if (!el) return;
      setSummaryReached(el.getBoundingClientRect().top < window.innerHeight - 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Vrati prethodno unesene podatke (ako postoje)
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<StoredState>;
        if (saved.inputs) setInputs({ ...EMPTY_INPUTS, ...saved.inputs });
        if (saved.toggles) setToggles({ ...DEFAULT_TOGGLES, ...saved.toggles });
        if (saved.scenario) setScenario(saved.scenario);
        if (saved.settings) setSettings({ ...DEFAULT_SETTINGS, ...saved.settings });
      }
    } catch {
      // Pohrana nedostupna ili oštećena — krećemo od praznog obrasca
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      const state: StoredState = { inputs, toggles, scenario, settings };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Privatni način rada i sl. — kalkulator radi i bez pohrane
    }
  }, [inputs, toggles, scenario, settings]);

  const result = useMemo(
    () => calculateRoi(inputs, toggles, settings),
    [inputs, toggles, settings],
  );

  const handleChange = <A extends keyof Inputs>(
    area: A,
    field: keyof Inputs[A],
    value: Num,
  ) => {
    setExampleId(null);
    setInputs((prev) => ({ ...prev, [area]: { ...prev[area], [field]: value } }));
  };

  const handleToggle = (area: AreaKey) =>
    setToggles((prev) => ({ ...prev, [area]: !prev[area] }));

  const applyExample = (id: string) => {
    const profile = EXAMPLE_PROFILES.find((p) => p.id === id);
    if (!profile) return;
    // Zadrži ulaganje koje je korisnik već unio
    setInputs({ ...profile.inputs, investment: inputs.investment });
    setToggles(profile.toggles);
    setExampleId(id);
  };

  const reset = () => {
    setInputs(EMPTY_INPUTS);
    setToggles(DEFAULT_TOGGLES);
    setScenario("expected");
    setSettings(DEFAULT_SETTINGS);
    setExampleId(null);
  };

  const sel = result.scenarios[scenario];
  const example = EXAMPLE_PROFILES.find((p) => p.id === exampleId);
  const summaryAreas = result.areas
    .filter((a) => a.annual[scenario] > 0)
    .sort((a, b) => b.annual[scenario] - a.annual[scenario]);
  const exportData = { inputs, toggles, result, scenario, settings };

  return (
    <div>
      {/* Primjeri */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Start from an example:
          </span>
          {EXAMPLE_PROFILES.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => applyExample(profile.id)}
              aria-pressed={exampleId === profile.id}
              className={cn(
                "cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                exampleId === profile.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
              )}
            >
              {profile.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-1.5 self-start text-sm font-medium text-slate-500 hover:text-slate-900 sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear all
        </button>
      </div>
      {example && (
        <p className="-mt-3 mb-6 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900">
          {example.description} Replace any figure with your own.
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
        <RoiInputs
          inputs={inputs}
          toggles={toggles}
          result={result}
          scenario={scenario}
          onChange={handleChange}
          onToggle={handleToggle}
        />

        {/* Sažetak uživo */}
        <aside
          ref={summaryRef}
          id="roi-summary"
          className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start"
        >
          <div
            className="relative isolate overflow-hidden rounded-2xl bg-[#050b1f] p-6 text-white md:p-7"
            aria-live="polite"
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-grid-dark opacity-50" />
              <div className="absolute -top-24 left-1/2 h-56 w-80 -translate-x-1/2 rounded-full bg-blue-600/30 blur-[80px]" />
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
                Live estimate
              </p>
              <span className="text-xs text-slate-400">
                {SCENARIO_LABELS[scenario]} scenario
              </span>
            </div>

            {result.hasAnySavings ? (
              <>
                <p className="mt-5 text-sm text-slate-300">
                  Estimated annual savings
                </p>
                <p className="mt-1 text-4xl font-semibold tracking-tight md:text-[2.75rem]">
                  {formatEur(sel.annualSavings)}
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Between{" "}
                  {formatEur(result.scenarios.conservative.annualSavings)} and{" "}
                  {formatEur(result.scenarios.optimistic.annualSavings)} per
                  year, once fully adopted
                </p>

                <ul className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  {summaryAreas.map((row) => {
                    const meta = AREA_BY_KEY[row.key];
                    return (
                      <li
                        key={row.key}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="flex items-center gap-2 text-slate-300">
                          <span
                            aria-hidden="true"
                            className="h-2.5 w-2.5 rounded-full ring-2 ring-[#050b1f]"
                            style={{ backgroundColor: meta.color }}
                          />
                          {meta.shortLabel}
                        </span>
                        <span className="font-medium tabular-nums text-white">
                          {formatEur(row.annual[scenario])}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                  {result.hasInvestment ? (
                    <>
                      <div>
                        <dt className="text-xs text-slate-400">5-year ROI</dt>
                        <dd className="mt-0.5 text-xl font-semibold">
                          {Math.round(sel.roiPct ?? 0)}%
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-400">Payback</dt>
                        <dd className="mt-0.5 text-xl font-semibold">
                          {formatPayback(sel, inputs.investment.oneTime ?? 0)}
                        </dd>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <dt className="text-xs text-slate-400">Over 5 years</dt>
                        <dd className="mt-0.5 text-xl font-semibold">
                          {formatEur(sel.totalSavings)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate-400">
                          Investment justified
                        </dt>
                        <dd className="mt-0.5 text-xl font-semibold">
                          {formatEur(result.breakEvenInvestment24m)}
                        </dd>
                      </div>
                    </>
                  )}
                </dl>

                <div className="mt-6">
                  <ScenarioSwitch
                    scenario={scenario}
                    onChange={setScenario}
                    tone="dark"
                  />
                </div>

                <a
                  href="#roi-analysis"
                  className="group mt-5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-blue-500 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-400"
                >
                  See the full analysis
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </>
            ) : (
              <div className="py-8">
                <p className="text-4xl font-semibold tracking-tight text-white/25">
                  € —
                </p>
                <p className="mt-4 font-medium text-white">
                  Your estimate appears here as you type
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Fill in at least one area on the left, or start from an
                  example above. It takes about three minutes and nothing you
                  enter leaves your browser.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {result.hasAnySavings && (
        <div className="mt-16 border-t border-slate-200 pt-14 md:mt-20 md:pt-16">
          <RoiResults
            data={exportData}
            onScenarioChange={setScenario}
            onDiscountRateChange={(rate) =>
              setSettings((prev) => ({ ...prev, discountRatePct: rate }))
            }
          />
        </div>
      )}

      {/* Mobitel: procjena uvijek na vidiku dok se unose podaci */}
      {result.hasAnySavings && !summaryReached && (
        <a
          href="#roi-summary"
          className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl bg-[#050b1f] px-5 py-3.5 text-white shadow-2xl shadow-slate-900/40 ring-1 ring-white/10 lg:hidden"
        >
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
              Estimated annual savings
            </span>
            <span className="text-xl font-semibold tabular-nums">
              {formatEur(sel.annualSavings)}
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-blue-500 px-3.5 py-2 text-sm font-semibold">
            View
            <ArrowDown className="h-4 w-4" />
          </span>
        </a>
      )}
    </div>
  );
}
