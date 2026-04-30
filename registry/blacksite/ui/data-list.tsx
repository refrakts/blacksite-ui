import * as React from "react";

import { cn } from "@/lib/utils";
import { StatusBadge, type StatusBadgeProps } from "@/registry/blacksite/ui/status-badge";

export interface DataListItem {
  id: string;
  label: React.ReactNode;
  value?: React.ReactNode;
  status?: StatusBadgeProps["status"];
  statusLabel?: string;
}

interface DataListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DataListItem[];
  /** Compact rows are 24px, default rows are 28px. */
  density?: "default" | "compact";
  /** Right-align values (typical for KPIs). */
  alignValues?: "left" | "right";
}

const DataList = React.forwardRef<HTMLDivElement, DataListProps>(
  ({ className, items, density = "default", alignValues = "right", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col divide-y divide-border/60", className)}
        {...props}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-2",
              density === "compact" ? "h-6 text-[11px]" : "h-7 text-xs",
            )}
          >
            <span className="text-foreground-muted truncate flex-1">{item.label}</span>
            <div
              className={cn(
                "flex items-center gap-2 shrink-0",
                alignValues === "right" ? "justify-end" : "justify-start",
              )}
            >
              {item.value !== undefined && (
                <span className="text-foreground text-mono">{item.value}</span>
              )}
              {item.status && <StatusBadge status={item.status}>{item.statusLabel}</StatusBadge>}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
DataList.displayName = "DataList";

export { DataList };
