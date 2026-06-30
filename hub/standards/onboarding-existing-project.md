# Onboarding an Existing Project — folding an established repo into the mesh

How to bring a project that **already exists with its own life** — its own
history, README, structure, version scheme, maybe its own docs — into the hub
mesh for the first time. The job here is to **reconcile, not clobber**: layer the
shared standard onto a living repo without rewriting it.

> Canonical, project-agnostic version (the one other repos copy). Sibling
> runbooks: [`new-project-setup.md`](new-project-setup.md) for a *greenfield*
> repo (blank tree), and [`adopting-updates.md`](adopting-updates.md) for pulling
> *later* hub changes once a project is already in. The model behind all three:
> [`cross-project-sync.md`](cross-project-sync.md).

For AI or human. Use this one when the repo predates its membership — there's
existing work on disk you must respect.

## When this is the right runbook

| You have… | Use |
|-----------|-----|
| An empty/new repo you're standing up | [`new-project-setup.md`](new-project-setup.md) |
| **An established repo (own history/README/docs/version) joining for the first time** | **this doc** |
| A project already in the mesh, pulling newer hub changes | [`adopting-updates.md`](adopting-updates.md) |

A project can also legitimately stay **fully outside** the mesh (follows none of
the standards, isn't registered, isn't referenced). Onboard only when the project
should actually participate.

## The end state

