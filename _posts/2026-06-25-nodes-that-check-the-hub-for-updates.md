---
title: "Teaching the projects to check the hub for updates"
subtitle: "Continuing the lifecycle-runbook work, each project becomes a node that can check the hub for newer standards — bounded to a report-first flow that changes nothing on its own (0.4.9–0.4.10)."
date: 2026-06-25
tags: [fairyfox-io, site, update]
---

A short day on the hub itself, picking up where the lifecycle runbooks left off the
day before. The runbooks describe how a project *adopts* hub changes; today gave each
project the awareness to **notice** there are changes to adopt in the first place — a
small, deliberately bounded piece of hub-awareness.

## A node that can check for updates

The adopting-updates runbook now opens with what a project should do when someone asks
whether the hub has anything newer. The behaviour is described as an intent to
recognise in ordinary conversation — not a fixed command or magic phrase — and the
default is **check-and-report, then stop**: refresh the read-only hub clone, diff what
changed against what the project has already adopted, report a short summary of what
changed and which files adopting it would touch, and then wait. Nothing is applied
until an explicit go-ahead.

That boundary is the point. A node can discover and explain updates on its own, but it
never changes itself without confirmation. Combined with the existing rules — on
request only, read-only on the hub side, the clone git-ignored — it gives real
update-awareness with no risk of an unprompted edit or a cross-repo loop.

## Naming the thing precisely

A follow-up tightened when that flow should fire at all. A bare "check for updates" is
too ambiguous to act on — it could mean the operating system, dependencies, or a single
file — so the request now has to name the hub explicitly before a project treats it as a
sync check. The same change settled a naming split that had been left loose: in
conversation the mesh is referred to as "the system" (the shorter, spoken name), while
the public site keeps calling it the **hub**. Both point at the same thing; each doc
bridges the two names once so there is no confusion.

Together with the three runbooks from the day before — [setting up a new
project](/docs/new-project-setup/), [onboarding an existing
one](/docs/onboarding-existing-project/), and [adopting
updates](/docs/adopting-updates/) — the project lifecycle is now written down end to
end, from a repository joining the mesh to keeping its shared standards current.
