import type { Meta, StoryObj } from "@storybook/react";

import { LineChart } from "./line-chart";

const meta = {
  title: "Charts/Line chart",
  component: LineChart,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-[640px] border border-border rounded-md bg-card p-3">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    curve: { control: "inline-radio", options: ["linear", "monotone", "step"] },
    height: { control: { type: "range", min: 120, max: 400, step: 20 } },
  },
} satisfies Meta<typeof LineChart>;
export default meta;
type Story = StoryObj<typeof meta>;

const sugarSeries = [
  { x: "0", series_a: 0.5 },
  { x: "20", series_a: 1.8 },
  { x: "40", series_a: 4.2 },
  { x: "60", series_a: 8.0 },
  { x: "80", series_a: 12.0 },
  { x: "100", series_a: 19.5 },
];

const telemetryData = Array.from({ length: 14 }, (_, i) => ({
  x: `T-${13 - i}`,
  primary: Math.round(40 + Math.sin(i / 2) * 20 + i * 1.4),
  secondary: Math.round(30 + Math.cos(i / 3) * 18 + i * 0.8),
}));

export const SugarVsVolatility: Story = {
  args: {
    data: sugarSeries,
    xKey: "x",
    xLabel: "Sugar intake",
    yLabel: "Behavioral volatility",
    series: [
      { key: "series_a", label: "Volatility", color: "var(--color-chart-1)" },
    ],
    thresholds: [{ value: 15, label: "Alert threshold", tone: "danger" }],
    height: 220,
    curve: "monotone",
  },
};

export const MultiSeries: Story = {
  args: {
    data: telemetryData,
    xKey: "x",
    series: [
      { key: "primary", label: "Primary", color: "var(--color-chart-1)" },
      { key: "secondary", label: "Secondary", color: "var(--color-chart-2)" },
    ],
    thresholds: [{ value: 70, label: "Alert", tone: "danger" }],
    height: 220,
    curve: "monotone",
  },
};

export const Step: Story = {
  args: {
    data: telemetryData,
    series: [{ key: "primary", color: "var(--color-chart-2)" }],
    curve: "step",
    height: 200,
  },
};
