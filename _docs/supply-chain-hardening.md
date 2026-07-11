---
title: Supply-chain hardening
nav_title: Supply-chain hardening
category: standards
order: 15
summary: Baseline GitHub-repo security hygiene every project ships — least-privilege workflows, pinned actions, branch protection, a SECURITY.md, and signed releases.
---

Every project ships the same baseline of repository security hygiene. These are generic,
project-agnostic measures — most of them repo configuration rather than application code —
that together close the common supply-chain gaps and raise a repository's
[OpenSSF Scorecard](https://securityscorecards.dev/). The canonical machine copy of this
standard is in the repository at `hub/standards/supply-chain-hardening.md`.

## The measures

- **Least-privilege workflows.** Every GitHub Actions workflow declares `permissions:
  contents: read` at the top level and elevates only in the individual job that genuinely
  needs write access.
- **Pinned actions.** Third-party actions are pinned to a full commit SHA, not a moving
  tag, so a compromised upstream tag cannot silently change what runs.
- **`SECURITY.md`.** A real, accurate disclosure policy — how to report a vulnerability,
  what is in scope, what response to expect.
- **Branch protection.** The stable branch is protected; releases land through a pull
  request rather than a direct push. This is what makes the PR-based release path in the
  [git workflow](/docs/git-workflow/) the canonical one.
- **Dependabot.** Enabled and pointed at the working branch, so update pull requests
  follow the branch model instead of piling onto the default branch.
- **Signed releases.** Release assets are signed (keyless Sigstore bundles), so a
  downloaded binary can be verified back to the workflow that built it.

## Why it is a shared standard

Every one of these was learned once, on one project, and would otherwise have to be
rediscovered on the next. Lifting them into the hub means a new repository inherits the
whole posture on day one, and an audit can check every node against the same list.
