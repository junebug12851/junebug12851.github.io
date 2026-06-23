---
title: Principles and voice
nav_title: Principles & voice
category: site
order: 6
summary: What the site and repository value — and the writing voice the whole site holds to.
---

These are the standing guardrails for the site and the repository behind it.

## What the site should feel like

- **Fast and quiet.** A static site that loads instantly, reads well on a phone, and
  respects light and dark. No heavy frameworks, no tracking, no clutter.
- **Always current.** The projects list, the updates feed, and the feeds are
  generated, so they do not drift. Adding a project is a single edit to one
  registry.
- **Professional and clear.** A plain, direct voice — no gimmicks and no cutesy
  filler.

## The documentation voice

The site is written *about* the projects and the work — not in the owner's first
person, and not as a personal brand. Fairy Fox is referred to by name only for
attribution; the site documents and indexes the work rather than boasting about it.
Mentioning and describing what the work does is expected; glorifying it is not. This
neutral voice is what keeps the hub readable as documentation.

## What the repository should feel like

- **Self-documenting.** A newcomer — a person or an AI assistant — can get oriented
  from the README, to the entry-point file, to the notes, with nothing trapped in
  one person's head. The notes are a living document, kept current by default.
- **Low-risk git.** A clean, faithful, linear history: a working branch for
  development, and a deployable branch that only moves by fast-forward and is never
  rewritten once pushed. See the [git workflow](/docs/git-workflow/).
- **One source of truth per fact.** The version number lives only in `VERSION`; the
  project list only in its registry; the shared standards only in the hub. Nothing
  is duplicated — it is linked.

## Cross-project discipline

- **Git only, one direction at a time.** Projects communicate with the hub solely
  through git: the hub reads projects, and projects read the hub. No submodules, no
  live dependency, no build-time coupling.
- **Pull on explicit request, never automatically.** This is what prevents a loop
  where one repository's update triggers another's.
- **The hub is the source of shared standards; projects own their own content.** A
  convention is promoted up to the hub when it is reusable, and project-specific
  detail stays down in the project. See [cross-project sync](/docs/cross-project-sync/).
