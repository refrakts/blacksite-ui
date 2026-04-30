import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Kbd } from "./kbd";

const meta = {
  title: "Primitives/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  args: { children: "K" },
} satisfies Meta<typeof Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Combo: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-1.5 text-sm text-foreground-muted">
      <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
      <span className="ml-2">to open the search palette.</span>
    </div>
  ),
};