Identical to greenfield — see the checklist in
[`new-project-setup.md`](new-project-setup.md#what-fully-set-up-means). The
difference is purely the **path**: every step below is "fit the standard to what's
already here," not "create from blank."

The same **single-app vs. collection (monorepo)** note applies here too: a collection
is an allowed deliberate exception (per-sub-unit quality, repo-level version/notes, a
landing-index site) — see the callout in
[`new-project-setup.md`](new-project-setup.md#what-fully-set-up-means).

## The governing rule

**Reconcile, don't overwrite.** The repo already encodes decisions — a version
number, a branch model, a README, possibly docs. Adopt the standard by folding it
*around* those, keeping what's good and recording any deliberate divergence. A
blind template copy that flattens existing work is the failure mode this runbook
exists to prevent.

## Steps

### 1. Survey what already exists (before touching anything)

Inventory the repo so you adopt onto reality, not over it:

- **Branch model** — what's the default branch? `main`? `master`? Anything else?
- **Versioning** — is there a `VERSION`, git tags, a `package.json` version, a
  changelog already?
- **Docs** — existing `README`, a `docs/` or wiki, any AI-context file?
- **Ignores / license / CI** — an existing `.gitignore`, `LICENSE`, workflows.

### 2. Adopt the branch model — `dev` + `main` (rename `master`)

The mesh runs **full git-flow**: work integrates on **`dev`**, and **`main`** holds
**tagged releases** — `main` advances only by a `--no-ff` merge (a PATCH straight
from `dev`, a MINOR/MAJOR via a `release/*` branch), never a direct commit or a
fast-forward (see the [git-workflow standard](git-workflow.md)). **`main` is
mandatory: a repo still on `master` renames it to `main`** as part of onboarding —
required, not optional. This is a safe **rename**, not history surgery; follow the
procedure in the
[git-workflow standard](git-workflow.md#master--main-is-mandatory) and fix the
references it lists (the **Pages source branch**, **CI/release** `on: push` branch
filters, and any `tree/master/…` URLs such as the registry's `notes:` link). The
registry's `branch` field tracks the **work** branch (`dev`) and is unchanged by
the rename.

### 3. Pull a read-only copy of the hub

```sh
mkdir -p assets/references
git -C assets/references clone --branch dev --single-branch \
    https://github.com/junebug12851/junebug12851.github.io fairyfox.io
```

An ordinary single-branch clone refreshes by fast-forward every time.

Git-ignored, read-only — never a submodule (see step 4 for the ignore line).

### 4. Adopt the templates by reconciliation

Fold each template in around what's there — never a straight overwrite:

| Template | If absent | If something already exists |
|----------|-----------|-----------------------------|
| `CLAUDE.md` | Copy it in and fill out the project identity, **including the mesh-awareness block** (see below). | Fold the standard's structure into the existing AI-context file, keeping the project's real landmines/build steps — **but you must still add the mesh-awareness block** (see below); an existing `CLAUDE.md` almost never has it. |
| `VERSION` | Create it — but **seed it from the project's actual version** (latest tag / `package.json`), *not* `0.1.0`. Reconcile the scheme toward SemVer. | Leave the real number; just confirm it matches the SemVer rule. |
| `.gitignore` | Add the `assets/references/` ignore (+ cruft). | **Merge** the `assets/references/` line in; don't replace the existing file. |
| `notes/` skeleton | Drop the skeleton in and seed `status.md` from reality. | Add the skeleton *alongside* existing docs; migrate them in over time, not big-bang. |

> **The mesh-awareness block is required — and it's the easiest thing to skip when
> reconciling an existing `CLAUDE.md`.** The project's `CLAUDE.md` must carry the
> **"Cross-project standards & checking the fairyfox system for updates"** standing
> instruction from the template ([`templates/CLAUDE.md`](../templates/CLAUDE.md)) —
> the check-for-updates flow plus its guardrails. Without it the project never
> learns it is a node: it won't respond to "check the fairyfox system for updates"
> and won't know to adopt later changes. A mature project that already has its own
> polished `CLAUDE.md` is the **most likely** place this gets missed — verify it is
> actually present, don't assume.

### 5. Map existing docs into the notes system

Don't duplicate — **relocate or link.** The existing `README` stays the repo
tour; fold deeper material into the `notes/` tree (status, context, reference) and
link out rather than copy. One fact, one home.

### 6. Bring its docs onto the themed docs site *(often incremental)*

Adopt the [docs-site design system](docs-site/) so the project's documentation
**appears as a page of fairyfox.io** — but **reconcile, don't clobber**, the same as
the rest of onboarding:

- **First decide which docs shape the project is** (this drives everything —
  [`docs-site/06`](docs-site/06-content-and-organization.md#generated-docs-doxygen-jsdoc-typedoc-sphinx-)):
  a hand-authored site (theme the shell, boundary any generated reference), or a
  **generator-IS-the-site** project (JSDoc/docdash/Doxygen output *is* the docs).
- **For a generator-is-the-site project, theme the generator itself** — **replace
  its stylesheet from scratch (don't override it), inject the project brand + the
  way-home into the generator's own sidebar, and make the build copy your theme
  assets into the output.** Don't author a separate Jekyll shell to wrap it; that
  fights the project's tooling.
- **Required to pass:** the served site **wears the shared fairyfox chrome** (header,
  nav + submenu, footer) so it reads as a page of the site, with the **brand/Home link
  as the way home** and **no separate back-button**. Project-forward branding is fine
  ([`docs-site/05`](docs-site/05-navigation-and-cross-linking.md)). Publish on the shared
  domain at `fairyfox.io/<key>/` (base path `/<key>`, no project CNAME —
  [`docs-site/10`](docs-site/10-domain-and-publishing.md) and the
  [deployment standard](deployment.md); built apps go to Netlify instead).
- **Partial on day one is OK** *if reported as partial* — tighten via
  [`adopting-updates.md`](adopting-updates.md). Bar:
  [`docs-site/08-compliance-checklist.md`](docs-site/08-compliance-checklist.md).

> **Raw generated docs served alone do NOT satisfy this — and don't count as
> "partial" either.** A bare JSDoc / Doxygen / TypeDoc dump at `fairyfox.io/<key>/`
> in the generator's *default* theme, with no fairyfox palette/type and no way-home,
> is the exact failure this step catches. The fix is **not** to wrap it in a shell —
> it's to **theme the generator** (replace its stylesheet, inject the brand +
> way-home). **Verify by actually looking at the served page**, not by trusting that
> a `docs:` URL resolves — a URL that resolves to default-theme output is a miss.

### 7. Register with the hub *(hub-side change)*

A commit **in the hub repo**, not the project:

- Add the entry to [`hub/registry.yml`](../registry.yml) — and set **`branch` to
  the project's real branch** (from step 2), not a wishful `dev`.
- Set `adopts_hub` / `notes_system` **honestly** — partial adoption is fine and
  normal for an existing repo; mark what's actually true today. **Never pre-set them
  `true` before the project-side work exists** — an optimistic flag seeds exactly the
  false "registered = done" signal this runbook warns against.
- Add the companion row to the site's `_data/projects.yml`.

### 8. Write the onboarding process report

Onboarding is a fairyfox system interaction, so it ends with a process report in
`notes/fairyfox-reports/YYYY-MM-DD-onboarding.md` (from
[`templates/fairyfox-report.md`](../templates/fairyfox-report.md)). For an existing
repo this is the **highest-value** report of all: capture every place "reconcile, not
clobber" was awkward — what fought the template, what the runbook assumed that wasn't
true here, what you had to decide by hand. That friction is exactly what the hub needs
to make onboarding smoother. Mark the outcome honestly (`partial` is common and fine).
See the [process-reports standard](process-reports.md). It's committed with the rest
below.

### 9. Commit on `dev`, then cut the onboarding release

Stage specific files (never `-A`; never `assets/references/*`):

```sh
git add CLAUDE.md VERSION .gitignore notes        # incl. notes/fairyfox-reports/
git commit -m "chore: onboard into hub mesh (adopt standards + notes)"
git push origin dev
# release dev → main the git-flow way (PATCH: direct, --no-ff, tagged):
git checkout main && git merge --no-ff dev
git tag -a vX.Y.Z -m "vX.Y.Z" && git push origin main --tags
git checkout dev
```

(A MINOR/MAJOR milestone goes through a `release/*` branch instead — see the
[git-workflow standard](git-workflow.md#cutting-a-release).)

## Registered ≠ integrated (read before declaring "done")

**Hub-side registration is the easy half and proves almost nothing about whether
the project is actually integrated.** A project can be in both registries, have a
node page, a docs-library entry, and blog posts — and still have done **none** of
the project-side work (no mesh-awareness in its `CLAUDE.md`, no themed docs site).
Listing it on the hub is necessary but **not sufficient**.

So separate the two when you assess or report:

- **Hub side** — registry entries, node/docs pages, blog. (Steps 7.)
- **Project side** — the standards actually living in the repo: the mesh-awareness
  `CLAUDE.md` block, the notes system, the git/version model, and a **themed docs
  site**. (Steps 1–6, 8.)

A project that's only hub-registered is **not onboarded** — it's *listed*. Never
report it as "fully onboarded."

## Partial adoption is fine — *if reported honestly*

An established repo rarely adopts everything on day one — it might take the notes
system now and the full git model later. That's expected: onboard incrementally
and tighten over subsequent passes via [`adopting-updates.md`](adopting-updates.md).
But "partial" is only acceptable when it is **reported as partial, with the
specific gaps named.** Mark the registry flags honestly, and never round a
partially-integrated project up to "done." Joining the mesh is a direction, not a
single switch — say where on the path it actually is.

## Verify — the completeness audit

Run **every** row and report each with its real status — `done`, `partial`, or
**`missing`**. This same audit is what you run to check a project that's *claimed*
to be onboarded; finding `missing` rows means it isn't. This is the **join-time**
gate; the recurring whole-set check (every standard, re-runnable anytime) is the
[standards compliance audit](compliance.md).

> **If a setup/onboarding report from the same day already exists**, read it first
> (`notes/fairyfox-reports/YYYY-MM-DD-*.md`). A verification run right after setup
> shouldn't re-litigate caveats the setup report already recorded (e.g. a
> collection/monorepo shape, or a static project whose site doubles as its docs) —
> confirm against it rather than re-deriving.

| # | Dimension | Passes only when… |
|---|-----------|-------------------|
| 1 | Working tree | `git status` clean; `assets/references/` untracked/ignored; nothing pre-existing clobbered (README, license, CI, history intact). |
| 2 | Versioning | `VERSION` reflects the project's **real** version (not reset to `0.1.0`), SemVer-shaped. |
| 3 | Branch model | Stable branch is **`main`** (a repo on `master` has been renamed — mandatory; Pages/CI/URL refs fixed). Registry `branch` is the **sync-tracking work branch** (`dev` by default), honest — it is *not* the repo's default branch. |
| 4 | Notes system | The `notes/` tree exists with a real `status.md`; existing docs mapped in, not duplicated. |
| 5 | **Mesh-awareness in `CLAUDE.md`** | The project's `CLAUDE.md` **actually contains** the "Cross-project standards & checking the fairyfox system for updates" standing instruction. **Open the file and confirm the text is there** — don't infer it from the project being registered. |
| 6 | **Docs site is a page of fairyfox** | `fairyfox.io/<key>/` serves a site **wearing the shared fairyfox chrome** (header, nav + submenu, footer) so it reads as a page of the site, with the **brand/Home link as the way home** and **no separate back-button** (project-forward branding is fine). **Look at the actual page.** Default-theme JSDoc/Doxygen output, or a `docs:` URL that merely resolves, is `missing` — not `partial`. Deploy target matches the project's kind ([deployment](deployment.md)). Bar: [`docs-site/08-compliance-checklist.md`](docs-site/08-compliance-checklist.md). |
| 7 | Hub registration | Resolves in **both** registries with honest `adopts_hub` / `notes_system` flags; node + docs pages present. |
| 8 | Process report | `notes/fairyfox-reports/` holds this onboarding's report, committed, with the reconcile friction and an honest outcome — [process-reports](process-reports.md). |

**Reporting rule:** only call a project **"fully onboarded" when rows 1–8 are all
`done`.** If any row is `partial` or `missing`, say exactly which — e.g. "registered
and noted, but the docs site is unthemed JSDoc and the `CLAUDE.md` mesh block is
missing." A clean hub-side registration is **not** a green light.

**Verifying under a held-release flow.** If you're committing on `dev` and holding
the release to `main` until an explicit go-ahead, the live `fairyfox.io/<key>/` page
can't change until that release. That's fine: **verify the built output locally**
(open it in a browser) on each iteration, then do **one live re-verification of the
served page after the release merge + Pages deploy.** Local-during, live-once-after —
Row 6 still gets its real look at a rendered page.

## Gotchas

- **Never rewrite history to fit the standard.** No force-push, no rebase of
  published commits, no branch deletion without an explicit request.
- **Don't reset the version.** Carry the existing number forward.
- **`master` must become `main`** — rename it (safely; see step 2 and the
  git-workflow standard) and fix the Pages / CI / `tree/master/…` references. The
  registry's `branch` (the `dev` work branch) is unaffected.
- **Honesty over completeness** in the registry — a half-adopted project is a real
  state worth recording accurately.
