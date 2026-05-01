"use client";

import * as React from "react";
import {
  Activity,
  BarChart3,
  Braces,
  ChevronDown,
  Clock3,
  Database,
  GitBranch,
  Layers,
  LayoutDashboard,
  Map,
  Network,
  PanelRight,
  Plus,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Table2,
} from "lucide-react";

import { BarChart } from "@/registry/blacksite/charts/bar-chart";
import { GanttTimeline, type GanttTask } from "@/registry/blacksite/charts/gantt-timeline";
import { LineChart } from "@/registry/blacksite/charts/line-chart";
import { TacticalMap, type MapMarker, type MapZone } from "@/registry/blacksite/maps/tactical-map";
import { Panel } from "@/registry/blacksite/ui/panel";
import { SidebarRail, type SidebarRailItem } from "@/registry/blacksite/ui/sidebar-rail";
import { StatCard } from "@/registry/blacksite/ui/stat-card";
import { StatusBadge, type StatusBadgeProps } from "@/registry/blacksite/ui/status-badge";

const navItems: SidebarRailItem[] = [
  { id: "home", icon: LayoutDashboard, label: "Operational picture" },
  { id: "map", icon: Map, label: "Map" },
  { id: "objects", icon: Network, label: "Object Explorer", badge: "18" },
  { id: "lineage", icon: GitBranch, label: "Lineage" },
  { id: "analytics", icon: BarChart3, label: "Quiver" },
];

const navFooter: SidebarRailItem[] = [
  { id: "layers", icon: Layers, label: "Layer manager" },
  { id: "filters", icon: SlidersHorizontal, label: "Filters" },
  { id: "aip", icon: Sparkles, label: "AIP Assist", badge: "B" },
];

const objectTypes = [
  { label: "Flight alert", count: 184, tone: "danger" },
  { label: "Aircraft", count: 1242, tone: "info" },
  { label: "Airport", count: 391, tone: "success" },
  { label: "Route segment", count: 8819, tone: "gold" },
  { label: "Maintenance event", count: 67, tone: "warning" },
] as const;

const objectTypeCountClass: Record<(typeof objectTypes)[number]["tone"], string> = {
  danger: "text-danger",
  info: "text-info",
  success: "text-success",
  gold: "text-gold",
  warning: "text-warning",
};

const savedViews = ["Delayed departures", "Maintenance risk", "Crew impact", "Weather overlays"];

const mapZones: MapZone[] = [
  {
    id: "weather-front",
    label: "WX-17",
    points: [
      [0.1, 0.28],
      [0.35, 0.18],
      [0.53, 0.32],
      [0.42, 0.55],
      [0.16, 0.51],
    ],
    tone: "info",
    variant: "dashed",
  },
  {
    id: "ground-stop",
    label: "GROUND STOP",
    points: [
      [0.56, 0.44],
      [0.82, 0.48],
      [0.78, 0.72],
      [0.55, 0.78],
      [0.46, 0.6],
    ],
    tone: "warning",
    variant: "solid",
  },
];

const mapMarkers: MapMarker[] = [
  { id: "ord", label: "ORD", x: 0.54, y: 0.52, tone: "danger", status: "critical", shape: "pin" },
  { id: "dfw", label: "DFW", x: 0.36, y: 0.71, tone: "warning", status: "high", shape: "triangle" },
  { id: "den", label: "DEN", x: 0.28, y: 0.55, tone: "info", status: "active", shape: "square" },
  { id: "iad", label: "IAD", x: 0.73, y: 0.58, tone: "gold", status: "new", shape: "pin" },
  { id: "atl", label: "ATL", x: 0.62, y: 0.76, tone: "success", status: "nominal", shape: "pin" },
];

const throughputData = [
  { x: "06:00", inbound: 82, delayed: 9, threshold: 18 },
  { x: "07:00", inbound: 96, delayed: 14, threshold: 18 },
  { x: "08:00", inbound: 118, delayed: 22, threshold: 18 },
  { x: "09:00", inbound: 136, delayed: 31, threshold: 18 },
  { x: "10:00", inbound: 142, delayed: 28, threshold: 18 },
  { x: "11:00", inbound: 128, delayed: 19, threshold: 18 },
];

