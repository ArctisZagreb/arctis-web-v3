// components/roi/sections/OptionalSection.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "../form-elements/FormSection";
import { ValidatedInput } from "../form-elements/ValidatedInput";
import { RoiCalculatorFormData } from "@/lib/zod/roiSchema"; // Import the form data type

interface OptionalSectionProps {
  isIncluded: boolean; // This section starts as false by default from the parent state
  onToggle: () => void;
}

export function OptionalSection({
  isIncluded,
  onToggle,
}: OptionalSectionProps) {
  // Get methods from FormProvider context
  const { control } = useFormContext<RoiCalculatorFormData>();

  return (
    <FormSection
      sectionKey="optional"
      title="Optional: Energy & Asset Savings"
      toggleDescription="Include potential savings from energy monitoring or improved asset tracking (optional)."
      isIncluded={isIncluded}
      onToggle={onToggle}
    >
      {/* Input fields specific to this section */}
      <ValidatedInput
        control={control}
        name="energy_annualCost" // Corresponds to the optional field in Zod schema
        label="Estimated Annual Energy Cost"
        placeholder="e.g., 100000"
        type="number"
        unit="€"
        description="Your approximate total yearly cost for electricity, heating, water etc., if available."
      />

      {/* Add more optional inputs here if needed based on Product Plan */}

      <ValidatedInput
        control={control}
        name="asset_totalValue"
        label="Estimated Value of Tracked Assets"
        placeholder="e.g., 500000"
        type="number"
        unit="€"
        description="Approximate value of furniture, IT equipment, etc., where improved tracking could reduce loss/theft."
      />
    </FormSection>
  );
}
