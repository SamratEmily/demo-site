import { useTranslations } from "next-intl";
import type { TocItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

/** In-page links to the post's headings. Hidden for posts with fewer than two. */
export function TableOfContents({ items, className }: TableOfContentsProps) {
  const t = useTranslations("blog");
  if (items.length < 2) return null;

  return (
    <nav aria-labelledby="toc-title" className={className}>
      <h2 id="toc-title" className="text-sm font-semibold">
        {t("toc")}
      </h2>
      <ol className="mt-3 border-l">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px flex min-h-11 items-center border-l-2 border-transparent py-1 pr-2 text-sm text-muted-foreground hover:border-primary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
                item.level === 2 ? "pl-4" : "pl-8",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
