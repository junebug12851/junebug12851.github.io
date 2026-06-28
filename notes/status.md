# Project Status

_Current state only._ For the chronological history see [`sessions/`](sessions/README.md);
for the commit-by-commit changelog see [`version.md`](version.md).

**Version:** `0.9.8` (single source of truth: repo-root `VERSION`; see
[`reference/versioning.md`](reference/versioning.md)).

## Current state (read this first)

**The site is live** at https://junebug12851.github.io/ and at the **`fairyfox.io`
custom domain** (2026-06-22) — the domain now resolves and **serves over HTTPS**
(the GitHub-issued certificate has provisioned; `https://fairyfox.io/` returns 200).
Confirm **Enforce HTTPS** is enabled in Settings → Pages. It's a
clean, custom Jekyll build — no external theme — deployed to GitHub Pages by
GitHub Actions on every push to `main`.

The site is framed as a **project hub + documentation library** for Fairy Fox's
work, written in a neutral documentation voice (not first-person, not glorifying;
see [`context/principles.md`](context/principles.md)). The **warm rebuild is live**
through the `0.4.x` line; it now includes:

- The **warm visual design** (0.4.x): a warm palette with a Fraunces/Inter/JetBrains
  type system, light and dark each designed (not one inverted), full-width section
  bands, focus-visible outlines, and a reduced-motion guard — tuned to **WCAG 2.1 AA**.
- A **portal home**: a hero beside a static **activity panel** (a 30-day commit chart
  + a scrolling "Recently" ticker), both rendered at build time in Liquid from
  `_data/pulse.yml` (no client JS), plus a single-column "Recently" list.
- **Standardized project cards** (lifecycle badge · version · activity, sorted
  newest-first with the hub last) that are **fully clickable** to each project's node.
- **Project node pages** at `/projects/<key>/` — a self-locating page per project
  with status, "What it is" prose, a connections grid, and recent tagged activity.
- A plain-link header nav (Projects · Updates · Docs; no dropdowns) and an
  **on-site documentation library** (`/docs/`, the `_docs` collection): the ecosystem
  overview, a **"This site"** group surfacing the whole `notes/` tree, the **shared
  standards**, and a per-project doc page.

The rest of the structure is in place end to end:

- **Site:** home, `/projects/`, `/blog/`, `/about/`, a first blog post, RSS feed,
  SEO tags, sitemap. Custom responsive CSS with light/dark.
- **Hub:** [`../hub/`](../hub/) holds the cross-project standards + templates and
  the project registry. This is what other repos pull. The standards now include
  the three lifecycle runbooks (setup · onboard · adopt), a **docs-site design
  system** (`hub/standards/docs-site/`, `0.5.x`) so every project's docs match the
  site, a **full git-flow** model with the `master → main` mandate (`0.6.x`), and a
  **process-reports** standard (`0.7.0`) — nodes write a report after every system
  run, the hub reads them inbound to improve the standards — an **enforcement
  layer** (`0.8.0`): a `## Verify` check on every standard plus a **standards
  compliance audit** (`hub/standards/compliance.md`) that runs them all in one pass,
  and **express authorizations** (`0.9.0`): a tracked ledger
  (`hub/authorizations.yml`) of the user's hub-side go-aheads, so a node adopting a
  change the ledger covers skips its redundant confirmation pause (and only that —
  all other adoption safety stays), and a **first fold-back of node feedback** (`0.9.1`):
  the siblings' process reports drove the force-push-proof refresh, VERSION-anchored
  change detection, a CI-owns-tagging decision, and report-lifecycle fixes across the
  adopt/sync/git-flow/process-reports standards.
  **Both siblings are now fully onboarded** (mesh-aware `CLAUDE.md` + a fairyfox-themed
  docs site each): Random AI Prompt (`2.10.4` — the repo split into an active `engine-v3`
  + a frozen `engine-v1-2` snapshot, v3-only; the 2.7.x line built out an
  image-generation layer in the web app — prompts dispatch to 16+ hosted/local providers,
  an AI rewrite pass, a central output folder, and a photo gallery + single-image view;
  the 2.8–2.10 line then matured the editing surface — CodeMirror DPL editors, keyword
  tooling, a redesigned provider header — added a **DPL intensity dial** with a five-category
  content refactor, and put a stripped generate-only build online at `prompt.fairyfox.io`;
  earlier adopted git-flow with the `master` → `main` rename) and Pokered Save Editor 2
  (`0.14.2-alpha`, themed Doxygen docs; adopted git-flow + process-reports + compliance +
  express-authorizations on 2026-06-26).
- **Notes:** this living-notes system, mirroring the convention used across my
  projects.
- **Sync:** the pull-only cross-project model is documented
  ([`reference/cross-project-sync.md`](reference/cross-project-sync.md)) and the
  two reference repos are cloned under `assets/references/` (git-ignored).

## In flight / awaiting

- **Warm redesign is shipped (`0.4.x`; the repo is now at `0.9.5`).** The design language, the
  **portal home** (hero + static activity panel), the **standardized status cards**, the
  **day-centric updates feed**, the **clickable cards / simpler nav** review pass, and the
  **project node pages** (`/projects/<key>/`) are all live — built increment-by-increment,
  each verified with a local `jekyll build` + headless screenshot. The home/updates/doc
  sections have been polished into one consistent language.
  Direction/plan: [`context/design-direction.md`](context/design-direction.md),
  [`plans/implementation.md`](plans/implementation.md), mockup `mockups/v1-warm.html`.
  **Remaining (the deeper, decoupled machinery, not structure):** the off-site gathering
  layer that generates `_data/pulse.yml` from the projects' real history (it's hand-kept
  for now), and Web-Component live examples (built with Fairy Fox).

- **HTTPS for `fairyfox.io`.** The custom domain is **live over HTTPS** — the
  GitHub-issued certificate has provisioned and `https://fairyfox.io/` returns 200.
  Remaining nicety: confirm **Enforce HTTPS** is toggled on in Settings → Pages so
  HTTP redirects up. Both project Pages sites are served under the domain too
  (`fairyfox.io/pokered-save-editor-2/`, `fairyfox.io/random-ai-prompt/`).

## Next

See [`plans/next-steps.md`](plans/next-steps.md). Headline items: confirm the
first Actions deploy is green, wire DNS for the custom domain, and write the
first real "what changed in my projects" round-up once there's a diff to report.

## Health

| Area | Status |
|------|--------|
| Jekyll config + layouts | ✅ Scaffolded |
| Content pages (home/projects/blog/about) | ✅ Live |
| Pages deploy workflow | ✅ First run green; site live |
| Custom domain | ✅ Live over HTTPS (cert provisioned; confirm Enforce HTTPS) |
| Local build verification | ✅ `bundle install` + `jekyll build` green (Ruby 3.3.11) |
