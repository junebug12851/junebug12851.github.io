---
title: "Random AI Prompt: a full test suite, and back to shipping"
subtitle: "Vitest and Playwright land, then a long-stalled CI pipeline is unbroken so the stable branch can move again."
date: 2026-06-22
tags: [random-ai-prompt, update]
---

[Random AI Prompt](https://github.com/junebug12851/random-ai-prompt) closed out its
revival sprint with the two things a modernised project needs most: real tests and a
working release path.

## From a smoke test to a real suite

Until now the project had only linting and an import smoke test. It now has layered
coverage — Vitest for the Node engine and the React app, Playwright for the browser:

```text
$ npm test
✓ lint (0 errors)
✓ smoke (module graph + all prompts)
✓ vitest  — 88 node + 30 web   (118 passed)

$ npm run test:e2e
✓ playwright — e2e + visual + a11y   (8 passed)
```

The browser specs include visual-regression snapshots (with the random suggestion
masked so the page is stable) and accessibility checks via `@axe-core/playwright`.

## The landmine worth documenting

The most instructive detail: the underlying utility library captures the global
random function at import time, so you *can't* make its randomness deterministic by
overriding `Math.random` in a test:

```js
// Does NOT work — lodash already captured Math.random on import
Math.random = () => 0.42;
expect(_.sample(list)).toBe(list[0]);   // still random

// What the tests do instead: assert invariants, not exact picks
const out = expandPrompt("{#city}");
expect(out).toMatch(/streetview/);          // structure is stable
expect(out.split(",").length).toBeGreaterThan(2);
```

Only the language's own renderer, which uses its own seeded RNG, is driven
deterministically. (Getting the browser tests to launch on the dev machine was its
own saga, ultimately solved by pointing Playwright at the system Chrome.)

## Unbreaking the pipeline

With tests in place, the focus turned to shipping. The stable branch had been held at
the pre-revival state, and recent commits were red in CI — not from test failures, but
from the install step:

```text
npm error code EUSAGE
npm error `npm ci` can only install with an up to date package-lock.json
npm error Missing: @emnapi/core@1.11.1 from lock file
```

The lockfile had drifted after the new dependencies came in, and an *incremental*
`npm install` on the Windows machine omitted the Linux-only optional packages that CI
needs. The fix that actually works is a clean, full resolve so every platform's
optional dependencies are recorded:

```sh
rm -rf node_modules package-lock.json
npm install        # fresh resolve records @emnapi/*, linux-* bindings, etc.
npm ci             # now passes the sync check
```

Once green, the stable branch fast-forwarded to the current work for the first time in
the revival — which promptly exposed two more first-time deployment breakages in the
docs and release workflows, both fixed. A recurring theme of the week held to the end:
the failures were almost never the code itself, but the build, packaging, and tooling
around it.

### References

- [Random AI Prompt repository](https://github.com/junebug12851/random-ai-prompt) ·
  [documentation site](https://fairyfox.io/random-ai-prompt/)
- [Vitest](https://vitest.dev/) · [Playwright](https://playwright.dev/) ·
  [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright)
- [`npm ci`](https://docs.npmjs.com/cli/v10/commands/npm-ci) (why a clean lockfile matters in CI)
