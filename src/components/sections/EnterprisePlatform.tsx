// src/components/sections/EnterprisePlatform.tsx
//
// "Enterprise-ready" bento sekcija: ono što velike organizacije prvo pitaju —
// integracije, skaliranje, model isporuke, mobilni rad, jezici.
// Sve tvrdnje dolaze iz postojećeg sadržaja (planovi, FAQ, implementacija).

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Infinity as InfinityIcon,
  Languages,
  PenTool,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// Čvorovi dijagrama (koordinate u viewBoxu 600×300, hub je u sredini)
const HUB = { x: 300, y: 150 };
const integrationNodes = [
  { label: "SAP", hint: "ERP", x: 92, y: 52 },
  { label: "Oracle", hint: "ERP & database", x: 62, y: 150 },
  { label: "Microsoft Dynamics", hint: "ERP", x: 92, y: 248 },
  { label: "AutoCAD & Revit", hint: "CAD & BIM", x: 508, y: 52 },
  { label: "ESRI ArcGIS", hint: "GIS", x: 538, y: 150 },
  { label: "BMS & IoT", hint: "Building systems", x: 508, y: 248 },
];

const standards = [
  "Web services",
  "HTTPS",
  "Database links",
  "Excel",
  "PDF",
  "XML",
];

const languages = [
  "Croatian",
  "English",
  "German",
  "Italian",
  "Spanish",
  "French",
  "Dutch",
  "Turkish",
  "Chinese",
];

function BentoCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.055] md:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-cyan-300 ring-1 ring-white/10">
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </div>
  );
}

function IntegrationDiagram() {
  return (
    <div className="relative mx-auto hidden aspect-[2/1] w-full max-w-[640px] sm:block">
      <svg
        viewBox="0 0 600 300"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="integration-line" x1="0" x2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {integrationNodes.map((node) => (
          <g key={node.label}>
            <line
              x1={node.x}
              y1={node.y}
              x2={HUB.x}
              y2={HUB.y}
              stroke="rgba(148,163,184,0.18)"
              strokeWidth="1"
            />
            <line
              x1={node.x < HUB.x ? node.x : HUB.x}
              y1={node.x < HUB.x ? node.y : HUB.y}
              x2={node.x < HUB.x ? HUB.x : node.x}
              y2={node.x < HUB.x ? HUB.y : node.y}
              stroke="#67e8f9"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-dash-flow"
              opacity="0.7"
            />
          </g>
        ))}
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r="62"
          fill="none"
          stroke="rgba(96,165,250,0.25)"
          className="origin-center animate-soft-pulse"
          style={{ transformBox: "fill-box" }}
        />
      </svg>

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 flex h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-center shadow-[0_0_60px_rgba(34,211,238,0.35)]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
          Archibus
        </span>
        <span className="text-[10px] text-blue-50/80">IWMS</span>
      </div>

      {/* Čvorovi */}
      {integrationNodes.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-[#0a1430] px-3 py-2 text-center shadow-lg"
          style={{
            left: `${(node.x / 600) * 100}%`,
            top: `${(node.y / 300) * 100}%`,
          }}
        >
          <p className="text-[13px] font-medium leading-tight text-white">
            {node.label}
          </p>
          <p className="text-[11px] leading-tight text-slate-400">
            {node.hint}
          </p>
        </div>
      ))}
    </div>
  );
}

const EnterprisePlatform = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#050b1f] py-20 text-white md:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_30%,transparent_100%)]" />
        <div className="absolute left-0 top-1/3 h-[420px] w-[520px] -translate-x-1/3 rounded-full bg-blue-600/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[480px] translate-x-1/4 rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Enterprise-ready"
            title="Built to run at enterprise scale"
            description="ARCHIBUS connects to the systems you already rely on and grows from a single building to a global portfolio — without changing platforms."
            className="mb-14 lg:mb-16"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Integracije — velika kartica */}
          <Reveal className="md:col-span-2 lg:col-span-4 lg:row-span-2">
            <BentoCard className="flex flex-col">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
                  Integrations
                </p>
                <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                  Fits into the ecosystem you already run
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-300">
                  We integrate ARCHIBUS with ERP, HR, financial, security, BMS,
                  BIM and IoT systems, so facility data flows across
                  departments instead of living in silos.
                </p>
              </div>

              <div className="my-8 flex-1">
                <IntegrationDiagram />
                {/* Mobitel: popis umjesto dijagrama */}
                <ul className="flex flex-wrap gap-2 sm:hidden">
                  {integrationNodes.map((node) => (
                    <li
                      key={node.label}
                      className="rounded-full bg-white/[0.06] px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/10"
                    >
                      {node.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-white/10 pt-5">
                <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Open standards
                </span>
                {standards.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-slate-300 ring-1 ring-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          {/* Skaliranje */}
          <Reveal delay={0.08} className="lg:col-span-2">
            <BentoCard>
              <div className="pointer-events-none absolute -right-6 -top-8 select-none text-[150px] font-semibold leading-none text-white/[0.04]">
                ∞
              </div>
              <CardIcon Icon={InfinityIcon} />
              <h3 className="text-lg font-semibold">No ceiling on growth</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                ARCHIBUS Enterprise supports an unlimited number of users,
                locations and records, on Microsoft SQL Server or Oracle.
              </p>
            </BentoCard>
          </Reveal>

          {/* Model isporuke */}
          <Reveal delay={0.14} className="lg:col-span-2">
            <BentoCard>
              <CardIcon Icon={Cloud} />
              <h3 className="text-lg font-semibold">Cloud or licensed</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Run it as SaaS with pay-per-user pricing, or license it —
                whichever matches how your organisation buys software.
              </p>
              <Link
                href="/archibus#plans"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-200"
              >
                Compare plans
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </BentoCard>
          </Reveal>

          {/* BIM & CAD */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <BentoCard>
              <CardIcon Icon={PenTool} />
              <h3 className="text-lg font-semibold">Drawings stay in sync</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Bi-directional integration with AutoCAD and Revit keeps floor
                plans, spaces and assets aligned with your data.
              </p>
            </BentoCard>
          </Reveal>

          {/* Mobilno */}
          <Reveal delay={0.11} className="lg:col-span-2">
            <BentoCard>
              <CardIcon Icon={Smartphone} />
              <h3 className="text-lg font-semibold">Teams in the field</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                iOS and Android apps give field staff real-time data, and
                their confirmations and work details flow straight back.
              </p>
            </BentoCard>
          </Reveal>

          {/* Jezici */}
          <Reveal delay={0.17} className="md:col-span-2 lg:col-span-2">
            <BentoCard>
              <CardIcon Icon={Languages} />
              <h3 className="text-lg font-semibold">In your language</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {languages.map((language) => (
                  <li
                    key={language}
                    className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-slate-300 ring-1 ring-white/10"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EnterprisePlatform;