const riskDistribution = [
  { x: "WX", open: 24, actioned: 11 },
  { x: "MX", open: 16, actioned: 7 },
  { x: "CREW", open: 9, actioned: 13 },
  { x: "ATC", open: 21, actioned: 5 },
  { x: "SEC", open: 4, actioned: 6 },
];

const timelineTasks: GanttTask[] = [
  { id: "ingest", label: "ADS-B ingest", start: 0.2, end: 1.4, tone: "success" },
  { id: "linking", label: "Object linking", start: 1.0, end: 2.5, tone: "info" },
  { id: "model", label: "Delay model scoring", start: 2.2, end: 4.1, tone: "primary" },
  { id: "review", label: "Dispatch review", start: 3.6, end: 5.0, tone: "warning" },
  { id: "writeback", label: "Action writeback", start: 4.8, end: 6.4, tone: "gold" },
];

const alertRows: Array<{
  id: string;
  object: string;
  route: string;
  risk: string;
  owner: string;
  status: StatusBadgeProps["status"];
}> = [
  {
    id: "FA-1842",
    object: "DAL 2281",
    route: "ORD → ATL",
    risk: "Weather diversion",
    owner: "Ops East",
    status: "critical",
  },
  {
    id: "FA-1839",
    object: "UAL 455",
    route: "DEN → IAD",
    risk: "Crew legality",
    owner: "Crew desk",
    status: "high",
  },
  {
    id: "FA-1827",
    object: "AAL 109",
    route: "DFW → ORD",
    risk: "Maintenance gate",
    owner: "Line MX",
    status: "warning",
  },
  {
    id: "FA-1811",
    object: "SWA 884",
    route: "ATL → DFW",
    risk: "Slot compression",
    owner: "ATC liaison",
    status: "active",
  },
];

const lineageNodes = [
  "raw_adsb_events",
  "flight_object",
  "risk_features",
  "delay_model_v7",
  "dispatch_action",
];

export interface DashboardOpsProps extends React.HTMLAttributes<HTMLDivElement> {}

