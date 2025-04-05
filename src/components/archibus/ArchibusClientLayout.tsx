"use client";

import React, { useState, useMemo, useEffect } from "react";
import type { QueryResultArchibusProduct } from "@/types/sanity";
import ProductSidebar from "./ProductSidebar";
import SubMenuSidebar from "./SubMenuSidebar";
import ProductContent from "./ProductContent";
import MobileSubMenuModal from "./MobileSubMenuModal";
import MobileContentModal from "./MobileContentModal";

interface ArchibusClientLayoutProps {
  initialProducts: QueryResultArchibusProduct[];
}

const ArchibusClientLayout: React.FC<ArchibusClientLayoutProps> = ({
  initialProducts,
}) => {
  // State management
  const [selectedProductIndex, setSelectedProductIndex] = useState<
    number | null
  >(null);
  const [selectedSubMenuKey, setSelectedSubMenuKey] = useState<string | null>(
    null
  );

  // Mobile modal states
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const [isMobileContentOpen, setIsMobileContentOpen] = useState(false);

  // Sort products by display order
  const sortedProducts = useMemo(() => {
    return [...initialProducts].sort(
      (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
    );
  }, [initialProducts]);

  // Set default submenu for desktop when product changes
  useEffect(() => {
    const isLikelyMobile =
      typeof window !== "undefined" && window.innerWidth < 768;

    if (!isLikelyMobile && selectedProductIndex !== null) {
      const currentProduct = sortedProducts[selectedProductIndex];
      if (
        currentProduct?.subMenuItem &&
        currentProduct.subMenuItem.length > 0
      ) {
        setSelectedSubMenuKey(currentProduct.subMenuItem[0]._key);
      } else {
        setSelectedSubMenuKey(null);
      }
    } else if (selectedProductIndex === null) {
      // Reset submenu if no product is selected
      setSelectedSubMenuKey(null);
    }
  }, [selectedProductIndex, sortedProducts]);

  // Handle L1 sidebar click
  const handleSelectProduct = (index: number) => {
    const isLikelyMobile =
      typeof window !== "undefined" && window.innerWidth < 768;

    setSelectedProductIndex(index);

    if (isLikelyMobile) {
      // On mobile: Close content modal if open and open submenu modal
      setIsMobileContentOpen(false);
      setIsMobileSubMenuOpen(true);
      setSelectedSubMenuKey(null); // Reset selected submenu
    }
    // On desktop, useEffect will set the default submenu
  };

  // Handle L2 item selection on desktop
  const handleSelectSubMenuDesktop = (key: string) => {
    setSelectedSubMenuKey(key);
  };

  // Handle L2 item selection on mobile (from MobileSubMenuModal)
  const handleSelectSubMenuMobile = (key: string) => {
    setSelectedSubMenuKey(key);
    setIsMobileSubMenuOpen(false);
    setIsMobileContentOpen(true);
  };

  // Handle closing all modals
  const handleCloseAllModals = () => {
    setIsMobileSubMenuOpen(false);
    setIsMobileContentOpen(false);
  };

  // Handle back navigation from content to submenu modal on mobile
  const handleBackToSubMenu = () => {
    setIsMobileContentOpen(false);
    setIsMobileSubMenuOpen(true);
  };

  // Get current data
  const selectedProduct =
    selectedProductIndex !== null ? sortedProducts[selectedProductIndex] : null;
  const selectedSubMenuItem = selectedProduct?.subMenuItem?.find(
    (item) => item._key === selectedSubMenuKey
  );

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)]">
      {/* L1 Sidebar - always visible */}
      <ProductSidebar
        products={sortedProducts}
        selectedIndex={selectedProductIndex}
        onSelect={handleSelectProduct}
      />

      {/* --- Desktop View --- */}
      {/* L2 Sidebar - visible only on desktop */}
      <SubMenuSidebar
        productName={selectedProduct?.name}
        subItems={selectedProduct?.subMenuItem ?? []}
        selectedKey={selectedSubMenuKey}
        onSelect={handleSelectSubMenuDesktop}
        className="hidden md:flex flex-col"
      />
      {/* Content - visible only on desktop */}
      <ProductContent
        productName={selectedProduct?.name}
        subMenuItem={selectedSubMenuItem}
        className="hidden md:block"
      />

      {/* --- Mobile Modals --- */}
      {/* L2 Modal (SubMenu) */}
      <MobileSubMenuModal
        isOpen={isMobileSubMenuOpen}
        onClose={handleCloseAllModals}
        product={selectedProduct}
        onSubMenuSelect={handleSelectSubMenuMobile}
      />
      {/* L3 Modal (Content) */}
      <MobileContentModal
        isOpen={isMobileContentOpen}
        onClose={handleCloseAllModals}
        onBack={handleBackToSubMenu}
        subMenuItem={selectedSubMenuItem}
      />
    </div>
  );
};

export default ArchibusClientLayout;
