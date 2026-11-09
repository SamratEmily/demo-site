import LocalePage, { generateMetadata as localeMetadata } from "../../[locale]/case-studies/page";
import { withDefaultLocale } from "@/lib/default-locale";

// English version of /case-studies (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/case-studies">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/case-studies">) {
  return LocalePage(withDefaultLocale(props));
}
