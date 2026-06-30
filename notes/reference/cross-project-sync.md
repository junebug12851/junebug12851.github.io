# Cross-Project Sync — the pull-only model

How this hub and my projects share standards and stay aware of each other,
**without ever being entangled.**

> Canonical, project-agnostic version (the one other repos copy):
> [`../../hub/standards/cross-project-sync.md`](../../hub/standards/cross-project-sync.md).
> This file is the fairyfox.io-side view.

## The one rule

**Communication is git-only, one-directional per flow, and happens only on
explicit request.** No submodules, no package dependency, no build-time coupling,
no webhooks, no automation that reaches across repos. Each side simply *reads* a
clone of the other when a human or AI deliberately asks it to.

This is what keeps things modular and simple — and what prevents recursion: since
nothing here automatically triggers a pull over there (or vice-versa), the two
repos can never set each other off in a loop.

## The two flows

Both track the **`dev`** branch (latest work).

### 1. Hub reads projects (inbound — for blogging + awareness)

The hub keeps read-only, single-branch clones of each registered project under
`assets/references/<project>/` (git-ignored — never committed).

```sh
# first time
git -C assets/references clone --branch dev --single-branch \
    https://github.com/junebug12851/<project>

# refresh — always a clean fast-forward (dev is never force-pushed)
git -C assets/references/<project> fetch origin dev
git -C assets/references/<project> merge --ff-only origin/dev
```

What the hub does with them: diff against what was last seen and write a blog
round-up of the changes — see [`blogging-workflow.md`](blogging-workflow.md) — **and**
read each project's `notes/fairyfox-reports/` to review the [process reports](../../hub/standards/process-reports.md)
nodes write after running a system procedure, folding that feedback into the shared
standards. Both reuse this same read-only inbound clone; neither adds coupling.

### 2. Projects read the hub (outbound — to adopt shared standards)

Each project keeps its own read-only, single-branch clone of this hub under *its*
`assets/references/fairyfox.io/` and refreshes it to pull the shared standards in
`hub/`:

```sh
# inside some-project, first time
git -C assets/references clone --branch dev --single-branch \
    https://github.com/junebug12851/junebug12851.github.io fairyfox.io

# refresh — always a clean fast-forward (dev is never force-pushed)
git -C assets/references/fairyfox.io fetch origin dev
git -C assets/references/fairyfox.io merge --ff-only origin/dev
```

If a refresh ever *won't* fast-forward, the git-ignored mirror is disposable — just
delete and re-clone it. Don't `reset --hard` through it — `dev` is append-only and a
genuine non-fast-forward would be an anomaly to investigate. Full detail:
[`adopting-updates`'s mirror-refresh step](../../hub/standards/adopting-updates.md).

The project then copies what it needs out of `hub/standards/` and
`hub/templates/` into its own tree (and commits *that* — the standard becomes
part of the project, it isn't a live link).

## Anti-recursion checklist

- ✅ Pulls are **manual / on AI request**, never scheduled to chain.
- ✅ Each flow is **read-only** on the far side — you never push into the other
  repo as part of sync.
- ✅ Reference clones are **git-ignored** — pulling one never produces a commit,
  so it can't trigger anything downstream.
- ✅ Adopting a standard is a **copy**, committed locally — not a runtime
  dependency that re-resolves.

## Why `assets/references/` and not submodules

Submodules pin a commit and couple the repos at clone/build time — the opposite
of what we want. A throwaway single-branch clone in a git-ignored folder gives us the
content to read with **zero** coupling and negligible history weight.
