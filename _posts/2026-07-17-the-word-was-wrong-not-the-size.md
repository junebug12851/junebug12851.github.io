---
title: "The word was wrong, not the size"
subtitle: "Pokered Save Editor 2 ships every map's story stages as data, settles a UI precedence fight by reusing a rule already on the screen, corrects a unit it had been miscalling for months, and pulls its whole Qt toolchain into line — which finally let the build's own safety checks run and surface a use-after-free that twelve releases had carried. Fairy Fox Games opens a hidden layer under its oldest space game; Fairy Fox Stories watches its own formula repay a debt and finish two books in one run."
date: 2026-07-17
tags: [pokered-save-editor-2, fairyfox-games, fairyfox-stories, update]
---

Yesterday was about taking confident claims to the cartridge and letting the check win.
Today is the quieter sequel to that: a day about calling things by the right name, and
about the best answer usually being one already sitting on the screen rather than a new
rule invented to fight the old ones. Pokered Save Editor 2 spent the day on exactly that —
a precedence rule reused instead of reinvented, a unit renamed rather than resized, a whole
toolchain pulled level so its own checks could finally speak. Fairy Fox Games found the
hidden layer under its oldest game by reusing a pattern it already had, and Fairy Fox
Stories watched its picking formula pay back a debt it had promised the day before.

## Pokered Save Editor 2: progression, shipped as data

The big brief was every map's default states across the game's progression — what a map
looks like before the gym leader and after, before the rival ambush and after, at each
point the story moves it — computed so the editor can roll a map forward or back one stage
at a time, build a proper destination when the player changes maps, and hand the randomiser
whole legal states instead of loose bytes.

The finding that shaped it is that a map's script value is *not* its state. Every gym rests
at the same script number on both sides of its leader; the stage that actually changed is
the flags and the badge, not the byte. So a stage is the script value **plus** the absolute
set of event flags, the absolute visibility of every missable, and the badges — and the
result ships as data: ninety-eight per-map blueprints, a hundred and ninety-six resting
stages, thirty-four story maps hand-curated straight off the game's own scripts. The
disassembly has no format for this at all; it exists only as executable assembly, so the
blueprints are a genuinely new artefact, extracted by a tool that can re-derive them and
check itself against what it produced. No application code was touched — the day's UI work
sits on top of this, next — and the test suite stayed at 91 of 91.

While it was in there, one plainly-named correction: on the map screen "map script" now
reads "map state", because that is what it is.

## Pokered Save Editor 2: whose click wins

The map canvas has a real problem. Sprites, warps, signs and the player are already
selectable and draggable, and now a grid of flag boxes lies over all of them. When two
things occupy the same spot, which one does a click reach? Three candidates were drawn up,
and each invented a new, invisible precedence rule to arbitrate — click the top layer, or
click the object first, or let the box always win.

The chosen answer was none of them. Hovering reaches everything overlapping, so nothing is
ever buried; a click's priority is simply **the order of the layers panel already on
screen** — the same list the user can see and reorder; and each layer's little colour tab
is an escape hatch you can click *and drag* to reach its spot directly, whatever sits on
top. It is worth naming why this is better than all three candidates it replaced: it
invents nothing. It reuses a rule that is already visible and already under the control of
the very person who just hit it, so precedence is inspectable and re-orderable rather than
hidden in the code. And because drag lives on the tab, the risk that a buried object becomes
undraggable simply evaporates — there is no exception to special-case, because the general
rule already covers it. The strongest answer was the one that added the least.

## Pokered Save Editor 2: the word was wrong, not the size

A smaller question — what unit are the boxes on the map measured in? — turned into a
correction that had been overdue for a while. Checked against the disassembly rather than
settled by preference, it turns out there are **three** units, not two. Tiles are 8×8 and
carry tile attributes: collision, ledges, water, warp tiles. Blocks are 32×32 and carry the
map's shape and its connections. And in between is the half-block, 16×16, which is where
nearly everything the editor boxes actually lives: objects, warps, signs, hidden items and
coins, and the coordinate triggers for scripts.

The game proves the middle unit outright — it takes the low bit of a walk coordinate to
decide *which half of the block you are standing in*, an operation that is meaningless
unless that coordinate counts half-blocks. Which means the boxes already shipping were the
right size all along; the project had just been calling them "tiles". Worse, its own notes
had carried a sentence that contradicted itself inside its own parenthesis — "gameplay
happens at the tile level (you walk in half-blocks = 2×2 tiles)" — almost certainly the
source of the blocks-versus-tiles muddle in the first place. The fix was to rename, not to
resize: a first-class half-block row in the reference, the low-bit proof written down, and
the self-contradicting sentence retired. Nothing on screen moved a pixel; the vocabulary
just stopped lying.

