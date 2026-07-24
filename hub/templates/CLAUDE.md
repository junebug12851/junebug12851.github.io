# <PROJECT NAME> — AI Context

<One-line description. What it is, who builds it, current state.>
Built by Fairy Fox (github.com/1fairyfox).

## Start Here

Read `notes/status.md` first — current state, what's in flight, what to do next.

The full notes system is in `notes/` (see `notes/README.md` for the map). It
follows the shared living-notes standard. Highlights:

| File | What's in it |
|------|-------------|
| `notes/status.md` | **Current state** — start here |
| `notes/sessions/` | Per-day session logs (`YYYY-MM/YYYY-MM-DD.md`, newest on top) |
| `notes/version.md` | Changelog index (plain-English, per commit; months under `version/`) |
| `notes/context/` | `project.md` · `architecture.md` · `principles.md` |
| `notes/systems/overview.md` | The system map |
| `notes/reference/` | Quick lookups (git-workflow, versioning, …) |
| `notes/decisions/` | `architecture.md` (choices) · `rejected.md` (don't repeat) |
| `notes/plans/` | `next-steps.md` · `future.md` |

## Critical Things Not to Get Wrong

- <Project-specific landmine #1 — the stuff that has bitten before.>
- <Landmine #2.>

## Build / Run

> State capabilities honestly: which shell/tools the assistant actually has, and
> that it CAN build/test/run/commit. Don't claim a limitation that isn't real.

- **Tooling (mesh rule):** use **PowerShell** (the `Windows-MCP` PowerShell tool) + the
  file tools (Read/Edit/Write/Glob/Grep). **Never the Cowork bash sandbox** — it is
  broken on this environment (stale/truncated reads, `.git` unlink failures, CRLF
  mangling). And **execute** verify/commit/release directly; don't hand the user a
  script. Full rule: the shared `agent-tooling` standard.
- **Docker (mesh rule):** use **Docker locally whenever it helps** — build, test, and
  setup/install/run — **especially for anything Linux-only.** Run the Linux build/test in a
  container **on the desktop first**; CI is the backstop gate, not where you go to find out if
  Linux passes. If the Docker path breaks, **fix it — don't write it off** and fall back to
  CI-only. Full rule: the shared `docker` standard.
- <How to build.>
- <How to test.>
- <How to run.>

## Default Workflow — Do These By Default (a standing instruction)

**Plan before you execute — and break the work into as many phases as it needs.** For
non-trivial work (multiple files/steps, a real decision), write a short structured plan
**first** — decisions, work breakdown by file/area, open items, release shape — in
`notes/plans/`, then execute against it. **Decompose any non-trivial request into phases
across three levels — research · planning · implementation — with as many phases as the work
needs, by default:**

- **Research** is a real phase, not a formality — understand before building. Go to the
  primary source **locally (the real code) and online (upstream docs/spec)** as the question
  needs; **don't skip or rush it**, and land what you learn in `notes/` the same session.
- **Plan as often as needed** — re-plan whenever a phase changes the shape. Planning is
  **primarily for you (the executor)**: it keeps a long, multi-part change coherent.
- **Implement in coherent, shippable phases**, each one built/tested/previewed and leaving
  the tree working — not one big-bang push. Err toward more, smaller phases.

This is for execution reliability, not paperwork; trivial one-step changes are exempt.
Full rule: the shared `planning` standard (in `hub/standards/`).

Then, after making changes, run this loop **without being asked**:

1. **Build / check** the change.
2. **Test** the affected area; full suite/check before releasing to `main`. Only
   proceed on green. **Before a release, read `notes/reference/adoption-manifest.md`:**
   an overdue `gap` row on a *mandatory* standard (supply-chain-hardening, git-workflow,
   testing, ship-contract) **holds the release** the same way a red build does.
3. **Commit + push on `dev`**, staging specific files (never `git add -A`). The
   **changelog entry rides inside the commit** (top of `notes/version/YYYY-MM.md`,
   no hash marker), and **bump `VERSION`** in the same commit when warranted
   (PATCH default, MINOR milestone, never MAJOR).
4. When green, **release `dev → main` the git-flow way** — `main` advances only by a
   `--no-ff`, **tagged** merge, never a fast-forward or a direct commit. A **PATCH**
   (the default) releases **directly**:
   `git checkout main && git merge --no-ff dev && git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin main --tags && git checkout dev`.
   **Then back-merge — `dev` must contain `main`:** `git merge --ff-only main && git push origin dev`
   (skip this and `dev` drifts a commit behind `main` every release). A **MINOR/MAJOR**
   milestone goes through a `release/*` branch, an urgent production fix through a
   `hotfix/*` branch — see the `git-workflow` standard. **If `main` is branch-protected**
   (the `supply-chain-hardening` standard makes it mandatory), the direct push is
   blocked — release via a PR instead (`gh pr create --base main` → `gh pr checks --watch`
   → `gh pr merge --merge` → back-merge `dev`).

**Hard safety rules:** never `push --force` / rewrite pushed history; never
`reset --hard` / `rebase` / `clean -fd` / delete a branch without an explicit
request. Inspect `git status` before and after. Full rules: the shared
`git-workflow` standard (pulled into `notes/reference/git-workflow.md`).

## Checklists Are Contracts (a standing instruction)

The mesh's anti-drift rule — full standard: `checklists-are-contracts` (in
`hub/standards/`). When work touches a standard's `## Verify` table, a runbook, a
docs-site module, or any checklist:

- **Enumerate every item** in the plan — mechanically, the *full* table, never
  "the important ones", never a table-level summary row. Copying a standard in is
  `copied-only`, **not** adoption; only a recorded Verify pass makes it adopted.
