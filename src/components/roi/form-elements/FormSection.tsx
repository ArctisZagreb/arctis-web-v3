import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { SectionToggle } from "./SectionToggle";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  sectionKey: string;
  title: string;
  toggleDescription?: string;
  isIncluded: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  sectionKey,
  title,
  toggleDescription,
  isIncluded,
  onToggle,
  children,
  className,
}: FormSectionProps) {
  const contentVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, overflow: "hidden" },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "1rem", // Adjust spacing as needed (e.g., mt-4)
      overflow: "visible",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className={cn("mb-6", className)}>
      {" "}
      {/* Add margin-bottom for spacing between sections */}
      <SectionToggle
        sectionKey={sectionKey}
        title={title}
        description={toggleDescription}
        isIncluded={isIncluded}
        onToggle={onToggle}
      />
      <motion.div
        initial={false}
        animate={isIncluded ? "visible" : "hidden"}
        variants={contentVariants}
        style={{ overflow: "hidden" }} // Keep overflow hidden during animation
      >
        {/* Add padding/spacing for the content area */}
        <div className="pt-4 space-y-4 border-l border-r border-b rounded-b-md p-4 bg-white">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
