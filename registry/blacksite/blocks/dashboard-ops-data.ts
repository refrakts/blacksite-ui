import {
  BarChart3,
  GitBranch,
  Layers,
  LayoutDashboard,
  Map,
  Network,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import type { GanttTask } from "@/registry/blacksite/charts/gantt-timeline";
import type { MapMarker, MapZone } from "@/registry/blacksite/maps/tactical-map";
import type { SidebarRailItem } from "@/registry/blacksite/ui/sidebar-rail";
import type { StatusBadgeProps } from "@/registry/blacksite/ui/status-badge";

export const navItems: SidebarRailItem[] = [
  { id: "home", icon: LayoutDashboard, label: "Operational picture" },
  { id: "map", icon: Map, label: "Map" },
  { id: "objects", icon: Network, label: "Object Explorer", badge: "18" },
  { id: "lineage", icon: GitBranch, label: "Lineage" },
  { id: "analytics", icon: BarChart3, label: "Quiver" },
];

export const navFooter: SidebarRailItem[] = [
  { id: "layers", icon: Layers, label: "Layer manager" },
  { id: "filters", icon: SlidersHorizontal, label: "Filters" },
  { id: "aip", icon: Sparkles, label: "AIP Assist", badge: "B" },
];

export const objectTypes = [
  { label: "Flight alert", count: 184, tone: "danger" },
  { label: "Aircraft", count: 1242, tone: "info" },
  { label: "Airport", count: 391, tone: "success" },
  { label: "Route segment", count: 8819, tone: "gold" },
  { label: "Maintenance event", count: 67, tone: "warning" },
] as const;

export const objectTypeCountClass: Record<(typeof objectTypes)[number]["tone"], string> = {
  danger: "text-danger",
  info: "text-info",
  success: "text-success",
  gold: "text-gold",
  warning: "text-warning",
};

export const savedViews = [
  "Delayed departures",
  "Maintenance risk",
  "Crew impact",
  "Weather overlays",
];

export const mapZones: MapZone[] = [
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

export const mapMarkers: MapMarker[] = [
  { id: "ord", label: "ORD", x: 0.54, y: 0.52, tone: "danger", status: "critical", shape: "pin" },
  {
    id: "dfw",
    label: "DFW",
    x: 0.36,
    y: 0.71,
    tone: "warning",
    status: "high",
    shape: "triangle",
  },
  { id: "den", label: "DEN", x: 0.28, y: 0.55, tone: "info", status: "active", shape: "square" },
  { id: "iad", label: "IAD", x: 0.73, y: 0.58, tone: "gold", status: "new", shape: "pin" },
  {
    id: "atl",
    label: "ATL",
    x: 0.62,
    y: 0.76,
    tone: "success",
    status: "nominal",
    shape: "pin",
  },
];

export const throughputData = [
  { x: "06:00", inbound: 82, delayed: 9, threshold: 18 },
  { x: "07:00", inbound: 96, delayed: 14, threshold: 18 },
  { x: "08:00", inbound: 118, delayed: 22, threshold: 18 },
  { x: "09:00", inbound: 136, delayed: 31, threshold: 18 },
  { x: "10:00", inbound: 142, delayed: 28, threshold: 18 },
  { x: "11:00", inbound: 128, delayed: 19, threshold: 18 },
];

export const riskDistribution = [
  { x: "WX", open: 24, actioned: 11 },
  { x: "MX", open: 16, actioned: 7 },
  { x: "CREW", open: 9, actioned: 13 },
  { x: "ATC", open: 21, actioned: 5 },
  { x: "SEC", open: 4, actioned: 6 },
];

export const timelineTasks: GanttTask[] = [
  { id: "ingest", label: "ADS-B ingest", start: 0.2, end: 1.4, tone: "success" },
  { id: "linking", label: "Object linking", start: 1.0, end: 2.5, tone: "info" },
  { id: "model", label: "Delay model scoring", start: 2.2, end: 4.1, tone: "primary" },
  { id: "review", label: "Dispatch review", start: 3.6, end: 5.0, tone: "warning" },
  { id: "writeback", label: "Action writeback", start: 4.8, end: 6.4, tone: "gold" },
];

export const alertRows: Array<{
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

export const lineageNodes = [
  "raw_adsb_events",
  "flight_object",
  "risk_features",
  "delay_model_v7",
  "dispatch_action",
];
