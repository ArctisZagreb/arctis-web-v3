"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import SubMenuSidebar from "./SubMenuSidebar";
import type { QueryResultArchibusProduct } from "@/types/sanity";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MobileSubMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: QueryResultArchibusProduct | null; // The complete product for subItems and name
  onSubMenuSelect: (key: string) => void; // Function called when L2 item is selected
}

const MobileSubMenuModal: React.FC<MobileSubMenuModalProps> = ({
  isOpen,
  onClose,
  product,
  onSubMenuSelect,
}) => {
  if (!product) return null; // Don't render if there's no product

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 m-0 max-w-full w-full h-full max-h-full sm:max-w-full sm:h-full flex flex-col gap-0 overflow-hidden">
        {/* Add DialogTitle for accessibility, but hide it visually */}
        <VisuallyHidden>
          <DialogTitle>
            {product.name ? `${product.name} Modules` : "Product Modules"}
          </DialogTitle>
        </VisuallyHidden>

        {/* Pass data and functions to SubMenuSidebar */}
        <SubMenuSidebar
          productName={product.name}
          subItems={product.subMenuItem ?? []}
          selectedKey={null} // Nothing is selected initially in this modal
          onSelect={onSubMenuSelect} // Call this function when an item is clicked
          onCloseRequest={onClose} // Enable Back/Close button
          className="h-full" // Ensure it takes up full height
        />
      </DialogContent>
    </Dialog>
  );
};

export default MobileSubMenuModal;
