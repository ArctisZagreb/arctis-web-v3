// src/data/pageContent.ts

import { Box, Building, Calculator, Cloud, Rocket } from "lucide-react"; // Primjer ikona
export const footerContent = {
  shortDescription:
    "Experts in IWMS / CAFM / CMMS solutions and technology services, focused on enhancing your working environment.",
};

export const projectManagementPage = {
  quote: "No one can whistle a symphony. It takes an orchestra to play it.",
  quoteAuthor: "Halford E. Luccock",
  // ... ostali tekstovi za ovu stranicu
};

export const implementationPage = {
  quote: "The best big idea is only going to be as good as its implementation.",
  quoteAuthor: "Jay Samit",
  // ... ostali tekstovi
};

export const consultingPage = {
  quote:
    "Management is doing things right; leadership is doing the right things.",
  quoteAuthor: "Peter Drucker",
  // ... ostali tekstovi
};

// Možeš dodavati objekte za svaku stranicu ili sekciju
// npr. homePageContent, aboutUsContent, itd.
export const archibusPlansData = [
  {
    title: "Enterprise",
    description: "Web based solution for medium and big companies.",
    keyPoints: [
      "Requires license purchase",
      "Short amortization period",
      "Unlimited applications",
      "Unlimited concurrent users", // 'competitors users' je vjerojatno tipfeler, trebalo bi biti concurrent
    ],
    target: "Medium & Big Companies",
    Icon: Building, // Ikona za Enterprise
    ctaLink: "/archibus#enterprise", // Link za detalje (prilagodi)
    featured: false, // Možemo označiti jedan plan kao istaknut
    modal: {
      title: "Enterprise",
      content:
        "### INCLUDED IN PLAN\nThe modular structure allows you to choose only the applications you need. ARCHIBUS Enterprise can support an unlimited number of users and locations simultaneously and can store an unlimited number of records. It is compatible with Microsoft SQL Server, Oracle and Sybase. It offers web access through ARCHIBUS Web Central and Mobile Apps.\n\n### EXTENSIONS\nThe packages do not include the integration extension with the AutoCAD, Revit, or ESRI ArcGIS server software components, but they can be added to the licensed configuration as an optional purchase. Any additional extensions, of those available, can be added to the ARCHIBUS Enterprise plan.\n\n### COMPANY'S PROFILE\nThe world’s most comprehensive facilities management solution for managing space totaling thousands to millions of square feet or meters.\n\n### NUMBER OF LICENSES REQUIRED\nIt is dimensioned according to the needs of each client. There are no limitations in time solution scaling.\n\n### CUSTOMIZATION\nARCHIBUS Enterprise is a modular, fully scalable, ready-to-use solution. The open system architecture provides complete connectivity for other applications, such as financial and human resources systems, and is flexible enough to support your organization-specific working methods. Modular structure lets you choose only those applications you need. Select as many or as few applications as you need, and extend if necessary.\n\n### OTHER INFORMATION\n- Open architecture can make it difficult to switch to other ERP applications and systems, such as SAP®, Oracle® and Microsoft Dynamics NAV®.\n- Perform full bi-directional integration and interaction with AutoCAD® and Revit® for faster drawing and creation of assets.\n- Built-in protection standard for connected applications and systems to use the web service, HTTP, HTTPS, database links or Microsoft Excel®, Adobe® PDF or XML transfers.\n- 30-Day Rapid Deployment with ARCHIBUS Implementation Methodology for a successful delivery, on time and within budget.\n- ARCHIBUS works as a centralized information archive and supports strategic decision-making, allowing for significant savings or cost savings.\n- The integrated ARCHIBUS solution allows the reuse of information from other systems, thus saving time and effort.",
    },
  },
  {
    title: "SaaS",
    description: "Software solution available anywhere at any time.",
    keyPoints: [
      "No license purchase required",
      "High Security Standard",
      "Technical Support 24/7",
      "Pay per User Payment Model",
    ],
    target: "Flexible Access / All Sizes",
    Icon: Cloud, // Ikona za SaaS
    ctaLink: "/archibus#saas",
    featured: true, // Označimo SaaS kao istaknut (primjer)
    modal: {
      title: "SaaS",
      content:
        "### INCLUDED IN PLAN\nIntegrated software solution for Facility and Real Estate Management accessed directly in the cloud.\n\nWeb-based service, ARCHIBUS Software as a Service (SaaS) eliminates the need for a large upfront investment and allows you to immediately start using robust infrastructure and facility management tools.\n\nYou can access your data anytime, anywhere, with the highest standards of security and availability of services.\n\n### EXTENSIONS\nTo access the web platform ARCHIBUS, the user will need a web account for the ARCHIBUS Web Central Client or ARCHIBUS Smart Client, or the extension ARCHIBUS Smart Client for AutoCAD & Revit.\n\n### COMPANY'S PROFILE\nThe ARCHIBUS SaaS solution is recommended for companies that choose monthly billing with the advantage of a pay-per-use payment model that reduces the investment made in advance.\n\n### NUMBER OF LICENSES REQUIRED\nNo license purchase required.\n\n### CUSTOMIZATION\nThe flexible structure of the SaaS solution allows customization of the package according to the needs of each organization. There is no limit to concurrent users or integrated applications.\n\n### OTHER INFORMATION\n- The open system architecture allows seamless exchange with other ERP applications and systems, such as SAP®, Oracle®, and Microsoft Dynamics NAV®.\n- Performs full and interactive bi-directional integration with AutoCAD® and Revit® for faster drawing and symbol creation for fixed assets.\n- Incorporates standard protocols to connect applications and systems using Web, HTTP, HTTPS, database links, or Microsoft Excel®, Adobe® PDF, or XML transfers.\n- Fast COTS implementation in 30 days using ARCHIBUS Implementation Methodology™ to deliver successfully, on time, and within budget.\n- ARCHIBUS functions as a centralized information archive and supports strategic decision-making, allowing for significant savings or cost savings.\n- The integrated ARCHIBUS solution allows the reuse of information from other systems, saving time and effort.",
    },
  },
  {
    title: "Run Anywhere",
    description: "Web based solution for small companies.",
    keyPoints: [
      "Requires license purchase",
      "Profitability for a small cost",
      "Includes any 3 applications",
      "Up to 10 concurrent users",
    ],
    target: "Small Companies",
    Icon: Rocket, // Ikona za Run Anywhere
    ctaLink: "/archibus#run-anywhere",
    featured: false,
    modal: {
      title: "Run Anywhere",
      content:
        "### INCLUDED IN PLAN\nIntegrated software solution for Facility and Real Estate Management accessed directly in the cloud.\n\nWeb-based service, ARCHIBUS Software as a Service (SaaS) eliminates the need for a large upfront investment and allows you to immediately start using robust infrastructure and facility management tools.\n\nYou can access your data anytime, anywhere, with the highest standards of security and availability of services.\n\n### EXTENSIONS\nTo access the web platform ARCHIBUS, the user will need a web account for the ARCHIBUS Web Central Client or ARCHIBUS Smart Client, or the extension ARCHIBUS Smart Client for AutoCAD & Revit.\n\n### COMPANY'S PROFILE\nThe ARCHIBUS SaaS solution is recommended for companies that choose monthly billing with the advantage of a pay-per-use payment model that reduces the investment made in advance.\n\n### NUMBER OF LICENSES REQUIRED\nNo license purchase required.\n\n### CUSTOMIZATION\nThe flexible structure of the SaaS solution allows customization of the package according to the needs of each organization. There is no limit to concurrent users or integrated applications.\n\n### OTHER INFORMATION\n- The open system architecture allows seamless exchange with other ERP applications and systems, such as SAP®, Oracle®, and Microsoft Dynamics NAV®.\n- Performs full and interactive bi-directional integration with AutoCAD® and Revit® for faster drawing and symbol creation for fixed assets.\n- Incorporates standard protocols to connect applications and systems using Web, HTTP, HTTPS, database links, or Microsoft Excel®, Adobe® PDF, or XML transfers.\n- Fast COTS implementation in 30 days using ARCHIBUS Implementation Methodology™ to deliver successfully, on time, and within budget.\n- ARCHIBUS functions as a centralized information archive and supports strategic decision-making, allowing for significant savings or cost savings.\n- The integrated ARCHIBUS solution allows the reuse of information from other systems, saving time and effort.",
    },
  },
];

export const archibusPlansSection = {
  title: "ARCHIBUS Plans",
  subtitle:
    "Tailored solutions to fit your organization's scale and needs. Some of the most recognised worldwide companies trust ARCHIBUS.",
};
export const ctaSectionData = {
  title: "Ready to Optimize Your Workplace?",
  subtitle:
    "Explore the full range of ARCHIBUS solutions or calculate your potential savings.",
  actions: [
    {
      title: "Explore ARCHIBUS Products",
      description:
        "Learn more about the extensive suite of ARCHIBUS applications and find the perfect fit for your organization.",
      buttonText: "View Products",
      link: "/archibus", // Prilagodi link ako je potrebno
      icon: Box,
    },
    {
      title: "Calculate Your ROI",
      description:
        "Try out our free ROI calculator. Discover your potential return on investment for energy and maintenance savings.",
      buttonText: "Calculate ROI",
      link: "/roi", // Prilagodi link ako je potrebno
      icon: Calculator,
    },
  ],
};

// src/data/pageContent.ts

// Define interfaces matching the component (optional but recommended)
interface CtaAction {
  icon: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

interface CtaSectionData {
  title: string;
  subtitle: string;
  actions: CtaAction[];
}
