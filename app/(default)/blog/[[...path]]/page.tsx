import LocalePage, {
  generateMetadata as localeMetadata,
} from "../../../[locale]/blog/[[...path]]/page";
import { withDefaultLocale } from "@/lib/default-locale";

import { blogPaths } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPaths().map((path) => ({ path }));
}

// English version of /blog/[[...path]] (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/blog/[[...path]]">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/blog/[[...path]]">) {
  return LocalePage(withDefaultLocale(props));
}
