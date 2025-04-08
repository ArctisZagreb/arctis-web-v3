"use client";

import React, { useState, useMemo } from "react";
import type { FaqCategory } from "@/data/faqData";
import FaqSearchInput from "./FaqSearchInput";
import FaqAccordion from "./FaqAccordian";

interface FaqClientLayoutProps {
  faqData: FaqCategory[];
}

const FaqClientLayout: React.FC<FaqClientLayoutProps> = ({ faqData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handler for search term changes
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Memoized filtering of data based on searchTerm
  const filteredData = useMemo(() => {
    // If no search term, return all data
    if (!searchTerm.trim()) {
      return faqData;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter categories
    return faqData
      .map((category) => {
        // Filter items within each category
        const filteredItems = category.items.filter(
          (item) =>
            item.question.toLowerCase().includes(lowerCaseSearchTerm) ||
            item.answer.toLowerCase().includes(lowerCaseSearchTerm)
        );
        // Return category only if it has filtered items
        return { ...category, items: filteredItems };
      })
      .filter((category) => category.items.length > 0);
  }, [searchTerm, faqData]); // Dependencies: searchTerm and original data

  return (
    <div className="space-y-10 md:space-y-12">
      {/* Search Input */}
      <div className="max-w-2xl mx-auto">
        <FaqSearchInput
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="mt-8">
        <FaqAccordion filteredCategories={filteredData} />
      </div>
    </div>
  );
};

export default FaqClientLayout;
