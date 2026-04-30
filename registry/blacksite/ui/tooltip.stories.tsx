import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Activity, Bug, Crosshair } from "lucide-react";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const meta = {
  title: "Primitives/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={150}>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
  },
} satisfies Meta<typeof TooltipContent>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { side: "top", children: "Activity stream" },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="icon" aria-label="Activity">
          <Activity className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

export const Sides: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-3 gap-8 place-items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" aria-label="Top"><Activity className="size-4" /></Button>
        </TooltipTrigger>
        <TooltipContent side="top">top</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" aria-label="Bottom"><Bug className="size-4" /></Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">bottom</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" aria-label="Right"><Crosshair className="size-4" /></Button>
        </TooltipTrigger>
        <TooltipContent side="right">right</TooltipContent>
      </Tooltip>
    </div>
  ),
};
