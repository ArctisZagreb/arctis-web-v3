// Space Management
export const SPACE_UTILIZATION_IMPROVEMENT_FACTOR = 0.15; // e.g., 15% of the cost of 'unused' space can be saved/repurposed

// Maintenance Management
export const MAINTENANCE_REACTIVE_REDUCTION_FACTOR = 0.25; // e.g., 25% reduction in cost associated with reactive maintenance time
export const MAINTENANCE_EXTERNAL_COST_OPTIMIZATION_FACTOR = 0.1; // e.g., 10% reduction in external maintenance spend

// Administrative Efficiency
export const ADMIN_MANUAL_WORK_REDUCTION_FACTOR = 0.3; // e.g., 30% reduction in cost associated with manual admin tasks

// Optional Section
export const ENERGY_SAVINGS_FACTOR = 0.08; // e.g., 8% potential reduction in annual energy costs
export const ASSET_LOSS_REDUCTION_FACTOR = 0.03; // e.g., 3% reduction in costs related to asset loss/replacement based on total value (adjust this logic/factor as needed)

//----------------------------------------------------

// Define the structure for the calculation results
export interface CalculationResult {
  totalSavings: number;
  savingsByCategory: {
    space: number;
    maintenance: number;
    admin: number;
    optional: number; // Combined savings from optional inputs (Energy, Assets)
  };
  // Optional: Add raw inputs or intermediate calculations if needed for PDF/debugging
  debug?: {
    inputs: any;
    toggles: any;
  };
}
