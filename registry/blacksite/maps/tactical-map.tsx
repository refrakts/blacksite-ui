"use client";

import * as React from "react";
import { MapPin, Plus, Maximize2, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { StatusBadge, type StatusBadgeProps } from "@/registry/blacksite/ui/status-badge";

export interface MapMarker {
  id: string;
  label?: string;
  /** Position in 0..1 normalised coordinates. */
  x: number;
  y: number;
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "gold" | "neutral";
  status?: StatusBadgeProps["status"];
  /** Render as a pin (default) or triangle. */
  shape?: "pin" | "triangle" | "square";
}

export interface MapZone {
  id: string;
  /** Polygon points in normalised 0..1 coordinates. */
  points: Array<[number, number]>;
  label?: string;
  tone?: "primary" | "warning" | "danger" | "info" | "gold";
  /** Style of the zone outline. */
  variant?: "dashed" | "solid";
}

interface TacticalMapProps extends React.HTMLAttributes<HTMLDivElement> {
  markers?: MapMarker[];
  zones?: MapZone[];
  /**
   * Aspect ratio, e.g. "4 / 3" or "16 / 9". Pass `null` (or omit) to let the
   * map fill its parent — useful when the map is inside a flex container that
   * already constrains height.
   */
  aspectRatio?: string | null;
  /** Show the zoom controls overlay. */
  controls?: boolean;
  /** Background grid type. */
  grid?: "fine" | "coarse" | "none";
  /** Optional caption rendered top-left. */
  caption?: React.ReactNode;
}

const toneToColor: Record<NonNullable<MapMarker["tone"]>, string> = {
  primary: "var(--color-primary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  info: "var(--color-info)",
  gold: "var(--color-gold)",
  neutral: "var(--color-foreground-muted)",
};

const TacticalMap = React.forwardRef<HTMLDivElement, TacticalMapProps>(
  (
    {
      className,
      markers = [],
      zones = [],
      aspectRatio = "4 / 3",
      controls = true,
      grid = "fine",
      caption,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-border bg-background-overlay relative w-full overflow-hidden rounded-md border",
          grid === "fine" && "bg-grid-fine",
          grid === "coarse" && "bg-grid",
          className,
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
        {...props}
      >
        {/* Subtle radial gradient lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, hsl(var(--primary) / 0.18), transparent 65%), radial-gradient(ellipse at 70% 80%, hsl(var(--info) / 0.1), transparent 60%)",
          }}
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
        >
          {zones.map((zone) => {
            const pts = zone.points.map(([x, y]) => `${x * 100},${y * 100}`).join(" ");
            const color = toneToColor[zone.tone ?? "warning"];
            return (
              <g key={zone.id}>
                <polygon
                  points={pts}
                  fill={color}
                  fillOpacity={0.08}
                  stroke={color}
                  strokeOpacity={0.7}
                  strokeWidth={0.3}
                  strokeDasharray={zone.variant === "solid" ? undefined : "1.2 1.2"}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>

        {/* Zone labels in normal DOM (so we can use real fonts) */}
        {zones.map((zone) => {
          const cx = zone.points.reduce((s, p) => s + p[0], 0) / zone.points.length;
          const cy = zone.points.reduce((s, p) => s + p[1], 0) / zone.points.length;
          if (!zone.label) return null;
          const color = toneToColor[zone.tone ?? "warning"];
          return (
            <div
              key={`${zone.id}-label`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${cx * 100}%`, top: `${cy * 100}%` }}
            >
              <span
                className="text-mono bg-background/80 rounded-[2px] border px-1 py-0.5 text-[10px] tracking-[0.1em] uppercase"
                style={{ color, borderColor: color }}
              >
                {zone.label}
              </span>
            </div>
          );
        })}

        {/* Markers */}
        {markers.map((m) => (
          <Marker key={m.id} marker={m} />
        ))}

        {/* Caption */}
        {caption && (
          <div className="text-mono text-foreground-muted bg-background/60 border-border absolute top-2 left-2 rounded-sm border px-1.5 py-0.5 text-[10px] tracking-[0.1em] uppercase backdrop-blur-sm">
            {caption}
          </div>
        )}

        {/* Controls */}
        {controls && (
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <MapButton ariaLabel="Zoom in">
              <Plus className="size-3" />
            </MapButton>
            <MapButton ariaLabel="Zoom out">
              <Minus className="size-3" />
            </MapButton>
            <MapButton ariaLabel="Fit to bounds">
              <Maximize2 className="size-3" />
            </MapButton>
          </div>
        )}
      </div>
    );
  },
);
TacticalMap.displayName = "TacticalMap";

function MapButton({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled
      className="border-border bg-background/80 text-foreground-muted hover:text-foreground hover:border-border-strong grid size-6 place-items-center rounded-sm border backdrop-blur-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function Marker({ marker }: { marker: MapMarker }) {
  const color = toneToColor[marker.tone ?? "primary"];
  const shape = marker.shape ?? "pin";

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${marker.x * 100}%`, top: `${marker.y * 100}%` }}
    >
      <div className="flex flex-col items-center gap-1">
        {shape === "pin" && (
          <span
            className="bg-background grid size-5 place-items-center rounded-full border-2"
            style={{ borderColor: color, color }}
          >
            <MapPin className="size-3" />
          </span>
        )}
        {shape === "triangle" && (
          <span
            className="size-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: `12px solid ${color}`,
            }}
          />
        )}
        {shape === "square" && (
          <span className="size-3 rotate-45 border-2" style={{ borderColor: color }} />
        )}
        {marker.label && (
          <span
            className="text-mono bg-background/80 rounded-[2px] border px-1 py-0.5 text-[10px] tracking-[0.08em] whitespace-nowrap uppercase"
            style={{ color, borderColor: color }}
          >
            {marker.label}
          </span>
        )}
        {marker.status && <StatusBadge status={marker.status} />}
      </div>
    </div>
  );
}

export { TacticalMap };