- **Record each item's outcome individually** — pass / fixed / N-A-with-reason /
  gap-with-due — **before** any done-mark exists. **Never compress a list into a single
  done-mark**; a bare `✅` over a multi-item set is banned — link the record
  (`notes/reference/adoption-manifest.md`, an audit, the Verify results).
- **Read optional items ambitiously** ("include the ones that exist", "recommended",
  "where possible" → *build the thing*); descope only explicitly, never by silent
  omission — a silent omission is a `gap`, not a pass.
- **Deferral requires falsification:** no `⏳`/`⛔` without an attempt log (command,
  error, version) + a retest trigger. Probe a "can't" for a bounded hour before parking it.
- **End every pass with a disclosed not-done list** — "NOT done / read leniently / needs
  your eyes" — volunteered, never extracted by challenge.

## Owner Mandates Become Ledgers (a standing instruction)

A multi-part owner request is a checklist too — full standard: `mandate-ledger`. Transcribe
a multi-clause directive **verbatim** into `notes/plans/<date>-mandate.md`, one row per
clause (quote · interpretation · `done`/`blocked-with-evidence`/`awaiting-owner`).
Completion claims cite rows, not a paraphrase. A repeated mandate escalates every
`awaiting-owner` row to do-now; a second repetition of the same item is itself a reportable
process failure. A release may ship mid-mandate, but the claim states "mandate rows
remaining: N" — a green release never implies the mandate is done.

## Maintaining the Notes — Your Responsibility

The notes are a living document — keep them current as you work, by default.

| Trigger | Action |
|---------|--------|
| Did work worth recording this session | Append to today's `notes/sessions/YYYY-MM/YYYY-MM-DD.md` |
| Made a substantive commit | Inline changelog entry atop `notes/version/YYYY-MM.md`, same commit |
| Health / next changed | Update `notes/status.md` |
| Made / rejected a decision | `notes/decisions/architecture.md` / `rejected.md` |
| A change warrants a version | Bump `VERSION`, same commit |
| Data practices / third-party deps changed | Update the self-hosted legal pages + "Last updated" date, same change (`legal-docs` standard) |

## Cross-project standards & checking the fairyfox system for updates

This project is a **node in the fairyfox system** (the hub mesh): it pulls shared
standards from the system on request — see `notes/reference/cross-project-sync.md`.

**When the user asks you to check *the fairyfox system* for updates** — to sync the
standards, get the latest version, or pull a particular standard/runbook — treat it
as the check-for-updates flow. **To invoke it the request must carry the word
"fairyfox"** — normally **"the fairyfox system"**, or a *fairyfox*-prefixed variant
("fairyfox.io", "fairyfox standards") — *paired with* an update/sync intent (check
for updates · what changed · sync · refresh · pull the latest · get the newest).
Generic handles — "the hub", "the mesh", "the standards", a runbook name, a bare
"system", or an update verb alone — do **not** qualify; the word *fairyfox* must be
present, or don't assume this flow.

The default is **check, report, then wait**: refresh the read-only system clone
under `assets/references/`, diff it against what this project has adopted, and
**report what changed + what adopting it would touch — then stop.** Apply nothing
until the user clearly says go ahead; applying is a separate, confirmed act. Full
procedure: the shared `adopting-updates` runbook (in `hub/standards/`).

**Exception — pre-authorized changes.** The system keeps an express-authorization
ledger (`hub/authorizations.yml`). If an active entry there `covers` the change
you're adopting, the user **already gave the go-ahead at the system** — apply it
directly, skipping the "wait" pause. Skip *only* that redundant pause: still
reconcile (don't clobber local divergence — re-prompt if you would), still write
the process report, still commit as a reviewable act, and still run **full
verification before *and* after** — build/tests, the standards `## Verify` /
compliance checks, and the project's own constraints. If verification can't be
completed, **do not auto-apply** — fall back to check-report-wait. Nothing in the
ledger covers it → fall back to check-report-wait.

**Adopting hub standards/templates is the default.** A standing ledger grant
(`adopt-standards-by-default`) covers **all** of `hub/standards/` and `hub/templates/`,
so pending standard/template changes are pre-authorized: when you run the fairyfox flow,
**adopt them by default** — report *and apply* — rather than reporting and waiting. This
changes nothing about anti-recursion (adoption still happens only when the flow runs; no
auto-pull, no scheduling) and nothing about the safety floor (reconcile-not-clobber,
divergence re-prompt, process report, full verification before and after) — it removes
only the redundant "wait for go-ahead" pause.

**After running any fairyfox system procedure, write a process report.** Every such
run — setup, onboarding, adopting updates, or just checking for updates — ends with a
short, honest report in `notes/fairyfox-reports/YYYY-MM-DD-<procedure>.md` (from
`hub/templates/fairyfox-report.md`): what was done, what was rough, and suggestions
to improve the procedure. It's the node's only way to feed real experience back; the
hub reads these reports to improve the system. A check-only run writes one too. Full
rule: the shared `process-reports` standard (in `hub/standards/`).

**Guardrails (don't break these):** on-request only — never auto-pull or schedule
cross-repo syncs (anti-recursion); the reference clone is read-only and
git-ignored (the authorization ledger included — reading it lets you skip a
prompt, it never lets the system act on this repo); never apply changes or rewrite
history without an explicit go-ahead (an active `authorizations.yml` entry that
covers the change *is* that go-ahead, given at the system); reconcile with local
edits, don't clobber them.

> Naming: the user calls it **the fairyfox system** in conversation; the public
> website calls it the **hub**. Both name the same fairyfox.io mesh.
