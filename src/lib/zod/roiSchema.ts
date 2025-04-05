import { z } from "zod";

export const roiCalculatorSchema = z.object({
  // Space Management
  space_totalArea: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "Total area must be greater than 0")
    .optional(),

  space_costPerSqM: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Cost cannot be negative")
    .optional(),

  space_unusedPercent: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Percentage must be 0 or more")
    .max(100, "Percentage cannot exceed 100")
    .optional(),

  // Maintenance Management
  maint_employees: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .min(0, "Number of employees cannot be negative")
    .optional(),

  maint_avgSalary: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Salary cannot be negative")
    .optional(),

  maint_reactivePercent: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Percentage must be 0 or more")
    .max(100, "Percentage cannot exceed 100")
    .optional(),

  maint_externalCost: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "External cost cannot be negative")
    .optional(),

  // Administrative Efficiency
  admin_employees: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .min(0, "Number of employees cannot be negative")
    .optional(),

  admin_avgSalary: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Salary cannot be negative")
    .optional(),

  admin_manualWorkPercent: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Percentage must be 0 or more")
    .max(100, "Percentage cannot exceed 100")
    .optional(),

  // Optional (Energy/Assets)
  energy_annualCost: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Energy cost cannot be negative")
    .optional(),

  asset_totalValue: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Asset value cannot be negative")
    .optional(),
});

// TypeScript type from Zod schema
export type RoiCalculatorFormData = z.infer<typeof roiCalculatorSchema>;
