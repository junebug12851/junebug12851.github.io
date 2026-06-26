# Architecture Decisions

Key structural choices and why. Newest on top.

### Express authorizations carry the user's go-ahead from hub to node (2026-06-26)

Adoption defaults to "check, report, then wait" at each node — a safety gate
against unprompted self-edits. But when Fairy Fox has **already expressly
authorized a change at the hub**, the node's second confirmation is pure friction
("the stupid updates ... I already gave [it] here"). Chosen model: the hub keeps a
tracked **express-authorization ledger** (`hub/authorizations.yml`); a node adopting
a change the ledger `covers` treats it as pre-authorized and skips **only** the wait
pause, keeping every other safety step (copy-not-clobber, divergence re-prompt,
process report, reviewable commit, build-check).

Why a ledger rather than a blanket "skip all hub changes": the user is fine with
confirmation by default — the carve-out is scoped to what they expressly authorized,
and entries can expire so a one-off rollout doesn't linger as a permanent bypass.
Why it doesn't break anti-recursion: the node *reads* the ledger from its read-only,
git-ignored clone, on request — a pre-authorization lets a node skip a prompt, it
never lets the hub reach in and act. The node still adopts only when the user invokes
the flow. The carve-out lives in the CLAUDE.md template's mesh-awareness block too,
so every node has the same understanding. (`0.9.0`.)

### fairyfox.io is a listed meta-project (2026-06-24)

The hub/site itself (`fairyfox.io`, repo `junebug12851.github.io`) is a **first-class
listed project** — an entry in `_data/projects.yml` and `hub/registry.yml`, treated
identically to the siblings: its own card/node, lifecycle / version / activity, docs, and
day-centric blog coverage. It was already *implied* (blogged and talked about); now it's
an actual listed project. Nothing else about it changes.

### Two-layer projection architecture + standardized status taxonomy (2026-06-24)

The site is a **read-only projection** of mesh state. The **display layer** (Jekyll now,
possibly Laravel later) only ever *reads* `_data`; a separate, decoupled **management
layer** (the assistant + tooling + GitHub Actions) *computes* that state and *writes* it
into the repo. Communication is one-directional and non-recursive — the same rule as
cross-project sync. The heavy work (aggregating repos, the activity pulse, cross-project
links) lives off the page, so the surface stays static, fast, and framework-free, and the
eventual Laravel move swaps only the display layer. Confirmed as "Option A" with Fairy
Fox. Full rationale: [`../context/design-direction.md`](../context/design-direction.md)
§4 and the build plan [`../plans/implementation.md`](../plans/implementation.md).

Project **status is a standardized taxonomy**, not a freeform string: three independent
fields — **lifecycle** (`alpha` | `beta` | `released`, fixed colors red / yellow / green),
**version**, and **activity** (`active` | `inactive`). Authored in `_data/projects.yml`;
`last_updated` comes from the generated pulse. Category tags are clickable and
consistently cased.

### Documentation library as a Jekyll collection (2026-06-22)

The on-site docs are a `_docs` collection (output pages, `/docs/:path/`) rendered
with a `doc` layout that builds a sidebar from `_data/doc_categories.yml`. Chosen
over ad-hoc pages so the library has consistent ordering/sidebar and the header
"Docs" dropdown can be generated from the same collection. Public docs summarise
and link to the canonical machine copies in `hub/standards/` (some overlap is
accepted; the public pages are the readable view).

### Navigation links into project Pages sites under the custom domain (2026-06-22)

Setting the custom domain on the user site causes project Pages sites to be served
under it (confirmed: GitHub reports pokered-save-editor-2 at
`https://fairyfox.io/pokered-save-editor-2/`). The Projects dropdown links there
directly, so the hub and the project docs read as one connected set. Project doc
URLs live in `_data/projects.yml` (`docs`/`notes`).

### Neutral documentation voice; owner is Fairy Fox (2026-06-22)

The site is written in a neutral, professional voice about the work — not the
owner's first person, not a personal brand, no glorifying, no puns. The owner is
Fairy Fox (git author identity unchanged). Recorded in `context/principles.md`.

### Track the `dev` branch for cross-project sync (2026-06-22)

Both sync flows (hub-reads-projects, projects-read-hub) track **`dev`**, not
`main`. Rationale: round-ups should report the *latest* work, and projects
adopting standards want the current version. `dev` is where work lands first in
this branch model. (If a project lacks a `dev` branch, fall back to its default.)

### User site repo (`junebug12851.github.io`) + custom domain (2026-06-22)

Chose a GitHub **user site** (repo literally named `<username>.github.io`) rather
than a project repo. A user site serves at the root, which suits a personal hub,
and the `fairyfox.io` custom domain is pointed at it via `CNAME`. The same repo
doubles as the standards/sharing hub — one thing to clone, one home for standards.

### Build with our own Bundler + Jekyll in Actions, not the Pages gem (2026-06-22)

GitHub's built-in "Deploy from a branch" Pages build restricts plugins to an
allowlist and pins Jekyll. Building ourselves (`ruby/setup-ruby` → `bundle exec
jekyll build` → `upload/deploy-pages`) lifts both limits and is the modern,
recommended path. Source must be set to "GitHub Actions" in repo settings.

### Custom Jekyll, no external theme (2026-06-22)

Hand-owned layouts/includes/CSS instead of a gem theme. Full control over a small
surface, no theme upgrade churn, and the markup stays legible. The cost (writing
our own CSS) is small for a site this size.

### One repo holds site + notes + hub (2026-06-22)

The website, the living `notes/`, and the cross-project `hub/` all live in the
same repo, with `notes/`, `hub/`, and `assets/references/` excluded from the
rendered site in `_config.yml`. Rationale: the hub *is* the home page's repo, so
there's exactly one thing to clone and one place standards live.

### Reference clones git-ignored, not committed (2026-06-22)

`assets/references/*` (shallow clones of other repos) are git-ignored — only the
folder's `README.md` is tracked. Committing them would nest repositories, bloat
history, and couple the repos. The pull-on-demand model needs only a throwaway
working copy. See [`../reference/cross-project-sync.md`](../reference/cross-project-sync.md).

### Adopted the living-notes system + inline-changelog rule (2026-06-22)

Mirrored the proven system from `pokered-save-editor-2`: status / sessions /
changelog / context / systems / reference / decisions / plans, with each
commit's changelog entry written *inside* that commit (no recursion-prone
"document the last commit" follow-ups). Keeps the repo self-documenting.
