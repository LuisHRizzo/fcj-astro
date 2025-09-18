import type { StrapiImage } from "./strapi-media";

export interface Curso {
  id: number;
  attributes: {
    title: string;               // Text
    description?: string | null; // Text
    price?: number | null;       // Number
    date?: string | null;        // Date
    photo?: { data: StrapiImage | null }; // Media
    slug: string;                // UID
    category?: string | null;    // Text
    level?: string | null;       // Text
    modality?: string | null;    // Text
    duration?: number | null;    // Number (horas, etc.)
    content?: string | null;     // Rich text (Markdown)
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string | null;
  };
}
