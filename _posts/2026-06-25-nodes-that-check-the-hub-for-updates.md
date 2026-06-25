---
title: "Standards harden, and the projects join the mesh for real"
subtitle: "A full day across the mesh: nodes learn to check the hub for updates, a docs-site design standard and a full git-flow model are written down, and both Random AI Prompt and Pokered Save Editor 2 fully onboard — themed docs and all — plus an SFW-by-default toggle."
date: 2026-06-25
tags: [fairyfox-io, random-ai-prompt, pokered-save-editor-2, site, standards, update]
---

A long day, mostly on the connective tissue of the mesh: the shared standards grew
two substantial pieces, the git model was rewritten, and one of the projects went
from *listed* to genuinely *integrated* — with a small product feature shipped along
the way.

## A node that can check for updates

Picking up the lifecycle-runbook work, each project gained the awareness to **notice**
there are hub changes to adopt in the first place. The adopting-updates runbook now
opens with what a project should do when someone asks whether the hub has anything
newer: the behaviour is an intent to recognise in ordinary conversation — not a fixed
command — and the default is **check-and-report, then stop**. Refresh the read-only
hub clone, diff what changed against what the project has already adopted, report a
short summary of what adopting it would touch, and then wait. Nothing is applied
without an explicit go-ahead.

A follow-up tightened when that flow should fire at all. A bare "check for updates" is
too ambiguous to act on — it could mean the operating system, dependencies, or a
single file — so the request now has to name the fairyfox system explicitly before a
project treats it as a sync check. The whole project lifecycle is now written down end
to end: [setting up a new project](/docs/new-project-setup/), [onboarding an existing
one](/docs/onboarding-existing-project/), and [adopting updates](/docs/adopting-updates/).

## A docs-site design system for every project

The largest new standard of the day is a [docs-site design system](/docs/docs-site/):
the shared look, structure, and cross-linking that make each project's documentation
site feel like one continuous surface with fairyfox.io. It is written as a
specification a project implements in its own stack — design tokens, layout, the
shared components, accessibility, a domain-and-publishing model, and a measurements
reference that pins every value — rather than a stylesheet to copy. The principle is
seamlessness on one domain: every project publishes under `fairyfox.io/<project>/`,
wears the same skin, and links both ways, so the boundary between the hub and a
project disappears. fairyfox.io itself is the master copy and is exempt from
auto-applied theme changes — direction is strictly outward, from the hub into the
projects.

## The git model is now git-flow

The shared [git workflow](/docs/git-workflow/) was rewritten around **git-flow** —
the branching model, not the scripts. `feature/*` branches are the normal unit of
work and `hotfix/*` covers urgent production fixes; every merge into `main` is a
tagged release, always with `--no-ff`. How a release reaches `main` follows the
SemVer level: a **patch** goes directly from `dev`, while a **minor or major** is
staged through a `release/*` branch — ceremony proportional to the change. A related
decision made `main` the mandatory name for the stable branch across the mesh, with a
safe rename path (never a history rewrite) for any repository still on `master`. The
one everyday solo shortcut — a trivial change committed straight on `dev` — remains,
as latitude *within* the model rather than a lighter model of its own.

## Random AI Prompt joins the mesh for real

[Random AI Prompt](/projects/random-ai-prompt/) became the first project to follow the
onboarding runbook all the way through. Being listed in the registry was never the same
as being integrated, and the gap showed: its assistant context carried no mesh
awareness, and its documentation site was still a default-themed generator dump. Both
were closed this day. The project's `CLAUDE.md` gained the standing cross-project
instruction and its guardrails, a project-side record of the sync model was added, and
its JSDoc documentation site was re-skinned from scratch to wear the fairyfox design
system — the dark-first warm palette, the type system, and the two-way links back to
Fairy Fox and to the project's node page. The themed docs go live on the project's next
publish.

It also became the first project to act on the new git model: Random AI Prompt adopted
the git-flow standard and renamed its stable branch from `master` to `main`, repointing
its CI, Pages, and release workflows in the process. (The corresponding `tree/master`
and source-archive links on this site were repointed to `main` to match.)

## Pokered Save Editor 2 joins too

The same runbook carried [Pokered Save Editor 2](/projects/pokered-save-editor-2/) the
rest of the way into the mesh on the same day — the project the shared standards
originally came from, now formally following them. Its `CLAUDE.md` gained the
mesh-awareness block, the cross-project sync model was adopted as a committed reference,
and `assets/references/` was ignored for the read-only hub clone. The remaining hard
gap was the documentation site: it is generated by Doxygen, so the whole site *is* the
generator output. Per the docs-site standard's guidance for that case, the fix was to
theme the generator itself rather than wrap a shell around it — a theme layer repoints
Doxygen's variables at the exact hub tokens (dark-first, OS-following light, the shared
type system, the project's pink accent), and customised header and footer templates add
the project brand and the required "← Back to Fairy Fox" way-home link. With that, the
project's documentation transitions seamlessly to and from the rest of the site; the
themed build ships on its next publish.

## SFW by default

Alongside the mesh work, Random AI Prompt shipped a small but real feature (2.6.1): the
web app now defaults to **safe-for-work**, with a right-aligned **NSFW** toggle in the
top bar as a stopgap until a full options screen lands. The generation engine already
gated on the setting everywhere; it simply had no default and no control surfaced.
Enabling NSFW requires a confirmation step, turning it back off is immediate, and the
choice is remembered in the browser.
