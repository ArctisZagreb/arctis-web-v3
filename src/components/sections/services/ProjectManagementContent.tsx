// components/sections/services/ProjectManagementContent.tsx
import React from "react";
import {
  CheckCircle,
  GitCompareArrows,
  Target,
  ListChecks,
  Users,
  CalendarClock,
  Shuffle,
  BadgeDollarSign,
  Lightbulb,
} from "lucide-react";
import SimpleCallToAction from "@/components/sections/SimpleCallToAction"; // Assuming this is the final CTA component
import { cn } from "@/lib/utils"; // Optional: if you use cn for merging classes

// Optional: A simple card component for visual grouping
const InfoCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

export const ProjectManagementContent: React.FC = () => {
  // --- Unsplash Image URL (Example - Replace with your chosen image) ---
  // Option 1: Team collaboration/planning
  const heroImageUrl =
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";
  // Option 2: More abstract planning/desk
  // const heroImageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80";
  // Option 3: Blueprint focus
  // const heroImageUrl = "https://images.unsplash.com/photo-1619481831391-5950f63778ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80";

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section - Modified */}
      <section
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }} // Apply background image via inline style
      >
        {/* --- Dark Overlay for Text Readability --- */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70 dark:from-background/60 dark:via-background/70 dark:to-background/80 z-0"
          aria-hidden="true" // Hide overlay from screen readers
        ></div>

        {/* --- Removed Optional Subtle Background Grid & Blobs to avoid clutter --- */}
        {/* <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-5 dark:opacity-[0.03]"></div> */}
        {/* <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000 -z-10"></div> */}
        {/* <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-chart-2/10 dark:bg-chart-2/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000 -z-10"></div> */}

        {/* Content Container - Ensure it's above the overlay */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* --- Adjusted text colors for high contrast on dark overlay --- */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
            Project Management Excellence
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-200 dark:text-gray-300 max-w-2xl mx-auto">
            From initial deployment and day-to-day optimization to big-picture
            thinking and proactive strategizing, our experts turn vision into
            reality.
          </p>
        </div>
      </section>
      {/* End of Hero Section */}

      {/* Introduction Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-3xl prose dark:prose-invert prose-lg">
          {/* Using Tailwind Typography plugin for nice defaults */}
          <p>
            Our experienced project managers understand the unique challenges
            and potential solutions within Corporate Real Estate, Asset
            Management, and Facility Management. We provide comprehensive
            project management and coordination services to guide our clients
            through complex initiatives.
          </p>
        </div>
      </section>

      {/* Agile vs Waterfall Section */}
      <section className="py-16 lg:py-24 bg-secondary/50 dark:bg-secondary/30">
        {/* ... (rest of agile vs waterfall section - no changes needed here) ... */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Choosing the Right Approach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We adapt our methodology, primarily leveraging Agile practices for
              flexibility and results, while understanding the context where
              Waterfall might apply.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Agile Card */}
            <InfoCard>
              {/* ... Agile Content ... */}
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                  <GitCompareArrows className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Agile Approach
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground">
                <p>
                  An incremental and iterative practice with regular feedback
                  intervals, promoting adaptability. Ideal for solution
                  implementation and development where requirements may evolve.
                </p>
                <p>
                  Allows for regular, high-impact releases, delivering value
                  progressively and enabling rapid response to change. Our
                  preferred method for most ARCHIBUS projects.
                </p>
                <ul className="list-none p-0">
                  <li className="flex items-start gap-2 my-1">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>Iterative & Incremental</span>
                  </li>
                  <li className="flex items-start gap-2 my-1">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>High Adaptability</span>
                  </li>
                  <li className="flex items-start gap-2 my-1">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>Frequent Feedback</span>
                  </li>
                  <li className="flex items-start gap-2 my-1">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>Faster Time-to-Value</span>
                  </li>
                </ul>
              </div>
            </InfoCard>
            {/* Waterfall Card */}
            <InfoCard className="opacity-75">
              {/* ... Waterfall Content ... */}
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-muted/50 text-muted-foreground p-3 rounded-full">
                  <ListChecks className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Waterfall Approach
                </h3>
              </div>
              <div className="prose dark:prose-invert text-muted-foreground">
                <p>
                  Follows a linear, sequential formula where project phases are
                  completed in order. Each phase requires sign-off before the
                  next begins.
                </p>
                <p>
                  Can be less flexible, making it difficult and costly to
                  revisit previous phases if changes are needed. Suitable for
                  projects with very stable, well-defined requirements from the
                  outset.
                </p>
                <ul className="list-none p-0">
                  <li className="flex items-start gap-2 my-1">
                    <ListChecks className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    <span>Linear & Sequential</span>
                  </li>
                  <li className="flex items-start gap-2 my-1">
                    <ListChecks className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    <span>Clear Stages & Gates</span>
                  </li>
                  <li className="flex items-start gap-2 my-1">
                    <ListChecks className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    <span>Less Adaptable to Change</span>
                  </li>
                  <li className="flex items-start gap-2 my-1">
                    <ListChecks className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                    <span>Defined Scope Upfront</span>
                  </li>
                </ul>
              </div>
            </InfoCard>
          </div>
          <div className="mt-12 text-center prose dark:prose-invert max-w-3xl mx-auto">
            <p>
              Our strategy focuses on applying an agile mindset for ARCHIBUS
              implementations, emphasizing adaptability, multiple go-lives, and
              strategic iterations, always with an on-time and on-budget focus.
              We tailor processes based on best practices and your specific
              organizational needs.
            </p>
          </div>
        </div>
      </section>

      {/* Key Activities Section */}
      <section className="py-16 lg:py-24">
        {/* ... (rest of key activities section - no changes needed here) ... */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Our Approach in Action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Key activities we undertake to ensure project success:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Needs Analysis",
                description:
                  "Closely analyzing organizational needs with the client.",
              },
              {
                icon: Lightbulb,
                title: "Adaptive Planning",
                description:
                  "Planning projects flexibly to accommodate change.",
              },
              {
                icon: ListChecks,
                title: "Concept & Detail Definition",
                description: "Defining clear concepts and work specifics.",
              },
              {
                icon: Users,
                title: "Client Enablement",
                description: "Providing assistance, training, and workshops.",
              },
              {
                icon: CalendarClock,
                title: "Regular Reporting",
                description:
                  "Establishing status meetings and progress tracking.",
              },
              {
                icon: Shuffle,
                title: "Dynamic Response",
                description:
                  "Reacting flexibly to changes and new requirements.",
              },
              {
                icon: BadgeDollarSign,
                title: "Budget & Schedule Adherence",
                description:
                  "Orienting towards budget requirements and timelines.",
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

      {/* Simple Call to Action Section */}
      <SimpleCallToAction
        className="mt-16 lg:mt-24" // Add top margin
      />
    </div>
  );
};
