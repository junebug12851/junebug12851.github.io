# 05 · Navigation & Cross-Linking

This is the part that makes the transition **seamless**. Two things carry it: the
**shared theme** (the real connective tissue — same colours, type, and shell across
every project) and a single, always-present **way home**. Those two are required.
Richer cross-linking (breadcrumbs, footer link columns) is **recommended, not
required** — the mesh is meant to be *flat*, not a deep web of mandatory links.

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

### Required: one persistent "way home"

Every project docs site must offer **one obvious, always-visible link back to
`https://fairyfox.io/`** — a single "← Back to Fairy Fox" control, present on every
page (e.g. in the sticky header or the persistent sidebar). That's the whole hard
requirement for back-linking. It doesn't need to be a breadcrumb or a brand mark —
a plain, self-explanatory button is enough.

### Recommended (not required): richer links back

Add these where they fit, but their absence is **not** a compliance failure:

- A **footer** linking the project's node page (`fairyfox.io/projects/<key>/`),
  repo, notes, and the main-site sections.
- A **breadcrumb/locator** near the page top (`Fairy Fox / Projects / <Project>`).

A project may carry the node-page link in the footer only, or skip the breadcrumb
entirely, and still be compliant — as long as the single way-home and the shared
theme are present.

### Branding: project-forward is fine — the theme is the tie

**A project leads with its own identity.** Its docs site can show the **project's
own logo and name** as the primary brand; you do **not** have to put the Fairy Fox
mark first, and you may replace it. What keeps the project visibly part of the mesh
is the **shared design system** — the same palette, typography, and shell from
[`02-design-tokens.md`](02-design-tokens.md) — plus the way-home link. The theme is
the family resemblance; the brand can be the project's own.

Keeping a small Fairy Fox cue (a footer mark, a hint in the way-home control) is
welcome but optional. The earlier "never replace the Fairy Fox brand / show Fairy
Fox → project" rule is **retired** — it made the mesh feel too tightly coupled;
shared theme + a clear way home is the right amount of connection.

## Project docs-site navigation

The project's own primary nav covers **its** sections (e.g. Overview · Guides ·
Reference · Changelog) in the same flat, plain-link, pill style as the main site —
plus the brand-home link. Don't reproduce the main site's nav items (Projects,
Downloads, etc.) inside a project; link to those through the brand/locator/footer
instead. Mark the current section `.active`.

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
   generator's stylesheet and inject the brand + way-home into its own layout.**
   This is a first-class, fully-supported path with its own technique and gotchas:
   see [`06-content-and-organization.md`](06-content-and-organization.md#generator-based-docs-sites-the-generator-is-the-site).

Either way, the single required way-home link still applies.
