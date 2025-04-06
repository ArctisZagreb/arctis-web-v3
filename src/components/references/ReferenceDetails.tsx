// src/components/references/ReferenceDetails.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { QueryResultReference } from "@/types/sanity";
import {
  Briefcase,
  ListChecks,
  Check,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import { urlFor } from "@/lib/sanity/sanity.client";

interface ReferenceDetailsProps {
  reference: QueryResultReference | null | undefined;
}

const detailVariants = {
  hidden: { opacity: 0, y: 20, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const ReferenceDetails: React.FC<ReferenceDetailsProps> = ({ reference }) => {
  if (!reference) {
    return null;
  }

  const { client, typeOfWork, servicesProvided, imageGallery } = reference;
  const hasImages = imageGallery && imageGallery.length > 0;

  return (
    <motion.div
      key={reference._id}
      variants={detailVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 p-6 md:p-8 rounded-xl border border-indigo-100 shadow-md overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Information Section */}
        <div className="space-y-6">
          {/* Client Information */}
          <div>
            {client?.name && (
              <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
                {client.name}
                {client.url && (
                  <Link
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
                    title={`Visit ${client.name} website`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </h3>
            )}
            {typeOfWork && (
              <p className="text-sm font-semibold text-indigo-600 flex items-center">
                <Briefcase className="h-4 w-4 mr-1.5" /> Type of Work:{" "}
                {typeOfWork}
              </p>
            )}
          </div>

          {/* Services */}
          {servicesProvided && servicesProvided.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center border-b pb-1">
                <ListChecks className="h-5 w-5 mr-2 text-gray-500" /> Services
                Provided
              </h4>
              <ul className="space-y-3">
                {servicesProvided.map((service) => {
                  if (!service) return null;
                  return (
                    <li key={service._key}>
                      {/* Main service */}
                      <p className="font-medium text-gray-800">
                        {service.serviceName || "Unnamed Service"}
                      </p>

                      {/* Subservices */}
                      {service.subservices &&
                        service.subservices.length > 0 && (
                          <ul className="mt-1.5 pl-5 space-y-1">
                            {service.subservices.map(
                              (subserviceName, index) => {
                                if (typeof subserviceName !== "string") {
                                  return null;
                                }
                                return (
                                  <li
                                    key={`${service._key}-sub-${index}`}
                                    className="flex items-center text-sm text-gray-600"
                                  >
                                    <Check className="h-3.5 w-3.5 mr-1.5 text-green-600 flex-shrink-0" />
                                    {subserviceName}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Gallery Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center border-b pb-1">
            <ImageIcon className="h-5 w-5 mr-2 text-gray-500" /> Project Gallery
          </h4>

          {hasImages ? (
            <Carousel
              opts={{
                align: "start",
                loop: imageGallery.length > 1,
              }}
              className="w-full"
            >
              <CarouselContent>
                {imageGallery.map((img, index) => {
                  if (!img?.asset) return null;

                  const imageUrl = urlFor(img.asset)
                    ?.width(800)
                    .height(450)
                    .fit("crop")
                    .quality(80)
                    .url();

                  const imageAlt =
                    img.alt || client?.name || `Project image ${index + 1}`;

                  if (!imageUrl) return null;

                  return (
                    <CarouselItem
                      key={`${img._key || index}`}
                      className="basis-full"
                    >
                      <div className="p-1">
                        <Card className="overflow-hidden">
                          <CardContent className="flex aspect-video items-center justify-center p-0">
                            <Image
                              src={imageUrl}
                              alt={imageAlt}
                              width={800}
                              height={450}
                              className="object-cover w-full h-full"
                              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 40vw"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {imageGallery.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 cursor-pointer" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 cursor-pointer" />
                </>
              )}
            </Carousel>
          ) : (
            <div className="aspect-video bg-gray-100 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-muted-foreground italic">
              No images in gallery.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReferenceDetails;
