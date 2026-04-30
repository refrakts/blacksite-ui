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
    <div className="min-h-svh bg-background">
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
                      className="flex items-center justify-between gap-2 px-1.5 py-1 rounded-sm text-sm text-foreground-muted hover:bg-accent hover:text-foreground"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="size-3 text-foreground-subtle" />
                    </a>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </section>

        <section className="mt-12 grid gap-3 md:grid-cols-2">
          <Panel title="Install" subtitle="CLI" density="compact">
            <pre className="text-mono text-[12px] leading-relaxed text-foreground bg-background-overlay rounded-sm p-3 border border-border-strong overflow-x-auto">
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
            <ul className="text-sm text-foreground-muted space-y-1.5 list-disc pl-5">
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
          <Panel
            title="Example composition"
            subtitle="ops-dashboard"
            density="compact"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm text-foreground">
                  See every primitive working together in a single Foundry-style layout.
                </p>
                <p className="text-mono text-[11px] uppercase tracking-[0.08em] text-foreground-muted">
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
    <header className="border-b border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl flex h-12 items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-6 grid place-items-center rounded-sm border border-primary/40 bg-primary/15 text-primary text-mono text-[10px] font-bold">
            B
          </div>
          <span className="text-mono text-[11px] uppercase tracking-[0.12em] text-foreground">
            Blacksite UI
          </span>
          <StatusBadge status="active">v0.1.0</StatusBadge>
        </Link>
        <nav className="flex items-center gap-1 ml-2">
          <a
            href={STORYBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="text-mono text-[11px] uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground px-2 py-1"
          >
            Storybook
          </a>
          <Link
            href="/preview/ops-dashboard"
            className="text-mono text-[11px] uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground px-2 py-1"
          >
            Examples
          </Link>
          <Link
            href="/docs"
            className="text-mono text-[11px] uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground px-2 py-1"
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
    <div className="relative overflow-hidden rounded-md border border-border bg-card bg-grid-fine">
      <div className="absolute inset-0 bg-scanlines pointer-events-none" />
      <div className="relative px-8 py-12">
        <div className="flex items-center gap-2">
          <StatusBadge status="active">Component library</StatusBadge>
          <span className="text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
            v0.1.0 · 24 items · shadcn registry
          </span>
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          A Palantir-inspired component registry,
          <br />
          shipped as <span className="text-primary">ShadCN-compatible</span> primitives.
        </h1>
        <p className="mt-4 max-w-2xl text-foreground-muted">
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
    <footer className="mt-12 border-t border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-10 text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
        <span>Blacksite UI — © {new Date().getFullYear()}</span>
        <span>Component registry · MIT</span>
      </div>
    </footer>
  );
}
