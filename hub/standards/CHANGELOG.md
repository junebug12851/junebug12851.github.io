# Standards — CHANGELOG

What changed in `hub/standards/` (and the templates that operationalize them), by hub
`VERSION`, so an **adopting node can tell *new* from *materially-changed* from a read** —
without a full-tree object diff its shallow-then-discarded mirror can't cheaply provide
(three nodes asked for exactly this). Pair it with each node's last-adopted `hub_version`
anchor (from its newest `*-adopting-updates.md` report): read every entry newer than that
anchor, then adopt + record in the [adoption manifest](../templates/notes-skeleton/reference/adoption-manifest.md).

Newest on top. This changelog starts at 0.21.0; earlier standards history lives in the
hub's own `notes/version/` changelog.

## 1.5.0 — Docker: local-first build/test/setup

Owner directive (2026-07-23): projects should use Docker whenever possible — the developer runs
Docker on Windows, so Linux-only build/test/setup should run **locally in a container**, not be
deferred to the online CI runner; and Docker problems are **fixed, not written off**.

**New standard**
- **`docker.md`** — local-first build/test/setup & install; CI is the backstop gate, not where
  you discover whether Linux passes; **fix Docker issues, don't route around them**; Windows↔Linux
  is exactly what it's for (CRLF/mount/platform gotchas handled); vendor the Docker assets in-repo;
  honest `N-A` when a project genuinely gains nothing. `## Verify` + a `compliance.md` matrix row;
  the CLAUDE template's Build/Run section carries the mesh rule.

## 1.4.0 — complete-by-default + phase-by-default + web-interface enforcement

Folded an owner directive (2026-07-23) targeting three recurring node failures: incomplete
project detail/badges, under-phased work, and a still-rough docs-site web interface.

**Materially changed**
- **`badges.md`** — flipped from "as many as apply (AI drops)" to **the full 20-badge set
  required by default in a fixed order**; swap the per-project equivalent (version tag/package-
  json, deploy Pages/Netlify) or add distribution badges — never drop. **Omission is a
  user-only exception at onboarding, recorded in the manifest — never the AI's own "doesn't
  apply" call.** The social/preview image is the one automatic exemption. `templates/README-badges.md`
  reordered to match; `## Verify` checks all 20 in order + recorded exceptions.
- **`planning.md`** — **phase-by-default**: decompose non-trivial work into as many phases as it
  needs across three levels — **research** (primary sources, local + online; not skipped/rushed),
  **planning** (as often as needed; primarily for the executor), **implementation** (coherent,
  shippable phases). `## Verify` + the CLAUDE template's Default Workflow updated.
- **`coins.md`** — the **base coin counter/button is MANDATORY** (ships with the chrome bundle);
  a project does **not** get to decide it's "not needed" and drop it. Only project-*added* coin
  moments are optional. `## Verify` adds the presence check.
- **`docs-site/12-shared-chrome.md`** — **whole-bundle-or-nothing** (all four HTML parts + all
  JS incl. `coins.js` + CSS + fonts, every page); **read the bundle, don't guess**; **remove the
  tool's own default chrome** (no double footers/headers, no default sidebar, no default CSS
  overriding the chrome's links/type — **replace the stylesheet, don't override**).
- **`docs-site/05-navigation-and-cross-linking.md`** — **firm subnav baseline** (no bare
  subnav; build the pages a real project has), **dividers between zones only**, **`Project Notes`
  is an on-site page, never a GitHub link**, **copy a sibling's subnav** rather than hand-invent,
  and the **active primary-nav = `Projects` always** rule restated (the "Docs active" mistake).
- **`docs-site/06-content-and-organization.md`** — Notes rebuilt into a **fully-navigable,
  polished on-site interface — never an external GitHub link**: root note + jump-off cards, a
  **scrolling category sidebar with nested drill-in *and* back-out**, working reader controls in
  the content pane, a designed look.
- **`docs-site/08-compliance-checklist.md`** — the **disqualifying anti-pattern** (a default-
  theme build with cosmetic-only changes is `missing`, not `partial`); coins mandatory; whole
  bundle + no default chrome; subnav baseline; on-site Notes; a **legal-pages** check; fixed a
  `data-story`→`data-read`/`data-story` drift.
