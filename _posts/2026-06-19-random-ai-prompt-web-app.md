---
title: "Random AI Prompt: a new home for the web app"
subtitle: "The React front end is reworked into a proper app — matched to the original's look, then decluttered into a focused workspace."
date: 2026-06-19
tags: [random-ai-prompt, update]
---

With [Random AI Prompt](https://github.com/junebug12851/random-ai-prompt)
modernised and documented, attention turned to its React web app. It worked, but it
felt like a developer tool: a light default theme, a cramped column, and most
features hidden behind comments so only a bare "Build" tab showed.

## Matching the original's look

The first pass rebuilt the home page around the visual language the original
pre-revival generator had established — a dark charcoal canvas with a mint-green
accent — captured as CSS variables so the theme is defined in one place:

```css
:root {
  --bg:           hsl(0 0% 13%);   /* charcoal canvas */
  --text:         hsl(0 0% 96%);
  --accent:       #34e2a0;         /* mint green */
  --font-display: "Space Grotesk", system-ui, sans-serif;
}
```

The real source files were rebuilt rather than mocked up, and the shared-link
feature that seeds the app from a URL (`#s=…`) was preserved throughout.

## Decluttering into a workspace

A round of feedback then pushed it from "redesigned" toward "feels like an app." The
made-up tagline and centred hero went; the display font changed to one that read
less like a logo; and image generation, the chaos control, and presets were pulled
off the home screen for now. Nothing was deleted outright — everything removed was
logged for later in a `removed-pending-readd.md` note, with presets explicitly
slated to return as a richer feature. The layout became a full-height app window with
a left building-blocks pane beside the composer, and the prompt input was simplified
so its rotating placeholder *is* the live suggestion.

## A small fix with a lesson attached

One exchange is worth recording. An offhand remark that the Share link "doesn't work
and was complicated" was wrongly taken as an instruction to remove it. It was an
observation, not an order — so the feature was restored and then actually fixed. The
old version flashed a tiny "Link copied!" and failed silently when the clipboard API
was blocked; the new one keeps the link visible in a selectable field, so it works
regardless:

```jsx
function ShareLink({ url }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true); }
    catch { /* clipboard blocked — the field below still shows the link */ }
  };
  return (
    <div className="share">
      <input readOnly value={url} onFocus={(e) => e.target.select()} />
      <button onClick={copy}>{copied ? "✓ Copied" : "Copy"}</button>
    </div>
  );
}
```

The takeaway, noted for next time: a critique or a question is an invitation to
explain or ask, not permission to delete.

### References

- [Random AI Prompt repository](https://github.com/junebug12851/random-ai-prompt) ·
  [documentation site](https://fairyfox.io/random-ai-prompt/)
- [React](https://react.dev/) · [Vite](https://vite.dev/)
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) ·
  [`navigator.clipboard.writeText`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
