---
layout: page
title: Downloads
eyebrow: Get the builds
subtitle: The latest build artifacts for each project, with quick install-and-run instructions.
permalink: /downloads/
---

<div class="prose">
<p>
  Each project below links to the latest build artifacts published on GitHub. Pick
  the tab for your platform for a direct download and the short version of how to
  install and run it; the <strong>Source &amp; build</strong> tab covers running it
  yourself. Every project also links to its full <strong>release page</strong> (always
  the newest build) and its <strong>README</strong> for the complete instructions.
</p>
</div>

{%- for dl in site.data.downloads -%}
  {%- assign proj = site.data.projects | where: "key", dl.key | first -%}
<section class="dl-project" id="{{ dl.key }}">
  <div class="dl-head">
    <div>
      <h2 class="mb0">{{ proj.name | default: dl.key }}</h2>
      {%- if proj.blurb %}<p class="muted dl-blurb">{{ proj.blurb }}</p>{% endif -%}
      <p class="dl-release">
        {%- if proj.status %}<span class="tag muted">{{ proj.status }}</span>{% endif -%}
        <span class="dl-release-label">{{ dl.release }}</span>
      </p>
    </div>
    <div class="dl-extlinks">
      <a class="btn" href="{{ dl.releases_url }}">Release page&nbsp;↗</a>
      <a class="btn" href="{{ dl.readme_url }}">README&nbsp;↗</a>
      {%- if dl.docs_url %}<a class="btn" href="{{ dl.docs_url }}">Docs&nbsp;↗</a>{% endif -%}
    </div>
  </div>

  {%- if dl.note %}<p class="dl-note">{{ dl.note }}</p>{% endif -%}

  <div class="dl-tabs">
    {%- for tab in dl.tabs -%}
    <input class="dl-radio" type="radio" name="dl-{{ dl.key }}" id="dl-{{ dl.key }}-{{ forloop.index }}"{% if forloop.first %} checked{% endif %}>
    {%- endfor -%}

    <div class="dl-tablist" role="tablist">
      {%- for tab in dl.tabs -%}
      <label class="dl-tab" for="dl-{{ dl.key }}-{{ forloop.index }}">{{ tab.label }}</label>
      {%- endfor -%}
    </div>

    <div class="dl-panels">
      {%- for tab in dl.tabs -%}
      <section class="dl-panel">
        {%- if tab.intro %}<p class="dl-intro">{{ tab.intro }}{% if tab.badge %} <span class="tag amber">{{ tab.badge }}</span>{% endif %}</p>{% endif -%}

        {%- if tab.download -%}
        <p class="dl-getrow">
          <a class="btn primary" href="{{ tab.download }}" download>↓ Download</a>
          <code class="dl-filename">{{ tab.filename }}</code>
        </p>
        {%- endif -%}

        {%- if tab.steps -%}
        <ol class="dl-steps">
          {%- for step in tab.steps -%}<li>{{ step }}</li>{%- endfor -%}
        </ol>
        {%- endif -%}

        {%- if tab.code -%}
        <pre class="dl-code"><code>{{ tab.code | strip }}</code></pre>
        {%- endif -%}
      </section>
      {%- endfor -%}
    </div>
  </div>
</section>
{%- endfor -%}

<div class="prose">
<p class="muted" style="margin-top:2rem">
  Direct download links point at a specific published build; the <strong>Release
  page</strong> link for each project always resolves to the newest release. For how
  the projects fit together, see the <a href="/projects/">projects</a> page and the
  <a href="/docs/">documentation library</a>.
</p>
</div>
