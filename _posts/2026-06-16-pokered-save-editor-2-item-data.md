---
title: "Pokered Save Editor 2: grounding item data in the game's own source"
subtitle: "Splitting the shop's item groups using the original game's disassembly as the authority, plus accented names and detailed tooltips."
date: 2026-06-16
tags: [pokered-save-editor-2, update]
---

A theme running through
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
is that claims about the game should be checked against the game, not guessed. This day
put that into practice on item data.

## The disassembly as the authority

The Market's flat "Normal Items" list was split into meaningful groups, with the
documented Pokémon Red disassembly ([pret/pokered](https://github.com/pret/pokered)) as
the oracle. Two of its data files settle the questions:

- `data/items/prices.asm` — the per-item buy price (sell is half). **A price of 0 means
  the item can't be priced or sold.**
- `data/items/marts.asm` — what's actually stocked; the buyable set is the union of every
  reachable shop's inventory.
- `data/items/vending_prices.asm` — the Celadon roof vending machine (a separate vendor).

The membership sets were transcribed straight from those files into the model, each
index commented with its item name:

```cpp
// indices transcribed from pret/pokered data/items/marts.asm + vending_prices.asm
static const QSet<int> kBuyableInGame = { /* Poké Ball, Potion, Antidote, …,
                                             TMs 01,02,05,07,09,17,32,33,37 */ };

bool ItemMarketModel::buyableInGame(ItemDBEntry *e) {
    return kBuyableInGame.contains(e->index());
}
```

Items group into **Normal** (a shop sells it), **Vending Machine** (the three roof
drinks), and **Special** (priced but no in-game vendor). Items with no price at all are
listed nowhere, because there's genuinely no way to buy or sell them.

## A naming sweep, and the trap inside it

A display-wide sweep corrected "Poke" to the accented "Poké" everywhere user-visible —
Poké Mart, Poké Ball, Pokédex — touching only display strings, never identifiers. That
tripped a subtle trap: one item name doubles as a lookup key in the map data, so
renaming it orphaned a link until the data reference was updated to match:

```text
maps.json:  "item": "Poke Ball"   →   "Poké Ball"   (kept in lockstep with the rename)
```

A reminder that display text and data keys aren't always separable. The editor's target
was also documented explicitly as the US English release of Red and Blue.

## Detailed item tooltips

Finally, the long-deferred detailed-tooltip feature was built as a working vertical
slice: an optional `info` field per item, plumbed through to a tooltip with a title and
wrapped body, with the first eleven items' descriptions authored and checked against the
disassembly. The rest of the items, and wiring the tooltip into the other screens, are
the next steps.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [pret/pokered `data/items/`](https://github.com/pret/pokered/tree/master/data/items)
  (`prices.asm`, `marts.asm`, `vending_prices.asm`)
