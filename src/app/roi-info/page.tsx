import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import {
  AREAS,
  ASSUMPTIONS,
  DEFAULT_SETTINGS,
  HORIZON_YEARS,
  RAMP_UP,
  SPACE_SAVINGS_CAP_PCT,
  type AreaKey,
} from "@/lib/roi/model";

export const metadata: Metadata = {
  title: "ROI Calculator Methodology",
  description:
    "How the Arctis ARCHIBUS ROI calculator works: the formulas, improvement rates and sources behind every figure, and what the estimate does not include.",
  alternates: { canonical: "/roi-info" },
};

// Formule po području — ista logika kao u src/lib/roi/model.ts
const FORMULAS: Record<AreaKey, { inputs: string[]; base: string }> = {
  space: {
    inputs: [
      "Total managed area (m²)",
      "Annual cost per m² (rent or ownership, service charges, cleaning, utilities)",
      "Share of space that is underused (%)",
    ],
    base: "Area × cost per m² × underused share",
  },
  maintenance: {
    inputs: [
      "In-house maintenance staff (FTE) and annual cost per employee",
      "Annual spend on external contractors and materials",
      "Share of work that is reactive (%)",
    ],
    base: "(Staff × cost per employee + external spend) × reactive share",
  },
  productivity: {
    inputs: [
      "FM and real-estate administration staff (FTE) and annual cost per employee",
      "Share of time spent on manual work (%)",
    ],
    base: "Staff × cost per employee × manual share",
  },
  energy: {
    inputs: ["Annual energy cost"],
    base: "Annual energy cost",
  },
  lease: {
    inputs: ["Annual lease and service-charge payments"],
    base: "Annual lease payments",
  },
  assets: {
    inputs: ["Annual spend on replacing furniture and equipment"],
    base: "Annual replacement spend",
  },
};

const ramp = RAMP_UP.map((r) => `${Math.round(r * 100)}%`);

