import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SectionToggleProps {
  sectionKey: string;
  title: string;
  description?: string;
  isIncluded: boolean;
  onToggle: () => void;
  className?: string;
}

export function SectionToggle({
  sectionKey,
  title,
  description,
  isIncluded,
  onToggle,
  className,
}: SectionToggleProps) {
  const switchId = `toggle-${sectionKey}`;

  return (
    // Apply conditional classes here using cn()
    <div
      className={cn(
        "flex items-center justify-between space-x-4 rounded-md border p-4 shadow-sm transition-colors duration-200",
        isIncluded
          ? "border-blue-400 bg-blue-50 ring-1 ring-blue-300/50"
          : "border-gray-200 bg-gray-50/80",
        className // Allow overriding/extending with passed className
      )}
    >
      <div className="flex flex-col space-y-1">
        <Label
          htmlFor={switchId}
          className={cn(
            "text-base font-semibold cursor-pointer transition-colors",
            isIncluded ? "text-blue-700" : "text-gray-900"
          )}
        >
          {title}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        id={switchId}
        checked={isIncluded}
        onCheckedChange={onToggle}
        aria-label={`Toggle ${title} section`}
        // Optional: Adjust Switch colors
        // className={cn(isIncluded ? "[&>span]:bg-blue-600" : "")} // Example if structure allows targeting parts
      />
    </div>
  );
}
