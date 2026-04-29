"use client";

import * as React from "react";
import {
  Activity,
  Bell,
  Bug,
  ChevronRight,
  Crosshair,
  Cpu,
  Map as MapIcon,
  Network,
  Radar,
  Search,
  Settings,
  Shield,
} from "lucide-react";

import { Badge } from "@/registry/blacksite/ui/badge";
import { Button } from "@/registry/blacksite/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/blacksite/ui/card";
import { DataList } from "@/registry/blacksite/ui/data-list";
import { Input } from "@/registry/blacksite/ui/input";
import { Kbd } from "@/registry/blacksite/ui/kbd";
import { Metric } from "@/registry/blacksite/ui/metric";
import { Panel } from "@/registry/blacksite/ui/panel";
import { Progress } from "@/registry/blacksite/ui/progress";
import { Separator } from "@/registry/blacksite/ui/separator";
import { SidebarRail, type SidebarRailItem } from "@/registry/blacksite/ui/sidebar-rail";
import { StatCard } from "@/registry/blacksite/ui/stat-card";
import { StatusBadge } from "@/registry/blacksite/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/blacksite/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/blacksite/ui/tooltip";
import { BarChart } from "@/registry/blacksite/charts/bar-chart";
import { GanttTimeline } from "@/registry/blacksite/charts/gantt-timeline";
import { LineChart } from "@/registry/blacksite/charts/line-chart";
import { TacticalMap } from "@/registry/blacksite/maps/tactical-map";

const railItems: SidebarRailItem[] = [
  { id: "radar", icon: Radar, label: "Radar" },
  { id: "network", icon: Network, label: "Network" },
  { id: "crosshair", icon: Crosshair, label: "Crosshair" },
  { id: "cpu", icon: Cpu, label: "Compute" },
  { id: "alerts", icon: Bell, label: "Alerts", badge: "3" },
];

const lineData = Array.from({ length: 14 }, (_, i) => ({
  x: `T-${13 - i}`,
  primary: Math.round(40 + Math.sin(i / 2) * 20 + i * 1.4),
  secondary: Math.round(30 + Math.cos(i / 3) * 18 + i * 0.8),
}));

const barData = [
  { x: "Sec-A", load: 32, idle: 8 },
  { x: "Sec-B", load: 48, idle: 6 },
  { x: "Sec-C", load: 28, idle: 12 },
  { x: "Sec-D", load: 64, idle: 4 },
  { x: "Sec-E", load: 52, idle: 9 },
];

