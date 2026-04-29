import type { Meta, StoryObj } from "@storybook/react";

import { StatCard } from "./stat-card";

const meta = {
  title: "Tactical/Stat card",
  component: StatCard,
  tags: ["autodocs"],
  args: {
    label: "Cake deployment status",
    value: "ACTIVE",
    valueTone: "success",
    status: "active",
    statusLabel: "ACT",
    progress: 92,
    progressTone: "success",
  },
  argTypes: {
    valueTone: {
      control: "select",
      options: ["default", "success", "warning", "danger", "info", "primary", "gold"],
    },
    progressTone: {
      control: "select",
      options: ["primary", "success", "warning", "danger", "info", "gold", "neutral"],
    },
    progress: { control: { type: "range", min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const HighChaos: Story = {
  args: {
    label: "Guest threat assessment",
    value: "12 toddlers — HIGH CHAOS RISK",
    valueTone: "warning",
    status: "high",
    statusLabel: "HIGH",
    progress: 64,
    progressTone: "warning",
  },
};

export const Compromised: Story = {
  args: {
    label: "Piñata integrity",
    value: "COMPROMISED (35%)",
    valueTone: "danger",
    status: "new",
    statusLabel: "NEW",
    progress: 35,
    progressTone: "danger",
  },
};

export const Row: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  decorators: [],
  render: () => (
    <div className="grid grid-cols-4 gap-3 w-[1080px]">
      <StatCard
        label="Cake deployment"
        value="ACTIVE"
        valueTone="success"
        status="active"
        statusLabel="ACT"
        progress={92}
        progressTone="success"
      />
      <StatCard
        label="Asset inventory"
        value="47 units"
        status="nominal"
        statusLabel="NOMINAL"
        progress={78}
        progressTone="info"
      />
      <StatCard
        label="Threat assessment"
        value="HIGH CHAOS"
        valueTone="warning"
        status="high"
        statusLabel="HIGH"
        progress={64}
        progressTone="warning"
      />
      <StatCard
        label="Integrity"
        value="35%"
        valueTone="danger"
        status="new"
        statusLabel="NEW"
        progress={35}
        progressTone="danger"
      />
    </div>
  ),
};
