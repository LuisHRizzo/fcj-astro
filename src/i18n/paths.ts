import { SUPPORTED_LOCALES } from "./config";
export const getStaticLocalePaths = () =>
  SUPPORTED_LOCALES.map((l) => ({ params: { lang: l } }));
