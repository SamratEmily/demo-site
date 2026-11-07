import { useLocale } from "next-intl";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { products } from "@/content/products";
import { ProductRows } from "./ProductRows";

/** Home page: all products, linking to their pages. */
export function ProductList() {
  const locale = useLocale();

  return (
    <Section labelledBy="products-title">
      <SectionHeading
        id="products-title"
        title={home.products.title[locale]}
        intro={home.products.intro?.[locale]}
      />
      <div className="mt-12">
        <ProductRows products={products} />
      </div>
    </Section>
  );
}
