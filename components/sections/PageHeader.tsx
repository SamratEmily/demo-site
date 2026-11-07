import type { ReactNode } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface PageHeaderProps {
  /** Id of the page's h1. */
  id: string;
  title: string;
  intro?: string;
  /** Extra content under the intro, e.g. breadcrumbs or in-page links. */
  children?: ReactNode;
}

/** Top of an inner page: the h1, a short intro and the beacon glow. */
export function PageHeader({ id, title, intro, children }: PageHeaderProps) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-56 -left-56 -z-10 size-[36rem] bg-[radial-gradient(closest-side,var(--beam),transparent)]"
      />
      <Container className="pt-16 pb-10 lg:pt-24">
        <SectionHeading id={id} level="h1" title={title} intro={intro} />
        {children}
      </Container>
    </section>
  );
}
