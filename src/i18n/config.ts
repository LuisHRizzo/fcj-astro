export const SUPPORTED_LOCALES = ['es', 'en'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'es';

export const isLocale = (v: string): v is Locale =>
  SUPPORTED_LOCALES.includes(v as Locale);
