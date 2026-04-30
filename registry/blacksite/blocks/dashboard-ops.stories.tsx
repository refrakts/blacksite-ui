import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DashboardOps } from "./dashboard-ops";

const meta = {
  title: "Blocks/Dashboard ops",
  component: DashboardOps,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "blacksite" },
    docs: {
      description: {
        component:
          "Full ops-dashboard composition built from the registry primitives. Installable as `dashboard-ops` via the shadcn CLI.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardOps>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
