"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

// Props definition
interface FaqSearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const FaqSearchInput: React.FC<FaqSearchInputProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search questions or keywords...",
}) => {
  // Handler function called on each change in the input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    // Relatively positioned div to absolutely position the icon inside it
    <div className="relative w-full">
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
        aria-hidden="true" // Hide icon from screen readers as it's decorative
      />

      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="pl-11 pr-4 py-2.5 text-base h-11 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        aria-label="Search Frequently Asked Questions"
      />

      {/* Clear button - only shown when there is text */}
      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-secondary cursor-pointer"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default FaqSearchInput;
