import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckListProps {
  items: string[];
  className?: string;
}

export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
