---
title: README badges
nav_title: README badges
category: standards
order: 19
summary: Every README opens with a status-badge block — as many applicable badges as the project supports, so its health, release, and security posture are legible at a glance.
---

Every repository's README opens with a block of status badges. The canonical machine copy
of this standard, with the copy-paste block, is in the repository at
`hub/standards/badges.md`.

## The rule

Show as many *applicable* badges as the project supports, grouped in rows and set in a
single style. "Applicable" is the only filter: a badge whose backing service the project
genuinely doesn't use is dropped, never faked — a library with no deploy has no deploy
badge, and a non-npm repository shows its git tag instead of a package version.

## Why it isn't decoration

Each badge is a live signal — build state, coverage, Scorecard, quality gate, current
release — so a stale or failing one is visible immediately rather than buried in a tab
nobody opens. The list also works as a nudge: wiring up the badge means wiring up the
service behind it. Several of them front the same services as
[supply-chain hardening](/docs/supply-chain-hardening/) and
[dependencies](/docs/dependencies/).
