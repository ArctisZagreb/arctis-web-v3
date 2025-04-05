import { RoiCalculatorFormData } from "@/lib/zod/roiSchema";
import {
  SPACE_UTILIZATION_IMPROVEMENT_FACTOR,
  MAINTENANCE_REACTIVE_REDUCTION_FACTOR,
  MAINTENANCE_EXTERNAL_COST_OPTIMIZATION_FACTOR,
  ADMIN_MANUAL_WORK_REDUCTION_FACTOR,
  ENERGY_SAVINGS_FACTOR,
  ASSET_LOSS_REDUCTION_FACTOR,
  CalculationResult,
} from "./calculationConstants"; // Adjust path if needed

// Helper to safely get number from form data (returns 0 if undefined/null)
const getNumber = (value: number | undefined | null): number => value ?? 0;

interface SectionToggles {
  space: boolean;
  maintenance: boolean;
  admin: boolean;
  optional: boolean;
}

export function calculateROI(
  data: RoiCalculatorFormData,
  toggles: SectionToggles
): CalculationResult {
  // Initialize results
  const results: CalculationResult = {
    totalSavings: 0,
    savingsByCategory: {
      space: 0,
      maintenance: 0,
      admin: 0,
      optional: 0,
    },
    // Optionally include inputs for debugging or PDF generation
    debug: {
      inputs: data,
      toggles: toggles,
    },
  };

  // --- 1. Space Management Savings ---
  if (toggles.space) {
    const totalArea = getNumber(data.space_totalArea);
    const costPerSqM = getNumber(data.space_costPerSqM);
    const unusedPercent = getNumber(data.space_unusedPercent) / 100; // Convert percentage to decimal

    if (totalArea > 0 && costPerSqM > 0 && unusedPercent >= 0) {
      const costOfUnusedSpace = totalArea * unusedPercent * costPerSqM;
      results.savingsByCategory.space =
        costOfUnusedSpace * SPACE_UTILIZATION_IMPROVEMENT_FACTOR;
    }
  }

  // --- 2. Maintenance Management Savings ---
  if (toggles.maintenance) {
    let maintenanceSavings = 0;

    // Savings from reduced reactive maintenance (internal staff)
    const maintEmployees = getNumber(data.maint_employees);
    const avgSalary = getNumber(data.maint_avgSalary);
    const reactivePercent = getNumber(data.maint_reactivePercent) / 100;

    if (maintEmployees > 0 && avgSalary > 0 && reactivePercent >= 0) {
      const costOfReactiveTime = maintEmployees * avgSalary * reactivePercent;
      maintenanceSavings +=
        costOfReactiveTime * MAINTENANCE_REACTIVE_REDUCTION_FACTOR;
    }

    // Savings from optimized external maintenance costs
    const externalCost = getNumber(data.maint_externalCost);
    if (externalCost > 0) {
      maintenanceSavings +=
        externalCost * MAINTENANCE_EXTERNAL_COST_OPTIMIZATION_FACTOR;
    }

    results.savingsByCategory.maintenance = maintenanceSavings;
  }

  // --- 3. Administrative Efficiency Savings ---
  if (toggles.admin) {
    const adminEmployees = getNumber(data.admin_employees);
    const adminAvgSalary = getNumber(data.admin_avgSalary);
    const manualWorkPercent = getNumber(data.admin_manualWorkPercent) / 100;

    if (adminEmployees > 0 && adminAvgSalary > 0 && manualWorkPercent >= 0) {
      const costOfManualWork =
        adminEmployees * adminAvgSalary * manualWorkPercent;
      results.savingsByCategory.admin =
        costOfManualWork * ADMIN_MANUAL_WORK_REDUCTION_FACTOR;
    }
  }

  // --- 4. Optional Savings (Energy & Assets) ---
  if (toggles.optional) {
    let optionalSavings = 0;

    // Energy Savings
    const energyCost = getNumber(data.energy_annualCost);
    if (energyCost > 0) {
      optionalSavings += energyCost * ENERGY_SAVINGS_FACTOR;
    }

    // Asset Savings (using the uncommented field)
    const assetValue = getNumber(data.asset_totalValue); // Get the value from form data
    if (assetValue > 0) {
      // Simple model: saving is a small percentage of the total asset value
      // representing reduced loss, better lifecycle management, etc.
      optionalSavings += assetValue * ASSET_LOSS_REDUCTION_FACTOR;
    }

    results.savingsByCategory.optional = optionalSavings;
  }

  // --- Calculate Total Savings ---
  results.totalSavings =
    results.savingsByCategory.space +
    results.savingsByCategory.maintenance +
    results.savingsByCategory.admin +
    results.savingsByCategory.optional;

  // Ensure results are numbers and not NaN
  results.totalSavings = isNaN(results.totalSavings) ? 0 : results.totalSavings;
  results.savingsByCategory.space = isNaN(results.savingsByCategory.space)
    ? 0
    : results.savingsByCategory.space;
  results.savingsByCategory.maintenance = isNaN(
    results.savingsByCategory.maintenance
  )
    ? 0
    : results.savingsByCategory.maintenance;
  results.savingsByCategory.admin = isNaN(results.savingsByCategory.admin)
    ? 0
    : results.savingsByCategory.admin;
  results.savingsByCategory.optional = isNaN(results.savingsByCategory.optional)
    ? 0
    : results.savingsByCategory.optional;

  return results;
}
