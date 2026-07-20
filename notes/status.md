# Project Status

_Current state only._ For the chronological history see [`sessions/`](sessions/README.md);
for the commit-by-commit changelog see [`version.md`](version.md).

**Version:** `0.20.0` (single source of truth: repo-root `VERSION`; see
[`reference/versioning.md`](reference/versioning.md)).

## Current state (read this first)

**The site is live** at the **`fairyfox.io`** custom domain (2026-06-22), served over
HTTPS with **Enforce HTTPS on** (the Pages API reports `html_url: https://fairyfox.io/`,
`https_enforced: true`). It's a clean, custom Jekyll build — no external theme — deployed
to GitHub Pages by GitHub Actions on every push to `main`.

**The GitHub account is `1fairyfox`** (renamed from `junebug12851`, swept through every
current-state file in `0.15.9`; dated history left as it was). The follow-on that had been
left open — **renaming the hub repo to match** — was taken by Fairy Fox on **2026-07-18**:
`junebug12851.github.io` is now **`1fairyfox.github.io`**, a GitHub *user site* again. This
resolved a **site-wide 404** (`fairyfox.io/fairyfox-stories/` had gone dark after the account
rename, with the apex sitting on a repo that was no longer a user site). Everything is reached
through the custom domain, and `fairyfox.io/<key>/` resolves for every project. The site's
data, docs and standards were reconciled to the new name in `0.16.1`; the local git remote may
still use the redirecting old URL, and each sibling repoints its vendored chrome-pull URL as it
re-adopts. See [`decisions/architecture.md`](decisions/architecture.md).

The site is framed as a **project hub + documentation library** for Fairy Fox's
work, written in a neutral documentation voice (not first-person, not glorifying;
see [`context/principles.md`](context/principles.md)). The **warm rebuild is live**
through the `0.4.x` line; it now includes:

- The **warm visual design** (0.4.x): a warm palette with a Fraunces/Inter/JetBrains
  type system, light and dark each designed (not one inverted), full-width section
  bands, focus-visible outlines, and a reduced-motion guard — tuned to **WCAG 2.1 AA**.
- A **portal home**: a hero beside a static **activity panel** (a 30-day commit chart
  + a scrolling "Recently" ticker), both rendered at build time in Liquid from
  `_data/pulse.yml` (no client JS), plus a single-column "Recently" list.
- **Standardized project cards** (lifecycle badge · version · activity, sorted
  newest-first) that are **fully clickable straight through to each
  project's own page** on the domain (`fairyfox.io/<key>/`, repo as the fallback) —
  the hub-local `/projects/<key>/` node pages were **retired in `0.13.0`** (they cached
  detail that went stale; each project explains itself). See the design note below.
  **The home grid shows the standalone tier only** (`0.16.2`): the two **farm** collections
  (integrated tier) and the site's own **(meta)** card were pulled off the home page — the
  farms now sit in a dedicated **Farms** section near the bottom of `/projects/` (with their
  own icons, `assets/icons/{stories,games}.png`), and the meta card stays in the `/projects/`
  grid. The home hero's secondary button now links to the **GitHub profile**
  (`github.com/1fairyfox`) rather than `/docs/`.
