"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ProductContent from "./ProductContent";
import type { QueryResultArchibusProduct } from "@/types/sanity";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type SubMenuItem = NonNullable<
  QueryResultArchibusProduct["subMenuItem"]
>[number];

interface MobileContentModalProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the entire process
  onBack: () => void; // Function to return to the L2 modal
  subMenuItem: SubMenuItem | undefined | null; // Selected sub-item
}

const MobileContentModal: React.FC<MobileContentModalProps> = ({
  isOpen,
  onClose,
  onBack,
  subMenuItem,
}) => {
  // Don't render if not open or no sub-item
  if (!isOpen || !subMenuItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 m-0 max-w-full w-full h-full max-h-full sm:max-w-full sm:h-full flex flex-col gap-0 overflow-hidden">
        {/* Add DialogTitle for accessibility, but hide it visually */}
        <VisuallyHidden>
          <DialogTitle>{subMenuItem.name || "Module Details"}</DialogTitle>
        </VisuallyHidden>

        {/* Pass data and functions to ProductContent */}
        <ProductContent
          subMenuItem={subMenuItem}
          onCloseRequest={onClose} // 'X' button to close everything
          onBackRequest={onBack} // '<' button to return to L2 modal
          className="h-full" // Ensure full height
        />
      </DialogContent>
    </Dialog>
  );
};

export default MobileContentModal;
