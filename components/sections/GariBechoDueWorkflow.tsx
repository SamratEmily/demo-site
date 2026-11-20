import Image from "next/image";
import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { caseStudyHref, demoRequestHref } from "@/content/navigation";
import type { Product } from "@/lib/types";

const steps = [
  {
    title: "Build today’s call list",
    description:
      "Start with Overdue to see missed installments. Use Next 3 days to decide who should get a reminder before their payment is due.",
  },
  {
    title: "Know what to ask for",
    description:
      "Check the vehicle, due date, and installment amount before calling. Sales details gives you the sale record if the buyer has a question.",
  },
  {
    title: "Record the payment and check what’s left",
    description:
      "Log the payment in Due Collection against the sale. Check the remaining balance before deciding whether another follow-up is needed.",
  },
];

export function GariBechoDueWorkflow({ product }: { product: Product }) {
  const screenshot = product.gallery?.find(({ src }) => src.endsWith("/due-alert.webp"));

  return (
    <>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-10">
        {screenshot ? (
          <figure>
            <BrowserFrame address="garibecho.com">
              <Image
                src={screenshot.src}
                width={screenshot.width}
                height={screenshot.height}
                alt="Gari Becho Due Alert showing overdue and upcoming filters, with columns for due date, installment amount, and total due."
                sizes="(min-width: 1152px) 650px, (min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full"
              />
            </BrowserFrame>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              Due Alert shows the amount due for each payment and the total due on the sale side by
              side.
            </figcaption>
          </figure>
        ) : null}

        <ol className="grid gap-5">
          {steps.map(({ title, description }, index) => (
            <li key={title} className="flex gap-4 rounded-xl border bg-background p-4 sm:p-5">
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <ButtonLink href={demoRequestHref(product.slug)}>See this workflow in a demo</ButtonLink>
        <ButtonLink href={caseStudyHref(product.slug)} variant="outline">
          Read the full dealership walkthrough
        </ButtonLink>
      </div>
    </>
  );
}
