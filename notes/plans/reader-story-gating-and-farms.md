# Plan — reader story-gating + the "Farms" dropdown

_Target: 0.16.0 (MINOR — a reader-behaviour change + a nav restructure, mirrored into
the shared chrome bundle). Started 2026-07-18._

## Decisions

- **Story-page signal = `data-story` on `<html>`.** A page opts in with front matter
  `story: true`; `_layouts/default.html` renders it as `<html … data-story>`. Chosen
  because the pre-paint script in `<head>` runs before `<body>` exists, so the signal
  must live on the `<html>` element it can already read. It's a framework-agnostic
  contract every sibling can satisfy (their book/chapter layouts emit `data-story`).
- **The hub has no real story pages** — `/stories/` and `/games/` are redirect stubs to
  the sibling sites. So on the hub, line-spacing + width stay **locked everywhere**, with
  the note. That is exactly the ask: "individual updates [the sibling repos] should be
  where they un-disable" — fairyfox-stories enables them on its reading pages when it
  re-adopts the chrome.
- **Text size is always on and always applied** (per the correction). Only **line
  spacing** and **width** are gated.
- **Locked, not hidden:** the two controls stay visible but disabled (greyed, inert) with
  a small note "Enables when reading a story."
- **Farms** groups **Stories** + **Games** under one dropdown, using the existing `.dd`
  markup (`nav.js` already drives `details.dd`). The nav *items* are unchanged — same
  destinations, now grouped — so the mesh "fixed nav" contract is restated as
  `Home · Projects · Farms (Stories · Games) · Docs · Updates · About`.

## Work breakdown (by file)

**Site (live master — the feature):**
- `_layouts/default.html` — `<html lang="en"{% if page.story %} data-story{% endif %}>`.
- `_includes/head.html` — pre-paint: apply `--reading-lh`/`--reading-width` only when
  `data-story`; text size always.
- `assets/js/reader.js` — `apply()` gates lh/width on `data-story` (else `removeProperty`
  → CSS default); panel locks the two sections + shows the note when not a story page.
- `_includes/header.html` — Farms `<details class="dd">` between Projects and Docs.
- `assets/css/main.css` — `.ff-rp-note` + `.ff-rp-sec.is-locked` styles.

**Vendored chrome bundle + standards (the consistency mandate):**
- `chrome/header.html`, `chrome/head.html`, `reference/chrome.html`,
  `reference/main.css` — mirror the above (static/absolute form).
- Nav-set prose: `01`, `04`, `05`, `08`, `12`, `chrome/README.md`, `reference/README.md`.
- `12-shared-chrome.md` — document the `data-story` reader contract + Farms.
- `chrome/VERSION` → `2.0.0` (a copy projects already vendored — header/head/reader —
  must change by hand: MAJOR).

**Notes:**
- `VERSION` → `0.16.0`; changelog atop `notes/version/2026-07.md`; session log
  `notes/sessions/2026-07/2026-07-18.md`; refresh the reader/nav lines in `status.md`.

## Verify

- `bundle exec jekyll build` green; headless screenshot of a normal page (controls
  locked + note) and confirm text size still works.
- `git status` before/after; stage only my files; PATCH-style direct `dev → main` is for
  patches — this is MINOR, so release via a `release/0.16.0` branch per git-flow.
