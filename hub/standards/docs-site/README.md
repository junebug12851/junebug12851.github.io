# Standard: Docs-Site Design System

The shared look, structure, and cross-linking that make **every project's
documentation site feel like one continuous site with fairyfox.io** — so moving
from the main site into a project's docs (and back) is seamless.

> Canonical, project-agnostic standard. Projects **read this and implement it in
> their own stack** — they do not copy a CSS file. Companion lifecycle runbooks:
> [`../new-project-setup.md`](../new-project-setup.md),
> [`../onboarding-existing-project.md`](../onboarding-existing-project.md),
> [`../adopting-updates.md`](../adopting-updates.md). The mesh model:
> [`../cross-project-sync.md`](../cross-project-sync.md).

## How this standard works (read this first)

This is a **specification, not a theme package.** Each project is built on
different tooling — Jekyll, a JS app, Doxygen, MkDocs, hand-rolled HTML — and each
project's AI/maintainer is trusted to **read these files and reproduce the design
faithfully in whatever system it uses.** The goal is a result a visitor can't tell
apart from fairyfox.io, not byte-identical source.

The bar: **as close a match as the project's stack allows.** Where a generator
can't match exactly (e.g. Doxygen's API pages), match what you can and keep the
unavoidable difference behind a clear, intentional boundary (see
[`06-content-and-organization.md`](06-content-and-organization.md)).

## fairyfox.io is the master copy — exempt from auto-apply

The design system **originates at fairyfox.io**; the site is the **master copy.**
Changes to the theme/style/structure here are made **deliberately, by Fairy Fox,
through a separate manual-review process** — they are **never** auto-applied to the
fairyfox.io site by the update flow. Direction is strictly one-way: the master is
hand-curated here, and **projects adopt outward from it.** A "check the fairyfox
system for updates" request that involves style/theme must therefore **never**
edit the fairyfox.io site itself — it only ever reports/adopts *into a project*.
Full rule: [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md).

## The files

| File | What it specifies |
|------|-------------------|
| [`01-overview-and-principles.md`](01-overview-and-principles.md) | The goal, the principles, and the one-domain URL model that makes seamlessness possible. |
| [`02-design-tokens.md`](02-design-tokens.md) | The exact visual DNA — colour (dark + light), typography, spacing, radii, shadow, motion, backdrop, meta. |
| [`03-layout-and-structure.md`](03-layout-and-structure.md) | Page anatomy, the documentation layout (sidebar/content/crumbs), the responsive rules. |
| [`04-components.md`](04-components.md) | The shared UI pieces — brand, nav, buttons, cards, code, callouts, tables, badges, footer. |
| [`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md) | The seamless transition: how a project links **back** to fairyfox.io and its node page, and how the main site links **in**. |
| [`06-content-and-organization.md`](06-content-and-organization.md) | What pages a project docs site has, how they're grouped, and how generated API docs fit in. |
| [`07-accessibility.md`](07-accessibility.md) | The WCAG 2.1 AA bar, focus, contrast, reduced motion, semantics. |
| [`08-compliance-checklist.md`](08-compliance-checklist.md) | A concrete checklist to verify a project is compliant. |
| [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md) | How to adopt this, keep it current, and record deliberate deviations. |
| [`10-domain-and-publishing.md`](10-domain-and-publishing.md) | How a project joins the `fairyfox.io` domain on GitHub Pages (served at `fairyfox.io/<key>/`) — the infrastructure under the one-domain model. |

## In one paragraph

Every project publishes its docs **under the same domain** as the main site
(`fairyfox.io/<project>/`), wearing the **same design tokens, layout, and
components**, with a header that always offers the way **back** to fairyfox.io and
to the project's own node page — and the main site links **into** each project's
docs. Get those three things right (same skin, same shell, two-way links on one
domain) and the boundary between "the hub" and "a project" disappears.
