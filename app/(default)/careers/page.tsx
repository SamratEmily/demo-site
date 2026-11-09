import LocalePage, { generateMetadata as localeMetadata } from "../../[locale]/careers/page";
import { withDefaultLocale } from "@/lib/default-locale";

// English version of /careers (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/careers">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/careers">) {
  return LocalePage(withDefaultLocale(props));
}
