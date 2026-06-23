---
title: "Pokered Save Editor 2: chasing 90% coverage"
subtitle: "Pushing every library layer past 90% line coverage flushed out a string of real, user-facing bugs."
date: 2026-06-08
tags: [pokered-save-editor-2, update]
---

With a test suite in place,
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
spent a day pushing all three library layers to or above 90% line coverage. The point
of a coverage push isn't the number — it's that writing tests for the untested paths
forces you to read them, and that reading turns up bugs. It did.

## A dual-type bug, hiding in plain sight

The most consequential one silently dropped the second type of a dual-type Pokémon.
An unconditional branch ran on *every* update, even when no type reset was requested,
so editing stats on a Charizard could quietly strip its Flying type:

```cpp
// before: ran even when resetType == false
else type2 = toType1->ind;          // overwrites the 2nd type with the 1st

// after: only re-derive types when a reset was actually asked for
if (resetType) {
    // ... derive type1/type2 from the species DB ...
}
```

## A wrong operator with real UX impact

"Minimum EVs" was computed with `||`, so it reported true whenever *any* single stat
sat at zero — which greyed out the Reset EVs action on heavily-trained Pokémon:

```cpp
- return hpExp == 0 || atkExp == 0 || defExp == 0 || spdExp == 0 || spcExp == 0;
+ return hpExp == 0 && atkExp == 0 && defExp == 0 && spdExp == 0 && spcExp == 0;
```

A related one: the "is this Pokémon healed?" indicator could never read as healed for
any Pokémon with fewer than four moves, because an empty move slot was being counted
as "not at max PP."

Several null-dereference crashes in the map and area code were fixed too — all behind
the not-yet-enabled Maps feature, so they were caught before that feature ships rather
than after. Each fix landed with a regression test, so the run stays honest:

```text
$ ctest
100% tests passed, 0 tests failed
```

Two smaller quality-of-life changes shipped the same day: item randomisation can no
longer produce a duplicate within a list, and the Bag and Pokémon-storage screens had
a layout cleanup — the two panes now split evenly through a proper layout instead of
hand-tuned anchors, and stored Pokémon names are always visible under each icon rather
than only on hover.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [Gen 1 stats & DV/EV mechanics](https://bulbapedia.bulbagarden.net/wiki/Stat) (Bulbapedia)
