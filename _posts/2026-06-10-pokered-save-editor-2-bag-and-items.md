---
title: "Pokered Save Editor 2: bag drag-and-drop and careful item handling"
subtitle: "The items list gets the same drag interactions as the box grid, plus auto-stacking that never loses an item."
date: 2026-06-10
tags: [pokered-save-editor-2, update]
---

The drag interactions added to the Pokémon box grid came to the items list this day
in [Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2).
You can reorder items within a list and transfer them between the Bag and PC storage
by dragging a left grip handle — the handle exists so the row's own quantity and
selection controls keep their clicks. Per-row delete chips and checkbox group actions
replaced the bulk-action footer.

## Transfers that never lose an item

The interesting design work was making transfers safe against the game's per-slot cap
of 99. The rule has three outcomes, and "lose some of the stack" isn't one of them:

```text
drag item (amount N) onto a matching item in the destination pane:

  fits under 99?        → fold onto the existing row (auto-stack)
  would overflow?       → keep the full amount as its own second row
  no room for a row?    → refuse the transfer (item stays put)
```

So a transfer never clamps or silently drops items — it stacks, splits, or declines.
The item dropdown also greys out items already present in the same pane and shows the
total owned across both panes next to each name:

```text
POTION        (x12)
SUPER POTION  (x3)
ULTRA BALL    (x99)
```

## A "View All" overview drawer

The bag gained a "View All" overview: a slide-in panel with a condensed, alphabetised
table of every item the save holds and its counts in the Bag and in storage. It
started as a standard drawer component, but that left a stubborn white frame nothing
could kill, so it was rebuilt as a hand-rolled slide-in panel for full pixel control —
a recurring trade in this UI work, where a framework component is dropped the moment it
fights back harder than rolling the thing by hand.

One smaller item: the in-app Credits screen is now a living document, updated as the
project changes rather than after the fact, and it acknowledges the development tooling
used in the 2026 revival.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [Gen 1 item storage & the 99 cap](https://bulbapedia.bulbagarden.net/wiki/Bag) (Bulbapedia)
