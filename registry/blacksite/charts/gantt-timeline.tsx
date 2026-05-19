"use client";

import * as React from "react";

import { cn, clamp } from "@/lib/utils";

export interface GanttTask {
  id: string;
  label: string;
  /** Start position in 0..columns range (inclusive). */
  start: number;
  /** End position in 0..columns range (exclusive). end > start. */
  end: number;
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "gold" | "neutral";
  /** Optional dependency task IDs — drawn as connector arrows. */
  dependsOn?: string[];
}

interface GanttTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column labels rendered along the X axis. */
  columns: string[];
  tasks: GanttTask[];
  /** Optional vertical "now" line at column index (can be fractional). */
  nowAt?: number;
  /** Row height in px. */
  rowHeight?: number;
  /** Width of the leading label column in px. */
  labelWidth?: number;
}

const toneToBg: Record<NonNullable<GanttTask["tone"]>, string> = {
  primary: "bg-primary/70 border-primary",
  success: "bg-success/70 border-success",
  warning: "bg-warning/70 border-warning",
  danger: "bg-danger/70 border-danger",
  info: "bg-info/70 border-info",
  gold: "bg-gold/70 border-gold",
  neutral: "bg-foreground/40 border-foreground/60",
};

const GanttTimeline = React.memo(
  React.forwardRef<HTMLDivElement, GanttTimelineProps>(
    ({ className, columns, tasks, nowAt, rowHeight = 28, labelWidth = 160, ...props }, ref) => {
      const cols = Math.max(columns.length, 1);

      return (
        <div
          ref={ref}
          className={cn("border-border relative overflow-x-auto border-t", className)}
          {...props}
        >
          {/* Header row */}
          <div
            className="border-border bg-background-elevated/60 grid border-b"
            style={{
              gridTemplateColumns: `${labelWidth}px repeat(${cols}, minmax(72px, 1fr))`,
            }}
          >
            <div className="h-7" />
            {columns.map((c) => (
              <div
                key={c}
                className="border-border/60 text-mono text-foreground-muted flex h-7 items-center border-l px-2 text-[10px] tracking-[0.08em] uppercase"
              >
                {c}
              </div>
            ))}
          </div>

          {/* Body */}
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `${labelWidth}px repeat(${cols}, minmax(72px, 1fr))`,
            }}
          >
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <div
                  className="border-border/60 text-mono text-foreground flex items-center border-b px-2 text-[11px] tracking-[0.06em] uppercase"
                  style={{ height: rowHeight }}
                >
                  {task.label}
                </div>
                <div
                  className="border-border/60 relative col-span-full border-b"
                  style={{
                    gridColumn: `2 / span ${cols}`,
                    height: rowHeight,
                  }}
                >
                  {/* Column tick lines */}
                  <div
                    className="absolute inset-0 grid"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                  >
                    {columns.map((_, i) => (
                      <div key={i} className="border-border/30 border-l first:border-l-0" />
                    ))}
                  </div>
                  {/* Bar */}
                  <div
                    className={cn(
                      "absolute top-1/2 h-4 -translate-y-1/2 rounded-[2px] border",
                      toneToBg[task.tone ?? "primary"],
                    )}
                    style={{
                      left: `${(clamp(task.start, 0, cols) / cols) * 100}%`,
                      width: `${(Math.max(task.end - task.start, 0.25) / cols) * 100}%`,
                    }}
                    title={task.label}
                  />
                </div>
              </React.Fragment>
            ))}

            {/* "Now" line */}
            {typeof nowAt === "number" && (
              <div
                aria-hidden="true"
                className="bg-foreground/40 pointer-events-none absolute top-0 bottom-0 w-px"
                style={{
                  left: `calc(${labelWidth}px + ((100% - ${labelWidth}px) * ${clamp(nowAt, 0, cols) / cols}))`,
                }}
              >
                <div className="bg-foreground/70 absolute -top-1 -left-1 size-2 rounded-full" />
              </div>
            )}
          </div>
        </div>
      );
    },
  ),
);
GanttTimeline.displayName = "GanttTimeline";

export { GanttTimeline };
