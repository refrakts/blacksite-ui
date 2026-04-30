"use client";

import * as React from "react";
import {
  BarChart3,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  SlidersHorizontal,
} from "lucide-react";

import { AppHeader } from "@/registry/blacksite/ui/app-header";
import { Panel } from "@/registry/blacksite/ui/panel";
import { SidebarRail, type SidebarRailItem } from "@/registry/blacksite/ui/sidebar-rail";
import { StatCard } from "@/registry/blacksite/ui/stat-card";
import { StatusBadge } from "@/registry/blacksite/ui/status-badge";
import { GanttTimeline, type GanttTask } from "@/registry/blacksite/charts/gantt-timeline";
import { LineChart } from "@/registry/blacksite/charts/line-chart";
import { TacticalMap, type MapMarker, type MapZone } from "@/registry/blacksite/maps/tactical-map";

const navItems: SidebarRailItem[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "layers", icon: Layers, label: "Layers" },
  { id: "ontology", icon: Shield, label: "Ontology" },
  { id: "charts", icon: BarChart3, label: "Charts" },
  { id: "settings", icon: Settings, label: "Settings" },
];

const navFooter: SidebarRailItem[] = [
  { id: "filters", icon: SlidersHorizontal, label: "Filters" },
  { id: "help", icon: HelpCircle, label: "Help", badge: "1" },
  { id: "exit", icon: LogOut, label: "Exit" },
];

const ganttTasks: GanttTask[] = [
  { id: "insertion", label: "Insertion", start: 0, end: 1.5, tone: "primary" },
  { id: "sweep-1", label: "Patrol sweep", start: 0.6, end: 2.2, tone: "primary" },
  { id: "sweep-2", label: "Patrol sweep", start: 2, end: 3.6, tone: "primary" },
  { id: "strike", label: "Strike package", start: 3.5, end: 4.6, tone: "warning" },
  { id: "exfil", label: "Exfil response", start: 4.4, end: 6, tone: "warning" },
];

const loadSeries = [
  { x: "0", series_a: 0.5 },
  { x: "20", series_a: 1.8 },
  { x: "40", series_a: 4.2 },
  { x: "60", series_a: 8.0 },
  { x: "80", series_a: 12.0 },
  { x: "100", series_a: 19.5 },
];

const mapZones: MapZone[] = [
  {
    id: "lz",
    label: "Forward LZ",
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
    label: "Asset perimeter",
    points: [
      [0.42, 0.55],
      [0.66, 0.55],
      [0.66, 0.78],
      [0.42, 0.78],
    ],
    tone: "gold",
    variant: "dashed",
  },
];

const mapMarkers: MapMarker[] = [
  { id: "extract-1", label: "Operator extraction point", x: 0.66, y: 0.32, tone: "info", shape: "pin" },
  { id: "extract-2", label: "Operator extraction point", x: 0.34, y: 0.74, tone: "warning", shape: "triangle" },
  { id: "asset", label: "Asset perimeter", x: 0.54, y: 0.66, tone: "gold", shape: "pin" },
];

const integrityRows = [
  { id: "staging-area", label: "Staging area", status: "active" as const },
  { id: "forward-base", label: "Forward base", status: "active" as const },
  { id: "sensor-array", label: "Sensor array", status: "active" as const },
  { id: "comms-rigging", label: "Comms rigging", status: "active" as const },
  { id: "comms-zone", label: "Comms zone", status: "active" as const },
  { id: "outer-perimeter", label: "Outer perimeter", status: "active" as const },
];

export interface DashboardOpsProps extends React.HTMLAttributes<HTMLDivElement> {}

