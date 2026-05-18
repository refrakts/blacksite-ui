"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { StatusBadge, type StatusBadgeProps } from "@/registry/blacksite/ui/status-badge";

interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Panel title (rendered uppercase + monospace). */
  title?: React.ReactNode;
  /** Optional secondary title segment after a slash divider. */
  subtitle?: React.ReactNode;
  /** Status badge shown on the right of the header. */
  status?: StatusBadgeProps["status"];
  /** Custom slot for header right-side controls. */
  actions?: React.ReactNode;
  /** Show a close (X) button. */
  closable?: boolean;
  onClose?: () => void;
  /** Density: "default" 16px padding, "compact" 12px. */
  density?: "default" | "compact";
  /** Hide the inner padding (e.g. for full-bleed maps/charts). */
  bleed?: boolean;
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      className,
      title,
      subtitle,
      status,
      actions,
      closable,
      onClose,
      density = "default",
      bleed = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "border-border bg-card text-card-foreground relative flex flex-col rounded-md border",
          "overflow-hidden shadow-[var(--shadow-panel)]",
          className,
        )}
        {...props}
      >
        {(title || actions || status || closable) && (
          <header
            className={cn(
              "border-border flex items-center justify-between gap-3 border-b",
              density === "compact" ? "h-8 px-2.5" : "h-9 px-3",
            )}
          >
            <div className="flex min-w-0 items-center gap-2">
              {title && (
                <h3 className="text-mono text-foreground-muted truncate text-[11px] tracking-[0.1em] uppercase">
                  {title}
                  {subtitle && <span className="text-foreground-subtle"> / {subtitle}</span>}
                </h3>
              )}
            </div>
            <div className="flex items-center gap-2">
              {actions}
              {status && <StatusBadge status={status} />}
              {closable && (
                <button
                  type="button"
                  aria-label="Close panel"
                  onClick={onClose}
                  className="text-foreground-subtle hover:text-foreground transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </header>
        )}
        <div className={cn("min-h-0 flex-1", !bleed && (density === "compact" ? "p-2.5" : "p-3"))}>
          {children}
        </div>
      </section>
    );
  },
);
Panel.displayName = "Panel";

export { Panel };
export type { PanelProps };
