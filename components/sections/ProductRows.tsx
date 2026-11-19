import { useTranslations } from "next-intl";
import Link from "next/link";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { demoRequestHref, productHref } from "@/content/navigation";
import type { Product } from "@/lib/types";

interface ProductRowsProps {
  products: Product[];
}

export function ProductRows({ products }: ProductRowsProps) {
  const t = useTranslations("product");

  return (
    <ul className="border-b">
      {products.map((product) => (
        <li
          key={product.slug}
          className="grid gap-3 border-t py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] sm:items-center sm:gap-8"
        >
          <div>
            <Link
              href={productHref(product.slug)}
              className="inline-flex min-h-11 items-center text-h3 font-semibold hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              {product.name}
            </Link>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-muted-foreground">{product.summary}</p>
          <ButtonLink
            href={demoRequestHref(product.slug)}
            variant="outline"
            className="justify-self-start"
          >
            {t("requestDemo")}
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}
