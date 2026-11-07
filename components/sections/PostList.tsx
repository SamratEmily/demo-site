import { useLocale } from "next-intl";
import Image from "next/image";
import { blogTags } from "@/content/blog-tags";
import { blogPostHref } from "@/content/navigation";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PostMeta } from "./PostMeta";

interface PostListProps {
  posts: BlogPost[];
  /** Heading level of each post title. */
  headingLevel?: "h2" | "h3";
  /** Smaller layout for "Related posts". */
  compact?: boolean;
}

/** Posts as rows: cover on the left, title, summary and meta on the right. */
export function PostList({ posts, headingLevel = "h2", compact = false }: PostListProps) {
  const locale = useLocale();
  const Heading = headingLevel;

  return (
    <ul className={cn("border-b", compact && "grid gap-x-8 border-b-0 md:grid-cols-3")}>
      {posts.map((post) => (
        <li key={post.slug} className="border-t">
          <article
            className={cn(
              "group relative grid gap-6 py-8",
              !compact && "sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] sm:gap-8",
            )}
          >
            {post.meta.cover ? (
              <Image
                src={post.meta.cover.src}
                width={post.meta.cover.width}
                height={post.meta.cover.height}
                alt=""
                loading="lazy"
                sizes="(min-width: 640px) 256px, 100vw"
                className="aspect-video w-full rounded-lg bg-surface-muted object-cover"
              />
            ) : null}
            <div>
              <PostMeta post={post} showAuthor={false} />
              <Heading className={cn("mt-2", compact ? "text-h3" : "text-h2")}>
                <Link
                  href={blogPostHref(post.slug)}
                  className="group-hover:underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-3 focus-visible:after:ring-ring/60"
                >
                  {post.meta.title}
                </Link>
              </Heading>
              {compact ? null : (
                <>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{post.meta.summary}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {post.meta.tags.map((tag) => blogTags[tag][locale]).join(" · ")}
                  </p>
                </>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
