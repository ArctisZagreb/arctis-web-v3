// Import basic Sanity types for referencing
import type {
  Image as SanityImage,
  Slug,
  PortableTextBlock as SanityPortableTextBlock,
  Reference as SanityReference,
} from "sanity";

// Clearer definition for PortableTextBlock
export type PortableTextBlock = SanityPortableTextBlock;

// --- Specific Query Result Types ---
// These types precisely define the data structure returned from specific GROQ queries in sanity.queries.ts

/**
 * Type for referenceLogosQuery result.
 * Contains only ID, client name and logo asset reference.
 */
export type QueryResultReferenceLogo = {
  _id: string;
  clientName: string | null;
  logoAssetRef?: {
    _ref: string;
  };
};

/**
 * Type for postsQuery / successStoriesQuery results (for list views).
 * Includes basic data and directly fetched main image URL.
 */
export type QueryResultStoryListItem = {
  _id: string;
  title?: string;
  slug?: Slug;
  publishedAt?: string;
  description?: string;
  mainImageUrl?: string | null;
  externalImg?: string;
  externalNews?: {
    flag?: boolean;
    link?: string;
  };
};

/**
 * Type for postBySlugQuery / successStoryBySlugQuery results (for single page view).
 * Includes full body (PortableTextBlock) and details.
 */
export type QueryResultSingleStory = {
  _id: string;
  title?: string;
  slug?: Slug;
  publishedAt?: string;
  mainImageUrl?: string | null;
  externalImg?: string;
  body?: PortableTextBlock[];
  externalNews?: {
    flag?: boolean;
    link?: string;
  };
};

/**
 * Type for archibusProductsQuery results.
 * Contains data about Archibus products, including full objects for images/icons
 * and sub-menu items with their PortableTextBlock content.
 */
export type QueryResultArchibusProduct = {
  _id: string;
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
};

/**
 * Type for allReferencesQuery results (for references page).
 * Contains client details, logo (full object and optional direct URL),
 * provided services and gallery image URLs.
 */
export type QueryResultReference = {
  _id: string;
  client?: {
    name?: string | null;
    url?: string | null;
  } | null;
  typeOfWork?: string | null;
  slug?: Slug | null;
  logo?: (SanityImage & { alt?: string | null }) | null;
  servicesProvided?:
    | {
        _key: string;
        serviceName?: string | null;
        subservices?: string[] | null;
      }[]
    | null;
  imageGallery?: (SanityImage & { alt?: string | null })[] | null;
};

// --- Types for Client Components or Data Processing ---

/**
 * Type for processed logo passed to LogoCarouselClient component.
 * Contains only key, alt text and generated image URL.
 */
export interface ProcessedLogo {
  key: string;
  alt: string;
  imageUrl: string | null;
}

// --- Basic Document Types (Optional) ---
// These types can be useful for sharing structure between different parts of the application
// or for more general functions. They define the structure as in the Sanity schema.

/**
 * Base structure for Post and SuccessStory documents.
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
  author?: SanityReference;
  mainImage?: SanityImage;
  externalImg?: string;
  categories?: SanityReference[];
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
