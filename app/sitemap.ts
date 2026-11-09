import type { MetadataRoute } from "next";
import {
  blogHref,
  blogPostHref,
  blogTagHref,
  caseStudyHref,
  productHref,
} from "@/content/navigation";
import { getPosts, usedTags } from "@/lib/blog";
import { caseStudySlugs } from "@/lib/case-studies";
import { products } from "@/lib/products";
import { pageUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /sitemap.xml, generated at build time: every public page. Draft posts are
 * left out (getPosts skips them in production) and /admin is never listed.
 */
function entries(path: string, lastModified?: string): MetadataRoute.Sitemap {
  return [{ url: pageUrl(path), ...(lastModified ? { lastModified } : {}) }];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/products", "/services", "/case-studies", "/about", "/careers", "/contact"];
  const posts = getPosts();

  return [
    ...pages.flatMap((path) => entries(path)),
    ...products.flatMap((p) => entries(productHref(p.slug))),
    ...caseStudySlugs.flatMap((slug) => entries(caseStudyHref(slug))),
    ...entries(blogHref, posts[0]?.meta.date),
    ...posts.flatMap((post) => entries(blogPostHref(post.slug), post.meta.date)),
    ...usedTags().flatMap((tag) => entries(blogTagHref(tag))),
  ];
}
