import React, { useEffect } from "react";

import PortableTextRenderer from "@/components/common/PortableTextRenderer";

import type { QueryResultArchibusProduct } from "@/types/sanity";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft } from "lucide-react";

type SubMenuItem = NonNullable<
  QueryResultArchibusProduct["subMenuItem"]
>[number];

interface ProductContentProps {
  productName?: string;
  headerImage?: QueryResultArchibusProduct["headerImg"];
  subMenuItem?: SubMenuItem;
  onCloseRequest?: () => void;
  onBackRequest?: () => void;
  className?: string;
}

// Animation variants for smooth transitions
const contentVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const ProductContent: React.FC<ProductContentProps> = ({
  productName,
  subMenuItem,
  onCloseRequest,
  onBackRequest,
  className,
}) => {
  // Force immediate render when subMenuItem changes
  useEffect(() => {
    if (subMenuItem) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const content = document.getElementById(
            `content-${subMenuItem._key}`
          );
          if (content) {
            content.style.opacity = "1";
          }
        });
      });
    }
  }, [subMenuItem]);

  return (
    <main
      className={cn(
        "flex-1 bg-white overflow-y-auto relative flex flex-col",
        className
      )}
    >
      {/* Mobile Modal Header */}
      {(onCloseRequest || onBackRequest) && (
        <div className="sticky top-0 z-10 flex items-center justify-between p-3 border-b bg-white/80 backdrop-blur-sm shrink-0">
          <div className="flex items-center">
            {onBackRequest && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackRequest}
                className="-ml-1 mr-1 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <h2
              className="text-base font-semibold text-gray-700 truncate"
              title={subMenuItem?.name}
            >
              {subMenuItem?.name || "Details"}
            </h2>
          </div>
          {onCloseRequest && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onCloseRequest}
              className="cursor-pointer"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}

      {/* Content with animations */}
      <AnimatePresence mode="wait" initial={false}>
        {subMenuItem ? (
          <motion.article
            id={`content-${subMenuItem._key}`}
            key={subMenuItem._key}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="p-6 md:p-8 lg:p-10 flex-grow will-change-opacity"
          >
            {subMenuItem.body &&
            Array.isArray(subMenuItem.body) &&
            subMenuItem.body.length > 0 ? (
              <div className="content-wrapper">
                <PortableTextRenderer value={subMenuItem.body} />
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                No detailed content available for this module.
              </p>
            )}
          </motion.article>
        ) : (
          // Fallback content
          <motion.div
            key="fallback"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-center h-full text-muted-foreground p-6 md:p-8 lg:p-10 flex-grow"
          >
            <p>{productName ? "Select a module." : "Select a product."}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProductContent;
