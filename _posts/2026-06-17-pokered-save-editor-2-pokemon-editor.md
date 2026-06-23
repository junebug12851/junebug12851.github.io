---
title: "Pokered Save Editor 2: a redesigned Pokémon editor"
subtitle: "The General, DV/EV, and Moves tabs are rebuilt into one visual language — and a long-standing display bug that showed the wrong types is fixed."
date: 2026-06-17
tags: [pokered-save-editor-2, update]
---

The Pokémon detail editor in
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
was the last major area still carrying its 2020-era layout. This day brought all three
of its tabs — General, DV/EV, and Moves — into the same visual language as the rest of
the app: grouped panels of zebra-striped rows, connected segmented controls instead of
loose buttons and overflow menus, and consistent sizing.

## The bug under the redesign

The General-tab work ended on a real, long-standing bug: the type dropdowns displayed
the wrong type for every Pokémon — a Charizard reading as Ghost/Fighting instead of
Fire/Flying — and "reset to default" appeared to do nothing. A diagnostic test proved
the stored data was correct all along; the combos just *rendered* it wrong.

The cause was an off-by-one. The type list has a "no type" placeholder at row 0, so a
type stored at index `i` lives at model row `i + 1` — but the lookup returned `i`:

```cpp
// TypesModel::valToIndex — "-----" placeholder sits at row 0
- ret = i;        // selects one row early → Fire shows as Ghost, Flying as Fighting
+ ret = i + 1;    // account for the placeholder
```

The first regression test for it was *tautological* — it compared the result against
the same source the method reads, so it passed regardless. It was rewritten to assert
the literal type IDs (Fire = 20, Flying = 2), which is the difference between a test that
guards behaviour and one that just agrees with the code.

## A binding instead of a toggle

The DV/EV tab's "Future Shiny" control highlights a small but useful QML pattern. Shiny
status is *derived* from DVs, so the selection has to mirror live data — dragging the DV
sliders should flip it on its own. A checkable toggle can't do that (a click would break
the binding), so each segment's active state is a plain binding to the data, and clicking
performs the action that changes the data:

```qml
SegSel {
    active: boxData.isShiny          // a binding, not a checkable state
    onClicked: boxData.makeShiny()   // changes data → re-drives `active`
}
```

One source of truth, no drift.

## Closing the loop on data safety

The day finished with a data-integrity pass: destructive editor actions — re-roll,
reset, max out, evolve, and the bulk move operations — now ask for confirmation through
a shared dialog, while harmless per-field actions don't. A status badge was added to the
Pokémon preview, and the level field was widened so "100" fits.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [Gen 1 shininess is derived from DVs](https://bulbapedia.bulbagarden.net/wiki/Shiny_Pok%C3%A9mon#Generation_II)
  (Bulbapedia) · [QML property binding](https://doc.qt.io/qt-6/qtqml-syntax-propertybinding.html)
