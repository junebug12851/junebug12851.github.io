# Adopting Updates — bringing hub changes into a project

How a project that's already in the mesh **pulls and applies** later changes from
the hub: updated standards, structure, templates, specs, shared conventions — any
canonical artifact that lives in the hub and the project mirrors.

> Canonical, project-agnostic version (the one other repos copy). First-time
> bootstrap is a different procedure: [`new-project-setup.md`](new-project-setup.md).
> The model behind both: [`cross-project-sync.md`](cross-project-sync.md).

For AI or human. This flow is **outbound**: the project reads the hub. It is
**on explicit request only** — never scheduled, never auto-chained (that's what
prevents recursion across repos).

## The model in one line

**You re-read a read-only copy of the hub, diff what changed, and copy the
relevant pieces into the project by hand — then commit them locally.** Adopting a
standard is a *copy*, not a live link, so applying an update is always a
deliberate, reviewable edit.

## Checking for updates — what to do when asked

Treat the project as a **node that knows how to check the fairyfox system for
updates.** ("The fairyfox system" is the user's name for this hub mesh; the public
website calls it the *hub* — same thing.)

**What must be present to invoke this flow** — both parts:

1. **The word "fairyfox," naming the ecosystem** *(this is the gate)*. Normally
   the two words **"fairyfox system"**. The allowed variants are other
   *fairyfox*-prefixed references — "fairyfox.io", "fairyfox standards". The word
   *fairyfox* is mandatory.
2. **An update/sync intent** paired with it: *check for updates · what changed ·
   anything newer · sync · refresh · update from · pull the latest · get the
   newest version · adopt the latest.*

**Generic words do not count, and an update verb alone never does.** "Check for
updates" / "any updates?" / "are we current?" — with no *fairyfox* — is ambiguous
(the OS, dependencies, a file). And **"the hub", "the mesh", "the standards", "the
sync doc", a runbook name, or a bare "system"** do **not** qualify on their own:
they must carry the word *fairyfox* ("the fairyfox system", "fairyfox standards").
Read the update intent naturally, but the *fairyfox* reference has to actually be
there. If it isn't, don't assume this flow — ask, or treat it as the ordinary kind
of update it literally sounds like.

**The default is check-and-report, then stop:**

1. **Refresh** the read-only hub clone — step 1 below (with the re-clone
   fallback).
2. **Diff** what changed against what the project has adopted — step 2.
3. **Report** a short summary: what changed in the hub, which project files
   adopting it would touch, and a recommended action.
4. **Stop and wait.** Apply **nothing** yet.

