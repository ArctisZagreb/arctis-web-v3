// components/sections/services/ImplementationContent.tsx
import React from "react";
import {
  FileText,
  DraftingCompass,
  Settings2,
  DatabaseZap,
  TestTubeDiagonal,
  Rocket,
  Link2,
  Target,
  FileSearch,
  Settings,
  PlusSquare,
  RefreshCcw,
  CalendarClock,
  Shuffle,
  Users,
} from "lucide-react";
import SimpleCallToAction from "@/components/sections/SimpleCallToAction";
import { PageHero, HeroAccent } from "@/components/ui/page-hero";
import { ServiceHeroActions } from "./ServiceHeroActions";

// Reusable InfoCard component (similar to the one from ProjectManagement)
const InfoCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-card border border-border rounded-lg p-6 h-full flex flex-col ${className}`}
  >
    {children}
  </div>
);

export const ImplementationContent: React.FC = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <PageHero
        eyebrow="Implementation"
        title={
          <>
            Seamless solution <HeroAccent>implementation</HeroAccent>
          </>
        }
        description="Leveraging modern technologies and industry best practices, we deliver faster deployments and reliable returns on your technology investment."
      >
        <ServiceHeroActions />
      </PageHero>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl prose dark:prose-invert prose-lg">
          <p>
            Our expert-led implementation projects are built on a solid
            foundation of proven standards. We follow best-practice
            methodologies, refined over a decade of experience, ensuring your
            solution aligns perfectly with your operational needs, whether
            it&apos;s a standard COTS deployment, fully customized, or a
            balanced hybrid approach.
          </p>
        </div>
      </section>

      {/* Implementation Process Section */}
      <section className="py-16 lg:py-24 bg-secondary/50 dark:bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Our Structured Implementation Process
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We guide you through every phase, from initial analysis to
              successful deployment and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {/* Stage 1: Analysis & Planning */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Analysis & Planning
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  We meticulously analyze your current and future
                  functionalities, processes, workflows, reporting, and
                  surveying needs. This forms the data foundation for planning
                  your tailored implementation.
                </p>
                <p>
                  {" "}
                  COTS, customized, or hybrid approaches are evaluated based on
                  this deep understanding.
                </p>
              </div>
            </InfoCard>

            {/* Stage 2: Design & Customization */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <DraftingCompass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Design & Customization
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Comprehensive design documents outline the technical and
                  functional architecture. Based on the plan, we tailor
                  functionalities, workflows, interfaces, and reports to meet
                  your specific requirements.
                </p>
              </div>
            </InfoCard>

            {/* Stage 3: Development & Configuration */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Settings2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Development & Config
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Necessary custom functionalities are developed, and the system
                  is configured according to the design specifications,
                  preparing for data migration and testing phases.
                </p>
              </div>
            </InfoCard>

            {/* Stage 4: Data Conversion & Migration */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <DatabaseZap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Data Migration
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  A critical success factor. We assist in capturing, organizing,
                  and standardizing your data for seamless migration from legacy
                  systems into the new ARCHIBUS repository.
                </p>
              </div>
            </InfoCard>

            {/* Stage 5: Testing & Training */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <TestTubeDiagonal className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Testing & Training
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Rigorous testing ensures all components function as expected.
                  Personalized training sessions empower your team to
                  effectively utilize the new system.
                </p>
              </div>
            </InfoCard>

            {/* Stage 6: Deployment & Go-Live */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Deployment & Go-Live
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Establishment of the production environment and transition to
                  the live ARCHIBUS solution, turning it into your central
                  knowledge system for assets, roles, and processes.
                </p>
              </div>
            </InfoCard>
          </div>

          {/* Integration Capabilities */}
          <div className="mt-16 text-center prose dark:prose-invert max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full inline-block">
                <Link2 className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground">
              Seamless Integration
            </h3>
            <p className="text-muted-foreground">
              We excel at integrating ARCHIBUS with your existing ecosystem
              (ERP, HR, Financial, Security, BMS, BIM, IoT) using powerful tools
              to bridge departmental solutions, enhance functionality, and
              maximize productivity across your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Key Activities Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Core Implementation Activities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our hands-on approach ensures every detail is managed effectively:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Scope & Goal Definition",
                description:
                  "Clearly defining implementation scope, goals, and procedures.",
              },
              {
                icon: FileSearch,
                title: "Process Review",
                description:
                  "Reviewing current-state business processes and legacy solutions.",
              },
              {
                icon: Settings,
                title: "System Configuration",
                description:
                  "Defining architecture, configuring, and supporting implementation.",
              },
              {
                icon: DatabaseZap,
                title: "Data Migration",
                description:
                  "Managing migration of data from other solutions/systems.",
              },
              {
                icon: Rocket,
                title: "Pilot Projects",
                description:
                  "Applying pilot project implementation procedures for validation.",
              },
              {
                icon: RefreshCcw,
                title: "Continuous Optimization",
                description:
                  "Reflecting on and continuously optimizing processes post-go-live.",
              },
              {
                icon: PlusSquare,
                title: "System Enhancement",
                description:
                  "Supplementing existing solutions with additional implementations.",
              },
              {
                icon: CalendarClock,
                title: "Status Reporting",
                description:
                  "Establishing regular meetings on implementation status and progress.",
              },
              {
                icon: Shuffle,
                title: "Dynamic Adaptation",
                description:
                  "Reacting flexibly to changes and new requirements during the project.",
              },
              {
                icon: Users,
                title: "Collaborative Environment",
                description:
                  "Providing a dynamic environment promoting collaboration.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-muted/50"
              >
                <div className="mt-1 text-primary shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <SimpleCallToAction
        title="Start Your ARCHIBUS Implementation Journey"
        subtitle="Partner with us to deploy a powerful solution tailored to your unique business needs. Contact us for a consultation."
        className="mt-16 lg:mt-24" // Add top margin
      />
    </div>
  );
};
