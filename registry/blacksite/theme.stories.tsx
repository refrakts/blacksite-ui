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
    <div className="flex items-center gap-3 rounded-md border border-border bg-card p-3">
      <span
        className="size-10 rounded-sm border border-border-strong shrink-0"
        style={{ background: `hsl(var(${token}))` }}
      />
      <div className="flex flex-col">
        <code className="text-mono text-[12px] text-foreground">{token}</code>
        <span className="text-mono text-[10px] uppercase tracking-[0.08em] text-foreground-muted">
          {role}
        </span>
      </div>
    </div>
  );
}

export const Palette: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h3 className="text-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted mb-3">
          Surfaces
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {surfaces.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted mb-3">
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
    <div className="flex flex-col gap-6 max-w-3xl">
      <section className="rounded-md border border-border bg-card p-4">
        <h3 className="text-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted mb-3">
          Display / sans
        </h3>
        <div className="space-y-1">
          <p className="text-4xl font-semibold tracking-tight">BIRTHDAY OPS</p>
          <p className="text-2xl font-semibold tracking-tight">Operation FOUNDRY</p>
          <p className="text-base">Body text — Inter, regular weight.</p>
          <p className="text-sm text-foreground-muted">Muted text — for secondary copy.</p>
        </div>
      </section>
      <section className="rounded-md border border-border bg-card p-4">
        <h3 className="text-mono text-[11px] uppercase tracking-[0.12em] text-foreground-muted mb-3">
          Mono / labels
        </h3>
        <div className="space-y-1">
          <p className="text-mono text-[11px] uppercase tracking-[0.1em]">CAKE DEPLOYMENT STATUS</p>
          <p className="text-mono text-[11px] uppercase tracking-[0.1em] text-foreground-muted">
            BACKYARD — BACKYARD
          </p>
          <p className="text-mono text-[12px]">GRID-1734-A2 · 04:21Z</p>
        </div>
      </section>
    </div>
  ),
};
