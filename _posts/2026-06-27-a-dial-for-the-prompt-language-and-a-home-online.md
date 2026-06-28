---
title: "A dial for the prompt language, a home for it online, and a phantom force-push laid to rest"
subtitle: "Random AI Prompt moves through 2.7.26–2.10.4: CodeMirror DPL editors, keyword tooling, a redesigned provider header, an intensity dial with a content refactor across all five categories, and a stripped generate-only build now hosted at prompt.fairyfox.io. Meanwhile the hub traces its recurring force-push complaint to a shallow clone and removes the workaround (0.9.6)."
date: 2026-06-27
tags: [random-ai-prompt, fairyfox-io, site, update]
---

A busy day on one project and a quiet, clarifying one on the hub. [Random AI
Prompt](/projects/random-ai-prompt/) spent the day turning a working
image-generation tool into a comfortable one — better editors, better controls,
a real dial on the prompt language — and then put a slice of it online. The hub
spent the day undoing a mistaken belief about its own plumbing.

## The prompt language gets a dial

The headline change is the **DPL intensity dial** (2.10.0). A `{#name}` reference
can now carry an intensity percentage — `{#great-bridge 25%}`, 1–100, defaulting
to 50% when unspecified — that flows down into the generator and shapes what comes
out. Lines can gate on it in their weight slot (`[<10%] - grass`, with the full set
of comparisons and stackable conditions), probability gates and the `repeat` / `one
of` / `N of` counts auto-scale with it, and text can interpolate it directly through
an `{intensity}` keyword in tiny/small/normal/large/huge wording or as a raw number,
each accepting a relative `±NN%` nudge. It turns "more or less of this" from a manual
edit into a control.

Landing the dial came with a **content refactor across all five categories** — scene,
fragment, subject, style, and prompt. Generators were de-scattered so they stop
pulling in unrelated material (a knight no longer drags in a whole landscape; a beach
stops wandering into a city), render-farm filler was stripped, a run of long-standing
typos was fixed, `anime-irl` was renamed to `anime-realism`, and the pools were made
intensity-aware. The default wrapper was cleaned up in the same spirit (2.10.2),
dropping the generic "masterpiece / best quality" boilerplate, with the `{#rays}`
lighting token restored to its end afterward (2.10.3). A nested-token leak that the
refactor surfaced was fixed at its root: auto-appended effects and artists now
re-resolve their own nested references.

## A more comfortable editing surface

Around that, the web app's editing surface matured across several smaller releases.
The prompt, negative, and wrapper boxes became **CodeMirror editors** with DPL syntax
highlighting and brace-aware autocomplete (2.7.26). Category sidecars gained a
`priority` for ordering the block pills and an `nsfw` flag that hard-hides a generator
when the content switch is off (2.7.27). The result view and gallery picked up polish —
a corner live-preview, click-to-copy prompt rows, and consistent hover actions on
gallery thumbnails (2.7.28). A **keyword toolbar** backed by a real parser arrived
alongside a DPL insert bar for snippets (2.8.0). And the top bar was **redesigned**
(2.9.0): provider selection moved into a single Providers dropdown with two rich
pickers (image and text) and per-provider BYOK key fields that share one key when the
same provider is chosen for both, the provider's own knobs moved into a gear popover,
and the negative prompt moved onto a Prompt/Negative switch in the composer.

## …and a home online

The day also gave the tool a public face. The online build is a **stripped,
generate-only variant** (2.7.29): built with the online flag set, the SPA drops the
Gallery/Single tabs and the adult-content switch, forces SFW, and never touches any
image feed or storage — generated images stay in memory. Local-only features are now
shown as **disabled, with a link to the full version**, rather than hidden (2.10.4),
and the Netlify build was pointed at the post-split `engine-v3/gui` paths and deployed.
That build is live at [prompt.fairyfox.io](https://prompt.fairyfox.io); the full,
local build — gallery, conversion, and all — is unchanged and still the way to run it
with everything.

## A phantom force-push, laid to rest

The hub's own work was a correction. For a few cycles the cross-project sync standards
claimed the hub's `dev` branch "is force-pushed routinely," and told every reference
mirror to refresh with a shallow `--depth 1` pull and, when that aborted, to fall back
to a destructive `reset --hard`. None of that held up. The hub's `dev` is provably
append-only — old markers are all still ancestors of the current tip, and a hard rule
already forbids force-pushing it. The real cause of the aborts was the **shallow clone
itself**: a depth-1 mirror has no merge base, so a clean fast-forward fails with
"refusing to merge unrelated histories," which the procedure had been misreading as a
rewrite. After unshallowing, the same refresh fast-forwards cleanly and the old tip is
confirmed a true ancestor of the new.

So the workaround came out (0.9.6). Reference mirrors are now single-branch,
**full-history** clones, the refresh is a plain `fetch` + `merge --ff-only`, and a
refusal to fast-forward is treated as an anomaly to diagnose — almost always a leftover
shallow mirror, occasionally a genuine rewrite worth stopping for — never a routine to
reset through. The change swept through the sync standards, the lifecycle runbooks, the
templates and READMEs, and the hub's own adopted copy. It's a smaller diff than it
sounds; mostly it removes instructions that should never have been there.
