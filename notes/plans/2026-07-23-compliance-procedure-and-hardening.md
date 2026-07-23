# Plan — Compliance procedure modes + hub self-hardening

**Date:** 2026-07-23
**Branch:** `feature/compliance-procedure-and-hardening` (off `dev`)
**Trigger:** Owner ran a full compliance audit of the hub, then directed: make the
audit an invocable procedure with modes (full / partial / last-N-days), **and** close
the hub-side gaps the audit surfaced, in as many phases as needed, to full completion.

## Why

The compliance audit (this session) found the hub fully compliant on its content,
notes, git-flow and sync standards, but weak on the **security/supply-chain layer** —
because those standards were authored node-facing and the hub never applied them to
itself. Separately, the audit is documented in `compliance.md` but has no defined
**invocation modes**, so "fairyfox compliance check" is under-specified.

## Decisions

- **One coherent milestone, MINOR bump → `1.1.0`.** Adds a new procedure surface
  (modes) + a real security layer. Released the git-flow MINOR way (`release/1.1.0`).
- **Establish the modes in the canonical standard** (`hub/standards/compliance.md`), not
  a one-off skill — the mesh reads standards, and a node can adopt the modes.
- **Fix only the hub's real, safe gaps.** Owner-call / N-A items are documented as
  deferrals, not chased (honest per the audit's own posture).
- **SHA-pin from resolved commit SHAs** (looked up via `gh api`), version comment each.

## Work breakdown

### A. Codify the procedure — `hub/standards/compliance.md`
- New **"Invocation & modes"** section:
  - `full` — every standard's `## Verify`, every item, per-row done/partial/missing + named gaps (this session's pass).
  - `partial` — fast pass via `VERIFY-INDEX.md`, row-level status, no deep evidence dig.
  - `last N days` (default 7) — scope to standards touched by commits/sessions in the window (changelog + session logs as the diff).
- Keep the existing gate (must carry "fairyfox" + audit intent) and report-first / fix-on-go-ahead posture for every mode. Target = hub or any node clone.

### B. Hub gap fixes
- `/.gitattributes` — `* text=auto eol=lf`, `.bat`/`.cmd` = CRLF, binaries `-text`. (agent-tooling)
- `/SECURITY.md` — private reporting path (GitHub Security Advisories). (supply-chain)
- `/.github/dependabot.yml` — `bundler` + `github-actions`, weekly, grouped, target `dev`. (dependencies + supply-chain)
- `/.github/workflows/pages.yml` — top-level `permissions: contents: read`; move `pages: write` + `id-token: write` to the `deploy` job; SHA-pin every `uses:` with a version comment. (supply-chain)
- `/README.md` — grouped `flat-square` badge block (pages deploy · docs → fairyfox.io · license). (badges)

### C. Branch hygiene
- Delete merged local `feature/*` + `release/*` branches (`git branch -d`, remote untouched). (repo-hygiene / git-workflow)

## Deferrals (documented, not chased)
- **Branch protection on `main`** — owner-call. Enabling it forces the PR-based release
  path and would break the direct `merge --no-ff dev` PATCH flow; the solo ceiling is
  "noted, not chased" per supply-chain-hardening.
- **CodeQL / SAST** — N-A: a Jekyll/Liquid/Markdown content site has no analyzable code surface.
- **Signed releases / `.intoto`** — N-A: Pages deploy produces no release artifacts.
- **`adoption-manifest.md`** — N-A for the hub: it is the *source* of the standards and
  never adopts them from itself.
- **Coverage floor / unit-test core** — N-A: no logic core; the applicable slice (a
  link/build gate) is a candidate for a later CI addition, tracked separately.

## Release shape
Plan → edits on `feature/…` → `jekyll build` green → notes (session log + changelog +
`VERSION` 1.1.0) → merge `--no-ff` into `dev` → `release/1.1.0` → `--no-ff` into `main`,
tag `v1.1.0`, back-merge into `dev`. Then a process report in `notes/fairyfox-reports/`.

## Verify (per the audit)
Re-run the affected rows after: agent-tooling, badges, dependencies, supply-chain
(partial→improved), repo-hygiene (branch litter), and confirm compliance.md modes read
cleanly. Record results in the process report.

## Phase 2 (1.2.0) — the mandatory items weren't optional

Re-reading `supply-chain-hardening.md`: branch protection + full-CI required check are
**mandatory**, release flow reconciles to PR-based. So the 1.1.0 "deferrals" for those
were wrong — closed in 1.2.0:
- `scripts/check-links.mjs` (vendored zero-dep) + `.github/workflows/ci.yml` (build + link gate).
- `.github/workflows/codeql.yml` (JS SAST).
- `main` branch protection (solo config) via `gh api`; `CLAUDE.md` + git-workflow reconciled to PR releases.
- Fixed 4 dangling hub-standard links the new gate caught.
Order: release 1.2.0 by direct push (main still unprotected), THEN flip protection on —
so future releases are PR-gated but this transition release isn't blocked. Genuine N-A
remains: signed releases (no Pages artifacts), adoption-manifest (hub is the source).
