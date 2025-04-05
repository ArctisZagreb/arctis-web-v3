import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/sanity.queries";
import type { QueryResultArchibusProduct } from "@/types/sanity";

interface ProductSidebarProps {
  products: QueryResultArchibusProduct[];
  selectedIndex: number | null; // Can be null if nothing is selected (e.g. initially on mobile)
  onSelect: (index: number) => void; // Function called on click
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  products,
  selectedIndex,
  onSelect,
}) => {
  return (
    <aside
      className={cn(
        "bg-gradient-to-b from-slate-700 to-slate-800",
        "border-r border-slate-600",
        "p-2 flex flex-row md:flex-col shrink-0", // Horizontal on mobile, vertical on desktop
        "w-full md:w-28 lg:w-32", // Fixed width on desktop
        "overflow-x-auto md:overflow-x-hidden md:overflow-y-auto",
        "scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700"
      )}
    >
      <nav className="flex flex-row md:flex-col items-center md:items-stretch gap-1 md:gap-1.5">
        {products.map((product, index) => {
          const isSelected = index === selectedIndex;
          const iconUrl = product.icon
            ? urlFor(product.icon)?.width(40).height(40).quality(80).url()
            : null;

          return (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="shrink-0 md:w-full"
            >
              <Button
                variant="empty"
                className={cn(
                  "w-20 h-20 md:w-full md:min-h-[5.5rem] px-1 py-2",
                  "flex flex-col items-center justify-center rounded-lg text-xs space-y-1",
                  "transition-all duration-200 ease-in-out cursor-pointer",
                  isSelected
                    ? "bg-blue-600/80 text-white shadow-md ring-2 ring-blue-500/60 scale-105 hover:bg-blue-600/60"
                    : "text-slate-300 hover:bg-slate-600/90 hover:text-white active:bg-slate-700/90"
                )}
                onClick={() => onSelect(index)}
                aria-current={isSelected ? "page" : undefined}
                title={product.name || "Unnamed Product"}
              >
                {/* Icon container */}
                <div className="h-7 w-7 flex items-center justify-center mb-0.5">
                  {iconUrl ? (
                    <Image
                      src={iconUrl}
                      alt=""
                      width={28}
                      height={28}
                      className="filter brightness-0 invert"
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="h-7 w-7 bg-slate-700 rounded flex items-center justify-center text-slate-400 text-xs font-bold">
                      ?
                    </div>
                  )}
                </div>
                {/* Text container */}
                <span
                  className={cn(
                    "text-center text-[11px] leading-tight line-clamp-2 overflow-hidden max-w-full px-0.5",
                    isSelected ? "font-medium" : ""
                  )}
                >
                  {product.name || "Unnamed"}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </nav>
    </aside>
  );
};

export default ProductSidebar;
