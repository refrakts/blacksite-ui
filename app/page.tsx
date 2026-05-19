import Link from "next/link";
import { ArrowRight, Github, Package, Terminal } from "lucide-react";

import { Button } from "@/registry/blacksite/ui/button";
import { Kbd } from "@/registry/blacksite/ui/kbd";
import { Panel } from "@/registry/blacksite/ui/panel";
import { StatusBadge } from "@/registry/blacksite/ui/status-badge";

const STORYBOOK_URL = process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "https://storybook.blacksite.sh";
const STORYBOOK_BASE = `${STORYBOOK_URL}/?path=/docs`;

const sections = [
  {
    title: "Primitives",
    items: [
      { name: "Button", href: `${STORYBOOK_BASE}/primitives-button--docs` },
      { name: "Badge", href: `${STORYBOOK_BASE}/primitives-badge--docs` },
      { name: "Card", href: `${STORYBOOK_BASE}/primitives-card--docs` },
      { name: "Progress", href: `${STORYBOOK_BASE}/primitives-progress--docs` },
      { name: "Separator", href: `${STORYBOOK_BASE}/primitives-separator--docs` },
      { name: "Input", href: `${STORYBOOK_BASE}/primitives-input--docs` },
      { name: "Tooltip", href: `${STORYBOOK_BASE}/primitives-tooltip--docs` },
      { name: "Tabs", href: `${STORYBOOK_BASE}/primitives-tabs--docs` },
    ],
  },
  {
    title: "Tactical",
    items: [
      { name: "Status badge", href: `${STORYBOOK_BASE}/tactical-status-badge--docs` },
      { name: "Panel", href: `${STORYBOOK_BASE}/tactical-panel--docs` },
      { name: "Stat card", href: `${STORYBOOK_BASE}/tactical-stat-card--docs` },
      { name: "Metric", href: `${STORYBOOK_BASE}/tactical-metric--docs` },
      { name: "Data list", href: `${STORYBOOK_BASE}/tactical-data-list--docs` },
      { name: "App header", href: `${STORYBOOK_BASE}/tactical-app-header--docs` },
      { name: "Sidebar rail", href: `${STORYBOOK_BASE}/tactical-sidebar-rail--docs` },
      { name: "Kbd", href: `${STORYBOOK_BASE}/primitives-kbd--docs` },
    ],
  },
  {
    title: "Charts & Maps",
    items: [
      { name: "Line chart", href: `${STORYBOOK_BASE}/charts-line-chart--docs` },
      { name: "Bar chart", href: `${STORYBOOK_BASE}/charts-bar-chart--docs` },
      { name: "Gantt timeline", href: `${STORYBOOK_BASE}/charts-gantt-timeline--docs` },
      { name: "Tactical map", href: `${STORYBOOK_BASE}/maps-tactical-map--docs` },
    ],
  },
];