export default function ComponentsPage() {
  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background">
        <header className="border-b border-border bg-background-elevated px-6 h-12 flex items-center gap-3">
          <a href="/" className="text-mono text-[11px] uppercase tracking-[0.12em]">
            ← Blacksite UI
          </a>
          <Separator orientation="vertical" />
          <span className="text-mono text-[11px] uppercase tracking-[0.1em] text-foreground-muted">
            Components
          </span>
          <div className="flex-1" />
          <div className="relative w-72">
            <Search className="size-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-foreground-subtle" />
            <Input mono placeholder="search components" className="pl-7 h-8" />
            <Kbd className="absolute right-2 top-1/2 -translate-y-1/2">/</Kbd>
          </div>
        </header>

        <main className="mx-auto max-w-7xl p-6 grid gap-4">
          <Section id="button" title="Button">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="tactical">
                <Shield className="size-3.5" /> Tactical
              </Button>
              <Button variant="link">Link</Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
              <Button variant="secondary" size="icon" aria-label="Settings">
                <Settings className="size-4" />
              </Button>
            </div>
          </Section>

          <Section id="badge" title="Badge">
            <div className="flex flex-wrap items-center gap-2">
              {(["neutral", "primary", "success", "warning", "danger", "info", "gold"] as const).map(
                (tone) => (
                  <Badge key={tone} tone={tone}>
                    {tone}
                  </Badge>
                ),
              )}
              <Separator orientation="vertical" className="h-4" />
              {(["primary", "success", "warning", "danger", "info", "gold"] as const).map((tone) => (
                <Badge key={`solid-${tone}`} tone={tone} variant="solid">
                  {tone}
                </Badge>
              ))}
            </div>
          </Section>

          <Section id="status-badge" title="Status badge">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
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
                ] as const
              ).map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
              <Separator orientation="vertical" className="h-4" />
              <StatusBadge status="active" pulse>
                Live
              </StatusBadge>
              <StatusBadge status="critical" pulse>
                Breach
              </StatusBadge>
            </div>
          </Section>

          <Section id="card" title="Card">
            <div className="grid gap-3 md:grid-cols-3">
              <Card>
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
              <Card>
                <CardHeader>
                  <CardTitle>Sentry-12</CardTitle>
                  <CardDescription>Patrol drone, sector D</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground-muted">
                    Idle. Awaiting tasking from operator.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sentry-23</CardTitle>
                  <CardDescription>Patrol drone, sector G</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground-muted">
                    Offline. Last seen 4m ago at grid 27/41.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Section id="panel" title="Panel">
            <div className="grid gap-3 md:grid-cols-2">
              <Panel title="Telemetry" subtitle="Live" status="active" closable>
                <p className="text-sm text-foreground-muted">
                  Sensor stream active. 12 channels online.
                </p>
              </Panel>
              <Panel title="Alerts" subtitle="High" status="high" density="compact">
                <DataList
                  density="compact"
                  items={[
                    { id: "1", label: "Perimeter breach", status: "critical" },
                    { id: "2", label: "Temperature anomaly", status: "high" },
                    { id: "3", label: "Comms latency", status: "warning" },
                    { id: "4", label: "GPS drift", status: "nominal" },
                  ]}
                />
              </Panel>
            </div>
          </Section>

          <Section id="stat-card" title="Stat card">
            <div className="grid gap-3 md:grid-cols-4">
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
          </Section>

          <Section id="metric" title="Metric">
            <div className="grid gap-6 md:grid-cols-4 px-3 py-4 border border-border rounded-md bg-card">
              <Metric label="Active drones" value="14" delta={3} deltaUnit="abs" />
              <Metric label="Latency" value="48ms" delta={-12} invertDelta />
              <Metric label="Errors / hr" value="2" delta={0} />
              <Metric label="Uptime" value="99.92%" delta={0.04} hint="Last 30 days" />
            </div>
          </Section>

          <Section id="progress" title="Progress">
            <div className="space-y-4 max-w-md">
              {(["primary", "success", "warning", "danger", "info"] as const).map((tone) => (
                <div key={tone} className="space-y-1">
                  <div className="flex items-center justify-between text-mono text-[10px] uppercase tracking-[0.08em] text-foreground-muted">
                    <span>{tone}</span>
                    <span>{50 + Math.floor(Math.random() * 30)}%</span>
                  </div>
                  <Progress
                    value={50 + Math.floor(Math.random() * 30)}
                    tone={tone}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </Section>

          <Section id="data-list" title="Data list">
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
              <Panel title="Subsystems" density="compact">
                <DataList
                  items={[
                    { id: "1", label: "Power core", value: "98%", status: "nominal" },
                    { id: "2", label: "Coolant loop", value: "61°C", status: "warning" },
                    { id: "3", label: "Comms array", value: "OK", status: "active" },
                    { id: "4", label: "Aux thrusters", value: "OFF", status: "offline" },
                  ]}
                />
              </Panel>
              <Panel title="Crew" density="compact">
                <DataList
                  density="compact"
                  alignValues="left"
                  items={[
                    { id: "1", label: "Cmdr. Vance", value: "Bridge", status: "active" },
                    { id: "2", label: "Eng. Reyes", value: "Engineering", status: "active" },
                    { id: "3", label: "Sci. Kapoor", value: "Lab-3", status: "idle" },
                    { id: "4", label: "Med. Okafor", value: "Off-duty", status: "offline" },
                  ]}
                />
              </Panel>
            </div>
          </Section>

          <Section id="input" title="Input">
            <div className="grid gap-3 md:grid-cols-2 max-w-2xl">
              <Input placeholder="Operator ID" />
              <Input mono placeholder="GRID-1734-A2" />
              <Input type="password" placeholder="••••••••" />
              <Input disabled placeholder="Disabled" />
            </div>
          </Section>

          <Section id="separator" title="Separator">
            <div className="space-y-3 max-w-md">
              <Separator />
              <Separator variant="dashed" />
              <Separator variant="dotted" />
            </div>
          </Section>

          <Section id="tabs" title="Tabs">
            <Tabs defaultValue="overview" className="max-w-2xl">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="ontology">Ontology</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="text-sm text-foreground-muted">
                Operational summary and KPIs.
              </TabsContent>
              <TabsContent value="ontology" className="text-sm text-foreground-muted">
                Object types, properties, and links.
              </TabsContent>
              <TabsContent value="logs" className="text-sm text-foreground-muted">
                Audit trail of operator actions.
              </TabsContent>
              <TabsContent value="settings" className="text-sm text-foreground-muted">
                Workspace configuration.
              </TabsContent>
            </Tabs>
          </Section>

          <Section id="tooltip" title="Tooltip">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon" aria-label="Activity">
                    <Activity className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Activity stream</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon" aria-label="Bug">
                    <Bug className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Diagnostics</TooltipContent>
              </Tooltip>
            </div>
          </Section>

          <Section id="kbd" title="Kbd">
            <div className="flex items-center gap-2">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
              <span className="text-sm text-foreground-muted">to open the search palette.</span>
            </div>
          </Section>

          <Section id="sidebar-rail" title="Sidebar rail">
            <div className="h-72 border border-border rounded-md overflow-hidden bg-card flex">
              <SidebarRail items={railItems} />
              <div className="flex-1 grid place-items-center text-mono text-[11px] uppercase tracking-[0.1em] text-foreground-muted">
                <span className="flex items-center gap-1.5">
                  Selected: <span className="text-foreground">Radar</span>
                  <ChevronRight className="size-3" />
                </span>
              </div>
            </div>
          </Section>

          <Section id="line-chart" title="Line chart">
            <Panel title="Telemetry" subtitle="last 14 cycles" density="compact">
              <LineChart
                data={lineData}
                xKey="x"
                series={[
                  { key: "primary", label: "Primary", color: "var(--color-chart-1)" },
                  { key: "secondary", label: "Secondary", color: "var(--color-chart-2)" },
                ]}
                thresholds={[{ value: 70, label: "Alert", tone: "danger" }]}
              />
            </Panel>
          </Section>

          <Section id="bar-chart" title="Bar chart">
            <Panel title="Sector load" density="compact">
              <BarChart
                data={barData}
                series={[
                  { key: "load", label: "Load", color: "var(--color-chart-1)", stackId: "a" },
                  { key: "idle", label: "Idle", color: "var(--color-chart-3)", stackId: "a" },
                ]}
                showLegend
              />
            </Panel>
          </Section>

          <Section id="gantt-timeline" title="Gantt timeline">
            <Panel title="Mission timeline" density="compact" bleed>
              <GanttTimeline
                columns={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                tasks={[
                  { id: "recon", label: "Recon", start: 0, end: 1.6, tone: "info" },
                  { id: "deploy", label: "Deploy", start: 1.5, end: 3.4, tone: "primary" },
                  { id: "secure", label: "Secure", start: 3.0, end: 4.6, tone: "success" },
                  { id: "extract", label: "Extract", start: 4.5, end: 5.8, tone: "warning" },
                  { id: "review", label: "Review", start: 5.6, end: 7.0, tone: "neutral" },
                ]}
                nowAt={3.8}
              />
            </Panel>
          </Section>

          <Section id="tactical-map" title="Tactical map">
            <div className="grid md:grid-cols-2 gap-3">
              <Panel title="Site Alpha" subtitle="Recon" density="compact" bleed>
                <TacticalMap
                  caption={
                    <span className="flex items-center gap-1">
                      <MapIcon className="size-3" /> Grid 27/41
                    </span>
                  }
                  zones={[
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
                  ]}
                  markers={[
                    { id: "a", label: "Alpha", x: 0.3, y: 0.4, tone: "primary" },
                    { id: "b", label: "Bravo", x: 0.7, y: 0.6, tone: "warning", shape: "triangle" },
                    { id: "c", label: "Charlie", x: 0.55, y: 0.8, tone: "info", shape: "square" },
                  ]}
                />
              </Panel>
              <Panel title="Site Bravo" subtitle="Op" density="compact" bleed>
                <TacticalMap
                  grid="coarse"
                  zones={[
                    {
                      id: "z1",
                      label: "LZ-1",
                      points: [
                        [0.5, 0.2],
                        [0.75, 0.2],
                        [0.78, 0.5],
                        [0.5, 0.5],
                      ],
                      tone: "info",
                    },
                  ]}
                  markers={[
                    { id: "p1", label: "Pickup", x: 0.62, y: 0.35, tone: "info" },
                    { id: "p2", x: 0.3, y: 0.7, tone: "danger", shape: "triangle" },
                  ]}
                />
              </Panel>
            </div>
          </Section>
        </main>
      </div>
    </TooltipProvider>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted">
          {title}
        </h2>
        <a
          href={`#${id}`}
          className="text-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle hover:text-foreground-muted"
        >
          #{id}
        </a>
      </div>
      <div className="border border-border rounded-md bg-card p-4">{children}</div>
    </section>
  );
}
