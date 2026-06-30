---
title: Updates and cross-project round-ups
nav_title: Updates & round-ups
category: site
order: 4
summary: How update posts are written, including the round-ups that report what changed across the projects.
---

The [updates feed](/blog/) carries two kinds of post: ordinary write-ups, and
**cross-project round-ups** that report what changed in the projects. Both are
written in the site's neutral, work-forward voice.

## Ordinary posts

An update post is a Markdown file in `_posts/YYYY-MM-DD-title.md` with front matter
for its title, an optional subtitle, the date, and tags:

```yaml
---
title: "Post title"
subtitle: "Optional one-liner shown in lists and at the top."
date: YYYY-MM-DD
tags: [project-key, update]
---
```

It then appears automatically on the home page (the latest few), the updates index,
and the Atom feed.

## Cross-project round-ups

The standing job is to periodically check the projects for changes and write up the
interesting ones. It runs only on explicit request — a person asking, or a
scheduled task that asks for a pass — never as silent automation. A pass is:

1. **Refresh the clones.** For each project in the registry, fast-forward its `dev`
   branch in `assets/references/<project>/` (see
   [cross-project sync](/docs/cross-project-sync/)).
2. **See what changed since last time.** The reliable signal is each project's own
   living history — the new entries in its changelog and session logs, plus its
   recent commit log. The stopping point is recorded so the next pass knows where to
   resume.
3. **Judge what's worth saying.** Not every commit is a story. Related changes are
   grouped into themes; pure chores are skipped. The aim is "what got better and
   why it matters," not a raw commit dump.
4. **Draft the post**, tagged with the project and `update`, linking to the
   repository and to specific commits where useful.
5. **Publish** through the normal git flow, with the changelog entry and any version
   bump riding inside the same commit.

This is exactly the kind of work the [cross-project sync](/docs/cross-project-sync/)
model is built to support: the hub reads the projects, summarises them, and never
writes back into them.
