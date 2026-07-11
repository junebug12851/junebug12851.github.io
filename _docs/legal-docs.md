---
title: Legal docs
nav_title: Legal docs
category: standards
order: 17
summary: Every project ships self-hosted, code-accurate Privacy, Terms, and Cookies pages — written against what the code actually does.
---

Every repository ships three legal pages — a Privacy Policy, Terms & Conditions, and a
Cookies Policy — self-hosted and kept accurate to the code. The canonical machine copy of
this standard is in the repository at `hub/standards/legal-docs.md`.

## The rules

- **Self-host, don't link out.** The pages live in the repository and are served from the
  project's own origin. A third-party generator link can break, rebrand, or disappear.
- **Accurate to the code, not boilerplate.** Generator drafts describe accounts, marketing
  email, tracking cookies, and camera access that most of these projects simply do not
  have. Claiming data practices a project doesn't have is both untruthful and less
  defensible than the honest version.
- **Uniform coverage.** A project with a user-facing surface serves the pages from that
  surface. A project without one — a pure library or tool — still ships the minimal
  truthful version: no data collected, no cookies, no accounts.
- **A living surface.** When the code's data practices change, the pages change in the
  same release.

The same accuracy discipline applies to a project's `SECURITY.md` — see
[supply-chain hardening](/docs/supply-chain-hardening/).
