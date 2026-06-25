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

## Generated API docs (Doxygen, JSDoc, TypeDoc, …)

Machine-generated reference is **part of** the documentation but is treated as a
**boundaried zone**, not the themed surface:

- **Link to it from the Reference group** with a clearly labelled entry ("API
  Reference →"), so the user crosses an intended boundary rather than stumbling
  out of the theme.
- **Skin it where the generator allows** — apply the palette and fonts via the
  generator's custom-CSS/header hooks so it at least rhymes with the theme. Match
  what you reasonably can; don't fake the full shell.
- **Always provide a way back** from the generated zone to the themed docs.
- Don't try to hand-maintain what a generator produces — generate it, boundary it,
  link it.

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
