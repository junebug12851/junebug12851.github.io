# 11 · Measurements Reference

Every exact value, pinned. Where files `02`–`04` describe a component, this file
gives its precise dimensions, spacing, and placement so reproduction is
unambiguous. Values are taken verbatim from the master stylesheet; the full file
is bundled read-only at [`reference/main.css`](reference/main.css) for anything not
restated here.

Notation: `rem` is relative to the root; base font is `16.5px`, so `1rem ≈ 16.5px`
(except where a media query drops the base to `16px`).

## Spacing inventory (the values actually in use)

The system does **not** use a single fixed step scale — it uses a small, consistent
vocabulary of `rem` values. The ones that recur:

| Role | Values |
|------|--------|
| Tight gaps (icons, inline) | `.1rem` · `.15rem` · `.25rem` · `.35rem` · `.4rem` · `.5rem` |
| Component gaps | `.6rem` · `.7rem` · `.85rem` · `1rem` · `1.2rem` |
| Card/section padding | `1.05–1.7rem` (see each component) |
| Section rhythm | `1.5rem` · `2rem` · `2.6rem` |
| Band padding (fluid) | `clamp(1.8rem,4vw,2.6rem)` → `clamp(2.4rem,5.5vw,4rem)` |

Radii: `--radius 20px` (cards/panels), `--radius-sm 13px` (code, small panels,
update cards), `--radius-xs 9px`, plus ad-hoc `6px`/`7px`/`8px`/`10px` on small
controls and pills at `999px`. Container: `--maxw 1180px`, `--maxw-text 43rem`,
`--gutter clamp(1.15rem,4vw,2.75rem)`.

## Global / base

| Property | Value |
|----------|-------|
| Body font | `--sans`, `16.5px`, line-height `1.62` |
| Body | flex column, `min-height:100vh`; `main { flex:1 0 auto }` |
| Links | hover underline, `text-underline-offset:3px` |
| `h1` | `clamp(2rem,3.5vw,2.6rem)`, margin `0 0 .4em`, line-height `1.14`, letter-spacing `-.02em` |
| `h2` | `clamp(1.5rem,2.4vw,1.9rem)`, margin `0 0 .5em` |
| `h3` | `1.2rem`, margin `1.5rem 0 .4em` |
| `p,ul,ol` | margin `0 0 1.05rem` |
| `:focus-visible` | `outline:2px solid var(--violet); outline-offset:2px; border-radius:5px` |
| inline `code` | `.86em`, padding `.12em .42em`, radius `6px`, bg `--panel-3`, color `--accent-ink` |
| `pre` | padding `1rem 1.1rem`, radius `--radius-sm` (13px), `1px --line` border, bg `--code-bg` |
| `pre code` | `.85rem`, color `#cfc8e6` |
| `blockquote` | margin `1.2rem 0`, padding `.5rem 1.1rem`, `3px` solid `--accent` left border, right radius `13px` |
| `hr` | `1px --line` top, margin `2.4rem 0` |
| `table` | full width, `.96rem`, margin `0 0 1.2rem` |
| `th,td` | padding `.55rem .7rem`, `1px --line` bottom border; `th` weight 700 |

## Header & nav

| Element | Value |
|---------|-------|
| `.site-header` | sticky, `top:0`, `z-index:50`, `backdrop-filter:saturate(160%) blur(14px)`, bg `color-mix(--bg 72%, transparent)`, `1px --line` bottom border |
| header inner (`.wrap`) | flex, align center, **`gap:1rem`**, **`height:64px`** |
| `.brand` | flex, **`gap:.6rem`**, weight 700, family `--display` |
| `.brand-logo` | **`34px × 34px`**, circle, `1px --line-2` border, shadow `0 4px 14px -4px var(--glow)` |
| `.brand-name` | `1.08rem`, letter-spacing `-.01em` |
| `.nav` | `margin-left:auto`, flex, **`gap:.12rem`** |
| nav item (`.nav > a`) | padding **`.45rem .72rem`**, `.93rem`, weight 600, radius `999px`, color `--text-soft` |
| nav hover | color `--text` on `--panel-2` |
| nav `.active` | color `--text` on `color-mix(--violet 16%, transparent)` |
| `.subnav` (recommended, secondary row below header) | full-width row under `.site-header`: `1px --line` bottom border, bg `color-mix(--bg 80%, transparent)`; inner `.wrap` flex, `gap:.1rem`, `flex-wrap:wrap`, `padding-block:.5rem` |
| `.subnav a` | padding `.32rem .62rem`, `.86rem`, weight 600, radius `999px`, `--text-soft`; hover `--text` on `--panel-2`; `.active` `--text` on `color-mix(--violet 16%, transparent)` |
| `.subnav` @ `≤540px` | `.wrap` becomes `flex-wrap:nowrap` + `overflow-x:auto` (hidden scrollbar) |
| `.nav-toggle` | **`42px × 42px`**, padding `10px`, radius `10px`, `1px --line-2`, bg `--panel-2`; bars `2px` tall |
| mobile breakpoint | **`max-width:820px`** — nav becomes a `--panel` dropdown, padding `.5rem`, radius `20px`, `--shadow-lg` |
| header @ `≤540px` | height drops to **`60px`** |

