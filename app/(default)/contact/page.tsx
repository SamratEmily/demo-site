import LocalePage, { generateMetadata as localeMetadata } from "../../[locale]/contact/page";
import { withDefaultLocale } from "@/lib/default-locale";

// English version of /contact (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/contact">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/contact">) {
  return LocalePage(withDefaultLocale(props));
}
