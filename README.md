# Blacksite UI

A Palantir-inspired component registry, shipped as **ShadCN-compatible** primitives.

Tactical dark UI, monospace labels, status palettes, charts and maps — all installable
via the `shadcn` CLI and built on Tailwind v4.

```
npx shadcn@latest add https://blacksite-ui.dev/r/dashboard-ops.json
```

> Inspired by Palantir Foundry / Apollo / Gotham. Not affiliated with Palantir.

## What's in the box

### Primitives
- `button`, `badge`, `card`, `progress`, `separator`, `input`, `tooltip`, `tabs`, `scroll-area`, `kbd`

### Tactical components
- `status-badge` — `ACTIVE`, `IDLE`, `NEW`, `HIGH`, `CRITICAL`, `COMPROMISED`, `NOMINAL`, `WARNING`, `SECURED`
- `panel` — titled card with header bar, status pill, action slot, close button
- `stat-card` — KPI card with title, value, status badge and integrity bar
- `metric` — compact label / value / delta
- `data-list` — label/value rows with status badges
- `app-header` — top bar with brand, title, region selector, fake window controls
- `sidebar-rail` — vertical icon nav with active indicator and badge

### Charts
- `line-chart` — threshold-aware line chart (recharts under the hood)
- `bar-chart` — stacked / grouped bar chart
- `gantt-timeline` — phase rows with status colors and a "now" marker

### Maps
- `tactical-map` — SVG canvas with markers (pin / triangle / square), polygon zones, grid background, zoom controls

### Blocks
- `dashboard-ops` — the full Birthday-Ops style dashboard, composed from registry primitives

## Local development

```bash
pnpm install
pnpm dev                  # docs site at http://localhost:3000
pnpm registry:build       # generate public/r/*.json
pnpm typecheck
```

The registry source lives under `registry/blacksite/`:

```
registry/blacksite/
├── ui/        # primitives + tactical composites
├── charts/    # line, bar, gantt
├── maps/      # tactical-map
└── blocks/    # full dashboard composition
```

`scripts/build-registry.ts` reads `registry.json`, inlines the source of every file
referenced by each item, and writes `public/r/<name>.json` (plus `index.json`).
That's the format the upstream `npx shadcn@latest add <url>` CLI consumes.

## Design tokens

Tokens are declared as HSL CSS variables in `app/globals.css` and re-published as a
`registry:theme` item (`public/r/theme.json`). The palette is dark-first and tuned
for tactical surfaces:

| Role            | Token                | Notes                                  |
| --------------- | -------------------- | -------------------------------------- |
| Background      | `--background`       | `222 28% 6%`                           |
| Card surface    | `--card`             | `220 22% 9%`                           |
| Border          | `--border`           | `218 14% 18%`                          |
| Foreground      | `--foreground`       | `210 14% 92%`                          |
| Primary (cyan)  | `--primary`          | `174 72% 56%`                          |
| Success (teal)  | `--success`          | `162 70% 48%`                          |
| Warning (amber) | `--warning`          | `38 92% 58%`                           |
| Danger (red)    | `--danger`           | `358 78% 60%`                          |
| Info (blue)     | `--info`             | `212 90% 62%`                          |
| Gold            | `--gold`             | `42 78% 60%` (signage / brand mark)    |

Mono labels use **JetBrains Mono**, body uses **Inter**.

## License

MIT — see [LICENSE](./LICENSE).
