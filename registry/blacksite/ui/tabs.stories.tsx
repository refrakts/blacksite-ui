import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="ontology">Ontology</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-foreground-muted text-sm">
        Operational summary and KPIs.
      </TabsContent>
      <TabsContent value="ontology" className="text-foreground-muted text-sm">
        Object types, properties, and links.
      </TabsContent>
      <TabsContent value="logs" className="text-foreground-muted text-sm">
        Audit trail of operator actions.
      </TabsContent>
      <TabsContent value="settings" className="text-foreground-muted text-sm">
        Workspace configuration.
      </TabsContent>
    </Tabs>
  ),
};
