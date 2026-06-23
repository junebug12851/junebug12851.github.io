---
title: "Random AI Prompt: untangling the word lists"
subtitle: "The lists at the heart of the generator get a deep cleanup — folders, a filename-based SFW model, dictionary-grounded categorisation, and group files."
date: 2026-06-20
tags: [random-ai-prompt, update]
---

Lists are the heart of
[Random AI Prompt](https://github.com/junebug12851/random-ai-prompt). Each is a
plain text file of options, one of which is picked at random when referenced — so
`{color}` in a prompt becomes one line from `color.txt`. Over the years the lists
had grown into a tangle: a giant unsorted dictionary, proper nouns mixed with common
words, and clunky duplicate lists. This day was a long, careful overhaul of all of
it.

## Folders and path-suffix resolution

The flat pile of files moved into category folders, with resolution by path suffix
so a bare name, a partial path, or a full path all work:

```text
data/lists/
  color.txt                      → {color}
  danbooru/d/general-sfw.txt      → {general-sfw}  or  {d/general-sfw}
  artist/dhigh.txt                → {dhigh}        or  {artist/dhigh}
```

That keeps the ~78 existing `{name}` references working while allowing deep
organisation underneath.

## A filename-based SFW model

The trickiest part was content gating, which went through several iterations before
settling on a rule keyed entirely off the **filename** — no special configuration,
no runtime filtering. A mixed-topic list is two files plus an implicit combined
reference:

```text
data/lists/danbooru/d/
  general-sfw.txt     # the safe half
  general-nsfw.txt    # the gated half
  general-sfw.json    # { "description": "Danbooru general descriptor tags (SFW)." }
```

The resolver combines them by mode: `{general}` yields the SFW half when adult
content is off and both halves when it's on, while `{general-sfw}` is always just the
safe half. The design goal was that a safe-only user never has to type anything
special to stay safe. A content-safety pass also tightened the lists, keeping
ordinary adult content gated rather than deleted, with real place names and artist
handles protected from false positives.

## Group files instead of hardcoded composites

Composite lists became real `.group` files — each line references another list (or
group), resolved by the same suffix lookup:

```text
# data/lists/artist/digipa.group
# Group: the three digital-painting impact artist lists.
artist/dhigh
artist/dmed
artist/dlow
```

Folders with two or more lists become implied groups automatically; optional
`<list>.json` sidecars supply tooltips in the editor; and `keyword` became a reserved
wildcard that draws a word from any loaded list.

## Letting a dictionary do the sorting

The cleanup ran on a principle worth stating: for proper nouns, a model's world
knowledge is the right classifier (no dictionary knows Achernar is a star), but for
parts of speech a real dictionary *states* the answer rather than guessing it. So the
dictionary dump was re-sorted into parts of speech using **WordNet** as the
authority, and a roughly 8,800-entry "keyword" junk drawer of proper nouns was
hand-classified into people, places, organisations, mythology, astronomy, religion,
history, and more — with coverage checks so nothing was silently dropped. Several
parallel review passes over the curated lists then caught and fixed hundreds of
misfiled entries (surnames sitting in a first-names list, and the like).

### References

- [Random AI Prompt repository](https://github.com/junebug12851/random-ai-prompt) ·
  [documentation site](https://fairyfox.io/random-ai-prompt/)
- [Princeton WordNet](https://wordnet.princeton.edu/) ·
  [`wordpos`](https://www.npmjs.com/package/wordpos) (the Node interface used)
