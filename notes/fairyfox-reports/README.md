# fairyfox-reports/ — process reports (fairyfox.io)

This repo is both the **hub** and a **node** in the mesh, so it keeps process reports
two ways:

1. **Reports it writes** — when fairyfox.io itself runs a system procedure (a
   hub-side inbound round-up, a report-review pass, or adopting one of its own
   standards), it logs a report here, exactly like any sibling node. fairyfox.io is a
   node too; its runs feed the same loop.
2. **Reports it reads** — during a review pass the hub reads the *siblings'*
   `notes/fairyfox-reports/` out of the read-only `assets/references/<project>/`
   clones, looks for patterns, and improves `hub/standards/` accordingly. That
   consumption side is the hub's job; this folder is only the hub's *own* reports.

One file per run: `YYYY-MM-DD-<procedure>.md`. Start from
[`../../hub/templates/fairyfox-report.md`](../../hub/templates/fairyfox-report.md).

The standard governing all of this — what triggers a report, what it must contain,
and how the review pass works — is
[`../../hub/standards/process-reports.md`](../../hub/standards/process-reports.md).
The review pass tracks how far it has digested each node's reports with the
`reports_through` marker in [`../../hub/.last-seen.yml`](../../hub/.last-seen.yml).
