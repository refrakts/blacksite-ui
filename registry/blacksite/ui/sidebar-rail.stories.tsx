import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  BarChart3,
  Bell,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  SlidersHorizontal,
} from "lucide-react";

import { SidebarRail } from "./sidebar-rail";

const meta = {
  title: "Tactical/Sidebar rail",
  component: SidebarRail,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="border-border bg-card flex h-[480px] overflow-hidden rounded-md border">
        <Story />
        <div className="text-mono text-foreground-muted grid flex-1 place-items-center text-[11px] tracking-[0.1em] uppercase">
          workspace
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarRail>;
export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "layers", icon: Layers, label: "Layers" },
  { id: "ontology", icon: Shield, label: "Ontology" },
  { id: "charts", icon: BarChart3, label: "Charts" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const footer = [
  { id: "filters", icon: SlidersHorizontal, label: "Filters" },
  { id: "alerts", icon: Bell, label: "Alerts", badge: "3" as const },
  { id: "help", icon: HelpCircle, label: "Help" },
  { id: "exit", icon: LogOut, label: "Exit" },
];

export const Default: Story = {
  args: { items, footerItems: footer, activeId: "layers" },
};

export const NoFooter: Story = {
  args: { items, activeId: "dashboard" },
};
