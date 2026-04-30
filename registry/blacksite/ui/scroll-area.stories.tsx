import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ScrollArea } from "./scroll-area";

const meta = {
  title: "Primitives/Scroll area",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-64 w-72 border border-border rounded-md bg-card p-3">
      <div className="space-y-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="text-mono text-[11px] uppercase tracking-[0.06em] text-foreground-muted"
          >
            [{String(i).padStart(3, "0")}] log entry · op SILVERFISH · status nominal
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
