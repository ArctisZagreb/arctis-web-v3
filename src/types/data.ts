// Primjer interface-a (prilagodi ako koristiš drugačiju strukturu)
import type { LucideIcon } from "lucide-react";

export interface ArchibusPlan {
  title: string;
  description: string;
  keyPoints: string[];
  target: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>; // Podržava Lucide ili SVG komponente
  ctaLink: string;
  featured: boolean;
  modal?: {
    // Opcionalni modal objekt
    title: string;
    content: string; // Markdown string
  };
}
