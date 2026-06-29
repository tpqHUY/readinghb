/* ============================================================
   progress.js — "mark as learned" tracking for TOEIC knowledge
   cards, at the TAB level (the smaller unit): each card's tabs
   (Format / Types / Strategy / Traps, or Approach / Structure /
   Pitfalls) is marked independently.

   • a toggle at the foot of each tab panel
   • a ✓ on a learned tab + an "X / N" badge on the card header
   • a per-section progress bar counting tab-units
   State lives in the shared SRS map under "tk:" ids (no DOM
   flashcard) so it persists and rides on the existing cloud sync.
   ============================================================ */
(function () {
  "use strict";
  if (!window.SRS || typeof window.SRS.mark !== "function") return;

  const PREFIX = "tk:";
  const CONTAINERS = ["#toeicLcParts", "#toeicRcParts", "#tspTasks", "#twrTasks"];

  const units = [];     // { key, tab, btn }
  const cards = [];     // { card, keys, badge }
  const sections = [];  // { el, keys }

  function has(k) { return window.SRS.has(k); }

  function paintUnit(u) {
    const on = has(u.key);
    u.tab.classList.toggle("tab-learned", on);
    u.btn.classList.toggle("done", on);
    u.btn.setAttribute("aria-pressed", String(on));
    u.btn.querySelector(".lt-label").textContent = on ? "Learned" : "Mark this learned";
    u.btn.title = on ? "Studied — click to unmark" : "Mark this section as studied";
  }

  function refreshCards() {
    cards.forEach(function (c) {
      let done = 0;
      c.keys.forEach(function (k) { if (has(k)) done++; });
      const total = c.keys.length;
      if (c.badge) {
        c.badge.textContent = done + " / " + total + " learned";
        c.badge.classList.toggle("complete", total > 0 && done === total);
        c.badge.classList.toggle("started", done > 0 && done < total);
      }
      c.card.classList.toggle("is-learned", total > 0 && done === total);
    });
  }

  function refreshSections() {
    sections.forEach(function (s) {
      let done = 0;
      s.keys.forEach(function (k) { if (has(k)) done++; });
      const total = s.keys.length;
      const txt = s.el.querySelector(".lp-text");
      const bar = s.el.querySelector(".lp-bar > span");
      if (txt) txt.textContent = done + " / " + total + " learned";
      if (bar) bar.style.width = (total ? (done / total * 100) : 0) + "%";
      s.el.classList.toggle("complete", total > 0 && done === total);
    });
  }

  function refreshAll() { units.forEach(paintUnit); refreshCards(); refreshSections(); }

  function build() {
    CONTAINERS.forEach(function (sel) {
      const cont = document.querySelector(sel);
      if (!cont) return;
      const sectionKeys = [];

      Array.prototype.slice.call(cont.querySelectorAll(":scope > .case")).forEach(function (card) {
        const tabs = Array.prototype.slice.call(card.querySelectorAll(".tabs .tab"));
        const cardKeys = [];

        tabs.forEach(function (tab) {
          const target = tab.getAttribute("data-target");
          const panel = target && (card.querySelector("#" + CSS.escape(target)) || document.getElementById(target));
          if (!panel) return;
          const key = PREFIX + target;          // panel ids are globally unique
          cardKeys.push(key);
          sectionKeys.push(key);

          if (!panel.querySelector(":scope > .panel-learn")) {
            const wrap = document.createElement("div");
            wrap.className = "panel-learn";
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "learn-toggle";
            btn.innerHTML = '<span class="lt-ic" aria-hidden="true"></span><span class="lt-label"></span>';
            wrap.appendChild(btn);
            panel.appendChild(wrap);

            const u = { key: key, tab: tab, btn: btn };
            units.push(u);
            paintUnit(u);
            btn.addEventListener("click", function (e) {
              e.stopPropagation();
              window.SRS.mark(key, !has(key));
              paintUnit(u);
              refreshCards();
              refreshSections();
            });
          }
        });

        // card header: a small "X / N learned" badge
        const meta = card.querySelector(".case-meta");
        let badge = meta && meta.querySelector(".card-progress");
        if (meta && !badge) {
          badge = document.createElement("span");
          badge.className = "card-progress";
          meta.appendChild(badge);
        }
        cards.push({ card: card, keys: cardKeys, badge: badge });
      });

      // per-section progress bar
      const section = cont.closest(".section");
      const head = section && section.querySelector(".section-head");
      if (head && !head.querySelector(".learn-progress")) {
        const chip = document.createElement("div");
        chip.className = "learn-progress";
        chip.innerHTML = '<span class="lp-bar"><span></span></span><span class="lp-text"></span>';
        head.appendChild(chip);
        sections.push({ el: chip, keys: sectionKeys });
      }
    });

    refreshCards();
    refreshSections();
    window.SRS.subscribe(refreshAll);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
