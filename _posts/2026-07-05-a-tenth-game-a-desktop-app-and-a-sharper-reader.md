---
title: "A tenth game, a desktop app, and a sharper reader"
subtitle: "Fairy Fox Games reaches 0.16.3 with Arc, its tenth game, and a shift to varied, progression-first runs under a new AI-managed game-farm framing. Random AI Prompt ships a pre-built desktop edition and rebuilds its documentation site. And fairyfox.io itself reworks the shared reader into a proper appearance menu."
date: 2026-07-05
tags: [fairyfox-games, random-ai-prompt, site, update]
---

Three projects moved on 2026-07-05. [Fairy Fox Games](/projects/fairyfox-games/) added
its tenth game and changed how a run is shaped; [Random AI Prompt](/projects/random-ai-prompt/)
turned outward, shipping a downloadable desktop edition and a rebuilt docs site; and the
site itself reworked the reading controls it shares across every fairyfox.io page.

## A tenth game, and runs that vary

The tenth game is **Arc**, and its verb is *judging power* — distinct from the collection's
steer, time-a-catch, thrust, flip-match, aim-and-bounce, stack, keep-aloft, balance, and
mirror. A launcher fires at a fixed forty-five degrees; you hold to build power and release
to lob, aiming to land on a pad. There is no aim and no bounce — only how long you hold. The
depth is a precision combo: a centre bullseye doubles the score, consecutive lands grow a
multiplier, and a miss both breaks the streak and costs one of three lives, so every throw is
a safe-versus-greedy read. Arc ships to the full quality bar the collection holds to — a
pure, tested core (the landing formula decides the outcome; the drawn arc is cosmetic and
lands exactly there), an external render shell with a boot fallback, twenty-six tests, and
the same staged escalation, badges, and meta-progression as the rest.

The larger change was to how a run *feels*. The games all used randomness, but it was
textureless — a random gate or a random start never changed a run's shape, so once you had
played a game once you had, in effect, always played it. The fix was **varied structure**:
a run is now a seeded sequence of named formations drawn from a stage-weighted pool, so the
skeleton of each run differs and climbing the stages introduces the harder variations rather
than just turning up the speed. **Polarity** was the reference build for the pattern, and
**Echo Chamber** followed, its independent random targets replaced by named cadences that
unlock as you climb. Two player-facing surfaces landed alongside: a viewable **changelog**
and a homepage "recently updated" strip, both with relative dates, so the growth is visible
from a fresh play instead of hidden in the tests.

With that, the collection took on a new public framing: an **AI-managed game farm**, where
new games are *planted* and existing games *grow*. The automation split to match — one task
plants a new game every few days, another grows one existing game onto the progression
pattern each day — so there is no longer a forced daily new game, only steady, quality-gated
motion. The repo ended the day at `0.16.3`.

## Random AI Prompt, pre-built and better documented

Random AI Prompt spent the day making itself easier to actually get and read about. The
headline (`2.43.0`) is a **desktop edition** built on Tauri: a thin native shell that runs
the unmodified local app and its Node backend as a bundled sidecar, with no application logic
duplicated, preserving user data across upgrades. It arrives as part of a wider reframing —
every edition is now offered **pre-built**, so the hosted online site, a self-hostable copy
of that online build, and the desktop installers are all interchangeable artifacts of one
codebase. Download it or build it; the README leads with that choice rather than treating the
built-from-source version as the "real" one.

The rest of the day rebuilt the documentation site (`2.43.1` and the unversioned work before
it). The JSDoc-generated docs took on the fairyfox.io header and an organized submenu to
match the sibling projects, self-hosted their fonts to drop the last third-party call, and
gained a comfortable centred reading column, softer light and sepia themes, and a Kindle-style
reader menu. A pass for search and accessibility followed — descriptions, canonical and
social tags, a sitemap and robots file across every generated page, and an accessibility
sweep to a WCAG 2.1 AA bar with zero automated violations in light and dark. Finally the site
adopted the hub's shared chrome and reader menu directly, moving to the same versioned
storage key the rest of the mesh uses so a reading choice carries across every fairyfox.io
page. The README and a new contributing guide were rewritten in plain, factual prose, with
the screenshots recaptured at a uniform height.

## A sharper reader for the whole site

The site's own work went into the reading controls it shares with the project docs. The
reader panel was rebuilt from a plain row of buttons into a proper appearance menu — a titled
panel with grouped sections and a reset — after the first cut read flat and its size and
spacing controls did not visibly do anything. The theme control became a segmented row of
weather-and-time icons (a sun for light, a sunset for sepia, a moon for dark) with an Auto
toggle; the muddy tan sepia was reworked into a classic warm parchment, clearly distinct from
the neutral light theme; and the accent picker was pruned to a curated, refined set with a
clean reset chip. The blog picked up the same care: a post's colour and label now come from
its first project tag rather than whichever project happened to sort last, and the secondary
tags render as tidy coloured chips. All three themes were retuned for real contrast and
verified open in light, sepia, and dark.
