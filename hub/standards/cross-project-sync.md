# Standard: Cross-Project Sync

Canonical model for how a hub and its projects share standards and stay aware of
each other **without entanglement.**

## The one rule

**Communication is git-only, one-directional per flow, and happens only on
explicit request.** No submodules, no package dependency, no build-time coupling,
no webhooks, no cross-repo automation. Each side *reads* a shallow clone of the
other when a human or AI deliberately asks. Both flows track the **`dev`** branch
(latest work); fall back to a repo's default branch if it has no `dev`.

This keeps things modular and **prevents recursion**: nothing on one side
automatically triggers a pull on the other, so the repos can't set each other off
in a loop.

## Roles

- **Hub** — the repo that holds shared standards/templates (`hub/`) and a project
  `registry.yml`. It also *reads* projects to track changes / blog about them.
- **Project** — any repo that adopts the hub's standards.

## The two flows

### 1. Hub reads projects (inbound)

The hub keeps read-only shallow clones under `assets/references/<project>/`
(git-ignored, never committed):

```sh
git -C assets/references clone --depth 1 --branch dev <project-url>      # first time
git -C assets/references/<project> pull --depth 1 --ff-only origin dev   # refresh
```

What the hub reads out of these clones: the project's history (for blog round-ups)
**and** its `notes/fairyfox-reports/` — the [process reports](process-reports.md) a
node writes after running a system procedure, which the hub reviews to improve the
standards. Both reuse this one read-only inbound flow; neither adds a connection
between the repos.

### 2. Project reads the hub (outbound)

The project keeps a read-only shallow clone of the hub under its own
`assets/references/<hub>/` and **copies** what it needs out of `hub/standards/`
and `hub/templates/` into its own tree, committing *that*:

```sh
git -C assets/references clone --depth 1 --branch dev <hub-url> <hub-name>   # first time
git -C assets/references/<hub-name> pull --depth 1 --ff-only origin dev      # refresh
```

Adopting a standard is a **copy committed locally**, not a live link — re-pull
later and merge changes by hand.

## Anti-recursion checklist

- ✅ Pulls are manual / on request — never scheduled to chain across repos.
- ✅ Each flow is read-only on the far side — sync never pushes into the other repo.
- ✅ Reference clones are git-ignored — a pull produces no commit, so it triggers
  nothing downstream.
- ✅ Adoption is a copy, not a runtime dependency.

## Why `assets/references/`, not submodules

Submodules pin a commit and couple repos at clone/build time — the opposite of the
goal. A throwaway shallow clone in a git-ignored folder gives the content to read
with zero coupling and zero history weight.
