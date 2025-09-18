export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
  alternativeText?: string | null;
  caption?: string | null;
};

export type StrapiImage = {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string | null;
    caption?: string | null;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
  };
};
