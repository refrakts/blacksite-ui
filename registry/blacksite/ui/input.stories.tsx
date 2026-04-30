import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";

import { Input } from "./input";
import { Kbd } from "./kbd";

const meta = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Operator ID" },
  argTypes: {
    mono: { control: "boolean" },
    disabled: { control: "boolean" },
    type: { control: "select", options: ["text", "password", "number", "email"] },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mono: Story = { args: { mono: true, placeholder: "GRID-1734-A2" } };
export const Password: Story = { args: { type: "password", placeholder: "••••••••" } };
export const Disabled: Story = { args: { disabled: true, value: "READ-ONLY" } };

export const WithIconAndKbd: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="relative w-72">
      <Search className="size-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-foreground-subtle" />
      <Input mono placeholder="search" className="pl-7" />
      <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">/</Kbd>
    </div>
  ),
};
