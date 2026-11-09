import LocalePage, { generateMetadata as localeMetadata } from "../../[locale]/about/page";
import { withDefaultLocale } from "@/lib/default-locale";

// English version of /about (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/about">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/about">) {
  return LocalePage(withDefaultLocale(props));
}
