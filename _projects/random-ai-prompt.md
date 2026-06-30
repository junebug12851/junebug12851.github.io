---
key: random-ai-prompt
---
Random AI Prompt turns small, composable rules into rich, varied text prompts. Its
**dynamic-prompt language (DPL)** makes generation controllable rather than purely random —
with OR-groups, weighting, twin **intensity and focus dials** (`{#name i25% f80%}` —
intensity auto-scales gates and counts, focus admits or trims surrounding detail), and
reusable lists. As of 2.7.0 the repository holds two
separate engines: the active **engine-v3** — an isomorphic core driven by a React + Vite
web app, with SFW/NSFW gating and a Vitest test suite — and a frozen **engine-v1-2**
snapshot that preserves the original CommonJS CLI and classic web UI. Through the 2.7.x
line the web app grew an **image-generation layer**: prompts can be dispatched to a range
of hosted and local providers (OpenAI, Stability, Replicate, fal.ai, Gemini, Grok,
FLUX/BFL, Ideogram, Leonardo, NovelAI, ComfyUI, Forge/SD.Next, Midjourney, and a plain
copy-out), with an optional AI rewrite pass, a central output folder, and a built-in
photo gallery with per-image metadata and a dedicated single-image view with re-roll,
variation, and tracked ancestry. Generation is no longer the end of the line: a
dozen-plus **AI upscale / enhance** providers can sharpen a finished image, and the web
app's interface is fully internationalized (react-intl). The web app's
editing surface matured alongside it — CodeMirror DPL editors, a keyword toolbar, a
Providers dropdown with per-provider keys, and an in-app **Manage tab** that edits the
prompt catalog (blocks, lists, folders) on disk with live hot-apply — and a stripped,
generate-only build is hosted online at [prompt.fairyfox.io](https://prompt.fairyfox.io).
