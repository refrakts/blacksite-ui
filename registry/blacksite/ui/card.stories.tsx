import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

const meta = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Sentry-7</CardTitle>
        <CardDescription>Patrol drone, sector C</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground-muted">
          Operational. Battery 84%. Last check-in 12s ago.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Mission brief</CardTitle>
        <CardDescription>Op SILVERFISH · 04:21Z</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground-muted">
          Recon team Alpha to establish overwatch on grid 27/41 by 05:00Z.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2 pt-3">
        <Button variant="ghost">Decline</Button>
        <Button variant="primary">Accept</Button>
      </CardFooter>
    </Card>
  ),
};

export const Grid: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-3 gap-3 w-[720px]">
      {[
        { title: "Sentry-7", desc: "Sector C", body: "Operational · 84%" },
        { title: "Sentry-12", desc: "Sector D", body: "Idle · awaiting tasking" },
        { title: "Sentry-23", desc: "Sector G", body: "Offline · last seen 4m ago" },
      ].map((c) => (
        <Card key={c.title}>
          <CardHeader>
            <CardTitle>{c.title}</CardTitle>
            <CardDescription>{c.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground-muted">{c.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
