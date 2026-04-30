import * as React from "react";

import { cn, clamp } from "@/lib/utils";
import { StatusBadge, type StatusBadgeProps } from "@/registry/blacksite/ui/status-badge";
import { Progress } from "@/registry/blacksite/ui/progress";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  status?: StatusBadgeProps["status"];
  statusLabel?: string;
  /** Progress / integrity value 0–100. */
  progress?: number;
  progressTone?: "primary" | "success" | "warning" | "danger" | "info" | "gold" | "neutral";
  /** Text color tone for the value. */
  valueTone?: "default" | "success" | "warning" | "danger" | "info" | "primary" | "gold";
}

const valueToneClass: Record<NonNullable<StatCardProps["valueTone"]>, string> = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
  primary: "text-primary",
  gold: "text-gold",
};

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      label,
      value,
      status,
      statusLabel,
      progress,
      progressTone = "primary",
      valueTone = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 rounded-md border border-border bg-card px-3 py-2.5",
          "shadow-[var(--shadow-panel)]",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted truncate">
            {label}
          </span>
          {status && <StatusBadge status={status}>{statusLabel}</StatusBadge>}
        </div>
        <div
          className={cn(
            "text-xl font-semibold tracking-tight leading-tight",
            valueToneClass[valueTone],
          )}
        >
          {value}
        </div>
        {typeof progress === "number" && (
          <Progress value={clamp(progress, 0, 100)} tone={progressTone} size="xs" />
        )}
      </div>
    );
  },
);
StatCard.displayName = "StatCard";

export { StatCard };
