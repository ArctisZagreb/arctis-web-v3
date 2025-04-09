"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import StoryCard from "./StoryCard";
import type { QueryResultStoryListItem } from "@/types/sanity";

interface SuccessStoriesListClientProps {
  initialStories: QueryResultStoryListItem[];
}

/**
 * Client component for displaying and filtering success stories
 * Provides search functionality and responsive grid layout
 */
export default function SuccessStoriesListClient({
  initialStories,
}: SuccessStoriesListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStories, setFilteredStories] = useState(initialStories);

  // Filter stories based on search term with memoization for performance
  const storiesToDisplay = useMemo(() => {
    if (!searchTerm) {
      return initialStories;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return initialStories.filter(
      (story) =>
        story.title?.toLowerCase()?.includes(lowerCaseSearchTerm) ||
        story.description?.toLowerCase()?.includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, initialStories]);

  // Update filtered stories when search results change
  useEffect(() => {
    setFilteredStories(storiesToDisplay);
  }, [storiesToDisplay]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-10 md:mb-12 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 text-muted-foreground -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search success stories..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 h-11 rounded-md border shadow-sm"
            aria-label="Search success stories"
          />
        </div>
      </div>

      {/* Results Display */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredStories.map((story) => (
            <StoryCard key={story._id} item={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">
            No success stories found matching your search.
          </p>
          {searchTerm && (
            <p className="text-sm mt-2">Try refining your search term.</p>
          )}
        </div>
      )}
    </div>
  );
}
