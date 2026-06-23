---
title: How fairyfox.io is built
nav_title: Architecture
category: site
order: 1
summary: The stack, the repository layout, and the three concerns that share one repo.
---

fairyfox.io is a static [Jekyll](https://jekyllrb.com/) site with no external
theme — the layouts, includes, and CSS are all hand-owned. It is built and
deployed by GitHub Actions on every push, with no manual publishing step.

## Stack

- **Jekyll 4** (Ruby), with Kramdown (GitHub-flavoured Markdown) and Rouge syntax
  highlighting.
- **No gem theme.** Custom layouts, includes, and a single stylesheet, for full
  control over a small surface and no upgrade churn.
- **Plugins:** `jekyll-feed` (Atom feed), `jekyll-seo-tag` (head and Open Graph
  tags), and `jekyll-sitemap`.
- **Build and deploy:** GitHub Actions runs `bundle exec jekyll build` and
  publishes the result to GitHub Pages. Building with the project's own Bundler and
  Jekyll — rather than GitHub's built-in Pages-gem build — means the site is not
  restricted to GitHub's plugin allowlist. See [deployment](/docs/site-deployment/).

## Repository layout

```
.
├─ _config.yml          Jekyll config (excludes notes/, hub/, assets/references/)
├─ Gemfile              Jekyll + plugin dependencies
├─ VERSION              SemVer single source of truth
├─ CNAME                fairyfox.io custom domain
├─ index.html           Home — hero, projects, docs, latest updates
├─ projects.md          /projects/ — generated from _data/projects.yml
├─ blog.html            /blog/ — the updates index
├─ about.md             /about/
├─ downloads.md         /downloads/ — generated from _data/downloads.yml
├─ _docs/               the on-site documentation library (a Jekyll collection)
├─ _layouts/            default · page · post · doc
├─ _includes/           head · header · footer
├─ _posts/              update posts (YYYY-MM-DD-title.md)
├─ _data/               projects.yml · downloads.yml · doc_categories.yml
├─ assets/              css · favicon · references/ (read-only clones, ignored)
├─ .github/workflows/   pages.yml — build + deploy
├─ CLAUDE.md            entry point for an assistant opening the repo
├─ notes/              the living-notes knowledge base (excluded from the site)
└─ hub/                cross-project standards, templates, registry (excluded)
```

## Three concerns, one repository

The repository deliberately holds three things that do not mix at build time:

1. **The website** — everything Jekyll renders into the published `_site/`.
2. **The knowledge base** — `notes/` (the living documentation) and `CLAUDE.md`
   (the entry point for an AI assistant). Excluded from the site.
3. **The hub** — `hub/` (the shared standards, templates, and project registry that
   other repositories adopt) and `assets/references/` (read-only clones of those
   repositories, read in the other direction). Also excluded from the site.

Keeping all three in one repository is intentional: the hub *is* the home page's
repository, so there is exactly one thing to clone and one place the standards
live. The `exclude:` list in `_config.yml` is what keeps the knowledge base and the
hub out of the published site.

## Generated versus authored

- **Authored:** the pages, posts, layouts, stylesheet, the documentation library,
  and the `_data` registries.
- **Generated at build:** `_site/` (ignored), the Atom feed, the sitemap, and the
  SEO and Open Graph tags.
- **Pulled, never committed:** the read-only project clones under
  `assets/references/` — see [cross-project sync](/docs/cross-project-sync/).

For the reasoning behind these choices, see [design decisions](/docs/site-decisions/);
for how each part behaves at runtime, see the [system map](/docs/site-systems/).
