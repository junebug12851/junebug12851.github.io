// reader.js — the reader-settings menu (the "Aa" button + panel): theme, accent
// colour, text size, line spacing and reading width, tuned live and remembered.
//
// Prefs live under a VERSIONED origin-wide localStorage key ("fairyfox:reader:b"),
// so the choice is shared across every same-origin fairyfox.io site. The ":b" suffix
// versions the schema — this is fairyfox.io's own evolved model (root-font-size text
// scaling + an accent picker); it deliberately does not collide with an older key a
// sibling project may still be using until it adopts this one.
//
// Text size scales the document ROOT font-size, so it resizes the whole rem-based UI
// (visible on every page). Line spacing drives body line-height; width caps the reading
// measure. The early theme/size/accent apply happens inline in <head> to avoid a flash.
(function () {
  "use strict";

  var KEY = "fairyfox:reader:b";
  var SIZES = [15, 16.5, 18, 20, 22];          // root px, 5 steps (A− … A+)
  var SIZE_GLYPH = [0.82, 0.95, 1.08, 1.22, 1.4]; // rem, the "A" shown on each size button
  var LH = { tight: 1.5, normal: 1.65, relaxed: 1.9 };
  var WIDTH = { narrow: "38rem", normal: "46rem", wide: "58rem" };
  var ACCENTS = [
    ["#ff8368", "Coral"], ["#f6a13a", "Amber"], ["#57c964", "Green"],
    ["#33c0c9", "Teal"], ["#5aa2f0", "Blue"], ["#c79bf0", "Violet"], ["#ff6a9a", "Rose"],
  ];
  var ACCENT_VARS = ["--accent", "--violet", "--violet-deep", "--accent-ink", "--link", "--link-hover", "--glow"];
  var DEFAULTS = { theme: "system", accent: null, size: 1, lh: "normal", width: "normal" };

  var prefs = Object.assign({}, DEFAULTS);
  function clampSize(n) { return Math.max(0, Math.min(SIZES.length - 1, n | 0)); }

  function load() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch (e) { /* private mode — ignore */ }
  }

  function applyAccent(root, hex) {
    if (!hex) { ACCENT_VARS.forEach(function (v) { root.style.removeProperty(v); }); return; }
    // Derive readable text/link shades by mixing toward the theme's text colour, so a
    // custom accent stays legible in dark, light AND sepia (recomputed on theme change).
    var ink = "color-mix(in srgb, " + hex + ", var(--text) 42%)";
    root.style.setProperty("--accent", hex);
    root.style.setProperty("--violet", hex);
    root.style.setProperty("--violet-deep", "color-mix(in srgb, " + hex + ", #000 12%)");
    root.style.setProperty("--accent-ink", ink);
    root.style.setProperty("--link", ink);
    root.style.setProperty("--link-hover", "color-mix(in srgb, " + hex + ", var(--text) 26%)");
    root.style.setProperty("--glow", "color-mix(in srgb, " + hex + " 40%, transparent)");
  }

  function apply() {
    var root = document.documentElement;
    if (prefs.theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", prefs.theme);
    root.style.fontSize = SIZES[clampSize(prefs.size)] + "px";
    root.style.setProperty("--reading-lh", String(LH[prefs.lh] || LH.normal));
    root.style.setProperty("--reading-width", WIDTH[prefs.width] || WIDTH.normal);
    applyAccent(root, prefs.accent);
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function seg(act, labelId, opts) {
    return '<div class="ff-seg" role="group" aria-labelledby="' + labelId + '">' +
      opts.map(function (o) {
        return '<button type="button" data-act="' + act + '" data-val="' + o[0] + '">' + o[1] + "</button>";
      }).join("") + "</div>";
  }

  function init() {
    prefs = load();
    apply();

    var btn = el("button", {
      class: "ff-reader-btn", type: "button", "aria-label": "Reading settings",
      "aria-haspopup": "dialog", "aria-expanded": "false", "aria-controls": "ff-reader-panel", title: "Reading settings",
    });
    btn.innerHTML = '<span class="aa-lg">A</span><span class="aa-sm">a</span>';

    var panel = el("div", { id: "ff-reader-panel", class: "ff-reader-panel", role: "dialog", "aria-label": "Reading settings" });

    var sizeBtns = SIZES.map(function (_, i) {
      return '<button type="button" data-act="size" data-val="' + i + '" style="font-size:' + SIZE_GLYPH[i] + 'rem" aria-label="Text size ' + (i + 1) + '">A</button>';
    }).join("");

    var swatches = '<button type="button" class="ff-swatch ff-swatch-default" data-acc="" aria-label="Default accent"></button>' +
      ACCENTS.map(function (a) {
        return '<button type="button" class="ff-swatch" data-acc="' + a[0] + '" style="--sw:' + a[0] + '" aria-label="' + a[1] + ' accent"></button>';
      }).join("");

    panel.innerHTML =
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-theme">Theme</span>' +
      seg("theme", "ff-rl-theme", [["system", "Auto"], ["light", "Light"], ["sepia", "Sepia"], ["dark", "Dark"]]) + "</div>" +
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-accent">Accent</span>' +
      '<div class="ff-swatches" role="group" aria-labelledby="ff-rl-accent">' + swatches + "</div></div>" +
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-size">Text size</span>' +
      '<div class="ff-seg ff-size" role="group" aria-labelledby="ff-rl-size">' + sizeBtns + "</div></div>" +
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-lh">Line spacing</span>' +
      seg("lh", "ff-rl-lh", [["tight", "Tight"], ["normal", "Normal"], ["relaxed", "Relaxed"]]) + "</div>" +
      '<div class="ff-reader-row"><span class="ff-reader-label" id="ff-rl-width">Width</span>' +
      seg("width", "ff-rl-width", [["narrow", "Narrow"], ["normal", "Normal"], ["wide", "Wide"]]) + "</div>" +
      '<p class="ff-hint">Theme, accent &amp; text size apply site-wide; width applies to reading pages. Remembered across Fairy&nbsp;Fox.</p>';

    function markActive() {
      panel.querySelectorAll("button[data-act]").forEach(function (b) {
        var act = b.getAttribute("data-act"), val = b.getAttribute("data-val");
        var on = act === "size" ? +val === prefs.size : val === prefs[act];
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      panel.querySelectorAll(".ff-swatch").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-acc") === (prefs.accent || "") ? "true" : "false");
      });
    }
    markActive();

    panel.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b || !panel.contains(b)) return;
      if (b.hasAttribute("data-acc")) {
        prefs.accent = b.getAttribute("data-acc") || null;
      } else {
        var act = b.getAttribute("data-act");
        if (!act) return;
        if (act === "size") prefs.size = clampSize(+b.getAttribute("data-val"));
        else prefs[act] = b.getAttribute("data-val");
      }
      apply(); save(); markActive();
    });

    function setOpen(open) {
      panel.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var f = panel.querySelector("button"); if (f) f.focus(); }
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!panel.classList.contains("open")); });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") && !panel.contains(e.target) && e.target !== btn) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) { setOpen(false); btn.focus(); }
    });

    // Far right of the header, just after the primary nav (past "About").
    var wrap = document.querySelector(".site-header .wrap");
    var nav = wrap && wrap.querySelector(".nav");
    if (wrap && nav) nav.parentNode.insertBefore(btn, nav.nextSibling);
    else (wrap || document.body).appendChild(btn);
    document.body.appendChild(panel);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
