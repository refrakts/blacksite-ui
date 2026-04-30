import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "./separator";

const meta = {
  title: "Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    variant: { control: "inline-radio", options: ["solid", "dashed", "dotted"] },
  },
  args: { orientation: "horizontal", variant: "solid" },
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-72 space-y-2">
      <p className="text-sm">Section A</p>
      <Separator {...args} />
      <p className="text-sm">Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-12 items-center gap-3 text-sm">
      <span>A</span>
      <Separator {...args} />
      <span>B</span>
      <Separator {...args} />
      <span>C</span>
    </div>
  ),
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-72 space-y-3">
      <Separator variant="solid" />
      <Separator variant="dashed" />
      <Separator variant="dotted" />
    </div>
  ),
};
