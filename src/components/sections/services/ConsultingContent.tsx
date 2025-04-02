/**
 * ConsultingContent.tsx
 *
 * This component renders the consulting services page content including
 * hero section, introduction, service areas, and engagement process.
 */
import React from "react";
import {
  Lightbulb,
  Briefcase,
  Settings,
  AreaChart,
  Users,
  GraduationCap,
  Target,
  BarChart3,
  Group,
  MessageSquare,
  Presentation,
  Search,
} from "lucide-react";
import SimpleCallToAction from "@/components/sections/SimpleCallToAction";
import { cn } from "@/lib/utils";

/**
 * Reusable card component for displaying information with consistent styling
 */
const InfoCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={cn(
      "bg-card border border-border rounded-lg p-6 h-full flex flex-col",
      className
    )}
  >
    {children}
  </div>
);

export const ConsultingContent: React.FC = () => {
  // Hero section background image
  const heroImageUrl =
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";

  // Engagement method data structure for easy maintenance
  const engagementMethods = [
    {
      icon: Search,
      title: "Needs Assessment",
      description:
        "Deeply understanding your challenges, goals, and current state.",
    },
    {
      icon: Target,
      title: "Strategy Development",
      description: "Formulating clear, actionable strategies and roadmaps.",
    },
    {
      icon: Lightbulb,
      title: "Solution Design",
      description:
        "Designing tailored solutions, processes, or technology architectures.",
    },
    {
      icon: Presentation,
      title: "Workshop Facilitation",
      description:
        "Leading collaborative workshops for discovery, planning, or training.",
    },
    {
      icon: BarChart3,
      title: "Performance Measurement",
      description:
        "Defining KPIs and frameworks to track progress and success.",
    },
    {
      icon: Group,
      title: "Stakeholder Alignment",
      description:
        "Ensuring buy-in and collaboration across different teams and levels.",
    },
    {
      icon: MessageSquare,
      title: "Expert Guidance",
      description:
        "Providing ongoing advice and support based on industry best practices.",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 dark:from-background/60 dark:via-background/70 dark:to-background/80 z-0"
          aria-hidden="true"
        ></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
            Strategic Consulting Expertise
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-200 dark:text-gray-300 max-w-2xl mx-auto">
            Guiding you to do the right things, the right way. We partner with
            you to navigate complexity and achieve strategic objectives in CRE &
            FM.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl prose dark:prose-invert prose-lg">
          <p>
            In today&apos;s dynamic business environment, making informed
            decisions is crucial. Our consulting services provide the strategic
            insights, industry expertise, and actionable recommendations needed
            to optimize your operations, leverage technology effectively, and
            drive sustainable growth within your Corporate Real Estate and
            Facility Management domains.
          </p>
          <p>
            We act as your trusted advisors, combining deep functional knowledge
            with a collaborative approach to solve your most pressing challenges
            and unlock new opportunities.
          </p>
        </div>
      </section>

      {/* Key Consulting Areas Section */}
      <section className="py-16 lg:py-24 bg-secondary/50 dark:bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Our Consulting Focus Areas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer specialized guidance across critical aspects of your
              business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {/* Area 1: Strategic Planning */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Strategic Planning
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Developing long-term CRE & FM strategies aligned with your
                  core business objectives. Defining roadmaps for technology
                  adoption, portfolio optimization, and operational excellence.
                </p>
              </div>
            </InfoCard>

            {/* Area 2: Process Optimization */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Process Optimization
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Analyzing existing workflows, identifying bottlenecks, and
                  redesigning processes for increased efficiency, cost
                  reduction, and improved service delivery using Lean or other
                  methodologies.
                </p>
              </div>
            </InfoCard>

            {/* Area 3: Technology Advisory */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Technology Advisory
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Evaluating your technology landscape, recommending suitable
                  IWMS/CAFM/PropTech solutions (like ARCHIBUS), and guiding
                  selection and implementation strategies.
                </p>
              </div>
            </InfoCard>

            {/* Area 4: Change Management */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Change Management
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Supporting your organization through transitions, ensuring
                  smooth adoption of new processes or technologies with
                  effective communication and training strategies.
                </p>
              </div>
            </InfoCard>

            {/* Area 5: Data Analysis & Insights */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <AreaChart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Data Analysis & Insights
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Leveraging your data to provide actionable insights for space
                  utilization, maintenance planning, energy management, and
                  financial performance reporting.
                </p>
              </div>
            </InfoCard>

            {/* Area 6: Training & Enablement */}
            <InfoCard>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Training & Enablement
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground text-sm flex-grow">
                <p>
                  Designing and delivering targeted training programs and
                  workshops to enhance the skills and knowledge of your CRE & FM
                  teams.
                </p>
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Core Consulting Activities Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              How We Engage
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our consulting process is collaborative and results-oriented:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {engagementMethods.map((item, index) => (
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
        title="Elevate Your Strategy with Expert Consulting"
        subtitle="Unlock potential and overcome challenges with our tailored consulting services. Contact us to start the conversation."
        className="mt-16 lg:mt-24"
      />
    </div>
  );
};
