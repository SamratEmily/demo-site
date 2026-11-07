import { evaluate } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { slugify } from "@/lib/utils";

interface MdxContentProps {
  source: string;
}

/** Heading id from its plain text, matching the table of contents in lib/blog.ts. */
function headingId(children: ReactNode): string | undefined {
  return typeof children === "string" ? slugify(children) || undefined : undefined;
}

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="font-medium text-primary underline underline-offset-4 hover:no-underline focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none"
    >
      {children}
    </a>
  );
}

/** Long-form text styles for MDX bodies; no client JavaScript. */
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 id={headingId(children)} className="mt-14 scroll-mt-24 text-h2 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={headingId(children)} className="mt-10 scroll-mt-24 text-h3">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-5">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-5 flex list-disc flex-col gap-2 pl-6 marker:text-primary">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 flex list-decimal flex-col gap-2 pl-6 marker:text-muted-foreground">
      {children}
    </ol>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  a: MdxLink,
};

/** Compiles MDX at build time and renders it as static HTML. */
export async function MdxContent({ source }: MdxContentProps) {
  const { default: Content } = await evaluate(source, { ...runtime });
  return (
    <div className="max-w-prose text-lead leading-relaxed">
      <Content components={components} />
    </div>
  );
}
