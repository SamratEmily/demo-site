import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface Crumb {
  label: string;
  /** Omit for the current page. */
  href?: `/${string}`;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations("product");

  return (
    <nav aria-label={t("breadcrumb")}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 ? <ChevronRight className="size-4" aria-hidden /> : null}
            {item.href ? (
              <Link
                href={item.href}
                className="inline-flex min-h-11 min-w-11 items-center rounded hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
