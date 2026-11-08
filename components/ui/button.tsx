import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

// Customized from shadcn: every size meets the 44px minimum touch target
// (CLAUDE.md §9). Inside `surface-deep` the color tokens are remapped, so the
// same variants work on the navy bands.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] border bg-clip-padding font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] outline-none select-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover",
        outline: "border-input bg-background hover:bg-muted aria-expanded:bg-muted",
        ghost: "border-transparent hover:bg-muted aria-expanded:bg-muted",
        link: "border-transparent text-primary underline underline-offset-4 hover:decoration-2",
        /** For use on a bg-primary panel. */
        inverse:
          "border-transparent bg-primary-foreground text-primary hover:bg-primary-foreground/90",
      },
      size: {
        default: "h-11 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
