---
title: Dependencies
nav_title: Dependencies
category: standards
order: 16
summary: Upgrade aggressively — including majors — behind a real test gate. Fixing an upgrade is cheaper than deferring it.
---

The projects keep their dependencies **current**. Updates are applied promptly, including
major versions, and when an upgrade breaks something the break is fixed rather than the
upgrade deferred. The canonical machine copy of this standard is in the repository at
`hub/standards/dependencies.md`.

## Why

- **Deferral compounds.** A skipped major becomes a painful big-bang migration later.
  Staying current keeps each jump small and reviewable.
- **Security and support.** Current dependencies get security patches and upstream
  support; stale ones accrue silent risk.
- **A real test suite makes majors a non-event.** That is the point of the gate: a major
  bump becomes "run the suite and see what actually breaks" instead of a leap of faith.

## The practices

- **Dependabot on**, grouping minor and patch updates, running weekly, and targeting the
  working branch so its pull requests match the branch model.
- **A real test gate** in front of every upgrade — the suite, the linters, and the build,
  not a smoke check.
- **Fix, don't pin.** A failing upgrade is a bug to fix, not a version to freeze. Pinning
  is reserved for genuine upstream breakage, and is recorded with a reason.

Pairs with [supply-chain hardening](/docs/supply-chain-hardening/), which supplies the
Dependabot configuration and the vulnerability-clearing side of the same work.
