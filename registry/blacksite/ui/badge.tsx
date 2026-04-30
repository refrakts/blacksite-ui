import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm",
    "text-mono text-[10px] uppercase tracking-[0.08em] font-medium",
    "border whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      tone: {
        neutral: "bg-secondary text-foreground border-border",
        primary: "bg-primary/15 text-primary border-primary/40",
        success: "bg-success/15 text-success border-success/40",
        warning: "bg-warning/15 text-warning border-warning/40",
        danger: "bg-danger/15 text-danger border-danger/40",
        info: "bg-info/15 text-info border-info/40",
        gold: "bg-gold/15 text-gold border-gold/40",
      },
      variant: {
        soft: "",
        solid: "",
        outline: "bg-transparent",
      },
    },
    compoundVariants: [
      { variant: "solid", tone: "neutral", class: "bg-foreground/90 text-background border-foreground/90" },
      { variant: "solid", tone: "primary", class: "bg-primary text-primary-foreground border-primary" },
      { variant: "solid", tone: "success", class: "bg-success text-success-foreground border-success" },
      { variant: "solid", tone: "warning", class: "bg-warning text-warning-foreground border-warning" },
      { variant: "solid", tone: "danger", class: "bg-danger text-danger-foreground border-danger" },
      { variant: "solid", tone: "info", class: "bg-info text-info-foreground border-info" },
      { variant: "solid", tone: "gold", class: "bg-gold text-gold-foreground border-gold" },
    ],
    defaultVariants: {
      tone: "neutral",
      variant: "soft",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, tone, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
