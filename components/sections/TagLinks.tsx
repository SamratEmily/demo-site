import { useLocale, useTranslations } from "next-intl";
import { blogTags } from "@/content/blog-tags";
import { blogHref, blogTagHref } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface TagLinksProps {
  tags: string[];
  /** The tag page being shown; omit on the main blog page. */
  active?: string;
}

const pill =
  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors hover:bg-surface-muted focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none";
const activePill = "border-primary bg-primary text-primary-foreground hover:bg-primary";

/** "All posts" plus one link per tag; the current one is highlighted. */
export function TagLinks({ tags, active }: TagLinksProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  if (tags.length === 0) return null;

  return (
    <nav aria-label={t("topics")}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={blogHref}
            aria-current={active ? undefined : "page"}
            className={cn(pill, !active && activePill)}
          >
            {t("allPosts")}
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={blogTagHref(tag)}
              aria-current={active === tag ? "page" : undefined}
              className={cn(pill, active === tag && activePill)}
            >
              {blogTags[tag][locale]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