Continue into applying (steps 3–5: apply by hand → record → commit) only when the
user clearly says to go ahead — again, in whatever words ("yeah do it", "adopt
it", "apply those"). Reporting changes nothing on disk; applying is always a
separate, confirmed act.

**Either way, write a process report.** Running this procedure — whether you applied
anything or only checked and reported — is a fairyfox system interaction, so it ends
with a process report in `notes/fairyfox-reports/` (step 4 below). A check-only run
still produces useful feedback: "I checked the fairyfox system for updates, here's
what I found and where the diff was painful." See the
[process-reports standard](process-reports.md).

**Why bounded this way (the integration that won't surprise you):** the node can
*discover and explain* updates on its own, but never *changes itself* without a
clear go-ahead. Combined with the anti-recursion rules below — on-request only,
read-only on the hub side, git-ignored clone — this gives real hub-awareness with
zero risk of an unprompted edit or a cross-repo loop.

## Steps

### 1. Refresh the read-only hub clone

```sh
git -C assets/references/fairyfox.io pull --depth 1 --ff-only origin dev
```

**If the `--ff-only` pull aborts** (the hub's `dev` was force-pushed / rewritten,
so the shallow clone can't fast-forward), don't fight it — **delete and re-clone
fresh**:

```sh
rm -rf assets/references/fairyfox.io
git -C assets/references clone --depth 1 --branch dev \
    https://github.com/junebug12851/junebug12851.github.io fairyfox.io
```

The clone is git-ignored, so re-pulling or re-cloning never produces a commit.

### 2. See what changed since you last adopted

Compare the refreshed hub copy against what the project currently mirrors, and
decide what's worth bringing over:

```sh
# example: how the project's git standard differs from the hub's now
diff -u notes/reference/git-workflow.md \
        assets/references/fairyfox.io/hub/standards/git-workflow.md
```

Skim the hub's recent changelog (`notes/version/`) to understand *why* something
changed before you adopt it.

### 3. Apply by hand, per category

Bring each kind of change into the project's own tree. Reconcile with any local
edits — the project's copy may legitimately diverge.

| What changed in the hub | Where it lands in the project | How to apply |
|-------------------------|-------------------------------|--------------|
| **Standard** (git, versioning, notes, sync, AI-context) | `notes/reference/<name>.md` | Merge the new guidance into the project's copy; keep project-specific deviations, note them. |
| **Structure** (notes skeleton, folder layout) | `notes/` tree | Add new files/sections; don't blow away existing content to match the skeleton. |
| **Spec / convention** (a shared rule or format) | wherever the project encodes it | Update the project's implementation and its doc to match the new spec. |
| **Template** (`CLAUDE.md`, `.gitignore`, `VERSION` format) | repo root | Port the meaningful change; never overwrite the project's filled-in identity. |
| **Design system** (the [docs-site standard](docs-site/) — tokens, layout, components, cross-linking, the bundled `reference/main.css`) | the project's themed docs site | Re-apply the *intent* to the project's stack; diff `docs-site/` (incl. `11-measurements-reference.md` + `reference/main.css`) and re-run the [compliance checklist](docs-site/08-compliance-checklist.md). |
| **Design / other shared asset** | the project's own design layer | Adopt the *intent*; the hub holds the convention, the project owns its rendering. |

Rule of thumb: **copy the change, not the file.** A blind file overwrite usually
clobbers project-specific work — diff, then hand-merge.

### 4. Record it in the project

Per the standing maintenance loop:

- Append a line to today's session log (`notes/sessions/YYYY-MM/YYYY-MM-DD.md`).
- Add the plain-English changelog entry to the top of
  `notes/version/YYYY-MM.md`, in the **same commit**.
- Bump `VERSION` if warranted (PATCH default, MINOR for a milestone, never MAJOR).
- Update `notes/status.md` if the adoption changed the project's state.
- **Write the process report** — a file in `notes/fairyfox-reports/`
  (`YYYY-MM-DD-adopting-updates.md`, from
  [`templates/fairyfox-report.md`](../templates/fairyfox-report.md)): what you
  adopted (or just checked), what was rough about the diff/apply, and any suggestion
  for the runbook or standard. This is how the hub learns to improve the procedure —
  [process-reports standard](process-reports.md). A **check-only** run writes one too.

### 5. Commit, push, fast-forward `main`

On `dev`, staging specific files:

```sh
git add notes <other-touched-files>      # incl. notes/fairyfox-reports/<report>; never -A; never assets/references/*
git commit -m "chore: adopt hub updates (<what>)"
git push origin dev

git checkout main && git merge --ff-only dev && git push origin main
git checkout dev
```

## When the project has diverged

If the project deliberately departs from a hub standard, **keep the divergence**
and write down *why* (a line in the project's copy of the standard, or its
`decisions/` notes). Adoption is not "match the hub exactly" — it's "take what
improves the project, on purpose." The hub is the source of truth for the shared
*default*, not a mandate.

## Verify

- `git status` is clean; `assets/references/` stayed untracked/ignored.
- The adopted change is present in the project's own tree (not just the
  reference clone).
- Changelog + session log + (if bumped) `VERSION` ride in the same commit.
- A **process report** for this run is in `notes/fairyfox-reports/` and committed
  (written even on a check-only run) — [process-reports standard](process-reports.md).
- If the project builds/serves, it builds green.

## Anti-recursion reminders

- Pulls are **manual / on request**, never scheduled to chain.
- The flow is **read-only on the hub side** — never push into the hub as part of
  adopting from it.
- Reference clones are **git-ignored** — refreshing one never creates a commit,
  so it can't trigger anything downstream.
- A standard becomes part of the project by **copy**, not a runtime dependency
  that re-resolves.
