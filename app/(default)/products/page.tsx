import LocalePage, { generateMetadata as localeMetadata } from "../../[locale]/products/page";
import { withDefaultLocale } from "@/lib/default-locale";

// English version of /products (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/products">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/products">) {
  return LocalePage(withDefaultLocale(props));
}
