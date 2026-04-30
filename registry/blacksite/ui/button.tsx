"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "font-medium tracking-tight",
    "transition-[background,color,border,box-shadow] duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground border border-primary/60 hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:border-border-strong hover:bg-secondary/80",
        outline:
          "bg-transparent text-foreground border border-border hover:bg-accent hover:border-border-strong",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        danger:
          "bg-danger text-danger-foreground border border-danger/60 hover:bg-danger/90 active:bg-danger/80",
        tactical:
          "bg-background-elevated text-foreground border border-border-strong text-mono uppercase tracking-[0.08em] hover:border-primary hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-7 px-2.5 text-xs rounded-sm",
        md: "h-8 px-3 text-sm rounded-sm",
        lg: "h-10 px-4 text-sm rounded-md",
        icon: "h-8 w-8 rounded-sm",
        "icon-sm": "h-7 w-7 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
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
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
