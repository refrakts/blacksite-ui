import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mono?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", mono = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "border-border bg-input flex h-8 w-full rounded-sm border px-2.5 py-1 text-sm",
          "placeholder:text-foreground-subtle",
          "focus:ring-ring focus:ring-offset-background focus:border-primary/60 focus:ring-2 focus:ring-offset-1 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          mono && "font-mono",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
