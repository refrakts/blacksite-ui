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
          "relative flex flex-col rounded-md border border-border bg-card text-card-foreground",
          "shadow-[var(--shadow-panel)] overflow-hidden",
          className,
        )}
        {...props}
      >
        {(title || actions || status || closable) && (
          <header
            className={cn(
              "flex items-center justify-between gap-3 border-b border-border",
              density === "compact" ? "h-8 px-2.5" : "h-9 px-3",
            )}
          >
            <div className="flex items-center gap-2 min-w-0">
              {title && (
                <h3 className="text-mono text-[11px] uppercase tracking-[0.1em] text-foreground-muted truncate">
                  {title}
                  {subtitle && (
                    <span className="text-foreground-subtle"> / {subtitle}</span>
                  )}
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
        <div className={cn("flex-1 min-h-0", !bleed && (density === "compact" ? "p-2.5" : "p-3"))}>
          {children}
        </div>
      </section>
    );
  },
);
Panel.displayName = "Panel";

export { Panel };
export type { PanelProps };
