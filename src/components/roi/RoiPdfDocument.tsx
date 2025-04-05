// components/roi/RoiPdfDocument.tsx
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { CalculationResult } from "@/lib/roi/calculationConstants";
import { RoiCalculatorFormData } from "@/lib/zod/roiSchema";

// Section toggle type definition
type SectionToggles = {
  space: boolean;
  maintenance: boolean;
  admin: boolean;
  optional: boolean;
};

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333333",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a8a",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#666666",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 3,
  },
  totalSavingsSection: {
    backgroundColor: "#f0fdf4",
    padding: 15,
    marginBottom: 20,
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  totalSavingsLabel: {
    fontSize: 10,
    color: "#15803d",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  totalSavingsValue: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#166534",
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputSectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
    color: "#4b5563",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    paddingLeft: 10,
  },
  inputLabel: {
    fontSize: 10,
    color: "#374151",
    width: "70%",
  },
  inputValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#1f2937",
    width: "30%",
    textAlign: "right",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  breakdownLabel: {
    fontSize: 10,
  },
  breakdownValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  disclaimer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    fontSize: 8,
    color: "#6b7280",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#aaaaaa",
  },
});

// Helper functions
const formatCurrency = (value: number | undefined | null): string => {
  if (value === undefined || value === null || isNaN(value)) return "N/A";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (
  value: number | undefined | null,
  unit: string = ""
): string => {
  if (value === undefined || value === null || isNaN(value)) return "N/A";
  const numberString = new Intl.NumberFormat("en-GB").format(value);
  return `${numberString}${unit}`;
};

// Category and field labels
const categoryLabels: { [key: string]: string } = {
  space: "Space Optimization",
  maintenance: "Maintenance Efficiency",
  admin: "Admin Productivity",
  optional: "Energy/Asset Savings",
};

const inputLabels: { [key in keyof RoiCalculatorFormData]?: string } = {
  space_totalArea: "Total Managed Area",
  space_costPerSqM: "Avg. Cost per m²",
  space_unusedPercent: "Est. Unused Space",
  maint_employees: "# Maintenance Staff",
  maint_avgSalary: "Avg. Maint. Salary",
  maint_reactivePercent: "% Reactive Maint.",
  maint_externalCost: "External Maint. Cost",
  admin_employees: "# Admin Staff",
  admin_avgSalary: "Avg. Admin Salary",
  admin_manualWorkPercent: "% Manual Admin Work",
  energy_annualCost: "Annual Energy Cost",
  asset_totalValue: "Est. Asset Value",
};

const inputUnits: { [key in keyof RoiCalculatorFormData]?: string } = {
  space_totalArea: " m²",
  space_costPerSqM: " €/m²",
  space_unusedPercent: "%",
  maint_employees: "",
  maint_avgSalary: " €",
  maint_reactivePercent: "%",
  maint_externalCost: " €",
  admin_employees: "",
  admin_avgSalary: " €",
  admin_manualWorkPercent: "%",
  energy_annualCost: " €",
  asset_totalValue: " €",
};

// Section to input field mapping
const sectionInputMapping: {
  [key in keyof SectionToggles]: (keyof RoiCalculatorFormData)[];
} = {
  space: ["space_totalArea", "space_costPerSqM", "space_unusedPercent"],
  maintenance: [
    "maint_employees",
    "maint_avgSalary",
    "maint_reactivePercent",
    "maint_externalCost",
  ],
  admin: ["admin_employees", "admin_avgSalary", "admin_manualWorkPercent"],
  optional: ["energy_annualCost", "asset_totalValue"],
};

interface RoiPdfDocumentProps {
  results: CalculationResult;
}

export const RoiPdfDocument: React.FC<RoiPdfDocumentProps> = ({ results }) => {
  // Extract data from results
  const formData = results.debug?.inputs as RoiCalculatorFormData | undefined;
  const toggles = results.debug?.toggles as SectionToggles | undefined;

  // Check for missing data
  if (!formData || !toggles) {
    return (
      <Document>
        <Page style={styles.page} size="A4">
          <Text>Error: Calculation data is missing for PDF generation.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document title="Archibus ROI Estimate">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Archibus ROI Estimate</Text>
          <Text style={styles.subtitle}>Personalized Savings Projection</Text>
        </View>

        {/* Total Savings Highlight */}
        <View style={styles.totalSavingsSection}>
          <Text style={styles.totalSavingsLabel}>
            Total Estimated Annual Savings
          </Text>
          <Text style={styles.totalSavingsValue}>
            {formatCurrency(results.totalSavings)}
          </Text>
        </View>

        {/* Input Data Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Summary</Text>
          {(Object.keys(toggles) as Array<keyof SectionToggles>)
            .filter((sectionKey) => toggles[sectionKey])
            .map((sectionKey) => (
              <View key={sectionKey} style={styles.inputGroup}>
                <Text style={styles.inputSectionTitle}>
                  {categoryLabels[sectionKey] || sectionKey}
                </Text>
                {(sectionInputMapping[sectionKey] || [])
                  .map((inputKey) => ({
                    key: inputKey,
                    value: formData[inputKey],
                  }))
                  .filter(
                    ({ value }) =>
                      value !== undefined &&
                      value !== null &&
                      !isNaN(value as number)
                  )
                  .map(({ key: inputKey, value }) => (
                    <View key={inputKey} style={styles.inputRow}>
                      <Text style={styles.inputLabel}>
                        {inputLabels[inputKey] || inputKey}:
                      </Text>
                      <Text style={styles.inputValue}>
                        {formatNumber(value as number, inputUnits[inputKey])}
                      </Text>
                    </View>
                  ))}
              </View>
            ))}
        </View>

        {/* Savings Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Savings Breakdown</Text>
          {Object.entries(results.savingsByCategory)
            .filter(([_key, value]) => value > 0)
            .map(([key, value]) => (
              <View key={key} style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>
                  {categoryLabels[key] || key}:
                </Text>
                <Text style={styles.breakdownValue}>
                  {formatCurrency(value)}
                </Text>
              </View>
            ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text>
            Disclaimer: This calculation provides an estimate based on the data
            provided and industry averages. Actual savings may vary depending on
            specific operational details, implementation quality, and other
            factors. For a detailed assessment, please contact Arctis.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated on: {new Date().toLocaleDateString("en-GB")}
        </Text>
      </Page>
    </Document>
  );
};
