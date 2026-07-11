---
title: "The prompt tool goes mobile, and the story farm starts running"
subtitle: "Random AI Prompt starts a fifth edition — a native Android app — on a foundation that proves its catalog is byte-identical to the web's. Fairy Fox Stories gets the automation that actually makes it a farm. Pokered Save Editor 2 fixes a save-file truth, and the site tidies its project cards."
date: 2026-07-09
tags: [random-ai-prompt, fairyfox-stories, pokered-save-editor-2, site, update]
---

Four of the five nodes moved on 2026-07-09, and the largest thread by far was a new
edition of [Random AI Prompt](/random-ai-prompt/): the prompt tool on a phone.

## Random AI Prompt: an Android app, built on a parity proof

A mobile build of a tool like this can go wrong in a predictable way — it becomes a
second, thinner app that slowly drifts from the real one. The work started by making that
drift *detectable* instead of trusting discipline. Before any screen was built, the
project added a **Metro catalog generator** and a loader that bundles the same content the
web app uses, plus a check that runs both loaders side by side: 89 blocks, 88 lists, and
150 seeded generations must come out identical. The phone build draws from byte-identical
content, and the build fails if it ever stops doing so.

On that foundation the app came together quickly: an Expo scaffold with the engine
compiling to Hermes, then a full four-tab app — Generate, Gallery, Single, Manage — built
to the same 100,000-image load bar the web app holds. The interface was then reworked to
match the web app rather than look like a generic mobile port: the same design tokens, the
same top-bar navigation and composer, the real logo, a working overflow menu, the DPL
Insert menu, a live preview, the Blocks/Lists palette, and the completion strip. Theming
(System/Dark/Light plus the accent picker) and the language picker came across too, so the
appearance controls behave the way they do on the desktop.

The functional layers followed: the whole provider data layer (image, text, and upscale),
a grouped three-role provider picker, API keys for bring-your-own-key image generation, the
local-direct providers reachable over Wi-Fi, and a Gallery rebuilt for parity — search,
multi-select, bulk delete, image metadata, and a memoised cell that holds up at the stated
maximum load. A **surface-parity gate** ties it together: each web capability is a marker
the mobile build must satisfy, so a missing feature fails the build instead of quietly
lingering as a gap.

## Fairy Fox Stories: the farm actually runs

[Fairy Fox Stories](/fairyfox-stories/) arrived last week with a shelf of five illustrated
books and a written cadence — grow the existing books, plant a new one every few days — but
nothing was actually running it, so the shelf sat still. `0.2.1` added the scheduled daily
job: **grow two books every day, plant a new one once three days have passed**, then publish
to the live site. The grow count is now a single number in the operating model rather than a
range in prose. `0.2.2` put the collection's emblem to work — an open book sprouting a plant
over a shelved library — in the landing masthead, as the publisher logo in the site's
structured data, and as the default social-share card, which shared links previously lacked
entirely.

## Pokered Save Editor 2: a save-file truth

[Pokered Save Editor 2](/pokered-save-editor-2/) resolved a question about how the game
stores a single-typed Pokémon. Red and Blue give every Pokémon two type bytes; a
single-typed one repeats its type in both. The editor had been treating the second type as
genuinely absent in that case, so a written save could disagree with the cartridge's own
convention. Single types now write as a duplicate of type one — the game's truth, not the
editor's model of it.

## The site: a cleaner project card

The project cards here dropped their description into a corner **"?"** (`0.15.4`). The card
had been carrying a three-line blurb that pushed the useful parts — name, lifecycle,
version, activity, links — apart; the description is now one tap away and the card reads at
a glance.