- A **shared "Aa" reader menu** (`0.13.0`, redesigned `0.14.0`): a reading control in the
  header — Theme (Auto/Light/**Sepia**/Dark) · an **accent-colour picker** · text size ·
  line spacing · width — saved under a **versioned origin-wide `fairyfox:reader:b` key**, so
  the choice is shared across every fairyfox.io
  site (the hub + each project's docs). Adopted from Random AI Prompt's docs theme and
  codified as a required shared component in `hub/standards/docs-site/`. The button sits
  at the **far right** of the header (past About). **Line spacing + width are story-only**
  (`0.16.0`): they apply and un-lock only on a page that opts in with `data-story` on
  `<html>` (a book/chapter reading page); everywhere else they sit disabled with an
  "Enables when reading a story." note and reading uses the designed defaults. Text size,
  theme and accent apply on every page. On the hub nothing sets `data-story`, so the two
  stay locked here — the sibling reading sites un-lock them when they re-adopt the chrome.
- **Nine cross-brand standards** (`0.18.0`): promoted from an owner-directed deep-read of the
  siblings' `CLAUDE.md` + notes — eight new `hub/standards/` (**testing**, **engineering-quality**,
  **repo-hygiene**, **docs-lifecycle**, **research-capture**, **working-rhythm**,
  **self-hosted-assets**, **farm-operating-model**), each Verify-wired into `compliance.md`, plus a
  standardized **release posture** (RAP's CI-gated PR gate) in `git-workflow.md`. The hub's own
  Google-Fonts/cdnjs hot-link is a recorded self-hosted-assets exception to remediate. Report:
  [`fairyfox-reports/2026-07-19-standards-deep-read.md`](fairyfox-reports/2026-07-19-standards-deep-read.md).
- **Fairy Fox coins** (`0.18.0`): a subtle reading-engagement counter beside the reader
  button (`assets/js/coins.js`), injected by the shared chrome. Opening a page you haven't
  read **today** — anywhere same-origin under fairyfox.io — earns a coin (+1, 10% → +2; a
  1%/repeat-view bonus capped at 10/day), with a playful coin-pop and a mini panel. State is
  the origin-wide `fairyfox:coins:a` key; projects tap `window.FairyFoxCoins` as an **extra**
  reward only — never a gate, never overused, persistence striven for (durability). Governed by
  `hub/standards/coins.md`; explained at `/legal/coins/`. The hub also now serves its own
  `/legal/{privacy,terms,cookies}/` pages (it had none). Chrome bundle → `2.1.0`.
- **Trimmed to the projects** (`0.13.1`): removed the **Downloads** section (page, nav,
  data) and the **duplicated on-site per-project docs** (each project links to its own docs
  from its card); the Projects submenu no longer auto-enables (reserved for future project
  categories); the About page's projects list was dropped as a duplicate of `/projects/`.
  Fixed global nav is now **Home · Projects · Farms (Stories · Games) · Docs · Updates ·
  About** (**Stories** added `0.15.0`, left of Games — a `/stories/` stub →
  `/fairyfox-stories/`; **Stories + Games grouped under the "Farms" dropdown** in `0.16.0`).
- A plain-link header nav (Projects · Updates · Docs; no dropdowns) and an
  **on-site documentation library** (`/docs/`, the `_docs` collection): the ecosystem
  overview, a **"This site"** group surfacing the whole `notes/` tree, the **shared
  standards**, and a per-project doc page.

The rest of the structure is in place end to end:

- **Site:** home, `/projects/`, `/blog/`, `/about/`, a first blog post, RSS feed,
  SEO tags, sitemap. Custom responsive CSS with light/dark.
- **Hub:** [`../hub/`](../hub/) holds the cross-project standards + templates and
  the project registry. This is what other repos pull. The standards now include
  the three lifecycle runbooks (setup · onboard · adopt), a **docs-site design
  system** (`hub/standards/docs-site/`, `0.5.x`) so every project's docs match the
  site, a **full git-flow** model with the `master → main` mandate (`0.6.x`), and a
  **process-reports** standard (`0.7.0`) — nodes write a report after every system
  run, the hub reads them inbound to improve the standards — an **enforcement
  layer** (`0.8.0`): a `## Verify` check on every standard plus a **standards
  compliance audit** (`hub/standards/compliance.md`) that runs them all in one pass,
  and **express authorizations** (`0.9.0`): a tracked ledger
  (`hub/authorizations.yml`) of the user's hub-side go-aheads, so a node adopting a
  change the ledger covers skips its redundant confirmation pause (and only that —
  all other adoption safety stays), and a **first fold-back of node feedback** (`0.9.1`):
  the siblings' process reports drove the force-push-proof refresh, VERSION-anchored
  change detection, a CI-owns-tagging decision, and report-lifecycle fixes across the
  adopt/sync/git-flow/process-reports standards. The **one-seamless-site milestone**
  (`0.10.0`) followed: the docs-site standard now makes every node **appear as a page
  of fairyfox.io** (shared chrome + global nav, the back-button retired for a brand/Home
  way-home, a recommended `.subnav` submenu, a `reference/chrome.html` snippet); two new
  standards landed — **deployment** (static→Pages on the shared domain, built apps→Netlify,
  games the recorded Pages exception) and **planning** (plan-before-execute by default);
  the collection/monorepo shape is a recorded exception; and the old shallow-clone
  refresh prose was purged in favour of plain clones. The **submenu nav** (`.subnav`)
  then shipped site-side (`0.11.0`) — a shared secondary nav row under the primary nav,
  live on the Projects + Docs sections — and the digested report markers were advanced.
  Then a **standards fold-back** (`0.12.0`) adopted Random AI Prompt's six process-report
  proposals as mandatory mesh-wide standards: a **git-workflow fix** (the
  dev-must-contain-main back-merge invariant + a PR-based release path) and five new
  standards — **supply-chain-hardening** (mandatory branch protection, SHA-pinned/least-priv
  workflows, `SECURITY.md`, signed releases), **dependencies** (upgrade aggressively behind a
  real test gate), **legal-docs** (self-hosted, code-accurate Privacy/Terms/Cookies),
  **agent-tooling** (PowerShell not the bash sandbox; `.gitattributes` hygiene), and
  **badges** (the README status-badge set) — each with a `## Verify` slice + compliance row,
  plus six new `hub/templates/`.
  (Remaining follow-up: serving games at `/games/` needs the games repo renamed
  `fairyfox-games → games`, a node-side change — `plans/one-site-and-deployment.md`.)
  **Both siblings are now fully onboarded** (mesh-aware `CLAUDE.md` + a fairyfox-themed
  docs site each): Random AI Prompt (`2.41.0` — the repo split into an active `engine-v3`
  + a frozen `engine-v1-2` snapshot, v3-only; the 2.7.x line built out an
  image-generation layer in the web app — prompts dispatch to 40+ hosted/local providers,
  an AI rewrite pass, a central output folder, and a photo gallery + single-image view;
  the 2.8–2.10 line then matured the editing surface — CodeMirror DPL editors, keyword
  tooling, a redesigned provider header — added a **DPL intensity dial** with a five-category
  content refactor, and put a stripped generate-only build online at `prompt.fairyfox.io`;
  the 2.11–2.14 line made that online build fully static (browser-direct generation), added the
  in-app **Manage tab** that edits the catalog on disk with live hot-apply, and a **focus dial**
  alongside intensity; the 2.15–2.28 line (its biggest day) internationalized the SPA (react-intl),
  gave the single-image view re-roll/variation + tracked ancestry, roughly doubled the provider set
  and added an AI **upscale/enhance** row, then refactored the codebase floor-up into tested modules
  — capped by a loader memoization (~280× faster generation); the 2.29–2.35 line then turned the app
  outward — self-hosted Privacy/Terms/Cookies pages + local fonts (ending the IP-to-Google flow), a real
  release stage for the local edition, in-app dialogs, a seedable/deterministic engine, and a plain-English
  repositioning off SD-first; the 2.35.2–2.38.1 line then rebuilt the styling floor-up into a modular,
  tokenized **theming framework** (System/Dark/Light + 9 accents + importable custom themes, Phases 0–7),
  had the online build **prerender its first paint to static HTML + hydrate** for a big mobile-perf gain,
  and drove **SonarCloud tech-debt to zero** (all 70 code smells + the last bug/2 vulns), alongside a full
  dependency upgrade and a git-workflow back-merge fix; the 2.40–2.41.0 line then rebuilt the
  web app to be **responsive** across phone/tablet/desktop, **flattened the repo** to a single
  project at the root — retiring the `engine-v3`/`engine-v1-2` split — and branch-protected
  `main` with PR releases + signed assets; earlier adopted git-flow with the
  `master` → `main` rename. The 2.50–2.52 line then multiplied its **targets**: a `prompt`
  **CLI**, a **ComfyUI** custom-node target with headless `/api/prompt` routes behind it, and a
  native **Android** app built to strict, gated parity with the web — every edition on the same
  engine, catalog, and store. The 2.53–2.58 line then **de-duplicated** those targets — one
  generated provider registry every runtime imports, the mobile app's 892-line hand-port and five
  drift checks deleted — removed the caps it had been quietly imposing on its own users, and put
  the mobile app in CI; the 2.58–2.60.1 line then **measured** the 1000-prompt promise on a real
  Android runtime rather than asserting it — 253 ms to render, memory flat as the list grows 50× —
  and closed a **critical command injection** in the local backend, found by CodeQL: a filename could
  close the quote in a shell string, so the shell is gone entirely) and Pokered Save Editor 2
  (`0.41.8-alpha`, themed Doxygen docs; a Market **Exchange** and the name entry rebuilt into a real
  **ASDF keyboard deck**, then its biggest day yet — the map screen is now **genuinely emulated** (the
  game's own overworld pipeline, with a legally backed-up cartridge in a headless emulator grading every
  buffer byte for byte), the six **glitch palettes** render as the real article, a **Game Boy sound chip
  + Gen 1's sequencer in C++** play all 46 tracks and their **105 inner voices** with the console
  confirming the engine state frame by frame, and a years-old **save-corrupting bug** (shared collision
  lists walked one step out of phase — a Poké Mart got a bedroom's walls) was found and pinned; then a
  day of **review** (2026-07-13) that filled the towns with people — all 72 overworld sprites, a cast you
  drag in and edit — fixed four inverted sprite enums, established that **indoors there is no sprite set**,
  and reshipped the soundtrack as the game's own `.asm` sheet music; then the map's remaining object types
  (edge connections, wild encounters, per-map script progress) and, on 2026-07-16, the **Event Flags UI**
  over all 2,560 world-event flags — a day that also **refuted its own founding crash case** on the
  cartridge (Route 22's two rivals are masked by an ordered if/else, not conflicting), failed to reproduce
  the "all flags on crashes" claim, found **33 maps with no editor page at all**, built a **dev autopilot**
  that plays the real game, and caught a **release build that had been red since `0.29.0`** on a Qt 6.9-only
  call the local kit always compiles; adopted git-flow + process-reports + compliance +
  express-authorizations on 2026-06-26). The two integrated nodes are Fairy Fox Games
  (`0.23.1` — fourteen games; with the varied-structure rollout complete at 13/13, the current growth lever
  is **depth inside the mechanic** (Polarity the reference build), now on 4 of 13 after **Ink Bloom** gained
  a hidden graze band, a doubling window and a secret stage) and Fairy Fox
  Stories (`0.4.1` — seven books, the newest being **The Blindfold Act**, the shelf's first mystery and
  first non-magical realm; the daily grow/plant automation now actually runs, holds its plant
  when the cadence gate says it isn't due, and lets its random override overrule the blend ranking and
  stand).
- **Notes:** this living-notes system, mirroring the convention used across my
  projects.
- **Sync:** the pull-only cross-project model is documented
  ([`reference/cross-project-sync.md`](reference/cross-project-sync.md)) and the
  two reference repos are cloned under `assets/references/` (git-ignored).

## In flight / awaiting

- **Warm redesign is shipped (`0.4.x`; the repo is now at `0.9.5`).** The design language, the
  **portal home** (hero + static activity panel), the **standardized status cards**, the
  **day-centric updates feed**, the **clickable cards / simpler nav** review pass, and the
  **project node pages** (`/projects/<key>/`) are all live — built increment-by-increment,
  each verified with a local `jekyll build` + headless screenshot. The home/updates/doc
  sections have been polished into one consistent language.
  Direction/plan: [`context/design-direction.md`](context/design-direction.md),
  [`plans/implementation.md`](plans/implementation.md), mockup `mockups/v1-warm.html`.
  **Remaining (the deeper, decoupled machinery, not structure):** the off-site gathering
  layer that generates `_data/pulse.yml` from the projects' real history (it's hand-kept
  for now), and Web-Component live examples (built with Fairy Fox).

- **HTTPS for `fairyfox.io`: done.** The custom domain serves over HTTPS with **Enforce
  HTTPS on** (confirmed against the Pages API, 2026-07-12). Every project Pages site is
  served under the domain too (`fairyfox.io/pokered-save-editor-2/`,
  `fairyfox.io/random-ai-prompt/`, …) — re-verified live after the account rename.

- **Done: the hub repo is renamed.** Fairy Fox renamed `junebug12851.github.io` →
  `1fairyfox.github.io` on **2026-07-18**, restoring the user-site shape and resolving the
  site-wide 404. The hub's own current-state references (projects/registry data, the site
  docs, the docs-site standard + templates) were reconciled to the new name in `0.16.1`; each
  sibling repoints its vendored chrome-pull URL as it re-adopts (the old URL redirects in the
  meantime).

## Next

See [`plans/next-steps.md`](plans/next-steps.md). Headline items: confirm the
first Actions deploy is green, wire DNS for the custom domain, and write the
first real "what changed in my projects" round-up once there's a diff to report.

## Health

| Area | Status |
|------|--------|
| Jekyll config + layouts | ✅ Scaffolded |
| Content pages (home/projects/blog/about) | ✅ Live |
| Pages deploy workflow | ✅ First run green; site live |
| Custom domain | ✅ Live over HTTPS, Enforce HTTPS on (re-verified 2026-07-12) |
| GitHub owner + repo | ✅ `1fairyfox`; hub repo renamed → `1fairyfox.github.io` (2026-07-18), refs reconciled (0.16.1) |
| Local build verification | ✅ `bundle install` + `jekyll build` green (Ruby 3.3.11) |
