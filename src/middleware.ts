import type { MiddlewareHandler } from 'astro';
import { DEFAULT_LOCALE, isLocale } from './i18n/config';

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  const url = new URL(ctx.request.url);
  const [, maybeLang] = url.pathname.split('/'); // "", "es", "..."
  if (!maybeLang) {
    // Redirige raíz a /es (o al default que prefieras)
    url.pathname = `/${DEFAULT_LOCALE}/`;
    return Response.redirect(url, 307);
  }

  // Si el primer segmento no es un locale soportado, seguimos normal (404 o lo que toque)
  if (!isLocale(maybeLang)) return next();

  return next();
};
