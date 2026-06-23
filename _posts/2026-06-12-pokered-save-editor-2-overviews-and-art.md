---
title: "Pokered Save Editor 2: at-a-glance overviews and new badge art"
subtitle: "A Pokémon overview drawer, in-game name rendering in the grid, and a pass to make badge artwork render uniformly."
date: 2026-06-12
tags: [pokered-save-editor-2, update]
---

This day in
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
brought the "View All" overview pattern to the Pokémon screen and tidied up how
artwork renders.

## A species-by-box overview

The Pokémon overview is a slide-in table: rows are species (alphabetised), columns are
the party first and then only the non-empty boxes, and each cell shows how many of that
species live there. Hovering a cell lists the differing nicknames and splits caught
versus traded. Building it surfaced and fixed a related grid bug — un-nicknamed Pokémon
were showing their raw name markers instead of the gender glyphs:

```text
NIDORAN<m>   →   NIDORAN ♂
NIDORAN<f>   →   NIDORAN ♀
Mr.Mime      →   Mr. Mime
```

The box screen's "Boxes Setup" control became a Tools menu, and toggling whether the
PC boxes are formatted now opens a direction-aware confirmation. Proceeding flips a
single bit — the engine already mirrors the game's own load/save behaviour from that
bit, so no extra save bytes are touched.

## Making the badge art render uniformly

The rest of the day was artwork. The eight gym badges were full-bleed images with
different aspect ratios, so under `PreserveAspectFit` each filled its cell to a
different width. Each was re-processed onto a uniform square canvas — trim the
transparent border, scale the longest side to a fixed fraction, paste centred:

```python
from PIL import Image

im = Image.open(src).convert("RGBA")
im = im.crop(im.getbbox())                      # trim transparent margins

scale = int(256 * 0.98) / max(im.size)          # longest side ≈ 98% of the canvas
im = im.resize((round(im.width * scale),
                round(im.height * scale)), Image.LANCZOS)

canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
canvas.paste(im, ((256 - im.width) // 2, (256 - im.height) // 2), im)
canvas.save(dst)
```

The gym-leader "not yet earned" shadows were recropped to matching square busts, so
earned badges and unearned shadows now render at the same footprint. The trainer and
rival card artwork was also swapped to new coloured illustrations.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [Pillow (PIL)](https://pillow.readthedocs.io/) ·
  [QML `Image.fillMode` / `PreserveAspectFit`](https://doc.qt.io/qt-6/qml-qtquick-image.html#fillMode-prop)
