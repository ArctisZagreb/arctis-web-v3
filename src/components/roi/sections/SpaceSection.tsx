// components/roi/sections/SpaceSection.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "../form-elements/FormSection";
import { ValidatedInput } from "../form-elements/ValidatedInput";
import { RoiCalculatorFormData } from "@/lib/zod/roiSchema"; // Import the form data type

interface SpaceSectionProps {
  isIncluded: boolean;
  onToggle: () => void;
}

export function SpaceSection({ isIncluded, onToggle }: SpaceSectionProps) {
  // Get methods from FormProvider context
  const { control } = useFormContext<RoiCalculatorFormData>();

  return (
    <FormSection
      sectionKey="space"
      title="Space Management & Utilization"
      toggleDescription="Include potential savings from optimizing space usage."
      isIncluded={isIncluded}
      onToggle={onToggle}
    >
      {/* Input fields specific to this section */}
      <ValidatedInput
        control={control}
        name="space_totalArea"
        label="Total Managed Area"
        placeholder="e.g., 5000"
        type="number" // Use number type for better mobile keyboard if desired
        unit="m²"
        description="Total square meters of office, hotel, or other space you manage."
      />

      <ValidatedInput
        control={control}
        name="space_costPerSqM"
        label="Average Annual Cost per m²"
        placeholder="e.g., 150"
        type="number"
        unit="€/m²"
        description="Estimated total annual cost (rent/ownership, utilities, basic upkeep) per square meter."
      />

      <ValidatedInput
        control={control}
        name="space_unusedPercent"
        label="Estimated Unused/Suboptimal Space"
        placeholder="e.g., 15"
        type="number"
        unit="%"
        min={0} // Add min/max directly if helpful, Zod handles validation
        max={100}
        description="Your best estimate of the percentage of space that is currently vacant or not used effectively."
      />
    </FormSection>
  );
}
