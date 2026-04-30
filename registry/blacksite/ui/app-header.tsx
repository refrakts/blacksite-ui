"use client";

import * as React from "react";
import { ChevronDown, Globe, HelpCircle, Maximize2, Minimize2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { StatusBadge, type StatusBadgeProps } from "@/registry/blacksite/ui/status-badge";

interface AppHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Brand / nav slot on the far left. */
  brand?: React.ReactNode;
  /** App or workspace title. */
  title?: React.ReactNode;
  /** Subtitle (rendered after a slash). */
  subtitle?: React.ReactNode;
  /** Status pill shown next to the workspace label. */
  status?: StatusBadgeProps["status"];
  statusLabel?: string;
  /** Region / environment label (right side selector). */
  region?: string;
  user?: { name: string; avatarUrl?: string };
  /** Right-side actions slot (overrides default window controls). */
  actions?: React.ReactNode;
  /** Show fake window controls (minimise / maximise / close). */
  windowControls?: boolean;
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (
    {
      className,
      brand,
      title,
      subtitle,
      status,
      statusLabel,
      region,
      user,
      actions,
      windowControls = false,
      ...props
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "flex h-10 items-center gap-3 border-b border-border",
          "bg-background-elevated px-2 text-foreground",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 min-w-0">
          {brand}
          {(title || subtitle) && (
            <h1 className="text-mono text-[11px] uppercase tracking-[0.1em] text-foreground truncate">
              {title}
              {subtitle && (
                <span className="text-foreground-subtle"> — {subtitle}</span>
              )}
            </h1>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {user && (
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-sm border border-border px-2 h-7 text-mono text-[11px] uppercase tracking-[0.06em] hover:border-border-strong"
            >
              <span className="size-4 rounded-full bg-foreground/10 grid place-items-center text-[9px]">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="truncate max-w-[120px]">{user.name}</span>
            </button>
          )}

          {status && (
            <div className="flex items-center gap-1.5 px-2 h-7 rounded-sm border border-border">
              <span className="text-mono text-[10px] uppercase tracking-[0.08em] text-foreground-muted">
                Status
              </span>
              <StatusBadge status={status}>{statusLabel}</StatusBadge>
            </div>
          )}

          {region && (
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-sm border border-border px-2 h-7 text-mono text-[11px] uppercase tracking-[0.06em] hover:border-border-strong"
            >
              <Globe className="size-3.5 text-foreground-muted" />
              <span>{region}</span>
              <ChevronDown className="size-3 text-foreground-subtle" />
            </button>
          )}

          {actions}

          {windowControls && (
            <div className="flex items-center gap-0.5 ml-1">
              <button
                aria-label="Help"
                className="size-7 grid place-items-center rounded-sm hover:bg-accent text-foreground-muted hover:text-foreground"
              >
                <HelpCircle className="size-3.5" />
              </button>
              <button
                aria-label="Minimise"
                className="size-7 grid place-items-center rounded-sm hover:bg-accent text-foreground-muted hover:text-foreground"
              >
                <Minimize2 className="size-3.5" />
              </button>
              <button
                aria-label="Maximise"
                className="size-7 grid place-items-center rounded-sm hover:bg-accent text-foreground-muted hover:text-foreground"
              >
                <Maximize2 className="size-3.5" />
              </button>
              <button
                aria-label="Close"
                className="size-7 grid place-items-center rounded-sm hover:bg-danger/20 text-foreground-muted hover:text-danger"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>
    );
  },
);
AppHeader.displayName = "AppHeader";

export { AppHeader };
