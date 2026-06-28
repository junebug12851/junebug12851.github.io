---
title: Random AI Prompt
nav_title: Random AI Prompt
category: projects
order: 3
summary: A JavaScript generator for random and dynamic text prompts, built around a dynamic-prompt language.
---

A JavaScript tool for generating random and dynamic text prompts. It began as a
way to produce fully random prompts and grew into a configurable generator built
around a controllable dynamic-prompt language (DPL), with a range of controls
over the output.

## What it does

- Generates prompts from curated word lists and dynamic-prompt generators —
  from fully random to tightly controlled.
- Composes output through the dynamic-prompt language (DPL): pick-one groups,
  weighting, an intensity dial, and reusable lists that resolve to one concrete result.
- Drives generation from a React + Vite web app, and can dispatch the result to
  a range of image-generation providers, keeping a built-in gallery of what it
  makes. (The original CLI is preserved, frozen, in the `engine-v1-2` snapshot.)

## Full documentation

The project publishes its own documentation site (generated API documentation plus
its living notes), served under this domain, and is developed in the open:

- Documentation site: <https://fairyfox.io/random-ai-prompt/>
- Notes: <https://github.com/junebug12851/random-ai-prompt/tree/main/notes>
- Repository: <https://github.com/junebug12851/random-ai-prompt>
