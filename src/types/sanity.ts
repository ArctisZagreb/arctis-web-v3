// src/types/sanity.ts

// Import osnovnih Sanity tipova za referenciranje
import type {
  Image as SanityImage,
  Slug,
  PortableTextBlock as SanityPortableTextBlock,
  Asset,
  File as SanityFile,
  Reference as SanityReference,
} from "sanity";

// Definicija za PortableTextBlock da bude malo jasnija u kodu
export type PortableTextBlock = SanityPortableTextBlock;

// --- Specifični Query Result Tipovi ---
// Ovi tipovi precizno definiraju strukturu podataka vraćenih iz specifičnih GROQ upita u sanity.queries.ts

/**
 * Tip za rezultat referenceLogosQuery.
 * Sadrži samo ID, ime klijenta i referencu na asset logotipa.
 */
export type QueryResultReferenceLogo = {
  _id: string;
  clientName: string | null;
  logoAssetRef?: {
    _ref: string;
  };
};

/**
 * Tip za rezultat postsQuery / successStoriesQuery (za prikaz u listama).
 * Uključuje osnovne podatke i direktno dohvaćen URL glavne slike.
 */
export type QueryResultStoryListItem = {
  _id: string;
  title?: string;
  slug?: Slug;
  publishedAt?: string;
  description?: string; // Kratak opis vijesti
  mainImageUrl?: string | null; // Direktan URL slike
  externalImg?: string; // URL vanjske slike (ako postoji)
  externalNews?: {
    // Podaci o vanjskoj vijesti
    flag?: boolean;
    link?: string;
  };
  // Opcionalno, ako ih query dohvaća:
  // authorName?: string | null;
  // categoryTitles?: string[] | null;
};

/**
 * Tip za rezultat postBySlugQuery / successStoryBySlugQuery (za prikaz pojedinačne stranice).
 * Uključuje puni body (PortableTextBlock) i detalje.
 */
export type QueryResultSingleStory = {
  _id: string;
  title?: string;
  slug?: Slug;
  publishedAt?: string;
  mainImageUrl?: string | null; // Direktan URL slike
  externalImg?: string; // URL vanjske slike (ako postoji)
  body?: PortableTextBlock[]; // Puni rich text sadržaj
  externalNews?: {
    // Podaci o vanjskoj vijesti
    flag?: boolean;
    link?: string;
  };
  // Opcionalno, ako ih query dohvaća:
  // authorName?: string | null;
  // authorImageUrl?: string | null;
};

/**
 * Tip za rezultat archibusProductsQuery.
 * Sadrži podatke o Archibus proizvodima, uključujući pune objekte za slike/ikone
 * i pod-meni stavke s njihovim PortableTextBlock sadržajem.
 */
export type QueryResultArchibusProduct = {
  _id: string;
  name?: string; // Main Menu Name
  icon?: SanityImage; // Cijeli Sanity Image objekt za fleksibilnost s urlFor
  headerImg?: SanityImage; // Cijeli Sanity Image objekt
  displayOrder?: number;
  subMenuItem?: {
    // Niz pod-stavki menija
    _key: string;
    _type: "document"; // Tip pod-dokumenta
    name?: string; // Ime pod-stavke
    body?: PortableTextBlock[]; // Sadržaj pod-stavke
  }[];
};

/**
 * Tip za rezultat allReferencesQuery (za stranicu s referencama).
 * Sadrži detalje o klijentu, logotipu (cijeli objekt i opcionalni direktni URL),
 * pruženim uslugama i URL-ovima slika iz galerije.
 */
export type QueryResultReference = {
  _id: string;
  clientName?: string | null;
  clientUrl?: string | null;
  typeOfWork?: string | null;
  slug?: Slug;
  logo?: SanityImage; // Cijeli Sanity Image objekt za urlFor
  logoUrl?: string | null; // Opcionalni direktno dohvaćen URL logotipa
  servicesProvided?: {
    _key: string;
    serviceName?: string | null;
    subservices?: string[] | null; // Niz stringova za pod-usluge
  }[];
  imageGalleryUrls?: (string | null)[] | null; // Niz URL-ova slika iz galerije
};

// --- Tipovi za Klijentske Komponente ili Obradu Podataka ---

/**
 * Tip za obrađeni logo koji se prosljeđuje LogoCarouselClient komponenti.
 * Sadrži samo ključ, alt tekst i generirani URL slike.
 */
export interface ProcessedLogo {
  key: string;
  alt: string;
  imageUrl: string | null;
}

// --- Osnovni Tipovi Dokumenta (Opcionalno) ---
// Ovi tipovi mogu biti korisni za dijeljenje strukture između različitih dijelova aplikacije
// ili za općenitije funkcije. Definiraju strukturu kako je u Sanity shemi.

/**
 * Osnovna struktura za Post i SuccessStory dokumente.
 */
export interface BaseSanityDoc {
  _id: string;
  _type: string;
  _createdAt?: string;
  _updatedAt?: string;
  _rev?: string;
}

export interface BaseStory extends BaseSanityDoc {
  _type: "post" | "successStories";
  title?: string;
  slug?: Slug;
  author?: SanityReference; // Referenca na Author dokument
  mainImage?: SanityImage;
  externalImg?: string;
  categories?: SanityReference[]; // Niz referenci na Category dokumente
  publishedAt?: string;
  description?: string;
  body?: PortableTextBlock[];
  externalNews?: {
    _type: "document";
    flag?: boolean;
    link?: string;
  };
}

export interface Post extends BaseStory {
  _type: "post";
}
export interface SuccessStory extends BaseStory {
  _type: "successStories";
}

export interface Author extends BaseSanityDoc {
  _type: "author";
  name?: string;
  slug?: Slug;
  image?: SanityImage;
  bio?: PortableTextBlock[];
}

export interface Category extends BaseSanityDoc {
  _type: "category";
  title?: string;
  description?: string;
}

export interface SanityArchibusProductDoc extends BaseSanityDoc {
  _type: "archibusProducts";
  name?: string;
  icon?: SanityImage;
  headerImg?: SanityImage;
  displayOrder?: number;
  subMenuItem?: {
    _key: string;
    _type: "document";
    name?: string;
    body?: PortableTextBlock[];
  }[];
}

export interface SanityReferenceDoc extends BaseSanityDoc {
  _type: "references";
  client?: {
    _type: "document";
    name?: string;
    url?: string;
  };
  typeOfWork?: string;
  slug?: Slug;
  logo?: SanityImage;
  servicesProvided?: {
    _key: string;
    _type: "document";
    serviceName?: string;
    subservices?: string[];
  }[];
  imageGallery?: SanityImage[];
}

// Dodaj druge osnovne tipove prema potrebi...
