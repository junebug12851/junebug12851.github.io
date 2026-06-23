---
title: "Pokered Save Editor 2: a test suite, and the save-corruption bug it caught"
subtitle: "An automated QtTest/CTest suite goes in — and immediately turns up an off-by-one that was clobbering a byte on every save."
date: 2026-06-07
tags: [pokered-save-editor-2, update]
---

A comprehensive automated test suite now covers
[Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2),
built on [QtTest](https://doc.qt.io/qt-6/qtest-overview.html) and
[CTest](https://cmake.org/cmake/help/latest/manual/ctest.1.html). It exercises the
save-file engine, the game database, and the randomiser. To make the UI's logic
testable in the first place, that logic was extracted into a standalone `appcore`
library, so the models can now be unit-tested rather than only clicked through by
hand.

## The bug it caught on day one

The headline find was a save-corruption bug. The checksum for the second bank of PC
boxes was being written one byte early — which also overwrote the last data byte of
Box 6 on every save of a progressed file:

```cpp
// savefiletoolset.cpp — recalcChecksums()
- data[0x5A4B] = getChecksum(0x4000, 0x1A4B);  // wrong: clobbers Box 6's last byte
+ data[0x5A4C] = getChecksum(0x4000, 0x1A4C);  // correct address + range
```

The corrected address matches the original game's own `sBank2AllBoxesChecksum`
location in the [pret/pokered](https://github.com/pret/pokered) disassembly, which is
the project's oracle for anything save-format related. With the fix in, a real save
round-trips byte-for-byte:

```text
$ ctest --output-on-failure -R roundtrip
1/1 Test #1: tst_roundtrip ....................   Passed
100% tests passed, 0 tests failed out of 1
```

This is exactly the class of bug that's almost impossible to spot by eye and trivial
for a round-trip test to catch — and it's the kind this editor cares about most,
since its core promise is to change only the bytes an edit requires.

## A crash, and the randomiser

A second find was a crash in the Day Care teardown when the Day Care was empty, from
an unconditional cleanup of a pointer that could be null:

```cpp
- pokemon->deleteLater();
+ if (pokemon != nullptr) pokemon->deleteLater();
```

The randomiser also reached the point of running end to end with coverage for its
current scope — invariants checked across repeated runs, plus byte fidelity on the
results. Features that aren't built yet, like map and Hall of Fame randomisation, are
explicitly held back with re-enable notes rather than left half-wired.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [pret/pokered](https://github.com/pret/pokered) — the Gen 1 disassembly used as the save-format oracle
- [QtTest](https://doc.qt.io/qt-6/qtest-overview.html) · [CTest](https://cmake.org/cmake/help/latest/manual/ctest.1.html)
