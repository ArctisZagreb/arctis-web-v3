import { RoiCalculatorFormData } from "@/lib/zod/roiSchema";

export const sampleHotelChainData: Partial<RoiCalculatorFormData> = {
  // Space Management (5 Hotels, avg 6000m² each, €200/m²/yr, 12% unused)
  space_totalArea: 30000, // 5 * 6000
  space_costPerSqM: 200,
  space_unusedPercent: 12,

  // Maintenance Management (15 staff total, €38k avg, 55% reactive, €80k external)
  maint_employees: 15,
  maint_avgSalary: 38000,
  maint_reactivePercent: 55,
  maint_externalCost: 80000,

  // Administrative Efficiency (5 staff, €35k avg, 35% manual)
  admin_employees: 5,
  admin_avgSalary: 35000,
  admin_manualWorkPercent: 35,

  // Optional (Energy €250k/yr, Assets €1.5M total)
  energy_annualCost: 250000,
  asset_totalValue: 1500000,
};

export const sampleHotelChainDescription =
  "Example: A hotel chain managing 5 properties, totaling approx. 30,000 m². They face challenges with reactive maintenance, space utilization during off-seasons, and coordinating administrative tasks across locations.";

// Define which sections should be active for this example
export const sampleHotelChainToggles = {
  space: true,
  maintenance: true,
  admin: true,
  optional: true, // Include optional for a full example
};
