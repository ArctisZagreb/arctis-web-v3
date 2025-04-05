"use client";
import React from "react";
import { CalculationResult } from "@/lib/roi/calculationConstants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { AlertCircle, TrendingUp } from "lucide-react";

interface ResultsDisplayProps {
  results: CalculationResult;
}

// Helper to format numbers as currency (Euro)
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("de-DE", {
    // Using 'de-DE' for Euro formatting, adjust if needed
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0, // Show whole numbers for savings
    maximumFractionDigits: 0,
  }).format(value);
};

// Define colors for the chart categories
const COLORS = {
  space: "#3b82f6", // blue-500
  maintenance: "#10b981", // emerald-500
  admin: "#f59e0b", // amber-500
  optional: "#8b5cf6", // violet-500
};

const categoryLabels: { [key: string]: string } = {
  space: "Space Optimization",
  maintenance: "Maintenance Efficiency",
  admin: "Admin Productivity",
  optional: "Energy/Asset Savings",
};

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { totalSavings, savingsByCategory } = results;

  // Prepare data for the chart, filtering out categories with zero savings
  const chartData = Object.entries(savingsByCategory)
    .map(([key, value]) => ({
      name: categoryLabels[key] || key, // Use nicer labels
      value: value,
      fill: COLORS[key as keyof typeof COLORS] || "#cccccc", // Assign color or default gray
    }))
    .filter((item) => item.value > 0); // Only include categories with savings > 0

  const hasSavings = totalSavings > 0;
  const hasChartData = chartData.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-12"
      id="results-display" // ID for potential scrolling
    >
      <Card className="shadow-lg border border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden ">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <CardTitle className="text-2xl md:text-3xl font-bold text-green-800">
              Estimated Annual Savings
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Total Savings Display */}
          <motion.div
            className="text-center my-6 p-6 bg-white rounded-lg shadow border border-green-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              Total Estimated Savings
            </p>
            <p className="text-4xl md:text-5xl font-bold text-green-700">
              {formatCurrency(totalSavings)}
              <span className="text-lg font-medium text-gray-600"> / year</span>
            </p>
          </motion.div>

          {/* Savings Breakdown & Chart */}
          {hasSavings && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mt-8">
              {/* Breakdown List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg text-gray-700 mb-3">
                  Savings Breakdown:
                </h4>
                {Object.entries(savingsByCategory).map(([key, value]) => {
                  if (value > 0) {
                    // Only display categories with savings
                    return (
                      <motion.div
                        key={key}
                        className="flex justify-between items-center text-sm p-2 bg-white/70 rounded"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay:
                            0.3 +
                            Object.keys(savingsByCategory).indexOf(key) * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <span className="text-gray-600 font-medium flex items-center">
                          <span
                            className="inline-block h-2 w-2 rounded-full mr-2"
                            style={{
                              backgroundColor:
                                COLORS[key as keyof typeof COLORS] || "#cccccc",
                            }}
                          />
                          {categoryLabels[key] || key}:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {formatCurrency(value)}
                        </span>
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Chart */}
              {hasChartData && (
                <motion.div
                  className="h-60 sm:h-64 md:h-72" // Example: Adjust height for different breakpoints
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        // label={renderCustomizedLabel} // Optional: for labels on slices
                        outerRadius="80%"
                        fill="#8884d8" // Default fill, overridden by Cell
                        dataKey="value"
                        stroke="#fff" // White border between slices
                        strokeWidth={1}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)} // Format tooltip value
                      />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </div>
          )}

          {/* Disclaimer */}
          <motion.div
            className="mt-8 pt-4 border-t border-green-200 text-xs text-gray-500 flex items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>
              <strong>Disclaimer:</strong> This calculation provides an
              *estimate* based on the data you provided and industry averages.
              Actual savings may vary depending on specific operational details,
              implementation quality, and other factors. For a detailed
              assessment, please contact us.
            </span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Optional: Custom label rendering function for Pie chart slices (if needed)
/*
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null; // Don't render labels for very small slices

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
*/
