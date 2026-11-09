import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { home } from "@/content/home";
import { products } from "@/lib/products";
import { ProductRows } from "./ProductRows";

/** Home page: all products, linking to their pages. */
export function ProductList() {
  return (
    <Section labelledBy="products-title">
      <SectionHeading id="products-title" title={home.products.title} intro={home.products.intro} />
      <div className="mt-12">
        <ProductRows products={products} />
      </div>
    </Section>
  );
}
