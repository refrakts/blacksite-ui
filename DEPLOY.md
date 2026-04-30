# Deployment

Two Vercel projects, one repo. Both point at the same GitHub repository on the
same branch (`main` for prod). Each project overrides the build command so it
builds only the artefact it owns.

| Project          | Domain                   | Builds        | Output dir          |
| ---------------- | ------------------------ | ------------- | ------------------- |
| `blacksite`      | `blacksite.sh`           | Next.js docs  | `.next/` (default)  |
| `blacksite-sb`   | `storybook.blacksite.sh` | Storybook     | `storybook-static/` |

The docs project links to Storybook via the `NEXT_PUBLIC_STORYBOOK_URL`
environment variable, so the two are loosely coupled — you can swap the
Storybook URL (Chromatic, separate domain, etc.) without touching code.

---

## Project 1 — Next.js docs (`blacksite.sh`)

### Vercel UI

1. **Add New → Project** → Import your GitHub repo.
2. **Framework Preset**: `Next.js` (auto-detected).
3. **Root Directory**: `./` (default).
4. **Build & Output Settings** — leave defaults:
   - Install command: `pnpm install`
   - Build command: `pnpm build`
   - Output directory: `.next`
5. **Environment Variables**:
   - `NEXT_PUBLIC_STORYBOOK_URL` = `https://storybook.blacksite.sh`
   (Add this for **Production**, **Preview**, and **Development**.)
6. **Deploy**.

### Custom domain

1. Project → **Settings → Domains** → **Add** `blacksite.sh`.
2. Vercel shows you the DNS records to add at your registrar:
   - `A` record `@` → Vercel's IP (shown in the UI)
   - or `CNAME` `@` → `cname.vercel-dns.com` (some registrars only)
3. (Optional) Add `www.blacksite.sh` and set it to redirect → apex.

---

## Project 2 — Storybook (`storybook.blacksite.sh`)

### Vercel UI

1. **Add New → Project** → Import the **same** GitHub repo.
2. Project name: `blacksite-sb` (or anything — won't be the URL).
3. **Framework Preset**: `Other` (not Next.js — Vercel will auto-suggest Next,
   change this dropdown to `Other`).
4. **Root Directory**: `./` (same repo root).
5. **Build & Output Settings** — override all three:
   - Install command: `pnpm install`
   - Build command: `pnpm build-storybook`
   - Output directory: `storybook-static`
6. **Environment Variables**: none required.
7. **Deploy**.

### Custom domain

1. Project → **Settings → Domains** → **Add** `storybook.blacksite.sh`.
2. Add the DNS record at your registrar:
   - `CNAME` `storybook` → `cname.vercel-dns.com`

---

## DNS at your registrar (summary)

| Host        | Type    | Value                                    |
| ----------- | ------- | ---------------------------------------- |
| `@`         | A       | `76.76.21.21` (Vercel — confirm in UI)   |
| `www`       | CNAME   | `cname.vercel-dns.com`                   |
| `storybook` | CNAME   | `cname.vercel-dns.com`                   |

Vercel will surface the exact records and verify them automatically once added.

---

## Local development

```bash
# Run the docs site (Next.js) and Storybook in two terminals
pnpm dev          # http://localhost:3000
pnpm storybook    # http://localhost:6006
```

If you want the docs site's "Storybook" links to point at the local Storybook
instead of the prod URL, drop a `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_STORYBOOK_URL=http://localhost:6006
```

---

## Notes

- Both projects watch the same branch — every push triggers two parallel
  deploys. They're independent: a Storybook-only change doesn't redeploy the
  docs site (Vercel skips builds when no relevant files changed if you enable
  the **Ignored Build Step** with `git diff HEAD^ HEAD --quiet ./registry ./.storybook`
  for the Storybook project).
- If you'd rather host Storybook on Chromatic for visual-regression-on-PRs,
  point `NEXT_PUBLIC_STORYBOOK_URL` at the Chromatic URL and skip Project 2
  entirely.
