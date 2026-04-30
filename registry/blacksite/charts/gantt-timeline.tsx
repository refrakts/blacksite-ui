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

const GanttTimeline = React.forwardRef<HTMLDivElement, GanttTimelineProps>(
  (
    {
      className,
      columns,
      tasks,
      nowAt,
      rowHeight = 28,
      labelWidth = 160,
      ...props
    },
    ref,
  ) => {
    const cols = Math.max(columns.length, 1);

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-x-auto border-t border-border",
          className,
        )}
        {...props}
      >
        {/* Header row */}
        <div
          className="grid border-b border-border bg-background-elevated/60"
          style={{
            gridTemplateColumns: `${labelWidth}px repeat(${cols}, minmax(72px, 1fr))`,
          }}
        >
          <div className="h-7" />
          {columns.map((c) => (
            <div
              key={c}
              className="h-7 border-l border-border/60 px-2 flex items-center text-mono text-[10px] uppercase tracking-[0.08em] text-foreground-muted"
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
                className="border-b border-border/60 px-2 flex items-center text-mono text-[11px] uppercase tracking-[0.06em] text-foreground"
                style={{ height: rowHeight }}
              >
                {task.label}
              </div>
              <div
                className="relative col-span-full border-b border-border/60"
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
                    <div key={i} className="border-l border-border/30 first:border-l-0" />
                  ))}
                </div>
                {/* Bar */}
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-4 rounded-[2px] border",
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
              className="absolute top-0 bottom-0 w-px bg-foreground/40 pointer-events-none"
              style={{
                left: `calc(${labelWidth}px + ((100% - ${labelWidth}px) * ${clamp(nowAt, 0, cols) / cols}))`,
              }}
            >
              <div className="absolute -top-1 -left-1 size-2 rounded-full bg-foreground/70" />
            </div>
          )}
        </div>
      </div>
    );
  },
);
GanttTimeline.displayName = "GanttTimeline";

export { GanttTimeline };
