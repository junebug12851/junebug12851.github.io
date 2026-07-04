---
title: "An eighth game, and a modernized release signature"
subtitle: "Fairy Fox Games reaches 0.12.0 with Poise, a balance game built around a ball on a tilting beam, plus a near-miss nudge added to Skyline. Random AI Prompt spends the day on release plumbing — getting 2.41.0 to actually publish, then moving its signing onto cosign 3.x Sigstore bundles."
date: 2026-07-03
tags: [fairyfox-games, random-ai-prompt, update]
---

A quieter day after the responsive rebuild — one new game and a round of release
plumbing. [Fairy Fox Games](/projects/fairyfox-games/) moved from `0.11.2` to `0.12.0`
with an eighth game, and [Random AI Prompt](/projects/random-ai-prompt/) stayed at
`2.41.0` while sorting out how its releases get signed.

## Poise: a ball on a tilting beam

The eighth game is **Poise**, and its verb is *balance*. You tilt a beam left and right
— arrow keys, A/D, or a slide on touch — to keep a rolling ball from falling off, then
roll it over a target to score. The ball keeps its momentum through each catch, and
targets can sit out near the dangerous ends of the beam, so a point is a genuine
risk-and-reward decision rather than a sure thing. Gravity ramps stage by stage
(Steady, Wobble, Sway, Pitch, Tempest), so control gets twitchier the deeper you go.

Like the rest of the collection, Poise ships as a pure normalized core with no DOM,
canvas, or timers — the ball's position runs from −1 to 1 — wrapped in an external
render shell with a boot-failure fallback, and it carries the full growth stack: the
staged HUD chip and tinted frame, nine skill-safe badges, and a lifetime record. It
lands with 25 tests, including a controllability test and a regression that pins the
resting ball against drift. **Skyline** grew a little too: a near-miss line now surfaces
an honest "N floors short of your best — so close!" on runs that come within a few
floors of a record. The collection is at 244 tests.

## Getting 2.41.0 out the door

Random AI Prompt's day was spent below the product surface. The `2.41.0` merge to `main`
had cut the release, but the workflow failed at the keyless signing step: the installer
was pulling cosign 3.x, which changed the signing output format and broke the old
detached-signature flags — and because signing runs before the publish step, no release
was actually created. The immediate fix pinned cosign to the 2.x line so `2.41.0` could
publish with the signature files consumers expect.

That pin was then resolved properly. Signing now runs on **cosign 3.x**, emitting a
self-contained Sigstore bundle per asset as `<asset>.sigstore.json` — a name OpenSSF
Scorecard's Signed-Releases check recognizes, so the score holds while the older
detached `.sig` and `.pem` pair is dropped. The cosign version is pinned for
reproducibility, and the verification instructions and deployment notes were updated to
match. A routine in-range bump of the SPA's build tool rounded out the day. All of it was
CI and tooling, so the version number stayed put.
