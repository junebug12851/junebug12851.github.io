# 08 · Compliance Checklist

Run this to verify a project docs site conforms. "Compliant" = **as faithful a
match to fairyfox.io as the stack allows**, with the required two-way links and
accessibility bar met. Where a check can't be met for a real, documented reason,
record the deviation (see [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)).

## Tokens & colour

- [ ] Dark theme uses the exact dark palette from [`02-design-tokens.md`](02-design-tokens.md).
- [ ] Light theme is implemented (not inverted) and uses the exact light palette.
- [ ] Colour scheme follows the OS (`prefers-color-scheme`); dark is the default.
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
- [ ] `:focus-visible` shows the accent outline on every interactive element.

## Cross-linking & branding

**Required:**

- [ ] One persistent **"← Back to Fairy Fox"** link to `https://fairyfox.io/` on
      every page (header or persistent sidebar).
- [ ] The site is reachable at `fairyfox.io/<key>/` and the registry entry
      (`docs:`, `repo:`) is accurate so the main site links *in* resolve.

**Recommended (absence is not a failure):**

- [ ] A footer linking the project's node page, repo, notes, and the main-site
      sections.
- [ ] A breadcrumb/locator near the page top.

**Branding:** the project may lead with its **own logo and name** (the Fairy Fox
mark may be replaced). Membership is carried by the **shared theme** + the way-home
link — not by brand precedence. A small Fairy Fox cue is welcome but optional.

## Seamlessness

- [ ] Header height/position/blur, fonts, `theme-color` metas, and favicon/manifest
      match the main site (no visible jump crossing the boundary).
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
- [ ] Checked in both light and dark, desktop and mobile widths.
- [ ] For the fairyfox.io master copy only: changes went through Fairy Fox's manual
      review — never auto-applied (see [`09-adopting-and-maintaining.md`](09-adopting-and-maintaining.md)).
