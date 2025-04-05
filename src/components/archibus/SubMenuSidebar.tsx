import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { QueryResultArchibusProduct } from "@/types/sanity";
import { ChevronLeft } from "lucide-react";

type SubMenuItem = NonNullable<
  QueryResultArchibusProduct["subMenuItem"]
>[number];

interface SubMenuSidebarProps {
  productName?: string; // Main product name for header display (optional)
  subItems: SubMenuItem[];
  selectedKey: string | null;
  onSelect: (key: string) => void;
  onCloseRequest?: () => void; // Optional function for close request (for mobile modal)
  className?: string;
}

const SubMenuSidebar: React.FC<SubMenuSidebarProps> = ({
  productName,
  subItems,
  selectedKey,
  onSelect,
  onCloseRequest,
  className,
}) => {
  // Fallback if no items
  if (!subItems || subItems.length === 0) {
    return (
      <aside
        className={cn(
          "w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 flex flex-col",
          className
        )}
      >
        {/* Optional back button for mobile view */}
        {onCloseRequest && (
          <div className="mb-4 flex items-center border-b pb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCloseRequest}
              className="mr-2 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="text-base font-semibold text-gray-700 truncate">
              {productName || "Modules"}
            </h3>
          </div>
        )}
        <p className="text-sm text-muted-foreground text-center mt-4 flex-grow flex items-center justify-center">
          No modules available for this product.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "w-full md:w-64 bg-white border-r border-slate-200 p-0 flex flex-col",
        className
      )}
    >
      {/* Header with back button (only if onCloseRequest is defined) */}
      {onCloseRequest && (
        <div className="flex items-center p-3 border-b shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseRequest}
            className="-ml-1 mr-1 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h3
            className="text-base font-semibold text-gray-700 truncate"
            title={productName}
          >
            {productName || "Product Modules"}
          </h3>
        </div>
      )}
      {/* Title only if no back button */}
      {!onCloseRequest && (
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4 pt-4">
          Product Modules
        </h3>
      )}
      <ScrollArea className="flex-grow p-4 pt-0">
        <nav className="flex flex-col space-y-1">
          {subItems.map((item, index) => {
            const isSelected = item._key === selectedKey;
            return (
              <motion.div
                key={item._key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-3 py-2 text-sm font-medium rounded-md h-auto text-left cursor-pointer",
                    isSelected
                      ? "bg-slate-100 text-blue-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  onClick={() => onSelect(item._key)}
                  aria-current={isSelected ? "page" : undefined}
                >
                  {item.name || "Unnamed Module"}
                </Button>
              </motion.div>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default SubMenuSidebar;