function DashboardOps({ className, ...props }: DashboardOpsProps) {
  const [activeNav, setActiveNav] = React.useState("home");
  const [selectedAlert, setSelectedAlert] = React.useState(alertRows[0]);

  return (
    <div
      className={["bg-background text-foreground min-h-svh lg:h-svh lg:overflow-hidden", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="flex min-h-svh flex-col lg:h-svh">
        <TopBar />

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <div className="hidden lg:block">
            <SidebarRail
              items={navItems}
              footerItems={navFooter}
              activeId={activeNav}
              onActiveChange={setActiveNav}
            />
          </div>

          <aside className="border-border bg-background-elevated/70 border-b lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0">
            <OntologyExplorer />
          </aside>

          <main className="grid min-h-0 flex-1 gap-2 p-2 lg:grid-cols-[minmax(0,1fr)_320px] lg:grid-rows-[auto_minmax(0,1fr)] lg:overflow-hidden">
            <WorkspaceToolbar />

            <section className="grid min-h-0 gap-2 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_260px] lg:overflow-hidden">
              <Panel
                className="min-h-[420px] lg:col-span-8 lg:min-h-0"
                title="Map"
                subtitle="Common operating picture"
                status="active"
                actions={<MapActions />}
                bleed
              >
                <div className="flex h-full min-h-0 flex-col">
                  <div className="border-border bg-background-elevated/50 flex flex-wrap items-center gap-1.5 border-b px-2 py-1.5">
                    {["Select", "Search around", "Draw", "Measure", "Annotate"].map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        className="border-border bg-background text-mono text-foreground-muted hover:border-border-strong hover:text-foreground rounded-sm border px-2 py-1 text-[10px] tracking-[0.08em] uppercase"
                      >
                        {tool}
                      </button>
                    ))}
                  </div>
                  <div className="min-h-[320px] flex-1 p-2 lg:min-h-0">
                    <TacticalMap
                      className="h-full rounded-sm"
                      grid="fine"
                      markers={mapMarkers}
                      zones={mapZones}
                      aspectRatio={null}
                      caption="Live ontology objects · 18 selected"
                    />
                  </div>
                </div>
              </Panel>

              <Panel
                className="lg:col-span-4"
                title="Object Set"
                subtitle="Preview"
                actions={
                  <StatusBadge status={selectedAlert.status}>{selectedAlert.id}</StatusBadge>
                }
              >
                <SelectionPreview alert={selectedAlert} />
              </Panel>

              <Panel
                className="lg:col-span-7"
                title="Results"
                subtitle="Flight alerts"
                actions={
                  <span className="text-mono text-foreground-subtle text-[10px] tracking-[0.08em] uppercase">
                    4 of 184
                  </span>
                }
                bleed
              >
                <AlertTable selectedId={selectedAlert.id} onSelect={setSelectedAlert} />
              </Panel>

              <Panel
                className="lg:col-span-5"
                title="Linked Properties"
                subtitle="Aggregations"
                bleed
              >
                <div className="grid h-full min-h-[240px] gap-2 p-2 md:grid-cols-2 lg:min-h-0">
                  <LineChart
                    data={throughputData}
                    xKey="x"
                    series={[
                      { key: "inbound", label: "Inbound", color: "var(--color-chart-1)" },
                      { key: "delayed", label: "Delayed", color: "var(--color-warning)" },
                    ]}
                    thresholds={[{ value: 18, label: "Delay threshold", tone: "danger" }]}
                    height={220}
                  />
                  <BarChart
                    data={riskDistribution}
                    xKey="x"
                    series={[
                      { key: "open", label: "Open", color: "var(--color-danger)", stackId: "risk" },
                      {
                        key: "actioned",
                        label: "Actioned",
                        color: "var(--color-info)",
                        stackId: "risk",
                      },
                    ]}
                    height={220}
                  />
                </div>
              </Panel>
            </section>

            <aside className="grid min-h-0 gap-2 lg:row-span-2 lg:overflow-hidden">
              <Panel title="AIP Assist" subtitle="Action context" status="new">
                <AipPanel alert={selectedAlert} />
              </Panel>
              <Panel title="Lineage" subtitle="Object pipeline" bleed>
                <LineagePanel />
              </Panel>
              <Panel title="Schedule" subtitle="Execution window" bleed>
                <div className="p-2">
                  <GanttTimeline
                    columns={["06", "07", "08", "09", "10", "11", "12"]}
                    tasks={timelineTasks}
                    nowAt={4.35}
                    rowHeight={26}
                    labelWidth={136}
                  />
                </div>
              </Panel>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="border-border bg-background-elevated flex h-auto shrink-0 flex-col border-b lg:h-11 lg:flex-row lg:items-center">
      <div className="flex h-11 items-center gap-2 px-3">
        <div className="border-primary/40 bg-primary/15 text-mono text-primary grid size-6 place-items-center rounded-sm border text-[10px] font-semibold">
          B
        </div>
        <div className="min-w-0">
          <div className="text-mono text-foreground text-[11px] tracking-[0.12em] uppercase">
            Foundry
          </div>
          <div className="text-foreground-subtle text-[11px] leading-none">
            Air operations workspace
          </div>
        </div>
      </div>
      <div className="border-border flex min-w-0 flex-1 items-center gap-2 border-t px-3 py-2 lg:border-t-0 lg:border-l lg:py-0">
        <div className="border-border bg-background flex h-7 min-w-0 flex-1 items-center gap-2 rounded-sm border px-2">
          <Search className="text-foreground-subtle size-3.5" />
          <span className="text-foreground-muted truncate text-sm">
            Search ontology objects, saved explorations, actions...
          </span>
          <kbd className="border-border bg-background-elevated text-mono text-foreground-subtle hidden rounded-[2px] border px-1 text-[10px] sm:inline">
            ⌘K
          </kbd>
        </div>
        <button
          type="button"
          className="border-border text-mono text-foreground-muted hover:border-border-strong hover:text-foreground hidden h-7 items-center gap-1.5 rounded-sm border px-2 text-[10px] tracking-[0.08em] uppercase sm:inline-flex"
        >
          Branch: prod
          <ChevronDown className="size-3" />
        </button>
        <button
          type="button"
          className="border-primary/50 bg-primary/10 text-mono text-primary hover:bg-primary/15 inline-flex h-7 items-center gap-1.5 rounded-sm border px-2 text-[10px] tracking-[0.08em] uppercase"
        >
          <Plus className="size-3" />
          Action
        </button>
      </div>
    </header>
  );
}

