import Link from "next/link";

import { Panel } from "@/registry/blacksite/ui/panel";
import { Kbd } from "@/registry/blacksite/ui/kbd";

export const metadata = {
  title: "Docs — Blacksite UI",
};

export default function DocsPage() {
  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border bg-background-elevated px-6 h-12 flex items-center gap-3">
        <Link href="/" className="text-mono text-[11px] uppercase tracking-[0.12em]">
          ← Blacksite UI
        </Link>
        <span className="text-mono text-[11px] uppercase tracking-[0.1em] text-foreground-muted">
          Docs
        </span>
      </header>

      <main className="mx-auto max-w-3xl p-6 space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Getting started</h1>
        <p className="text-foreground-muted">
          Blacksite UI is a Palantir-inspired component registry that plugs into the official{" "}
          <code className="text-mono text-primary">shadcn</code> CLI. You install components into{" "}
          <em>your</em> codebase — no runtime dependency, no opaque library.
        </p>

        <Panel title="01" subtitle="Bootstrap a Next.js + shadcn app" density="compact">
          <pre className="text-mono text-[12px] leading-relaxed bg-background-overlay rounded-sm p-3 border border-border-strong overflow-x-auto">
            npx create-next-app@latest my-ops-app
            {"\n"}cd my-ops-app
            {"\n"}npx shadcn@latest init
          </pre>
        </Panel>

        <Panel title="02" subtitle="Install the Blacksite theme" density="compact">
          <pre className="text-mono text-[12px] leading-relaxed bg-background-overlay rounded-sm p-3 border border-border-strong overflow-x-auto">
            npx shadcn@latest add{" "}
            <span className="text-primary">https://blacksite-ui.dev/r/theme.json</span>
          </pre>
          <p className="text-sm text-foreground-muted mt-2">
            This drops Palantir-inspired CSS variables, font families and status colors into your
            <code className="text-mono"> globals.css</code>.
          </p>
        </Panel>

        <Panel title="03" subtitle="Add a component" density="compact">
          <pre className="text-mono text-[12px] leading-relaxed bg-background-overlay rounded-sm p-3 border border-border-strong overflow-x-auto">
            <span className="text-foreground-subtle"># Single component</span>
            {"\n"}npx shadcn@latest add{" "}
            <span className="text-primary">https://blacksite-ui.dev/r/stat-card.json</span>
            {"\n\n"}
            <span className="text-foreground-subtle">
              # The full Birthday-Ops dashboard block
            </span>
            {"\n"}npx shadcn@latest add{" "}
            <span className="text-primary">https://blacksite-ui.dev/r/dashboard-ops.json</span>
          </pre>
        </Panel>

        <Panel title="04" subtitle="Import" density="compact">
          <pre className="text-mono text-[12px] leading-relaxed bg-background-overlay rounded-sm p-3 border border-border-strong overflow-x-auto">
            <span className="text-info">import</span>{" "}
            {`{ StatCard }`} <span className="text-info">from</span>{" "}
            <span className="text-primary">"@/components/ui/stat-card"</span>;{"\n\n"}
            <span className="text-info">export default function</span> Page() {`{`}
            {"\n  "}
            <span className="text-info">return</span>{" "}
            <span className="text-primary">{`<StatCard label="Cake" value="ACTIVE" status="active" />`}</span>;
            {"\n}"}
          </pre>
        </Panel>

        <h2 className="text-xl font-semibold tracking-tight pt-4">Conventions</h2>
        <ul className="list-disc pl-5 text-sm text-foreground-muted space-y-1.5">
          <li>
            All components live under{" "}
            <code className="text-mono">@/components/...</code> after install (you can re-alias in{" "}
            <code className="text-mono">components.json</code>).
          </li>
          <li>
            Status surfaces use the <code className="text-mono">StatusBadge</code> primitive — the
            same status keys flow through every component.
          </li>
          <li>
            Mono fonts are reserved for labels, axis ticks, kbd and codes. Sans-serif for body and
            values.
          </li>
          <li>
            Charts and maps are pure React; no global state or theme provider required.
          </li>
        </ul>

        <h2 className="text-xl font-semibold tracking-tight pt-4">Keyboard</h2>
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <span>opens the search palette in the demo app.</span>
        </div>
      </main>
    </div>
  );
}
