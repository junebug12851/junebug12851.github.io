# 08 · Compliance Checklist

Run this to verify a project docs site conforms. "Compliant" = **as faithful a
match to fairyfox.io as the stack allows**, with the required two-way links and
accessibility bar met. Where a check can't be met for a real, documented reason,
record the deviation (see [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)).

## Tokens & colour

- [ ] Dark theme uses the exact dark palette from [`02-design-tokens.md`](02-design-tokens.md).
- [ ] Light theme is implemented (not inverted) and uses the exact light palette.
- [ ] Colour scheme follows the OS (`prefers-color-scheme`); dark is the default, and
      the OS query is guarded with `:not([data-theme])` so a manual pick wins.
- [ ] **Sepia** theme (`data-theme="sepia"`) is implemented with the exact sepia palette.
- [ ] Lifecycle status uses the **fixed** hues (red/amber/green), not the accent.
- [ ] The per-project accent is applied only to brand/links/highlights; surfaces and
      text stay on the shared palette.

## Typography

- [ ] Fraunces (display), Inter (sans/body+UI), JetBrains Mono (code) are loaded at
      the specified weights.
- [ ] Base size/line-height and the heading scale match the tokens.
- [ ] Fonts are preconnected and don't reflow on page load.

## Shell & layout

- [ ] Sticky 64px header: translucent blur, hairline, brand left, nav right.
- [ ] Footer matches the multi-column structure.
- [ ] `main` grows so the footer sits at the bottom on short pages.
- [ ] Content sits in a centred container at `--maxw` with the `--gutter` padding.
- [ ] Docs pages have a grouped, ordered sidebar with the current page marked, a
      breadcrumb, and a capped reading measure for prose.

## Components

- [ ] Buttons, cards, chips, badges, code, blockquote, tables match the component
      specs (shape, radius, border, shadow, hover).
- [ ] The **reader ("Aa") menu** is present in the header with its controls
      (theme / accent / size / spacing / width), saving to the origin-wide
      `fairyfox:reader` key with the normative constants, applied before first paint.
      **Line spacing + width are story-only** — locked (disabled + "reading a story" note)
      unless the page carries `data-story` on `<html>`; text size / theme / accent stay
      live everywhere.
- [ ] `:focus-visible` shows the accent outline on every interactive element.

## Chrome, cross-linking & branding

**Required:**

- [ ] The chrome is the **vendored [`chrome/`](chrome/) bundle** (copied verbatim +
      pulled over git), **not** a hand-built lookalike: header/subnav/footer markup and
      the `main.css`/`reader.js`/`nav.js` match the master; only `{{FF_*}}` slots +
      `.active` differ; no runtime hot-link to fairyfox.io; the adopted `chrome/VERSION`
      is recorded. Full check: [`12-shared-chrome.md`](12-shared-chrome.md#verify-is-it-being-followed).
- [ ] The **shared header** is present with the **global primary nav** in the fixed
      order **Home · Projects · Farms (Stories · Games) · Docs · Updates · About** (not
      reordered or trimmed per project; Stories + Games under the **Farms** dropdown).
- [ ] The **brand mark and `Home` nav item link to `https://fairyfox.io/`** — this is
      the way home. There is **no separate "← Back to Fairy Fox" back-button**.
- [ ] The site is reachable at `fairyfox.io/<key>/` and the registry entry
      (`docs:`, `repo:`) is accurate so the main site links *in* resolve.

**Recommended (absence is not a failure):**

- [ ] A **submenu** row below the primary nav for section/context links (the project's
      own pages, or the projects list), in the shared pill style.
- [ ] A footer linking the project's repo, notes, and the main-site sections.
- [ ] A breadcrumb/locator near the page top.

**Branding:** the project may lead with its **own name** in its sub-brand/content.
Membership is carried by the **shared chrome** (header, primary nav, footer, theme) +
the brand/Home way-home — not by brand precedence.

## Seamlessness

- [ ] Header height/position/blur, fonts, `theme-color` metas, and favicon/manifest
      match the main site (no visible jump crossing the boundary).
- [ ] The reader menu + its `fairyfox:reader` key are identical to the main site, so a
      saved theme/size/spacing/width choice persists across the boundary.
- [ ] Links between the main site and the project resolve directly (same origin, no
      redirect bounce).

## Content & organization

- [ ] Pages cover the recommended roles (overview, getting started, reference,
      changelog) grouped by category.
- [ ] Generated API docs are linked from Reference as a clear boundary, skinned where
      possible, with a way back.
- [ ] Public/website voice; refers to the parent as Fairy Fox / fairyfox.io.

## Accessibility (WCAG 2.1 AA)

- [ ] AA contrast in both themes (re-checked for any custom accent).
- [ ] Visible focus everywhere; logical focus order; keyboard-operable nav.
- [ ] `prefers-reduced-motion` honoured (ticker/lifts/scroll calm down).
- [ ] Proper landmarks and heading order; decorative images hidden, informative
      images described.

## Sign-off

- [ ] Deviations (if any) are recorded with their reason.
- [ ] Checked in light, dark **and sepia**, desktop and mobile widths.
- [ ] For the fairyfox.io master copy only: changes went through Fairy Fox's manual
      review — never auto-applied (see [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)).
