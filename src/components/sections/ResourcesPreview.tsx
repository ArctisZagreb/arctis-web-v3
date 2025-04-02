// src/components/sections/ResourcesPreview.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// Uvezi funkcije za dohvat i tipove
import {
  getAllPostsList,
  getAllSuccessStoriesList,
} from "@/lib/sanity/sanity.queries";
import type { QueryResultStoryListItem } from "@/types/sanity";
import { format } from "date-fns"; // Za formatiranje datuma

// Helper funkcija za dobivanje putanje do pojedinačnog resursa
function getResourceUrl(item: QueryResultStoryListItem): string {
  // Pretpostavljamo da je tip dohvaćen ili se može izvesti iz _type ako ga dohvatimo
  // Ako ne dohvaćamo _type, možemo nagađati ili dodati _type u query
  // Trenutno queryListProjection ne dohvaća _type, pa ćemo hardkodirati putanje
  // TODO: Ažuriraj query da dohvati _type ili koristi bolju logiku
  if (item.externalNews?.flag && item.externalNews.link) {
    return item.externalNews.link; // Vanjski link
  }
  if (item.slug?.current) {
    // Pretpostavka (treba poboljšati dohvaćanjem _type)
    const typePath =
      item.title?.toLowerCase().includes("gaca") ||
      item.title?.toLowerCase().includes("vodafone")
        ? "success-stories"
        : "news";
    return `/${typePath}/${item.slug.current}`;
  }
  return "#"; // Fallback
}

// Framer Motion varijante (opcionalno)
/* const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}; */

// Glavna async komponenta
async function ResourcesPreview() {
  // Dohvati najnovije vijesti i priče paralelno
  const [latestPosts, latestStories] = await Promise.all([
    getAllPostsList(),
    getAllSuccessStoriesList(),
  ]);

  // Kombiniraj i sortiraj po datumu objave (najnovije prvo)
  // Dodajemo tip kako bismo ih mogli razlikovati
  const combinedResources = [
    ...latestPosts.map((post) => ({ ...post, type: "News" as const })),
    ...latestStories.map((story) => ({
      ...story,
      type: "Success Story" as const,
    })),
  ].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
  );

  // Uzmi samo prvih npr. 3 ili 4 resursa za prikaz
  const resourcesToShow = combinedResources.slice(0, 3);

  // Ako nema resursa, možemo prikazati poruku ili ništa
  if (resourcesToShow.length === 0) {
    return null; // Ili <p>No recent resources found.</p> unutar sekcije
  }

  return (
    // Koristi motion.section ako želiš animacije
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white border-t">
      <div className="container mx-auto px-4 md:px-6">
        {/* Naslov sekcije */}
        <div className="mb-10 md:mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            Latest Resources
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Stay updated with our latest news and success stories.
          </p>
        </div>

        {/* Grid s resursima */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resourcesToShow.map((item) => {
            const resourceUrl = getResourceUrl(item);
            const isExternal =
              item.externalNews?.flag && item.externalNews.link;
            const target = isExternal ? "_blank" : "_self";
            const rel = isExternal ? "noopener noreferrer" : undefined;

            // Slika: koristi mainImageUrl ili externalImg
            const imageUrl = item.mainImageUrl || item.externalImg;
            // Fallback slika ako nijedna nije dostupna
            const displayImageUrl = imageUrl || "/images/placeholder.png"; // Koristi isti placeholder

            return (
              // Koristi motion.div ako želiš animacije po itemu
              <div key={item._id} className="flex">
                <Card className="flex flex-col w-full overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl">
                  {/* Link omotava sliku i sadržaj */}
                  <Link
                    href={resourceUrl}
                    target={target}
                    rel={rel}
                    aria-label={item.title || "View resource"}
                  >
                    {/* Slika */}
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image
                        src={displayImageUrl}
                        alt={item.title || "Resource image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Link>

                  {/* Sadržaj kartice */}
                  <CardContent className="p-5 flex flex-col flex-grow">
                    {/* Badge i Datum */}
                    <div className="flex justify-between items-center mb-3 text-xs text-muted-foreground">
                      <Badge
                        variant={item.type === "News" ? "default" : "secondary"}
                      >
                        {item.type}
                      </Badge>
                      {item.publishedAt && (
                        <time dateTime={item.publishedAt}>
                          {format(new Date(item.publishedAt), "MMM d, yyyy")}
                        </time>
                      )}
                    </div>
                    {/* Naslov */}
                    <Link href={resourceUrl} target={target} rel={rel}>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 hover:text-blue-700 transition-colors">
                        {item.title || "Untitled Resource"}
                      </h3>
                    </Link>
                    {/* Opis/Excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-grow mb-4">
                      {item.description || "No description available."}
                    </p>
                    {/* Link na dnu (može se i maknuti ako je naslov dovoljan) */}
                    <Link
                      href={resourceUrl}
                      target={target}
                      rel={rel}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center group mt-auto"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Gumb za prikaz svih resursa */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/resources">
              {" "}
              {/* Prilagodi link ako trebaš drugu stranicu */}
              View All Resources <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ResourcesPreview;
