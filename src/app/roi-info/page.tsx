import React from "react";
import { Metadata } from "next";
import { HeaderBackground } from "@/components/ui/header-background";
// Removing unused icons
// import { Calculator, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "ROI Calculator Methodology | Arctis",
  description:
    "Learn how the Arctis Archibus ROI calculator works, the formulas it uses, and the assumptions behind the savings estimates.",
};

export default function RoiInfoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
        <HeaderBackground />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            ROI Calculator Methodology
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Understanding the calculations behind our Archibus savings estimate.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <article className="prose prose-lg lg:prose-xl prose-blue max-w-none text-gray-800">
            <p className="lead text-xl text-gray-600 mb-8">
              Here we detail the principles, formulas, and assumptions our
              interactive Return on Investment (ROI) calculator uses to provide
              you with an estimate of potential savings by implementing the
              Archibus solution.
            </p>

            <h2 id="purpose">1. Calculator Purpose</h2>
            <p>
              This calculator is designed as a tool to help potential clients
              (medium/large companies, hotels, organizations) estimate the
              <strong>approximate annual financial savings</strong> they could
              achieve by transitioning from their current methods of managing
              real estate, space, and maintenance to an integrated system like
              Archibus.
            </p>
            <p>
              The goal is not to provide an absolutely precise calculation (as
              this depends on many specific factors), but rather to offer a
              <strong>realistic potential estimate</strong> based on the data
              entered by the client and on
              <strong>average improvement factors</strong> observed among
              existing Archibus users.
            </p>

            <h2 id="principle">2. Basic Operating Principle</h2>
            <p>
              The calculator works by identifying
              <strong>hidden costs and inefficiencies</strong> in the
              client&apos;s current mode of operation (without Archibus) and
              applying a percentage improvement (savings) that Archibus
              typically brings to these areas.
            </p>
            <div className="my-4 p-4 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm text-gray-700">
              <p className="font-semibold mb-1">Formula (Conceptual):</p>
              <p>
                <code>
                  Estimated Annual Savings = Σ ( Estimated Cost of Inefficiency
                  * Improvement Factor with Archibus (%) )
                </code>
              </p>
              <p className="text-xs mt-2">
                <em>
                  Where &ldquo;Σ&rdquo; denotes the sum of savings from all
                  included categories (Space, Maintenance, Administration,
                  Optional).
                </em>
              </p>
            </div>

            <h2 id="categories">3. Calculation Categories and Formulas</h2>
            <p>
              The calculator collects data through several key sections. The
              user can select (toggle on/off) which sections to include in the
              calculation.
            </p>

            <h3 id="space">A) Space Management & Utilization</h3>
            <p>
              <strong>Savings Goal:</strong> Reduce costs associated with unused
              or sub-optimally utilized space. Archibus helps identify such
              spaces and make decisions regarding their repurposing, lease
              termination, or better allocation.
            </p>
            <p>
              <strong>Required Client Inputs:</strong>
            </p>
            <ul className="list-disc list-inside my-2">
              <li>Total Managed Area (m²): The total area they manage.</li>
              <li>
                Average Annual Cost per m² (€/m²): The cost of ownership/lease
                and upkeep per square meter.
              </li>
              <li>
                Estimated Percentage of Unused Space (%): How much space is not
                fully functional.
              </li>
            </ul>
            <p>
              <strong>Formula Logic:</strong>
            </p>
            <blockquote className="border-l-4 border-blue-300 pl-4 py-2 my-3 bg-blue-50/50 text-sm">
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Calculate <em>Total Annual Cost of Unused Space</em>: <br />
                  <code>
                    (Total Area * % Unused Space / 100) * Average Cost per m²
                  </code>
                </li>
                <li>
                  Calculate <em>Estimated Savings</em>: <br />
                  <code>
                    (Total Annual Cost of Unused Space) * Utilization
                    Improvement Factor (%)
                  </code>
                </li>
              </ol>
              <p className="mt-2 text-xs">
                <em>
                  Utilization Improvement Factor (Our assumption, e.g., 15%):
                </em>
                Represents the percentage of the cost of unused space that can
                realistically be saved or repurposed using Archibus tools.
              </p>
            </blockquote>

            <h3 id="maintenance">B) Maintenance Management</h3>
            <p>
              <strong>Savings Goal:</strong> Reduce the costs of reactive
              (emergency) maintenance, which is more expensive than planned
              maintenance, and optimize the costs of external contractors.
              Archibus enables better planning, work order tracking, and cost
              analysis.
            </p>
            <p>
              <strong>Required Client Inputs:</strong>
            </p>
            <ul className="list-disc list-inside my-2">
              <li>Number of Maintenance Staff: Internal team.</li>
              <li>
                Average Annual Gross Salary of Maintenance Staff (€): Cost of
                the internal team.
              </li>
              <li>
                Estimated Percentage of Time on Reactive Maintenance (%): How
                much time is spent on &ldquo;firefighting&rdquo;.
              </li>
              <li>
                Annual Cost of External Maintenance Services (€): Amount paid to
                third-party companies.
              </li>
            </ul>
            <p>
              <strong>Formula Logic:</strong> Consists of two parts:
            </p>
            <blockquote className="border-l-4 border-emerald-300 pl-4 py-2 my-3 bg-emerald-50/50 text-sm">
              <p className="font-semibold">
                1. Savings on Internal Maintenance:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 mb-2">
                <li>
                  Calculate <em>Cost of Time Spent on Reactive Maintenance</em>:
                  <br />
                  <code>
                    (Number of Staff * Average Salary) * (% Time on Reactive /
                    100)
                  </code>
                </li>
                <li>
                  Calculate <em>Estimated Savings</em>: <br />
                  <code>
                    (Cost of Time Spent on Reactive Maintenance) * Reactive
                    Maintenance Reduction Factor (%)
                  </code>
                </li>
              </ul>
              <p className="text-xs mb-3">
                <em>
                  Reactive Maintenance Reduction Factor (Our assumption, e.g.,
                  25%):
                </em>
                The percentage reduction in inefficient reactive work achieved
                by shifting to planned maintenance.
              </p>

              <p className="font-semibold">
                2. Savings on External Maintenance:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 mb-2">
                <li>
                  Calculate <em>Estimated Savings</em>: <br />
                  <code>
                    (Annual Cost of External Services) * External Cost
                    Optimization Factor (%)
                  </code>
                </li>
              </ul>
              <p className="text-xs mb-3">
                <em>
                  External Cost Optimization Factor (Our assumption, e.g., 10%):
                </em>
                The percentage of savings achievable through better control and
                analysis of external services.
              </p>
              <p className="font-semibold">
                3. Total Savings (Maintenance) = Savings on Internal + Savings
                on External.
              </p>
            </blockquote>

            <h3 id="admin">C) Administrative Efficiency</h3>
            <p>
              <strong>Savings Goal:</strong> Reduce the time (and thus cost)
              that administrative staff spend on manual, repetitive tasks like
              data entry, information retrieval, and report generation. Archibus
              automates many of these processes.
            </p>
            <p>
              <strong>Required Client Inputs:</strong>
            </p>
            <ul className="list-disc list-inside my-2">
              <li>
                Number of Staff in Real Estate/FM Administration: Personnel
                performing these tasks.
              </li>
              <li>
                Average Annual Gross Salary of Admin Staff (€): Cost of these
                staff members.
              </li>
              <li>
                Estimated Percentage of Time on Manual Work (%): How much time
                is spent on non-automated tasks.
              </li>
            </ul>
            <p>
              <strong>Formula Logic:</strong>
            </p>
            <blockquote className="border-l-4 border-amber-300 pl-4 py-2 my-3 bg-amber-50/50 text-sm">
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Calculate <em>Cost of Time Spent on Manual Work</em>: <br />
                  <code>
                    (Number of Admin Staff * Average Salary) * (% Time on Manual
                    Work / 100)
                  </code>
                </li>
                <li>
                  Calculate <em>Estimated Savings</em>: <br />
                  <code>
                    (Cost of Time Spent on Manual Work) * Manual Work Reduction
                    Factor (%)
                  </code>
                </li>
              </ol>
              <p className="mt-2 text-xs">
                <em>
                  Manual Work Reduction Factor (Our assumption, e.g., 30%):
                </em>
                The percentage reduction in manual work achieved through
                automation and data centralization in Archibus.
              </p>
            </blockquote>

            <h3 id="optional">D) Optional: Energy & Assets</h3>
            <p>
              <strong>Savings Goal:</strong> Identify opportunities to reduce
              energy consumption through better monitoring and analysis (if
              supported by Archibus modules) and reduce costs associated with
              loss or inefficient management of assets (furniture, equipment).
            </p>
            <p>
              <strong>Required Client Inputs:</strong>
            </p>
            <ul className="list-disc list-inside my-2">
              <li>Estimated Annual Energy Cost (€).</li>
              <li>Estimated Value of Assets (€).</li>
            </ul>
            <p>
              <strong>Formula Logic:</strong>
            </p>
            <blockquote className="border-l-4 border-violet-300 pl-4 py-2 my-3 bg-violet-50/50 text-sm">
              <p className="font-semibold">1. Savings on Energy:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 mb-2">
                <li>
                  Calculate <em>Estimated Savings</em>: <br />
                  <code>(Annual Energy Cost) * Energy Savings Factor (%)</code>
                </li>
              </ul>
              <p className="text-xs mb-3">
                <em>Energy Savings Factor (Our assumption, e.g., 8%):</em> The
                percentage reduction in energy costs possible through better
                tracking.
              </p>

              <p className="font-semibold">2. Savings on Assets:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 mb-2">
                <li>
                  Calculate <em>Estimated Savings</em>: <br />
                  <code>
                    (Estimated Asset Value) * Asset Loss Reduction Factor (%)
                  </code>
                </li>
              </ul>
              <p className="text-xs mb-3">
                <em>Asset Loss Reduction Factor (Our assumption, e.g., 3%):</em>
                The percentage of asset value whose cost (loss, replacement) can
                be avoided with better tracking.
              </p>
              <p className="font-semibold">
                3. Total Savings (Optional) = Savings on Energy + Savings on
                Assets.
              </p>
            </blockquote>

            <h2 id="total">4. Total Estimated Annual Savings</h2>
            <p>
              The result displayed to the user is the
              <strong>
                sum of the estimated savings from all sections included by the
                user
              </strong>
              (<code>Space</code> + <code>Maintenance</code> +<code>Admin</code>{" "}
              + <code>Optional</code>).
            </p>

            <h2 id="assumptions">5. Key Assumptions and Limitations</h2>
            <ul className="list-disc list-inside space-y-2 my-3">
              <li>
                <strong>Estimate, Not Guarantee:</strong> We emphasize that the
                results are an <em>estimate</em>. Actual savings depend on the
                accuracy of the data entered, the specifics of the client&apos;s
                operations, and the quality of the Archibus implementation.
              </li>
              <li>
                <strong>Improvement Factors:</strong> The percentages used
                (e.g., 15%, 25%, 30%) are
                <strong>our expert assumptions</strong> based on experience and
                industry averages. They are key to the calculation and represent
                the average potential that Archibus brings.
              </li>
              <li>
                <strong>Focus on Savings:</strong> The calculator primarily
                shows <em>potential annual savings</em> in operational costs. It
                does not include the initial investment cost for Archibus
                (licenses, implementation), although this information can be
                used later for a full ROI (Return on Investment) calculation.
              </li>
            </ul>

            <h2 id="conclusion">Conclusion</h2>
            <p>
              The ROI calculator is a valuable tool for quantifying the
              potential benefits of Archibus. By using client data about their
              current operations and applying realistic improvement factors, it
              provides a tangible estimate of annual savings, helping clients
              more easily assess the financial viability of investing in a
              modern IWMS solution.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
