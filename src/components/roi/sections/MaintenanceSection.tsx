// components/roi/sections/MaintenanceSection.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "../form-elements/FormSection";
import { ValidatedInput } from "../form-elements/ValidatedInput";
import { RoiCalculatorFormData } from "@/lib/zod/roiSchema"; // Import the form data type

interface MaintenanceSectionProps {
  isIncluded: boolean;
  onToggle: () => void;
}

export function MaintenanceSection({
  isIncluded,
  onToggle,
}: MaintenanceSectionProps) {
  // Get methods from FormProvider context
  const { control } = useFormContext<RoiCalculatorFormData>();

  return (
    <FormSection
      sectionKey="maintenance"
      title="Maintenance Management"
      toggleDescription="Include potential savings from streamlined maintenance operations."
      isIncluded={isIncluded}
      onToggle={onToggle}
    >
      {/* Input fields specific to this section */}
      <ValidatedInput
        control={control}
        name="maint_employees"
        label="Number of Maintenance Staff"
        placeholder="e.g., 10"
        type="number"
        description="Total internal technicians and staff involved in maintenance tasks."
      />

      <ValidatedInput
        control={control}
        name="maint_avgSalary"
        label="Average Annual Gross Salary (Maintenance Staff)"
        placeholder="e.g., 45000"
        type="number"
        unit="€"
        description="Average annual gross salary including benefits per maintenance employee."
      />

      <ValidatedInput
        control={control}
        name="maint_reactivePercent"
        label="Estimated Time on Reactive Maintenance"
        placeholder="e.g., 60"
        type="number"
        unit="%"
        min={0}
        max={100}
        description="Percentage of maintenance staff time spent on unplanned, emergency repairs vs. planned/preventive work."
      />

      <ValidatedInput
        control={control}
        name="maint_externalCost"
        label="Annual Cost of External Maintenance Services"
        placeholder="e.g., 25000"
        type="number"
        unit="€"
        description="Total annual amount spent on third-party contractors for maintenance and repairs."
      />
    </FormSection>
  );
}
