import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 px-1.5 h-5 rounded-[2px]",
    "text-mono text-[10px] uppercase tracking-[0.1em] font-semibold",
    "border whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      status: {
        active: "bg-success/15 text-success border-success/40",
        idle: "bg-foreground/10 text-foreground-muted border-border-strong",
        offline: "bg-foreground/5 text-foreground-subtle border-border",
        new: "bg-danger/15 text-danger border-danger/40",
        high: "bg-warning/15 text-warning border-warning/40",
        critical: "bg-danger/20 text-danger border-danger/60",
        compromised: "bg-danger/15 text-danger border-danger/40",
        nominal: "bg-info/15 text-info border-info/40",
        warning: "bg-warning/15 text-warning border-warning/40",
        secured: "bg-primary/15 text-primary border-primary/40",
      },
      pulse: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      status: "active",
      pulse: false,
    },
  },
);

const dotColor: Record<string, string> = {
  active: "bg-success",
  idle: "bg-foreground-muted",
  offline: "bg-foreground-subtle",
  new: "bg-danger",
  high: "bg-warning",
  critical: "bg-danger",
  compromised: "bg-danger",
  nominal: "bg-info",
  warning: "bg-warning",
  secured: "bg-primary",
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  /** Show a leading dot indicator. */
  dot?: boolean;
  children?: React.ReactNode;
}

function StatusBadge({
  className,
  status = "active",
  pulse,
  dot = true,
  children,
  ...props
}: StatusBadgeProps) {
  const key = status ?? "active";
  return (
    <span className={cn(statusBadgeVariants({ status, pulse }), className)} {...props}>
      {dot && (
        <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
          <span className={cn("absolute inset-0 rounded-full", dotColor[key])} />
          {pulse && (
            <span
              className={cn(
                "absolute inset-0 rounded-full animate-ping opacity-60",
                dotColor[key],
              )}
            />
          )}
        </span>
      )}
      <span>{children ?? key.toUpperCase()}</span>
    </span>
  );
}

export { StatusBadge, statusBadgeVariants };
