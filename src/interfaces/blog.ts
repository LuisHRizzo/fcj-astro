import type { StrapiImage } from "./strapi-media";

export interface Blog {
  id: number;
  attributes: {
    title: string;                 // Text
    content: string;               // Rich text (Markdown) en Strapi v4 llega como string
    category?: string | null;      // Text
    description?: string | null;   // Text
    slug: string;                  // UID
    date?: string | null;          // Date ISO
    photo?: { data: StrapiImage | null };         // Media (single)
    slider?: { data: StrapiImage[] | null };      // Multiple Media
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
  };
}
