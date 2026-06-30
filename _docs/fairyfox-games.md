---
title: Fairy Fox Games
nav_title: Fairy Fox Games
category: projects
order: 4
summary: A monorepo of small, self-contained canvas games — pure, tested logic split from rendering.
---

Fairy Fox Games is a collection of small canvas games — the one-mechanic,
beat-your-own-score kind, with a fresh experiment joining most days. It is a tracked
node in the mesh and is integrated with this site: a Games page embeds the games in a
player, and each game also lives on its own at `fairyfox.io/fairyfox-games/<game>/`.

## How it's built

- Every game splits a **pure logic core** (`*.core.js` — plain data and pure
  functions, no DOM or canvas) from a thin **rendering shell** (`index.html`), so the
  simulation can be unit-tested headlessly.
- Each game ships a real, multi-layer **test suite** (`node --test`, zero
  dependencies) and its own short README — the same engineering bar as the rest of the
  mesh, however simple the game.
- The games are static and published by GitHub Pages, served under this domain.

## Full documentation

The project publishes its own documentation site (themed to match this site) and is
developed in the open:

- Documentation site: <https://fairyfox.io/fairyfox-games/>
- Notes: <https://github.com/junebug12851/fairyfox-games/tree/main/notes>
- Repository: <https://github.com/junebug12851/fairyfox-games>
