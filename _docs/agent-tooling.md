---
title: Agent tooling
nav_title: Agent tooling
category: standards
order: 18
summary: How an AI assistant operates a repository here — PowerShell and the file tools rather than the sandbox, and doing the work rather than handing over a script.
---

The projects are maintained with an AI assistant as a working member of the team, so how
that assistant operates a repository is itself a standard. Two rules were being
rediscovered project by project and are now inherited by every node. The canonical machine
copy is in the repository at `hub/standards/agent-tooling.md`.

## The rules

**1. Use PowerShell and the file tools, not the sandbox.** On this Windows environment the
Cowork bash sandbox is actively unreliable rather than merely redundant: it has returned
stale and truncated file reads, failed to touch `.git`, and mangled line endings badly
enough to stage thousands of phantom changes. All shell work goes through PowerShell on
the real machine; all file work goes through the editor tools.

**2. Do the work, don't hand over a script.** The assistant executes the change — builds,
verifies, commits — rather than producing instructions for the user to run. A script
handed over is unverified work.

## Line-ending hygiene

Each repository carries a `.gitattributes` that normalises line endings, so a formatter run
after a dependency upgrade doesn't drown the working tree in CRLF noise. This is what keeps
the [dependencies](/docs/dependencies/) standard's "upgrade aggressively" practical.
