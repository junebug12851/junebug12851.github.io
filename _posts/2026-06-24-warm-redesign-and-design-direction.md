---
title: "A new design direction, and the site rebuilt warm"
subtitle: "A long design session: a reference teardown, a decoupled design direction settled in the notes, and fairyfox.io rebuilt into a warm, static, node-based site (0.4.x)."
date: 2026-06-24
tags: [fairyfox-io, site, update, design]
---

Today was mostly about the hub itself — first a design discussion, then a rebuild that took
fairyfox.io from `0.3.x` to `0.4.x`.

## A design direction, settled in the notes

The day started by taking apart a well-regarded reference site to separate its craft from its
persona, then writing up a design direction for fairyfox.io in the notes. A few principles
came out of it and now guide the site:

- **Decoupling carried into the UX.** Every page is a self-standing node — landable cold,
  understandable on its own, never dependent on how you arrived. Pages interconnect through
  clean links, but those are optional lateral doors, not a guided path. Flat and simple, never
  a maze.
- **The site as a projection.** It stays a fast static surface that *reads* prepared data; the
  heavier work of gathering across projects belongs to a separate, decoupled layer that
  *writes* that data — one-directional, the same rule as cross-project sync.
- **Neutral, not bland.** The voice documents the work with care and no ego; the craft should
  be obvious without boasting.

The full write-up lives under the site's own documentation.

## The site, rebuilt warm

The rest of the day put that direction into the live site, in small verified passes:

- **A new design language** — a warm palette and a serif/sans/mono type system, with light and
  dark both designed rather than one inverted.
- **A portal home** — the masthead became a hero alongside an **activity panel**: a 30-day
  commit chart and a scrolling log of recent changes, rendered entirely at build time from a
  data file, with no client JavaScript.
- **Standardised project cards** — a clear status taxonomy (a lifecycle badge, version, and an
  active/inactive marker), sorted newest-first.
- **Project node pages** — each project now has a self-locating page at `/projects/<key>/`
  with its status, a short description, a connections grid, and recent activity drawn from its
  tagged updates.
- **fairyfox.io listed as a project** — the hub now appears in its own index, treated like the
  others.

Each change was built, screenshotted, and shipped on its own, carrying the version through the
`0.4.x` line. What's left is the deeper, decoupled machinery — generating the activity data
from the projects' real history, and adding interactive examples — rather than structure.

## Setup and update procedures, written down

The same day also added the first two lifecycle runbooks to the shared standards — the
project-agnostic procedures (for an assistant or a person) for moving a project through the
mesh. One covers **setting up a fresh project** end to end: the two-branch git model, copying
in the templates and the notes skeleton, adopting the standards, and registering it in both
registries. A second covers **onboarding an established repository** that already has its own
history, README, and version scheme — a reconcile-not-clobber path that folds the standard
around what is already there rather than overwriting it (no forced branch rename, no version
reset, honest partial-adoption flags). Both are kept current by default whenever the lifecycle
procedure changes. They live under the shared standards in the
[documentation library](/docs/new-project-setup/).
