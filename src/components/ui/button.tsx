import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xs text-sm font-semibold transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-[var(--duration-normal)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 interactive-press",
  {
    variants: {
      variant: {
        default:
          "bg-accent-gradient text-text-on-dark shadow-elevation hover:brightness-105 hover:shadow-elevation-active",
        destructive:
          "bg-red-600 text-white hover:bg-red-600/90",
        outline:
          "border border-border-light bg-surface-card-light text-text-heading-light hover:border-accent-primary/40",
        secondary:
          "bg-surface-muted text-text-heading-light hover:bg-surface-muted/80",
        ghost:
          "text-text-heading-light hover:bg-surface-muted",
        link:
          "text-accent-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xs px-3",
        lg: "h-11 rounded-xs px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
