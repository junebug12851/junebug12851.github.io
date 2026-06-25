# Git Workflow & Standards

The git standards for this repo. The overriding goal: a **clean, faithful,
low-risk** history — "a dull flat repo over a screwed-up one."

> This is this repo's copy of the shared standard. The canonical, project-
> agnostic version (the one other repos adopt) is
> [`../../hub/standards/git-workflow.md`](../../hub/standards/git-workflow.md).
> Keep them in step; promote changes up to the hub.

## This is git-flow — the model, not the scripts

The workflow follows **git-flow** (Driessen's branching model) for its
*procedures and policies* — branch roles, where work happens, how changes reach a
release. It does **not** use the `git flow` CLI extension or wrapper scripts:
plain `git` is enough, and the model is adapted freely for a small, solo,
mostly-site/docs repo. These are **procedures the AI working in the repo upholds**
by judgement, not automation — standardize the *policy*, not a script. Use the
policies, skip the scripts. Day to day this repo runs the **paper-thin core**
below; the **full git-flow branches** are there for when a change warrants them.

## The core (everyday)

- **`main`** — stable, deployable, **pushed**. Every push to `main` triggers the
  Pages deploy, so `main` must always build green. **Never commit directly to
  `main`.** It advances only at a **release**, by merging `dev` into it.
- **`dev`** — the **integration branch** (git-flow's `develop` role; we keep the
  shorter name `dev`). Commit **early and often.** This is also the branch other
  repos and the hub track when they pull (see
  [`cross-project-sync.md`](cross-project-sync.md)).
- **`main` is mandatory across the mesh** — `master` is not used. A project still on
  `master` renames it to `main` on adoption (a safe rename, not history surgery; fix
  the Pages/CI/`tree/master/…` references). This repo is already on `main`. Full
  procedure: the [git-workflow standard](../../hub/standards/git-workflow.md#master--main-is-mandatory).

Everyday loop: work and commit on `dev`, push often. At a good green checkpoint,
**cut a release** to `main`:

```sh
git checkout main
git merge --no-ff dev          # release merge commit marks the release on main
git tag -a vX.Y.Z -m "vX.Y.Z"  # tag the release (matches VERSION)
git push origin main --tags
git checkout dev
```

The `--no-ff` merge leaves a visible release marker on `main`; the **tag** is the
durable release reference (it matches `VERSION`). Every original `dev` commit is
preserved — we do **not** squash, rebase, or reorder.

> Small solo work does **not** need a feature branch — committing straight on
> `dev` is the expected default. The branches below are the *expansion*, not a
> per-change tax.

## The full git-flow branches (expansions, when warranted)

Layered on top of the core when a change earns the ceremony; all merge back with
`--no-ff` so the grouping stays visible.

- **`feature/<name>`** — from `dev`, to isolate a large/risky change. Merge back
  into `dev` (`--no-ff`), then delete. Never branch a feature off `main`.
- **`release/<x.y.z>`** — from `dev`, to stabilize a release without freezing `dev`.
  Merge into `main` (tag) **and** back into `dev`, then delete. For this repo the
  core "merge `dev` → `main`" usually *is* the release; a `release/*` branch is
  rarely needed.
- **`hotfix/<x.y.z>`** — from `main`, to patch a release without pulling in
  unreleased `dev` work. Merge into `main` (tag) **and** back into `dev`, then
  delete.

Branch names use a `type/` prefix (`feature/`, `release/`, `hotfix/`) + a short
kebab-case description.

## Merging — `--no-ff`, never rewrite

git-flow merges with `--no-ff`: releases into `main` and support branches back
into their target each create a merge commit, so the grouping is legible. This is
**additive** — never a history rewrite. We do **not** squash, rebase, or reorder
anything pushed.

## Pushing

**Push on every commit**, early and often — don't leave work sitting only on the
local machine. `git push origin dev` after each commit; release to `main`
(`--no-ff` + tag + push `--tags`) after a green checkpoint (here "green" = the
site builds; the Pages build is the deploy).

## Commit messages

- One **logical, focused** change per commit.
- Imperative, structured: `type: summary` — `feat:`, `fix:`, `content:`,
  `style:`, `docs:`, `build:`, `chore:`. Short body when the *why* isn't obvious.
- **The changelog rides inside the commit.** For a substantive change, add its
  plain-English entry to the top of `notes/version/YYYY-MM.md` and stage it in the
  **same commit** (no separate "update changelog" commit). See
  [`../version.md`](../version.md).
- **Keep `VERSION` current in the same commit** when a change warrants it — PATCH
  default, MINOR milestone, never MAJOR. The release tag on `main` matches it. See
  [`versioning.md`](versioning.md).

## Hard safety rules

- **Never** `push --force`, force-with-lease, or rewrite pushed history. (`--no-ff`
  merge commits are additive and allowed — not a rewrite.)
- **Never** `reset --hard`, `rebase`, `clean -fd`, or delete a long-lived branch
  **without an explicit request.** Spent `feature/`/`release/`/`hotfix/` branches
  are deleted as the normal end of their merge.
- **Stage specific files**, never `git add -A`/`.` — keep build output
  (`_site/`, `.jekyll-cache/`) and the reference clones (`assets/references/*`)
  out (they're git-ignored anyway, but be deliberate).
- Inspect `git status` before, verify clean/expected after — every time.
