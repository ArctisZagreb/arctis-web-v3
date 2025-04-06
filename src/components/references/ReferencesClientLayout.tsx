"use client";

import React, { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import type { QueryResultReference } from "@/types/sanity";
import ReferenceLogoGrid from "./ReferenceLogoGrid";
import ReferenceDetails from "./ReferenceDetails";
import MobileReferenceModal from "./MobileReferenceModal";

interface ReferencesClientLayoutProps {
  initialReferences: QueryResultReference[];
}

const ReferencesClientLayout: React.FC<ReferencesClientLayoutProps> = ({
  initialReferences,
}) => {
  const [selectedReferenceId, setSelectedReferenceId] = useState<string | null>(
    null
  );
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Handle reference selection
  const handleSelectReference = (id: string) => {
    const isLikelyMobile =
      typeof window !== "undefined" && window.innerWidth < 768; // md breakpoint
    const newSelectedId = selectedReferenceId === id ? null : id;

    setSelectedReferenceId(newSelectedId);

    if (isLikelyMobile) {
      // On mobile and new ID is selected, open modal
      if (newSelectedId !== null) {
        setIsMobileModalOpen(true);
      } else {
        // If deselected, ensure modal is closed
        setIsMobileModalOpen(false);
      }
    } else {
      // On desktop, ensure modal is always closed
      setIsMobileModalOpen(false);
    }
  };

  // Close mobile modal
  const handleCloseMobileModal = () => {
    setIsMobileModalOpen(false);
  };

  // Get selected reference
  const selectedReference = useMemo(() => {
    if (!selectedReferenceId) return null;
    return initialReferences.find((ref) => ref._id === selectedReferenceId);
  }, [selectedReferenceId, initialReferences]);

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Logo Grid (always visible) */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 md:mb-8 text-center md:text-left">
          Our Clients & Partners
        </h2>
        <ReferenceLogoGrid
          references={initialReferences}
          selectedReferenceId={selectedReferenceId}
          onSelectReference={handleSelectReference}
        />
      </div>

      {/* Desktop Details View */}
      <div className="min-h-[200px] hidden md:block">
        <AnimatePresence mode="wait">
          {selectedReference && !isMobileModalOpen && (
            <ReferenceDetails
              key={selectedReference._id}
              reference={selectedReference}
            />
          )}
        </AnimatePresence>
        {!selectedReferenceId && (
          <div className="text-center text-muted-foreground pt-8 italic">
            {initialReferences.length > 0
              ? "Select a logo above to view project details."
              : ""}
          </div>
        )}
      </div>

      {/* Mobile Modal */}
      <MobileReferenceModal
        isOpen={isMobileModalOpen}
        onClose={handleCloseMobileModal}
        reference={selectedReference}
      />
    </div>
  );
};

export default ReferencesClientLayout;
