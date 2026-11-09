import type { Feature } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ContentIcon } from "./ContentIcon";

interface FeatureListProps {
  features: Feature[];
  className?: string;
}

/** Features as a two-column spec sheet of ruled rows. */
export function FeatureList({ features, className }: FeatureListProps) {
  return (
    <dl className={cn("grid gap-x-12 sm:grid-cols-2", className)}>
      {features.map((feature) => (
        <div key={feature.title} className="border-t py-5">
          <dt className="flex items-center gap-3 font-semibold">
            <ContentIcon name={feature.icon} className="size-5 shrink-0 text-primary" />
            {feature.title}
          </dt>
          <dd className="mt-1 pl-8 text-muted-foreground">{feature.description}</dd>
        </div>
      ))}
    </dl>
  );
}
