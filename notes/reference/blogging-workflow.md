# Updates / Blogging Workflow — day-centric

How posts get written. **The unit of a post is a *day*, not a project.** A post is
about *what happened that day* across everything — and "what happened" includes both
**work** (code/changes in any or all projects) and **talking** (discussion, decisions,
design, planning, this kind of back-and-forth). The day is the story; projects are just
some of what the day touched.

## The core model

- **One post per day, spanning whatever the day touched.** If a day saw work on two
  projects plus a design discussion, that's *one* post covering all of it — not three.
  Merge by day; don't split by project.
- **Talking counts, not just commits.** Decisions, direction changes, design
  conversations, planning — these are first-class content. A day can be mostly (or
  entirely) discussion and still be worth a post.
- **Session notes feed the post.** The day's `notes/sessions/YYYY-MM/YYYY-MM-DD.md`
  log is the raw material. Fold it into that day's post. **A discussion-only day**
  (no code work) still gets a post — a session/notes-style update of what was talked
  through and decided.
- **Cover the day properly.** Aim to genuinely reflect the day — the work *and* the
  thinking — not a thin changelog line.
- **Faithful to the actual day.** A post is dated to when the work and discussion actually
  happened. **Don't move or postpone a post to a different day because it would look tidier**
  — only reassign a day when analysis genuinely supports it (e.g. the work really belongs to
  that day). The history should reflect reality, not a nicer-looking timeline.

## Writing a post

Create `_posts/YYYY-MM-DD-<day-slug>.md` — the slug names the **day's theme**, not a
project (e.g. `2026-06-24-design-direction-and-mockups`, not
`...-random-ai-prompt-update`). Front matter:

```yaml
---
title: "What the day was about"
subtitle: "Optional one-liner shown in lists and at the top."
date: YYYY-MM-DD
tags: [<each project touched>, <topics>, update]   # e.g. [pokered-save-editor-2, random-ai-prompt, design, update]
---
```

Tag **every project the day touched** plus topic tags (`design`, `notes`, `site`,
`update`…) so per-project and per-topic views can still filter to it. Structure the body
by theme — a short framing of the day, then sections for each strand (a project's work,
a discussion, a decision). It appears automatically on the home page (latest few),
`/blog/` (Updates), and `/feed.xml`. Commit on `dev`, FF `main` to publish.

## The gathering pass (look across everything, then write the day)

Runs on explicit request (a human ask or a scheduled prompt) — never silent automation;
keeps the pull-on-request / anti-recursion rule intact
([`cross-project-sync.md`](cross-project-sync.md)). The clones this pass refreshes also
carry each node's `notes/fairyfox-reports/`; reviewing those **process reports** to
improve the standards is a sibling pass with its own runbook
([`../../hub/standards/process-reports.md`](../../hub/standards/process-reports.md)) —
related but distinct from writing the day's post.

1. **Refresh the clones.** For each project in
   [`../../hub/registry.yml`](../../hub/registry.yml), fast-forward its `dev` branch in
   `assets/references/<project>/` (`fetch` + `merge --ff-only`).
2. **Reconstruct each day.** For the day(s) since last time, read — across *all*
   projects — their `notes/sessions/` (day logs) and `notes/version/` (changelog), plus
   `git -C assets/references/<project> log --oneline`. **Include the hub (fairyfox.io)
   as a project too** — read its *own* `notes/version/` (changelog), `VERSION`, and
   `notes/sessions/`. The hub's work, version bumps, and the day's talking/decisions all
   belong in the day's post, exactly like the siblings — don't cover only the other
   projects. Record where you stopped (`hub/.last-seen.yml` or cite the range).
3. **Assemble per day, not per project.** Group everything that happened on a given day
   — every project + every discussion — into that day's single post. Judge what's worth
   saying: themes over raw commits, decisions over chores.
4. **Draft + publish** via the normal git flow; inline changelog entry
   ([`../version.md`](../version.md)) and a PATCH `VERSION` bump in the same commit.

## Voice & scope

- **Neutral documentation voice** — *not* first person, not glorifying (see
  [`../context/principles.md`](../context/principles.md)). The assistant is the site's
  voice; let the day's work and thinking be the star.
- Honest and concrete: real work, real discussions, real reasons. No hype.
- Day-centric and merged: combine projects and topics into the day. Multiple posts for a
  single day only when genuinely warranted (rare).

## Retro note (2026-06-24, done)

The `_posts/` were reworked day-centric: the two multi-post days (Jun 22, Jun 23) were
**merged** into one day post each (content preserved), a **design-day** post was added for
Jun 24, and the **hub is tagged as a project** (`fairyfox-io`) on the days it was touched so
it surfaces on its own node. Single-focus days were already one post per day and were left
as-is (re-titling them to a day narrative is an optional future nicety). The card/node
templates no longer strip a project name from titles, so day-centric titles render whole.

## Optional: schedule it

A recurring pass can be set up with the scheduled-tasks tooling (e.g. weekly: "refresh
the clones, reconstruct each day across all projects + the hub's session notes, and draft
day-centric updates"). It still produces a *draft to review*.
