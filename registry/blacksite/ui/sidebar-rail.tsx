"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/blacksite/ui/tooltip";

export interface SidebarRailItem {
  id: string;
  icon: LucideIcon;
  label: string;
  badge?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
}

interface SidebarRailProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarRailItem[];
  footerItems?: SidebarRailItem[];
  activeId?: string;
  onActiveChange?: (id: string) => void;
}

const SidebarRail = React.forwardRef<HTMLElement, SidebarRailProps>(
  ({ className, items, footerItems, activeId, onActiveChange, ...props }, ref) => {
    return (
      <TooltipProvider delayDuration={150}>
        <nav
          ref={ref}
          aria-label="Primary"
          className={cn(
            "flex w-12 flex-col items-center gap-1 border-r border-border bg-background-elevated py-2",
            className,
          )}
          {...props}
        >
          <div className="flex flex-col items-center gap-1">
            {items.map((item) => (
              <RailButton
                key={item.id}
                item={item}
                active={item.id === activeId}
                onClick={() => {
                  if (item.disabled) return;
                  item.onSelect?.();
                  onActiveChange?.(item.id);
                }}
              />
            ))}
          </div>
          {footerItems && footerItems.length > 0 && (
            <>
              <div className="flex-1" />
              <div className="flex flex-col items-center gap-1">
                {footerItems.map((item) => (
                  <RailButton
                    key={item.id}
                    item={item}
                    active={item.id === activeId}
                    onClick={() => {
                      if (item.disabled) return;
                      item.onSelect?.();
                      onActiveChange?.(item.id);
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </nav>
      </TooltipProvider>
    );
  },
);
SidebarRail.displayName = "SidebarRail";

function RailButton({
  item,
  active,
  onClick,
}: {
  item: SidebarRailItem;
  active?: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={item.label}
          aria-current={active ? "page" : undefined}
          onClick={onClick}
          disabled={item.disabled}
          className={cn(
            "relative size-8 grid place-items-center rounded-sm",
            "text-foreground-muted hover:text-foreground hover:bg-accent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            "transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
            active && "text-primary bg-primary/10",
          )}
        >
          {active && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-primary rounded-r-sm" />
          )}
          <Icon className="size-4" />
          {item.badge !== undefined && (
            <span className="absolute -top-0.5 -right-0.5 grid place-items-center min-w-3 h-3 px-1 rounded-full bg-danger text-[9px] font-semibold text-danger-foreground">
              {item.badge}
            </span>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export { SidebarRail };
