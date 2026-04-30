import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Map as MapIcon } from "lucide-react";

import { TacticalMap } from "./tactical-map";

const meta = {
  title: "Maps/Tactical map",
  component: TacticalMap,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    grid: { control: "inline-radio", options: ["fine", "coarse", "none"] },
    controls: { control: "boolean" },
    aspectRatio: { control: "text" },
  },
} satisfies Meta<typeof TacticalMap>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SiteAlpha: Story = {
  args: {
    aspectRatio: "16 / 10",
    grid: "fine",
    controls: true,
    caption: (
      <span className="flex items-center gap-1">
        <MapIcon className="size-3" /> Grid 27/41
      </span>
    ),
    zones: [
      {
        id: "z1",
        label: "Hot zone",
        points: [
          [0.2, 0.25],
          [0.55, 0.2],
          [0.6, 0.55],
          [0.18, 0.55],
        ],
        tone: "danger",
      },
    ],
    markers: [
      { id: "a", label: "Alpha", x: 0.3, y: 0.4, tone: "primary" },
      { id: "b", label: "Bravo", x: 0.7, y: 0.6, tone: "warning", shape: "triangle" },
      { id: "c", label: "Charlie", x: 0.55, y: 0.8, tone: "info", shape: "square" },
    ],
  },
};

export const Backyard: Story = {
  args: {
    aspectRatio: "4 / 3",
    grid: "fine",
    zones: [
      {
        id: "bounce",
        label: "Bounce castle LZ",
        points: [
          [0.18, 0.32],
          [0.4, 0.28],
          [0.42, 0.5],
          [0.2, 0.54],
        ],
        tone: "info",
        variant: "dashed",
      },
      {
        id: "perimeter",
        label: "Cake table perimeter",
        points: [
          [0.42, 0.55],
          [0.66, 0.55],
          [0.66, 0.78],
          [0.42, 0.78],
        ],
        tone: "gold",
        variant: "dashed",
      },
    ],
    markers: [
      { id: "extract-1", label: "Parent extraction point", x: 0.66, y: 0.32, tone: "info" },
      {
        id: "extract-2",
        label: "Parent extraction point",
        x: 0.34,
        y: 0.74,
        tone: "warning",
        shape: "triangle",
      },
      { id: "cake", label: "Cake table perimeter", x: 0.54, y: 0.66, tone: "gold" },
    ],
  },
};

export const CoarseGrid: Story = {
  args: {
    grid: "coarse",
    aspectRatio: "16 / 9",
    markers: [
      { id: "p1", label: "Pickup", x: 0.62, y: 0.35, tone: "info" },
      { id: "p2", x: 0.3, y: 0.7, tone: "danger", shape: "triangle" },
    ],
  },
};
