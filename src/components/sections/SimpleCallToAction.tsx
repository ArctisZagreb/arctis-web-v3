// src/components/sections/SimpleCallToAction.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming this path is correct for your Button component
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Optional: if you use cn for merging classes

interface SimpleCallToActionProps {
  title?: string; // Optional title override
  subtitle?: string; // Optional subtitle override
  buttonText?: string; // Optional button text override
  className?: string; // Allow adding custom classes
}

const SimpleCallToAction: React.FC<SimpleCallToActionProps> = ({
  title = "Ready to Streamline Your Projects?", // Default title
  subtitle = "Let's discuss how our project management expertise can help you achieve your goals. Get in touch with our team today.", // Default subtitle
  buttonText = "Contact Us", // Default button text
  className,
}) => {
  return (
    <section
      className={cn(
        "w-full py-16 md:py-24 lg:py-32",
        // --- The specific blue gradient ---
        "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800",
        // --- Text color for contrast on the blue gradient ---
        "text-white",
        className // Allows for additional classes like margins (e.g., "mt-16")
      )}
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-blue-100 opacity-90 max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>

        {/* Button linking to /contact */}
        <Button
          asChild
          size="lg"
          // --- Button styling to stand out on the blue gradient ---
          className="bg-white text-blue-700 hover:bg-blue-50 group shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Link href="/contact">
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default SimpleCallToAction;
