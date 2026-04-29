import type { Meta, StoryObj } from "@storybook/react";

import { StatusBadge } from "./status-badge";

const STATUSES = [
  "active",
  "idle",
  "offline",
  "new",
  "high",
  "critical",
  "compromised",
  "nominal",
  "warning",
  "secured",
] as const;

const meta = {
  title: "Tactical/Status badge",
  component: StatusBadge,
  tags: ["autodocs"],
  args: { status: "active", dot: true, pulse: false },
  argTypes: {
    status: { control: "select", options: STATUSES },
    dot: { control: "boolean" },
    pulse: { control: "boolean" },
  },
} satisfies Meta<typeof StatusBadge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const Pulse: Story = { args: { status: "critical", pulse: true } };
export const NoDot: Story = { args: { dot: false, status: "high" } };
export const CustomLabel: Story = {
  args: { status: "compromised", children: "COMPROMISED (35%)" },
};

export const AllStatuses: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-2 max-w-xl">
      {STATUSES.map((s) => (
        <StatusBadge key={s} status={s} />
      ))}
    </div>
  ),
};

export const PulseRow: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <StatusBadge status="active" pulse>
        Live
      </StatusBadge>
      <StatusBadge status="critical" pulse>
        Breach
      </StatusBadge>
      <StatusBadge status="warning" pulse>
        Drift
      </StatusBadge>
    </div>
  ),
};
