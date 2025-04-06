import React from "react";
import { Metadata } from "next";
import { getAllReferences } from "@/lib/sanity/sanity.queries";
import type { QueryResultReference } from "@/types/sanity";
import ReferencesHeader from "@/components/references/ReferencesHeader";
import ReferencesClientLayout from "@/components/references/ReferencesClientLayout";

export const metadata: Metadata = {
  title: "References | Arctis Portfolio",
  description:
    "Explore successful projects and valued clients Arctis has collaborated with, showcasing our expertise in IWMS and ARCHIBUS.",
};

export default async function ReferencesPage() {
  const references: QueryResultReference[] = await getAllReferences();

  return (
    <div className="flex flex-col">
      <ReferencesHeader />

      <main className="flex-1 bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {references && references.length > 0 ? (
            <ReferencesClientLayout initialReferences={references} />
          ) : (
            <p className="text-center text-muted-foreground">
              No references found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
