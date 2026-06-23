# Project Status

_Current state only._ For the chronological history see [`sessions/`](sessions/README.md);
for the commit-by-commit changelog see [`version.md`](version.md).

**Version:** `0.2.0` (single source of truth: repo-root `VERSION`; see
[`reference/versioning.md`](reference/versioning.md)).

## Current state (read this first)

**The site is live** at https://junebug12851.github.io/ and at the **`fairyfox.io`
custom domain** (2026-06-22) — the domain now resolves and serves over **HTTP**;
the GitHub-issued **HTTPS certificate is still provisioning** (enable Enforce HTTPS
once it lands). It's a
clean, custom Jekyll build — no external theme — deployed to GitHub Pages by
GitHub Actions on every push to `main`.

The site is framed as a **project hub + documentation library** for Fairy Fox's
work, written in a neutral documentation voice (not first-person, not glorifying;
see [`context/principles.md`](context/principles.md)). It now includes:

- A redesigned header with **dropdown navigation** (monogram wordmark; Projects
  and Docs menus) that links straight into each project's own Pages docs site,
  served under the custom domain (e.g. `fairyfox.io/pokered-save-editor-2/`).
- An on-site **documentation library** (`/docs/`, the `_docs` collection):
  ecosystem overview, the shared engineering standards, and a per-project doc page.

The rest of the structure is in place end to end:

- **Site:** home, `/projects/`, `/blog/`, `/about/`, a first blog post, RSS feed,
  SEO tags, sitemap. Custom responsive CSS with light/dark.
- **Hub:** [`../hub/`](../hub/) holds the cross-project standards + templates and
  the project registry. This is what other repos pull.
- **Notes:** this living-notes system, mirroring the convention used across my
  projects.
- **Sync:** the pull-only cross-project model is documented
  ([`reference/cross-project-sync.md`](reference/cross-project-sync.md)) and the
  two reference repos are cloned under `assets/references/` (git-ignored).

## In flight / awaiting

- **HTTPS for `fairyfox.io`.** The custom domain is **live over HTTP** (DNS points
  at GitHub Pages and the domain is set in Settings → Pages). The only thing
  outstanding is the **HTTPS certificate**, which GitHub is still provisioning;
  once it issues, enable **Enforce HTTPS** in Settings → Pages. Both project Pages
  sites are served under the domain too (`fairyfox.io/pokered-save-editor-2/`,
  `fairyfox.io/random-ai-prompt/`).

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
| Custom domain | ✅ Live over HTTP; ⏳ HTTPS cert provisioning |
| Local build verification | ✅ `bundle install` + `jekyll build` green (Ruby 3.3.11) |
