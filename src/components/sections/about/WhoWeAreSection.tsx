"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Users, Award, Sparkles } from "lucide-react";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.2, ease: "backOut" },
  },
};

export default function WhoWeAreSection() {
  return (
    <motion.section
      className="py-16 md:py-24 bg-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Text content */}
          <motion.div variants={itemVariants}>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We at ARCTIS are proud to offer{" "}
              <strong className="font-semibold text-gray-800">
                over a decade of combined expertise
              </strong>{" "}
              in facilities management consultancy, coupled to supplying and
              installing the most appropriate software for integrated workplace
              management systems (IWMS) -{" "}
              <strong className="font-semibold text-gray-800">ARCHIBUS</strong>.
              This is backed by a comprehensive range of support services
              including applications development, systems integration, training
              and support.
            </p>

            {/* Why Choose Us section */}
            <div className="mt-10 border-t pt-8">
              <motion.h3
                className="text-2xl font-bold mb-4 text-gray-900 flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Sparkles className="h-6 w-6 mr-2 text-indigo-500" /> Why Choose
                Arctis?
              </motion.h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Beyond standard FM tasks (change management, space planning,
                asset & maintenance), we offer unique
                <strong className="font-semibold text-gray-800">
                  BIM + FM synergy insights
                </strong>
                and consultancy.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our success stems from a
                <strong className="font-semibold text-gray-800">
                  proven, robust methodology
                </strong>
                , continuously enhanced through experience across Europe and
                Croatia, delivering significant results for diverse clients.
              </p>
            </div>
          </motion.div>

          {/* Key feature cards */}
          <motion.div
            className="grid grid-cols-1 gap-6"
            variants={cardVariants}
          >
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-full mr-4 ring-4 ring-blue-50">
                  <Building2 className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  FM & IWMS Experts
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Decade+ of combined expertise in facilities management
                consultancy and ARCHIBUS IWMS implementation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-full mr-4 ring-4 ring-blue-50">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Client-Focused Approach
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                We prioritize understanding client needs to deliver tailored
                solutions that drive tangible results.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-full mr-4 ring-4 ring-blue-50">
                  <Award className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Proven Methodology
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Our robust, enhanced methodology consistently achieves
                significant client outcomes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-16">
          <Button asChild size="lg">
            <Link href="/references">Our Work & References</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
