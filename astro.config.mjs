// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'ignore',

  experimental: {
    // (no usamos i18n experimental de Astro; gestionamos rutas a mano)
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [prefetch()],
});