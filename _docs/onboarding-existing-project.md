---
title: Onboarding an existing project
nav_title: Onboarding a project
category: standards
order: 8
summary: Folding an established repository into the mesh by reconciling the standard onto it, not overwriting it.
---

The second lifecycle runbook. It brings a project that **already exists with its
own life** — its own history, README, structure, and version scheme — into the
mesh for the first time. The end state is the same as a greenfield setup; the
difference is purely the path. The canonical machine copy lives in the repository
at `hub/standards/onboarding-existing-project.md`; this page is the readable
summary.

## The governing rule

**Reconcile, don't overwrite.** An established repository already encodes
decisions — a version number, a branch model, a README, maybe its own docs. The
standard is folded *around* those, keeping what is good and recording any
deliberate divergence. A blind template copy that flattens existing work is the
failure mode this runbook exists to prevent.

## The path

Survey what already exists before touching anything (branch model, versioning,
docs, ignores, license, CI). Adopt the `dev`/`main` model where it fits cheaply,
but **don't force a `master → main` rename** if it would be disruptive — record
the real branch in the registry instead. Fold each template in around what is
there, seed `VERSION` from the project's real version rather than resetting it,
and map existing docs into the notes system by linking rather than duplicating.
Register the project with **honest** adoption flags — partial adoption is normal
for an existing repository — then commit and fast-forward.

Joining the mesh is a direction, not a single switch: onboard incrementally and
tighten over later passes through the
[adopting-updates runbook](/docs/adopting-updates/). A blank repository instead
follows [new-project setup](/docs/new-project-setup/).
