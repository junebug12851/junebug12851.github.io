# hub/templates/ — copy-paste starting files

Ready-to-use files for a new or adopting project. **Copy** them into the project
and adjust — they become part of that repo (not a live link). See the standards
in [`../standards/`](../standards/) for the *why* behind each.

| Template | Copy to | Then |
|----------|---------|------|
| `CLAUDE.md` | repo root | Fill in the project identity, landmines, build/run, and any project-specific standing instructions. Follows [`../standards/ai-context.md`](../standards/ai-context.md). |
| `VERSION` | repo root | Set the starting number (usually `0.1.0`). Follows [`../standards/versioning.md`](../standards/versioning.md). |
| `project.gitignore` | merge into `.gitignore` | Adds the `assets/references/` ignore (+ common cruft). |
| `notes-skeleton/` | `notes/` | The living-notes tree (includes `fairyfox-reports/`). Follows [`../standards/notes-system.md`](../standards/notes-system.md). |
| `fairyfox-report.md` | `notes/fairyfox-reports/YYYY-MM-DD-<procedure>.md` | One per run of a fairyfox system procedure — the feedback the hub reviews. Follows [`../standards/process-reports.md`](../standards/process-reports.md). |

## One-time adoption (run inside the project)

```sh
git -C assets/references clone --depth 1 --branch dev \
    https://github.com/junebug12851/junebug12851.github.io fairyfox.io
H=assets/references/fairyfox.io/hub/templates

cp $H/CLAUDE.md ./CLAUDE.md
cp $H/VERSION   ./VERSION
cat $H/project.gitignore >> ./.gitignore
cp -r $H/notes-skeleton ./notes

# edit the copied files for this project, then commit them
```
