# Project Notes — fairyfox.io

Living documentation for this repo. Written during work sessions so that anyone
picking it up — me later, or an AI opening the repo cold — can orient fast and
avoid re-learning things the hard way. The goal: **no knowledge trapped in one
person's head, and nothing lost between sessions.**

This file describes the **system** — where everything lives and how it's kept
current. Read [`status.md`](status.md) first for the actual current state.

> The notes system here is the same one my other projects use. Its canonical,
> project-agnostic definition (the version other repos copy) lives in
> [`../hub/standards/notes-system.md`](../hub/standards/notes-system.md). This
> folder is *this repo's* instance of it.

---

## How to find things

| Folder / File | What's in it |
|---------------|-------------|
| **[`status.md`](status.md)** | **Start here.** Current state only — what's live, what's in flight, what's next. No history. |
| [`sessions/`](sessions/README.md) | **The history.** One file per day in month folders (`YYYY-MM/YYYY-MM-DD.md`): what changed each session and why. |
| [`version.md`](version.md) | **The changelog** — plain-English, one entry per commit, newest first (index; months under `version/`). |
| `context/` | Background that changes rarely: [`project.md`](context/project.md) (what this is + goals), [`architecture.md`](context/architecture.md) (how the site is put together), [`principles.md`](context/principles.md) (what to do / avoid), [`design-direction.md`](context/design-direction.md) (UX study + working design notes). |
| `systems/` | **System map** — [`overview.md`](systems/overview.md): the site build, the blog, the hub, and the cross-project sync, and how they fit. |
| `reference/` | Quick lookup, no story: [`git-workflow.md`](reference/git-workflow.md), [`versioning.md`](reference/versioning.md), [`deployment.md`](reference/deployment.md) (Pages/Actions), [`documentation.md`](reference/documentation.md), [`cross-project-sync.md`](reference/cross-project-sync.md) (the pull-only model), [`blogging-workflow.md`](reference/blogging-workflow.md) (how update posts get written). |
| `decisions/` | Rationale: [`architecture.md`](decisions/architecture.md) (choices + why), [`rejected.md`](decisions/rejected.md) (things considered and not done). |
| `plans/` | What's next: [`next-steps.md`](plans/next-steps.md), [`implementation.md`](plans/implementation.md) (the v2 build plan), [`future.md`](plans/future.md). |
| [`fairyfox-reports/`](fairyfox-reports/README.md) | **Process reports** — the hub's own reports for each fairyfox system procedure it runs, and the home of the loop it reads from the siblings (`../hub/standards/process-reports.md`). |

> **`version.md` vs `reference/versioning.md`** — easy to confuse. `version.md`
> (+ `version/`) is the **changelog** (what changed). `reference/versioning.md`
> is the **version-number scheme** (SemVer, the `VERSION` file). One is the
> story; the other is the label.

---

## How the system is kept current (the maintenance loop)

The notes are a **living document** — updated as work happens, by default, not
on request. Each piece has one home and one trigger:

| When this happens | Write it here |
|-------------------|---------------|
| You did work worth recording this session | Append to today's `sessions/YYYY-MM/YYYY-MM-DD.md` (newest on top; create the file/month folder if first today) |
| You made a substantive commit | Its plain-English changelog entry rides **inside that commit**, at the top of `version/YYYY-MM.md` (see [`version.md`](version.md) → the inline rule) |
| What's live / in flight / next changed | Update [`status.md`](status.md) (keep it current-state only) |
| Made / declined a structural decision | [`decisions/architecture.md`](decisions/architecture.md) / [`decisions/rejected.md`](decisions/rejected.md) |
| A change warrants a new version | Bump the one line in repo-root `VERSION` in the **same commit** — PATCH default, MINOR for a milestone, never MAJOR (see [`reference/versioning.md`](reference/versioning.md)) |
| A reusable convention emerged that other projects should share | Promote it to [`../hub/standards/`](../hub/standards/) |

The structure is meant to **grow**. If something doesn't fit an existing file,
make a new one in the right folder rather than stuffing it somewhere wrong.
(The fuller, AI-facing version of this loop is in `../CLAUDE.md` → "Maintaining
the Notes".)

---

## How to write here

- **Direct.** These are notes, not marketing. Short is better. No cheerful
  intros/outros.
- **Code blocks for code. Tables for lookups.**
- **Date** when timing matters (`2026-06-22`); session files are named by date.
- **Bold the most important line** in a section so it's easy to spot.
- **Voice:** plain and matter-of-fact, from the project's perspective.
- **Cross-link** related files with relative links; don't restate another
  file's content.

---

## Folder structure

```
notes/
  README.md              ← this file (the system)
  status.md              ← current state only
  version.md             ← changelog index (plain-English, per commit)
  version/               ← changelog, one file per month (YYYY-MM.md)
  sessions/              ← the history, one file per day in month folders
    README.md            ← how the per-day log system works
    YYYY-MM/YYYY-MM-DD.md
  context/               ← background that changes rarely
    project.md  architecture.md  principles.md  design-direction.md
  systems/               ← the system map
    overview.md  README.md
  reference/             ← quick lookup, no story
    git-workflow.md  versioning.md  deployment.md  documentation.md
    cross-project-sync.md  blogging-workflow.md
  decisions/             ← rationale for choices
    architecture.md  rejected.md
  plans/                 ← what comes next
    next-steps.md  implementation.md  future.md
  fairyfox-reports/      ← process reports (this node's own runs; the loop the hub reads)
    README.md  YYYY-MM-DD-<procedure>.md
```