function OntologyExplorer() {
  return (
    <div className="flex h-full flex-col gap-3 p-2">
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="text-mono text-foreground-subtle text-[10px] tracking-[0.12em] uppercase">
            Object Explorer
          </div>
          <div className="text-foreground text-sm font-medium">Aviation Ontology</div>
        </div>
        <Database className="text-foreground-subtle size-4" />
      </div>

      <div className="border-border bg-background rounded-sm border p-1.5">
        <div className="text-mono text-foreground-subtle mb-1.5 flex items-center gap-1.5 px-1 text-[10px] tracking-[0.08em] uppercase">
          <Braces className="size-3" />
          Object types
        </div>
        <div className="space-y-1">
          {objectTypes.map((type) => (
            <button
              key={type.label}
              type="button"
              className="text-foreground-muted hover:bg-accent hover:text-foreground flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-left text-sm"
            >
              <span className="truncate">{type.label}</span>
              <span className={`text-mono text-[10px] ${objectTypeCountClass[type.tone]}`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-border bg-background rounded-sm border p-1.5">
        <div className="text-mono text-foreground-subtle mb-1.5 flex items-center gap-1.5 px-1 text-[10px] tracking-[0.08em] uppercase">
          <Table2 className="size-3" />
          Saved views
        </div>
        <div className="space-y-1">
          {savedViews.map((view, index) => (
            <div
              key={view}
              className="text-foreground-muted flex items-center justify-between rounded-sm px-2 py-1.5 text-sm"
            >
              <span>{view}</span>
              {index === 0 && <StatusBadge status="active">OPEN</StatusBadge>}
            </div>
          ))}
        </div>
      </div>

      <div className="border-border bg-background mt-auto rounded-sm border p-2">
        <div className="text-mono text-foreground-subtle mb-2 text-[10px] tracking-[0.08em] uppercase">
          Security marking
        </div>
        <div className="text-foreground-muted flex items-center gap-2 text-sm">
          <Shield className="text-success size-4" />
          Row-level policies active
        </div>
      </div>
    </div>
  );
}

function WorkspaceToolbar() {
  return (
    <div className="border-border bg-card flex flex-col gap-2 rounded-md border p-2 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-1.5">
        {["Explore", "Results", "Charts", "Map", "SQL"].map((item, index) => (
          <button
            key={item}
            type="button"
            className={`text-mono rounded-sm px-2 py-1 text-[10px] tracking-[0.08em] uppercase ${
              index === 0
                ? "border-primary/50 bg-primary/10 text-primary border"
                : "border-border text-foreground-muted hover:border-border-strong hover:text-foreground border"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="text-mono text-foreground-subtle flex flex-wrap items-center gap-2 text-[10px] tracking-[0.08em] uppercase">
        <span>FlightAlert where severity ≥ high</span>
        <StatusBadge status="active">184 objects</StatusBadge>
      </div>
    </div>
  );
}

function MapActions() {
  return (
    <div className="text-mono text-foreground-subtle hidden items-center gap-1.5 text-[10px] tracking-[0.08em] uppercase sm:flex">
      <span className="inline-flex items-center gap-1">
        <Layers className="size-3" />5 layers
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock3 className="size-3" />
        live
      </span>
    </div>
  );
}

function SelectionPreview({ alert }: { alert: (typeof alertRows)[number] }) {
  const properties = [
    ["Object RID", `ri.flight-alert.main.${alert.id.toLowerCase()}`],
    ["Route", alert.route],
    ["Risk", alert.risk],
    ["Owner", alert.owner],
    ["Last updated", "2m 14s ago"],
  ];

  return (
    <div className="flex h-full min-h-[260px] flex-col gap-3">
      <div className="border-border bg-background rounded-sm border p-3">
        <div className="text-mono text-foreground-subtle mb-1 text-[10px] tracking-[0.1em] uppercase">
          Selected object
        </div>
        <div className="text-foreground text-xl font-semibold tracking-tight">{alert.object}</div>
        <div className="text-foreground-muted mt-1 text-sm">
          {alert.id} · {alert.route}
        </div>
      </div>
      <div className="space-y-1.5">
        {properties.map(([label, value]) => (
          <div
            key={label}
            className="border-border bg-background grid grid-cols-[96px_minmax(0,1fr)] gap-2 rounded-sm border px-2 py-1.5"
          >
            <span className="text-mono text-foreground-subtle text-[10px] tracking-[0.08em] uppercase">
              {label}
            </span>
            <span className="text-foreground-muted truncate text-sm">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <button
          type="button"
          className="border-primary/50 bg-primary/10 text-mono text-primary rounded-sm border px-2 py-1.5 text-[10px] tracking-[0.08em] uppercase"
        >
          Open object
        </button>
        <button
          type="button"
          className="border-border text-mono text-foreground-muted hover:border-border-strong hover:text-foreground rounded-sm border px-2 py-1.5 text-[10px] tracking-[0.08em] uppercase"
        >
          Compare
        </button>
      </div>
    </div>
  );
}

function AlertTable({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (alert: (typeof alertRows)[number]) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead className="border-border bg-background-elevated text-mono text-foreground-subtle border-b text-[10px] tracking-[0.08em] uppercase">
          <tr>
            <th className="w-8 px-2 py-2 text-left">
              <input type="checkbox" aria-label="Select all alerts" />
            </th>
            <th className="px-2 py-2 text-left">RID</th>
            <th className="px-2 py-2 text-left">Object</th>
            <th className="px-2 py-2 text-left">Route</th>
            <th className="px-2 py-2 text-left">Risk</th>
            <th className="px-2 py-2 text-left">Owner</th>
            <th className="px-2 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {alertRows.map((row) => (
            <tr
              key={row.id}
              className={`border-border/70 hover:bg-accent/70 cursor-pointer border-b ${selectedId === row.id ? "bg-primary/10" : ""}`}
              onClick={() => onSelect(row)}
            >
              <td className="px-2 py-2">
                <input
                  type="checkbox"
                  aria-label={`Select ${row.id}`}
                  checked={selectedId === row.id}
                  readOnly
                />
              </td>
              <td className="text-mono text-foreground-muted px-2 py-2 text-[11px]">{row.id}</td>
              <td className="text-foreground px-2 py-2 font-medium">{row.object}</td>
              <td className="text-foreground-muted px-2 py-2">{row.route}</td>
              <td className="text-foreground-muted px-2 py-2">{row.risk}</td>
              <td className="text-foreground-muted px-2 py-2">{row.owner}</td>
              <td className="px-2 py-2">
                <StatusBadge status={row.status}>{row.status}</StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AipPanel({ alert }: { alert: (typeof alertRows)[number] }) {
  return (
    <div className="text-foreground-muted space-y-3 text-sm">
      <div className="border-border bg-background flex items-start gap-2 rounded-sm border p-2">
        <Sparkles className="text-primary mt-0.5 size-4 shrink-0" />
        <p>
          The selected alert is linked to{" "}
          <span className="text-foreground">12 downstream rotations</span> and one active weather
          polygon. Recommend opening a writeback action for {alert.owner}.
        </p>
      </div>
      <div className="space-y-1.5">
        {["Explain contributing factors", "Draft dispatcher action", "Find similar incidents"].map(
          (action) => (
            <button
              key={action}
              type="button"
              className="border-border bg-background text-foreground-muted hover:border-border-strong hover:text-foreground flex w-full items-center justify-between rounded-sm border px-2 py-1.5 text-left"
            >
              <span>{action}</span>
              <PanelRight className="size-3.5" />
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function LineagePanel() {
  return (
    <div className="flex h-full min-h-[150px] items-center overflow-x-auto p-3">
      {lineageNodes.map((node, index) => (
        <React.Fragment key={node}>
          <div className="border-border bg-background min-w-[120px] rounded-sm border p-2">
            <div className="text-mono text-foreground-subtle mb-1 flex items-center gap-1.5 text-[10px] tracking-[0.08em] uppercase">
              {index === 3 ? (
                <Activity className="text-primary size-3" />
              ) : (
                <Database className="size-3" />
              )}
              {index === 3 ? "Model" : "Dataset"}
            </div>
            <div className="text-foreground-muted truncate text-sm">{node}</div>
          </div>
          {index < lineageNodes.length - 1 && (
            <div className="bg-border-strong h-px w-8 shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export { DashboardOps };
