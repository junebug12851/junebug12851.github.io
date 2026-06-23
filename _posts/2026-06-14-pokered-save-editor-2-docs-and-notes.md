---
title: "Pokered Save Editor 2: tightening the docs and notes system"
subtitle: "Standing policies for versioning and docs, a structured documentation site, and a deep cleanup of the project's living notes."
date: 2026-06-14
tags: [pokered-save-editor-2, update]
---

This was a maintenance-and-discipline day for
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2) —
the kind of work that keeps a project legible as it grows.

## Two standing policies

The version number is now kept current as part of each change rather than bumped later:
patch and minor increments are applied in the same commit as the work, while a major
version is reserved as a deliberate, owner-only decision. And the generated API
documentation rebuilds by default whenever the stable branch advances, so the published
docs always track what's released.

The changelog follows the same "in the same commit" idea, which removes a subtle
recursion — documenting commits in a *later* commit just creates another undocumented
commit:

```text
### 2026-06-13 — SemVer version system (single source of truth)

A real SemVer pipeline ... repo-root VERSION feeds CMake, which generates
pse_version.h with the git commit as build metadata. Full ctest 66/66 green.
```

## A navigable documentation site

The documentation site was reorganised from an auto-appended pile into a structured
tree, with the project's notes built in as a proper hierarchy alongside the C++ API
reference. A hard rule came out of it: every page is explicitly placed in the
navigation, or it floats loose at the root.

```text
notes/_nav.dox
  Project Notes ─┬─ Sessions ─── June 2026 ─── 2026-06-14
                 ├─ Reference
                 └─ Decisions
```

## A deep notes cleanup

The bulk of the day was overhauling the living-notes system itself. Per-day session
logs replaced a single growing log file, dated history moved out of the current-status
page so it describes only the present, and several overlapping reference documents were
consolidated. The notes had also briefly swapped real names for a generic "the
maintainer" everywhere; that was reverted to plain names used only where attribution
matters, in neutral phrasing.

This kind of change doesn't move the version number — documenting the documentation is
exactly the noise the inline-changelog policy avoids — but it's recorded here because
the notes are how anyone, human or otherwise, gets oriented in the project cold.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/) ·
  [project notes](https://github.com/junebug12851/pokered-save-editor-2/tree/main/notes)
- [Doxygen](https://www.doxygen.nl/) · [Semantic Versioning](https://semver.org/)
