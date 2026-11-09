import { cn } from "@/lib/utils";

interface TechListProps {
  items: string[];
  className?: string;
}

/** Technology names as small code-style tags. Names stay in English. */
export function TechList({ items, className }: TechListProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border bg-background px-2.5 py-1 font-mono text-sm text-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
