import { DEFAULT_LOCALE, isLocale, type Locale } from './config';

type Dict = Record<string, any>;

export async function loadDict(locale: string): Promise<Dict> {
  const lang: Locale = isLocale(locale) ? (locale as Locale) : DEFAULT_LOCALE;
  // Import dinámico (Vite lo resuelve en build)
  if (lang === 'es') {
    return (await import('./es.json')).default;
  }
  // fallback: si todavía no existe el json del otro idioma, usamos ES
  return (await import('./es.json')).default;
}

// Acceso por “dot notation”: t('nav.home')
export function getTrans(dict: Dict, path: string, fallback?: string): string {
  return path.split('.').reduce((acc: any, k) => (acc?.[k] ?? undefined), dict) ?? (fallback ?? path);
}
