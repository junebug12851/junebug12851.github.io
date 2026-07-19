// coins.js — Fairy Fox coins: a light reading-engagement layer shared across every
// same-origin fairyfox.io site (the hub + each project's docs, games, static pages).
//
// WHAT IT DOES
//   Reading a page you haven't opened *today* earns a coin. The count lives in a
//   coin button next to the reader ("Aa") button; opening a new page pops a little
//   "+1". Coins are meant as a subtle *extra* reward any project can tap — never a
//   gate or an access key. Games can make the easiest use of them (see the API below).
//
// EARNING RULES
//   - First view of a page today: +1, with a 10% chance of +2 instead.
//   - Repeat view of a page already seen today: 1% chance of +1, capped at 10 such
//     bonuses per day. At most one grant per page load.
//   - "Today" is the local calendar day; at rollover the day's seen-set + bonus
//     counter reset, the balance carries over.
//
// SCOPE
//   Prefs + wallet live under a VERSIONED origin-wide key ("fairyfox:coins:a"),
//   shared across every SAME-ORIGIN fairyfox.io site — exactly like the reader menu.
//   A different origin (e.g. a Netlify-hosted app, or a sub-domain) keeps its own
//   wallet; browser storage is per-origin and this deliberately does not bridge it.
//
// PUBLIC API — window.FairyFoxCoins
//   get()            -> current spendable balance
//   earnedTotal()    -> lifetime earned (never decreases)
//   earnedToday()    -> coins earned today
//   onChange(fn)     -> subscribe; returns an unsubscribe fn. fn(balance)
//   spend(n, reason) -> true if balance covered it (and was deducted), else false.
//                       Callers MUST degrade gracefully on false — coins add a little
//                       extra, they never gate the core experience.
//   reward(n, reason)-> grant a small, engagement-tied bonus (use sparingly).
//   Also dispatches a `fairyfox:coins` event on document: detail { balance, delta, reason }.
(function () {
  "use strict";
  if (window.FairyFoxCoins) return; // already initialised on this page

  var KEY = "fairyfox:coins:a";
  var P_DOUBLE = 0.10;   // chance a first-view earns 2 instead of 1
  var P_BONUS = 0.01;    // chance a repeat-view earns a bonus coin
  var MAX_BONUS = 10;    // max repeat-view bonuses per day
  var DEFAULTS = { coins: 0, earned: 0, day: "", seen: {}, bonus: 0, todayEarned: 0 };

  var state = null;
  var subs = [];
  var btn = null, countEl = null, panel = null;

  function today() {
    var d = new Date();
    // Local calendar day, zero-padded YYYY-MM-DD.
    var m = String(d.getMonth() + 1), day = String(d.getDate());
    return d.getFullYear() + "-" + (m.length < 2 ? "0" + m : m) + "-" + (day.length < 2 ? "0" + day : day);
  }
  function load() {
    var s;
    try { s = Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { s = Object.assign({}, DEFAULTS); }
    if (!s.seen || typeof s.seen !== "object") s.seen = {};
    // integer hygiene
    s.coins = Math.max(0, s.coins | 0); s.earned = Math.max(0, s.earned | 0);
    s.bonus = Math.max(0, s.bonus | 0); s.todayEarned = Math.max(0, s.todayEarned | 0);
    return s;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }

  function rollover() {
    var t = today();
    if (state.day !== t) { state.day = t; state.seen = {}; state.bonus = 0; state.todayEarned = 0; }
  }
  function pathKey() {
    var p = location.pathname || "/";
    p = p.replace(/index\.html?$/i, "");
    if (!p) p = "/";
    return p;
  }

  function emit(delta, reason) {
    if (countEl) countEl.textContent = String(state.coins);
    if (btn) btn.setAttribute("aria-label", "Fairy Fox coins: " + state.coins);
    updatePanel();
    subs.slice().forEach(function (fn) { try { fn(state.coins); } catch (e) { /* ignore */ } });
    try { document.dispatchEvent(new CustomEvent("fairyfox:coins", { detail: { balance: state.coins, delta: delta || 0, reason: reason || null } })); } catch (e) { /* ignore */ }
  }

  // Grant coins and (optionally) show the pop. Returns the amount granted.
  function grant(amount, reason, pop) {
    amount = amount | 0;
    if (amount <= 0) return 0;
    state.coins += amount; state.earned += amount; state.todayEarned += amount;
    save();
    if (pop) showPop(amount, reason === "bonus");
    emit(amount, reason);
    return amount;
  }

  // The once-per-load earning check.
  function earnForThisPage() {
    var key = pathKey();
    if (!state.seen[key]) {
      var amt = Math.random() < P_DOUBLE ? 2 : 1;
      state.seen[key] = amt; save();
      grant(amt, "view", true);
    } else if (state.bonus < MAX_BONUS && Math.random() < P_BONUS) {
      state.bonus += 1; save();
      grant(1, "bonus", true);
    }
  }

  // ── UI ────────────────────────────────────────────────────────────────────
  // A clean, monochrome line coin (currentColor) — a rimmed token, not a filled/gold icon.
  var COIN_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">' +
    '<circle cx="12" cy="12" r="8.5"/>' +
    '<circle cx="12" cy="12" r="5.25"/>' +
    "</svg>";

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function showPop(amount, lucky) {
    if (!btn) return;
    var chip = el("span", { class: "ff-coin-pop" + (lucky ? " is-lucky" : ""), "aria-hidden": "true" }, "+" + amount);
    document.body.appendChild(chip);
    var r = btn.getBoundingClientRect();
    chip.style.left = (r.left + r.width / 2) + "px";
    chip.style.top = (r.bottom - 2) + "px";
    // A quick coin-button pulse.
    btn.classList.remove("is-earned");
    // force reflow so re-adding the class restarts the animation
    void btn.offsetWidth;
    btn.classList.add("is-earned");
    var life = prefersReducedMotion() ? 900 : 1100;
    setTimeout(function () { if (chip.parentNode) chip.parentNode.removeChild(chip); }, life);
    setTimeout(function () { btn && btn.classList.remove("is-earned"); }, 460);
  }

  function updatePanel() {
    if (!panel) return;
    var b = panel.querySelector("[data-ff-balance]");
    var td = panel.querySelector("[data-ff-today]");
    var lt = panel.querySelector("[data-ff-life]");
    if (b) b.textContent = String(state.coins);
    if (td) td.textContent = String(state.todayEarned);
    if (lt) lt.textContent = String(state.earned);
  }

  function buildPanel() {
    panel = el("div", { id: "ff-coin-panel", class: "ff-reader-panel ff-coin-panel", role: "dialog", "aria-label": "Coins" });
    panel.innerHTML =
      '<div class="ff-rp-head"><span class="ff-rp-title">Coins</span>' +
      '<button type="button" class="ff-rp-close" data-ff-close aria-label="Close">×</button></div>' +
      '<div class="ff-coin-balance"><span class="ff-coin-glyph" aria-hidden="true">' + COIN_SVG + "</span>" +
      '<span class="ff-coin-big" data-ff-balance>0</span><span class="ff-coin-unit">coins</span></div>' +
      '<div class="ff-coin-stats">' +
      '<div class="ff-coin-stat"><span class="ff-coin-k">Earned today</span><span class="ff-coin-v" data-ff-today>0</span></div>' +
      '<div class="ff-coin-stat"><span class="ff-coin-k">Lifetime</span><span class="ff-coin-v" data-ff-life>0</span></div>' +
      "</div>" +
      '<div class="ff-rp-sec"><p class="ff-coin-how">Navigating around and using fairyfox.io lets you earn and use coins.</p>' +
      '<a class="ff-coin-more" href="https://fairyfox.io/legal/coins/">How coins work →</a></div>' +
      '<div class="ff-rp-foot"><p class="ff-rp-hint">Saved &amp; shared across Fairy Fox.</p>' +
      '<button type="button" class="ff-rp-clear" data-ff-clear>Clear my data</button></div>';
    document.body.appendChild(panel);
    updatePanel();

    panel.addEventListener("click", function (e) {
      if (e.target.closest("[data-ff-close]")) { setOpen(false); btn.focus(); return; }
      if (e.target.closest("[data-ff-clear]")) { clearData(); }
    });
  }

  // "Clear my data" — remove the coins store from this browser and reflect it live,
  // without re-persisting an empty wallet (the key stays cleared until the next earn).
  function clearData() {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    state = Object.assign({}, DEFAULTS, { day: today() });
    emit(0, "clear");
  }

  function setOpen(open) {
    if (!panel) return;
    panel.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      // Don't let both popovers sit open at once.
      var reader = document.getElementById("ff-reader-panel");
      if (reader) reader.classList.remove("open");
      var f = panel.querySelector(".ff-rp-close"); if (f) f.focus();
    }
  }

  function buildButton() {
    btn = el("button", {
      class: "ff-coin-btn", type: "button",
      "aria-label": "Fairy Fox coins: " + state.coins,
      "aria-haspopup": "dialog", "aria-expanded": "false", "aria-controls": "ff-coin-panel",
      title: "Coins",
    });
    btn.innerHTML = '<span class="ff-coin-ic" aria-hidden="true">' + COIN_SVG + "</span>" +
      '<span class="ff-coin-n" data-ff-count>' + state.coins + "</span>";
    countEl = btn.querySelector("[data-ff-count]");

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!panel.classList.contains("open"));
    });
    document.addEventListener("click", function (e) {
      if (panel.classList.contains("open") && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) { setOpen(false); btn.focus(); }
    });

    // Sit the coin button just LEFT of the reader ("Aa") button when it exists,
    // otherwise at the far right of the header after the nav.
    var reader = document.querySelector(".ff-reader-btn");
    if (reader && reader.parentNode) {
      reader.parentNode.insertBefore(btn, reader);
      // reader.js stops propagation on its own button, so our outside-click handler
      // won't fire — close the coin panel explicitly when the reader button is clicked.
      reader.addEventListener("click", function () { setOpen(false); });
    } else {
      var wrap = document.querySelector(".site-header .wrap");
      var nav = wrap && wrap.querySelector(".nav");
      if (wrap && nav) nav.parentNode.insertBefore(btn, nav.nextSibling);
      else (wrap || document.body).appendChild(btn);
    }
  }

  function init() {
    state = load();
    rollover();
    save();

    // Public API — available even if the header/button isn't present on a page.
    window.FairyFoxCoins = {
      KEY: KEY,
      get: function () { return state.coins; },
      earnedTotal: function () { return state.earned; },
      earnedToday: function () { return state.todayEarned; },
      onChange: function (fn) {
        if (typeof fn !== "function") return function () {};
        subs.push(fn);
        return function () { var i = subs.indexOf(fn); if (i >= 0) subs.splice(i, 1); };
      },
      spend: function (n, reason) {
        n = n | 0;
        if (n <= 0 || state.coins < n) return false;
        state.coins -= n; save(); emit(-n, reason || "spend");
        return true;
      },
      reward: function (n, reason) { return grant(n | 0, reason || "reward", true); },
    };

    if (document.querySelector(".site-header .wrap")) { buildButton(); buildPanel(); }
    earnForThisPage();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
