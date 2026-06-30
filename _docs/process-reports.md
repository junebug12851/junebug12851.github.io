---
title: Process reports
nav_title: Process reports
category: standards
order: 11
summary: After every run of a hub procedure, a project writes an honest report of how it went; the hub reads those reports to improve the standards.
---

The shared procedures — setting up a project, onboarding one, adopting updates, and
the hub's own passes — are written once and run many times, against repositories that
differ in ways the author could not foresee. This standard is the feedback loop that
keeps them improving instead of quietly accumulating rough edges. Its canonical copy
lives in the repository at `hub/standards/process-reports.md`; this page is the
readable summary.

## The one rule

Every time a project runs a fairyfox system procedure, it ends by writing a **process
report**: a full, honest account of how the run went — what was clear, what broke,
what was ambiguous, and what would make the procedure better. A run that only says "it
worked" wastes the loop, so a report says what was awkward even when the run
succeeded. A check-only run that applied nothing still gets a report.

## It rides the existing one-way flow

A report is just a note committed in the project's **own** repository, under
`notes/fairyfox-reports/`, named by date and procedure. Writing one pushes nothing
across repositories and triggers nothing downstream. The hub *reads* reports the same
way it reads everything else about the projects — out of the read-only, git-ignored
clones it already keeps, and only when someone asks. This preserves the
[cross-project sync](/docs/cross-project-sync/) model's anti-recursion guarantee
exactly: writing is local, reading is on-request and read-only.

## How the hub uses them

On an explicit, fairyfox-named request, the hub refreshes the clones, reads each
project's new reports since the last review (a `reports_through` marker records where
it left off), and looks across them for **patterns** — the same friction reported by
more than one project, or repeatedly by one, is a strong signal the standard, not the
run, is at fault. The hub reports its findings and then stops. Only on a go-ahead does
it improve the affected files, and always on the **hub side** — it never edits a
project to close out that project's report. Projects pick the improvements up later
through ordinary [adoption](/docs/adopting-updates/).
