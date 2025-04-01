// app/project-management/page.tsx
import React from "react";
import { ProjectManagementContent } from "@/components/sections/services/ProjectManagementContent"; // Adjust path if needed
import SimpleCallToAction from "@/components/sections/SimpleCallToAction";

export const metadata = {
  title: "Project Management Services | Arctis",
  description:
    "Expert project management for Corporate Real Estate, Asset Management, and Facility Management. Discover our Agile and Waterfall approaches.",
};

export default function ProjectManagementPage() {
  return (
    <main>
      {/* You might have a common Layout wrapper here for header/footer */}
      <ProjectManagementContent />
    </main>
  );
}
