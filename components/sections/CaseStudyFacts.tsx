import { useTranslations } from "next-intl";
import { getProduct } from "@/lib/products";
import { productHref } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import type { CaseStudyMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CaseStudyFactsProps {
  meta: CaseStudyMeta;
  /** Link the product name to its page. Off inside links (index rows). */
  linkProduct?: boolean;
  className?: string;
}

/** Client, industry, product and duration as a compact definition list. */
export function CaseStudyFacts({ meta, linkProduct = true, className }: CaseStudyFactsProps) {
  const t = useTranslations("caseStudies");
  const product = meta.product ? getProduct(meta.product) : undefined;

  const facts = [
    { label: t("client"), value: meta.client },
    { label: t("industry"), value: meta.industry },
    product
      ? {
          label: t("product"),
          value: linkProduct ? (
            <Link
              href={productHref(product.slug)}
              lang="en"
              className="text-primary underline underline-offset-4 hover:no-underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              {product.name}
            </Link>
          ) : (
            <span lang="en">{product.name}</span>
          ),
        }
      : null,
    { label: t("duration"), value: meta.duration },
  ].filter((fact) => fact !== null);

  return (
    <dl className={cn("grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4", className)}>
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt className="text-sm text-muted-foreground">{fact.label}</dt>
          <dd className="mt-1 font-medium">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
