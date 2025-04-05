import React from "react";
import { Metadata } from "next";
import { ProjectManagementContent } from "@/components/sections/services/ProjectManagementContent";

/**
 * Metadata configuration for Project Management page
 * Enhances SEO with appropriate title, description and keywords
 */
export const metadata: Metadata = {
  title: "Project Management Services | Arctis",
  description:
    "Expert project management for Corporate Real Estate, Asset Management, and Facility Management. Discover our Agile and Waterfall approaches.",
  keywords: [
    "project management",
    "agile methodology",
    "waterfall approach",
    "facility management",
    "corporate real estate",
    "asset management",
  ],
  openGraph: {
    title: "Project Management Services | Arctis",
    description:
      "Expert project management services with Agile and Waterfall approaches.",
    type: "website",
  },
};

/**
 * Project Management Page Component
 *
 * Serves as the main container for the Project Management services page,
 * providing information about our project management methodologies and approaches.
 *
 * @returns {JSX.Element} The rendered Project Management page
 */
export default function ProjectManagementPage() {
  return (
    <main>
      <ProjectManagementContent />
    </main>
  );
}
