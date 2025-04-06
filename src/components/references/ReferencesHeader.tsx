"use client";

import React from "react";
import { HeaderBackground } from "@/components/ui/header-background";
import { motion } from "framer-motion";

interface ReferencesHeaderProps {
  title?: string;
  subtitle?: string;
}

const ReferencesHeader: React.FC<ReferencesHeaderProps> = ({
  title = "Our Work & References",
  subtitle = "Explore successful projects and valued clients Arctis has collaborated with, showcasing our expertise in IWMS and ARCHIBUS.",
}) => {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 text-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 overflow-hidden">
      {/* Background effects */}
      <HeaderBackground />

      {/* Additional background elements */}
      <div className="absolute inset-0 opacity-30"></div>
      <div className="absolute top-10 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-1000"></div>
      <div className="absolute bottom-5 -right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-3000"></div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default ReferencesHeader;
