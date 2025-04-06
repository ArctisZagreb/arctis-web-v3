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
    title: string;
    content: string; // Markdown string
  };
}
// Define interfaces matching the component
export interface CtaAction {
  icon: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

export interface CtaSectionData {
  title: string;
  subtitle: string;
  actions: CtaAction[];
}
