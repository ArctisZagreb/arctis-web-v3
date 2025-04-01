// src/components/sections/CallToActionSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ctaSectionData } from "@/data/pageContent"; // Uvezi podatke
import { Box, Calculator, ArrowRight } from "lucide-react"; // Uvezi ikone

// Mapa za mapiranje imena ikona u komponente
const iconMap: { [key: string]: React.ElementType } = {
  Box: Box,
  Calculator: Calculator,
};

// Framer Motion varijante
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

const CallToActionSection = () => {
  return (
    <motion.section
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white" // Plavi gradijent
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Naslov i podnaslov sekcije */}
        <div className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            {ctaSectionData.title}
          </h2>
          <p className="text-lg text-blue-100 opacity-90">
            {ctaSectionData.subtitle}
          </p>
        </div>

        {/* Grid s dva poziva na akciju */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {ctaSectionData.actions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants} // Animacija za svaki item zasebno
                initial="hidden" // Osiguraj da počnu skriveni dok sekcija ne animira
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} // Animacija kad je 40% itema vidljivo
                className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-white/20 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.03] hover:shadow-blue-400/30" // Polu-prozirna kartica s efektima
              >
                {/* Ikona */}
                {IconComponent && (
                  <div className="mb-5 p-4 rounded-full bg-white/20 text-white">
                    <IconComponent className="h-8 w-8" />
                  </div>
                )}

                {/* Naslov i Opis Akcije */}
                <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                <p className="text-blue-100 opacity-90 mb-6 text-sm flex-grow">
                  {action.description}
                </p>

                {/* Gumb */}
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-gray-100 group mt-auto"
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

export default CallToActionSection;
