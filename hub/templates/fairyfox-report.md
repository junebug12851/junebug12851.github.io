---
date: YYYY-MM-DD
procedure: <setup | onboarding | adopting-updates | roundup | check-only>
node: <project-key>            # the repo this report is about (e.g. random-ai-prompt)
outcome: <completed | partial | checked-only | aborted>
hub_version: <X.Y.Z>           # the hub VERSION the run was against
hub_commit: <short-sha>        # the hub dev commit the run was against
---

# Process Report — <procedure>, <YYYY-MM-DD>

> A full, honest account of running a fairyfox system procedure. The point is to
> improve the system — so say what was rough even if the run succeeded. Voice: direct,
> matter-of-fact, no hype. Standard: `hub/standards/process-reports.md`.

## Outcome in one line

<e.g. "Adopted the git-flow standard and renamed master->main; docs-site theming left partial.">

## What was done

<The path actually taken, step by step at a useful grain. Note any deviation from the
runbook and why you deviated.>

## What went well

<What was clear and worked first try — so it doesn't get "improved" away.>

## What went wrong / friction

<The heart of the report. Be specific:
- Steps that were ambiguous or out of order.
- Commands that failed, and what the real fix was.
- Places the standard didn't match this repo.
- Anything that cost time or needed a guess.
A vague report here can't be acted on.>

## Suggestions / feedback

<Concrete proposed changes to the procedure / standard / template / wording. Tie each
to a friction point above where you can. "Step 4 should say X" beats "step 4 was
confusing".>

## Environment

<Anything about this repo/run that shaped the experience: stack, OS/shell, hand-authored
vs generator docs, pre-existing structure, branch model on arrival. Helps the hub tell a
one-off from a pattern.>
