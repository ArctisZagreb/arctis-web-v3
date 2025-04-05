import React from "react";
import { Metadata } from "next";
import { getArchibusProducts } from "@/lib/sanity/sanity.queries";
import ArchibusClientLayout from "@/components/archibus/ArchibusClientLayout";

export const metadata: Metadata = {
  title: "ARCHIBUS Products | Arctis Solutions",
  description:
    "Explore the comprehensive suite of ARCHIBUS IWMS applications offered by Arctis.",
};

export default async function ArchibusPage() {
  // Fetch product data from the server
  const products = await getArchibusProducts();

  // Display fallback message if no products are available
  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">ARCHIBUS Products</h1>
        <p className="text-muted-foreground">
          No product information available at the moment.
        </p>
      </div>
    );
  }

  // Pass the fetched data to the client component for interactivity
  return <ArchibusClientLayout initialProducts={products} />;
}
