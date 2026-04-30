import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Metric } from "./metric";

const meta = {
  title: "Tactical/Metric",
  component: Metric,
  tags: ["autodocs"],
  args: {
    label: "Active drones",
    value: "14",
    delta: 3,
    deltaUnit: "abs",
    invertDelta: false,
  },
  argTypes: {
    deltaUnit: { control: "inline-radio", options: ["%", "abs"] },
    invertDelta: { control: "boolean" },
    delta: { control: { type: "range", min: -100, max: 100 } },
  },
} satisfies Meta<typeof Metric>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {};
export const Negative: Story = {
  args: { label: "Latency", value: "48ms", delta: -12, deltaUnit: "%", invertDelta: true },
};
export const Flat: Story = { args: { label: "Errors / hr", value: "2", delta: 0 } };

export const Row: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-4 gap-6 w-[720px] px-4 py-4 border border-border rounded-md bg-card">
      <Metric label="Active drones" value="14" delta={3} deltaUnit="abs" />
      <Metric label="Latency" value="48ms" delta={-12} invertDelta />
      <Metric label="Errors / hr" value="2" delta={0} />
      <Metric label="Uptime" value="99.92%" delta={0.04} hint="Last 30 days" />
    </div>
  ),
};
