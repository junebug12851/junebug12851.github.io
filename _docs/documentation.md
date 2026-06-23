---
title: Documentation and house style
nav_title: Documentation
category: standards
order: 6
summary: The documentation set each repository keeps, and the plain house style used to write it.
---

Each repository keeps a layered documentation set, written in a consistent house
style. The canonical machine copy of this convention lives in the hub.

## The documentation set

| Document | Audience | Purpose |
|----------|----------|---------|
| `README.md` | People landing on the repository | What it is, how to build and run it, the map of the repository |
| `CLAUDE.md` | An AI assistant opening the repository cold | The entry point — points at the notes and lays out the standing workflow |
| `notes/` | Both | The living knowledge base (the [notes system](/docs/notes-system/)) |
| `hub/` | Other repositories | The shared standards and templates other projects adopt |
| The public site | Visitors | The elevator pitch and the updates feed |

These overlap on purpose, at different depths: the site is the elevator pitch, the
README is the repository tour, and `CLAUDE.md` together with the notes is the full
manual.

## House style

- **Direct and plain.** Notes, not prose poetry. Short beats long, with no filler
  introductions or conclusions.
- **Code blocks for code, tables for lookups.**
- **The single most important line in a section is bold**, so it is easy to find.
- **Cross-link rather than duplicate.** One fact has one home; everything else links
  to it.
- **Present tense, written from the project's point of view.**

## Keeping documentation current

Documentation is living and updated by default as work happens, not as a separate
chore. The rule of thumb: if a future reader — the author in six months, or an
assistant opening the repository cold — would be confused without it, it is written
down in the right place now, not later.
