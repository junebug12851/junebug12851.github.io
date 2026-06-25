# 09 · Adopting & Maintaining

How a project takes on this design system, keeps it current, and where the
**fairyfox.io master copy** sits in the flow.

## fairyfox.io is the master copy — and is exempt from auto-apply

The design system **originates at fairyfox.io**; that site is the **master copy.**
This has a hard consequence for the update flow:

- **Direction is one-way: outward.** The master is hand-curated at fairyfox.io;
  projects adopt *from* it. Nothing flows back into the master automatically.
- **fairyfox.io is exempt from auto-applied style/theme/structure updates.** Its
  visual changes go through **Fairy Fox's own separate, manual-review process** —
  deliberately, to protect the master copy from accidental edits.
- **A "check the fairyfox system for updates" request involving style/theme must
  never edit the fairyfox.io site itself.** On the master, that request is
  report-only at most; any change to the look is Fairy Fox's manual call. (This
  matches the general rule that the hub never adopts standards *from* itself — see
  [`../adopting-updates.md`](../adopting-updates.md) and the hub `CLAUDE.md`.)

So: **author/curate the theme at fairyfox.io by hand; adopt it into projects via the
flow below.**

## Adopting into a project (first time)

This is the design-system half of bringing a project into the mesh. Do it alongside
the lifecycle runbooks:

1. **Read the spec** — all of [`README.md`](README.md) and files `01`–`08`.
2. **Implement in the project's stack** — reproduce the tokens, shell, components,
   layout, and the required cross-links, in whatever the project is built on. Match
   as closely as the stack allows.
3. **Publish at `fairyfox.io/<key>/`** and confirm the main site links *in* resolve
   (registry `docs:`/`repo:` accurate).
4. **Run [`08-compliance-checklist.md`](08-compliance-checklist.md)**; fix gaps.
5. **Record any deviation** with its reason (next section).

Sequencing with the rest of onboarding lives in
[`../new-project-setup.md`](../new-project-setup.md) /
[`../onboarding-existing-project.md`](../onboarding-existing-project.md).

## Adopting later updates

When the master design system changes at fairyfox.io, projects pull it in through
the normal **check-for-updates** flow — **check, report, then wait**, apply only on
an explicit go-ahead (full procedure: [`../adopting-updates.md`](../adopting-updates.md)).
For a theme change that means:

1. Refresh the read-only copy of the hub, diff this `docs-site/` standard against
   what the project implemented.
2. Report what changed (which tokens/components/rules) and what the project would
   need to touch.
3. On go-ahead, update the project's implementation and re-run the checklist.

Re-apply the **intent** of the change to the project's stack — this is a spec, so
adoption is always reimplementation, never a file copy.

## Recording deviations

A project may diverge for a real reason (a stack that can't do `backdrop-filter`, a
generator that won't accept custom fonts). When it does:

- Keep the deviation **deliberate and documented** — a line in the project's docs
  or its notes (`decisions/`), saying what differs and why.
- Prefer "match what I can + boundary the rest" over a half-applied look.
- A documented deviation is compliant; an undocumented drift is not.

## Keeping it current (by default)

Treat the themed docs site as **living** — when the project changes, its docs change
with it, the same default-maintenance posture the mesh uses for notes and
changelogs. When this standard itself changes, projects re-adopt on request; the
master at fairyfox.io is updated by Fairy Fox by hand.
