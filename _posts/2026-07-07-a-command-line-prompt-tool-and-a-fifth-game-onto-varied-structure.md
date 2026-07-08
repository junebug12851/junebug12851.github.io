---
title: "A command-line prompt tool, and a fifth game onto varied structure"
subtitle: "A quieter day than the one before it. Random AI Prompt gains a full command-line edition — the prompt CLI — that reuses the same engine, providers, and on-disk store as the app, then retires an old randomization knob and lifts the shared seed logic into one place. Fairy Fox Games brings Symmetry onto the varied-structure standard, the fifth of eleven games to make the move."
date: 2026-07-07
tags: [random-ai-prompt, fairyfox-games, update]
---

After a busy 2026-07-06, the mesh settled into two threads on 2026-07-07:
[Random AI Prompt](/random-ai-prompt/) added a whole new way to run it, and
[Fairy Fox Games](/fairyfox-games/) grew one of its games onto the collection's
current structure standard.

## Random AI Prompt: a command-line edition

Random AI Prompt has been offered as a hosted site and a desktop app; it now also
has a **command-line tool** (`2.50.0`). The `prompt` command is a traditional
arguments-and-flags CLI — no interactive mode — where every capability is a
subcommand: `generate` (the default, with a flag for each engine setting plus
provider, image, and rewrite options), `list`, `config`, `keys`, `rewrite`,
`upscale`, and `completion`. It ships a `--help` page, coloured output, and shell
completion for bash, zsh, fish, and PowerShell.

The design goal was parity without duplication: the CLI runs the **same engine,
providers, settings, and on-disk store** as the web and desktop editions rather
than a parallel copy. Prompt generation goes through the shared engine; a Node
provider registry discovers the same provider definitions the app uses; and for
image, upscale, and rewrite work the CLI runs the real backend in-process so each
provider's own code runs unchanged and images land in the shared output folder
with the same metadata the gallery reads. Keys are shared between the CLI and the
app, and CLI defaults are kept in their own namespace so they never clobber the
app's settings. One safeguard is worth noting: a paid API provider is only ever
called when you explicitly ask for images, so a plain text generation never spends
credits.

The same day retired an old control. The **`chaos` knob** — a pre-DPL idea for
scaling a prompt's whole randomization envelope at once — had already been unmounted
from the interface and was never an engine setting; `2.50.1` removed the last of it
from the web facade and the CLI. Default output is unchanged, confirmed by the
snapshot tests. In the same pass the duplicated seed and re-roll logic was lifted
into a single **engine-owned module** that the web app and the CLI now share, so
the rules for turning a seed into a prompt live in one place instead of being
re-implemented per edition.

## Fairy Fox Games: Symmetry onto varied structure

[Fairy Fox Games](/fairyfox-games/) brought **Symmetry** onto the varied-structure
standard (`0.19.3`), the daily growth job's main lever. Its spawn had been a flat
per-tick coin-flip between a twin and a single at a random lane — workable, but
textureless. A run is now a seeded **sequence of named cadences** drawn from a
stage-weighted pool: *Mirror* (a calm on-ramp), *Reflection* (a rewarding run of
twins), *Cascade* (a tightening stream), *Weave* (flowing centre-to-edge swings),
*Split* (the game's signature mirror tradeoff delivered as a fast snap across the
field), and *Kaleidoscope* (the dense late crescendo). Each cadence is gated by a
minimum stage, so climbing the stages visibly opens the pool and the meaner
cadences arrive later — progression drives the variety rather than random noise.
The notable cadences flash a quiet peripheral cue as they begin; the calm ones pass
silently. The change added eight pure-core tests (the collection stands at 369
green) and was previewed in the browser before release. That makes five of the
collection's eleven games now on varied structure.
