---
title: Deployment
nav_title: Deployment
category: standards
order: 13
summary: Where each kind of project deploys — static content to GitHub Pages on the shared domain, built apps to Netlify, with games as a recorded exception.
---

Projects deploy to one of two places, picked by what the project *is*. The canonical
machine copy of this standard is in the repository at `hub/standards/deployment.md`.

## The policy

- **Static content → GitHub Pages, on the shared domain.** Sites, documentation, and
  static collections are served at **`fairyfox.io/<key>/`** — every repo's Pages site
  is served under the user-site's custom domain (see
  [domain & publishing](/docs/docs-site/)). This is *same-origin*, so the page is a
  true page **of** fairyfox: shared chrome, working cross-links, no host boundary.
- **Built / runnable apps → Netlify.** Anything with a real build or run step (a
  bundled app, a server, its own toolchain — for example Random AI Prompt) deploys to
  Netlify, the better home for building and running apps. A Netlify app lives on its
  own host (such as a `*.fairyfox.io` subdomain), so it is made seamless by wearing the
  shared site chrome rather than by sharing an origin — an accepted trade-off for apps.

When unsure: if it's static, it's Pages on the shared domain. Reach for Netlify only
when the project genuinely needs a build/run host.

## The games exception

**fairyfox-games** is runnable — you play the games — but it is a static collection
that is part of the site, not a built app. So it deploys to **GitHub Pages at
`fairyfox.io/games/`, alongside docs**, with no Netlify and no subdomain. Serving it
same-origin is what makes the Games nav item land on what looks like just another page
of fairyfox.

Exceptions like this are deliberate and recorded: an exception is made only when the
owner and Claude agree, and the reason is written down. Exceptions are never inferred
silently.
