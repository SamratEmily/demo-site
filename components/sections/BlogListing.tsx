import { useTranslations } from "next-intl";
import { Container } from "@/components/shared/Container";
import { quoteHref } from "@/content/navigation";
import type { BlogPost } from "@/lib/types";
import { CtaPanel } from "./CtaPanel";
import { PageHeader } from "./PageHeader";
import { PostList } from "./PostList";
import { TagLinks } from "./TagLinks";

interface BlogListingProps {
  title: string;
  intro: string;
  posts: BlogPost[];
  tags: string[];
  activeTag?: string;
  emptyText: string;
}

/** Shared layout of the blog index and the tag pages. */
export function BlogListing({ title, intro, posts, tags, activeTag, emptyText }: BlogListingProps) {
  const t = useTranslations();

  return (
    <>
      <PageHeader id="blog-title" title={title} intro={intro}>
        <div className="mt-8">
          <TagLinks tags={tags} active={activeTag} />
        </div>
      </PageHeader>
      <Container className="pb-8">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="max-w-2xl border-t pt-8 text-lead">{emptyText}</p>
        )}
      </Container>
      <CtaPanel
        id="blog-cta-title"
        title={t("blog.ctaTitle")}
        body={t("blog.ctaBody")}
        action={{ href: quoteHref, label: t("nav.contact") }}
      />
    </>
  );
}
