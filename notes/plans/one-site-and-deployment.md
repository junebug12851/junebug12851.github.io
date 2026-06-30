# Plan — one seamless site, deployment policy, and standards cleanup

**Status:** IN PROGRESS.
- Sections A–F, H — **shipped in `0.10.0`** (standards/notes).
- Section G submenu nav — **shipped in `0.11.0`** (`.subnav`, live on Projects + Docs).
- Marker advances — **done in `0.11.0`** (fairyfox-games ×3, RAP 2026-06-28).
- **REMAINING:** serve games at `fairyfox.io/games/` — requires renaming the games repo
  `fairyfox-games → games` (node-side: repo rename + base path `/games` + update its
  CLAUDE/notes), then **retire the hub `/games/` redirect** (`games.html`) and update
  the registries (`key`/`docs`). The hub doesn't rename a node from its own session, so
  this is a games-repo change (or an explicit owner go-ahead to drive it via `gh`). The
  `games.fairyfox.io` Netlify subdomain is dropped either way.

Original plan preserved below.
**Date:** 2026-06-30
**Origin:** owner decisions in the live session following the 2026-06-30 inbound
report-review (`notes/fairyfox-reports/inbound/INBOX-2026-06-30-0208.md`), which
synthesized fairyfox-games' three process reports. Several decisions **override** that
briefing's recommendations — recorded here as the authoritative direction.

## Decisions (authoritative)

1. **One seamless site, not "similar" sites.** Nodes should not merely *match* the
   chrome — they should appear as pages **of** fairyfox. The model is the existing
   Games link: an ordinary header link that lands on what looks like another page of
   the site; you never leave fairyfox. Retire the "← Back to Fairy Fox" / way-home
   back-button concept entirely.
2. **Submenu nav.** A secondary menu row below the primary nav (e.g. the Projects
   menu), reusable by node/section pages, for a fully consistent site.
3. **Collection / monorepo = deliberate exception, not the default.** Allowed only
   when owner + Claude talk it out and agree it's the right call (as we did for
   fairyfox-games). Document it as a justified exception, not a general blessing.
4. **Deployment policy:** runnable / built **apps** (e.g. Random AI Prompt) deploy to
   **Netlify**; **non-app / static** things deploy to **GitHub Pages**.
   - **fairyfox-games is the single exception:** it's a collection of games that is
     part of the site, so it lives on **Pages alongside docs** — **no Netlify, no
     subdomain.**
5. **Tags:** games-local only. **Reject** the system-wide tag model (no shared
   vocabulary, no `/tags/` mesh filter). fairyfox-games keeps its own display-only
   chips.
6. **Cloning:** purge all shallow-clone language across the standards. Use a **normal
   full clone** everywhere — it works better and the topic is closed.
7. **Same-day setup cross-reference:** fold into the onboarding runbook (approved).
8. **Plan-before-execute is a mesh-wide default.** Plan non-trivial work in detail —
   structured and organized — *before* executing it. The point is execution
   reliability (Claude executes a well-planned, organized plan far more dependably
   than it improvises), not paperwork for the owner. **All projects adopt this by
   default.** (This plan file is itself an instance of the principle.)

## Work breakdown

### A. docs-site standard → seamless "one site" model
Files: `hub/standards/docs-site/05-navigation-and-cross-linking.md`,
`08-compliance-checklist.md`, `01-overview-and-principles.md`,
`03-layout-and-structure.md`, `04-components.md`, plus the bundled
`reference/` snapshot and the docs-site `README.md`.
- Replace the "themed docs site that *matches* the hub + a persistent
  '← Back to Fairy Fox' way-home link" requirement with: **a node presents the
  shared fairyfox chrome and appears as a page of the one site.** The brand / Home
  nav link is the only "way home"; a dedicated back-button is removed, not just
  discouraged.
- Add the **submenu** pattern (secondary nav row below the primary nav) as a
  standard component, with the Projects submenu as the canonical example and
  node/section pages reusing it.
- Codify the **primary nav slot/order** including Games:
  `Home · Projects · Games · Docs · Downloads · Updates · About` (About last).
- Ship a **copy-paste reference header / footer / submenu snippet** in the docs-site
  `reference/` bundle (exported from the real fairyfox.io site — it is the master
  copy, manual review only — not authored fresh) so nodes adopt the chrome without
  reverse-engineering `_includes/`.
- Update the `Verify` / compliance checklist rows accordingly (way-home row becomes
  "brand/Home link present; no standalone back-button"; add nav-order + submenu
  checks).

### B. Deployment policy (new)
Files: `notes/reference/deployment.md` (site-local), and a hub standard — extend
`hub/standards/new-project-setup.md` + `onboarding-existing-project.md`, and/or add a
short `hub/standards/deployment.md` with a `Verify` section (compliance-wired).
- State the rule: **built/runnable apps → Netlify; static/non-app → GitHub Pages.**
- Record **fairyfox-games as the documented exception** (collection of games that is
  part of the site → Pages with docs; no Netlify, no subdomain).
