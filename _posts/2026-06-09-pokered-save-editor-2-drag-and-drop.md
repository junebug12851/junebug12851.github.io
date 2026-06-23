---
title: "Pokered Save Editor 2: drag-and-drop box management"
subtitle: "Storage boxes get drag-to-reorder and cross-pane transfer — and an intermittent crash gets traced to its real cause."
date: 2026-06-09
tags: [pokered-save-editor-2, update]
---

Pokémon storage in
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
now supports dragging: reorder Pokémon within a box, and drag them between the two
visible panes, with an insertion caret showing where a drop will land. A small drag
threshold means a plain click still opens the editor, group moves work through the
existing checkboxes, and each cell gained a delete chip with proper hover and press
states. The old bulk-action footer bar is gone.

## The interesting part: an intermittent crash

Create or open a stored Pokémon's editor, back out, reopen — and the app would
occasionally crash on a freed object. The first fix addressed the individual Pokémon's
ownership and didn't hold. The real cause was one level up: the *box*, not the Pokémon.

In a Qt/QML app, objects returned to QML can be taken over by the JavaScript engine's
garbage collector. A box object was being handed to QML, and when it was collected its
destructor deleted every Pokémon inside it — leaving them dangling no matter how their
own lifetime was managed. The tell was a crash on a *virtual* call (`!mon->isBoxMon()`)
while a plain field read on the same object had just succeeded: a textbook
freed-object / clobbered-vtable signature.

The fix declares C++ ownership at construction, so the engine never assumes it can free
these objects:

```cpp
// PokemonStorageBox ctor — covers every box, and the party via inheritance
QQmlEngine::setObjectOwnership(this, QQmlEngine::CppOwnership);
```

Containers still release their contents normally, so there's no leak — the objects are
simply protected from being collected out from under the application. See Qt's
[object ownership](https://doc.qt.io/qt-6/qtqml-cppintegration-data.html#data-ownership)
rules for the underlying behaviour.

## A debugging footnote worth keeping

Two of the retests "failed" only because they ran a **stale built library** in a
different output directory than the automated tests use. Editing a DLL's body doesn't
relink the executable, so its timestamp doesn't change and it's easy to be fooled:

```text
# verify the build you're actually running by the library timestamp, not the .exe
projects/build/.../Debug/savefile.dll   ← the in-app run loads THIS
build/savefile.dll                      ← the automated loop builds THIS
```

The lesson, now written down: rebuild the directory you're actually launching from,
and trust timestamps over assumptions.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [Qt QML / C++ data ownership](https://doc.qt.io/qt-6/qtqml-cppintegration-data.html#data-ownership) ·
  [`QQmlEngine::setObjectOwnership`](https://doc.qt.io/qt-6/qqmlengine.html#setObjectOwnership)
