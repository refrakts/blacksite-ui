import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { DashboardOps } from "@/registry/blacksite/blocks/dashboard-ops";

export const metadata = {
  title: "Preview · ops-dashboard — Blacksite UI",
};

export default function OpsDashboardPreviewPage() {
  return (
    <div className="relative h-svh">
      <Link
        href="/"
        className="border-border bg-background-elevated/80 text-mono text-foreground-muted hover:text-foreground hover:border-border-strong fixed top-3 left-3 z-50 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-[10px] tracking-[0.1em] uppercase backdrop-blur-sm"
      >
        <ArrowLeft className="size-3" />
        Back to library
      </Link>
      <DashboardOps />
    </div>
  );
}
