"use client";

import * as React from "react";

interface ChartTooltipPayloadItem {
  dataKey: string;
  name: string;
  value: number | string;
  color: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string;
}

const ChartTooltip = React.memo(function ChartTooltip({
  active,
  payload,
  label,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-border-strong bg-popover rounded-sm border px-2 py-1.5 shadow-[var(--shadow-panel)]">
      <div className="text-mono text-foreground-muted text-[10px] tracking-[0.08em] uppercase">
        {label}
      </div>
      <div className="mt-1 flex flex-col gap-0.5">
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-mono text-foreground text-[11px]">
              {entry.name}: <span className="text-foreground-muted">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export { ChartTooltip };
export type { ChartTooltipPayloadItem, ChartTooltipProps };
