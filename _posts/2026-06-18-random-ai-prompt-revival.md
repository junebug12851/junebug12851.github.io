---
title: "Random AI Prompt: a 2026 revival — ES modules, Node 24, and full docs"
subtitle: "A dormant 2022 prompt generator is modernised to ES modules on Node 24, reorganised, and documented end to end."
date: 2026-06-18
tags: [random-ai-prompt, update]
---

Attention this week turns to the other project in the hub:
[Random AI Prompt](https://github.com/junebug12851/random-ai-prompt), a JavaScript
prompt generator for Stable Diffusion. It was largely a late-2022 / early-2023
effort — a substantial one — and then sat dormant until now. This day was its
revival: dragging the codebase onto current tooling without changing what it does.

## From CommonJS to ESM

The starting point was a 2022 CommonJS codebase. The target was ES modules on
**Node 24**, the active LTS, with every dependency moved to its current major. The
entry points opt in through `package.json`:

```json
{
  "type": "module",
  "engines": { "node": ">=24" }
}
```

The bulk of the conversion — around 123 files — was done with two throwaway
codemods (`module.exports = function` → `export default function`,
`require("x")` → `import x from "x.js"`), then the trickier ~28 files were finished
by hand. A couple of genuine ES-module pitfalls came out of it and are worth
keeping.

The sharpest one: **imports are evaluated before top-level statements.** The old
code changed the working directory at the top of `common.js`, but under ESM that
line would now run *after* the settings module had already been imported and read
its config file:

```js
// Old (CommonJS): ran early enough to matter
process.chdir(__dirname);
const settings = require("./settings"); // reads ./user-settings.json

// New (ESM): the chdir moves into its own module, imported first
import "./chdir.js";          // performs process.chdir(...) on load
import settings from "./settings.js";
```

A second one: the generators are loaded by path inside synchronous string-replace
callbacks, so switching them to `await import()` would have meant rewriting the
whole pipeline. `createRequire` preserves the synchronous behaviour exactly:

```js
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const generator = require(generatorPath).default;
```

## Proving the port changed nothing

A modernisation is only worth anything if it's behaviour-preserving, so that was
checked rather than asserted. An import smoke test loads the entire module graph,
pulls in all 113 dynamic-prompt generators, and expands a sample prompt:

```text
$ npm run smoke
✓ module graph loaded (152 files, node --check clean)
✓ 113 dynamic prompts loaded
✓ promptSuggestion() ran; {#random} expanded
```

The tree was then reorganised so that **all code lives under `src/` and all prompt
content under `data/`**, with runtime and user data left at the root. That's a
careful change, because the loaders resolve paths relative to files, not the working
directory. To prove nothing was lost, the original pre-revival source was pinned as
a read-only snapshot and diffed against the current tree:

| Category        | Original | Current | Result            |
|-----------------|---------:|--------:|-------------------|
| dynamic prompts |      113 |     113 | none dropped      |
| prompt modules  |        5 |       5 | none dropped      |
| lists           |       61 |      61 | none dropped      |
| expansions      |        9 |       9 | none dropped      |
| presets         |       26 |      26 | none dropped      |

All 96 curated data files matched the original line-for-line; of 158 shared code
files, the differences were either formatting or understood, deliberate refactors.

## Documentation, end to end

Finally, the project was brought up to the same management system as its sibling —
living notes, a single-source version number, a documentation site, and CI/release
workflows. The documentation went all the way to per-function coverage across the
server engine, all 113 generators, the classic frontend, and the React web app,
settling on JSDoc with the notes wired in as tutorials — one site of around 244
pages.

### References

- [Random AI Prompt repository](https://github.com/junebug12851/random-ai-prompt) ·
  [documentation site](https://fairyfox.io/random-ai-prompt/)
- [Node.js release schedule](https://nodejs.org/en/about/previous-releases) (Node 24 "Krypton" LTS)
- [`node:module` `createRequire`](https://nodejs.org/api/module.html#modulecreaterequirefilename) ·
  [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JSDoc](https://jsdoc.app/)
