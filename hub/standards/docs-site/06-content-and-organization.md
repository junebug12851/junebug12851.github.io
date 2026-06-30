# 06 · Content & Organization

The visual match is half the job; a project's docs should also be **organized the
same way** so the structure feels familiar. This file says what pages a compliant
docs site has, how they're grouped, and where generated API docs fit.

## The two documentation surfaces

A project's documentation lives in two complementary places — keep them in step,
don't duplicate:

| Surface | Where | Depth |
|---------|-------|-------|
| **On-site doc page** | `fairyfox.io/docs/<key>/` (on the main site) | A short entry point — what the project is, links onward. Maintained on the main site. |
| **Project docs site** | `fairyfox.io/<key>/` (the project's own) | The full documentation — overview, guides, reference, changelog. Maintained in the project. |

The on-site page is the elevator pitch and the doorway; the project docs site is
the manual. The project docs site is the one this standard themes.

## Recommended page set for a project docs site

Adapt to the project, but cover these roles; group them in the sidebar by category
(mirroring the main site's grouped doc library):

| Group | Pages | Purpose |
|-------|-------|---------|
| **Overview** | Home / "What it is", Getting started | Orient a newcomer; install/run quickly. |
| **Guides** | Task- and concept-oriented how-tos | The day-to-day usage docs. |
| **Reference** | Configuration, CLI/API, formats | Look-up material; link to generated API docs here. |
| **Project** | Changelog/Updates, About/architecture | What changed, how it's built, how it connects back to Fairy Fox. |

Every docs site should have, at minimum: a **themed home/overview**, a **way to get
started**, and a **changelog or updates** view — plus the required links back to
Fairy Fox (see [`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md)).

## Per-page metadata

However your stack expresses it (front matter, a manifest, route config), each docs
page should carry the equivalent of:

- **title** — the page's display name.
- **category** — which sidebar group it belongs to.
- **order** — its position within that group.
- **summary** (optional) — a one-line lead shown under the title.

This is what powers the grouped, ordered sidebar and the breadcrumb. Keep titles
short and consistent in voice.

## Generated docs (Doxygen, JSDoc, TypeDoc, Sphinx, …)

Generators come in **two shapes**, and they need opposite techniques. Decide which
one you're in before you touch any CSS.

### Case A — the generator is a *boundaried zone* inside a hand-authored site

The themed docs site is hand-built (Jekyll, etc.) and the generated reference is one
section reached from it:

- **Link to it from the Reference group** ("API Reference →") so the user crosses an
  intended boundary rather than stumbling out of the theme.
- **Skin it where the generator allows** — apply the palette and fonts via the
  generator's custom-CSS hooks so it at least rhymes with the theme.
- **Always provide a way back** to the themed docs.

### Case B — the generator *is* the site (the generator is the docs site) {#generator-based-docs-sites-the-generator-is-the-site}

When the whole docs site *is* the generator's output (e.g. a JSDoc/docdash site,
with your living notes rendered as the generator's "tutorials"), there is no outer
shell to skin from — **the generator's output is the surface, so you theme the
generator itself.** This is a first-class, supported path. The technique:

- **Replace the generator's stylesheet from scratch — do NOT override it.** Writing
  a few overrides on top of the default theme is whack-a-mole: generators hard-code
  light backgrounds on `body`/`section`/`nav`/tables, and your overrides leak
  (white content panels, unstyled sidebars). **Author one fairyfox-themed stylesheet
  and have the build swap it in for the generator's default** (e.g. overwrite
  docdash's `styles/jsdoc.css`). Use the bundled
  [`reference/main.css`](reference/) and [`11-measurements-reference.md`](11-measurements-reference.md)
  as the exact source.
- **Inject the shared chrome into the generator's *own* layout — don't overlay a
  separate bar.** A bolted-on sticky header fights a generator's fixed sidebar
  (overlap, horizontal scroll). Instead inject the **Fairy Fox brand + Home link** (the
  way home — no separate back-button) **into the generator's persistent sidebar/DOM**
  (most generators expose a `scripts`/template hook). Work *with* the generator's
  structure, not on top of it.
- **Verify your assets actually land in the output.** A generator may *reference*
  your custom CSS/JS in every page's `<head>` but **not copy the files** into the
  build (the docdash `scripts` gotcha → 404s in CI). Make the build step copy your
  theme files (and any logo) into the output directory, and confirm they're there.
- **Lead with the project's own brand** in that injected sidebar's sub-brand — that's
  the [project-forward branding](05-navigation-and-cross-linking.md) the standard
  expects; the shared chrome (theme + brand/Home link) carries the mesh connection.

Per-generator landmines to expect: hard-coded light backgrounds (forces full
replacement, not overrides); fixed-sidebar layouts (inject into them, don't overlay);
asset references that aren't deployed (copy them in the build). A ready-to-adapt
starter skin may live in [`reference/`](reference/) over time — until then, the
`reference/main.css` snapshot is your source of exact values.

- Either case: don't hand-maintain what a generator produces — generate it, theme
  it, and (Case A) boundary it or (Case B) make it the themed site.

## Voice & house style

Project docs use the **public/website voice** (see
[`01-overview-and-principles.md`](01-overview-and-principles.md)): neutral,
professional, refer to the parent as **Fairy Fox** / **fairyfox.io** (not "the
system"). Keep prose direct; use tables for look-ups and code blocks for code. This
matches the documentation standard the rest of the mesh follows
([`../../standards/`](../) · the notes/documentation conventions).

## Keep it living

Treat the docs site as living documentation, updated as the project changes — the
same default-maintenance posture the mesh uses for notes and changelogs. A stale,
themed docs site still fails the user.
