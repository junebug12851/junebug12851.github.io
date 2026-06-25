# 01 · Overview & Principles

## The goal

A visitor moving from **fairyfox.io** into any project's documentation — and back —
should feel like they never left one site. Same typography, same colour, same
header and footer, same structural rhythm; only the content and the per-project
accent change. The docs site is a **room in the same house**, not a different
building.

## Why it's achievable

Three facts make true seamlessness possible rather than aspirational:

1. **One domain.** The main site is `fairyfox.io/`. Each project's Pages site
   serves at `fairyfox.io/<project>/` (the repo slug = the path). Same origin —
   no cross-domain flash, no cookie/permission boundary, shared favicon and
   web-manifest scope.
2. **A small, tokenised design system.** The whole fairyfox.io look reduces to a
   compact set of variables (colour, type, spacing, motion). Reproducing it is a
   matter of applying tokens, not reverse-engineering a sprawling stylesheet.
3. **A shared shell.** A sticky header and a footer with a fixed structure and a
   fixed set of links. Implement that shell once per project and most of the
   continuity is already there.

## Principles

- **Match, don't link.** Reproduce the design in the project's own stack; never
  hot-link the main site's CSS at runtime. This keeps each project **decoupled**
  (it builds and renders offline, and a bad change to the main site can't restyle
  or break every project at once). See
  [`../cross-project-sync.md`](../cross-project-sync.md).
- **Spec over package.** This standard describes *what the result must be*, in
  terms any stack can satisfy. It does not prescribe a framework. A Jekyll site, a
  React app, and a Doxygen build can all be compliant.
- **As close as the stack allows.** Faithful reproduction is the target. Where a
  tool genuinely can't match (generated API reference), match what you can and
  draw a clean boundary — don't fake it, and don't let it leak the main look.
- **Flat and self-standing.** Every docs site is a complete node on its own:
  themed, navigable, and linked back to the parent without depending on it at
  build time. Interconnected, never entangled.
- **Two-way links are part of the design.** A project that looks right but offers
  no way back to fairyfox.io is *not* compliant. The return path is a requirement,
  not a courtesy — see [`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md).
- **Both light and dark are first-class.** The theme is dark-first with a fully
  designed light theme that follows the OS — not one inverted from the other.

## What "a project docs site" means here

The **canonical, themed documentation experience** for a project, served at
`fairyfox.io/<project>/`. It is authored content (overview, guides, reference)
wearing this design system. Machine-generated API docs (Doxygen, JSDoc, TypeDoc)
are *part of* a project's documentation but are treated as a linked/boundaried
zone, not the themed surface itself — see
[`06-content-and-organization.md`](06-content-and-organization.md).

## Naming note

In the public/website voice this whole thing is **the hub**; in conversation the
maintainer calls the mesh **the fairyfox system**. Both name the same fairyfox.io
ecosystem. Project docs sites use the public voice — refer to the parent as
**Fairy Fox** / **fairyfox.io**, not "the system."
