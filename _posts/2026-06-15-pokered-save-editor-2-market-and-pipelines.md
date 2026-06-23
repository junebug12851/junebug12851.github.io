---
title: "Pokered Save Editor 2: rebuilding the Market screen, plus screenshots and releases"
subtitle: "The shop screen — long the buggiest in the app — gets a full rework, and the project gains automated screenshots and a release pipeline."
date: 2026-06-15
tags: [pokered-save-editor-2, update]
---

The Pokémart / Game Corner screen in
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
had long been the most half-finished, fragile part of the app. This day was a long,
iterative rebuild of it, plus two pieces of project infrastructure.

## The Market rework

The screen became a clean two-pane layout: a shopping list on the left and a cart that
reads like a store receipt on the right, itemised with a running total. Buying and
selling were unified into a single cart per currency, summing into one net total, and
the mode controls moved out of the footer into segmented header strips.

The standout fix was the money/coins exchange. A coin is worth ₽20 — confirmed in the
game's own data (`gameCorner.json` `"price": 20`) — but the conversion was inverted:

```text
A coin is worth ₽20.

  old:  coins = rate × money      → ~20 coins per ₽1   (inverted — wrong direction)
  new:  money = rate × coins      → ₽20 per coin        (correct)
```

So the data was right and the C++ math was wrong. It was reworked into a clear
converter — money on one side, coins on the other, live deltas above each. To check
this kind of thing against an authority, the documented Pokémon Red disassembly
([pret/pokered](https://github.com/pret/pokered)) was cloned in as a read-only
reference. The rework also surfaced another use-after-free, traced with a debugger to
shop entries being read from cross-instance static registries after they'd been freed;
the fix sweeps only the current model's live entries.

## An automated screenshot pipeline

A headless tool now boots the real UI and captures PNGs of every screen and several
states — and it only ever reads the save in memory, so it can't touch save data.
Getting it to render correctly offscreen took working through several quirks (missing
fonts, blank grabs, dropped visual effects), ending on a real but hidden GPU window:

```sh
# render through a real GPU window, parked off-screen, so effects actually draw
PSE_SHOT_SIZE=750x480   # capture at the app's real window size
```

## A release pipeline

A GitHub Actions workflow now builds and publishes a GitHub Release, gated so it only
fires when the version was actually bumped:

| Artifact                         | Platform |
|----------------------------------|----------|
| Installer (`.exe`, Inno Setup)   | Windows  |
| Portable (`.zip`)                | Windows  |
| `AppImage`                       | Linux    |
| Portable (`.tar.gz`)             | Linux    |
| Doxygen HTML docs (`.zip`)       | —        |
| UI screenshots (`.zip`)          | —        |

The first release, `v0.7.2-alpha`, went out with all six artifacts after the usual
first-run shakeout (a `windeployqt` flag unsupported on the llvm-mingw toolchain, an
Inno Setup path quirk, and a Linux binary-location difference). Screenshots and docs
are also served from GitHub Pages, so they stay current without bloating the repo.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [pret/pokered](https://github.com/pret/pokered) (the save-format / pricing oracle)
- [GitHub Actions](https://docs.github.com/actions) · [Inno Setup](https://jrsoftware.org/isinfo.php) ·
  [linuxdeploy](https://github.com/linuxdeploy/linuxdeploy)
