/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography'

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,vue,svelte}"
  ],
  darkMode: "class",
  theme: {
    // Config global del container (clase `container`)
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            h1: { fontWeight: '800', letterSpacing: '-0.02em' },
            h2: { fontWeight: '800', letterSpacing: '-0.01em' },
            h3: { fontWeight: '700' },
            'h2, h3': { marginTop: theme('spacing.8'), marginBottom: theme('spacing.3') },
            p: { marginTop: theme('spacing.4'), marginBottom: theme('spacing.4') },
            img: { borderRadius: theme('borderRadius.xl') },
            a: { color: theme('colors.indigo.600'), textDecoration: 'underline' },
            code: { backgroundColor: theme('colors.neutral.50'), padding: '0.15rem 0.35rem', borderRadius: '0.375rem' },
          },
        },
        lg: {
          css: {
            h1: { fontSize: theme('fontSize.4xl')[0] },
            h2: { fontSize: theme('fontSize.3xl')[0] },
            h3: { fontSize: theme('fontSize.2xl')[0] },
          },
        },
      }),
      colors: {
        brand: {
          50:  "#f5f8ff",
          100: "#eaf0ff",
          200: "#cddbff",
          300: "#aac0ff",
          400: "#7b9cff",
          500: "#4f79ff",
          600: "#355be6",
          700: "#2a46b3",
          800: "#22388c",
          900: "#1d2f73",
        },
      },
      fontFamily: {
        heading: ["Jost", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
    
  },
  plugins: [typography],
};
