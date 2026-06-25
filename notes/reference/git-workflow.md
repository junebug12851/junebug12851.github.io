# Git Workflow & Standards

The git standards for this repo. The overriding goal: a **clean, faithful,
low-risk** history — "a dull flat repo over a screwed-up one."

> This is this repo's copy of the shared standard. The canonical, project-
> agnostic version (the one other repos adopt) is
> [`../../hub/standards/git-workflow.md`](../../hub/standards/git-workflow.md).
> Keep them in step; promote changes up to the hub.

## Branches

- **`main`** — stable, deployable, **pushed**. Every push to `main` triggers the
  Pages deploy, so `main` must always build green. **Never commit directly to
  `main`.** It only moves by **fast-forward** to a good `dev` commit.
- **`dev`** — the development branch. Commit **early and often.** This is also the
  branch other repos and the hub track when they pull (see
  [`cross-project-sync.md`](cross-project-sync.md)).
- **No feature branches** for now (solo, early). Add one only to isolate a
  genuinely large/risky change, then FF/merge it back and delete it.
- **`main` is mandatory across the mesh** — `master` is not used. A project still on
  `master` renames it to `main` on adoption (a safe rename, not history surgery; fix
  the Pages/CI/`tree/master/…` references). This repo is already on `main`. Full
  procedure: the [git-workflow standard](../../hub/standards/git-workflow.md#master--main-is-mandatory).

## Merging — fast-forward only

Because we never commit on `main` directly, `dev` is always strictly ahead, so
`dev → main` is always a fast-forward:

```sh
git checkout main
git merge --ff-only dev      # linear, no merge commit, every dev commit preserved
git push origin main
git checkout dev
```

This gives a clean *linear* history **and** keeps every original commit — so we
do **not** squash, rebase, or reorder.

## Pushing

**Push on every commit**, early and often — don't leave work sitting only on the
local machine. `git push origin dev` after each commit; FF + push `main` after a
green checkpoint (here "green" = the site builds; once CI exists, also the Pages
build).

## Commit messages

- One **logical, focused** change per commit.
- Imperative, structured: `type: summary` — `feat:`, `fix:`, `content:`,
  `style:`, `docs:`, `build:`, `chore:`. Short body when the *why* isn't obvious.
- **The changelog rides inside the commit.** For a substantive change, add its
  plain-English entry to the top of `notes/version/YYYY-MM.md` and stage it in the
  **same commit** (no separate "update changelog" commit). See
  [`../version.md`](../version.md).
- **Keep `VERSION` current in the same commit** when a change warrants it — PATCH
  default, MINOR for a milestone, never MAJOR. See [`versioning.md`](versioning.md).

## Hard safety rules

- **Never** `push --force`, force-with-lease, or rewrite pushed history.
- **Never** `reset --hard`, `rebase`, `clean -fd`, or delete a branch **without an
  explicit request.**
- **Stage specific files**, never `git add -A`/`.` — keep build output
  (`_site/`, `.jekyll-cache/`) and the reference clones (`assets/references/*`)
  out (they're git-ignored anyway, but be deliberate).
- Inspect `git status` before, verify clean/expected after — every time.
