"use client";
// src/components/roi/RoiExportButtons.tsx
// Preuzimanje PDF izvještaja i Excel datoteke. Obje biblioteke učitavaju se
// tek na klik, da ne opterećuju početno učitavanje stranice.

import React, { useState } from "react";
import { FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RoiExportData } from "@/lib/roi/exportExcel";
import { todayIso } from "@/lib/roi/format";
import { cn } from "@/lib/utils";

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

interface RoiExportButtonsProps {
  data: RoiExportData;
  tone?: "light" | "dark";
  className?: string;
}

export default function RoiExportButtons({
  data,
  tone = "light",
  className,
}: RoiExportButtonsProps) {
  const [busy, setBusy] = useState<"pdf" | "excel" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (kind: "pdf" | "excel") => {
    setBusy(kind);
    setError(null);
    try {
      if (kind === "pdf") {
        const [{ pdf }, { RoiPdfDocument }] = await Promise.all([
          import("@react-pdf/renderer"),
          import("./RoiPdfDocument"),
        ]);
        const blob = await pdf(<RoiPdfDocument {...data} />).toBlob();
        downloadBlob(blob, `Arctis_ARCHIBUS_ROI_estimate_${todayIso()}.pdf`);
      } else {
        const { exportRoiExcel } = await import("@/lib/roi/exportExcel");
        await exportRoiExcel(data);
      }
    } catch (e) {
      console.error("ROI export failed:", e);
      setError("The file could not be generated. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const dark = tone === "dark";

  return (
    <div className={className}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          type="button"
          size="lg"
          onClick={() => run("pdf")}
          disabled={busy !== null}
          className={cn(
            "h-11 cursor-pointer px-5",
            dark && "bg-white text-slate-900 hover:bg-blue-50",
          )}
        >
          {busy === "pdf" ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <FileText className="mr-1 h-4 w-4" />
          )}
          Download PDF report
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          onClick={() => run("excel")}
          disabled={busy !== null}
          className={cn(
            "h-11 cursor-pointer px-5",
            dark &&
              "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white",
          )}
        >
          {busy === "excel" ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="mr-1 h-4 w-4" />
          )}
          Download Excel model
        </Button>
      </div>
      {error && (
        <p role="alert" className={cn("mt-2 text-sm", dark ? "text-rose-300" : "text-rose-600")}>
          {error}
        </p>
      )}
    </div>
  );
}
