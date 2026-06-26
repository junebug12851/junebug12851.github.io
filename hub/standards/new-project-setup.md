# New Project Setup — bootstrapping a project into the mesh

How to take a fresh (or unmanaged) repository to **fully set up** inside the
hub mesh: adopting the shared standards, the living-notes system, the git model,
and getting registered so the hub is aware of it.

> Canonical, project-agnostic version (the one other repos copy). The hub itself
> is set up this way too. Companion procedure for *later* changes:
> [`adopting-updates.md`](adopting-updates.md). The model behind both:
> [`cross-project-sync.md`](cross-project-sync.md).

For AI or human. Run the steps in order; each is small and reversible.

> **Greenfield only.** This runbook assumes a blank or new repo. Folding in an
> **established repo** that already has its own history, README, docs, or version
> scheme is a different path — use
> [`onboarding-existing-project.md`](onboarding-existing-project.md) instead.

## What "fully set up" means

The end state — tick every box before calling a project done:

| Area | Done when |
|------|-----------|
| Repo + branches | The repo exists on GitHub with **`dev`** and **`main`**; work happens on `dev`, `main` only fast-forwards. |
| AI entry point | A filled-in `CLAUDE.md` at the root, pointing at `notes/status.md`. |
| Notes system | A `notes/` tree (from the skeleton), with a real `status.md`. |
| Versioning | A `VERSION` file at the root (usually `0.1.0`). |
| Ignores | `.gitignore` excludes `assets/references/*` and build cruft. |
| Standards adopted | The project follows the hub's git, versioning, notes, and AI-context standards (copied in, not linked). |
| Registered | The project is listed in the hub's [`registry.yml`](../registry.yml) **and** the site's `_data/projects.yml`. |
| Docs site | A themed documentation site published at `fairyfox.io/<key>/`, built to the [docs-site design system](docs-site/) (seamless with fairyfox.io, links back). |
| Process report | A `notes/fairyfox-reports/` folder exists (from the skeleton) and this setup run is written up in it — see [process-reports](process-reports.md). |

## Before you start

- The repo exists (or you are about to `git init` / `gh repo create` it).
- `git` and the `gh` CLI are installed and authed.
- You know the project's **key** (short slug = the folder name used everywhere,
  e.g. `random-ai-prompt`) and its **default sync branch** (almost always `dev`).

## Steps

### 1. Create the repo and the two branches

```sh
# if it doesn't exist yet
gh repo create junebug12851/<project> --private --source=. --remote=origin
git checkout -b dev          # all work lives here
```

`main` is created at the first fast-forward (step 7). **Never commit directly to
`main`** — it only ever moves forward to a green `dev` commit.

### 2. Pull a read-only copy of the hub

The hub is read by **shallow clone into a git-ignored folder** — never a
submodule, never a dependency.

```sh
mkdir -p assets/references
git -C assets/references clone --depth 1 --branch dev \
    https://github.com/junebug12851/junebug12851.github.io fairyfox.io
```

### 3. Copy the templates into the project

Copy — don't link. The templates become part of *this* repo.

```sh
H=assets/references/fairyfox.io/hub/templates
cp    $H/CLAUDE.md          ./CLAUDE.md
cp    $H/VERSION            ./VERSION
cat   $H/project.gitignore >> ./.gitignore
cp -r $H/notes-skeleton     ./notes
```

### 4. Fill in the templates for this project

The copies are generic — make them this project's own:

- **`CLAUDE.md`** — project identity, the "critical things not to get wrong"
  (landmines), build/run commands, and any project-specific standing
  instructions. Keep it pointing at `notes/status.md`.
- **`VERSION`** — set the starting number (usually `0.1.0`).
- **`notes/status.md`** — a real current-state snapshot, even if short.
- **`notes/context/`** — `project.md`, `architecture.md`, `principles.md`:
  what this is, how it's built, the voice/principles it holds to.

### 5. Confirm the standards are adopted

The skeleton's `notes/reference/` mirrors the hub standards as *this project's
copy*. Confirm each shared standard is present and reconciled with how the
project actually works — git workflow, versioning, the notes system, AI context,
and cross-project sync. Adopting a standard is a **copy committed locally**, not
a live link; re-pull later to see what changed (see
[`adopting-updates.md`](adopting-updates.md)).

### 6. Build the project's themed docs site

A project isn't fully set up until it has a documentation site that's **seamless
with fairyfox.io**. Follow the [docs-site design system](docs-site/) standard:

