import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Gumbi u heroju stranica usluga (kontakt + reference) */
export function ServiceHeroActions() {
  return (
    <>
      <Button
        asChild
        size="lg"
        className="group h-12 bg-blue-500 px-6 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400"
      >
        <Link href="/contact">
          Talk to an expert
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="h-12 border-white/20 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white"
      >
        <Link href="/references">See our references</Link>
      </Button>
    </>
  );
}
