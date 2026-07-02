# Plan — adopt RAP's proposed standards mesh-wide (2026-07-02)

Fold Random AI Prompt's six undigested `notes/fairyfox-reports/` proposals (plus the
README badge set) into the hub as mandatory shared standards. Owner go-ahead given in
the live session; two scope calls decided by the owner: **branch protection mandatory
for all repos**, **legal-docs mandatory for all repos**.

Source: the six RAP reports + the automated inbound briefing
(`notes/fairyfox-reports/inbound/INBOX-2026-07-02-0202.md`) that synthesized the same
themes. Release shape: **MINOR** (a batch of new standards is a milestone) →
`0.11.2 → 0.12.0`, via a `release/0.12.0` branch.

## Decisions

- Branch protection on `main` is **mandatory** for every node (solo config: require
  PR, 0 approvals, strict checks, enforce-admins, block force-push/deletion, linear
  history off). The release flow becomes **PR-based** as the canonical path; the local
  `git push origin main` path is retained only for a node that has not yet enabled
  protection.
- Legal docs (Privacy/Terms/Cookies) are **mandatory for all repos**. A repo with no
  user-facing surface ships the minimal truthful version rather than skipping.
- Everything else adopted as written, mandatory.

## Work breakdown (by file)

New standards (`hub/standards/`):
- `git-workflow.md` — **fix** the back-merge defect (dev must contain main after every
  release) + never-commit-on-main reinforcement + feature-branches-unCI'd note + a
  PR-based release path for branch-protected repos. Update `## Verify`.
- `supply-chain-hardening.md` — **new**: least-privilege permissions, SHA-pinned
  Actions, `SECURITY.md`, signed releases, mandatory branch protection, solo ceiling
  note, badge-lag note. `## Verify`.
- `dependencies.md` — **new**: upgrade aggressively, Dependabot→dev, local test gate,
  fix-don't-pin, bump on artifact change. `## Verify`.
- `legal-docs.md` — **new**: self-hosted, code-accurate, kept current. `## Verify`.
- `agent-tooling.md` — **new**: no bash sandbox, PowerShell + file tools, execute
  don't hand off, the PowerShell/.NET gotchas. `## Verify`.
- `badges.md` — **new**: the canonical shields.io set + per-project applicability.
  `## Verify`.
- `process-reports.md` — **edit**: name the canonical node→hub proposal report shape.

New templates (`hub/templates/`):
- `project.gitattributes`, `branch-sync.yml`, `SECURITY.md`, `dependabot.yml`,
  `README-badges.md`, `legal/{privacy,terms,cookies}.html`.

Establishment / wiring:
- `compliance.md` — a matrix row per new standard.
- `templates/CLAUDE.md` — agent-tooling + badges + legal + gitattributes hooks;
  Default-Workflow release wording gains the mandatory dev-contains-main back-merge.
- `new-project-setup.md` / `onboarding-existing-project.md` / `adopting-updates.md` —
  copy the new templates; PR-based release + branch-protection setup.
- `templates/README.md` + `hub/README.md` — list the new templates/standards.

Release:
- Build-check (`jekyll build`), bump `VERSION`, changelog atop
  `notes/version/2026-07.md`, session log, `notes/status.md`, a fairyfox process report
  (`notes/fairyfox-reports/2026-07-02-fold-rap-proposals.md`), advance RAP's
  `reports_through` in `hub/.last-seen.yml`. Then `release/0.12.0 → main`.

## Out of scope (this pass)

- Theme 4 (fairyfox-games setup shallow-mirror + hub_version anchor gap) — a different
  node's report; not part of the RAP request. Left for a later pass.
- Actually enabling branch protection on each node's GitHub repo — a node-side action
  the owner takes during adoption, not a hub edit.

## Open items

- The read-only RAP mirror is at `2ed5787`; the inbound briefing notes RAP has since
  advanced to `87272e7` (adds its own `SECURITY.md`). Working from the cloned state is
  fine — the standards are authored from the reports, not re-derived from live HEAD.
