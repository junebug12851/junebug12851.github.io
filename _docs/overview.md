---
title: The project ecosystem
nav_title: Ecosystem overview
category: overview
order: 1
summary: How the projects, the hub, and this site fit together.
---

fairyfox.io is the hub at the centre of a small set of repositories. It plays two
roles: it is the public home page for the projects, and it is the source of the
shared engineering standards those projects follow.

## The pieces

- **The hub** — this repository (`junebug12851.github.io`, served at fairyfox.io).
  It holds the website, this documentation library, and the canonical shared
  standards in its `hub/` directory.
- **The projects** — independent repositories, each with its own code, its own
  documentation site, and (where adopted) its own copy of the shared standards.
  They are listed in the [project registry](/projects/).

## How they connect

The repositories are linked only through git, and only in one direction per flow:

- **The hub reads the projects.** On request, it pulls a read-only copy
  of each project so their changes can be summarised on the [blog](/blog/).
- **The projects read the hub.** Each project pulls the hub's `hub/` directory to
  refresh the shared standards, then copies what it needs into its own tree.

There are no submodules, no live dependencies, and no automation that reaches
from one repository into another. This keeps every repository independent and
avoids any circular updates. The full model is documented under
[cross-project sync](/docs/cross-project-sync/).

## Documentation, two levels deep

This library covers the material that is shared or cross-cutting — the standards,
and a short entry point per project. Each project's *full* documentation lives on
its own site, published with GitHub Pages and served under this domain (for
example, `fairyfox.io/pokered-save-editor-2/`). The navigation links directly
into those sites, so the hub and the projects read as one connected set of docs.
