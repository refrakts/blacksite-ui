"use client";

import * as React from "react";
import {
  Activity,
  Braces,
  ChevronDown,
  Clock3,
  Database,
  Layers,
  PanelRight,
  Plus,
  Search,
  Shield,
  Sparkles,
  Table2,
} from "lucide-react";

import { BarChart } from "@/registry/blacksite/charts/bar-chart";
import { GanttTimeline } from "@/registry/blacksite/charts/gantt-timeline";
import { LineChart } from "@/registry/blacksite/charts/line-chart";
import { TacticalMap } from "@/registry/blacksite/maps/tactical-map";
import { Panel } from "@/registry/blacksite/ui/panel";
import { SidebarRail } from "@/registry/blacksite/ui/sidebar-rail";
import { StatusBadge } from "@/registry/blacksite/ui/status-badge";

import {
  alertRows,
  lineageNodes,
  mapMarkers,
  mapZones,
  navFooter,
  navItems,
  objectTypeCountClass,
  objectTypes,
  riskDistribution,
  savedViews,
  throughputData,
  timelineTasks,
} from "./dashboard-ops-data";

export interface DashboardOpsProps extends React.HTMLAttributes<HTMLDivElement> {}

function DashboardOps({ className, ...props }: DashboardOpsProps) {
  const [activeNav, setActiveNav] = React.useState("home");
  const [selectedAlert, setSelectedAlert] = React.useState(alertRows[0]);

  const lineChartSeries = React.useMemo(
    () => [
      { key: "inbound", label: "Inbound", color: "var(--color-chart-1)" },
      { key: "delayed", label: "Delayed", color: "var(--color-warning)" },
    ],
    [],
  );

  const barChartSeries = React.useMemo(
    () => [
      { key: "open", label: "Open", color: "var(--color-danger)", stackId: "risk" },
      { key: "actioned", label: "Actioned", color: "var(--color-info)", stackId: "risk" },
    ],
    [],
  );

  const lineChartThresholds = React.useMemo(
    () => [{ value: 18, label: "Delay threshold", tone: "danger" as const }],
    [],
  );

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
                    series={lineChartSeries}
                    thresholds={lineChartThresholds}
                    height={220}
                  />
                  <BarChart data={riskDistribution} xKey="x" series={barChartSeries} height={220} />
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

const TopBar = React.memo(function TopBar() {
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
});

const OntologyExplorer = React.memo(function OntologyExplorer() {
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
});

const WorkspaceToolbar = React.memo(function WorkspaceToolbar() {
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
});

const MapActions = React.memo(function MapActions() {
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
});

const SelectionPreview = React.memo(function SelectionPreview({
  alert,
}: {
  alert: (typeof alertRows)[number];
}) {
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
});

const AlertTable = React.memo(function AlertTable({
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
            <th className="w-8 px-2 py-2 text-left" aria-hidden="true" />
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
              role="button"
              tabIndex={0}
              aria-selected={selectedId === row.id}
              className={`border-border/70 hover:bg-accent/70 cursor-pointer border-b ${selectedId === row.id ? "bg-primary/10" : ""}`}
              onClick={() => onSelect(row)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(row);
                }
              }}
            >
              <td className="px-2 py-2" aria-hidden="true">
                <span
                  className={`inline-block size-3 rounded-full border ${
                    selectedId === row.id ? "bg-primary border-primary" : "border-foreground-subtle"
                  }`}
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
});

const AipPanel = React.memo(function AipPanel({ alert }: { alert: (typeof alertRows)[number] }) {
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
});

const LineagePanel = React.memo(function LineagePanel() {
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
});

export { DashboardOps };
