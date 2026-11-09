import LocalePage, {
  generateMetadata as localeMetadata,
} from "../../../[locale]/products/[slug]/page";
import { withDefaultLocale } from "@/lib/default-locale";
import { products } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

// English version of /products/[slug] (no /en prefix); see lib/default-locale.ts.
export function generateMetadata(props: PageProps<"/products/[slug]">) {
  return localeMetadata(withDefaultLocale(props));
}

export default function Page(props: PageProps<"/products/[slug]">) {
  return LocalePage(withDefaultLocale(props));
}