- **`legal-docs.md`** — broke it down so a lost node can follow: **what each page covers**
  (Privacy/Terms/Cookies content breakdown), **how to maintain** them (living, disclose-on-ship,
  re-read on release), and **where the links live** (the vendored chrome footer's legal column —
  don't derail it). `## Verify` rows for per-page coverage + footer-not-derailed.
- **`onboarding-existing-project.md` / `new-project-setup.md`** — **project details complete by
  default** in `_data/projects.yml` (blurb/tags/lifecycle/version/…; social image exempt; omit
  only on a user exception); the full ordered badge block; Row 6 anti-pattern generalized to any
  stack's default theme; Verify rows added.
- **`compliance.md`** — badges row updated to the default-required, ordered, user-exception set.

## 0.21.0 — process-report fold-back (the "done means verified" release)

Folded the 2026-07-23 inbound report-review pass (15 node reports; the headline: "whole
checklists get skipped while marked done", owner-confirmed mesh-wide).

**New standards**
- **`checklists-are-contracts.md`** — every checklist/`## Verify` item is owed an
  individually-recorded outcome before any "done"; mechanical enumeration; ambitious reading
  of optional items; deferral-requires-falsification; end every pass with a disclosed
  not-done list.
- **`mandate-ledger.md`** — a multi-part owner directive is transcribed verbatim, one row
  per clause; completion claims cite rows; stateful `awaiting-owner`; no milestone-anchoring
  under an open mandate.

**New template artifacts**
- `notes-skeleton/reference/adoption-manifest.md` — per-standard adoption record;
  `copied-only ≠ adopted`; no summary claim without a backing row.
- `mandate-ledger.md`, `provenance-asset.yml`, `check-standards.mjs`.

**Materially changed**
- `notes-system.md` — the adoption manifest + evidence-linked status (no bare ✅ on a
  multi-item claim).
- `process-reports.md` — the review pass now spot-checks a report's claims against the
  node's manifest + tree (step 3a).
- `git-workflow.md` — the pre-release manifest gate + "full CI before `main`, platform-
  enforced (every job in required status checks)".
- `engineering-quality.md` — the **ship contract** (Scorecard ≥ 7.0 floor, tech-debt
  removal, PR triage).
- `supply-chain-hardening.md` — provenance **as a release asset**; full-suite required
  checks; **SAST outlives toolchain bumps**; workflow/artifact hygiene.
- `dependencies.md` — four dependency guardrails (toolchain↔SAST pin, test↔runtime sync,
  real-runtime resolver check, judgment-not-blind-merge).
- `testing.md` — a measurable coverage floor (line ≥ 90% default) wired into the build;
  probe-the-mock-first; gate-the-gates.
- `badges.md` — extended canonical set (watchers, total commits, tech-debt, closed
  issues/PRs, platform, commented distribution badges).
- `coins.md` — coins off the shared chrome (games), read-time chip + drop-cap fragility.
- `legal-docs.md` — coins disclosure ships **with the coins feature**, not the standard.
- `repo-hygiene.md` — check-links false-positive classes + code-span stripping +
  runtime-agnostic note.
- `agent-tooling.md` — `.NET` absolute-paths on Windows, `gh` sandbox passing forms,
  `-f`/backtick → `.ps1 -File`, baseurl-aware Jekyll preview.
- `onboarding-existing-project.md` / `new-project-setup.md` — a JVM/Gradle/Dokka aside;
  the required-status-checks setup step; manifest-seed + first-compliance-pass row.
- `adopting-updates.md` — "already-practiced, now-filed", phasing a mixed adoption,
  coins-is-a-chrome-adoption; step 3a runs Verify + updates the manifest.
- `docs-site/05` + `chrome/{header,subnav}.html` + a new `chrome/adapters/dokka.md` +
  `chrome/CHANGELOG.md` — the adaptive three-zone subnav, rules-on-slots (active nav =
  Projects), and the Dokka adapter.
- `compliance.md` — rows for the two new standards + the ship-contract/coverage additions.
