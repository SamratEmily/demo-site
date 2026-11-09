import type { ReactNode } from "react";
import LocaleLayout, { generateMetadata as localeMetadata } from "../[locale]/layout";
import { routing } from "@/i18n/routing";

// English pages, served at the root (/, /about, …). Same layout as /bn.
const params = Promise.resolve({ locale: routing.defaultLocale });

export function generateMetadata() {
  return localeMetadata({ params, children: null });
}

export default function DefaultLocaleLayout({ children }: { children: ReactNode }) {
  return LocaleLayout({ children, params });
}
