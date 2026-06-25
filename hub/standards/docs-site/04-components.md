# 04 · Components

The shared UI pieces. Reproduce their **appearance and behaviour**; class names are
fairyfox.io's and are given for reference, not required. All colours/sizes refer to
the tokens in [`02-design-tokens.md`](02-design-tokens.md).

## Brand lockup (`.brand`)

A round logo image + the wordmark, used in the header and footer.

- Logo: `34px` round (`border-radius: 50%`), `object-fit: cover`, a `1px --line-2`
  border and a soft `--glow` shadow. (Footer/masthead may use a larger size.)
- Wordmark: family `--display` (Fraunces), weight 700, `1.08rem`, colour `--text`.
- The whole lockup is a link; no underline on hover.
- **In a project docs site the brand is "Fairy Fox" and links to `https://fairyfox.io/`**
  (the way home) — the project's own name belongs in the sub-brand/locator, not in
  place of the Fairy Fox mark. See [`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md).

## Primary navigation (`.nav`)

- Inline row of pill links, pushed to the right of the header.
- Each item: `--text-soft`, `.93rem`, weight 600, padding `.45rem .72rem`,
  `border-radius: 999px`, no wrap.
- Hover: `--text` on a `--panel-2` fill. **Active page**: `--text` on a faint
  accent wash (`color-mix(--accent 16%, transparent)`).
- **No dropdowns.** fairyfox.io uses plain top-level links (Home · Projects · Docs ·
  Downloads · Updates · About). Project docs sites use their own item set but keep
  the same flat, plain-link style.
- **Mobile (`≤820px`):** the row hides behind a `.nav-toggle` (42px square, `--panel-2`
  fill, `--line-2` border, three bars) and opens as a `--panel` dropdown with
  `--shadow-lg`.

## Buttons (`.btn`)

- Pill (`border-radius: 999px`), inline-flex, `.66rem 1.15rem`, weight 600,
  `.95rem`, `1px --line-2` border, `--panel-2` fill, `--shadow`.
- Hover: lift `translateY(-2px)`, border warms toward the accent.
- **Primary** (`.btn.primary`): no border, white text, `--violet-deep` fill, a glow
  shadow.
- **Small** (`.btn.sm`): `.42rem .8rem`, `.86rem`.

## Cards (`.card`)

The workhorse surface for indexes and grids.

- `--panel` background with the `--card-grad` top sheen, `1px --line` border,
  `--radius` corners, `--shadow`.
- Hover (when interactive): lift and/or warm border. A whole card may be made
  clickable via a stretched link while inner links still work.
- A card carries: a title (`h3`, Fraunces), optional summary (`--text-soft`), and
  optional links/meta row.

## Status badges & chips

- **Lifecycle badge** (`.badge.alpha|.beta|.released`): a pill using the **fixed
  status hue** (red/amber/green from [`02-design-tokens.md`](02-design-tokens.md)),
  not the project accent. Label: "Alpha" / "Beta" / "Released".
- **Version** (`.ver`): a quiet pill, e.g. `v0.14.2`.
- **Activity** (`.activity.active|.inactive`): a small dot + label.
- **Chip** (`.mchip`): `--panel-2` fill, `--line` border, `.84rem`, pill — for meta
  facts (e.g. "Built with …").
- **Tag** (`.tag`): small, muted, pill — category/tech tags.

## Code

See [`03-layout-and-structure.md`](03-layout-and-structure.md) — `pre` blocks on
`--code-bg`, inline `code` on `--panel-3` in `--accent-ink`, family `--mono`.

## Callout / blockquote

`3px` solid `--accent` left border, `--panel-2` background, `--text-soft` text,
right corners rounded. Use for asides and notes.

## Tables

Full width, collapsed borders, `.96rem`; `th` weight 700 `--text`; row separators
are `1px --line` bottom borders. No vertical rules.

## Footer (`.site-footer`)

Full-width, multi-column, on a `.wrap`. The fairyfox.io structure:

1. **Brand column** — the brand lockup + a one-line description of the site.
2. **"Explore"** — links to the main site sections (Projects, Documentation,
   Downloads, Updates, About).
3. **"Projects"** — a link per project (to each project's node page).
4. **"Elsewhere"** — GitHub, Atom feed.
5. **Footer bar** — copyright, "Built with … · deployed on GitHub Pages", the
   GitHub handle.

**In a project docs site**, the footer keeps this shape but its links point **back
to fairyfox.io** (Explore → the main site's sections; an explicit "← Fairy Fox" /
home link) plus the project's own sections. The return path must be present in the
footer as well as the header — see
[`05-navigation-and-cross-linking.md`](05-navigation-and-cross-linking.md).

## Focus state (all interactive elements)

`:focus-visible` → `2px solid --accent` outline, `2px` offset, `5px` radius. Never
remove focus outlines. See [`07-accessibility.md`](07-accessibility.md).
