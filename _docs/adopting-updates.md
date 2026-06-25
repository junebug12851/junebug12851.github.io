---
title: Adopting updates
nav_title: Adopting updates
category: standards
order: 9
summary: How a project already in the mesh checks for, and applies, later changes from the hub — on request, report-first.
---

The third lifecycle runbook. Once a project is in the mesh, this is how it pulls
and applies later hub changes: updated standards, structure, templates, specs, or
any canonical artifact the project mirrors. The flow is **outbound** (the project
reads the hub) and happens **only on explicit request** — never scheduled, never
auto-chained, which is what prevents recursion across repositories. The canonical
machine copy lives in the repository at `hub/standards/adopting-updates.md`; this
page is the readable summary.

## The model in one line

You re-read a read-only copy of the hub, diff what changed, and copy the relevant
pieces into the project by hand — then commit them locally. Adopting a standard is
a *copy*, not a live link, so applying an update is always a deliberate,
reviewable edit.

## Checking for updates is report-first

When a project is asked to check the hub for updates, the default is
**check-and-report, then stop**: refresh the read-only hub clone (with a re-clone
fallback if a force-push makes the shallow pull abort), diff what changed against
what the project has adopted, report a short summary of what changed and which
files adopting it would touch — and then wait. Nothing is applied until an
explicit go-ahead. The node can *discover and explain* updates on its own, but
never *changes itself* without confirmation.

## Applying, when asked

Applying brings each kind of change into the project's own tree, per category
(standard, structure, spec, template, design), reconciling with any local edits —
the rule of thumb is *copy the change, not the file*. A deliberate divergence from
a hub standard is kept and explained, not flattened. The work is recorded in the
notes and changelog and ships in the same commit, then fast-forwards `main`.

Bootstrapping a project in the first place is covered by
[new-project setup](/docs/new-project-setup/) and
[onboarding an existing project](/docs/onboarding-existing-project/); the model
behind all of it is [cross-project sync](/docs/cross-project-sync/).
