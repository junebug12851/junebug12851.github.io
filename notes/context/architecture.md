# Architecture

How the repo is put together. For the *why* behind specific choices see
[`../decisions/architecture.md`](../decisions/architecture.md); for the runtime
data flow of each piece see [`../systems/overview.md`](../systems/overview.md).

## Stack

- **Jekyll 4** (Ruby), Kramdown (GFM) + Rouge highlighting.
- **No external theme** — custom layouts, includes, and CSS, for full control and
  no theme bloat.
- **Plugins:** `jekyll-feed` (Atom), `jekyll-seo-tag` (head/OG tags),
  `jekyll-sitemap`.
- **Build/deploy:** GitHub Actions (`ruby/setup-ruby` → `bundle exec jekyll
  build` → `upload-pages-artifact` → `deploy-pages`). We build ourselves rather
  than using GitHub's Pages-gem build, so we are **not** restricted to the
  Pages plugin allowlist.

## Layout of the repo

```
.
├─ _config.yml          Jekyll config (excludes notes/, hub/, assets/references/)
├─ Gemfile              Jekyll + plugin deps (built by Actions)
├─ VERSION              SemVer single source of truth
├─ CNAME               fairyfox.io custom domain
├─ index.html          Home (hero + featured projects + recent posts)
├─ projects.md         /projects/ — generated from _data/projects.yml
├─ blog.html           /blog/ — post index
├─ about.md            /about/
├─ _layouts/           default · page · post
├─ _includes/          head · header · footer
├─ _posts/             blog posts (YYYY-MM-DD-title.md)
├─ _data/projects.yml  the project registry (feeds home + projects page)
├─ assets/
│  ├─ css/main.css     the theme
│  ├─ favicon.svg
│  └─ references/      clones of OTHER repos (git-ignored; read-only)
├─ .github/workflows/pages.yml   build + deploy
├─ CLAUDE.md           AI-context entry point
├─ notes/              this living-notes system (excluded from the site)
└─ hub/                cross-project standards, templates, registry (excluded)
```

## Three layers, one repo

The repo deliberately holds three concerns that don't mix at build time:

1. **The website** — everything Jekyll renders. The rendered output is `_site/`.
2. **The knowledge base** — `notes/` (this repo's living docs) and `CLAUDE.md`
   (the AI entry point). Excluded from the site in `_config.yml`.
3. **The hub** — `hub/` (standards + templates + registry that other repos pull)
   and `assets/references/` (clones of those repos, read in the other direction).
   Also excluded from the site.

Keeping all three in one repo is intentional: the hub *is* the home page's repo,
so there's exactly one thing to clone and one place standards live. The
`_config.yml` `exclude:` list is what keeps the knowledge base and hub out of the
published site.

## What's generated vs. authored

- **Authored:** pages, posts, layouts, CSS, the `_data/projects.yml` registry.
- **Generated at build:** `_site/` (ignored), `feed.xml`, `sitemap.xml`, SEO tags.
- **Pulled, never committed:** `assets/references/*` (see
  [`../reference/cross-project-sync.md`](../reference/cross-project-sync.md)).
