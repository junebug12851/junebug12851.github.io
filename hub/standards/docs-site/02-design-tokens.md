# 02 · Design Tokens

The exact visual DNA of fairyfox.io. Reproduce these values in your stack
(CSS custom properties, Sass variables, a theme object — whatever fits). **Values
are normative**: match them, don't approximate. The system is **dark-first**, with
a fully designed **light** theme that follows `prefers-color-scheme`, plus a manual
**light / sepia / dark** override chosen in the shared reader menu (see
[the reader section below](#manual-themes--the-reader-aa-menu)).

## Colour — dark theme (default)

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#181017` | Page background |
| `--bg-grad-top` | `#241827` | Top of the page background gradient |
| `--panel` | `#281b28` | Raised surfaces (header, cards, sidebar) |
| `--panel-2` | `#342433` | Secondary surface (chips, hover) |
| `--panel-3` | `#402e3e` | Tertiary surface (inline code bg, deep hover) |
| `--line` | `#483446` | Hairline borders/dividers |
| `--line-2` | `#5e4659` | Stronger borders (controls) |
| `--text` | `#fbf3ee` | Primary text |
| `--text-soft` | `#e0cdd7` | Secondary text |
| `--text-faint` | `#b8a3af` | Muted/meta text |
| `--accent` | `#ff8368` (`--violet`) | Accent (warm coral) |
| `--accent-ink` | `#ffc6b3` | Accent text on dark (inline code, emphasis) |
| `--on-accent` | `#2a1219` | Text on an accent fill |
| `--link` | `#ffc6b3` | Links |
| `--link-hover` | `#ffe0d5` | Link hover |
| `--glow` | `rgba(255,131,104,.4)` | Accent glow (shadows behind brand/buttons) |
| `--code-bg` | `#120c12` | Code block background |

Panels are raised a clear step off `--bg` and secondary/faint text is kept bright
enough to read on them — the palette is tuned for real surface separation and AA text.

## Colour — light theme (`prefers-color-scheme: light`)

| Token | Value |
|-------|-------|
| `--bg` | `#efe4d1` |
| `--bg-grad-top` | `#f7eede` |
| `--panel` | `#fffdf8` |
| `--panel-2` | `#f5ead8` |
| `--panel-3` | `#eaddc6` |
| `--line` | `#e0cfb4` |
| `--line-2` | `#c9b088` |
| `--text` | `#231a25` |
| `--text-soft` | `#50444f` |
| `--text-faint` | `#67586a` |
| `--accent` | `#d1462c` |
| `--accent-ink` | `#a5361d` |
| `--on-accent` | `#fff8f4` |
| `--link` | `#a5361d` |
| `--link-hover` | `#89290f` |
| `--glow` | `rgba(209,70,44,.22)` |
| `--code-bg` | `#2b2030` |

A deeper cream ground with near-white panels and stronger hairlines, so cards and
surfaces read as distinct (not washed-out).

## Manual themes & the reader ("Aa") menu

The theme applies **two ways**: the OS default via `prefers-color-scheme` (only when
there's no manual choice) and an explicit pick from the reader menu, set as
`data-theme` on `<html>`. Guard the OS media query with `:not([data-theme])` so a
manual choice always wins:

```css
@media (prefers-color-scheme: light){ :root:not([data-theme]){ /* light tokens */ } }
:root[data-theme="light"]{ /* same light tokens */ }
:root[data-theme="sepia"]{ /* sepia tokens */ }
/* dark is the base :root; data-theme="dark" simply suppresses the OS light query */
```

### Sepia theme (manual only — warm paper for long reading)

A proper tan ground with clearly raised panels and near-ink brown text (strong
contrast, not flat):

| Token | Value | | Token | Value |
|-------|-------|-|-------|-------|
| `--bg` | `#e5d6b6` | | `--text` | `#2c2411` |
| `--bg-grad-top` | `#eee2c8` | | `--text-soft` | `#544625` |
| `--panel` | `#f4ead0` | | `--text-faint` | `#665730` |
| `--panel-2` | `#e4d5b0` | | `--accent` | `#a94c2a` |
| `--panel-3` | `#d8c79c` | | `--accent-ink` | `#883718` |
| `--line` | `#cdb888` | | `--on-accent` | `#fdf6ea` |
| `--line-2` | `#b89c68` | | `--link` | `#883718` |
| `--code-bg` | `#332818` | | `--link-hover` | `#712c10` |

`--glow: rgba(169,76,42,.24)`. Match these **verbatim** — sepia is part of the shared
origin, so it must look identical on the hub and every project.

### The reader menu (required shared component)

Every fairyfox.io site — the hub **and** every project's docs — carries the same
**"Aa"** reader menu in the header. It controls five things and **remembers the choice
under one versioned origin-wide `localStorage` key so the setting is shared across
every same-origin `fairyfox.io` site**:

- **Key:** `fairyfox:reader:b` → JSON `{ theme, accent, size, lh, width }`. The `:b`
  suffix **versions the schema** — bump the suffix when the value shape changes, so a
  site running the old model never mis-reads the new one (and vice versa).
- **Theme:** `system` (default) · `light` · `sepia` · `dark` → drives `data-theme`.
- **Accent:** `null` (theme default) or a hex from a small colour-circle picker. When
  set it overrides `--accent` / `--violet` / `--violet-deep` and derives
  `--accent-ink` / `--link` / `--link-hover` by **mixing the hex toward `--text`**
  (`color-mix(in srgb, <hex>, var(--text) 42%)`) so it stays legible in every theme,
  plus a translucent `--glow`.
- **Text size:** index `0..4` into root font-size **`[15, 16.5, 18, 20, 22]px`**
  (default `1`), set on `<html>` — this scales the whole rem-based UI, so text size
  visibly applies on **every** page (not just prose).
- **Line spacing:** `tight 1.5` · `normal 1.65` (default) · `relaxed 1.9` → `--reading-lh`
  (drives `body` line-height).
- **Width:** `narrow 38rem` · `normal 46rem` (default) · `wide 58rem` → `--reading-width`
  (caps the reading measure on prose/doc pages).

These constants are **normative** — keep them byte-identical across the mesh so a
choice made on one site carries to the next. Apply the saved theme / accent / size /
reading vars **before first paint** (a tiny inline script in `<head>`) to avoid a flash.
Canonical implementation: the button/panel styles in the bundled
[`reference/main.css`](reference/main.css) and fairyfox.io's `assets/js/reader.js`.
Component appearance is in [`04-components.md`](04-components.md).

## Fixed status hues (both themes)

Lifecycle badges use fixed semantic colour — **not** the per-project accent:

| Status | Token | Dark | Light |
|--------|-------|------|-------|
| alpha | `--hue-alpha` | `#e5484d` (red) | `#e5484d` |
| beta | `--hue-beta` | `#e0a210` (amber) | `#e0a210` |
| released | `--hue-released` | `#22a06b` (green) | `#22a06b` |

## Per-project accent

The accent (`--accent`/`--violet`) is the **one place a project may differ in
colour.** Each project sets its own accent hex (the `color` in its registry entry)
for its brand mark, links, and small highlights. Everything else — surfaces, text,
lines — stays on the shared palette. Default accent if unset: `#ef6149`.

## Typography

Three families, loaded from Google Fonts (or self-hosted equivalents):

| Role | Token | Stack |
|------|-------|-------|
| Display (headings, brand) | `--display` | `"Fraunces", Georgia, "Times New Roman", serif` |
| Sans (body, UI) | `--sans` | `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` |
| Mono (code) | `--mono` | `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |

Weights to load: **Fraunces** 500/600/700 (opsz 9–144), **Inter** 400/500/600/700,
**JetBrains Mono** 400/500.

Base text: `font-size: 16.5px`, `line-height: 1.62`, family `--sans`, colour
`--text`, with `-webkit-font-smoothing: antialiased` and
`text-rendering: optimizeLegibility`.

Heading scale (family `--display`, weight 700, `line-height: 1.14`,
`letter-spacing: -.02em`):

| Element | Size |
|---------|------|
| `h1` | `clamp(2rem, 3.5vw, 2.6rem)`, margin `0 0 .4em` |
| `h2` | `clamp(1.5rem, 2.4vw, 1.9rem)`, margin `0 0 .5em` |
| `h3` | `1.2rem`, margin `1.5rem 0 .4em` |

Note one deliberate exception: the **home hero `h1`** uses `--sans` (Inter), not
Fraunces. Headings inside docs content use Fraunces as above.

Paragraphs/lists: margin `0 0 1.05rem`. Body links: colour `--link`, no underline;
on hover underline with `text-underline-offset: 3px`.

## Spacing, radius, sizing

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | `20px` | Cards, panels, dropdowns |
| `--radius-sm` | `13px` | Code blocks, smaller panels |
| `--radius-xs` | `9px` | Tight elements |
| `--maxw` | `1180px` | Page content max width (`.wrap`) |
| `--maxw-text` | `43rem` | Reading-measure max width for prose |
| `--gutter` | `clamp(1.15rem, 4vw, 2.75rem)` | Horizontal page padding |
| `html` font-size | `16.5px` (default) | The reader's "Text size" lever — scaled on `<html>` to resize the whole rem UI |
| `--reading-lh` | `1.65` (default) | `body` line-height — set live by the reader menu |
| `--reading-width` | `46rem` (default) | Reading measure — set live by the reader menu |

Pill controls (buttons, nav items, chips, badges) use `border-radius: 999px`.

## Shadow & elevation

| Token | Value |
|-------|-------|
| `--shadow` (dark) | `0 1px 0 rgba(255,255,255,.03), 0 18px 40px -24px rgba(0,0,0,.8)` |
| `--shadow-lg` (dark) | `0 34px 80px -30px rgba(0,0,0,.86)` |
| `--shadow` (light) | `0 1px 2px rgba(80,40,30,.05), 0 14px 34px -20px rgba(120,60,40,.28)` |
| `--shadow-lg` (light) | `0 30px 70px -28px rgba(120,55,35,.4)` |

## Motion

- Easing token `--ease`: `cubic-bezier(.22,.61,.36,1)`.
- Typical transitions: `transform .15s var(--ease)` for lifts; `.2s` for
  colour/border/background.
- Hover lift on interactive cards/buttons: `translateY(-2px)`.
- `html { scroll-behavior: smooth }`.
- **Honour `prefers-reduced-motion: reduce`** — drop transforms/animations to near
  zero (see [`07-accessibility.md`](07-accessibility.md)).

## Backdrop (optional but recommended for full match)

The page has two fixed, pointer-events-none background layers behind content:

1. A soft radial-gradient wash (amber top-right, accent top-left) over a vertical
   `--bg-grad-top → --bg` gradient.
2. A faint fractal-noise grain at `opacity: var(--grain-op)` (`.05` dark / `.03`
   light).

These are subtle; reproduce them where the stack allows, but they are lower
priority than colour, type, and the shell.

## Browser-chrome meta

Set both `theme-color` metas so the mobile browser chrome matches:

```html
<meta name="theme-color" content="#ef6149" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#191116" media="(prefers-color-scheme: dark)">
```
