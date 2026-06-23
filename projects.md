---
layout: page
title: Projects
eyebrow: The work
subtitle: Fairy Fox's software projects, each linking into its documentation, downloads, and source.
permalink: /projects/
---

<div class="grid cols-3" style="margin-bottom:2.4rem">
{%- for proj in site.data.projects -%}
  <article class="card proj-card">
    <div class="proj-top">
      <span class="proj-glyph" aria-hidden="true">{{ proj.name | slice: 0, 1 }}</span>
      <h3>{{ proj.name }}</h3>
    </div>
    <p class="blurb">{{ proj.blurb }}</p>
    <div class="tags">
      {%- for t in proj.tags -%}<span class="tag">{{ t }}</span>{%- endfor -%}
      {%- if proj.status -%}<span class="tag muted">{{ proj.status }}</span>{%- endif -%}
    </div>
    <div class="card-links">
      <a href="{{ proj.key | prepend: '/docs/' | append: '/' | relative_url }}">Documentation →</a>
      {%- assign dl = site.data.downloads | where: "key", proj.key | first -%}
      {%- if dl -%}<a href="{{ '/downloads/' | relative_url }}#{{ proj.key }}">Downloads</a>{%- endif -%}
      {%- if proj.docs -%}<a href="{{ proj.docs }}">Docs site ↗</a>{%- endif -%}
      <a href="{{ proj.repo }}">Repository ↗</a>
    </div>
  </article>
{%- endfor -%}
</div>

<div class="prose">
  <h2>How the projects connect</h2>
  <p>This site is the hub for the projects above. The shared engineering standards
  they follow are documented in the <a href="/docs/">documentation library</a>, and
  each project pulls those standards from the hub on demand. In the other direction,
  the hub keeps read-only copies of the projects so their changes can be tracked and
  written up. The connections are deliberately loose — git only, no live coupling —
  which keeps each repository independent. The full model is described under
  <a href="/docs/cross-project-sync/">cross-project sync</a>.</p>
  <p>Because the hub uses a custom domain, the projects' own GitHub Pages sites are
  served under it too — for example, <code>fairyfox.io/pokered-save-editor-2/</code>
  — so the navigation can lead straight into a project's documentation.</p>
</div>
