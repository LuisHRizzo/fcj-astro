// src/lib/strapi.ts

interface Props {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;   // p.ej. 'data'
  wrappedByList?: boolean; // si querés devolver sólo el primer elemento de una lista
}

/** Obtiene la base de Strapi desde env. Usa PUBLIC_ (front) y cae en STRAPI_URL si quedó legacy. */
export function getStrapiBase(): string {
  const base =
    import.meta.env.PUBLIC_STRAPI_URL ??
    import.meta.env.STRAPI_URL ?? // compatibilidad con código viejo
    '';

  if (!base) {
    throw new Error(
      'PUBLIC_STRAPI_URL no está definida. Cargala en .env / .env.production (o define STRAPI_URL legacy).'
    );
  }
  return base.replace(/\/+$/, ''); // sin trailing slash
}

/** Concatena la base de Strapi si te pasan una URL relativa (útil para media). */
export function withBase(u?: string | null): string | null {
  if (!u) return null;
  const base = getStrapiBase();
  return u.startsWith('http') ? u : `${base}${u}`;
}

/**
 * Construye parámetros de consulta soportando objetos y arrays anidados
 *  - filters[slug][$eq]=foo
 *  - fields[]=title&fields[]=slug
 *  - sort[]=date:desc
 */
function appendParam(url: URL, key: string, value: unknown) {
  if (value === undefined || value === null) return;

  if (Array.isArray(value)) {
    // arrays como fields[], sort[], populate[]
    value.forEach((v) => url.searchParams.append(`${key}[]`, String(v)));
    return;
  }

  if (typeof value === 'object') {
    // objeto anidado -> key[subKey]
    Object.entries(value as Record<string, unknown>).forEach(([subKey, subVal]) => {
      appendParam(url, `${key}[${subKey}]`, subVal);
    });
    return;
  }

  // valor plano (number | boolean | string)
  url.searchParams.append(key, String(value));
}

/** Normaliza endpoint removiendo leading slash y evitando dobles barras */
function sanitizeEndpoint(endpoint: string): string {
  return endpoint.replace(/^\/+/, '');
}

/**
 * Fetch genérico a Strapi (v5+), con:
 *  - base tomada de PUBLIC_STRAPI_URL (o STRAPI_URL legacy)
 *  - populate="*" por defecto si no se envía populate
 *  - desempaquetado opcional por wrappedByKey/wrappedByList
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  const base = getStrapiBase();
  const clean = sanitizeEndpoint(endpoint);
  const url = new URL(`${base}/api/${clean}`);

  // query recursiva
  if (query) {
    Object.entries(query).forEach(([k, v]) => appendParam(url, k, v));
  }

  // si no se pasó populate, añadimos populate=*
  const alreadyHasPopulate =
    (query && Object.prototype.hasOwnProperty.call(query, 'populate')) ||
    url.searchParams.has('populate');

  if (!alreadyHasPopulate) {
    url.searchParams.append('populate', '*');
  }

  // petición
  const res = await fetch(url.toString());
  let json: any;
  try {
    json = await res.json();
  } catch {
    if (!res.ok) {
      throw new Error(`Strapi ${res.status}: respuesta no JSON`);
    }
    // 2xx sin JSON (raro en Strapi) -> devolvemos undefined tipado
    return undefined as unknown as T;
  }

  if (!res.ok) {
    const msg = json?.error?.message || json?.message || 'Request failed';
    throw new Error(`Strapi ${res.status}: ${msg}`);
  }

  // desempaquetar
  let data: any = wrappedByKey ? json?.[wrappedByKey] : json;

  // normalizar colecciones nulas (data: null) -> []
  if (wrappedByKey === 'data' && data == null) {
    data = [];
  }

  // devolver sólo el primer item, si se pidió
  if (wrappedByList && Array.isArray(data)) {
    data = data[0];
  }

  return data as T;
}
