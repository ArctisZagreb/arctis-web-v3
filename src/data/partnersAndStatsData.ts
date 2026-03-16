import {
  CalendarDays,
  FolderCheck,
  Users,
  Globe,
  type LucideIcon,
} from "lucide-react";


export interface StatItem {
  value: number;

  suffix: string;

  label: string;

  icon: LucideIcon;
}

export interface PartnerItem {

  name: string;
 
  logoPath: string;

  url?: string;
}

export interface PartnersAndStatsContent {

  title: string;

  subtitle: string;

  partnersTitle: string;

  stats: StatItem[];

  partners: PartnerItem[];
}

export const partnersAndStatsContent: PartnersAndStatsContent = {
  title: "Our Track Record",
  subtitle:
    "With over a decade of experience delivering IWMS solutions, we've built lasting partnerships and proven results across industries and borders.",
  partnersTitle: "We Partner with",

  stats: [
    {
      value: 15,
      suffix: "+",
      label: "Years of Experience",
      icon: CalendarDays,
    },
    {
      value: 12,
      suffix: "+",
      label: "Projects Delivered",
      icon: FolderCheck,
    },
    {
      value: 14,
      suffix: "+",
      label: "Clients Worldwide",
      icon: Users,
    },
    {
      value: 8,
      suffix: "+",
      label: "Countries Served",
      icon: Globe,
    },
  ],

  partners: [
    {
      name: "Aremis",
      logoPath: "/assets/logo/partners/aremis.jpeg",
      url: "https://www.aremis.com",
    },
    {
      name: "THT",
      logoPath: "/assets/logo/partners/tht-logo.png",
      url: "https://www.tht.hr",
    },
    // Dodaj nove partnere ovdje:
    // {
    //   name: "Partner Name",
    //   logoPath: "/assets/logo/partners/partner-name.png",
    //   url: "https://www.partner.com",
    // },
  ],
};
