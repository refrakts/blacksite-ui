import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BarChart } from "./bar-chart";

const meta = {
  title: "Charts/Bar chart",
  component: BarChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-[640px] border border-border rounded-md bg-card p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>;
export default meta;
type Story = StoryObj<typeof meta>;

const sectorData = [
  { x: "Sec-A", load: 32, idle: 8 },
  { x: "Sec-B", load: 48, idle: 6 },
  { x: "Sec-C", load: 28, idle: 12 },
  { x: "Sec-D", load: 64, idle: 4 },
  { x: "Sec-E", load: 52, idle: 9 },
];

export const Stacked: Story = {
  args: {
    data: sectorData,
    series: [
      { key: "load", label: "Load", color: "var(--color-chart-1)", stackId: "a" },
      { key: "idle", label: "Idle", color: "var(--color-chart-3)", stackId: "a" },
    ],
    showLegend: true,
    height: 240,
  },
};

export const Grouped: Story = {
  args: {
    data: sectorData,
    series: [
      { key: "load", label: "Load", color: "var(--color-chart-1)" },
      { key: "idle", label: "Idle", color: "var(--color-chart-3)" },
    ],
    showLegend: true,
    height: 240,
  },
};
