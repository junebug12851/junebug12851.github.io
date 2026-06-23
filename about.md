---
layout: page
title: About this site
eyebrow: About
subtitle: What fairyfox.io is, what lives here, and how it is built and kept current.
permalink: /about/
---

<div class="prose">
  <p>fairyfox.io is the project hub and documentation library for the software work
  of Fairy Fox (<a href="https://github.com/junebug12851">@junebug12851</a> on
  GitHub). It exists to be a single, current front door to that work — somewhere that
  says what is being built and links straight to it, instead of a scatter of
  repositories with no index. The site is written as documentation: a neutral, plain
  account of the projects and the conventions behind them.</p>
</div>

<div class="grid cols-3" style="margin:1.8rem 0 2.4rem">
  <a class="card" href="{{ '/projects/' | relative_url }}">
    <h3>An index of the projects</h3>
    <p>Every project in one place, generated from a single registry so the list never
    drifts out of date.</p>
    <div class="card-links"><span>Projects →</span></div>
  </a>
  <a class="card" href="{{ '/docs/' | relative_url }}">
    <h3>A documentation library</h3>
    <p>How the projects fit together, how this site is built, and the shared
    engineering standards the repositories follow.</p>
    <div class="card-links"><span>Documentation →</span></div>
  </a>
  <a class="card" href="{{ '/blog/' | relative_url }}">
    <h3>A running log of changes</h3>
    <p>Update posts and round-ups of what changed across the projects, with an Atom
    feed.</p>
    <div class="card-links"><span>Updates →</span></div>
  </a>
</div>

<div class="prose">
  <h2>The projects</h2>
  <p>Three projects sit around the hub, each developed in the open with its own
  documentation and releases:</p>
  <ul>
    <li><strong><a href="/docs/pokered-save-editor-2/">Pokered Save Editor 2</a></strong>
    — a desktop save-file editor for Pokémon Red &amp; Blue, built in Qt 6 (C++/QML).
    It reads and writes saves byte-for-byte and is the project the shared engineering
    standards originally came from. It is currently in alpha.</li>
    <li><strong><a href="/docs/pokered-save-editor/">Pokered Save Editor</a></strong>
    — the predecessor: the original editor, built with Electron and Angular. It is
    complete and stable, and remains the recommended working tool until the Qt 6
    rewrite reaches parity.</li>
    <li><strong><a href="/docs/random-ai-prompt/">Random AI Prompt</a></strong> — a
    JavaScript prompt generator for Stable Diffusion, with a web UI and one-click
    image-to-animation export.</li>
  </ul>
  <p>The full list, with links to each project's documentation, downloads, and source,
  is on the <a href="/projects/">projects</a> page.</p>

  <h2>How it's built</h2>
  <p>The site is a static <a href="https://jekyllrb.com/">Jekyll</a> site with no
  external theme: the layouts, includes, and stylesheet are hand-owned, for full
  control and no theme churn. It is built and deployed by GitHub Actions on every
  push — there is no manual publishing step — and hosted on GitHub Pages as a user
  site, served at the <code>fairyfox.io</code> custom domain. Because the domain is
  set on the user site, each project's own GitHub Pages site is served under it too
  (for example, <code>fairyfox.io/pokered-save-editor-2/</code>), so the navigation
  links straight into a project's documentation. The fuller account is under
  <a href="/docs/site-architecture/">how fairyfox.io is built</a> and
  <a href="/docs/site-deployment/">deployment</a>.</p>

  <h2>How it stays current</h2>
  <p>Two things keep the site from drifting. First, the parts that can be generated
  are generated: the projects list, the navigation menus, and the updates feed all
  render from single sources, so adding a project or a post is one small edit rather
  than several. Second, behind the site is a structured, living set of notes — the
  same notes system the projects use — so the repository documents itself and anyone
  opening it can get oriented without outside context. The whole of that knowledge
  base is surfaced, in a readable form, under <a href="/docs/">this site</a> in the
  documentation library.</p>

  <h2>How the projects connect</h2>
  <p>This repository is the hub for the projects, and the relationship is
  deliberately loose: communication happens through git only, one direction at a
  time, and only on request. The hub keeps read-only copies of the projects so their
  changes can be summarised here, and each project pulls the hub's shared standards
  when it wants to adopt them. There are no submodules and no live coupling, which
  keeps every repository independent. The full model is documented under
  <a href="/docs/cross-project-sync/">cross-project sync</a>.</p>

  <h2>A note on voice</h2>
  <p>The site is written <em>about</em> the work rather than in the first person, and
  it does not set out to glorify anything — it documents and indexes. Fairy Fox is
  named for attribution; the work itself is meant to be the subject. The source for
  this site is public: it is the repository that hosts it.</p>
</div>
