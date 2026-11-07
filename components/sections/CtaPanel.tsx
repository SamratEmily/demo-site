import type { ComponentProps } from "react";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { Container } from "@/components/shared/Container";

interface CtaPanelProps {
  id: string;
  title: string;
  body?: string;
  action: { href: ComponentProps<typeof ButtonLink>["href"]; label: string };
}

/** Closing call to action: one solid panel, one button. */
export function CtaPanel({ id, title, body, action }: CtaPanelProps) {
  return (
    <section aria-labelledby={id} className="py-16 lg:py-24">
      <Container>
        <div className="relative isolate flex flex-col gap-8 overflow-hidden rounded-2xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div
            aria-hidden
            className="absolute -top-40 -right-40 -z-10 size-96 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--brand-amber)_30%,transparent),transparent)]"
          />
          <div className="max-w-2xl">
            <h2 id={id} className="text-h2">
              {title}
            </h2>
            {body ? <p className="mt-4 text-lead">{body}</p> : null}
          </div>
          <ButtonLink
            href={action.href}
            size="lg"
            variant="inverse"
            className="self-start lg:self-auto"
          >
            {action.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
