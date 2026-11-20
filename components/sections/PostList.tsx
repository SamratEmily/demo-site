import Image from "next/image";
import { blogTags } from "@/content/blog-tags";
import { blogPostHref } from "@/content/navigation";
import Link from "next/link";
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

/** Post rows share a left text edge, with optional covers on the right on wider screens. */
export function PostList({ posts, headingLevel = "h2", compact = false }: PostListProps) {
  const Heading = headingLevel;

  return (
    <ul className={cn("border-b", compact && "grid gap-x-8 border-b-0 md:grid-cols-3")}>
      {posts.map((post) => (
        <li key={post.slug} className="border-t">
          <article
            className={cn(
              "group relative grid items-start gap-6 py-8",
              !compact &&
                post.meta.cover &&
                "sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:gap-8",
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
                className={cn(
                  "aspect-video w-full rounded-lg bg-surface-muted object-cover",
                  !compact && "sm:order-last",
                )}
              />
            ) : null}
            <div className={cn(!compact && "max-w-3xl")}>
              <PostMeta post={post} showAuthor={false} />
              <Heading className={cn("mt-2", compact ? "text-h3" : "text-h2")}>
                <Link
                  href={blogPostHref(post.slug)}
                  className="group-hover:underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-3 focus-visible:after:ring-ring"
                >
                  {post.meta.title}
                </Link>
              </Heading>
              {compact ? null : (
                <>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{post.meta.summary}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {post.meta.tags.map((tag) => blogTags[tag]).join(" · ")}
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