function DashboardOps({ className, ...props }: DashboardOpsProps) {
  const [activeNav, setActiveNav] = React.useState("layers");

  return (
    <div
      className={
        "flex h-svh flex-col overflow-hidden bg-background text-foreground " + (className ?? "")
      }
      {...props}
    >
      <AppHeader
        title="Sentinel Ops"
        subtitle="Foundry"
        user={{ name: "n.drobnic" }}
        windowControls
      />

      <div className="flex flex-1 min-h-0">
        <SidebarRail
          items={navItems}
          footerItems={navFooter}
          activeId={activeNav}
          onActiveChange={setActiveNav}
        />

        <main className="flex-1 min-w-0 p-3 flex flex-col gap-3">
          {/* Title row + KPIs */}
          <div className="flex items-stretch gap-3">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md border border-border bg-card min-w-[260px]">
              <div className="size-12 grid place-items-center rounded-sm border border-gold/40 bg-gold/10 text-gold font-display text-2xl">
                S
              </div>
              <div>
                <div className="text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
                  Operation
                </div>
                <div className="text-2xl font-semibold tracking-tight leading-tight">
                  SENTINEL OPS{" "}
                  <span className="text-foreground-muted font-normal">— FOUNDRY</span>
                </div>
              </div>
            </div>

            <StatCard
              className="flex-1"
              label="Asset deployment status"
              value="ACTIVE"
              valueTone="success"
              status="active"
              statusLabel="ACT"
              progress={92}
              progressTone="success"
            />
            <StatCard
              className="flex-1"
              label="Drone asset inventory"
              value="47 units (operational)"
              status="nominal"
              statusLabel="NOMINAL"
              progress={78}
              progressTone="info"
            />
            <StatCard
              className="flex-1"
              label="Contact threat assessment"
              value="12 contacts — HIGH RISK"
              valueTone="warning"
              status="high"
              statusLabel="HIGH"
              progress={64}
              progressTone="warning"
            />
            <StatCard
              className="flex-1"
              label="Asset integrity"
              value="COMPROMISED (35%)"
              valueTone="danger"
              status="new"
              statusLabel="NEW"
              progress={35}
              progressTone="danger"
            />
          </div>

          {/* Main grid */}
          <div className="grid flex-1 min-h-0 grid-cols-12 gap-3">
            {/* Map panel */}
            <Panel
              className="col-span-7"
              title="Sector C-3"
              subtitle="AOR"
              status="active"
              bleed
            >
              <div className="flex flex-col h-full min-h-0">
                <div className="flex items-center gap-2 p-2 border-b border-border">
                  <button className="text-mono text-[10px] uppercase tracking-[0.08em] px-2 h-6 rounded-sm border border-border hover:border-border-strong">
                    L1 / Plan
                  </button>
                  <button className="text-mono text-[10px] uppercase tracking-[0.08em] px-2 h-6 rounded-sm border border-border hover:border-border-strong">
                    L2 / Recon
                  </button>
                  <button className="text-mono text-[10px] uppercase tracking-[0.08em] px-2 h-6 rounded-sm border border-border hover:border-border-strong">
                    RFP
                  </button>
                </div>
                <div className="flex-1 min-h-0 p-2">
                  <TacticalMap
                    grid="fine"
                    markers={mapMarkers}
                    zones={mapZones}
                    aspectRatio={null}
                    className="h-full"
                  />
                </div>
                <div className="border-t border-border p-2 flex items-center justify-between gap-3">
                  <div className="grid grid-cols-3 gap-x-4 gap-y-0.5 flex-1 min-w-0">
                    {integrityRows.map((row) => (
                      <div key={row.id} className="flex items-center gap-1.5 min-w-0">
                        <span className="size-1.5 rounded-full bg-success shrink-0" />
                        <span className="text-mono text-[10px] uppercase tracking-[0.06em] text-foreground-muted truncate">
                          {row.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-muted">
                      Integrity
                    </span>
                    <StatusBadge status="compromised">COMPROMISED (35%)</StatusBadge>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Right column */}
            <div className="col-span-5 flex flex-col gap-3 min-h-0">
              <Panel
                title="Timeline"
                subtitle="Gantt"
                actions={
                  <div className="flex items-center gap-1.5 text-mono text-[10px] uppercase tracking-[0.08em]">
                    <span className="inline-flex items-center gap-1 text-info">
                      <span className="size-2 rounded-[2px] bg-info" />
                      Plan
                    </span>
                    <span className="inline-flex items-center gap-1 text-warning">
                      <span className="size-2 rounded-[2px] bg-warning" />
                      Risk
                    </span>
                  </div>
                }
                closable
                bleed
              >
                <GanttTimeline
                  columns={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                  tasks={ganttTasks}
                  nowAt={4.2}
                />
              </Panel>

              <Panel
                title="Throughput vs. P99 latency"
                closable
                density="compact"
              >
                <LineChart
                  data={loadSeries}
                  xKey="x"
                  xLabel="Throughput (req/s)"
                  yLabel="P99 latency (ms)"
                  series={[{ key: "series_a", label: "P99 latency", color: "var(--color-chart-1)" }]}
                  thresholds={[{ value: 15, label: "Alert threshold", tone: "danger" }]}
                  height={180}
                />
              </Panel>
            </div>
          </div>

          <footer className="flex items-center justify-between text-mono text-[10px] uppercase tracking-[0.08em] text-foreground-subtle">
            <span>Dashboard +</span>
            <span>Full Palantir / Foundry / AIP</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export { DashboardOps };
