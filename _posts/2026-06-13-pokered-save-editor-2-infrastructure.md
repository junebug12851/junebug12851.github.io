---
title: "Pokered Save Editor 2: versioning, i18n, a Linux test container, and real GUI tests"
subtitle: "A heavy infrastructure day — single-source versioning, translation plumbing, a Dockerised Linux harness, and tests that drive the live app."
date: 2026-06-13
tags: [pokered-save-editor-2, update]
---

A lot of foundation went into
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
this day. None of it is glamorous alone, but together it's the scaffolding the rest of
the project leans on.

## One source of truth for the version

The version number now lives in a single `VERSION` file, which CMake reads and
propagates into the runtime, the About screen, and the Windows executable resource —
with the git commit appended as build metadata. There is no longer a hardcoded version
anywhere to drift:

```cmake
file(READ "${CMAKE_SOURCE_DIR}/VERSION" PSE_VERSION)
string(STRIP "${PSE_VERSION}" PSE_VERSION)
project(PokeredSaveEditor VERSION ${PSE_VERSION} LANGUAGES CXX)
# → pse_version.h:  "0.7.0-alpha+g<hash>"
```

## Internationalisation

UI strings are now wrapped for translation, with per-locale catalogs compiled and
embedded and a `QTranslator` installed at startup (`qsTr("…")` in QML, `tr("…")` in
C++). The source language is US English; game-data names are deliberately out of scope.
Actual language switching is deferred until there's a second locale and an options
screen — the plumbing is what landed here.

## A Linux test container

A Dockerised build-and-test environment mirrors the dev kit and adds what the Windows
kit can't run — Address/UB sanitizers — plus a real virtual display and coverage:

```powershell
./docker/dtest.ps1 standard   # offscreen ctest
./docker/dtest.ps1 asan       # AddressSanitizer + UBSan (not available on the Win kit)
./docker/dtest.ps1 xvfb       # real virtual X server
./docker/dtest.ps1 coverage   # llvm-cov
```

On its first run all four variants passed, sanitizers clean, line coverage just under
90%.

## Tests that drive the real app

Two new kinds of test went in. One loads every screen through the real engine and fails
on any load error or warning — the class of problem the C++ unit tests can't see
because they never instantiate the UI, and exactly what had let a non-opening Credits
screen slip through earlier. The other boots the actual application headless and drives
it: navigate every screen, edit fields through the live UI, save, reopen, assert the
changes persisted — including a byte-fidelity test that browses everything *without*
editing and confirms not a single save byte changed.

```text
$ ctest --output-on-failure
      Start  1: tst_roundtrip
 ...
100% tests passed, 0 tests failed out of 66
```

Those tests immediately caught real crashes — a garbage save file crashing on load,
the shop screen aborting when opened with an empty cart, and a badge-count function
stubbed to always return eight. The day closed with an end-to-end redesign of the
Credits/About screen onto a data-driven back end, so adding a credit is now a single
data edit.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [Qt Linguist / `qsTr`](https://doc.qt.io/qt-6/qtquick-internationalization.html) ·
  [CMake `project(VERSION)`](https://cmake.org/cmake/help/latest/command/project.html)
- [AddressSanitizer](https://clang.llvm.org/docs/AddressSanitizer.html) ·
  [Semantic Versioning](https://semver.org/)
