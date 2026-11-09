import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/sections/BlogListing";
import { BlogPostView } from "@/components/sections/BlogPostView";
import { blogTags } from "@/content/blog-tags";
import { blogPage } from "@/content/pages";
import { prefixedLocales, routing } from "@/i18n/routing";
import { blogPaths, getPosts, resolveBlogPath, usedTags } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

/**
 * One route for /blog/, /blog/<post>/ and /blog/tags/<tag>/. See blogPaths()
 * in lib/blog.ts for why these share a route.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.flatMap((locale) => blogPaths().map((path) => ({ locale, path })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[[...path]]">): Promise<Metadata> {
  const { locale, path } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const route = resolveBlogPath(path, locale);
  const t = await getTranslations({ locale, namespace: "blog" });

  switch (route?.kind) {
    case "index":
      return pageMetadata({
        locale,
        path: "/blog",
        title: blogPage.title[locale],
        description: blogPage.metaDescription[locale],
      });
    case "tag": {
      const label = blogTags[route.tag][locale];
      return pageMetadata({
        locale,
        path: `/blog/tags/${route.tag}`,
        title: t("tagTitle", { tag: label }),
        description: t("tagIntro", { tag: label }),
      });
    }
    case "post": {
      const { meta, slug } = route.post;
      return pageMetadata({
        locale,
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
          tags: meta.tags.map((tag) => blogTags[tag][locale]),
        },
      });
    }
    default:
      return {};
  }
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog/[[...path]]">) {
  const { locale, path } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const route = resolveBlogPath(path, locale);
  if (!route) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  if (route.kind === "post") return <BlogPostView post={route.post} />;

  const tag = route.kind === "tag" ? route.tag : undefined;
  const label = tag ? blogTags[tag][locale] : undefined;
  return (
    <BlogListing
      title={label ? t("tagTitle", { tag: label }) : blogPage.title[locale]}
      intro={label ? t("tagIntro", { tag: label }) : blogPage.intro[locale]}
      posts={getPosts(locale).filter((post) => !tag || post.meta.tags.includes(tag))}
      tags={usedTags()}
      activeTag={tag}
      emptyText={t(tag ? "emptyTag" : "empty")}
    />
  );
}
