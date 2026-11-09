import LocalePage, { generateMetadata as localeMetadata } from "../[locale]/page";
import { withDefaultLocale } from "@/lib/default-locale";

// English home page at "/" (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/">) {
  return LocalePage(withDefaultLocale(props));
}