- Note RAP-style apps stay their own Netlify deploys but link in seamlessly via the
  shared chrome (decision 1).

### C. Collection / monorepo as a deliberate exception
Files: `hub/standards/new-project-setup.md`, `onboarding-existing-project.md`,
and likely `hub/standards/git-workflow.md` / `notes/decisions/architecture.md` for
the rationale record.
- Add a named "collection / monorepo" variant: allowed **by explicit
  owner+Claude agreement**, not default. When used, the unit of quality is the
  per-sub-unit folder (own core/tests/docs/version expectations) and the repo-level
  Pages site is a landing index.
- Cross-reference decision 4: a static collection like games is also the
  Pages-doubles-as-docs-site case.

### D. Shallow-clone purge → normal full clone
Edit (live standards / active docs / templates / root context):
- `hub/standards/adopting-updates.md`
- `hub/standards/cross-project-sync.md`
- `hub/standards/compliance.md`
- `hub/standards/new-project-setup.md`
- `hub/standards/onboarding-existing-project.md`
- `hub/standards/process-reports.md`
- `hub/templates/CLAUDE.md`, `hub/templates/project.gitignore` (comment)
- `notes/reference/cross-project-sync.md`, `notes/reference/git-workflow.md`
- `CLAUDE.md` (root), `notes/context/architecture.md`, `notes/systems/overview.md`
- docs-site bundled skeleton copies: `hub/standards/docs-site/_docs/cross-project-sync.md`,
  `_docs/adopting-updates.md`, `_docs/process-reports.md` (and any others under the
  skeleton that carry the wording).

Replace `--depth 1` / `shallow` / `reset --hard` / `--unshallow` / "expect the
ff-only to abort" framing with a plain **`git clone --branch dev --single-branch`
(full history)** + `git fetch` + `git merge --ff-only` model. Drop the
shallow-mirror false-`(forced update)` discussion that the siblings kept reporting —
it disappears once clones are full.

**Keep as historical record (do NOT edit):** `_posts/*`, `notes/sessions/*`,
`notes/version/*`, `notes/fairyfox-reports/*` (incl. `inbound/INBOX-*`), and
`notes/decisions/rejected.md` (it correctly records shallow-clone as a rejected idea).

### E. Onboarding same-day setup cross-reference
File: `hub/standards/onboarding-existing-project.md`.
- Add: if a same-day setup report exists, read it first to avoid re-litigating
  monorepo/collection caveats. Optionally capture the integrated render-tier as a
  recognized pattern (already built site-side).

### F. Tags — explicit non-action
- No system-wide tag standard. Note in the docs-site standard that tags are
  display-only chips and any filtering is a node-local choice. (Closes the
  briefing's Theme C2.)

### H. Plan-before-execute standard (mesh-wide default)
Files: a new `hub/standards/planning.md` (or a "ways of working" standard) with a
`Verify` section, wired into `hub/standards/compliance.md`; the "Default Workflow"
block of `hub/templates/CLAUDE.md` and the root `CLAUDE.md`; nodes pick it up via
`adopting-updates.md`.
- State the rule: for non-trivial work, write a detailed, structured plan first
  (decisions → work breakdown by file/area → open items → release shape), then
  execute against it. Trivial one-step changes are exempt.
- Frame the rationale as execution reliability, not owner overhead.
- `Verify`: a node demonstrates the practice (e.g. plans live under `notes/plans/`
  for substantive changes).

### G. Site code (separate follow-up release)
Not standards — the actual fairyfox.io implementation:
- Serve games under **`fairyfox.io/games/`** on the hub's Pages and **retire the
  `games.fairyfox.io` subdomain + the current `/games/` redirect** (commit
  `0fb30be`).  ← **confirm mechanism before building** (see Open items).
- Build the **submenu** nav component on the site; wire the Projects submenu; expose
  the snippet for nodes.
- Update `_data/projects.yml` / `_data/downloads.yml` and registry as needed.

## Marker advances (deferred — for a live, approved session after folding)
- `fairyfox-games` `reports_through: []` → append `2026-06-29-setup.md`,
  `2026-06-29-onboarding-verify.md`, `2026-06-30-docs-site-feedback.md`.
- `random-ai-prompt` `reports_through` → append `2026-06-28-adopting-updates.md`
  (check-only vs 0.9.6; already addressed).

## Open items to confirm before execution
1. **Games hosting mechanism.** Inferred: serve games from the hub's own Pages at
   `/games/` (same domain, shared chrome), retiring the subdomain + redirect.
   Confirm this is the intended "appears as a page of the site," vs. keeping a
   separate deploy that only *looks* seamless.
2. **Release shape.** Likely a MINOR (real milestone: deployment policy + one-site
   model) for the standards pass; the site-code follow-up (G) its own release.

## Release procedure (when approved)
Standard git-flow: work on `dev` (or `feature/one-site-standards` off `dev`), inline
changelog atop `notes/version/2026-06.md`, bump `VERSION`, build-check, then release
per SemVer level. Update the docs-site standard + `11-measurements-reference.md` +
`reference/main.css` in step if the site's chrome changes (master copy = manual
review).
