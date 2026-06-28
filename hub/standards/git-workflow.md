# Standard: Git Workflow

Canonical, project-agnostic git standards. A project adopts this by copying it
(and following it); project-specific notes can link back here.

**Goal: a clean, faithful, low-risk history.** Prefer a dull, flat repo over a
clever, screwed-up one.

## The model: full git-flow — the model, not the scripts

The mesh runs **git-flow** (Vincent Driessen's branching model) **in full**, as far
as makes sense for each project — its branch roles, where work happens, and the
release/hotfix flows are the standard, not a stripped-down subset. What it does
**not** require is the `git flow` CLI extension or any wrapper scripts: plain `git`
commands carry the whole model. These are **procedures the AI working in the repo
upholds**, by judgement, not automation — standardize the *policy*, not a script.
Use the policies; skip the scripts.

This *replaces* the old lean `dev → main` fast-forward habit, which was only a
thin shadow of git-flow. git-flow is the fuller, sturdier starting point: adopt as
much of it as the project can meaningfully use.

## Branches

git-flow has **two long-lived branches** and **three kinds of short-lived support
branch**. All are first-class — the support branches are the normal way work flows,
not exceptions.

- **`main`** — production. Every commit on `main` is a **tagged release**, always by
  `--no-ff` merge. **Never commit directly.** It advances at a release — a **PATCH**
  goes **directly from `dev`**; a **MINOR/MAJOR** goes through a **`release/*`** branch
  (see "Cutting a release") — or by a **`hotfix/*`** merge. **The stable branch must be
  named `main`** — `master` is not used in the mesh (see below).
- **`dev`** — the **integration branch** (git-flow's `develop` role; we keep the
  shorter name `dev`). All finished work lands here first. This is the branch the
  hub and other projects track when syncing.
- **`feature/<name>`** — the **normal unit of work**. Branch from `dev`, build the
  feature, merge **back into `dev`** with `--no-ff`, then delete. Never branch a
  feature off `main`.
- **`release/<x.y.0>`** — the **release mechanism for a MINOR or MAJOR release**
  (a milestone). Branch from `dev` to bake the release (final polish, version bump,
  changelog), then merge **into `main`** + tag **and** back **into `dev`** (`--no-ff`
  both), then delete. **PATCH releases skip this** and go straight `dev → main`.
- **`hotfix/<x.y.z>`** — an **urgent production fix**. Branch from `main`, fix,
  then merge **into `main`** + tag **and** back **into `dev`** (`--no-ff` both),
  then delete.

Support-branch names use a **`type/` prefix** (`feature/`, `release/`, `hotfix/`)
plus a short kebab-case description.

## Developing a feature

```sh
git checkout dev
git checkout -b feature/<name>
# … commit work on the feature branch, push it to back it up …
git checkout dev
git merge --no-ff feature/<name>     # preserves the feature as one revertible unit
git branch -d feature/<name>
git push origin dev
```

The `--no-ff` merge commit keeps the feature's commits grouped under one parent, so
the feature is legible in history and revertible in one move
(`git revert -m 1 <merge>`).

## Cutting a release

**The release path is set by the SemVer level** (see the versioning standard) — this
is the compromise that keeps ceremony proportional to the change:

> **First check `release.yml`.** If the project's CI creates the version tag itself on
> the `main` push (a *tag-gated* release), do **not** hand-tag in the commands below —
> a hand-pushed tag makes the gated run find the tag already present and skip itself, a
> silent no-op release. In that case drop the `git tag`/`--tags` lines and just push
> `main`. Full rule: [Who creates the tag](#who-creates-the-tag--ci-vs-by-hand) below.
> The `git tag …` lines that follow are the **by-hand** path.

- **PATCH** (the default — fixes, docs, ordinary changes): release **directly**
  `dev → main`. No release branch — patches are frequent and low-stakes.

  ```sh
  git checkout main
  git merge --no-ff dev
  git tag -a vX.Y.Z -m "vX.Y.Z"        # tag matches VERSION
  git push origin main --tags
  git checkout dev
  ```

- **MINOR / MAJOR** (a milestone): go through a **`release/X.Y.0`** branch, so the
  milestone is a deliberate, reviewable event. (MAJOR → `1.0.0` etc. is the project
  owner's call only.)

  ```sh
  git checkout dev
  git checkout -b release/X.Y.0
  # … finalize: bump VERSION, finish the changelog entry, last polish …
  git checkout main
  git merge --no-ff release/X.Y.0
  git tag -a vX.Y.0 -m "vX.Y.0"         # tag matches VERSION
  git checkout dev
  git merge --no-ff release/X.Y.0       # carry the release finalizations back
  git branch -d release/X.Y.0
  git push origin main dev --tags
  ```

### Who creates the tag — CI vs. by hand

The commands above tag by hand. **But if the project's `release.yml` creates the
version tag itself** — derives `v<VERSION>` and tags on the `main` push, typically
gating the release on the tag not already existing — then **do not also tag by
hand.** The merge to `main` *is* the release act; CI applies the tag. A hand-pushed
tag will make the tag-gated workflow find the tag already present and **skip itself —
a silent no-op release.** Check `release.yml` before tagging:

- **CI owns tagging** → push `main` (and `dev`) **without** `git tag`/`--tags`; let the
  pipeline tag. Record this as a deliberate divergence from the hand-tag commands.
- **No tagging in CI** → tag by hand as shown above.

Either way the invariant holds: every commit on `main` ends up carrying its matching
`vX.Y.Z` tag — the question is only *which actor* applies it.

## Hotfixes

A production problem that can't wait for the next `dev` cycle is fixed on a branch
cut from `main`, then folded back into both lines:

```sh
git checkout main
git checkout -b hotfix/X.Y.Z
# … fix, bump VERSION (patch), changelog …
git checkout main
git merge --no-ff hotfix/X.Y.Z
git tag -a vX.Y.Z -m "vX.Y.Z"
git checkout dev
git merge --no-ff hotfix/X.Y.Z
git branch -d hotfix/X.Y.Z
git push origin main dev --tags
```

## Solo / small-project latitude

git-flow assumes a team; most mesh projects are solo and small, so one piece of
judgement applies *within* the model (not a lighter model): a genuinely **trivial**
change — a typo, a one-line doc fix — may be committed directly on `dev` rather than
via a `feature/*` branch. Anything that is really "a feature," or is large/risky,
still gets its own branch. (The release path is **not** latitude — it's fixed by the
SemVer level above.)

### `master → main` is mandatory

Every project in the mesh uses **`main`** as its stable branch. A project still on
**`master` must rename it to `main`** as part of adoption — this is required, not
optional. Do it the safe way (a rename, never a history rewrite):

```sh
git branch -m master main          # rename locally
git push -u origin main            # publish main
# On GitHub: Settings → Branches → set default branch to `main`,
#            then delete the old origin/master once nothing references it.
```

Then update the references that named the old branch: the **Pages source branch**,
any **CI/release workflow** `on: push` branch filters, and any `tree/master/…` URLs
(e.g. the registry's `notes:` link). GitHub keeps redirects for most links, but fix
the explicit references. The registry's `branch` field tracks the **work** branch
(`dev`) and is unaffected by this rename.

## Merging — `--no-ff`, never rewrite

git-flow merges with `--no-ff`: features back into `dev`, `release/`/`hotfix/`
branches into both `main` and `dev`, and a PATCH release `dev → main`, each create a
merge commit, so the grouping stays legible and revertible as a unit. **Every merge
into `main` is a tagged release** (a PATCH straight from `dev`, or a `release/`/
`hotfix/` branch). This is all **additive** — it never rewrites history. **Do not**
squash, rebase, or reorder anything already pushed; every original commit is
preserved through every merge.

## Pushing

Push early and often — don't leave work only on the local machine. Push feature
branches as you go (backup), `git push origin dev` when work lands, and push `main`
with `--tags` at a release after a green checkpoint ("green" = builds +
tests/checks pass).

## Commits

- One **logical, focused** change per commit.
- `type: summary` — `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `build:`,
  `chore:`, `content:`, `style:`. Short body when the *why* isn't obvious.
- **Changelog rides inside the commit** (see the versioning + notes-system
  standards): write the entry, stage it in the same commit. No separate
  "document the last commit" commits.
- **Keep `VERSION` current** as part of the release — bumped on `dev` for a PATCH,
  or on the `release/*`/`hotfix/*` branch for a milestone/hotfix; the release tag on
  `main` matches it.

## Hard safety rules

- **Never** `push --force` / force-with-lease / rewrite pushed history. (git-flow's
  `--no-ff` merge commits are additive and allowed — they are not a rewrite.)
- **Never** `reset --hard`, `rebase`, `clean -fd`, or delete a **long-lived** branch
  (`main`/`dev`) **without an explicit request.** Spent `feature/`/`release/`/
  `hotfix/` branches are deleted as the normal end of their merge.
- **Stage specific files**, never `git add -A`/`.`. Keep build artifacts and any
  `assets/references/` clones out (git-ignore them).
- Inspect `git status` before and after — every time.

## Verify (is it being followed?)

The check that catches a violation — run on request, report `done`/`partial`/`missing`
(the per-standard slice the [compliance audit](compliance.md) aggregates):

| Passes only when… | How to check |
|-------------------|--------------|
| Stable branch is **`main`**, not `master` | `git branch -a` |
| Every commit on `main` is a `--no-ff` **release merge** carrying a matching `vX.Y.Z` tag — no direct commits | `git log --first-parent --oneline main`; `git tag` |
| Pushed history is intact — no force-push / rebase / reset of published commits | history stable across fetches; no `--force` in reflog |
| Spent `feature/`/`release/`/`hotfix/` branches deleted; `main`/`dev` intact | `git branch -a` |
| Each release to `main` rode a green build/test checkpoint | release followed a green check |
