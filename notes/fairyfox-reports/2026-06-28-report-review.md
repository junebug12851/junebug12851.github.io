---
date: 2026-06-28
procedure: report-review
node: fairyfox.io (hub)
outcome: completed
hub_version: 0.9.8
hub_commit: (this release)
---

# Process Report — report-review + fold sibling feedback, 2026-06-28

> Hub-side inbound pass. Started as the scheduled report-review (read new sibling
> process reports, synthesize, brief), then became a live, owner-directed standards fold
> when the owner said "if there's things that need to be done then please do them."
> PowerShell + editor tools only (no bash).

## What was done

1. Refreshed both sibling mirrors — **both fast-forwarded cleanly, no re-clone, no
   `reset --hard`** (the 0.9.6 full-history-mirror fix working). pokered-save-editor-2
   unchanged at `1bae326`; random-ai-prompt `cb805ef → e491232`.
2. Read the four new reports past their `reports_through` markers: PSE2's
   `2026-06-26-check-for-updates.md` (no-change), and RAP's `…-adopting-updates-2.md`
   (hub 0.9.2 adopt), `…-adopting-updates-3.md` (0.9.4 adopt), and
   `2026-06-27-adopting-updates.md` (0.9.5 check-only, which also surfaced a half-finished
   merge in the node, correctly left untouched).
3. Wrote a findings briefing (`notes/fairyfox-reports/inbound/INBOX-2026-06-28-0635.md`).
4. On the owner go-ahead, folded the actionable feedback into the standards (below),
   advanced the markers, and released 0.9.8.

## What was folded (and what wasn't)

- **Theme B — CI-owns-tag elevated (`git-workflow.md`).** RAP run-2 flagged that its
  tag-gated `release.yml` means a hand-pushed tag silently no-ops the release. The CI-vs-hand
  guidance existed but sat after the commands; added a callout at the top of "Cutting a
  release" so a tag-gated project sees "check `release.yml` first" before copying the
  hand-tag lines.
- **Theme D — check-time working-tree glance (`adopting-updates.md`).** RAP's 2026-06-27
  unattended check found the repo mid-merge with conflicts. Added a step to the
  check-and-report default + a Verify bullet: glance at the node's own tree and surface
  anything alarming, acting on nothing.
- **Theme C — stale `hub_version` backfill (`process-reports.md`).** One line: backfill a
  placeholder anchor off the changelog.
- **Theme A — the recurring "force-push" ask, declined.** All four reports asked to promote
  the `reset --hard` force-push fallback to a first-class step. Not adopted — 0.9.6 already
  established it was a `--depth 1` shallow-mirror misread, not a real force-push, and today's
  clean fast-forwards prove it. Instead added a pre-0.9.6 re-adopt nudge to
  `adopting-updates.md` step 1, so a node still carrying the old wording knows to re-adopt the
  corrected refresh and unshallow its mirror once.

## What went well

- The 0.9.6 fix is visibly paying off: both mirror refreshes fast-forwarded cleanly, no
  shallow-mirror abort, no `reset --hard`. The friction four reports complained about is gone
  at the source.
- The `reports_through` filename-list marker made "what's new" unambiguous against a repo that
  had moved twice during the day (the concurrent 0.9.7 round-up advanced the round-up markers
  but correctly left `reports_through` alone).

## What went wrong / friction

- **The repo moved under the pass.** Between the scheduled briefing and the owner's go-ahead,
  a separate live session committed and released 0.9.7 (`dev 300b8ab → 9694c25`, `main`
  shipped `v0.9.7`). It was a cleanly-shipped unit (tree clean), so building 0.9.8 on top was
  safe — but it's a reminder that the hub repo can have two passes interleaving in one day. The
  start-of-run `git status` + log check (per the concurrency rule) is what caught it; worth
  keeping that check mandatory for every hub-side pass, not just node check-only runs.
- **A `Set-Content -NoNewline` mistake briefly collapsed `VERSION`.** Bumping the number with
  `(Get-Content) -replace … | Set-Content -NoNewline` joined the comment lines onto one line.
  Caught immediately via `git diff` and rewritten correctly. Lesson: for `VERSION`, edit the
  single line with the editor tools, not a pipe that re-serializes the whole file.

## Suggestions for the standards

- Most of the reports' asks were **already addressed** by 0.9.3/0.9.6 — the new reports
  predated those fixes. The one genuinely-open item carried over from the 2026-06-27 report is
  still open: **add a cross-claim consistency check to `compliance.md`** (no standard should
  assert a practice another forbids). Not folded this pass; still flagged for a follow-up.

## Environment

Windows, PowerShell + Read/Write/Edit (no bash sandbox). Sibling diffs read from the
git-ignored `assets/references/` mirrors (disposable, both fast-forwarded). Hub-side change,
full git-flow PATCH release `0.9.7 → 0.9.8` on `dev`, then `main`. No node was edited; nodes
adopt the improvements later through ordinary adoption.
