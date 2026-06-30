# hub/ — cross-project standards & templates

This is the shared spine for my repositories. It holds the conventions, ready-to-
copy templates, and the project registry that all my projects draw from. **This
is the source of truth for shared standards** — promote a convention up to here
once it's reusable, and projects pull it down on demand.

It lives inside the fairyfox.io repo (which is both my home page and this hub) but
is excluded from the rendered website.

## What's here

| Path | What it is |
|------|------------|
| [`standards/`](standards/) | The canonical, project-agnostic standards (the version other repos adopt): [git workflow](standards/git-workflow.md), [versioning](standards/versioning.md), [the notes system](standards/notes-system.md), [cross-project sync](standards/cross-project-sync.md), [AI context](standards/ai-context.md), [process reports](standards/process-reports.md) (the feedback loop — nodes report on each system run, the hub reviews to improve), plus the lifecycle runbooks [new-project setup](standards/new-project-setup.md) (greenfield), [onboarding an existing project](standards/onboarding-existing-project.md) (established repo joining), and [adopting updates](standards/adopting-updates.md) (pulling later changes); the [docs-site design system](standards/docs-site/) (the shared look + cross-linking that makes every project appear as a page of fairyfox.io); [deployment](standards/deployment.md) (static→Pages on the shared domain, built apps→Netlify, games as a recorded exception); [planning](standards/planning.md) (plan-before-execute by default); and the [standards compliance audit](standards/compliance.md) (the enforcement pass — one on-request check that runs every standard's `Verify` section against the hub or a node). |
| [`templates/`](templates/) | Copy-paste starting files for a new or adopting project: a `CLAUDE.md`, a `VERSION`, a `.gitignore` snippet, and a `notes/` skeleton. See [`templates/README.md`](templates/README.md). |
| [`registry.yml`](registry.yml) | The machine-readable list of my projects — what to clone, on which branch, for the sync + blog round-ups. The human-facing companion is `../_data/projects.yml`. |

## The model in one paragraph

Communication between repos is **git-only, one-directional per flow, and only on
explicit request.** This hub keeps read-only clones of my projects (under
`../assets/references/`, git-ignored) to read what changed and blog about it; each
project keeps its own read-only clone of this hub to refresh shared
standards. No submodules, no live dependency, no automation that chains across
repos — which is exactly what keeps it modular and prevents recursion. Both flows
track the **`dev`** branch. Full write-up:
[`standards/cross-project-sync.md`](standards/cross-project-sync.md).

## Adopting the standards in a project (quick start)

```sh
# inside the project, pull a read-only copy of this hub (one branch)
git -C assets/references clone --branch dev --single-branch \
    https://github.com/junebug12851/junebug12851.github.io fairyfox.io

# copy what you need into the project's own tree, then commit it there
cp assets/references/fairyfox.io/hub/templates/CLAUDE.md ./CLAUDE.md
cp -r assets/references/fairyfox.io/hub/templates/notes-skeleton ./notes
# ...adjust to the project, then: git add <those files> && git commit
```

Copying (not linking) is deliberate: the standard becomes part of the project, not
a runtime dependency. Re-pull later to see what changed and merge by hand.

Full step-by-step runbooks: [`standards/new-project-setup.md`](standards/new-project-setup.md)
(bootstrapping a fresh project), [`standards/onboarding-existing-project.md`](standards/onboarding-existing-project.md)
(folding in an established repo without clobbering it), and
[`standards/adopting-updates.md`](standards/adopting-updates.md) (pulling later hub changes in).
