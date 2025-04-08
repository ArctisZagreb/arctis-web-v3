"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqCategory } from "@/data/faqData";
import { cn } from "@/lib/utils";
import {
  Wrench,
  Building,
  SquareStack,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

// Icon mapping
const iconMap: { [key: string]: LucideIcon } = {
  Wrench: Wrench,
  Building: Building,
  SquareStack: SquareStack,
  Default: HelpCircle, // Default icon
};

interface FaqAccordionProps {
  filteredCategories: FaqCategory[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ filteredCategories }) => {
  // Display message if no results after filtering
  if (!filteredCategories || filteredCategories.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No frequently asked questions match your search criteria.
      </div>
    );
  }

  return (
    // Outer Accordion for CATEGORIES
    // type="multiple" allows opening multiple categories at once
    // collapsible allows closing all items
    <Accordion type="multiple" className="w-full space-y-3 md:space-y-4">
      {filteredCategories.map((category, categoryIndex) => {
        // Select icon based on iconName or use default
        const CategoryIcon = category.iconName
          ? iconMap[category.iconName]
          : iconMap.Default;

        return (
          <AccordionItem
            key={category.id}
            value={`category-${category.id}`}
            className="border border-gray-200/90 rounded-lg overflow-hidden shadow-sm bg-white transition-shadow hover:shadow-md"
          >
            {/* Category Trigger */}
            <AccordionTrigger className="flex items-center justify-between w-full px-5 py-4 text-left font-semibold text-base md:text-lg text-gray-800 bg-slate-50 hover:bg-slate-100/80 transition-colors rounded-t-lg group">
              <div className="flex items-center">
                <CategoryIcon className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0" />
                <span>{category.title}</span>
              </div>
              {/* Default arrow from Shadcn will be displayed */}
            </AccordionTrigger>

            {/* Category Content (Inner Accordion for QUESTIONS) */}
            <AccordionContent className="pt-0">
              <div className="border-t">
                {/* Display questions if they exist after filtering */}
                {category.items && category.items.length > 0 ? (
                  // Inner Accordion for QUESTIONS in this category
                  <Accordion type="multiple" className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem
                        key={item.id}
                        value={`item-${item.id}`}
                        className={cn(
                          "border-b last:border-b-0", // Line between questions
                          itemIndex === 0 ? "border-t-0" : "" // Remove top border for first question
                        )}
                      >
                        {/* Question Trigger */}
                        <AccordionTrigger className="px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50/80 transition-colors">
                          {item.question}
                        </AccordionTrigger>
                        {/* Question Content (Answer) */}
                        <AccordionContent className="px-4 pb-4 pt-1">
                          <p className="text-base text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="p-4 text-sm text-muted-foreground italic">
                    No questions found in this category for your search.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FaqAccordion;
