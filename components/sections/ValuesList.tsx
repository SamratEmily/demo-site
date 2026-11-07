import { useLocale } from "next-intl";
import { ContentIcon } from "@/components/shared/ContentIcon";
import type { CompanyValue } from "@/lib/types";

interface ValuesListProps {
  values: CompanyValue[];
}

/** Values as ruled rows: name on the left, what it means in practice on the right. */
export function ValuesList({ values }: ValuesListProps) {
  const locale = useLocale();

  return (
    <dl className="border-b">
      {values.map((value) => (
        <div
          key={value.title.en}
          className="grid gap-2 border-t py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-8"
        >
          <dt className="flex items-center gap-3 text-h3 font-semibold">
            <ContentIcon name={value.icon} className="size-6 shrink-0 text-primary" />
            {value.title[locale]}
          </dt>
          <dd className="pl-9 text-muted-foreground md:pl-0">{value.description[locale]}</dd>
        </div>
      ))}
    </dl>
  );
}
