"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { urlFor } from "@/lib/sanity/sanity.queries";
import type { QueryResultArchibusProduct } from "@/types/sanity";
import SubMenuSidebar from "./SubMenuSidebar";
import ProductContent from "./ProductContent";

interface MobileArchibusModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: QueryResultArchibusProduct | null; // Selected product
}

const MobileArchibusModal: React.FC<MobileArchibusModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [selectedSubMenuKey, setSelectedSubMenuKey] = useState<string | null>(
    null
  );

  // Reset/set selected submenu when product changes or modal opens
  useEffect(() => {
    if (isOpen && product?.subMenuItem && product.subMenuItem.length > 0) {
      setSelectedSubMenuKey(product.subMenuItem[0]._key); // Select first as default
    } else if (!isOpen) {
      // Reset when closed
      setSelectedSubMenuKey(null);
    }
  }, [isOpen, product]);

  const handleSelectSubMenu = (key: string) => {
    setSelectedSubMenuKey(key);
  };

  // Find selected submenu object to pass to ProductContent
  const selectedSubMenuItem = product?.subMenuItem?.find(
    (item) => item._key === selectedSubMenuKey
  );

  const productIconUrl = product?.icon
    ? urlFor(product.icon)?.width(40).height(40).url()
    : null;

  if (!product) return null; // Don't render if no product

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 m-0 max-w-full w-full h-full max-h-full sm:max-w-full sm:h-full flex flex-col gap-0 overflow-hidden">
        {/* Modal Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b bg-slate-50 shrink-0">
          <div className="flex items-center space-x-3">
            {productIconUrl && (
              <Image
                src={productIconUrl}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
            )}
            <DialogTitle className="text-lg font-semibold">
              {product.name || "Product Details"}
            </DialogTitle>
          </div>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="cursor-pointer"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        {/* Modal Body - Contains L2 Sidebar and Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar for navigation */}
          <SubMenuSidebar
            subItems={product.subMenuItem ?? []}
            selectedKey={selectedSubMenuKey}
            onSelect={handleSelectSubMenu}
            className="w-2/5 md:w-1/3 lg:w-1/4 h-full border-r"
          />

          {/* Content area */}
          <ProductContent
            subMenuItem={selectedSubMenuItem}
            className="w-3/5 md:w-2/3 lg:w-3/4 h-full overflow-y-auto"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileArchibusModal;
