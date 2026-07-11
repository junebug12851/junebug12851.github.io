---
title: "Mobile parity, depth inside the mechanic, and a rebuilt trainer card"
subtitle: "Random AI Prompt takes the Android app to feature parity and ships it as 2.52.0. Fairy Fox Games diagnoses why its games go stale after five minutes and builds a fix into Polarity. Pokered Save Editor 2 rebuilds the trainer card and gains a debug harness that hot-reloads without losing your place."
date: 2026-07-10
tags: [random-ai-prompt, fairyfox-games, pokered-save-editor-2, site, update]
---

Every node moved on 2026-07-10, and two of them shipped something they had been building
toward: [Random AI Prompt](/random-ai-prompt/) finished its mobile edition, and
[Fairy Fox Games](/fairyfox-games/) answered a piece of feedback that went deeper than a
feature request.

## Random AI Prompt: the mobile app reaches parity (2.52.0)

The Android app that began the day before was taken the rest of the way. The campaign ran
in phases, each ending with the parity gate tightened rather than a note-to-self.

**Tests first.** A jest-expo and React Native Testing Library harness went in, then
component tests for every screen and menu plus unit tests for the helper libraries — 80
tests by the end, alongside the parity checks and a Node coverage run for the catalog
loader.

**Manage, the last unported surface.** The Manage tab edits the prompt catalog itself, and
it came across whole: a two-root master with a nested **folder tree**, block and list
editors, Sort/Dedupe through the same shared list operations the web uses, descriptions and
Entries/Raw tabs, the DPL Insert menu, an **AI Expand** for lists, and the block editor's
Refine bar with Modify and Draft. The AI prompts behind those are not re-typed for mobile —
a gate asserts the mobile prompt builder is byte-identical to the web's for all seventeen
modes, so they cannot drift. Built-in catalog entries, which cannot be edited in place on a
phone, get an **Override**: copy the built-in into an editable user overlay where it wins.

**The overlay went live**, which is what makes any of it worth doing — custom lists and
blocks now actually feed generation on the device, not just persist. The catalog loader
consults a user-wins overlay that defaults empty, so the byte-identical parity proof still
passes untouched.

With Manage complete, its **strict parity gate was switched on**: 22 markers, one per web
capability, no per-feature exemptions. Tablet layouts landed alongside — a full-width
gallery grid, centred reading columns, and the Single view splitting into two panes with the
image beside its metadata — so no feature is hidden at any screen size. Release hardening
closed a path-traversal hole in the parity dev server and worked through automated review
findings before `2.52.0` shipped.

## Fairy Fox Games: depth inside the mechanic

The owner's feedback was blunt: the games are fun for about five minutes, then stagnate —
"you keep mentioning progression but I don't see it." The diagnosis, written up as a new
reference, is worth repeating because it is a design mistake that looks like progress. The
collection had chased depth with **meta-progression** (invisible on a fresh play) and
**varied structure** (variety at a *fixed intensity ceiling*), while the one axis a player
actually feels — speed — **plateaued**. So after five minutes you had seen the whole
ceiling.

The fix is depth *inside* the moment-to-moment mechanic, and `0.20.0` builds it into
**Polarity** as the reference: the speed curve becomes a smooth asymptote that always still
creeps upward; a tighter inner timing window (**snap**) pays a bonus for a razor-close flip
and builds a streak — the hidden skill-ceiling technique, deliberately never explained; a
snap streak triggers **overcharge**, a short window where every gate scores double and the
field blooms gold; and past the last named stage sits **Supernova**, a secret sixth stage
the start screen doesn't mention. The introduction text was cut to a single line and a hook.
Crucially, none of it adds a control, and all of it is safe not to know — a beginner still
just matches the colour. The layer becomes the collection's lead growth lever, rolling out
one game at a time.

The same day also brought **Arc** onto varied structure, completing that rollout across the
aim-and-precision line (`0.19.5`), gave the collection its own emblem as favicon, social
card, and masthead (`0.19.6`), and decluttered the landing page — each game card's
description moving into a corner **"?"**, exactly as this site's project cards did the day
before (`0.20.1`, corrected in `0.20.2`).

## Pokered Save Editor 2: the trainer card, and a harness for building it

[Pokered Save Editor 2](/pokered-save-editor-2/) rebuilt the trainer card's controls to
match the Pokémon-details screen. The shared randomize button gained an optional trailing
clear segment, so Money, Coins, and the playtime clock now show a single rounded
**[dice | trash]** pill instead of hiding their actions behind a hover menu. The playtime
controls were gathered into a titled **Playtime** box, the Enabled and Paused bits became
real toggles on the card rather than menu items, the card was widened so the clock stopped
overlapping the trainer artwork, and every field's action buttons were aligned into shared
columns (`0.14.4`–`0.14.6`). Underneath, a second save-file fix: `copyFrom` had been writing
Speed stat experience into the special field.

Two of the day's changes were about *how* the work gets done. A **debug-only automation
harness** — command-line flags, a live control channel, and QML hot-reload — now lets the
app be driven and screenshotted while it runs, and the hot-reload was taught to put you back
on the screen you were editing instead of dumping you at the home screen on every save. The
project also made **manual screenshot review a standing default** for interface work: the
clock/artwork overlap above was only caught because a human looked at the picture, which is
a fair verdict on trusting a green test suite for visual work.

## The site

The project cards here finished the pass they started the day before (`0.15.5`–`0.15.7`):
the text tag chips became a compact row of platform and language icons, grouped by kind —
language, then framework, then platform — with a hairline divider between the groups and a
hover label so nothing is ambiguous. The Updated date moved to the base of the card.
