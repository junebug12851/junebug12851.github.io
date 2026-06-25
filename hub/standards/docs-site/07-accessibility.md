# 07 · Accessibility

The fairyfox.io theme is tuned to **WCAG 2.1 AA**, and a compliant docs site must
hold that bar. Accessibility is part of "matching the look" — not a separate
nicety.

## Contrast

- Body and UI text must meet **AA contrast** against their background (≥ 4.5:1 for
  normal text, ≥ 3:1 for large text ≥ 24px or 19px bold).
- The token palette is already tuned for this in **both** themes — if you stay on
  the tokens (`--text` / `--text-soft` / `--text-faint` on `--bg` / `--panel`),
  you inherit compliant contrast. If you introduce a custom per-project accent,
  **re-check** any text or UI that sits on or uses that accent.
- Don't convey meaning by colour alone — lifecycle badges pair the hue with a text
  label; activity pairs the dot with a word.

## Both themes are first-class

Dark is the default; light follows `prefers-color-scheme`. **Design both** — never
ship a light theme that's just an inversion. Verify contrast and legibility in each.

## Focus visibility

- Every interactive element shows a visible focus ring on keyboard focus:
  `:focus-visible` → `2px solid var(--accent)`, `2px` offset, `~5px` radius.
- **Never** remove outlines without an equally visible replacement.
- Focus order follows reading order; nothing interactive is keyboard-unreachable.

## Reduced motion

Honour `prefers-reduced-motion: reduce`: disable or near-zero the ticker/marquee
animations, hover lifts, and smooth scroll. Content must be fully usable with all
motion off. The accent "pulse" dot and any auto-scrolling activity ticker must stop
under reduced motion.

## Semantics & structure

- One `<h1>` per page (the page title); headings nest without skipping levels.
- Use real landmarks: `<header>`, `<nav aria-label="…">`, `<main>`, `<footer>`,
  `<aside>` for the docs sidebar.
- The mobile nav toggle is a real `<button>` with `aria-label` and
  `aria-expanded` reflecting state.
- Images that are decorative (brand glyphs, background) get empty `alt` /
  `aria-hidden`; informative images get real alt text.
- Links have discernible text; avoid bare "click here". The breadcrumb is a real
  list/nav with the current page marked.

## Targets & input

- Interactive targets are comfortably tappable (~44px effective on touch); the
  mobile nav toggle is 42px and pill controls have generous padding.
- Don't trap keyboard focus in menus; Escape/outside-click closes the mobile nav.

## Verify

Check each docs site against [`08-compliance-checklist.md`](08-compliance-checklist.md),
which folds these accessibility checks into the overall pass.
