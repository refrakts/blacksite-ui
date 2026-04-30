import type { Meta, StoryObj } from "@storybook/react";

import { DataList } from "./data-list";

const meta = {
  title: "Tactical/Data list",
  component: DataList,
  tags: ["autodocs"],
  argTypes: {
    density: { control: "inline-radio", options: ["default", "compact"] },
    alignValues: { control: "inline-radio", options: ["left", "right"] },
  },
  decorators: [
    (Story) => (
      <div className="w-80 border border-border rounded-md bg-card p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DataList>;
export default meta;
type Story = StoryObj<typeof meta>;

const subsystemItems = [
  { id: "1", label: "Power core", value: "98%", status: "nominal" as const },
  { id: "2", label: "Coolant loop", value: "61°C", status: "warning" as const },
  { id: "3", label: "Comms array", value: "OK", status: "active" as const },
  { id: "4", label: "Aux thrusters", value: "OFF", status: "offline" as const },
];

const integrityItems = [
  { id: "1", label: "Staging area", status: "active" as const },
  { id: "2", label: "Forward base", status: "active" as const },
  { id: "3", label: "Sensor array", status: "active" as const },
  { id: "4", label: "Comms rigging", status: "active" as const },
  { id: "5", label: "Comms zone", status: "active" as const },
  { id: "6", label: "Outer perimeter", status: "active" as const },
];

export const Subsystems: Story = {
  args: { items: subsystemItems, density: "default", alignValues: "right" },
};

export const Integrity: Story = {
  args: { items: integrityItems, density: "compact" },
};

export const Compact: Story = {
  args: { items: subsystemItems, density: "compact" },
};
