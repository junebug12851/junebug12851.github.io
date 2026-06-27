# assets/references/

Read-only **single-branch clones of other repositories** (full history of `dev`,
*not* shallow), pulled in on demand so this hub can track what changed in my projects
and write about it on the blog.

**Nothing in here is committed** except this README — see the repo `.gitignore`.
These are external repositories; they are not part of fairyfox.io and must never
be added to its git history (that would nest repos and bloat the hub).

## How it's used

This is the *inbound* half of the cross-project model (full write-up:
`notes/reference/cross-project-sync.md`):

- **This hub → reads projects.** On request, an AI assistant clones (or
  fast-forwards) each project listed in `hub/registry.yml` into this folder,
  diffs it against what was last seen, and drafts a blog post about the changes.
- **Projects → read this hub.** The reverse direction is symmetric: each project
  keeps *its own* `assets/references/fairyfox.io` and fast-forwards this hub to
  refresh the shared standards in `hub/`.

Pulls happen **only on explicit AI request**, never automatically — that's what
keeps the two directions from triggering each other in a loop.

## Branch: track `dev`

Clones here track each project's **`dev`** branch — the latest work — so blog
round-ups can report the newest changes, not just what's been promoted to
`main`. (If a project has no `dev` branch, fall back to its default branch.)

## Typical commands (run from the repo root)

```sh
# First time — single-branch clone of a project's dev branch (full history, not shallow):
git -C assets/references clone --branch dev --single-branch \
    https://github.com/junebug12851/pokered-save-editor-2

# Later — refresh it (a clean fast-forward; dev is never force-pushed):
git -C assets/references/pokered-save-editor-2 fetch origin dev
git -C assets/references/pokered-save-editor-2 merge --ff-only origin/dev
```

> A leftover `--depth 1` shallow clone can't fast-forward (no merge base → `refusing
> to merge unrelated histories`); that is **not** a force-push — deepen it with
> `git fetch --unshallow` or delete and re-clone. Never `reset --hard` through it.
