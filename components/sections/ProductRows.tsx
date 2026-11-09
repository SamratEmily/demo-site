import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { productHref } from "@/content/navigation";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductRowsProps {
  products: Product[];
}

/** Products as a scannable list of rows, each linking to its page. */
export function ProductRows({ products }: ProductRowsProps) {
  return (
    <ul className="border-b">
      {products.map((product) => (
        <li key={product.slug} className="border-t">
          <Link
            href={productHref(product.slug)}
            className="group grid gap-2 py-6 transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none sm:-mx-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto] sm:items-center sm:gap-8 sm:px-4"
          >
            <span className="flex flex-col gap-1">
              <span className="flex flex-wrap items-center gap-3">
                <span className="text-h3 font-semibold">{product.name}</span>
                <StatusBadge status={product.status} />
              </span>
              <span className="text-sm text-muted-foreground">{product.category}</span>
            </span>
            <span className="text-muted-foreground">{product.summary}</span>
            <ArrowRight
              className="hidden size-5 text-primary transition-transform group-hover:translate-x-1 sm:block"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
