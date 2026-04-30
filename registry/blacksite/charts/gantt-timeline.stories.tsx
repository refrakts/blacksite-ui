import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { GanttTimeline } from "./gantt-timeline";

const meta = {
  title: "Charts/Gantt timeline",
  component: GanttTimeline,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-[720px] border border-border rounded-md bg-card overflow-hidden">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    nowAt: { control: { type: "range", min: 0, max: 7, step: 0.1 } },
    rowHeight: { control: { type: "range", min: 20, max: 48, step: 2 } },
    labelWidth: { control: { type: "range", min: 120, max: 240, step: 8 } },
  },
} satisfies Meta<typeof GanttTimeline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Mission: Story = {
  args: {
    columns: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    tasks: [
      { id: "recon", label: "Recon", start: 0, end: 1.6, tone: "info" },
      { id: "deploy", label: "Deploy", start: 1.5, end: 3.4, tone: "primary" },
      { id: "secure", label: "Secure", start: 3.0, end: 4.6, tone: "success" },
      { id: "extract", label: "Extract", start: 4.5, end: 5.8, tone: "warning" },
      { id: "review", label: "Review", start: 5.6, end: 7.0, tone: "neutral" },
    ],
    nowAt: 3.8,
    rowHeight: 28,
    labelWidth: 160,
  },
};

export const Patrol: Story = {
  args: {
    columns: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    tasks: [
      { id: "insertion", label: "Insertion", start: 0, end: 1.5, tone: "primary" },
      { id: "sweep-1", label: "Patrol sweep", start: 0.6, end: 2.2, tone: "primary" },
      { id: "sweep-2", label: "Patrol sweep", start: 2, end: 3.6, tone: "primary" },
      { id: "strike", label: "Strike package", start: 3.5, end: 4.6, tone: "warning" },
      { id: "exfil", label: "Exfil response", start: 4.4, end: 6, tone: "warning" },
    ],
    nowAt: 4.2,
    rowHeight: 28,
    labelWidth: 180,
  },
};
