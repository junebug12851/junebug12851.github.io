---
title: Cross-project sync
nav_title: Cross-project sync
category: standards
order: 4
summary: How the hub and the projects share standards through git, without coupling.
---

The hub and the projects share standards and stay aware of each other through git
alone, with no coupling between them. The canonical machine copy of this standard
is in the repository at `hub/standards/cross-project-sync.md`.

## The rule

Communication is git-only, one-directional per flow, and happens only on explicit
request. There are no submodules, no package dependencies, no build-time coupling,
and no automation that reaches across repositories. Each side reads a read-only
clone of the other when asked to. Both directions track the `dev` branch.

This keeps the repositories modular and prevents recursion: because nothing on one
side automatically triggers a pull on the other, they cannot set each other off in
a loop.

## The two flows

- **Hub reads projects.** The hub keeps read-only clones of each project
  under `assets/references/` (git-ignored, never committed) so their changes can be
  summarised on the blog.
- **Projects read the hub.** Each project keeps its own read-only clone of
  the hub and copies what it needs out of `hub/standards/` and `hub/templates/`
  into its own tree, committing that copy. Adoption is a copy, not a live link.

## Why not submodules

Submodules pin a commit and couple repositories at clone and build time — the
opposite of the goal here. A throwaway clone in a git-ignored folder
provides the content to read with no coupling and no history weight.
