import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { AppHeader } from "./app-header";

const meta = {
  title: "Tactical/App header",
  component: AppHeader,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "Sentinel Ops",
    subtitle: "Foundry",
    status: "active",
    statusLabel: "ACT",
    region: "Sector C-3",
    user: { name: "n.drobnic" },
    windowControls: true,
  },
  argTypes: {
    status: {
      control: "select",
      options: ["active", "idle", "high", "critical", "compromised", "nominal"],
    },
    windowControls: { control: "boolean" },
  },
} satisfies Meta<typeof AppHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Minimal: Story = {
  args: {
    title: "Sentry",
    subtitle: undefined,
    region: undefined,
    windowControls: false,
    user: undefined,
    status: undefined,
  },
};
