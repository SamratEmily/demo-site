import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import type { FaqItem } from "@/lib/types";

interface ProductFaqProps {
  items: FaqItem[];
}

/** Native <details> disclosure: keyboard accessible with no JavaScript. */
export function ProductFaq({ items }: ProductFaqProps) {
  const locale = useLocale();

  return (
    <div className="border-b">
      {items.map((item) => (
        <details key={item.question.en} className="group border-t">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            {item.question[locale]}
            <ChevronDown
              className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="max-w-prose pb-6 text-muted-foreground">{item.answer[locale]}</p>
        </details>
      ))}
    </div>
  );
}
