---
key: fairyfox-games
---
Fairy Fox Games is a collection of small, self-contained **canvas games** — the
one-mechanic, *beat-your-own-score* kind, with a fresh polished experiment joining
most days. It is integrated with this site: a **Games page** at `/games/` will embed
the games in a player you can play without leaving, and each game also lives at
`fairyfox.io/fairyfox-games/<game>/`.

However simple a game is, it ships to the same bar as the rest of the mesh. Every
game splits a **pure logic core** (`*.core.js` — plain data and pure functions, no
DOM or canvas) from a thin **rendering shell** (`index.html`), so the simulation can
be unit-tested headlessly. Each ships a real, multi-layer **test suite**
(`node --test`, zero dependencies) and its own short README. That separation is what
keeps a game from *looking* like it works while actually being broken.

It is a public, contribution-friendly project: bug reports, new-game ideas, and pull
requests are all welcome, and the existing games are maintained as first-class — not
left to rot. The first game is **Ink Bloom**: steer a steadily growing line, drink
glowing motes to grow, and don't cross your own trail — the longer you survive, the
less room you leave yourself. **Echo Chamber** followed: a timing game where you catch
an expanding echo as it crosses the target band, the window tightening with every hit.
Then **Orbit Slingshot**: hold to thrust a probe around a planet, sweep the targets,
and don't crash or fly off into the void. And **Polarity**: a charge-match runner where
you flip between cyan and magenta to match each incoming gate — a clash ends the run,
and it keeps speeding up.
