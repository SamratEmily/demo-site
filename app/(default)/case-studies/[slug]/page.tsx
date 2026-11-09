import LocalePage, {
  generateMetadata as localeMetadata,
} from "../../../[locale]/case-studies/[slug]/page";
import { withDefaultLocale } from "@/lib/default-locale";

import { caseStudySlugs } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

// English version of /case-studies/[slug] (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/case-studies/[slug]">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/case-studies/[slug]">) {
  return LocalePage(withDefaultLocale(props));
}
