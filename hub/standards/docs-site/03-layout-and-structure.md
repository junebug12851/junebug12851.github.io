# 03 · Layout & Structure

The skeleton every page hangs on. Reproduce the **shell** (header → main → footer)
and the **documentation layout** (sidebar + content) so the structural rhythm
matches fairyfox.io.

## Page shell

Every page, top to bottom:

1. **Sticky header** (`.site-header`) — full-width, `position: sticky; top: 0`,
   `z-index: 50`, height **64px**, a translucent background
   (`color-mix(--bg 72%, transparent)`) with `backdrop-filter: saturate(160%)
   blur(14px)` and a `1px` bottom hairline (`--line`). Contents sit inside a
   `.wrap`. See [`04-components.md`](04-components.md) for the brand + nav.
2. **`main`** — flex-grows to push the footer down (`body` is a column flexbox,
   `min-height: 100vh`; `main { flex: 1 0 auto }`).
3. **Footer** (`.site-footer`) — full-width, multi-column. See components.

## The content container — `.wrap`

The horizontal frame for nearly everything:

```
.wrap { width: 100%; max-width: var(--maxw); margin-inline: auto;
        padding-inline: var(--gutter); }
```

`--maxw` = `1180px`, `--gutter` = `clamp(1.15rem, 4vw, 2.75rem)`. Full-bleed
coloured sections ("bands") span the viewport; their inner `.wrap` re-centres the
content.

## Bands (full-bleed sections)

Used to break a long page into rhythmic, edge-to-edge stripes:

- `.band > .wrap` — vertical padding `clamp(2.4rem, 5.5vw, 4rem)`.
- `.band-alt` — adds a `--panel` background and top/bottom hairlines (an alternate
  stripe).
- `.band-tight > .wrap` — smaller vertical padding `clamp(1.8rem, 4vw, 2.6rem)`.

## The documentation layout

The core of a docs page: a **left sidebar nav + a content column**, both inside a
`.wrap`. On fairyfox.io this is the `doc` layout:

```
.doc-wrap (= .wrap)
├── aside.doc-sidebar      ← grouped, ordered links; current page marked .active
└── article.doc-content
    ├── p.doc-crumbs       ← "Docs / <page title>" breadcrumb
    ├── h1                 ← page title
    ├── p.lead (optional)  ← one-line summary
    └── .content           ← the rendered body
```

Requirements for a compliant docs layout:

- **A persistent sidebar** listing the docs, **grouped by category** and **ordered
  within each group**, with the **current page clearly marked** (`.active`:
  `--text` colour on a faint accent wash). The sidebar's heading links to the docs
  index ("Documentation library" / your project's docs home).
- **A breadcrumb/locator** at the top of the content showing where you are and
  offering the path back up.
- **A reading measure** for body prose — cap line length around `--maxw-text`
  (`43rem`) so long-form docs stay readable; tables/code may use full width.

## Content (prose) conventions

Inside `.content`, the rendered Markdown/HTML body follows the base typography in
[`02-design-tokens.md`](02-design-tokens.md):

- `pre` — `--code-bg` background, `1px --line` border, `--radius-sm`, padding
  `1rem 1.1rem`, horizontal scroll.
- Inline `code` — `--panel-3` background, `--accent-ink` text, `6px` radius,
  `.12em .42em` padding, `.86em`.
- `blockquote` — `3px` solid `--accent` left border, `--panel-2` background,
  `--text-soft` text, right-rounded.
- `hr` — single `--line` top border, `2.4rem 0` margin.
- `table` — full width, collapsed borders, `.96rem`; cells padded `.55rem .7rem`
  with a `--line` bottom border; `th` weight 700.

## Responsive rules

- **Header nav collapses at `max-width: 820px`** into a toggle button
  (`.nav-toggle`, a 42px square) that opens the nav as a dropdown panel. Above
  820px the nav is inline, pushed right (`margin-left: auto`).
- **Two-column layouts (sidebar + content, hero grids) collapse to one column** on
  narrow viewports. The docs sidebar should move to the top (or a toggle) on
  mobile, content below.
- Use `clamp()` for fluid type and section padding (already baked into the tokens).

## z-index layers

Keep the stacking consistent so overlays behave the same everywhere:

| Layer | z-index |
|-------|---------|
| Background wash | `-2` |
| Background grain | `-1` |
| Sticky header | `50` |
| Open dropdown / mobile nav panel | `60` |
