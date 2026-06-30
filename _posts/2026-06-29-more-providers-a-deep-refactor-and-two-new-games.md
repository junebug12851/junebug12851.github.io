---
title: "More providers, a deep refactor, and two new games"
subtitle: "Random AI Prompt has its biggest day yet — 2.15.0 through 2.28.18: the interface goes multilingual, the single-image view gains real actions, the provider set roughly doubles and grows a whole AI upscale/enhance row, and then the codebase is taken apart floor-up into tested modules, capped by a memoization that makes prompt generation ~280× faster. Fairy Fox Games ships two more games — Orbit Slingshot and Polarity — and the hub finishes wiring the games repo in as a tracked node."
date: 2026-06-29
tags: [random-ai-prompt, fairyfox-games, fairyfox-io, site, update]
---

A heavy day across the mesh. [Random AI Prompt](/projects/random-ai-prompt/) moved
a remarkable distance in one stretch — from `2.15.0` to `2.28.18` — adding capability
on top, then rebuilding the structure underneath. [Fairy Fox
Games](/projects/fairyfox-games/) added two more games, and this site finished
bringing that repo in as a first-class node.

## The interface learns other languages

The prompt tool's web app became **internationalized** (2.15.0): its strings now go
through react-intl and FormatJS, so the entire interface can be translated rather than
being hard-wired to English. It is the kind of change that touches almost every
component at once but shows nothing on the surface until a locale is added — the
groundwork for the app to speak more than one language.

## The single-image view grows up

The dedicated single-image view gained the actions it was missing. First (2.16.0) came
**re-roll and variation** — regenerate a prompt fresh, or nudge an existing one — with
each result keeping a **tracked ancestry** back to what it came from, plus a Markdown
export. A second round (2.17.0) added inline actions, live derived strips, a resizable
layout, a "View Raw" mode, and uniform locks, so the view reads and behaves
consistently with the rest of the app.

## A wave of providers — and upscaling joins generation

The biggest visible jump was the provider set. The app already dispatched prompts to a
range of image generators; over the 2.18–2.28 line that roughly doubled and grew a new
dimension. An **AI upscale / enhance framework** landed first (2.18.0) with an NSFW
soft-lock, then a dedicated **Upscaler / Enhancer row** in the UI and a steady run of
providers to fill it — DeepAI, Picsart, Segmind, the local Stable Diffusion stack
(A1111, Forge, SD.Next, ComfyUI), Clipdrop, Venice, and a set of async-job enhancers
(WaveSpeed, Claid, Deep-Image, neural.love, VanceAI, Leonardo, Replicate). A parallel
batch added text (prompt-rewrite) providers, reaching **18 in total** (2.27.0–2.28.0).
The through-line: generation is no longer the end of the road — a finished image can be
sharpened in the same app, and far more services are reachable for both jobs.

## Then the floor is rebuilt — with tests under it

With the surface that broad, the back half of the day was a deliberate **refactor**
(Phases 4–6) that took the largest files apart into focused, individually testable
modules — the Home image-batch flow, the 900-line single-image view, the Manage tab's
tree CRUD, the list manifest, the content-safety lexicons, and the DPL language
tooling. The discipline worth noting is that previously-untested logic landed its
**test net at the same time** it was extracted, rather than after: the Manage tree, the
wrapper presets, the list-editor ops, and the dev-server API helpers all gained unit
suites as they moved. Alongside it, a **Lighthouse polish** pass took SEO and
Accessibility to 100 and Performance to 97, backed by real meta tags and a CI gate so
the scores can't silently regress.

The day closed on a profiling win: the data loaders had been redoing their entire
static catalog on *every* generated prompt. Memoizing the directory walks and the
keyword vocabulary cut a single `generate()` from roughly **56 ms to 0.2 ms — about
280× faster** — with no behavior change, because the loaders only ever read a catalog
that's fixed for the life of the process.

## Two more games

[Fairy Fox Games](/projects/fairyfox-games/) shipped two new games the same day,
taking it from `0.2.0` to `0.4.0`. **Orbit Slingshot** (0.3.0) is a gravity game: hold
to thrust a probe around a planet, sweep the targets, and avoid both crashing and
escaping — its pure core runs a symplectic-Euler integrator with a 600-tick
orbit-stability test among its 16. **Polarity** (0.4.0) is a charge-match runner: flip
between cyan and magenta to match each incoming gate, where a clash ends the run and
the pace keeps climbing, with a 2000-tick buffer-integrity check in its 15-test suite.
Both follow the house pattern — a tested logic core split cleanly from a thin rendering
shell — so however small the game, it ships to the same bar as the rest of the mesh.

## The hub finishes wiring the games in

On the hub side, the day before's work to register Fairy Fox Games as an integrated
node was completed (0.9.10–0.9.12): a full-history reference clone added under
`assets/references/`, a tracking entry in the round-up markers, the project card and
node page reconciled to the real repo state, and the planned player page renamed from
`/fun/` to `/games/`. The games repo is now read on the inbound side like the other
siblings — which is exactly why its two new games could be picked up and written about
here.
