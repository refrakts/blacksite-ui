import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Theme/Tokens",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const surfaces = [
  { token: "--background", role: "Page background" },
  { token: "--background-elevated", role: "Header / sidebar" },
  { token: "--background-overlay", role: "Popovers, map canvas" },
  { token: "--card", role: "Card surface" },
  { token: "--border", role: "Hairline border" },
  { token: "--border-strong", role: "Strong border / kbd" },
];

const accents = [
  { token: "--primary", role: "Primary action" },
  { token: "--success", role: "Active / nominal" },
  { token: "--warning", role: "High / caution" },
  { token: "--danger", role: "Critical / breach" },
  { token: "--info", role: "Info / nominal" },
  { token: "--gold", role: "Brand / signage" },
];

function Swatch({ token, role }: { token: string; role: string }) {
  return (
    <div className="border-border bg-card flex items-center gap-3 rounded-md border p-3">
      <span
        className="border-border-strong size-10 shrink-0 rounded-sm border"
        style={{ background: `hsl(var(${token}))` }}
      />
      <div className="flex flex-col">
        <code className="text-mono text-foreground text-[12px]">{token}</code>
        <span className="text-mono text-foreground-muted text-[10px] tracking-[0.08em] uppercase">
          {role}
        </span>
      </div>
    </div>
  );
}

export const Palette: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <h3 className="text-mono text-foreground-muted mb-3 text-[11px] tracking-[0.12em] uppercase">
          Surfaces
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {surfaces.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-mono text-foreground-muted mb-3 text-[11px] tracking-[0.12em] uppercase">
          Accents & status
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {accents.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <section className="border-border bg-card rounded-md border p-4">
        <h3 className="text-mono text-foreground-muted mb-3 text-[11px] tracking-[0.12em] uppercase">
          Display / sans
        </h3>
        <div className="space-y-1">
          <p className="text-4xl font-semibold tracking-tight">SENTINEL OPS</p>
          <p className="text-2xl font-semibold tracking-tight">Operation FOUNDRY</p>
          <p className="text-base">Body text — Inter, regular weight.</p>
          <p className="text-foreground-muted text-sm">Muted text — for secondary copy.</p>
        </div>
      </section>
      <section className="border-border bg-card rounded-md border p-4">
        <h3 className="text-mono text-foreground-muted mb-3 text-[11px] tracking-[0.12em] uppercase">
          Mono / labels
        </h3>
        <div className="space-y-1">
          <p className="text-mono text-[11px] tracking-[0.1em] uppercase">
            ASSET DEPLOYMENT STATUS
          </p>
          <p className="text-mono text-foreground-muted text-[11px] tracking-[0.1em] uppercase">
            SECTOR C-3 — AOR
          </p>
          <p className="text-mono text-[12px]">GRID-1734-A2 · 04:21Z</p>
        </div>
      </section>
    </div>
  ),
};
