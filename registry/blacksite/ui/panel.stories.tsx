import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Panel } from "./panel";

const meta = {
  title: "Tactical/Panel",
  component: Panel,
  tags: ["autodocs"],
  args: {
    title: "Telemetry",
    subtitle: "Live",
    status: "active",
    closable: false,
    density: "default",
    bleed: false,
  },
  argTypes: {
    status: {
      control: "select",
      options: ["active", "idle", "high", "critical", "compromised", "nominal"],
    },
    density: { control: "inline-radio", options: ["default", "compact"] },
    closable: { control: "boolean" },
    bleed: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Panel>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <p className="text-foreground-muted text-sm">Sensor stream active. 12 channels online.</p>
    ),
  },
};

export const Closable: Story = {
  args: { closable: true, status: "high", subtitle: "High" },
};

export const Compact: Story = { args: { density: "compact" } };

export const Bleed: Story = {
  args: {
    bleed: true,
    children: (
      <div className="bg-grid-fine text-mono text-foreground-muted grid h-32 place-items-center text-[10px] tracking-[0.1em] uppercase">
        full-bleed canvas (e.g. map / chart)
      </div>
    ),
  },
};