## Pokered Save Editor 2: one toolchain, and what its checks had been hiding

Yesterday's build was found broken on the release compiler — a call that only exists in Qt
6.9 and later, compiling fine on the local 6.11 kit and never on the machine that pins
6.8.3. Rather than hold the program back to match the older build machine, the toolchain was
brought the other way: 6.11 everywhere, kit and container and CI all on the same version.
That branch earned its keep in thirty-five seconds by failing to even install Qt on Windows
— the download layout had been reorganised at 6.11 — and the diagnosis of *why* is the part
worth keeping. The obvious read was that the installer simply couldn't do 6.11 yet; its
newest published release was over a year old. But a big ecosystem having no answer is a
smell, not a finding, and ninety seconds of looking turned up the fix: merged into the
installer four months ago, just never cut into a release. Pinned to that exact commit, the
install works. "The latest release can't" was never the same statement as "can't".

The same lesson had a twin one layer down. Three tests were failing in the Linux container,
recorded as the container "lacking the ROM and emulator" — and the truth was the exact
opposite. Host scratch files had been copied in, so a Windows Python build was physically
present, and the test that guards on emulator availability was checking whether a **file
existed** rather than whether the interpreter would **run**. On Linux the Windows file was
right there, so the gate answered "available" and then tried to execute a Windows binary. An
availability check that tests for a path instead of a capability passes in exactly the
environment it was written to protect. It now spawns the interpreter and demands it actually
runs.

With the toolchain level and the container fixed, the build's own safety nets ran for the
first time since version 0.29.0 — and they had four real things to say. The serious one was
a heap-use-after-free in the music parser: a label passed by reference into a list that
grows, so appending to the list frees the very reference still being read. It never crashed,
because freed memory usually still holds what you left in it, which is precisely what makes
the class dangerous — and it had ridden along in twelve releases because the one local tool
that would have caught it could not start, and the remote that would have caught it could
not build. Taken by value, plus a null-dereference guard, a dead check that was hiding a
missing bounds test, and a needless copy. Green, at last, on every path.

## Fairy Fox Games: what was under Orbit Slingshot

The collection's growth lever is now depth *inside* a mechanic, and **Orbit Slingshot** was
the oldest game still without the layer — and, like the last one, it carried the exact
plateau the pattern is meant to cure: its pickup radius shrank with each stage and then
simply stopped, flattening the one thing you could feel. Four additions went in, all on the
single hold-to-thrust verb, all safe to never notice (`0.23.2`). The pickup radius now rides
a smooth curve that keeps tightening instead of hitting a floor. **The Kiss** is a hidden
razor window *inside* the normal close pass — thread it and you take a bonus, a gold ring,
and a streak. Chain three kisses and **the Aurora** opens: a few seconds over the planet
where every point doubles. And past the visible end sits a secret **Interstellar** stage,
unlisted, revealed only by reaching it.

None of it is a new copy of the reference build — it is the reference build's *shape* poured
into Orbit Slingshot's own physics, the same way each earlier game got the layer. Ten new
tests, the collection green at 572, and the depth layer now sits under five of the thirteen
games, with two more carrying it from birth.

## Fairy Fox Stories: the blend repays its debt

Yesterday a random roll overruled the story farm's ranking and pushed the least-complete
book, *The Blindfold Act*, out of its slot — a consequence recorded plainly and left to
stand. Today the formula collected the debt. With no override firing on any of the three
slots, the blend ran clean, and *The Blindfold Act* came back at the highest single pick
score the farm has ever recorded and led the run comfortably. The other two slots went to
two nearly-finished books purely on how long they had been waiting — which is the entire
reason the "how stale is it" half of the formula exists, because without it a book stuck at
five-of-six chapters never actually finishes. Both of them did, on the same run: the shelf
went from one completed book to three.

The run also turned a standing promise into an enforced check. The farm's integrity test
could catch a book marked "complete" with chapters missing, but not the opposite — a book
that quietly stays "growing" after its final chapter lands, sitting in the grow pool forever
and never reaching the sequel stage. Today was the first run that could have produced one, by
finishing two books at once, so the check now derives each book's state from the chapters
actually on disk and makes shipping the wrong one impossible. It cannot set the state; it
just refuses to let a wrong one through. That is the same instinct as the rest of the day, a
floor down from the code: the safest place to keep a rule is somewhere it can be checked, not
somewhere it has to be remembered.
