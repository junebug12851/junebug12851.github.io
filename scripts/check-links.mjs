#!/usr/bin/env node
// check-links.mjs — doc-drift gate (repo-hygiene standard). Zero dependencies.
//
// Walks every tracked *.md (minus generated/vendored trees) and fails on any RELATIVE
// link whose target file doesn't exist. Wired into CI (.github/workflows/ci.yml) so a
// rename/move/removal that leaves a dangling link turns the build red. Runs under bare
// `node` — no npm project needed (this repo is Ruby/Jekyll).
//
//   node scripts/check-links.mjs      → exit 1 (and a list) on any broken link
//
// SKIP scoping for THIS repo (fairyfox.io):
//   - vendored/generated trees: node_modules, _site, vendor, assets/references (hub-mirror clones)
//   - Jekyll permalinked collections whose .md links are PERMALINKS, not filesystem paths:
//     _posts (blog) and _docs (the on-site docs library). notes/ + hub/ are authored prose
//     with real relative links and ARE checked.
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";

const SKIP = [
  /(^|\/)node_modules\//, /(^|\/)_site\//, /(^|\/)vendor\//, /(^|\/)assets\/references\//,
  /(^|\/)_posts\//, /(^|\/)_docs\//,   // permalinked Jekyll collections
];
const files = execSync("git ls-files *.md **/*.md", { encoding: "utf8" })
  .split("\n").filter(Boolean).filter((f) => !SKIP.some((re) => re.test(f)));

const LINK = /\[[^\]]*\]\(([^)]+)\)/g;   // [text](target)
// Strip fenced + inline code BEFORE matching, so a markdown link QUOTED inside code
// (e.g. a doc describing this very false positive) doesn't trip the gate.
const decode = (t) => t.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
let broken = 0;

for (const file of files) {
  const text = decode(execSync(`git show HEAD:"${file}"`, { encoding: "utf8" }));
  for (const m of text.matchAll(LINK)) {
    let target = m[1].trim().split(/\s+/)[0];          // drop optional "title"
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(target)) continue;  // external / same-page
    target = target.replace(/[#?].*$/, "");            // strip fragment/query
    if (!target) continue;
    let path = target.startsWith("/") ? join(".", target) : resolve(dirname(file), target);
    if (existsSync(path)) continue;
    if (existsSync(path + ".md") || (existsSync(path) && statSync(path).isDirectory())) continue;
    console.error(`BROKEN  ${file}  ->  ${m[1]}`);
    broken++;
  }
}

if (broken) { console.error(`\n${broken} broken link(s).`); process.exit(1); }
console.log(`check-links: ${files.length} files OK`);
