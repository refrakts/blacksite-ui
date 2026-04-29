"use client";

import * as React from "react";
import {
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

export interface BarChartSeries {
  key: string;
  label?: string;
  color?: string;
  stackId?: string;
}

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<Record<string, number | string>>;
  series: BarChartSeries[];
  xKey?: string;
  height?: number;
  showLegend?: boolean;
}

const DEFAULT_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-sm border border-border-strong bg-popover px-2 py-1.5 shadow-[var(--shadow-panel)]">
      <div className="text-mono text-[10px] uppercase tracking-[0.08em] text-foreground-muted">
        {label}
      </div>
      <div className="flex flex-col gap-0.5 mt-1">
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-[1px]" style={{ backgroundColor: entry.color }} />
            <span className="text-mono text-[11px] text-foreground">
              {entry.name}: <span className="text-foreground-muted">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  ({ className, data, series, xKey = "x", height = 220, showLegend = false, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} style={{ height }} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 0 }} barCategoryGap="20%">
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="hsl(var(--foreground-subtle))"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "hsl(var(--foreground-muted))" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              stroke="hsl(var(--foreground-subtle))"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "hsl(var(--foreground-muted))" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              width={36}
            />
            <Tooltip cursor={{ fill: "hsl(var(--accent) / 0.4)" }} content={<ChartTooltip />} />
            {showLegend && (
              <Legend
                wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}
                iconType="square"
                iconSize={8}
              />
            )}
            {series.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label ?? s.key}
                fill={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                stackId={s.stackId}
                radius={[1, 1, 0, 0]}
              />
            ))}
          </RBarChart>
        </ResponsiveContainer>
      </div>
    );
  },
);
BarChart.displayName = "BarChart";

export { BarChart };
