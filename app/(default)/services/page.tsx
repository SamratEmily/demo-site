import LocalePage, { generateMetadata as localeMetadata } from "../../[locale]/services/page";
import { withDefaultLocale } from "@/lib/default-locale";

// English version of /services (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/services">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/services">) {
  return LocalePage(withDefaultLocale(props));
}
