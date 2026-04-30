import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Progress } from "./progress";

const meta = {
  title: "Primitives/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { value: 64, tone: "primary", size: "sm" },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "success", "warning", "danger", "info", "gold", "neutral"],
    },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { tone: "success", value: 92 } };
export const Warning: Story = { args: { tone: "warning", value: 64 } };
export const Danger: Story = { args: { tone: "danger", value: 35 } };

export const ToneStack: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="space-y-3 w-72">
      {(["primary", "success", "warning", "danger", "info", "gold"] as const).map((tone, i) => (
        <div key={tone} className="space-y-1">
          <div className="flex items-center justify-between text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
            <span>{tone}</span>
            <span>{30 + i * 12}%</span>
          </div>
          <Progress value={30 + i * 12} tone={tone} />
        </div>
      ))}
    </div>
  ),
};

export const Animated: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setValue((v) => (v + 7) % 100), 600);
      return () => clearInterval(id);
    }, []);
    return <Progress value={value} tone="primary" />;
  },
};
