---
layout: page
title: Projects
eyebrow: The work
subtitle: Fairy Fox's software projects — open a card to go straight to the project's own page.
permalink: /projects/
---

{%- assign ff_projs = site.data.projects | where_exp: "p", "p.meta != true and p.integrated != true" | sort: "updated_iso" | reverse -%}
{%- assign ff_integrated = site.data.projects | where_exp: "p", "p.integrated == true" | sort: "updated_iso" | reverse -%}
{%- assign ff_metas = site.data.projects | where: "meta", true -%}
<div class="grid cols-3" style="margin-bottom:2.4rem">
{%- for proj in ff_projs -%}{% include project-card.html proj=proj %}{%- endfor -%}
{%- for proj in ff_metas -%}{% include project-card.html proj=proj %}{%- endfor -%}
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
  served under it too — for example, <code>fairyfox.io/pokered-save-editor-2/</code>.
  Each card here opens that page directly: a site that wears the same chrome as this
  one and adds its own sub-navbar, so a project explains itself in its own words rather
  than through a copy kept on the hub.</p>
</div>

<div class="prose" style="margin-top:2.6rem">
  <h2>Farms</h2>
  <p>Two of these are <strong>farms</strong> — collections that grow on a schedule
  rather than shipping a single fixed release. Both are integrated into this site under
  their own top-level nav slot, each with its own sub-navbar and player.</p>
</div>
<div class="grid cols-3" style="margin-top:1.4rem">
{%- for proj in ff_integrated -%}{% include project-card.html proj=proj %}{%- endfor -%}
</div>
