---
title: Planning
nav_title: Planning
category: standards
order: 14
summary: Plan non-trivial work in detail before executing it — a mesh-wide default, for execution reliability rather than paperwork.
---

For any non-trivial work, write a structured plan **before** making changes, then
execute against it. The canonical machine copy of this standard is in the repository
at `hub/standards/planning.md`.

## Why

This is for **execution reliability, not paperwork.** Work runs far more dependably off
a well-organized plan than off improvisation — the plan catches contradictions and
missing pieces up front, keeps a long multi-file change coherent, and gives a clear
thing to execute against. It is primarily a benefit to the executor.

## What a plan is

A short, structured note written before the work: the **decisions** (with open
questions surfaced, not guessed), a **work breakdown** by file or area, **open items**
to confirm, and the **release shape** (branch and version level). Plans live in
`notes/plans/`.

## What's exempt

Trivial, single-step changes — a typo, a one-line fix, an obvious rename — don't need
a written plan. The bar is "non-trivial": multiple files, multiple steps, a real
decision. The rule is applied with judgment, not as bureaucracy.
