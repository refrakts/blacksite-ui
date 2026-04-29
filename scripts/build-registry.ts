/**
 * Reads registry.json, inlines source files for each item, and writes one
 * JSON file per item to public/r/<name>.json plus an index at public/r/index.json.
 *
 * This mirrors the layout that `npx shadcn@latest add <url>` expects.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

type RegistryFile = {
  path: string;
  type: string;
  target?: string;
  content?: string;
};

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  cssVars?: Record<string, Record<string, string>>;
  files: RegistryFile[];
};

type Registry = {
  $schema?: string;
  name: string;
  homepage?: string;
  items: RegistryItem[];
};

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, "registry.json");
const OUTPUT_DIR = path.join(ROOT, "public", "r");

async function readRegistry(): Promise<Registry> {
  const raw = await fs.readFile(REGISTRY_PATH, "utf8");
  return JSON.parse(raw) as Registry;
}

function defaultTargetFor(file: RegistryFile): string {
  if (file.target) return file.target;
  // registry/blacksite/ui/button.tsx -> components/ui/button.tsx
  const parts = file.path.split("/");
  const after = parts.slice(2); // drop "registry/blacksite"
  if (after[0] === "ui") return path.join("components", ...after);
  if (after[0] === "blocks") return path.join("components/blocks", ...after.slice(1));
  if (after[0] === "charts") return path.join("components/charts", ...after.slice(1));
  if (after[0] === "maps") return path.join("components/maps", ...after.slice(1));
  return path.join("components", ...after);
}

async function inlineFile(file: RegistryFile): Promise<RegistryFile> {
  const abs = path.join(ROOT, file.path);
  const content = await fs.readFile(abs, "utf8");
  return {
    path: file.path,
    type: file.type,
    target: defaultTargetFor(file),
    content,
  };
}

async function buildItem(item: RegistryItem) {
  const files = await Promise.all(item.files.map(inlineFile));
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    devDependencies: item.devDependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    cssVars: item.cssVars,
    files,
  };
}

async function main() {
  const registry = await readRegistry();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const built = await Promise.all(registry.items.map(buildItem));

  for (const item of built) {
    const file = path.join(OUTPUT_DIR, `${item.name}.json`);
    await fs.writeFile(file, JSON.stringify(item, null, 2) + "\n", "utf8");
  }

  const index = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: registry.name,
    homepage: registry.homepage,
    items: built.map((item) => ({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
    })),
  };
  await fs.writeFile(
    path.join(OUTPUT_DIR, "index.json"),
    JSON.stringify(index, null, 2) + "\n",
    "utf8",
  );

  console.log(`✔ Built ${built.length} registry items → public/r/`);
}

main().catch((err) => {
  console.error("✖ Failed to build registry:", err);
  process.exit(1);
});
