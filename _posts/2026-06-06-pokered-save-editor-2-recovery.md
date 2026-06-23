---
title: "Pokered Save Editor 2: recovering a corrupted working tree"
subtitle: "A bulk rename truncated dozens of files on disk. Here's how the project was rebuilt and why the fix is a permanent rule."
date: 2026-06-06
tags: [pokered-save-editor-2, update]
---

The 2026 revival of [Pokered Save Editor 2](https://github.com/junebug12851/pokered-save-editor-2)
— the Qt 6 / C++ rewrite of the original save editor — began with a setback worth
recording, because the recovery from it shaped a standing rule for the project.

## What happened

A bulk rename run over the editor's working copy silently truncated 55 source files
and 8 notes on disk. The command looked harmless:

```sh
# Ran over the working mount — silent partial writes under load
sed -i 's/OldText/NewText/g' projects/**/*.cpp
```

The tooling underneath was doing partial writes under load, and it had also been
reporting some *reads* as truncated when they were intact. Worse, the damage had
already been committed, so the latest commit was not a usable restore point — `git
checkout` would only restore the broken files.

## Recovering from transcripts

The tree was reconstructed from prior working-session transcripts, which record every
file read and write in full. Most of the ~45 affected source files came back exactly;
a handful of large files were rebuilt by replaying their recorded edit history onto a
known-good 2020 baseline, then validated line by line against the most recent reads.

The end state was verified mechanically rather than trusted:

```text
$ verify
380 source files
  0 truncated
  0 missing Apache-2.0 headers
  0 leftover corruption markers
```

After that, the recovered tree was taken from "compiles" to "compiles, links, runs,
and matches the previous build's behaviour" by working through the residual defects
one at a time.

## The rule that came out of it

The lasting outcome is a hard rule, now in the contributor docs: never bulk-edit
files with shell stream tools over this working mount — use real editors or verified
writes, and check every write.

```powershell
# Safe pattern: explicit UTF-8 (no BOM) write, then re-read + brace-balance check
[System.IO.File]::WriteAllText($path, $text, (New-Object System.Text.UTF8Encoding $false))
```

Save-data fidelity is the whole point of this editor, so the same caution that
protects a player's save file now protects the source that edits it. Alongside the
recovery, a project-wide documentation pass kicked off, with the shared `common` layer
fully doc-commented as the style reference for the rest of the codebase.

### References

- [Pokered Save Editor 2 repository](https://github.com/junebug12851/pokered-save-editor-2) ·
  [documentation site](https://fairyfox.io/pokered-save-editor-2/)
- [`git checkout` limits when HEAD itself is bad](https://git-scm.com/docs/git-checkout) ·
  [.NET `File.WriteAllText` encodings](https://learn.microsoft.com/dotnet/api/system.io.file.writealltext)