- Reproduce the theme (tokens, shell, components) in the project's stack — match as
  closely as the stack allows; exact values in
  [`docs-site/11-measurements-reference.md`](docs-site/11-measurements-reference.md)
  and [`docs-site/reference/main.css`](docs-site/reference/). **If the docs are
  generator-produced** (JSDoc, Doxygen, …), theme the generator itself — replace its
  stylesheet, don't override
  ([`docs-site/06`](docs-site/06-content-and-organization.md#generated-docs-doxygen-jsdoc-typedoc-sphinx-)).
- Add the one **required way-home** link ("← Back to Fairy Fox" →  `fairyfox.io/`) on
  every page; a footer/breadcrumb back to the node page is recommended, not required.
  Project-forward branding is fine — the shared theme is the tie
  ([`docs-site/05-navigation-and-cross-linking.md`](docs-site/05-navigation-and-cross-linking.md)).
- Publish it at **`fairyfox.io/<key>/`** on GitHub Pages
  ([`docs-site/10-domain-and-publishing.md`](docs-site/10-domain-and-publishing.md)) —
  enable Pages, set the base path to `/<key>`, no project CNAME.
- Verify against [`docs-site/08-compliance-checklist.md`](docs-site/08-compliance-checklist.md).

### 7. Register the project with the hub *(hub-side change)*

So the hub knows the project exists and can read it for round-ups. This is a
commit **in the hub repo**, not the project:

- Add an entry to [`hub/registry.yml`](../registry.yml) — `key`, `repo`,
  `branch`, `adopts_hub`, `notes_system`, `last_seen: null`.
- Add the human-facing companion entry to the site's `_data/projects.yml`
  (keep the two registries in step).

### 8. Write the setup process report

Setting a project up is a fairyfox system interaction, so it ends with a process
report in `notes/fairyfox-reports/YYYY-MM-DD-setup.md` (from
[`templates/fairyfox-report.md`](../templates/fairyfox-report.md)): how the bootstrap
went, which steps were ambiguous or didn't fit a fresh repo, and any suggestion for
the runbook. This is the feedback the hub uses to improve setup — see the
[process-reports standard](process-reports.md). It's committed with the rest below.

### 9. First commit, push, fast-forward `main`

Inside the project, on `dev`:

```sh
git add CLAUDE.md VERSION .gitignore notes        # incl. notes/fairyfox-reports/; specific files, never -A
git commit -m "chore: adopt hub standards and notes system"
git push origin dev

git checkout main && git merge --ff-only dev && git push origin main
git checkout dev
```

Stage the **reference clone out** — `assets/references/*` is git-ignored and must
never be committed (committing it nests repos and bloats history).

## Verify

- `git status` is clean; `assets/references/` is untracked/ignored.
- `CLAUDE.md` opens to a real `notes/status.md`, **and actually contains the
  "Cross-project standards & checking the fairyfox system for updates" standing
  instruction** (confirm the text is present, not just that the file exists).
- `VERSION` reads a sane starting number.
- The project resolves in **both** registries (`hub/registry.yml` and
  `_data/projects.yml`) with matching `key` and `branch`.
- The themed docs site loads at `fairyfox.io/<key>/`, **wears the fairyfox theme**,
  and has the persistent **"← Back to Fairy Fox"** way-home link (project-forward
  branding is fine) — **look at the served page**; default-theme JSDoc/Doxygen output
  or a merely-resolving `docs:` URL is a miss. If the docs are generator-produced,
  theme the generator itself
  ([`docs-site/06`](docs-site/06-content-and-organization.md#generated-docs-doxygen-jsdoc-typedoc-sphinx-)).
  Bar: [`docs-site/08-compliance-checklist.md`](docs-site/08-compliance-checklist.md).
- If the project builds/serves, it builds green.
- `notes/fairyfox-reports/` exists and holds this run's setup report, committed —
  [process-reports standard](process-reports.md).

Don't report the project as fully set up unless every item above actually holds —
name any that don't rather than rounding up.

## Gotchas

- **References are read-only and git-ignored.** Pulling the hub never produces a
  commit, so it can't trigger anything downstream.
- **Branch defaults.** New projects track `dev`. A legacy repo may default to
  `master` — record the real branch in the registry rather than forcing a rename.
- **One source of truth per fact.** Version → `VERSION`; project list →
  the registries; shared rules → the hub. Don't duplicate; link.
- **Never bump MAJOR** (`→ 1.0.0`) — Fairy Fox's call only.
