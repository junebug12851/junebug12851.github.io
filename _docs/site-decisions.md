---
title: Design decisions
nav_title: Design decisions
category: site
order: 5
summary: The key structural choices behind the site and hub — and a few things deliberately not done.
---

The notable structural choices behind fairyfox.io, and the reasoning for each.

## Choices made

**One repository holds the site, the notes, and the hub.** The website, the living
`notes/`, and the cross-project `hub/` all live in the same repository, with
`notes/`, `hub/`, and `assets/references/` excluded from the rendered site. The hub
*is* the home page's repository, so there is exactly one thing to clone and one
place the standards live.

**A custom Jekyll build, no external theme.** Hand-owned layouts, includes, and CSS
instead of a gem theme — full control over a small surface, no upgrade churn, and
markup that stays legible. The cost of writing the CSS is small for a site this
size.

**Build with the project's own Bundler and Jekyll in Actions.** GitHub's built-in
"deploy from a branch" build restricts plugins to an allowlist and pins Jekyll.
Building through Actions lifts both limits and is the modern, recommended path. See
[deployment](/docs/site-deployment/).

**A user-site repository plus a custom domain.** A GitHub user site (repository
named `<username>.github.io`) serves at the root, which suits a personal hub, and
the `fairyfox.io` domain is pointed at it. The same repository doubles as the
standards hub.

**Navigation links into project Pages sites under the custom domain.** Setting the
domain on the user site causes the project Pages sites to be served under it too, so
the hub and the project docs read as one connected set.

**An on-site documentation library as a Jekyll collection.** The docs are a `_docs`
collection rendered with a sidebar built from the category data, so the library has
consistent ordering and the header menu can be generated from the same source.

**A neutral documentation voice.** The site is written about the work, not in the
owner's first person and not as a personal brand — see
[principles and voice](/docs/site-principles/).

## Things deliberately not done

**Git submodules for sharing** — rejected. Submodules pin a commit and couple
repositories at clone and build time, the opposite of the loose wiring wanted here.
Replaced by on-demand shallow clones in a git-ignored folder.

**Automatic cross-repository triggers** (webhooks, CI chaining) — rejected. Having
one repository's update automatically build another is the recursion risk the model
avoids. Every sync pull is manual or on explicit request.

**An off-the-shelf Jekyll theme** — not used, to avoid upgrade churn and hidden
markup.

**Committing the reference clones** — rejected. Tracking them would nest
repositories and bloat history for content that is a throwaway read; they are
git-ignored instead.

**A second copy of the version number** (for example in `_config.yml`) — rejected.
The single source of truth is the repository-root `VERSION` file; a second copy
would drift.
