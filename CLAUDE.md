# fairyfox.io — AI Context

Project hub, **documentation library**, and home page for Fairy Fox's software work
(github.com/junebug12851). A clean, custom Jekyll site deployed to GitHub Pages by
GitHub Actions, plus the shared standards/templates that tie the repositories
together. Served at `junebug12851.github.io` and the `fairyfox.io` custom domain.

**Voice:** the site is written in a neutral, professional documentation voice —
not first-person-as-Fairy-Fox, and not glorifying. Refer to Fairy Fox by name for
attribution only; never multi-line third-person praise. No fox/fairy puns, no
forced-casual tone. See `notes/context/principles.md`.

## Start Here

Read `notes/status.md` first — current state, what's in flight, what's next.

The full notes system is in `notes/` (map: `notes/README.md`). Quick index:

| File | What's in it |
|------|-------------|
| `notes/status.md` | **Current state** — start here |
| `notes/sessions/` | Per-day session logs (`YYYY-MM/YYYY-MM-DD.md`, newest on top) |
| `notes/version.md` | Changelog (plain-English, per commit; months under `version/`) |
| `notes/context/` | `project.md` · `architecture.md` · `principles.md` |
| `notes/systems/overview.md` | The system map (site · blog · hub · sync) |
| `notes/reference/` | `git-workflow` · `versioning` · `deployment` · `documentation` · `cross-project-sync` · `blogging-workflow` |
| `notes/decisions/` | `architecture.md` (choices) · `rejected.md` (don't repeat) |
| `notes/plans/` | `next-steps.md` · `future.md` |
| `hub/` | The cross-project standards, templates, and project registry |

## Critical Things Not to Get Wrong

- **Use PowerShell + the editor tools, NOT the bash/sandbox.** The Cowork bash
  sandbox is unreliable here (stale/truncated reads, can corrupt data). All shell
  work goes through PowerShell on the real Windows machine; file work through
  Read/Write/Edit.
- **Never commit `assets/references/*`** — those are read-only shallow clones of
  OTHER repos (git-ignored). Committing them nests repos and bloats history.
- **`notes/`, `hub/`, and `assets/references/` are excluded from the site** in
  `_config.yml`. If you add a top-level folder that shouldn't publish, exclude it.
- **One source of truth per fact:** version → `VERSION`; project list →
  `_data/projects.yml` (+ `hub/registry.yml`); shared standards → `hub/`. Don't
  duplicate; link.
- **Don't bump MAJOR** (`→ 1.0.0`) — Fairy Fox's call only.
- **Cross-project pulls are on-request only, never auto-chained** (anti-recursion;
  see `notes/reference/cross-project-sync.md`).

## Build / Run

You CAN build, run, commit, and push — via **PowerShell** on the local machine
(git + the `gh` CLI are installed and authed as `junebug12851`; Ruby/Jekyll are
installed locally for build checks). CI builds regardless of the local setup.

```sh
bundle install
bundle exec jekyll serve     # local preview at http://127.0.0.1:4000
JEKYLL_ENV=production bundle exec jekyll build   # production-equivalent build
```

Deploy is automatic: every push to `main` runs `.github/workflows/pages.yml`
(Bundler + Jekyll → Pages). See `notes/reference/deployment.md`.

## Default Workflow — Do These By Default (a standing instruction)

After making changes, without being asked:

1. **Build-check** the site (`jekyll build`); fix any errors before shipping.
2. **Work on `dev`** — or a `feature/<name>` branch off `dev` for an actual feature,
   merged back `--no-ff` (a trivial fix may commit straight on `dev`). Stage specific
   files (never `git add -A`). The **changelog entry rides inside the commit** (top of
   `notes/version/YYYY-MM.md`, no hash marker); **bump `VERSION`** as part of the
   release (PATCH default, MINOR milestone, never MAJOR).
3. When the build is green, **release to `main` the git-flow way** — path set by the
   SemVer level (full flow: `hub/standards/git-workflow.md`). A **PATCH** releases
   **directly** `dev → main`:
   `git checkout main && git merge --no-ff dev && git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin main --tags && git checkout dev`
   A **MINOR/MAJOR** goes through a `release/<x.y.0>` branch off `dev` (merge `--no-ff`
   into `main`, tag, merge back into `dev`). Tag matches `VERSION`; pushing `main`
   triggers the Pages deploy; `--no-ff` merge commits are additive, **not** a rewrite.

**Hard safety rules:** never `push --force` / rewrite pushed history; never
`reset --hard` / `rebase` / `clean -fd` / delete a branch without an explicit
request. Inspect `git status` before and after. Full rules:
`notes/reference/git-workflow.md`.

## Maintaining the Notes — Your Responsibility

The notes are a living document — keep them current as you work, by default.

| Trigger | Action |
|---------|--------|
| Did work worth recording this session | Append to today's `notes/sessions/YYYY-MM/YYYY-MM-DD.md` (newest on top) |
| Made a substantive commit | Inline changelog entry atop `notes/version/YYYY-MM.md`, same commit |
| Health / what's-next changed | Update `notes/status.md` |
| Made / rejected a decision | `notes/decisions/architecture.md` / `rejected.md` |
| A change warrants a version | Bump `VERSION`, same commit |
| A convention becomes reusable across projects | Promote it to `hub/standards/` |
| Ran a fairyfox system procedure here (a round-up, a report-review pass, adopting one of our own standards) | Write a process report in `notes/fairyfox-reports/YYYY-MM-DD-<procedure>.md` — fairyfox.io is a node too (`hub/standards/process-reports.md`) |
| The setup or update procedure changes (git model, registry shape, template/skeleton layout, sync flow) | Keep the lifecycle runbooks current, by default: `hub/standards/new-project-setup.md`, `hub/standards/onboarding-existing-project.md`, and `hub/standards/adopting-updates.md` |
| The site's visual design system changes (tokens, layout, components, cross-linking) — e.g. edits to `assets/css/main.css`, layouts, or includes | Keep the docs-site standard `hub/standards/docs-site/` in step, by default: the spec prose, `11-measurements-reference.md`, **and** the bundled snapshot `docs-site/reference/main.css`. fairyfox.io is the **master copy: manual review only, never auto-applied** here — but the *standard* must mirror what the site actually is |

## The hub & cross-project sync

This repo is the **hub**: `hub/standards/` (canonical shared rules),
`hub/templates/` (copy-paste starters), `hub/registry.yml` (the project list).
The model is git-only, one-directional per flow, on-request: the hub reads
projects into `assets/references/` (to blog about changes — see
`notes/reference/blogging-workflow.md`), and projects read `hub/` to adopt
standards. Both track the `dev` branch. Full model:
`notes/reference/cross-project-sync.md`.

**Checking "the fairyfox system" for updates here means the inbound side, not
adoption.** (The user calls this mesh **the fairyfox system** in conversation; the
public website calls it the **hub** — same thing.) To invoke it the request must
**carry the word "fairyfox"** ("the fairyfox system", or "fairyfox standards" /
"fairyfox.io") *paired with* an update/sync intent — generic handles ("the hub",
"the mesh", "the standards", a bare "system") or an update verb alone ("check for
updates") do not qualify (ambiguous: OS, dependencies, a file).
This repo is the source of the shared standards, so it never adopts them *from*
itself: when asked to check the fairyfox system for updates, for this repo that
means scan the registered siblings in
`assets/references/` for new commits past their `hub/.last-seen.yml` markers (the
round-up — see `notes/reference/blogging-workflow.md`), and confirm the standards
docs/registry are internally consistent. Same posture as a node: **check and
report first, act only on an explicit go-ahead.** The node-side adopting flow (the
version projects run against this system) is defined in
`hub/standards/adopting-updates.md`.

**Reviewing the siblings' process reports is the hub's other inbound duty.** Each
node writes a process report after running a system procedure, into its own
`notes/fairyfox-reports/`; the hub reads those out of the same `assets/references/`
clones and folds the feedback into the standards. On a *fairyfox*-named review
request, read each sibling's reports past its `reports_through` marker in
`hub/.last-seen.yml`, look for patterns, **report findings then stop**, and only
improve `hub/standards/` on an explicit go-ahead — never edit a node to close out its
report. Full procedure: `hub/standards/process-reports.md`.