export default function RoiInfoPage() {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="ROI methodology"
        title="How the ROI calculator works"
        description="The formulas, improvement rates and sources behind every figure, and what the estimate deliberately leaves out."
        size="compact"
      >
        <Button
          asChild
          size="lg"
          className="group h-12 bg-blue-500 px-6 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400"
        >
          <Link href="/roi">
            Open the calculator
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </PageHero>

      <div className="flex-1 bg-white py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <article className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-14 prose-a:text-blue-700">
            <p className="lead">
              The calculator estimates what an integrated workplace management
              system such as ARCHIBUS could save your organisation, and how
              that compares with the cost of implementing it. It is built to be
              checked: every rate is listed here with its source, and you can
              download the full model as an Excel file.
            </p>

            <h2 id="principle">1. The principle</h2>
            <p>
              For each area you include, the calculator first works out the
              cost that can realistically be reduced (the{" "}
              <em>addressable cost</em>), then applies an improvement rate:
            </p>
            <pre className="not-prose overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
              <code>
                annual saving = addressable cost × improvement rate
              </code>
            </pre>
            <p>
              Each rate has three values, so results are shown as a{" "}
              <strong>conservative</strong>, <strong>expected</strong> and{" "}
              <strong>optimistic</strong> scenario rather than a single number.
            </p>

            <h2 id="areas">2. Savings areas</h2>
          </article>

          <div className="mt-6 space-y-5">
            {AREAS.map((area, index) => {
              const a = ASSUMPTIONS[area.key];
              const f = FORMULAS[area.key];
              return (
                <section
                  key={area.key}
                  id={area.key}
                  className="scroll-mt-24 rounded-2xl border border-slate-200 p-6 md:p-7"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: area.color }}
                    />
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                      <span className="mr-2 font-mono text-sm font-medium text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {area.label}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      {area.savingType === "hard"
                        ? "Direct cost saving"
                        : "Released capacity"}
                    </span>
                  </div>

                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                    {area.how}
                  </p>

                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        What you enter
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                        {f.inputs.map((input) => (
                          <li key={input}>{input}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Formula
                      </p>
                      <p className="mt-2 rounded-lg bg-slate-50 p-3 font-mono text-[13px] leading-relaxed text-slate-800">
                        {f.base}
                        <br />× improvement rate
                      </p>
                    </div>
                  </div>

                  <dl className="mt-5 grid grid-cols-3 gap-3">
                    {(["conservative", "expected", "optimistic"] as const).map(
                      (key) => (
                        <div
                          key={key}
                          className="rounded-xl border border-slate-200 p-3 text-center"
                        >
                          <dt className="text-xs capitalize text-slate-500">
                            {key}
                          </dt>
                          <dd className="mt-0.5 text-xl font-semibold tabular-nums text-slate-900">
                            {a.rates[key]}%
                          </dd>
                        </div>
                      ),
                    )}
                  </dl>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    <span className="font-medium text-slate-900">
                      {a.kind === "benchmark"
                        ? "Published benchmark. "
                        : "Arctis estimate. "}
                    </span>
                    Applied to the {a.appliesTo}. {a.basis}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {a.sourceUrl && (
                      <a
                        href={a.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-blue-700 underline-offset-2 hover:underline"
                      >
                        {a.sourceLabel}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <Link
                      href={`/archibus?product=${area.archibusSlug}#solutions`}
                      className="inline-flex items-center gap-1 font-medium text-blue-700 underline-offset-2 hover:underline"
                    >
                      ARCHIBUS {area.archibusArea}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </section>
              );
            })}
          </div>

          <article className="prose prose-slate mt-4 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-14 prose-a:text-blue-700">
            <h2 id="safeguards">3. Safeguards against overstating</h2>
            <ul>
              <li>
                <strong>Space cap.</strong> Space savings never exceed{" "}
                {SPACE_SAVINGS_CAP_PCT}% of your total space cost, however much
                space you mark as underused. This keeps the result within
                Gartner&apos;s 10–15% benchmark for savings from better space
                use.
              </li>
              <li>
                <strong>Ramp-up.</strong> Benefits do not start on day one. The
                model counts {ramp[0]} of the full annual saving in year 1,{" "}
                {ramp[1]} in year 2 and {ramp[2]} from year 3.
              </li>
              <li>
                <strong>Direct savings and released capacity are kept apart.</strong>{" "}
                Productivity gains are staff time freed for other work, not a
                reduction in payroll, so they are reported separately from
                direct cost savings.
              </li>
              <li>
                <strong>Separate mechanisms.</strong> Each area targets a
                different source of waste, and staff are counted once:
                maintenance labour is not also included under productivity.
                Rent does appear in two places, space and lease administration,
                but the lease rates are low enough (1–3%) that the overlap
                does not materially inflate the total.
              </li>
            </ul>

            <h2 id="financials">4. ROI, payback and net present value</h2>
            <p>
              If you enter a one-time cost and an annual running cost, the
              calculator builds a {HORIZON_YEARS}-year cash flow and reports:
            </p>
            <ul>
              <li>
                <strong>Net benefit</strong>: total savings minus total costs
                over {HORIZON_YEARS} years.
              </li>
              <li>
                <strong>Return on investment</strong>: net benefit divided by
                total costs.
              </li>
              <li>
                <strong>Payback period</strong>: the point at which cumulative
                net cash flow turns positive, including the ramp-up.
              </li>
              <li>
                <strong>Net present value</strong>: future cash flows
                discounted at {DEFAULT_SETTINGS.discountRatePct}% a year by
                default. You can change the rate in the calculator.
              </li>
            </ul>
            <p>
              If you do not enter a cost, the calculator shows the size of
              investment that your expected savings would repay within 24
              months. We do not assume a price: licensing and implementation
              depend on scope, so{" "}
              <Link href="/contact">ask us for an indicative quote</Link>.
            </p>

            <h2 id="limits">5. What the estimate does not include</h2>
            <ul>
              <li>
                Benefits that are real but hard to price: compliance, audit
                readiness, employee experience, and faster and better-informed
                decisions.
              </li>
              <li>
                Internal effort on your side during implementation, such as
                data collection and staff time in workshops.
              </li>
              <li>
                Inflation and changes in your portfolio over the{" "}
                {HORIZON_YEARS} years.
              </li>
            </ul>
            <p>
              The result is an estimate, not a quotation or a guarantee. It is
              a sound basis for deciding whether a detailed assessment is worth
              your time. That assessment uses your own data in place of
              benchmarks.
            </p>

            <h2 id="privacy">6. Your data</h2>
            <p>
              All calculations run in your browser. The figures you enter are
              kept on your device only while the tab is open, so a page reload
              does not lose your work, and they are not sent to Arctis or
              anyone else. Closing the tab or using <em>Clear all</em> removes
              them.
            </p>
          </article>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-900">
                Ready to see your own numbers?
              </p>
              <p className="mt-1 text-sm text-slate-600">
                It takes about three minutes, and you can download the result
                as PDF or Excel.
              </p>
            </div>
            <Button asChild size="lg" className="group rounded-full px-6">
              <Link href="/roi">
                Open the calculator
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
