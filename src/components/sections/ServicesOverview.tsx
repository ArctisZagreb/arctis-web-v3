// src/components/sections/ServicesOverview.tsx
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Lightbulb,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

type Service = {
  number: string;
  title: string;
  description: string;
  link: string;
  Icon: LucideIcon;
  points: string[];
};

const services: Service[] = [
  {
    number: "01",
    title: "Project Management",
    description:
      "Turning vision into reality with expert planning, coordination and execution for CRE, asset and facility management projects.",
    link: "/project-management",
    Icon: Briefcase,
    points: [
      "Agile & Waterfall delivery",
      "Budget and schedule control",
      "Transparent regular reporting",
    ],
  },
  {
    number: "02",
    title: "Implementation",
    description:
      "Faster deployment and reliable ROI through standard or customised ARCHIBUS implementations built on proven best practices.",
    link: "/implementation",
    Icon: Settings2,
    points: [
      "Standard & tailored rollouts",
      "Data migration & integrations",
      "Pilot projects and optimisation",
    ],
  },
  {
    number: "03",
    title: "Consulting",
    description:
      "Strategic IT advisory, architecture planning and operational assessment that align technology with your business goals.",
    link: "/consulting",
    Icon: Lightbulb,
    points: [
      "Needs & process assessment",
      "Solution & architecture design",
      "BIM + FM strategy",
    ],
  },
];

const ServicesOverview = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 md:py-28">
      {/* Diskretna pozadina */}
      <div aria-hidden="true" className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_30%,transparent_100%)]" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Our expertise"
          description="We are experts in IWMS / CAFM / CMMS solutions and technology services, focused on enhancing your working environment and supporting your organisation's goals."
          className="mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {services.map(({ number, title, description, link, Icon, points }) => (
            <Link
              key={title}
              href={link}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:p-8"
            >
              {/* Gradijentna linija na vrhu (hover) */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 transition-transform duration-500 group-hover:scale-x-100"
              />
              {/* Suptilni sjaj u kutu */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/60 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative mb-8 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <span className="font-mono text-sm font-medium text-slate-300 transition-colors group-hover:text-blue-300">
                  {number}
                </span>
              </div>

              <h3 className="relative text-xl font-semibold tracking-tight text-slate-900">
                {title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-slate-600">
                {description}
              </p>

              <ul className="relative mt-6 space-y-2.5 border-t border-slate-100 pt-6">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <span className="relative mt-8 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
