import { useTranslations } from "next-intl";
import type { BlogPost } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

interface PostMetaProps {
  post: BlogPost;
  showAuthor?: boolean;
  className?: string;
}

/** Date · reading time · author, with a draft notice in development. */
export function PostMeta({ post, showAuthor = true, className }: PostMetaProps) {
  const t = useTranslations("blog");
  const parts = [
    <time key="date" dateTime={post.meta.date}>
      {formatDate(post.meta.date)}
    </time>,
    <span key="time">{t("readingTime", { minutes: post.readingMinutes })}</span>,
    showAuthor ? <span key="author">{t("by", { author: post.meta.author })}</span> : null,
  ].filter(Boolean);

  return (
    <p
      className={cn("flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground", className)}
    >
      {post.meta.draft ? (
        <span className="mr-1 rounded-full border border-brand-amber px-2 py-0.5 text-xs font-medium text-foreground">
          {t("draft")}
        </span>
      ) : null}
      {parts.map((part, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 ? <span aria-hidden>·</span> : null}
          {part}
        </span>
      ))}
    </p>
  );
}
