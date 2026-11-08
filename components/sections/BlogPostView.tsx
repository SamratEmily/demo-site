import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Container } from "@/components/shared/Container";
import { JsonLd } from "@/components/shared/JsonLd";
import { MdxContent } from "@/components/shared/MdxContent";
import { Section } from "@/components/shared/Section";
import { blogTags } from "@/content/blog-tags";
import { blogHref, blogPostHref, blogTagHref, quoteHref } from "@/content/navigation";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { relatedPosts } from "@/lib/blog";
import { pageUrl } from "@/lib/seo";
import { breadcrumbJsonLd, organizationRef } from "@/lib/structured-data";
import type { BlogPost } from "@/lib/types";
import { CtaPanel } from "./CtaPanel";
import { PostList } from "./PostList";
import { PostMeta } from "./PostMeta";
import { TableOfContents } from "./TableOfContents";

interface BlogPostViewProps {
  post: BlogPost;
}

function postJsonLd(post: BlogPost, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.summary,
    datePublished: post.meta.date,
    dateModified: post.meta.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: post.meta.author, url: site.url },
    publisher: organizationRef,
    mainEntityOfPage: pageUrl(locale, blogPostHref(post.slug)),
    ...(post.meta.tags.length > 0
      ? { keywords: post.meta.tags.map((tag) => blogTags[tag][locale]) }
      : {}),
    ...(post.meta.cover ? { image: `${site.url}${post.meta.cover.src}` } : {}),
  };
}

/** A blog post: header with cover, table of contents, body, related posts. */
export function BlogPostView({ post }: BlogPostViewProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { meta } = post;
  const related = relatedPosts(post, locale);

  return (
    <>
      <JsonLd data={postJsonLd(post, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t("nav.blog"), path: blogHref },
          { name: meta.title, path: blogPostHref(post.slug) },
        ])}
      />
      <article aria-labelledby="post-title">
        <header className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-56 -left-56 -z-10 size-[36rem] bg-[radial-gradient(closest-side,var(--beam),transparent)]"
          />
          <Container className="pt-10 lg:pt-16">
            <Breadcrumbs items={[{ label: t("nav.blog"), href: "/blog" }, { label: meta.title }]} />
            <ul className="mt-6 flex flex-wrap gap-x-4">
              {meta.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={blogTagHref(tag)}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {blogTags[tag][locale]}
                  </Link>
                </li>
              ))}
            </ul>
            <h1 id="post-title" className="mt-2 max-w-4xl text-h1">
              {meta.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-muted-foreground">{meta.summary}</p>
            <PostMeta post={post} className="mt-6" />
            {meta.cover ? (
              <Image
                src={meta.cover.src}
                width={meta.cover.width}
                height={meta.cover.height}
                alt={meta.cover.alt}
                preload
                fetchPriority="high"
                loading="eager"
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="mt-10 aspect-video w-full rounded-2xl bg-surface-muted object-cover"
              />
            ) : null}
          </Container>
        </header>

        <Container className="py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <TableOfContents
              items={post.toc}
              className="lg:sticky lg:top-24 lg:order-last lg:self-start"
            />
            <MdxContent source={post.body} />
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <Section labelledBy="related-title" tone="muted">
          <h2 id="related-title" className="text-h2">
            {t("blog.related")}
          </h2>
          <div className="mt-8">
            <PostList posts={related} headingLevel="h3" compact />
          </div>
        </Section>
      ) : null}

      <CtaPanel
        id="post-cta-title"
        title={t("blog.ctaTitle")}
        body={t("blog.ctaBody")}
        action={{ href: quoteHref, label: t("nav.contact") }}
      />
    </>
  );
}
