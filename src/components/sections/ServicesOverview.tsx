// src/components/sections/ServicesOverview.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Settings, Users } from "lucide-react";

// Services data
const services = [
  {
    title: "Project Management",
    description:
      "Turning vision into reality with expert planning, coordination, and execution for CRE, Asset, and Facility Management projects.",
    link: "/project-management",
    IconComponent: Briefcase,
    // Dodajemo placeholder za imgPath radi konzistentnosti, iako ga Image ne koristi direktno ovdje
    imgPath: "/assets/images/ProjectManagement.png",
  },
  {
    title: "Implementation",
    description:
      "Faster deployment and reliable ROI through standard or customized ARCHIBUS implementations, leveraging best practices.",
    link: "/implementation",
    IconComponent: Settings,
    imgPath: "/assets/images/Implementation.png",
  },
  {
    title: "Consulting",
    description:
      "Strategic IT advisory, architecture planning, operational assessment, and implementation guidance to align technology with your goals.",
    link: "/consulting",
    IconComponent: Users,
    imgPath: "/assets/images/Consulting.png",
  },
];

const ServicesOverview = () => {
  return (
    // Vanjska sekcija s relativnim pozicioniranjem za animiranu pozadinu
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Animirana pozadina - apsolutno pozicionirana */}
      <div className="absolute inset-0 w-full h-full">
        {/* Osnovni gradijent */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
        {/* Grid uzorak s prozirnošću */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        </div>
        {/* Animirani krugovi */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Kontejner za sadržaj - relativan i iznad pozadine (z-10) */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Naslov sekcije */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            Our Expertise
          </h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            We are experts in IWMS / CAFM / CMMS solutions and technology
            services, focused on enhancing your working environment and
            supporting your organisation goals.
          </p>
        </div>

        {/* Grid s karticama usluga */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.title}
              className="flex flex-col transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden" // Dodan overflow-hidden i rounded-lg
            >
              {/* Slika kartice */}
              <div className="relative w-full h-48">
                {/* Uklonjen overflow-hidden odavde jer je na Card */}
                <Image
                  src={service.imgPath} // Koristi putanju iz podataka
                  alt={service.title}
                  fill // Da popuni div
                  className="object-cover" // Da prekrije bez distorzije
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw" // Optimizacija učitavanja
                />
                {/* Opcionalni overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                {/* Ikona pozicionirana preko slike */}
                <div className="absolute bottom-3 left-3 p-2 rounded-full bg-white/80 text-blue-700 shadow-md inline-flex">
                  {/* Malo drugačiji stil ikone */}
                  <service.IconComponent className="h-5 w-5" />
                </div>
              </div>

              {/* Ostatak kartice */}
              <CardHeader className="pt-4">
                {/* Malo manji padding gore */}
                <CardTitle className="text-lg font-semibold">
                  {service.title}
                </CardTitle>
                {/* Malo manji naslov */}
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {service.description}
                </p>
                {/* Ograničenje na 3 linije */}
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  variant="link"
                  className="w-full justify-start text-blue-700 group px-0"
                >
                  {/* Link poravnat lijevo */}
                  <Link href={service.link}>
                    Read More
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
