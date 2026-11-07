import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

/** A locale-aware internal link styled as a button. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
