import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { availableProducts } from "@/lib/products";
import { ProductRows } from "./ProductRows";

/** Home page: all products, linking to their pages. */
export function ProductList() {
  return (
    <Section labelledBy="products-title">
      <SectionHeading id="products-title" title={home.products.title} intro={home.products.intro} />
      <div className="mt-12">
        <ProductRows products={availableProducts} />
      </div>
    </Section>
  );
}
