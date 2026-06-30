# 05 · Navigation & Cross-Linking

This is the part that makes a project read as **a page of fairyfox.io** — not a
separate site you traveled to. Two things carry it: the **shared chrome** (the same
header, **primary nav**, footer, and theme across every project) and the **brand/Home
link** that is always the way home. Those are required. A **submenu** for section/context
nav and richer cross-linking (footer link columns) are **recommended** — the mesh is
meant to be *flat*, not a deep web of mandatory links.

## The one-domain model

| URL | What it is |
|-----|-----------|
| `fairyfox.io/` | The main site (the hub) |
| `fairyfox.io/projects/<key>/` | The project's **node page** on the main site (status, what-it-is, connections) |
| `fairyfox.io/<key>/` | The project's **own docs site** (themed per this standard) |
| `fairyfox.io/<key>/<...>` | Pages within the project docs site |

`<key>` is the repo slug. Everything is one origin — links between these are plain
same-domain links; never hard-code a different host. How a project actually lands on
this domain (GitHub Pages inherits the custom domain; set the base path to
`/<key>`): [`10-domain-and-publishing.md`](10-domain-and-publishing.md).

## Parent → child (the main site links *in*)

The main site already points at each project; a compliant project just needs to
exist at its URL so these resolve. The links the main site provides:

- **Project cards** (home, `/projects/`): a "Documentation →" link to the project's
  docs, and "More details →" to the node page.
- **Node page** (`/projects/<key>/`): a **Connections** block linking to the
  project's docs site, repository, notes, and downloads.
- **Docs library** (`/docs/`): an on-site doc entry per project, plus a link out to
  the project's full docs site.

A project's registry entry (`_data/projects.yml`) carries `docs:` (the docs-site
URL) and `repo:` so these render. Keep that entry accurate.

## Child → parent (the project links *back*)

### Required: the brand/Home link is the way home (no back-button)

A project wears the **shared header**, whose **brand mark and `Home` nav item link to
`https://fairyfox.io/`**. That *is* the way home — always present, by virtue of the
shared chrome. There is **no separate "← Back to Fairy Fox" control**: the project
looks and behaves like a page of fairyfox, so a back-button would be redundant and
would imply you'd left. (This **retires** the earlier required back-button — the brand/
Home link supersedes it.)

### Recommended (not required): richer links back

Add these where they fit, but their absence is **not** a compliance failure:

- A **footer** linking the project's node page (`fairyfox.io/projects/<key>/`),
  repo, notes, and the main-site sections.
- A **breadcrumb/locator** near the page top (`Fairy Fox / Projects / <Project>`).

### Branding: project-forward is fine — the chrome is the tie

**A project leads with its own identity** in its content and sub-brand. What keeps it
visibly a page of fairyfox is the **shared chrome** — the same header, primary nav,
footer, palette, and typography from [`02-design-tokens.md`](02-design-tokens.md). The
global brand/Home link stays in the header; the project's own name belongs in the
**submenu locator / sub-brand**, not in place of the global nav. The earlier "never
replace the Fairy Fox brand" rule is retired — the shared chrome, not brand exclusivity,
is what carries membership.

## Shared chrome: primary nav + submenu

A project does **not** invent its own header. It wears the **same chrome as the main
site** so there is no visible "jump":

- **Primary nav (global, identical on every page).** Slot order:
  **Home · Projects · Games · Docs · Downloads · Updates · About** (About last). These
  point at the main-site sections (same origin for Pages projects). The set and order
  are fixed across the mesh — don't reorder, drop, or add items per project. The exact
  markup is in [`reference/`](reference/); mark the current top-level section `.active`.
- **Submenu (recommended) — a secondary row directly below the primary nav** that
  carries the **context** links and localizes you within a section. It's the same flat
  pill style as the primary nav. Two canonical uses, identical in shape:
  - On the **Projects** area, the submenu lists the projects.
  - Inside a **project**, the submenu lists *that* project's own pages (Overview ·
    Guides · Reference · Changelog …).

  The primary nav never changes between pages; the submenu is the part that changes.
  Mark the current submenu item `.active`. (The shared chrome's submenu row is being
  rolled out on the main site; until a project carries it, its section links may live
  in a project-local nav of the same style.)

## Seamlessness checklist (no visible "jump")

To make crossing the boundary feel like one site, match these so nothing flashes or
shifts:

- **Same header** — height (64px), sticky, translucent blur, hairline, brand on the
  left, nav on the right.
- **Same fonts, preloaded** — Fraunces/Inter/JetBrains with the same weights and the
  `preconnect`/`display=swap` setup, so type doesn't reflow on arrival.
- **Same `theme-color` metas** (light + dark) so mobile browser chrome doesn't
  change colour mid-journey.
- **Same favicon and web-manifest** family, so the tab identity is continuous.
- **Same default colour scheme behaviour** — dark-first, OS-driven light; never
  force a project to a different default than the main site.
- **No interstitial** — links between main site and project resolve directly (same
  origin), with no redirect bounce.

## Generated docs (two cases)

Many projects document via a generator (JSDoc, Doxygen, TypeDoc, Sphinx). There are
two distinct situations — don't conflate them:

1. **The generator is a *boundaried zone* inside a hand-authored docs site.** Reach
   it through a themed "API Reference →" link, theme it as far as the generator
   allows, and always give a way back to the themed docs.
2. **The generator *is* the whole docs site** (e.g. the docs site is JSDoc/docdash
   output). Then you don't "rhyme with" the theme from outside — you **replace the
   generator's stylesheet and inject the shared chrome (brand + Home link) into its own
   layout.** This is a first-class, fully-supported path with its own technique and
   gotchas: see [`06-content-and-organization.md`](06-content-and-organization.md#generator-based-docs-sites-the-generator-is-the-site).

Either way, the brand/Home way-home link still applies.
