"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { techCategories } from "@/data/aboutContent";

// Framer Motion varijante
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function TechnologySection() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-gray-100"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            We Know Tech
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We leverage a diverse range of technologies to build robust,
            scalable, and effective solutions, ensuring our clients achieve
            success and growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {techCategories.map((category) => (
            <motion.div
              key={category.title}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 flex flex-col"
              variants={cardVariants}
            >
              <div className="flex items-center mb-5">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <category.Icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-5 flex-grow">
                {category.groups.map((group) => (
                  <div key={group.name}>
                    <h4 className="font-medium text-gray-500 text-sm mb-2 uppercase tracking-wider">
                      {group.name}
                    </h4>
                    {/* Lista itema */}
                    <ul className="flex flex-wrap gap-x-4 gap-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-gray-700 text-sm flex items-center"
                        >
                          <Zap className="h-3 w-3 text-indigo-400 mr-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
