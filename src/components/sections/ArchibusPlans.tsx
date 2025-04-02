// src/components/sections/ArchibusPlans.tsx
"use client";

import React, { useState } from "react"; // Dodaj useState
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown"; // Uvezi react-markdown
import remarkGfm from "remark-gfm"; // Uvezi GFM plugin
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Za gumb za zatvaranje
  DialogFooter, // Opcionalno
} from "@/components/ui/dialog"; // Uvezi Dialog komponente
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react"; // Dodaj X ikonu za zatvaranje
import { archibusPlansData, archibusPlansSection } from "@/data/pageContent";
// Importaj interface ako ga koristiš
// import type { ArchibusPlan } from '@/types/data'; // Prilagodi putanju

// Framer Motion varijante ostaju iste...
// Framer Motion varijante za animaciju
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren", // Animacija djece počinje nakon roditelja
      staggerChildren: 0.2, // Odgoda animacije za svaku karticu
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};
const ArchibusPlans = () => {
  // Stanje za praćenje otvorenog modala i odabranog plana
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof archibusPlansData)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funkcija za otvaranje modala s odabranim planom
  const handleOpenModal = (plan: (typeof archibusPlansData)[0]) => {
    if (plan.modal) {
      // Otvori samo ako plan ima modal podatke
      setSelectedPlan(plan);
      setIsModalOpen(true);
    }
    // Alternativno, ako nema modal, možemo pratiti ctaLink?
    // else { window.location.href = plan.ctaLink; }
  };

  // Funkcija za zatvaranje modala (potrebna za Dialog onOpenChange)
  const handleModalChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedPlan(null); // Resetiraj odabrani plan kad se modal zatvori
    }
  };

  return (
    <motion.section
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white border-b"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Naslov sekcije */}
        <div className="text-center mb-12 lg:mb-16">
          {/* ... (naslov i podnaslov ostaju isti) ... */}
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            {archibusPlansSection.title}
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            {archibusPlansSection.subtitle}
          </p>
        </div>

        {/* Grid s planovima */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {archibusPlansData.map((plan) => (
            // Omotaj motion.div s DialogTrigger ako želiš da cijela kartica otvara modal
            // ili stavi DialogTrigger oko specifičnog elementa (npr. gumba)
            <motion.div key={plan.title} variants={cardVariants}>
              {/* Umjesto Linka oko Buttona, koristit ćemo Dialog */}
              <Dialog
                open={isModalOpen && selectedPlan?.title === plan.title}
                onOpenChange={handleModalChange}
              >
                {/* Card sada služi kao trigger */}
                <DialogTrigger asChild>
                  <Card
                    onClick={() => handleOpenModal(plan)} // Nije potrebno ako koristimo DialogTrigger asChild
                    className={`flex flex-col h-full transition-all duration-300 hover:shadow-xl cursor-pointer ${
                      // Dodan cursor-pointer
                      plan.featured
                        ? "border-blue-500 ring-2 ring-blue-500/50"
                        : "border-border hover:border-gray-300" // Dodan hover border
                    }`}
                  >
                    <CardHeader className="items-center text-center pb-4">
                      {plan.featured && (
                        <Badge
                          variant="default"
                          className="mb-2 bg-blue-600 hover:bg-blue-700"
                        >
                          Most Popular
                        </Badge>
                      )}
                      <div
                        className={`mb-3 p-3 rounded-full ${plan.featured ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}
                      >
                        <plan.Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-2xl font-semibold">
                        {plan.title}
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-0">
                      <p className="text-sm font-medium text-gray-600 mb-4 text-center">
                        {plan.target}
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {plan.keyPoints.map((point) => (
                          <li key={point} className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      {/* Prikazujemo tekst umjesto gumba unutar triggera */}
                      <span className="w-full text-center text-sm font-medium text-blue-700 group">
                        Learn More
                      </span>
                    </CardFooter>
                  </Card>
                </DialogTrigger>

                {/* Sadržaj Modala - renderira se samo ako je open=true */}
                {selectedPlan?.modal && ( // Dodatna provjera da modal postoji
                  <DialogContent className="sm:max-w-[600px] md:max-w-[750px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold">
                        {selectedPlan.modal.title}
                      </DialogTitle>
                      {/* Možeš dodati DialogDescription ako želiš kratki podnaslov */}
                    </DialogHeader>
                    {/* Renderiranje Markdown sadržaja */}
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none py-4">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {selectedPlan.modal.content}
                      </ReactMarkdown>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                    {/* Alternativno, gumb za zatvaranje u headeru */}
                    {/* <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                             <X className="h-4 w-4" />
                             <span className="sr-only">Close</span>
                         </DialogClose> */}
                  </DialogContent>
                )}
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ArchibusPlans;
