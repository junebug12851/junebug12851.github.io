---
date: 2026-06-27
procedure: report-review
node: fairyfox.io (hub)
outcome: completed
hub_version: 0.9.6
hub_commit: (this release)
---

# Process Report — report-review + force-push root-cause fix, 2026-06-27

> Hub-side inbound pass. Started as the scheduled report-review (read new sibling
> process reports, synthesize, brief). Became a live, owner-directed standards fix when
> the owner rejected the long-standing "force-push is routine" framing and asked for the
> underlying problem to be fixed. PowerShell + editor tools only (no bash).

## What was done

1. Refreshed both sibling mirrors and read the three new reports past their
   `reports_through` markers (pokered `2026-06-26-check-for-updates.md`; RAP
   `2026-06-26-adopting-updates-2.md` and `-3.md`). Wrote a findings briefing.
2. On owner pushback, diagnosed the recurring "hub `dev` was force-pushed" claim. Found
   it false: the hub's `dev` is linear (old markers still ancestors of HEAD), and
   `git-workflow.md` already forbids force-push — the sync standards contradicted it.
3. Reproduced the real cause on the disposable RAP mirror: a `--depth 1` **shallow**
   clone can't compute a merge base, so `merge --ff-only` aborts with `refusing to merge
   unrelated histories` even on a clean fast-forward. After `git fetch --unshallow`, the
   same refresh fast-forwards cleanly and the old tip is a confirmed ancestor of the new.
4. Corrected the standards (hub-side, on go-ahead): full-history single-branch mirrors,
   plain `fetch` + `merge --ff-only`, `--ff-only` abort treated as an anomaly to diagnose
   rather than a routine `reset --hard`. Unshallowed the local mirrors. Released 0.9.6.

## What went wrong / friction (the substance)

- **A false premise had been encoded as a standard and propagated widely.** "The hub's
  `dev` is force-pushed routinely" appeared in `cross-project-sync.md`,
  `adopting-updates.md`, `process-reports.md`, the report template, three READMEs, the
  `.last-seen.yml` header, and the adopted `notes/reference` copy — and it directly
  contradicted the `git-workflow.md` hard rule "never force-push." The contradiction
  should have been caught by the compliance audit; it wasn't, because no standard's
  `## Verify` checked cross-standard *consistency of claims* (only per-standard presence).
- **The workaround was destructive by default.** The mislabeled abort led the procedure
  to prescribe `reset --hard` on every refresh — a destructive command run routinely
  because of a misdiagnosis. The disposable-mirror carve-out kept it safe, but it
  normalized `reset --hard` as a step, which is the wrong instinct to teach.
- **The owner had to raise this 3–4 times.** Repeated process reports described the
  force-push as "routine / working as intended," reinforcing the false premise instead of
  questioning it. A report that accepts a surprising behavior as normal is a missed signal.

## Suggestions for the standards

- **Add a consistency check to the compliance audit** (`compliance.md`): no standard
  should assert a practice another standard forbids (here: force-push). A cross-claim
  contradiction is a compliance failure, not just a wording nit. *(Recurring-risk;
  not yet folded in — flagged for a follow-up.)*
- **Treat "this surprising thing is routine" as a yellow flag in process reports**
  (`process-reports.md` voice guidance): if a procedure keeps hitting the same friction,
  question the procedure rather than documenting the friction as expected.

## Environment

Windows, PowerShell + Read/Write/Edit (no bash sandbox). Diagnosis reproduced on the
git-ignored `assets/references/` mirrors (disposable). Hub-side change, full git-flow
PATCH release `0.9.5 → 0.9.6` on `dev`, then `main`.
