# Standard: Git Workflow

Canonical, project-agnostic git standards. A project adopts this by copying it
(and following it); project-specific notes can link back here.

**Goal: a clean, faithful, low-risk history.** Prefer a dull, flat repo over a
clever, screwed-up one.

## This is git-flow — the model, not the scripts

The mesh follows **git-flow** (Vincent Driessen's branching model) for its
*procedures and policies* — the branch roles, where work happens, and how
changes flow to a release. It does **not** require the `git flow` CLI extension
or any wrapper scripts: plain `git` commands are enough, and the model is adapted
freely to fit a small, solo, mostly-docs/site mesh. These are **procedures the AI
working in the repo upholds**, by judgement, not automation — standardize the
*policy*, not a script. Use the policies; skip the scripts.

In practice almost every project runs the **paper-thin core** below day to day,
and reaches for the **full git-flow branches** only when a change is large or
risky enough to warrant them.

## The core (everyday)

Two long-lived branches carry the everyday flow:

- **`dev`** — the **integration branch** (git-flow's `develop` role; we keep the
  shorter name `dev`). Commit **early and often.** This is the branch the hub and
  other projects track when syncing.
- **`main`** — **stable, releasable/deployable, pushed.** **Never commit
  directly.** It only advances at a **release**, by merging `dev` into it. **The
  stable branch must be named `main`** — `master` is not used in the mesh (see
  below).

Everyday loop: work and commit on `dev`, push often. When `dev` is at a good,
green checkpoint, **cut a release** to `main`:

```sh
git checkout main
git merge --no-ff dev          # release merge commit marks the release on main
git tag -a vX.Y.Z -m "vX.Y.Z"  # tag the release (matches VERSION)
git push origin main --tags
git checkout dev
```

The `--no-ff` merge keeps a visible release marker on `main` even when `dev` could
fast-forward; the **tag** is the durable release reference (it matches the repo's
`VERSION`). No squashing, rebasing, or reordering of pushed history — every
original `dev` commit is preserved.

> Small solo work does **not** need a feature branch — committing straight on
> `dev` is the expected default. Feature/release/hotfix branches are the
> *expansion* you add when a change earns the ceremony, not a per-change tax.

## The full git-flow branches (expansions, when warranted)

Layer these on top of the core when the situation calls for them. All merge back
with `--no-ff` so the grouping stays visible in history.

- **`feature/<name>`** — branch **from `dev`**, for a large or risky change you
  want to isolate. Merge **back into `dev`** with `--no-ff`, then delete the
  branch. Never branch a feature off `main`.
- **`release/<x.y.z>`** — branch **from `dev`** to stabilize a release (final
  polish, version bump, changelog) without freezing ongoing `dev` work. Merge
  **into `main`** (tag the release) **and back into `dev`**, then delete. For most
  small projects the core "merge `dev` → `main`" *is* the release and a dedicated
  `release/*` branch is unnecessary.
- **`hotfix/<x.y.z>`** — branch **from `main`** to fix something on a release
  without pulling in unreleased `dev` work. Merge **into `main`** (tag the new
  patch) **and back into `dev`**, then delete.

Branch names use a **`type/` prefix** (`feature/`, `release/`, `hotfix/`) and a
short kebab-case description.

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

git-flow merges with `--no-ff`: releases into `main` and support branches
(`feature/`, `release/`, `hotfix/`) back into their target all create a merge
commit, so the release/feature grouping stays legible. This is **additive** — it
never rewrites history. **Do not** squash, rebase, or reorder anything already
pushed; `dev`'s commits are preserved verbatim through every merge.

## Pushing

Push on every commit — early and often. `git push origin dev` after each commit;
release to `main` (`--no-ff` + tag + push `--tags`) after a green checkpoint
("green" = builds + tests/checks pass).

## Commits

- One **logical, focused** change per commit.
- `type: summary` — `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `build:`,
  `chore:`, `content:`, `style:`. Short body when the *why* isn't obvious.
- **Changelog rides inside the commit** (see the versioning + notes-system
  standards): write the entry, stage it in the same commit. No separate
  "document the last commit" commits.
- **Keep `VERSION` current in the same commit** when warranted; the release tag on
  `main` matches it.

## Hard safety rules

- **Never** `push --force` / force-with-lease / rewrite pushed history. (`--no-ff`
  merge commits are additive and allowed — they are not a rewrite.)
- **Never** `reset --hard`, `rebase`, `clean -fd`, or delete a long-lived branch
  **without an explicit request.** Spent `feature/`/`release/`/`hotfix/` branches
  are deleted as the normal end of their merge.
- **Stage specific files**, never `git add -A`/`.`. Keep build artifacts and any
  `assets/references/` clones out (git-ignore them).
- Inspect `git status` before and after — every time.
