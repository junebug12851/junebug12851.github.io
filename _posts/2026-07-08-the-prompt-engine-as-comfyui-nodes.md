---
title: "The prompt engine as ComfyUI nodes, and a sixth game onto varied structure"
subtitle: "Random AI Prompt gains a fourth way to run: a ComfyUI custom-node target that drops the prompt engine straight into an image-generation graph, backed by new headless prompt routes. Fairy Fox Games brings Orbit Slingshot onto the varied-structure standard."
date: 2026-07-08
tags: [random-ai-prompt, fairyfox-games, update]
---

A day after the command-line edition landed, [Random AI Prompt](/random-ai-prompt/)
added another target — this one aimed at people who already have an image pipeline —
and [Fairy Fox Games](/fairyfox-games/) grew another game onto its structure standard.

## Random AI Prompt: a ComfyUI target

ComfyUI is a node-graph front end for image generation: you wire boxes together, and one
of those boxes has to produce the prompt. Until now that meant copying a prompt out of
Random AI Prompt and pasting it in. `2.51.0` adds a **`targets/comfyui/` custom-node
target** — the prompt engine as Comfy nodes, so a prompt is generated *inside* the graph
and feeds the sampler directly. The set includes the generator plus batch, combine, and
show helpers, an example workflow, a status sidebar, and node descriptions and tooltips
so the nodes read like native Comfy nodes rather than a bolted-on port.

Underneath it, the app grew **headless prompt routes** (`/api/prompt` and
`/api/prompt/catalog`, including presets) — a plain HTTP surface over the same engine, so
the Comfy nodes talk to the real thing instead of re-implementing it. That is the same
principle the CLI followed the day before: one engine, many front doors.

The target was fitted to the Comfy ecosystem rather than mirroring the app's own UI —
the rewrite feature was dropped, configuration moved into Comfy's own Settings, and the
app URL there now actually drives generation. Pre-release hardening closed a path-traversal
hole in the preset loader, rejected non-HTTP app URLs, and surfaced catalog warm-up
failures instead of swallowing them. A follow-up (`2.51.1`) fixed the DPL editor's gutter
and active-line highlight, which had been leaking CodeMirror's light defaults into dark
mode.

Alongside the code, the project wrote up a **maintenance-sweep runbook** — the periodic
pass that reconciles a project's own status notes with what has actually shipped — and
proposed it to the hub as a shared standard. It is queued for the hub's inbound review
with the other process reports.

## Fairy Fox Games: Orbit Slingshot onto varied structure

[Fairy Fox Games](/fairyfox-games/) brought **Orbit Slingshot** onto the varied-structure
standard, the sixth of its eleven games to make the move. As with the others, a run stops
being a flat sequence of randomly-placed challenges and becomes a seeded sequence of
**named formations** drawn from a stage-weighted pool, each gated by a minimum stage — so
climbing visibly opens the pool rather than simply speeding it up. The gravity game's
character comes from the shapes it can now hand you, not from the pace alone.
