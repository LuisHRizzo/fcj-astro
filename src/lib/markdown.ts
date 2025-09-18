import { marked } from "marked";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

// util para IDs de headings
const slugify = (s: string) =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

// opciones base
marked.setOptions({
  gfm: true,
  breaks: true,
});

// helper: normaliza firma de heading (token vs text/level)
function normalizeHeadingArgs(args: any[]): { text: string; level: number } {
  // Nueva API (token único)
  if (args.length === 1 && typeof args[0] === "object") {
    const token = args[0] ?? {};
    const text = String(token.text ?? "");
    const level = Number(token.depth ?? token.level ?? 1);
    return { text, level };
  }
  // API clásica (text, level)
  return {
    text: String(args[0] ?? ""),
    level: Number(args[1] ?? 1),
  };
}

// renderer compatible
marked.use({
  renderer: {
    heading(...args: any[]) {
      const { text, level } = normalizeHeadingArgs(args);
      const id = slugify(text);
      return `<h${level} id="${id}">${text}</h${level}>`;
    },
  },
});

// función de render
export const renderMarkdown = (md?: string | null) =>
  md ? marked.parse(md) : "";
