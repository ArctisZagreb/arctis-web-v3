// src/components/sections/SolutionsTrust.tsx
"use client"; // Za Framer Motion

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Podaci o logotipima - zamijeni s pravim putanjama i imenima
const trustedLogos = [
  {
    name: "Company A",
    path: "/assets/logo/companies/cat.png",
    width: 120,
    height: 50,
  },
  {
    name: "Company B",
    path: "/assets/logo/companies/tht-logo.png",
    width: 150,
    height: 40,
  },
  {
    name: "Company C",
    path: "/assets/logo/companies/vodafone.png",
    width: 100,
    height: 60,
  },
  {
    name: "Company D",
    path: "/assets/logo/companies/noaa.png",
    width: 130,
    height: 55,
  },
  // Dodaj još logotipa po potrebi (idealno 4-6 za čist izgled)
];

// Framer Motion varijante
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1, // Manja odgoda za logotipe
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SolutionsTrust = () => {
  // Ako nema logotipa, možemo preskočiti renderiranje sekcije
  if (trustedLogos.length === 0) {
    return null;
  }

  return (
    <motion.section
      className="w-full py-12 md:py-16 lg:py-20 bg-gray-100" // Malo drugačija pozadina
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Animacija kad je 30% vidljivo
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-base font-semibold text-blue-700 uppercase tracking-wider mb-2">
            Trusted Worldwide
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Some of the most recognised companies globally rely on ARCHIBUS for
            their enterprise software needs.
          </p>
        </div>

        {/* Grid za logotipe */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-16">
          {trustedLogos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={logoVariants}
              className="flex items-center justify-center"
            >
              <Image
                src={logo.path}
                alt={`${logo.name} logo - uses ARCHIBUS`}
                width={logo.width} // Koristi definirane dimenzije
                height={logo.height}
                className="max-h-10 md:max-h-12 object-contain grayscale opacity-75 transition duration-300 hover:opacity-100 hover:grayscale-0" // Efekt na hover
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SolutionsTrust;
