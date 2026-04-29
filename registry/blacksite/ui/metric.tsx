import * as React from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Numerical delta. Positive renders green, negative red, 0 neutral. */
  delta?: number;
  /** Format the delta as a percent (appends %). */
  deltaUnit?: "%" | "abs";
  /** Reverse delta semantics — positive = bad, negative = good. */
  invertDelta?: boolean;
  hint?: React.ReactNode;
}

function Metric({
  className,
  label,
  value,
  delta,
  deltaUnit = "%",
  invertDelta = false,
  hint,
  ...props
}: MetricProps) {
  const hasDelta = typeof delta === "number";
  const sign = hasDelta && delta !== 0 ? (delta > 0 ? 1 : -1) : 0;
  const tone =
    sign === 0
      ? "text-foreground-muted"
      : (sign > 0) !== invertDelta
        ? "text-success"
        : "text-danger";
  const Arrow = sign === 0 ? ArrowRight : sign > 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <span className="text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-semibold tracking-tight leading-none">{value}</span>
        {hasDelta && (
          <span className={cn("inline-flex items-center gap-0.5 text-mono text-[11px]", tone)}>
            <Arrow className="size-3" />
            {Math.abs(delta!)}
            {deltaUnit === "%" ? "%" : ""}
          </span>
        )}
      </div>
      {hint && <span className="text-mono text-[10px] text-foreground-subtle">{hint}</span>}
    </div>
  );
}

export { Metric };
