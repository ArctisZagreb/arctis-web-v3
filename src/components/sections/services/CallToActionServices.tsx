// src/components/sections/CallToActionServices.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Box, Calculator, ArrowRight, type LucideIcon } from "lucide-react"; // Import type LucideIcon
import { cn } from "@/lib/utils"; // Assuming you have a utils file with cn (for class merging)

// Interface for Action Data
interface ActionItem {
  iconName: "Box" | "Calculator"; // Restrict icon names to available ones
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

interface CallToActionServicesProps {
  title: string;
  subtitle: string;
  actions: ActionItem[];
  className?: string; // Optional className for section customization
  variant?: "primary" | "secondary" | "accent"; // Optional variant for color scheme
}

// Mapa za mapiranje imena ikona u komponente
const iconMap: { [key: string]: LucideIcon } = {
  Box: Box,
  Calculator: Calculator,
  // Add more icons here if you need them in your CTA sections
};

// Framer Motion varijante (Keep these or adjust as needed)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

const CallToActionServices: React.FC<CallToActionServicesProps> = ({
  title,
  subtitle,
  actions,
  className,
  variant = "primary", // Default to primary variant
}) => {
  // Determine color classes based on variant
  const backgroundClasses = () => {
    switch (variant) {
      case "primary":
        return "from-primary to-primary-foreground text-primary-foreground"; // Adjusted for theme colors
      case "secondary":
        return "from-secondary to-secondary-foreground text-secondary-foreground";
      case "accent":
        return "from-accent to-accent-foreground text-accent-foreground";
      default: // Primary as default
        return "from-primary to-primary-foreground text-primary-foreground";
    }
  };

  const buttonTextClasses = () => {
    switch (variant) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "accent":
        return "text-accent";
      default: // Primary as default
        return "text-primary";
    }
  };

  const buttonBgClasses = () => {
    return "bg-primary-foreground hover:bg-primary-foreground/90"; // Default button style, can be customized per variant if needed
  };

  return (
    <motion.section
      className={cn(
        "w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r text-white", // Base classes
        backgroundClasses(), // Apply background color based on variant
        className // Allow custom classNames to be passed
      )}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Naslov i podnaslov sekcije */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-foreground">
            {" "}
            {/* Changed to text-foreground */}
            {title}
          </h2>
          <p className="text-lg opacity-90 text-muted-foreground">
            {" "}
            {/* Changed to text-muted-foreground */}
            {subtitle}
          </p>
        </div>

        {/* Grid s dva poziva na akciju */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {actions.map((action, index) => {
            const IconComponent = iconMap[action.iconName];
            return (
              <motion.div
                key={index}
                variants={itemVariants} // Animacija za svaki item zasebno
                initial="hidden" // Osiguraj da počnu skriveni dok sekcija ne animira
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} // Animacija kad je 40% itema vidljivo
                className="bg-card/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-border flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.03] hover:shadow-primary-foreground/30" // Using theme colors: bg-card, border-border, shadow
              >
                {/* Ikona */}
                {IconComponent && (
                  <div className="mb-5 p-4 rounded-full bg-card text-primary-foreground">
                    {" "}
                    {/* Icon background and color */}
                    <IconComponent className="h-8 w-8 text-primary-foreground" />{" "}
                    {/* Icon color */}
                  </div>
                )}
                {/* Naslov i Opis Akcije */}
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {action.title}
                </h3>{" "}
                {/* text-foreground */}
                <p className="text-muted-foreground opacity-90 mb-6 text-sm flex-grow">
                  {" "}
                  {/* text-muted-foreground */}
                  {action.description}
                </p>
                {/* Gumb */}
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    buttonBgClasses(), // Apply button background based on variant
                    buttonTextClasses(), // Apply button text color based on variant
                    "group mt-auto"
                  )}
                >
                  <Link href={action.link}>
                    {action.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default CallToActionServices;
