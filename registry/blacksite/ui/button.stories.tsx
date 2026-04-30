import type { Meta, StoryObj } from "@storybook/react";
import { Settings, Shield, Zap } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Run op" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger", "tactical", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon", "icon-sm"],
    },
    disabled: { control: "boolean" },
    asChild: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Danger: Story = { args: { variant: "danger", children: "Abort" } };
export const Tactical: Story = {
  args: {
    variant: "tactical",
    children: (
      <>
        <Shield className="size-3.5" /> Engage
      </>
    ),
  },
};
export const Link: Story = { args: { variant: "link", children: "View report" } };
export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: (
      <>
        <Zap className="size-3.5" /> Deploy
      </>
    ),
  },
};
export const IconOnly: Story = {
  args: {
    variant: "secondary",
    size: "icon",
    "aria-label": "Settings",
    children: <Settings className="size-4" />,
  },
};
export const Disabled: Story = { args: { variant: "primary", disabled: true } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-3 gap-2">
      {(["primary", "secondary", "outline", "ghost", "danger", "tactical"] as const).map((v) => (
        <Button key={v} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const SizeMatrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">small</Button>
      <Button size="md">medium</Button>
      <Button size="lg">large</Button>
      <Button size="icon" aria-label="Settings">
        <Settings className="size-4" />
      </Button>
    </div>
  ),
};
