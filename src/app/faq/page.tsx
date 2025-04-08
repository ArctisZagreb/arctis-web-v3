import React from "react";
import { Metadata } from "next";
import { faqCategories } from "@/data/faqData";

import FaqHeader from "@/components/faq/FaqHeader";
import FaqClientLayout from "@/components/faq/FaqClientLayout";

export const metadata: Metadata = {
  title: "FAQ | Arctis - Frequently Asked Questions",
  description:
    "Find answers to frequently asked questions about ARCHIBUS, IWMS, maintenance, property, space management, and Arctis services.",
};

export default function FaqPage() {
  const allFaqCategories = faqCategories;

  return (
    <div className="flex flex-col">
      <FaqHeader />

      <main className="flex-1 bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <FaqClientLayout faqData={allFaqCategories} />
        </div>
      </main>
    </div>
  );
}
