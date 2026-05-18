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
          "border-border flex h-10 items-center gap-3 border-b",
          "bg-background-elevated text-foreground px-2",
          className,
        )}
        {...props}
      >
        <div className="flex min-w-0 items-center gap-2">
          {brand}
          {(title || subtitle) && (
            <h1 className="text-mono text-foreground truncate text-[11px] tracking-[0.1em] uppercase">
              {title}
              {subtitle && <span className="text-foreground-subtle"> — {subtitle}</span>}
            </h1>
          )}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          {user && (
            <button
              type="button"
              className="border-border text-mono hover:border-border-strong flex h-7 items-center gap-1.5 rounded-sm border px-2 text-[11px] tracking-[0.06em] uppercase"
            >
              <span className="bg-foreground/10 grid size-4 place-items-center rounded-full text-[9px]">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="max-w-[120px] truncate">{user.name}</span>
            </button>
          )}

          {status && (
            <div className="border-border flex h-7 items-center gap-1.5 rounded-sm border px-2">
              <span className="text-mono text-foreground-muted text-[10px] tracking-[0.08em] uppercase">
                Status
              </span>
              <StatusBadge status={status}>{statusLabel}</StatusBadge>
            </div>
          )}

          {region && (
            <button
              type="button"
              className="border-border text-mono hover:border-border-strong flex h-7 items-center gap-1.5 rounded-sm border px-2 text-[11px] tracking-[0.06em] uppercase"
            >
              <Globe className="text-foreground-muted size-3.5" />
              <span>{region}</span>
              <ChevronDown className="text-foreground-subtle size-3" />
            </button>
          )}

          {actions}

          {windowControls && (
            <div className="ml-1 flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Help"
                disabled
                className="hover:bg-accent text-foreground-muted hover:text-foreground grid size-7 place-items-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <HelpCircle className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Minimise"
                disabled
                className="hover:bg-accent text-foreground-muted hover:text-foreground grid size-7 place-items-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minimize2 className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Maximise"
                disabled
                className="hover:bg-accent text-foreground-muted hover:text-foreground grid size-7 place-items-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Maximize2 className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Close"
                disabled
                className="hover:bg-danger/20 text-foreground-muted hover:text-danger grid size-7 place-items-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
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
