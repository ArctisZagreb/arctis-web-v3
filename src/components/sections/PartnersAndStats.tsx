"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  partnersAndStatsContent,
  type StatItem,
  type PartnerItem,
} from "@/data/partnersAndStatsData";


function useCountUp(target: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {

    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

    
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return count;
}


interface StatCardProps {
  stat: StatItem;
  isInView: boolean;
  index: number;
}

function StatCard({ stat, isInView, index }: StatCardProps) {
  const count = useCountUp(stat.value, isInView, 2000);
  const IconComponent = stat.icon;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
        },
      }}
      className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl 
                 bg-white/70 backdrop-blur-sm border border-gray-100 
                 shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
    >
    
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 to-indigo-50/0 
                      group-hover:from-blue-50/80 group-hover:to-indigo-50/60 transition-all duration-500"
      />

   
      <div
        className="relative z-10 mb-4 p-3 rounded-xl bg-blue-50 text-blue-600 
                      group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-300"
      >
        <IconComponent className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.8} />
      </div>

    
      <div className="relative z-10 flex items-baseline gap-0.5">
        <span className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 tabular-nums">
          {count}
        </span>
        {stat.suffix && (
          <span className="text-2xl md:text-3xl font-semibold text-blue-600">
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="relative z-10 mt-2 text-sm md:text-base font-medium text-gray-500">
        {stat.label}
      </p>
    </motion.div>
  );
}


interface PartnerLogoProps {
  partner: PartnerItem;
  index: number;
}

function PartnerLogo({ partner, index }: PartnerLogoProps) {
  const logoContent = (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: index * 0.1 },
        },
      }}
      className="flex items-center justify-center px-6 py-4 rounded-xl 
                 bg-white border border-gray-100 shadow-sm
                 hover:shadow-md hover:border-gray-200 transition-all duration-300 group"
    >
      <Image
        src={partner.logoPath}
        alt={`${partner.name} — strategic partner`}
        width={140}
        height={56}
        className="max-h-10 md:max-h-12 w-auto object-contain 
                   grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 
                   transition-all duration-400"
      />
    </motion.div>
  );

  
  if (partner.url) {
    return (
      <Link
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${partner.name} website`}
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

const PartnersAndStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50" />
        <div className="absolute inset-0 opacity-[0.07] bg-grid-pattern" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            {partnersAndStatsContent.title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg lg:text-xl max-w-2xl mx-auto">
            {partnersAndStatsContent.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8 mb-16 lg:mb-20"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {partnersAndStatsContent.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              isInView={isInView}
              index={index}
            />
          ))}
        </motion.div>

        
        {partnersAndStatsContent.partners.length > 0 && (
          <motion.div
            className="text-center"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-gray-200" />
              <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                {partnersAndStatsContent.partnersTitle}
              </h3>
              <div className="h-px w-12 bg-gray-200" />
            </div>

            <motion.div
              className="flex flex-wrap justify-center items-center gap-4 md:gap-6"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {partnersAndStatsContent.partners.map((partner, index) => (
                <PartnerLogo
                  key={partner.name}
                  partner={partner}
                  index={index}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default PartnersAndStats;