export default function Home() {
  return (
    <div className="bg-background min-h-svh">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <Hero />

        <section className="mt-12 grid gap-3 md:grid-cols-3">
          {sections.map((section) => (
            <Panel key={section.title} title={section.title} density="compact">
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground-muted hover:bg-accent hover:text-foreground flex items-center justify-between gap-2 rounded-sm px-1.5 py-1 text-sm"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="text-foreground-subtle size-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </section>

        <section className="mt-12 grid gap-3 md:grid-cols-2">
          <Panel title="Install" subtitle="CLI" density="compact">
            <pre className="text-mono text-foreground bg-background-overlay border-border-strong overflow-x-auto rounded-sm border p-3 text-[12px] leading-relaxed">
              <span className="text-foreground-subtle"># Add a single component</span>
              {"\n"}npx shadcn@latest add{" "}
              <span className="text-primary">https://blacksite.sh/r/stat-card.json</span>
              {"\n\n"}
              <span className="text-foreground-subtle"># Drop in the theme tokens</span>
              {"\n"}npx shadcn@latest add{" "}
              <span className="text-primary">https://blacksite.sh/r/theme.json</span>
            </pre>
          </Panel>

          <Panel title="What you get" subtitle="Source, not a runtime" density="compact">
            <ul className="text-foreground-muted list-disc space-y-1.5 pl-5 text-sm">
              <li>
                Each component is copied into <code className="text-mono">@/components</code> in
                your project — yours to edit.
              </li>
              <li>
                No <code className="text-mono">blacksite-ui</code> npm package, no runtime
                dependency, no version drift.
              </li>
              <li>Tailwind v4 tokens, Radix primitives, Recharts under the hood.</li>
              <li>Works inside any existing shadcn project.</li>
            </ul>
          </Panel>
        </section>

        <section className="mt-12">
          <Panel title="Example composition" subtitle="ops-dashboard" density="compact">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-foreground text-sm">
                  See every primitive working together in a single Foundry-style layout.
                </p>
                <p className="text-mono text-foreground-muted text-[11px] tracking-[0.08em] uppercase">
                  Installable as a registry block — copy + own it.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="tactical">
                  <Link href="/preview/ops-dashboard">
                    Preview
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="primary">
                  <Link href="/docs">
                    <Package className="size-3.5" />
                    How to install
                  </Link>
                </Button>
              </div>
            </div>
          </Panel>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="border-border bg-background-elevated border-b">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="border-primary/40 bg-primary/15 text-primary text-mono grid size-6 place-items-center rounded-sm border text-[10px] font-bold">
            B
          </div>
          <span className="text-mono text-foreground text-[11px] tracking-[0.12em] uppercase">
            Blacksite UI
          </span>
          <StatusBadge status="active">v0.1.0</StatusBadge>
        </Link>
        <nav className="ml-2 flex items-center gap-1">
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="text-mono text-foreground-muted hover:text-foreground px-2 py-1 text-[11px] tracking-[0.08em] uppercase"
          >
            Storybook
          </a>
          <Link
            href="/preview/ops-dashboard"
            className="text-mono text-foreground-muted hover:text-foreground px-2 py-1 text-[11px] tracking-[0.08em] uppercase"
          >
            Examples
          </Link>
          <Link
            href="/docs"
            className="text-mono text-foreground-muted hover:text-foreground px-2 py-1 text-[11px] tracking-[0.08em] uppercase"
          >
            Docs
          </Link>
        </nav>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/quantumlyy/blacksite-ui"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="border-border bg-card bg-grid-fine relative overflow-hidden rounded-md border">
      <div className="bg-scanlines pointer-events-none absolute inset-0" />
      <div className="relative px-8 py-12">
        <div className="flex items-center gap-2">
          <StatusBadge status="active">Component library</StatusBadge>
          <span className="text-mono text-foreground-subtle text-[10px] tracking-[0.1em] uppercase">
            v0.1.0 · 24 items · shadcn registry
          </span>
        </div>
        <h1 className="text-foreground mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          A Palantir-inspired component registry,
          <br />
          shipped as <span className="text-primary">ShadCN-compatible</span> primitives.
        </h1>
        <p className="text-foreground-muted mt-4 max-w-2xl">
          Tactical dark UI, monospace labels, status palettes, charts and maps — installable into
          your own codebase via the shadcn CLI. No runtime library. Tailwind v4 tokens. Radix
          primitives.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button asChild variant="primary">
            <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">
              Open Storybook
              <ArrowRight className="size-3.5" />
            </a>
          </Button>
          <Button asChild variant="tactical">
            <a href="/docs">
              <Terminal className="size-3.5" />
              Install guide
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-border bg-background-elevated mt-12 border-t">
      <div className="text-mono text-foreground-subtle mx-auto flex h-10 max-w-6xl items-center justify-between px-6 text-[10px] tracking-[0.1em] uppercase">
        <span>Blacksite UI — © {new Date().getFullYear()}</span>
        <span>Component registry · MIT</span>
      </div>
    </footer>
  );
}
