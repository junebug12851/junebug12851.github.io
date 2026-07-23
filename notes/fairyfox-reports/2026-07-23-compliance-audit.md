---
date: 2026-07-23
procedure: compliance-audit
node: fairyfox.io (hub)
outcome: completed
hub_version: 1.1.0
hub_commit: (this release)
---

# Process Report — full compliance audit + hub self-hardening, 2026-07-23

> The hub is a node too. This reports on running the compliance audit against the hub
> itself, then acting on the owner's go-ahead to close the gaps and codify the procedure.
> Voice: direct, honest over flattering.

## Outcome in one line

Ran the **full** compliance audit against the hub — every standard's `## Verify`, every
item (**17 done · 6 partial · 2 missing · 1 N-A**) — then, on an explicit owner go-ahead,
codified the audit's **invocation modes** and closed the hub-side gaps as **1.1.0**.

## What was done

1. **Audited the hub, read-only, reported first.** Walked every `compliance.md` matrix row
   using its `## Verify` items, gathering evidence from git state (`git branch/log/rev-list`,
   `gh api`), file reads, and the built output. Reported per-row status with each gap named
   before touching anything.
2. **Owner go-ahead to complete** — codify the procedure, fix the gaps, write this report,
   "in as many phases as needed."
3. **Plan** → `notes/plans/2026-07-23-compliance-procedure-and-hardening.md` (decisions,
   breakdown, release shape, deferrals) on `feature/compliance-procedure-and-hardening`.
4. **Codified the modes** in `compliance.md`: `full` / `partial` / `last N days`, gate + posture preserved.
5. **Closed the gaps**: `.gitattributes`, `SECURITY.md`, `.github/dependabot.yml`,
   `pages.yml` hardened (per-job write + SHA-pinned actions), README badge block; pruned 14
   merged local branches.
6. **Verified**: `jekyll build` green; both new YAML files parse under Ruby's YAML loader.

## The audit result (per row)

**done (17):** git-workflow (core invariants — only branch-litter off), versioning,
ai-context, cross-project-sync, process-reports, checklists-are-contracts, docs-site (hub is
the exempt master), deployment, planning, legal-docs, coins, docs-lifecycle, research-capture,
working-rhythm, self-hosted-assets, maintenance-sweep, lifecycle-runbooks.

**partial (6) → addressed this release:** agent-tooling (no `.gitattributes`), supply-chain
(top-level write perms + un-pinned actions + no `SECURITY.md` + `main` unprotected),
repo-hygiene (no self-run link/tidy gate; 14 stale local branches), git-workflow (the same
branch litter), notes-system (no `adoption-manifest.md`), engineering-quality/testing (mostly
N-A for a content site).

**missing (2) → fixed:** badges (no README block), dependencies (no `dependabot.yml`).

**N-A (1):** mandate-ledger (no open multi-part owner directive), plus per-item N-A calls
noted below.

## What changed on disk (1.1.0)

`hub/standards/compliance.md` (modes) · `.gitattributes` · `SECURITY.md` ·
`.github/dependabot.yml` · `.github/workflows/pages.yml` (hardened) · `README.md` (badges) ·
`VERSION` 1.0.0→1.1.0 · changelog + session log + this report. 14 merged local branches deleted.

## Deferrals (documented, not chased)

- **`main` branch protection** — owner-call. Enabling it forces the PR-based release path and
  breaks the direct `merge --no-ff dev` PATCH flow the hub uses. Solo ceiling "noted, not chased".
- **CodeQL / SAST** — N-A: a Jekyll/Liquid/Markdown site has no analyzable code surface.
- **Signed releases / `.intoto`** — N-A: Pages deploy produces no release artifacts.
- **`adoption-manifest.md`** — N-A for the hub: it is the source of the standards, never adopts
  from itself. Flagged rather than fabricating a hollow manifest.
- **Self-run link/tidy CI gate** — the hub has no Node toolchain; a lightweight link-check CI is
  a candidate for a later PATCH, tracked in the plan. Not blocking.

## Friction / what was awkward

- Several standards are authored **node-facing** (coverage floors, Scorecard, signed releases)
  and read as gaps against a static content+hub site until you apply the N-A judgment. The audit
  would be crisper if `compliance.md` noted which rows are **kind-conditional** (built-app vs.
  static-site vs. hub-self). Candidate standards tweak.
- The supply-chain `## Verify` mixes must-haves (`SECURITY.md`, pinning) with owner-calls
  (branch protection) in one row, so the row can't be a clean `done` on a solo repo even when
  fully hardened. A "solo-config `done`" note would help the next auditor.

## Suggestions to the standards (hub-side, for a later pass — not applied here)

1. Add a **kind-conditional legend** to `compliance.md` (built-app / static-site / hub-self) so
   N-A rows are principled, not ad-hoc.
2. Let supply-chain's branch-protection item read `done (solo-config: protection deferred with
   reason)` so a fully-hardened solo repo isn't stuck at `partial` forever.

## Guardrail

A node never edits the hub, and the hub never edits a node to make it pass. This run was the
hub auditing **and hardening itself** on an explicit owner go-ahead — in-scope. No node clone in
`assets/references/` was touched; the audit reads them read-only.

## Addendum (same day, 1.2.0) — the "deferred" security items were mandatory, so they shipped

On re-reading `supply-chain-hardening.md`, the items this report listed as owner-call deferrals
were **not** optional — the standard makes branch protection + a full-CI required check
**mandatory**, with the release flow reconciling to PR-based. So under the owner's "complete
everything required" mandate they were closed in **1.2.0**, not left deferred:

- **CI gate** `ci.yml` (jekyll build + `scripts/check-links.mjs`) — the vendored zero-dep
  doc-link checker; caught + fixed 4 real dangling links in the hub standards on first run.
- **CodeQL** `codeql.yml` — JS SAST over `assets/js/`.
- **Branch protection on `main`** (solo config) + PR-based releases; `CLAUDE.md` reconciled.

Correction to this report's Deferrals list: only **signed releases / `.intoto`** (no release
artifacts on a Pages deploy) and the **`adoption-manifest.md`** (hub is the source, doesn't
self-adopt) remain genuine N-A. Branch protection / CodeQL / a self-run link gate are **done**.
Process note for the standard: the audit's own report template should distinguish *mandatory*
standard items (never "deferrable") from true N-A — a mandatory item can't be parked as an
owner-call. Logged as a suggestion for a later hub pass.
