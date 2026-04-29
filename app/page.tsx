import Link from "next/link";
import { ArrowRight, Github, Terminal } from "lucide-react";

import { Button } from "@/registry/blacksite/ui/button";
import { Kbd } from "@/registry/blacksite/ui/kbd";
import { Panel } from "@/registry/blacksite/ui/panel";
import { StatusBadge } from "@/registry/blacksite/ui/status-badge";

const sections = [
  {
    title: "Primitives",
    items: [
      { name: "Button", href: "/components#button" },
      { name: "Badge", href: "/components#badge" },
      { name: "Card", href: "/components#card" },
      { name: "Progress", href: "/components#progress" },
      { name: "Separator", href: "/components#separator" },
      { name: "Input", href: "/components#input" },
      { name: "Tooltip", href: "/components#tooltip" },
      { name: "Tabs", href: "/components#tabs" },
    ],
  },
  {
    title: "Tactical",
    items: [
      { name: "Status badge", href: "/components#status-badge" },
      { name: "Panel", href: "/components#panel" },
      { name: "Stat card", href: "/components#stat-card" },
      { name: "Metric", href: "/components#metric" },
      { name: "Data list", href: "/components#data-list" },
      { name: "App header", href: "/components#app-header" },
      { name: "Sidebar rail", href: "/components#sidebar-rail" },
      { name: "Kbd", href: "/components#kbd" },
    ],
  },
  {
    title: "Charts & Maps",
    items: [
      { name: "Line chart", href: "/components#line-chart" },
      { name: "Bar chart", href: "/components#bar-chart" },
      { name: "Gantt timeline", href: "/components#gantt-timeline" },
      { name: "Tactical map", href: "/components#tactical-map" },
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
                    <Link
                      href={item.href}
                      className="flex items-center justify-between gap-2 px-1.5 py-1 rounded-sm text-sm text-foreground-muted hover:bg-accent hover:text-foreground"
                    >
                      <span>{item.name}</span>
                      <ArrowRight className="size-3 text-foreground-subtle" />
                    </Link>
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
              <span className="text-primary">https://blacksite-ui.dev/r/stat-card.json</span>
              {"\n\n"}
              <span className="text-foreground-subtle"># Add the full ops block</span>
              {"\n"}npx shadcn@latest add{" "}
              <span className="text-primary">https://blacksite-ui.dev/r/dashboard-ops.json</span>
            </pre>
          </Panel>

          <Panel title="Theme" subtitle="Tokens" density="compact">
            <pre className="text-mono text-[12px] leading-relaxed text-foreground bg-background-overlay rounded-sm p-3 border border-border-strong overflow-x-auto">
              <span className="text-foreground-subtle">/* Drop into your globals.css */</span>
              {"\n"}@import <span className="text-primary">"tailwindcss"</span>;{"\n"}
              @import <span className="text-primary">"./blacksite-theme.css"</span>;{"\n\n"}
              <span className="text-foreground-subtle">// 12-step palette, status colors,</span>
              {"\n"}
              <span className="text-foreground-subtle">// mono / display fonts, scanlines.</span>
            </pre>
          </Panel>
        </section>

        <section className="mt-12">
          <Panel title="Live demo" subtitle="Birthday Ops" status="active" closable>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-foreground-muted max-w-xl">
                See every component working together in a single Palantir-Foundry-style
                operations dashboard.
              </p>
              <Button asChild variant="primary">
                <Link href="/dashboard">
                  Open dashboard
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
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
          <StatusBadge status="active" pulse>
            v0.1
          </StatusBadge>
        </Link>
        <nav className="flex items-center gap-1 ml-2">
          <Link
            href="/components"
            className="text-mono text-[11px] uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground px-2 py-1"
          >
            Components
          </Link>
          <Link
            href="/dashboard"
            className="text-mono text-[11px] uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground px-2 py-1"
          >
            Dashboard
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
          <StatusBadge status="active" pulse>
            Operational
          </StatusBadge>
          <span className="text-mono text-[10px] uppercase tracking-[0.1em] text-foreground-subtle">
            Region · ENCONTIMSSORY
          </span>
        </div>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          A Palantir-inspired component registry,
          <br />
          shipped as <span className="text-primary">ShadCN-compatible</span> primitives.
        </h1>
        <p className="mt-4 max-w-2xl text-foreground-muted">
          Tactical dark UI, monospace labels, status palettes, charts and maps — all installable
          via the shadcn CLI and built on Tailwind v4.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Button asChild variant="primary">
            <a href="/components">
              Browse components
              <ArrowRight className="size-3.5" />
            </a>
          </Button>
          <Button asChild variant="tactical">
            <a href="/dashboard">
              <Terminal className="size-3.5" />
              Live demo
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
        <span>Palantir / Foundry inspired · MIT</span>
      </div>
    </footer>
  );
}
