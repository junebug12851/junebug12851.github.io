# 05 · Navigation & Cross-Linking

This is the part that makes the transition **seamless**. A project can match the
skin perfectly and still fail here — the two-way links and the on-domain
continuity are **required**, not optional.

## The one-domain model

| URL | What it is |
|-----|-----------|
| `fairyfox.io/` | The main site (the hub) |
| `fairyfox.io/projects/<key>/` | The project's **node page** on the main site (status, what-it-is, connections) |
| `fairyfox.io/<key>/` | The project's **own docs site** (themed per this standard) |
| `fairyfox.io/<key>/<...>` | Pages within the project docs site |

`<key>` is the repo slug. Everything is one origin — links between these are plain
same-domain links; never hard-code a different host.

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

## Child → parent (the project links *back*) — REQUIRED

Every project docs site must offer an obvious, persistent way back. Three places:

1. **Header brand → home.** The brand mark is **Fairy Fox** and links to
   `https://fairyfox.io/`. This is the primary "way home" and must be on every
   page (the header is sticky).
2. **A locator/breadcrumb → the node page.** Near the top of each page, show the
   trail and link the parent crumbs:
   `Fairy Fox / Projects / <Project Name>` — where **Fairy Fox** → `fairyfox.io/`
   and **Projects** → `fairyfox.io/projects/`, and ideally the project name → its
   node page `fairyfox.io/projects/<key>/`. (This mirrors the `.locator` pattern on
   the main site's node pages.)
3. **Footer → the main site.** The footer's "Explore" column links to the main
   site's sections (Projects, Documentation, Downloads, Updates, About) and
   includes an explicit home link.

### The sub-brand: showing "this is a project under Fairy Fox"

Keep the Fairy Fox mark as the brand, and place the **project's own name** beside
or beneath it (a sub-brand, a divider + project name, or the locator's last crumb).
The reading should always be "**Fairy Fox** → *this project*", so the parent is
never hidden and the way back is never ambiguous. Do **not** replace the Fairy Fox
brand with the project's brand.

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

## Generated API docs (the boundary)

When a project links into machine-generated reference (Doxygen, JSDoc, TypeDoc),
that zone may not wear the full theme. Handle it cleanly:

- Reach it through a normal, themed link from the project docs (e.g. an "API
  Reference →" entry), so the user crosses a clear, intended boundary.
- Where the generator allows, apply the palette/fonts (custom CSS/header) so it at
  least rhymes with the theme.
- Always give a way back from the generated zone to the themed docs (a header link).
See [`06-content-and-organization.md`](06-content-and-organization.md).
