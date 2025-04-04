// src/data/siteInfo.ts

export const siteInfo = {
  companyName: "Arctis d.o.o.",
  address: "Pavlinovićeva 6, 10000 Zagreb, Croatia", // Dodana poštanska oznaka i država
  addressLink:
    "https://www.google.com/maps/search/?api=1&query=Pavlinovićeva+6+Zagreb+Croatia", // Link za Google Maps
  phone: "+385 (0)1 37 60 480",
  phoneHref: "tel:+38513760480",
  email: "info@arctis.hr",
  emailHref: "mailto:info@arctis.hr",

  // Pravne informacije
  legal: {
    director: "Hrvoje Šolman",
    court: "Commercial court in Zagreb",
    mbs: "080744742", // Matični broj subjekta
    mb: "2697190", // Matični broj
    oib: "36165855739", // OIB
    capital: "€2,654.46", // Preračunato iz 20.000,00 HRK (koristeći fiksni tečaj 7,53450) - PROVJERITI službeni iznos!
    capitalPaid: true, // Je li temeljni kapital uplaćen
  },

  // Bankovne informacije
  bank: {
    name: "Hypo Alpe-Adria-Bank d.d.", // Možda Addiko Bank sada? Provjeriti ime.
    address: "Slavonska avenija 6, 10000 Zagreb",
    iban: "HR46 2500 0091 1013 3645 6",
    // swift: 'HAABHR22' // Opcionalno: SWIFT/BIC
  },

  // Dodaj linkove za društvene mreže ako postoje
  socialLinks: {
    linkedin: "https://linkedin.com/company/arctis",
    facebook: "https://facebook.com/arctis",
    // },
  },
};

// Tekst za kontakt stranicu
export const contactPageContent = {
  title: "Get in Touch with Arctis",
  subtitle:
    "Ready to optimize your workspace, implement leading IWMS solutions, or discuss your project needs? We're here to help.",
  introParagraph:
    "At Arctis, we combine over a decade of facilities management expertise with cutting-edge technology solutions, centered around the powerful ARCHIBUS platform. Whether you have a specific question about our services, need consulting on BIM+FM synergy, or want to explore how ARCHIBUS can transform your operations, our team is ready to connect.",
  ctaPrompt: "Reach out today to start the conversation.",
};
