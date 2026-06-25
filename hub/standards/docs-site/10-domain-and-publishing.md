# 10 · Domain & Publishing

How a project's docs site actually lands at **`fairyfox.io/<key>/`** — the
infrastructure that makes the one-domain model in
[`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md) real.

## How the shared domain works (the key fact)

`fairyfox.io` is the **custom domain on the user site** (`junebug12851.github.io`).
Because of that, GitHub Pages **automatically serves every other repo's Pages site
under the same domain** at the path `/<repo>/`:

| Repo | Served at |
|------|-----------|
| `junebug12851/junebug12851.github.io` (user site) | `fairyfox.io/` |
| `junebug12851/<project>` (any project with Pages on) | `fairyfox.io/<project>/` |

So a project **joins the domain just by enabling Pages** — it inherits the custom
domain from the user site. No per-project DNS, no per-project domain purchase, and
**no CNAME file in the project repo** (see gotchas). This is already live for the
existing projects.

## DNS — already done, once, at the apex

The domain's DNS is configured **once**, on the user site, and every project
inherits it:

- The apex `fairyfox.io` points at GitHub Pages (A/ALIAS records to GitHub's
  published Pages addresses), and `www` is a `CNAME` to `junebug12851.github.io`.
- The **`CNAME` file lives only in the user-site repo** (`junebug12851.github.io`),
  which is this repo.

**A new project needs no DNS changes at all.**

## Per-project publishing steps

To put a project's docs on the domain:

1. **Enable GitHub Pages** on the project repo (Settings → Pages). Choose the
   source — either "Deploy from a branch" (e.g. `main` / `docs/` folder) or
   "GitHub Actions" (recommended if a generator builds the site).
2. **Set the site's base path to `/<repo>`** in the generator config so every CSS,
   JS, image, and link resolves under the subpath:
   - **Jekyll:** `baseurl: "/<repo>"` (and reference assets with `relative_url`).
   - **Vite/React/Vue:** `base: "/<repo>/"`.
   - **Next.js:** `basePath: "/<repo>"` (+ `assetPrefix`).
   - **MkDocs:** `site_url: https://fairyfox.io/<repo>/`.
   - **Doxygen / static output:** ensure links are relative, or rooted at
     `/<repo>/`.
3. **Do NOT add a `CNAME` file** to the project repo, and don't set a custom domain
   in the project's Pages settings. It inherits `fairyfox.io` from the user site;
   claiming the apex again conflicts (see gotchas).
4. **Verify** the site loads at `https://fairyfox.io/<key>/` with the theme intact
   (CSS/fonts resolving) over **HTTPS**, and that "Enforce HTTPS" is on once the
   certificate covers it.
5. **Point the registry at it.** Set `docs: https://fairyfox.io/<key>/` (and
   `repo:`) in the project's `_data/projects.yml` entry **and** keep
   `hub/registry.yml` in step, so the main site links *in* correctly.

## Gotchas

- **No CNAME in the project repo.** A `CNAME` file (or a Pages custom-domain
  setting) on a project repo tries to claim the apex/host for that repo and
  collides with the user site. Project sites inherit the domain — leave their
  domain config empty.
- **The base path must equal the repo slug.** If `baseurl`/`base` is missing or
  wrong, the page loads but **CSS, fonts, and links break** — which specifically
  defeats the seamless theme. `key` = repo slug = path = base path; keep all four
  identical.
- **HTTPS.** The user-site certificate covers the domain; project pages under it are
  served over the same HTTPS. If a project briefly shows as HTTP, it's the cert
  provisioning — enable Enforce HTTPS once it lands.
- **404s** under `/<repo>/` are served by the **project's** Pages site, so give each
  docs site its own themed 404 page if the generator supports it.

## Relationship to the rest of the standard

This file is the "how it's hosted" companion to the "how it looks and links"
spec in [`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md).
Publishing on the shared domain is what turns same-origin cross-links into a truly
seamless transition — different host = a real boundary no amount of theming hides.
Adoption/sequencing: [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)
and the lifecycle runbooks.
