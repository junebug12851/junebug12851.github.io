# reference/ — the master stylesheet + chrome, read-only

[`main.css`](main.css) is a **faithful, verbatim snapshot of fairyfox.io's master
stylesheet** (`assets/css/main.css`), bundled here as the ultimate exact reference
for the docs-site standard. When a value isn't restated in
[`../11-measurements-reference.md`](../11-measurements-reference.md) or files
`02`–`04`, this is the source of truth.

[`chrome.html`](chrome.html) is the **canonical shared chrome markup** (header +
primary nav + submenu + footer), snapshotted from the hub's `_includes/` with Liquid
resolved to plain links. Copy it as the starting structure so a project's docs site
appears as a page of fairyfox.io — the brand/Home link is the way home, the primary
nav is the fixed mesh-wide set (Stories + Games under the Farms dropdown), and there's no separate back-button.
Reproduce it in the project's own stack; don't hot-link it.

Snapshot: `main.css` **2026-06-25** (site `0.5.x` warm line), with the **`.subnav`
submenu added 2026-06-30** and the **reader story-only lock added 2026-07-18** ·
`chrome.html` **2026-07-18** (the **Farms** dropdown grouping Stories + Games).

## How to use it

- **Read it to get an exact value** — colours, paddings, gaps, breakpoints,
  positions. Every number in the design system is here.
- **Reimplement, don't link.** This is a *reference copy*, not a dependency. Do
  **not** hot-link it from a project, and don't paste it wholesale — reproduce the
  design in the project's own stack (the whole point of a decoupled mesh; see
  [`../01-overview-and-principles.md`](../01-overview-and-principles.md)).
- **It's a snapshot, not a live mirror.** It can lag the live master between
  refreshes. The live file at `assets/css/main.css` on fairyfox.io is authoritative
  if the two ever disagree; this copy is refreshed when the standard is updated.

## What's in it that a docs site doesn't need

The file is the *whole* site stylesheet, so it also contains home-/page-specific
components a project docs site won't use: the masthead, the home hero portal, the
activity panel/ticker and bar chart, the downloads tabs. They're here for
completeness — ignore them unless a project deliberately reuses one. The docs-site
essentials (tokens, base/typography, header, nav, buttons, cards, badges, tags,
the documentation sidebar layout, footer) are the parts to reproduce.

## Master-copy reminder

fairyfox.io is the **master copy** of this design and is **exempt from auto-applied
theme updates** — it's hand-curated by Fairy Fox. This snapshot flows **outward to
projects** only; nothing here is edited by an adopting project. See
[`../09-adopting-and-maintaining.md`](../09-adopting-and-maintaining.md).
