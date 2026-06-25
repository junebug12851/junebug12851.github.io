---
title: "Random AI Prompt: a readable language for dynamic prompts"
subtitle: "Designing and building DPL — a Markdown-like language for the generators — and making a new v3 catalog the default."
date: 2026-06-21
tags: [random-ai-prompt, update]
---

The most ambitious thread in
[Random AI Prompt](https://github.com/junebug12851/random-ai-prompt)'s revival is
**DPL**, a Dynamic Prompt Language. The generators that build prompts had always been
hand-written JavaScript. DPL is a Markdown-readable language so they can be authored
and read by people who don't write code — with a JavaScript escape hatch kept for the
genuinely logic-heavy ones.

## Why a language at all

A "dynamic prompt" assembles a prompt from optional pieces, weighted choices, and
references to word lists. Expressing that in JavaScript means every generator is a
small program, which is fine for a programmer and opaque to everyone else. The goal
was a format where the *structure* of a prompt is visible at a glance.

## What DPL looks like

Here's a complete generator — the city street scene — verbatim:

```text
---
description: A city streetview
---
Start
===
city, streetview, {city}
- {style/building}
- cityscape
- downtown

{#nature}, {#weather}, reflective street
```

The pieces are deliberately plain: front matter for metadata, a `===` heading for a
section, a plain line that's always included, `- bullet` lines that are optional
(50% by default), `{list}` to pull from a word list, and `{#generator}` to call
another generator. Probabilities and repetition read naturally too:

```text
Start
===
- {art-movement}
- {art-technique}
- 50% repeat 0 to 3 times: {image-effect}
- {#rays}
```

And explicit either/or branching:

```text
Start
===
portrait
- maybe: full body
- otherwise: head and chest, upperbody
- up-close
```

## Logic stays in JavaScript

A core design decision is that DPL is *data, not code* — it has no variables or
counters. Anything that genuinely needs logic delegates to a referenced JavaScript
file, so the `.dpl` stays declarative:

```text
---
description: A subject — animal, character, flower, instrument, creature, tree, or person
script: entity.js
---
```

The bridge works in both directions: DPL can call into JS, and JS can call back into
DPL sections. About 90% of the catalog ended up as pure DPL; the rest keeps a thin
`.js` sidecar.

## A weighted layer tree

Underneath, v3 changes the model. The older generators built an ordered string where
position carried meaning. v3 treats every file, section, and line as a *layer* in a
tree — the user's prompt box is the root, each building block a child — and renders by
sorting each layer's children by weight rather than by where they appear. Auto-weights
start at 1000 and increment per line; an explicit `[n]` overrides:

```text
Start
===
[100] wide shot, dramatic lighting   # low weight → sorts to the front
ancient forest, morning mist         # auto-weighted (1000, 1001, …)
```

## Built in phases

To protect a working app, this shipped in phases: (1) the parser and renderer plus a
test harness, with sample generators converted; (2) the entire existing catalog
converted to DPL; (3) wiring DPL into the live engine and both loaders, making the new
v3 catalog the default; and (4) the wrapper UI — a start/end frame applied around
every prompt. The frozen v1 and v2 generations remain fully functional, addressed by a
path prefix:

```text
{#cave}        → v3 (the default)
{#v2/cave}     → the frozen v2 version
{#v1/castle}   → the frozen v1 version
{#any}         → pick one generator at random from the v3 catalog
```

The "full versus partial prompt" distinction that drove a lot of duplication in the
old system is on its way out, which was the underlying goal all along.

### References

- [Random AI Prompt repository](https://github.com/junebug12851/random-ai-prompt) ·
  [documentation site](https://fairyfox.io/random-ai-prompt/)
- DPL design and language notes:
  [`reference/dpl-design.md`](https://github.com/junebug12851/random-ai-prompt/blob/main/notes/reference/dpl-design.md),
  [`reference/dpl-language.md`](https://github.com/junebug12851/random-ai-prompt/blob/main/notes/reference/dpl-language.md)
- Prior art: [sd-dynamic-prompts](https://github.com/adieyal/sd-dynamic-prompts) (the wildcard/variant idea in the wider ecosystem)
