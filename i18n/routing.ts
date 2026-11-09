import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bn"],
  defaultLocale: "en",
  // English lives at the root (/about), Bangla under /bn (/bn/about). Static
  // export has no middleware, so the English pages are built at the root by
  // the wrappers in app/(default)/; app/[locale]/ builds only the prefixed ones.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** Locales with a URL prefix, i.e. every locale except English. */
export const prefixedLocales = routing.locales.filter((locale) => locale !== routing.defaultLocale);
