"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RLineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";

export interface LineChartSeries {
  key: string;
  label?: string;
  color?: string;
  strokeDasharray?: string;
}

export interface LineChartThreshold {
  value: number;
  label?: string;
  tone?: "danger" | "warning" | "info" | "success";
}

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<Record<string, number | string>>;
  series: LineChartSeries[];
  xKey?: string;
  xLabel?: string;
  yLabel?: string;
  thresholds?: LineChartThreshold[];
  height?: number;
  /** Curve interpolation. Defaults to "monotone". */
  curve?: "linear" | "monotone" | "step";
}

const TONE_TO_VAR: Record<NonNullable<LineChartThreshold["tone"]>, string> = {
  danger: "var(--color-danger)",
  warning: "var(--color-warning)",
  info: "var(--color-info)",
  success: "var(--color-success)",
};

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
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-mono text-[11px] text-foreground">
              {entry.name}: <span className="text-foreground-muted">{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      className,
      data,
      series,
      xKey = "x",
      xLabel,
      yLabel,
      thresholds,
      height = 220,
      curve = "monotone",
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("w-full", className)} style={{ height }} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <RLineChart data={data} margin={{ top: 8, right: 12, bottom: 16, left: 0 }}>
            <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="hsl(var(--foreground-subtle))"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "hsl(var(--foreground-muted))" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              label={
                xLabel
                  ? {
                      value: xLabel,
                      position: "insideBottom",
                      offset: -8,
                      fill: "hsl(var(--foreground-muted))",
                      style: { fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" },
                    }
                  : undefined
              }
            />
            <YAxis
              stroke="hsl(var(--foreground-subtle))"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "hsl(var(--foreground-muted))" }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              width={40}
              label={
                yLabel
                  ? {
                      value: yLabel,
                      angle: -90,
                      position: "insideLeft",
                      offset: 12,
                      fill: "hsl(var(--foreground-muted))",
                      style: { fontFamily: "var(--font-mono)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" },
                    }
                  : undefined
              }
            />
            <Tooltip cursor={{ stroke: "hsl(var(--border-strong))" }} content={<ChartTooltip />} />
            {thresholds?.map((t, i) => (
              <ReferenceLine
                key={i}
                y={t.value}
                stroke={TONE_TO_VAR[t.tone ?? "danger"]}
                strokeDasharray="4 4"
                strokeOpacity={0.8}
                label={
                  t.label
                    ? {
                        value: t.label,
                        position: "insideTopLeft",
                        fill: TONE_TO_VAR[t.tone ?? "danger"],
                        style: {
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        },
                      }
                    : undefined
                }
              />
            ))}
            {series.map((s, i) => (
              <Line
                key={s.key}
                type={curve}
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
                strokeDasharray={s.strokeDasharray}
                strokeWidth={1.5}
                dot={{ r: 2, strokeWidth: 0, fill: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] }}
                activeDot={{ r: 3 }}
              />
            ))}
          </RLineChart>
        </ResponsiveContainer>
      </div>
    );
  },
);
LineChart.displayName = "LineChart";

export { LineChart };
