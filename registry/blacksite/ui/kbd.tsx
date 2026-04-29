import * as React from "react";

import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[3px]",
        "border border-border-strong bg-background-elevated px-1.5",
        "text-mono text-[10px] font-medium text-foreground-muted",
        "shadow-[inset_0_-1px_0_rgba(0,0,0,0.4)]",
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };
