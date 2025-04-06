"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/sanity.queries";
import type { QueryResultReference } from "@/types/sanity";

interface ReferenceLogoGridProps {
  references: QueryResultReference[];
  selectedReferenceId: string | null;
  onSelectReference: (id: string) => void;
}

// Animation variants for logos
const logoVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: { scale: 1.08, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

const ReferenceLogoGrid: React.FC<ReferenceLogoGridProps> = ({
  references,
  selectedReferenceId,
  onSelectReference,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
      {references.map((ref, index) => {
        const isSelected = ref._id === selectedReferenceId;
        const logoAsset = ref.logo?.asset;
        const logoAlt = ref.logo?.alt || ref.client?.name || "Client Logo";
        const logoUrl = logoAsset
          ? urlFor(logoAsset)
              ?.width(300)
              .height(160)
              .fit("max")
              .quality(85)
              .url()
          : null;

        return (
          <motion.button
            key={ref._id}
            layout
            variants={logoVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.03 }}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onSelectReference(ref._id)}
            className={cn(
              "relative w-full h-28 md:h-32 flex items-center justify-center p-4",
              "bg-white rounded-lg border transition-all duration-200 ease-in-out cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
              isSelected
                ? "border-blue-500 shadow-lg ring-2 ring-blue-500/50 opacity-100"
                : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 opacity-70 hover:opacity-100"
            )}
            title={`View details for ${ref.client?.name || "this client"}`}
            aria-pressed={isSelected}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={150}
                height={80}
                className="max-h-[60px] md:max-h-[70px] w-auto object-contain"
              />
            ) : (
              <span className="text-xs text-muted-foreground">
                {ref.client?.name || "Logo N/A"}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default ReferenceLogoGrid;
