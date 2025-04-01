// src/data/navigation.ts
export interface NavItem {
  href: string;
  label: string;
  description?: string; // Opis za prikaz u dropdownu
  sublinks?: NavItem[];
}

export const headerNavLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  {
    // Nema href jer je ovo samo trigger za dropdown
    href: "#", // Može i # ili prazan string ako ne želimo da je link
    label: "Services",
    sublinks: [
      {
        href: "/project-management",
        label: "Project Management",
        description: "Expert planning and coordination for complex projects.",
      },
      {
        href: "/implementation",
        label: "Implementation",
        description: "Reliable deployment of ARCHIBUS solutions.",
      },
      {
        href: "/consulting",
        label: "Consulting",
        description: "Strategic advice to align technology with your goals.",
      },
    ],
  },
  {
    href: "#",
    label: "Solutions",
    sublinks: [
      {
        href: "/archibus",
        label: "ARCHIBUS Products",
        description: "Explore the full suite of ARCHIBUS applications.",
      },
      {
        href: "/roi",
        label: "ROI Calculator",
        description: "Calculate potential savings and return on investment.",
      },
    ],
  },
  {
    href: "#",
    label: "Resources",
    sublinks: [
      {
        href: "/news",
        label: "News",
        description: "Latest updates from Arctis and the industry.",
      },
      {
        href: "/success-stories",
        label: "Success Stories",
        description: "See how clients benefited from our solutions.",
      },
      {
        href: "/faq",
        label: "FAQ",
        description: "Answers to common questions.",
      },
    ],
  },
  { href: "/references", label: "References" },
  { href: "/contact", label: "Contact" },
];
export const footerQuickLinks: NavItem[] = [
  { href: "/contact", label: "Contact" },
  { href: "/archibus", label: "Archibus" }, // Konzistentnost imena
  { href: "/aboutus", label: "About us" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

// da bude, ucini malo modernije ipak i koristi animacije, neka boje budu u skladu sa pocetnom stranicom, partners sekciji ucitavaj partnere sa getClientsLogo , updejtaj i tekst u pocetnoj sekciji o nama, ucini malo boljim. ne mozemo sve spremati u sections pa napravi podfolder u section za aboutus dio
