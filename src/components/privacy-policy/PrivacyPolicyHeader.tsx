// src/components/privacy-policy/PrivacyPolicyHeader.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeaderBackground } from "@/components/ui/header-background"; // Opcionalno

interface PrivacyPolicyHeaderProps {
  title?: string;
  subtitle?: string;
}

const PrivacyPolicyHeader: React.FC<PrivacyPolicyHeaderProps> = ({
  title = "Privacy Policy",
  subtitle = "Understanding how we collect, use, and protect your information.",
}) => {
  return (
    <section className="relative py-20 md:py-28 text-center bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden border-b">
      <HeaderBackground />
      <div className="absolute top-10 -left-20 w-72 h-72 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-1000"></div>
      <div className="absolute bottom-5 -right-10 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-3000"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 mb-4" // Malo tamniji naslov
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

export default PrivacyPolicyHeader;
