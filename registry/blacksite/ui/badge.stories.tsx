import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./badge";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "label", tone: "neutral", variant: "soft" },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger", "info", "gold"],
    },
    variant: { control: "inline-radio", options: ["soft", "solid", "outline"] },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Soft: Story = {};
export const Solid: Story = { args: { variant: "solid", tone: "primary" } };
export const Outline: Story = { args: { variant: "outline", tone: "warning" } };

export const ToneMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3">
      {(["soft", "solid", "outline"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-2">
          <span className="text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted w-16">
            {variant}
          </span>
          {(["neutral", "primary", "success", "warning", "danger", "info", "gold"] as const).map(
            (tone) => (
              <Badge key={tone} tone={tone} variant={variant}>
                {tone}
              </Badge>
            ),
          )}
        </div>
      ))}
    </div>
  ),
};
