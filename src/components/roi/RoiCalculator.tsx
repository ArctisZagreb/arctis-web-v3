"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  roiCalculatorSchema,
  RoiCalculatorFormData,
} from "@/lib/zod/roiSchema";
import { calculateROI } from "@/lib/roi/calculateRoi";
import { CalculationResult } from "@/lib/roi/calculationConstants";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RoiCalculatorForm from "./RoiCalculatorForm";
import { ResultsDisplay } from "./ResultsDisplay";
import { TrendingUp, Loader2, Download } from "lucide-react";
import { Button } from "../ui/button";
import { RoiPdfDocument } from "./RoiPdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Section toggle state definition
export interface SectionToggles {
  space: boolean;
  maintenance: boolean;
  admin: boolean;
  optional: boolean;
}

export default function RoiCalculator() {
  // State management
  const [sectionToggles, setSectionToggles] = useState<SectionToggles>({
    space: true,
    maintenance: true,
    admin: true,
    optional: false,
  });
  const [results, setResults] = useState<CalculationResult | null>(null);

  // Form configuration
  const methods = useForm<RoiCalculatorFormData>({
    resolver: zodResolver(roiCalculatorSchema),
    defaultValues: {
      space_totalArea: undefined,
      space_costPerSqM: undefined,
      space_unusedPercent: undefined,
      maint_employees: undefined,
      maint_avgSalary: undefined,
      maint_reactivePercent: undefined,
      maint_externalCost: undefined,
      admin_employees: undefined,
      admin_avgSalary: undefined,
      admin_manualWorkPercent: undefined,
      energy_annualCost: undefined,
      asset_totalValue: undefined,
    },
    mode: "onBlur",
  });

  // Form submission handler
  const onSubmit: SubmitHandler<RoiCalculatorFormData> = (data) => {
    const calculatedResults = calculateROI(data, sectionToggles);
    setResults(calculatedResults);

    // Scroll to results
    setTimeout(() => {
      document
        .getElementById("results-card-content")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Toggle section handler
  const handleToggleChange = (section: keyof SectionToggles) => {
    setSectionToggles((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    setResults(null); // Clear results when toggles change
  };

  const isSubmitting = methods.formState.isSubmitting;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      {/* Form Column */}
      <div className="lg:col-span-3">
        <Card className="shadow-lg border border-gray-200/80">
          <CardContent className="p-4 md:p-6">
            <RoiCalculatorForm
              methods={methods}
              onSubmit={onSubmit}
              sectionToggles={sectionToggles}
              onToggleChange={handleToggleChange}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg border border-gray-200/80 min-h-[400px] flex flex-col sticky top-24 bg-gradient-to-br from-gray-50 to-slate-50">
          <CardHeader className="border-b bg-white/50 ">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl text-gray-800">
                Estimated Savings
              </CardTitle>
            </div>
            <CardDescription className="mt-1">
              Your projected ROI will appear here after calculation.
            </CardDescription>
          </CardHeader>
          <CardContent
            id="results-card-content"
            className="flex-grow flex flex-col p-0 overflow-hidden"
          >
            {isSubmitting ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-muted-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
                <p className="text-lg font-medium">Calculating Savings...</p>
              </div>
            ) : results ? (
              <div className="p-2 md:py-4 md:mt-[-60px]">
                <ResultsDisplay results={results} />
                <div className="mt-6 text-center">
                  <PDFDownloadLink
                    document={<RoiPdfDocument results={results} />}
                    fileName={`Arctis_ROI_Estimate_${new Date().toISOString().split("T")[0]}.pdf`}
                    className="inline-block cursor-pointer"
                  >
                    {({ loading }) =>
                      loading ? (
                        <Button variant="outline" size="lg" disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating PDF...
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="lg"
                          className="cursor-pointer"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Summary (PDF)
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center text-muted-foreground">
                <div className="p-4 bg-blue-100/50 rounded-full mb-4">
                  <TrendingUp className="h-10 w-10 text-blue-500" />
                </div>
                <p className="font-medium text-gray-700">
                  Ready to see your potential savings?
                </p>
                <p className="text-sm mt-1">
                  Fill in the form on the left and click &quot;Calculate
                  ROI&quot;.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