## Buttons

| Element | Value |
|---------|-------|
| `.btn` | padding **`.66rem 1.15rem`**, radius `999px`, `.95rem`, weight 600, `gap:.5rem`, `1px --line-2`, bg `--panel-2`, `--shadow` |
| `.btn:hover` | `translateY(-2px)`, border warms toward `--violet` |
| `.btn.primary` | no border, white text, bg `--violet-deep`, shadow `0 10px 26px -12px var(--glow)` |
| `.btn.sm` | padding `.42rem .8rem`, `.86rem` |
| transitions | `transform .15s var(--ease)`, color/border/bg `.2s` |

## Cards & grids

| Element | Value |
|---------|-------|
| `.grid` | `display:grid`, `gap:1.2rem` |
| `.grid.cols-2` | `repeat(auto-fit, minmax(320px, 1fr))` |
| `.grid.cols-3` | `repeat(auto-fit, minmax(280px, 1fr))` |
| `.card` | padding **`1.5rem 1.6rem`**, radius `20px`, `1px --line`, bg `--panel` + `--card-grad`, `--shadow` |
| `.card:hover` (links) | `translateY(-4px)`, `--shadow-lg`, border → `color-mix(--pc 45%, --line)` |
| `.card h3` | margin `0 0 .4rem` |
| `.card p` | `.97rem`, color `--text-soft`, margin `0 0 .7rem` |
| `.card-links` | flex wrap, `gap:.4rem 1rem`, `.9rem`, weight 600 |
| card transition | `transform .18s var(--ease)` |

### Project card

| Element | Value |
|---------|-------|
| `.proj-card` | flex column; accent var `--pc` |
| accent bar (`::before`) | `left:0`, `top:1.3rem`, `bottom:1.3rem`, **`width:3px`**, right radius `3px`, bg `--pc`, opacity `.9` |
| `.proj-top` | flex, align center, `gap:.85rem`, margin-bottom `.7rem` |
| `.proj-glyph` | **`50px × 50px`**, radius `13px`, image cover |
| `.proj-card h3` | `1.14rem` |
| `.blurb` | `.96rem`, color `--text-soft`, margin `0 0 1rem` |
| `.proj-bottom` | `margin-top:auto`, padding-top `.6rem` |

## Status taxonomy (badges · version · activity)

| Element | Value |
|---------|-------|
| `.badge` | `.66rem`, weight 700, letter-spacing `.05em`, uppercase, padding **`.2rem .5rem`**, radius `999px`, line-height `1` |
| `.badge.alpha` | text `color-mix(--hue-alpha 62%, --text)`, bg `color-mix(--hue-alpha 14%, --panel)`, border `color-mix(--hue-alpha 40%, transparent)` |
| `.badge.beta` | hue-beta at `66% / 16% / 44%` |
| `.badge.released` | hue-released at `60% / 14% / 40%` |
| `.ver` | family `--mono`, `.76rem`, color `--text-soft` |
| `.activity` | `.76rem`, `gap:.35rem`; `.adot` `.5rem` circle (active → `--hue-released`, inactive → `--text-faint`) |
| status row gap | `.45rem` |

## Tags

| Element | Value |
|---------|-------|
| `.tags` | flex wrap, `gap:.4rem`, margin `.2rem 0 1rem` |
| `.tag` | `.71rem`, weight 600, padding `.2rem .55rem`, radius `999px`, bg `--panel-3`, `1px --line` |

## Documentation layout (the core docs view)

