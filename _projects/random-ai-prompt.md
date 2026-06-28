---
key: random-ai-prompt
---
Random AI Prompt turns small, composable rules into rich, varied text prompts. Its
**dynamic-prompt language (DPL)** makes generation controllable rather than purely random —
with OR-groups, weighting, an **intensity dial** (`{#name NN%}` with intensity-aware
conditions and auto-scaling), and reusable lists. As of 2.7.0 the repository holds two
separate engines: the active **engine-v3** — an isomorphic core driven by a React + Vite
web app, with SFW/NSFW gating and a Vitest test suite — and a frozen **engine-v1-2**
snapshot that preserves the original CommonJS CLI and classic web UI. Through the 2.7.x
line the web app grew an **image-generation layer**: prompts can be dispatched to a range
of hosted and local providers (OpenAI, Stability, Replicate, fal.ai, Gemini, Grok,
FLUX/BFL, Ideogram, Leonardo, NovelAI, ComfyUI, Forge/SD.Next, Midjourney, and a plain
copy-out), with an optional AI rewrite pass, a central output folder, and a built-in
photo gallery with per-image metadata and a dedicated single-image view. The web app's
editing surface matured alongside it — CodeMirror DPL editors, a keyword toolbar, and a
Providers dropdown with per-provider keys — and a stripped, generate-only build is hosted
online at [prompt.fairyfox.io](https://prompt.fairyfox.io).
