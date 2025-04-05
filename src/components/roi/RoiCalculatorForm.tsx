"use client";

import React, { useState, useEffect } from "react";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { RoiCalculatorFormData } from "@/lib/zod/roiSchema";
import {
  sampleHotelChainData,
  sampleHotelChainDescription,
  sampleHotelChainToggles,
} from "@/lib/roi/exampleData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SpaceSection } from "./sections/SpaceSection";
import { MaintenanceSection } from "./sections/MaintenanceSection";
import { AdminSection } from "./sections/AdminSection";
import { OptionalSection } from "./sections/OptionalSection";
import { Info, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Toggle state interface
interface SectionToggles {
  space: boolean;
  maintenance: boolean;
  admin: boolean;
  optional: boolean;
}

interface RoiCalculatorFormProps {
  methods: UseFormReturn<RoiCalculatorFormData>;
  onSubmit: SubmitHandler<RoiCalculatorFormData>;
  sectionToggles: SectionToggles;
  onToggleChange: (section: keyof SectionToggles) => void;
  isSubmitting: boolean;
}

export default function RoiCalculatorForm({
  methods,
  onSubmit,
  sectionToggles,
  onToggleChange,
  isSubmitting,
}: RoiCalculatorFormProps) {
  // State for example description
  const [exampleDescription, setExampleDescription] = useState<string | null>(
    null
  );

  // Populate form with example data
  const populateExampleData = () => {
    // Reset form with sample data
    methods.reset(sampleHotelChainData);

    // Update toggle states as needed
    Object.keys(sampleHotelChainToggles).forEach((keyStr) => {
      const key = keyStr as keyof SectionToggles;
      if (sectionToggles[key] !== sampleHotelChainToggles[key]) {
        onToggleChange(key);
      }
    });

    // Show description
    setExampleDescription(sampleHotelChainDescription);
  };

  // Clear example description when user edits form
  useEffect(() => {
    const subscription = methods.watch((_value, { type }) => {
      if (exampleDescription && type === "change") {
        setExampleDescription(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [methods, exampleDescription, setExampleDescription]);

  return (
    <FormProvider {...methods}>
      {/* Form header section */}
      <Card className="shadow-none border-none mb-6 bg-transparent">
        <CardHeader className="p-0">
          <div className="flex flex-wrap justify-between items-start gap-4">
            {/* Title and Tooltip */}
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">Your Inputs</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <Info className="h-4 w-4 text-muted-foreground hover:text-blue-600 transition-colors" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-sm">
                    Curious about the methodology?{" "}
                    <Link
                      href="/roi-info"
                      className="text-blue-600 hover:text-blue-800 underline font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn how it&apos;s calculated
                    </Link>
                    .
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Example Button remains separate */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={populateExampleData}
              className="flex-shrink-0 mt-1"
            >
              <Zap className="mr-2 h-4 w-4" /> Fill Example Data
            </Button>
          </div>
          {/* Description - Simplified */}
          <CardDescription className="mt-2 text-muted-foreground">
            {" "}
            {/* Added mt-2 */}
            Fill in the sections below, or use the example button to see a
            demonstration.
          </CardDescription>

          {/* Example Description Area */}
          {exampleDescription && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-start">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-blue-600" />
              <span>{exampleDescription}</span>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Main form */}
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-0">
        {/* Form sections */}
        <SpaceSection
          isIncluded={sectionToggles.space}
          onToggle={() => onToggleChange("space")}
        />
        <MaintenanceSection
          isIncluded={sectionToggles.maintenance}
          onToggle={() => onToggleChange("maintenance")}
        />
        <AdminSection
          isIncluded={sectionToggles.admin}
          onToggle={() => onToggleChange("admin")}
        />
        <OptionalSection
          isIncluded={sectionToggles.optional}
          onToggle={() => onToggleChange("optional")}
        />

        {/* Submit button */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex justify-end mt-8"
        >
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? "Calculating..." : "Calculate ROI"}
          </Button>
        </motion.div>
      </form>
    </FormProvider>
  );
}