| Element | Value |
|---------|-------|
| `.doc-wrap` | grid **`240px minmax(0,1fr)`**, **`gap:2.6rem`**, align start, `max-width:1160px`, padding-block `clamp(1.8rem,4vw,2.6rem)` |
| `.doc-sidebar` | `position:sticky`, **`top:84px`**, `.93rem` |
| `.doc-sidebar-home` | weight 700, margin-bottom `1rem` |
| `.doc-sidebar-group` | margin-bottom `1.1rem` |
| `.doc-sidebar-title` | `.7rem`, weight 700, letter-spacing `.06em`, uppercase, color `--text-faint`, margin-bottom `.4rem` |
| sidebar link | padding `.3rem .6rem`, radius `7px`, `2px` transparent left border |
| sidebar link hover | color `--text` on `--panel-3` |
| sidebar link `.active` | weight 650, bg `color-mix(--violet 12%, transparent)`, left border `--violet` |
| `.doc-content .content` | `max-width:var(--maxw-text)` (43rem) |
| `.doc-crumbs` | `.84rem`, color `--text-faint`, margin `0 0 .6rem` |
| docs breakpoint | **`max-width:860px`** — single column, sidebar static with a `1px --line` bottom border, `gap:1.2rem` |

## Page head / article (for non-sidebar docs pages)

| Element | Value |
|---------|-------|
| `.page-head > .wrap` | padding-block `clamp(2.4rem,5vw,3.6rem) clamp(1.4rem,3vw,2rem)`, `1px --line` bottom border |
| head `h1` | family `--sans`, weight 700, letter-spacing `-.02em`, margin `0 0 .3em` |
| `.page-head .lead` | `1.14rem`, color `--text-soft`, `max-width:--maxw-text` |
| `.article > .wrap` | padding-block `clamp(2rem,5vw,3.2rem)`, `max-width:calc(--maxw-text + 2*--gutter)` |
| `.prose` | `max-width:--maxw-text`; `.prose h2` margin `2rem 0 .6rem` |

## Callout / note (e.g. download note)

A boxed note: padding `.75rem 1rem`, bg `--panel-2`, `1px --line` + `3px --amber`
left border, right radius `13px`, `.9rem`, `gap:.6rem`.

## Footer

| Element | Value |
|---------|-------|
| `.site-footer` | `margin-top:auto`, `1px --line` top border, bg `--panel` |
| footer grid | padding-block **`2.6rem 1.4rem`**, grid **`1.5fr 1fr 1fr 1fr`**, **`gap:2rem`** |
| `.footer-brand p` | `.88rem`, color `--text-faint`, `max-width:22rem` |
| `.footer-col h4` | `.72rem`, uppercase, letter-spacing `.1em`, color `--text-faint`, margin `0 0 .7rem` |
| `.footer-col a` | block, `.9rem`, padding `.22rem 0` |
| `.footer-bar > .wrap` | padding-block `1.05rem`, flex wrap, `gap:.5rem 1.2rem`, `.83rem` |
| footer breakpoints | `≤720px` → `1fr 1fr`; `≤460px` → `1fr` |

## Project node page (the `/projects/<key>/` style, for reference)

| Element | Value |
|---------|-------|
| `.node-wrap` | `max-width:calc(--maxw-text + 14rem)` |
| `.locator` | `.82rem`, flex, `gap:.5rem`; `.kind` `.72rem`, weight 700, uppercase, color `--pc` |
| `.np-glyph` | **`60px × 60px`**, radius `16px` |
| `.np-head h1` | `clamp(2rem,4vw,2.6rem)`, family `--sans` |
| `.connections` | grid `repeat(auto-fit, minmax(220px,1fr))`, `gap:1rem` |
| `.conn` | padding `1rem 1.1rem`, `1px --line`, radius `13px`, bg `--panel-2` |
| `.pulse-row` | flex, `gap:.8rem`, padding `.75rem .2rem`, `1px --line` bottom border |

## Responsive breakpoints (complete list)

| Breakpoint | Effect |
|------------|--------|
| `min-width:60rem` | Home hero becomes two-column (`1fr 424px`) — home only |
| `max-width:860px` | Docs layout collapses to one column |
| `max-width:820px` | Header nav collapses to the toggle dropdown |
| `max-width:720px` | Footer grid → `1fr 1fr` |
| `max-width:540px` | Base font `16px`; header height `60px` |
| `max-width:460px` | Footer grid → `1fr` |
| `prefers-reduced-motion:reduce` | All animation/transition off; `scroll-behavior:auto` |

## Motion timings (complete)

| Use | Value |
|-----|-------|
| Button/card lift | `transform .15–.18s var(--ease)` |
| Colour/border/bg | `.2s` |
| Nav caret | `.15s ease` |
| Activity ticker (home) | `tick 20s linear infinite` (paused on hover; off under reduced motion) |
| Pulse dot (home) | `pulse 2.4s infinite` |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` |

## Anything not listed here

Consult the bundled [`reference/main.css`](reference/main.css) — it is the faithful
master snapshot. Home-only flourishes (masthead, hero portal, activity panel/ticker,
charts, downloads tabs) live there for completeness but a project docs site doesn't
need them.
