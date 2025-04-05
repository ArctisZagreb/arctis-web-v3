// components/roi/sections/AdminSection.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "../form-elements/FormSection";
import { ValidatedInput } from "../form-elements/ValidatedInput";
import { RoiCalculatorFormData } from "@/lib/zod/roiSchema"; // Import the form data type

interface AdminSectionProps {
  isIncluded: boolean;
  onToggle: () => void;
}

export function AdminSection({ isIncluded, onToggle }: AdminSectionProps) {
  // Get methods from FormProvider context
  const { control } = useFormContext<RoiCalculatorFormData>();

  return (
    <FormSection
      sectionKey="admin"
      title="Administrative Efficiency"
      toggleDescription="Include potential savings from reduced manual admin work."
      isIncluded={isIncluded}
      onToggle={onToggle}
    >
      {/* Input fields specific to this section */}
      <ValidatedInput
        control={control}
        name="admin_employees"
        label="Number of Staff Handling FM/Property Admin"
        placeholder="e.g., 3"
        type="number"
        description="Count of personnel involved in manual tracking, reporting, or coordination related to facilities/property."
      />

      <ValidatedInput
        control={control}
        name="admin_avgSalary"
        label="Average Annual Gross Salary (Admin Staff)"
        placeholder="e.g., 40000"
        type="number"
        unit="€"
        description="Average annual gross salary including benefits per relevant administrative employee."
      />

      <ValidatedInput
        control={control}
        name="admin_manualWorkPercent"
        label="Estimated Time on Manual Tasks & Reporting"
        placeholder="e.g., 40"
        type="number"
        unit="%"
        min={0}
        max={100}
        description="Percentage of these staff's time spent on tasks Archibus could automate (data entry, report generation, searching info)."
      />
    </FormSection>
  );
}
