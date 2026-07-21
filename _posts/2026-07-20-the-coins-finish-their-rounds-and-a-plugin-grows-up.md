---
title: "The coins finish their rounds, and a plugin grows up in a day"
subtitle: "The reading coin the hub minted reaches the last of the fifteen games and joins the story reader, so the reward is now everywhere it was meant to be. A Minecraft plugin onboarded only hours earlier is rebuilt from a two-file port into a tested, pluggable, mesh-standard project — and picks up the site's first-ever project category on the way in. Pokered Save Editor 2 takes its own name off its credits."
date: 2026-07-20
tags: [papermc-despawned-items, fairyfox-games, fairyfox-stories, pokered-save-editor-2, site, update]
---

Yesterday the hub minted a small coin you earn for reading around the mesh, and every project
pulled the standards for it in the same day. Today the visible half caught up: the coin reached
the one game that had been held back and joined the story reader, so the reward now lives
everywhere the plan wanted it. Alongside that, a plugin that had joined the hub only that morning
spent the rest of the day growing from a thin port into a real, tested project — and its arrival
gave the site its first project category. The through-line is the same as the mesh always aims
for: shared things spread on their own, and a new node is held to the same bar as the old ones
from its first day.

## DespawnedItems: a plugin grows up in a day

The plugin is a modern rewrite of a 2021 hobby project — it catches items about to despawn on a
Minecraft server floor and relocates them into nearby containers, cookers, entities or empty
space instead of letting them vanish. A Kotlin/Paper rewrite and the mesh onboarding had landed
just before, and the site registered it that morning at v1.0.2, essentially a working two-file
plugin. By the end of the day it was at v1.3.4, and almost none of that was surface.

The engine was rebuilt underneath the same behaviour. An indexed location store replaced a linear
scan, so lookups are constant-time however many despawn spots a server defines; persistence moved
off the main thread and became incremental; and a throttled scheduler bounds how much relocation
work happens per tick, which is what makes the plugin safe on a busy server rather than only a
quiet one. Storage stopped being a single flat file and became pluggable — YAML by default, with
SQLite and MySQL/MariaDB backends loaded at runtime and a migration path between them. Server
owners got per-user caps through ordinary permission groups, and a set of real correctness fixes
went in along the way: recycle rewards now survive on the item itself, data-bearing particles no
longer crash on load, and a reload actually re-reads the config.

The retarget is a good illustration of the working posture the mesh keeps. Rather than hold the
plugin back to an older platform, it moved *forward* — off the pre-release Paper 26.1 / Java 25 it
had been drafted against and onto the current Paper 1.21.11 / Java 21, with the toolchain
provisioning the JDK itself; the existing code compiled with zero API changes. Around all of it a
JUnit 5 and MockBukkit test suite of roughly fifty tests now gates the build, the commands were
modernised to Paper's Brigadier API, and Ktlint / Detekt / Kover quality gates run in CI. Then the
project turned outward: a Dokka documentation site wearing the shared fairyfox chrome, a package
namespace moved to `io.fairyfox.papermc.despawneditems`, and a full audit against the hub's
standards that adopted branch protection, PR-based releases and build-provenance attestation on
its first release through the protected path. A node one day old now follows the same rules as the
projects that wrote them.

## Fairy Fox Games: the coin reaches the last game

The in-game coin rollout that began the day before finished today, across the back half of the
collection in five small batches and one special case. Every game now earns the same bounded
coin — a little for reaching a new stage or setting a new record, capped a few times a day, on top
of the shared reward for simply opening the page — and every game offers one optional, purely
cosmetic "fun mode" you can spend a coin on for a single run. The pattern is deliberately strict:
a fun mode is a drawn overlay only, so the run that earns a record plays exactly as it always did
and records stay honest; it is hidden until you have coins, it never gates play, and it respects a
reduced-motion preference.

The last game was the interesting one. Reprise, a call-and-echo game, had been held back because
the fun mode its design wanted was an audio "Choir" layer the games have no engine for. Rather
than ship an audio dependency for one game, it got a visual **Light show** instead — every pad
that lights, in the call and in your echo, throws a burst of sparks over an untouched board. That
took the rollout to fifteen of fifteen: coins are now in every game, with no game carrying a
dependency the others don't.

## Fairy Fox Stories: the coin joins the reader, and a wind gets an ear

The story farm did the visible half of its own coin adoption — the part it had deliberately
deferred the day before until a session with a browser attached, because the mesh now shares a
rule that a UI change may not ship unseen. The coin counter joins the reading chrome just left of
the "Aa" reader button, first-view-today pays a coin, and a longer chapter read to the end pays a
small bonus; the coin CSS reuses the reader's existing themed panel, so it adapts across every
theme, and the Privacy, Cookies and Terms pages were updated to disclose the local store and link
the shared explainer rather than re-host it. It was built and checked in a live browser session,
which is exactly the gate that had held it.

The same day, the farm's daily automation grew a chapter in the book that needed it most. The
blend that picks which story to advance ran without a random override and landed on *The Hundredth
Wind*, the least-tended book on the shelf, exactly as the prior day's forecast had it. The second
chapter, "The Ear of the House", sets out its showman's three laws and plants the proof that the
book's seventh chapter will turn on — a wind is proved once, at the buyer's own threshold.

## Pokered Save Editor 2: the name comes off

The save editor's work today was small and entirely about voice. A pass took the personal name out
of the project's own identity — its copyright line, its credits, and the scattered first-person
ownership in its documentation all became attributions to Fairy Fox — and a stray typo in its
documentation domain was corrected so its docs resolve cleanly at
`pokeredsaveeditor2.fairyfox.io`. No feature changed and the version held steady; it is the same
neutral-voice discipline the site keeps, applied to the app's own front matter.

## fairyfox.io: a new plugin, and the first project category

The hub's own work today was to receive DespawnedItems properly. It went into both registries with
its flags honestly set, its read-only mirror was cloned for future round-ups, and it took a place
on the home and projects pages with its own icon and accent. The more structural piece is that it
arrived as the first of a *kind*: a new optional `category` field groups projects that share a
family, and DespawnedItems opened a dedicated "PaperMC Plugins" section on the projects page,
sitting alongside the Farms group and excluded from the flat grid there. The home page is
unchanged — it still lists everything in recent-update order — and the Projects menu stays dormant,
reserved until there is more than one category to navigate between. More PaperMC plugins are
expected under the same heading.
