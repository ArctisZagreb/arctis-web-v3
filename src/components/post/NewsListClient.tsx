"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import StoryCard from "./StoryCard";
import type { QueryResultStoryListItem } from "@/types/sanity";

interface NewsListClientProps {
  initialPosts: QueryResultStoryListItem[];
}

/**
 * Client component for displaying and filtering news articles
 * Provides search functionality and responsive grid layout
 */
export default function NewsListClient({ initialPosts }: NewsListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // Filter posts based on search term with memoization for performance
  const postsToDisplay = useMemo(() => {
    if (!searchTerm) {
      return initialPosts;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return initialPosts.filter(
      (post) =>
        post.title?.toLowerCase()?.includes(lowerCaseSearchTerm) ||
        post.description?.toLowerCase()?.includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, initialPosts]);

  // Update filtered posts when search results change
  useEffect(() => {
    setFilteredPosts(postsToDisplay);
  }, [postsToDisplay]);

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
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 h-11 rounded-md border shadow-sm"
            aria-label="Search news articles"
          />
        </div>
      </div>

      {/* Results Display */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredPosts.map((post) => (
            <StoryCard key={post._id} item={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">
            No news articles found matching your search.
          </p>
          {searchTerm && (
            <p className="text-sm mt-2">Try refining your search term.</p>
          )}
        </div>
      )}
    </div>
  );
}
