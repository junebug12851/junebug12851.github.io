---
title: Build and deployment
nav_title: Deployment
category: site
order: 3
summary: How the site builds and deploys itself through GitHub Actions, with no manual publish step.
---

The site builds and deploys itself. There is no manual publish step: every push to
`main` produces a new live deploy.

## The pipeline

On every push to `main` (and on a manual trigger), the workflow at
`.github/workflows/pages.yml` runs:

1. **Checkout** the repository.
2. **Set up Ruby** (3.3) with bundler caching, installing the `Gemfile` gems.
3. **Configure Pages** to provide the correct base path.
4. **Build** with `bundle exec jekyll build` under `JEKYLL_ENV=production`.
5. **Upload** the built `_site/` as a Pages artifact.
6. **Deploy** the artifact to the `github-pages` environment.

Building with the project's own Bundler and Jekyll — rather than GitHub's built-in
Pages-gem build — means the site is **not limited to GitHub's plugin allowlist**:
any Jekyll version and any plugin listed in the `Gemfile` works.

## Hosting and the custom domain

The repository is a GitHub **user site** (`junebug12851.github.io`, where the
repository name is literally `<username>.github.io`), so it serves at the domain
root. The committed `CNAME` points the `fairyfox.io` custom domain at it. Because
the custom domain is set on the user site, each project's own GitHub Pages site is
served under the same domain — for example, `fairyfox.io/pokered-save-editor-2/` —
so navigation can lead straight into a project's documentation.

One-time setup, for reference: the Pages source is set to "GitHub Actions" (not
"deploy from a branch"); DNS points the apex domain at GitHub Pages; and HTTPS is
enforced once the certificate issues.

## Verifying a deploy

A failed build publishes nothing — the previous deploy stays live — so problems are
fixed forward and pushed again. Deploys can be watched with the GitHub CLI
(`gh run watch`).

## Local preview

```sh
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000
```

For a production-equivalent build, `JEKYLL_ENV=production bundle exec jekyll build`.
