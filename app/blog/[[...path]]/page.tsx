import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/sections/BlogListing";
import { BlogPostView } from "@/components/sections/BlogPostView";
import { blogTags } from "@/content/blog-tags";
import { blogPage } from "@/content/pages";
import { blogPaths, getPosts, resolveBlogPath, usedTags } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

/**
 * One route for /blog/, /blog/<post>/ and /blog/tags/<tag>/. See blogPaths()
 * in lib/blog.ts for why these share a route.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPaths().map((path) => ({ path }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[[...path]]">): Promise<Metadata> {
  const { path } = await params;
  const route = resolveBlogPath(path);
  const t = await getTranslations("blog");

  switch (route?.kind) {
    case "index":
      return pageMetadata({
        path: "/blog",
        title: blogPage.title,
        description: blogPage.metaDescription,
      });
    case "tag": {
      const label = blogTags[route.tag];
      return pageMetadata({
        path: `/blog/tags/${route.tag}`,
        title: t("tagTitle", { tag: label }),
        description: t("tagIntro", { tag: label }),
      });
    }
    case "post": {
      const { meta, slug } = route.post;
      return pageMetadata({
        path: `/blog/${slug}`,
        title: meta.title,
        description: meta.summary,
        image: meta.cover
          ? {
              url: meta.cover.src,
              width: meta.cover.width,
              height: meta.cover.height,
              alt: meta.title,
            }
          : undefined,
        article: {
          publishedTime: meta.date,
          authors: [meta.author],
          tags: meta.tags.map((tag) => blogTags[tag]),
        },
      });
    }
    default:
      return {};
  }
}

export default async function BlogPage({ params }: PageProps<"/blog/[[...path]]">) {
  const { path } = await params;
  const route = resolveBlogPath(path);
  if (!route) notFound();
  const t = await getTranslations("blog");

  if (route.kind === "post") return <BlogPostView post={route.post} />;

  const tag = route.kind === "tag" ? route.tag : undefined;
  const label = tag ? blogTags[tag] : undefined;
  return (
    <BlogListing
      title={label ? t("tagTitle", { tag: label }) : blogPage.title}
      intro={label ? t("tagIntro", { tag: label }) : blogPage.intro}
      posts={getPosts().filter((post) => !tag || post.meta.tags.includes(tag))}
      tags={usedTags()}
      activeTag={tag}
      emptyText={t(tag ? "emptyTag" : "empty")}
    />
  );
}
