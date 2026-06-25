---
title: New-project setup
nav_title: New-project setup
category: standards
order: 7
summary: Bootstrapping a fresh repository fully into the mesh — branches, templates, notes, standards, and registration.
---

The first of three lifecycle runbooks. It takes a fresh (greenfield) repository
to fully set up inside the mesh: the git model, the templates, the living-notes
system, the shared standards, and registration so the hub is aware of it. The
canonical machine copy lives in the repository at
`hub/standards/new-project-setup.md`; this page is the readable summary.

## What "fully set up" means

A project is done when it has `dev` and `main` branches (work on `dev`, `main`
only fast-forwards), a filled-in `CLAUDE.md` pointing at `notes/status.md`, a
`notes/` tree with a real `status.md`, a `VERSION` file, a `.gitignore` that
excludes the reference clones and build cruft, the shared standards adopted as
local copies, and an entry in **both** registries (the hub's `registry.yml` and
the site's `_data/projects.yml`).

## The path

Create the repository and the `dev` branch, pull a read-only shallow clone of the
hub into a git-ignored `assets/references/` folder, copy the templates in (copy,
never link), and fill them out for the project. Confirm each shared standard is
present and reconciled with how the project actually works, register the project
with the hub, then make the first commit on `dev` and fast-forward `main`.

This runbook is **greenfield only**. An established repository that already has
its own history, README, docs, or version scheme follows the
[onboarding runbook](/docs/onboarding-existing-project/) instead, and pulling
*later* hub changes is the [adopting-updates runbook](/docs/adopting-updates/).
