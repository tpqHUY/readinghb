/* ============================================================
   srs.js — spaced-repetition + focus flashcard overlay.
   Works on any card with [data-srs-id]:
     v:N  -> VOCAB[N]       (synonym bank)
     c:N  -> CONFUSABLES[N] (easily confused)
     k:N  -> COLLOCATIONS[N](collocations)

   Review schedule: 5 levels at 1h, 3h, 8h, 12h, 24h.
   A freshly-learned card is veiled (faded into the page) and
   brightens as it approaches its due time; the % shown is how
   close it is to needing review. The signal dot runs red->green
   with the level. State is persisted in localStorage.

   NOTE: ids are array indices, so progress survives editing a
   group's words but shifts if you reorder/insert groups.
   ============================================================ */
(function () {
  "use strict";

  const $  = function (s, r) { return (r || document).querySelector(s); };
  const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  const KEY = "ielts-reading-srs-v1";
  const HOUR = 3600000;
  // L1..L5 review spacing: 12h, 12h, 12h, 1 day, 2 days
  const INTERVALS = [12 * HOUR, 12 * HOUR, 12 * HOUR, 24 * HOUR, 48 * HOUR];
  const MAX_VEIL = 0.8;
  const COLORS = { 0: "#9aa39c", 1: "#C4452D", 2: "#D2762E", 3: "#C99A2E", 4: "#7E9A3C", 5: "#3E8E5A" };
  const RED = "#C4452D";

  function hexToRgb(h) {
    h = h.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function lerpColor(a, b, t) {
    const A = hexToRgb(a), B = hexToRgb(b);
    const r = Math.round(A[0] + (B[0] - A[0]) * t);
    const g = Math.round(A[1] + (B[1] - A[1]) * t);
    const bl = Math.round(A[2] + (B[2] - A[2]) * t);
    return "rgb(" + r + "," + g + "," + bl + ")";
  }

  /* ---------- storage ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }
  let store = load();
  const now = function () { return Date.now(); };

  /* ---------- change notifier + merge (for cloud sync) ---------- */
  let changeCb = null;
  function notifyChange() { if (changeCb) { try { changeCb(store); } catch (e) {} } }
  function mergeStores(a, b) {
    const out = {};
    for (const k in a) out[k] = a[k];
    for (const k in b) { if (!out[k] || (b[k].ts || 0) > (out[k].ts || 0)) out[k] = b[k]; }
    return out;
  }
  // Fisher-Yates shuffle (returns a new array)
  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- registry (id -> flashcard descriptor) ---------- */
  function wStep(it) {
    if (typeof it === "string") return { primary: it, term: it };
    return { primary: it.w, def: it.d || "", example: it.x || "", term: it.w };
  }

  const reg = {};
  (window.VOCAB || []).forEach(function (v, i) {
    reg["v:" + i] = {
      title: v.g, sense: v.sense, note: v.note,
      steps: v.words.map(wStep)
    };
  });
  (window.CONFUSABLES || []).forEach(function (c, i) {
    reg["c:" + i] = {
      title: c.items.map(function (x) { return x.w; }).join("  /  "),
      sense: "easily confused — learn the difference",
      note: c.note,
      steps: c.items.map(function (x) { return { primary: x.w, secondary: x.pos + " — " + x.d, term: x.w }; })
    };
  });
  (window.COLLOCATIONS || []).forEach(function (v, i) {
    reg["k:" + i] = {
      title: v.g, sense: v.sense, note: "",
      steps: v.items.map(wStep)
    };
  });
  (window.WLANG || []).forEach(function (v, i) {
    reg["w:" + i] = {
      title: v.g, sense: v.sense, note: "",
      steps: v.items.map(wStep)
    };
  });

  /* ---------- Cambridge dictionary link (audio pronunciation) ---------- */
  function cambridgeURL(term) {
    let clean = String(term).toLowerCase()
      .replace(/\([^)]*\)/g, " ")   // drop parentheticals e.g. (40%)
      .split("/")[0]                 // take primary form of "a / b"
      .replace(/[^a-z\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) clean = String(term).toLowerCase().trim();
    if (clean.indexOf(" ") === -1) {
      return "https://dictionary.cambridge.org/dictionary/english/" + encodeURIComponent(clean);
    }
    return "https://dictionary.cambridge.org/search/direct/?datasetsearch=english&q=" + encodeURIComponent(clean);
  }

  /* ---------- model ---------- */
  function view(id) {
    const s = store[id];
    if (!s || !s.level) {
      return { level: 0, status: "new", retention: 0, rot: 0, veil: 0, color: COLORS[0], remaining: 0, overdue: 0 };
    }
    const lvl = Math.min(s.level, 5);
    const interval = INTERVALS[lvl - 1];
    const elapsed = now() - s.ts;
    const baseColor = COLORS[s.level] || COLORS[5];

    if (elapsed < interval) {
      // resting: memory counts DOWN from 100% (just learned) to 0% (due)
      const progress = elapsed / interval;
      return {
        level: s.level,
        status: "resting",
        retention: Math.round((1 - progress) * 100),
        rot: 0,
        veil: (1 - progress) * MAX_VEIL,
        color: baseColor,
        remaining: interval - elapsed,
        overdue: 0
      };
    }

    // overdue: knowledge withers — colour slides from its level colour toward red,
    // fully red after one more interval of neglect
    const overdue = elapsed - interval;
    const rot = Math.max(0, Math.min(1, overdue / interval));
    return {
      level: s.level,
      status: "due",
      retention: 0,
      rot: rot,
      veil: 0,
      color: lerpColor(baseColor, RED, rot),
      remaining: 0,
      overdue: overdue
    };
  }

  function markLearned(id) {
    const s = store[id] || { level: 0, ts: 0 };
    s.level = Math.min((s.level || 0) + 1, 5);
    s.ts = now();
    store[id] = s;
    save();
    notifyChange();
  }

  function fmtLeft(ms) {
    const m = Math.round(ms / 60000);
    if (m < 1) return "due soon";
    if (m < 60) return m + "m left";
    const h = Math.floor(m / 60), mm = m % 60;
    return h + "h" + (mm ? " " + mm + "m" : "") + " left";
  }

  function statusText(v) {
    if (v.status === "new") return { l: "New", r: "tap to learn" };
    if (v.status === "due") {
      const faded = Math.round(v.rot * 100);
      return { l: "L" + v.level + "/5", r: faded > 0 ? "review now · " + faded + "% faded" : "review now" };
    }
    return { l: "L" + v.level + "/5", r: fmtLeft(v.remaining) };
  }

  /* ---------- cards ---------- */
  let cards = [];
  function collectCards() {
    cards = $$("[data-srs-id]").map(function (el) { return { el: el, id: el.getAttribute("data-srs-id") }; });
    cards.forEach(function (c) {
      if (!c.el.querySelector(":scope > .srs-bar")) {
        const bar = document.createElement("div");
        bar.className = "srs-bar";
        bar.setAttribute("aria-hidden", "true");
        bar.innerHTML =
          '<span class="left"><span class="srs-dot"></span><span class="srs-lvl"></span></span>' +
          '<span class="right"></span>';
        c.el.insertBefore(bar, c.el.firstChild);
        const veil = document.createElement("div");
        veil.className = "srs-veil";
        veil.setAttribute("aria-hidden", "true");
        c.el.appendChild(veil);
        const rotEl = document.createElement("div");
        rotEl.className = "srs-rot";
        rotEl.setAttribute("aria-hidden", "true");
        c.el.appendChild(rotEl);
        const pct = document.createElement("div");
        pct.className = "srs-pct";
        pct.setAttribute("aria-hidden", "true");
        pct.innerHTML = '<span class="srs-pct-num"></span><span class="srs-pct-lab">recall</span>';
        c.el.appendChild(pct);
      }
      if (!c.el.dataset.srsBound) {
        c.el.dataset.srsBound = "1";
        c.el.addEventListener("click", function () { open(c.id); });
        c.el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(c.id); }
        });
      }
      const r = reg[c.id];
      if (r) c.el.setAttribute("aria-label", "Study set: " + r.title);
    });
  }

  function applyAll() {
    cards.forEach(function (c) {
      const v = view(c.id);
      c.el.style.setProperty("--srs-color", v.color);
      c.el.style.setProperty("--srs-ret", v.retention);
      c.el.style.setProperty("--srs-rot", v.rot.toFixed(3));
      c.el.classList.toggle("srs-new", v.status === "new");
      c.el.classList.toggle("srs-resting", v.status === "resting");
      c.el.classList.toggle("srs-due", v.status === "due");
      c.el.classList.toggle("srs-rotting", v.rot > 0);
      c.el.setAttribute("data-srs-level", v.level);
      const st = statusText(v);
      const lk = lockLeft(c.id);
      c.el.classList.toggle("srs-locked", !!lk);
      const lvlEl = c.el.querySelector(".srs-lvl");
      const rEl = c.el.querySelector(".srs-bar .right");
      if (lk) {
        if (lvlEl) lvlEl.textContent = "🔒 Locked";
        if (rEl) rEl.textContent = "retake in " + Math.ceil(lk / 60000) + "m";
      } else {
        if (lvlEl) lvlEl.textContent = st.l;
        if (rEl) rEl.textContent = st.r;
      }
      const numEl = c.el.querySelector(".srs-pct-num");
      if (numEl) numEl.textContent = v.retention + "%";
    });
    updateLegends();
  }

  /* ---------- legends (per section) ---------- */
  function injectLegends() {
    [["vocab", "v:"], ["confus", "c:"], ["colloc", "k:"], ["w-lang", "w:"]].forEach(function (pair) {
      const sec = document.getElementById(pair[0]);
      if (!sec) return;
      const head = sec.querySelector(".section-head");
      if (!head || head.querySelector(".srs-legend")) return;
      const scale = [1, 2, 3, 4, 5].map(function (l) {
        return '<span class="srs-scale-dot" style="background:' + COLORS[l] + '" title="Level ' + l + '"></span>';
      }).join("");
      const leg = document.createElement("div");
      leg.className = "srs-legend";
      leg.innerHTML =
        '<span class="srs-legend-label">Spaced review · 12h · 1d · 2d</span>' +
        '<span class="srs-scale">' + scale + "</span>" +
        '<span class="srs-legend-due" data-prefix="' + pair[1] + '"></span>' +
        '<span class="srs-legend-fade" data-prefix="' + pair[1] + '"></span>' +
        '<button type="button" class="srs-review" data-prefix="' + pair[1] + '">Review due</button>' +
        '<button type="button" class="srs-reset" data-prefix="' + pair[1] + '">reset</button>';
      head.appendChild(leg);
    });

    document.addEventListener("click", function (e) {
      const rv = e.target.closest(".srs-review");
      if (rv) { startDueReview(rv.getAttribute("data-prefix")); return; }
      const b = e.target.closest(".srs-reset");
      if (!b) return;
      const pre = b.getAttribute("data-prefix");
      Object.keys(store).forEach(function (k) { if (k.indexOf(pre) === 0) delete store[k]; });
      save();
      notifyChange();
      applyAll();
    });
  }

  function countBy(pre, pred) {
    let n = 0;
    cards.forEach(function (c) { if (c.id.indexOf(pre) === 0 && pred(view(c.id))) n++; });
    return n;
  }

  function updateLegends() {
    $$(".srs-legend-due").forEach(function (el) {
      const pre = el.getAttribute("data-prefix");
      const pending = countBy(pre, function (v) { return v.status !== "resting"; });
      el.textContent = pending ? pending + " to review" : "all caught up";
      el.classList.toggle("has-due", pending > 0);
    });
    $$(".srs-legend-fade").forEach(function (el) {
      const pre = el.getAttribute("data-prefix");
      const fading = countBy(pre, function (v) { return v.status === "due"; });
      el.style.display = fading ? "" : "none";
      el.textContent = fading + " fading";
    });
    $$(".srs-review").forEach(function (b) {
      const pre = b.getAttribute("data-prefix");
      b.disabled = countBy(pre, function (v) { return v.status === "due"; }) === 0;
    });
  }

  /* ---------- focus overlay: flashcard / quiz / message ---------- */
  const LOCK_MS = 30 * 60000;   // 30-minute lock after a failed quiz
  const HINT_FIRST_MS = 1000;   // first 2 letters after 5s
  const HINT_STEP_MS = 2500;    // then 2 more letters every 5s
  const PASS_RATE = 0.8;        // 80% to pass the quiz

  // failed-quiz locks are device-local (not synced)
  const LKEY = "ielts-reading-locks-v1";
  function loadLocks() { try { return JSON.parse(localStorage.getItem(LKEY)) || {}; } catch (e) { return {}; } }
  let locks = loadLocks();
  function saveLocks() { try { localStorage.setItem(LKEY, JSON.stringify(locks)); } catch (e) {} }
  function lockLeft(id) { const u = locks[id]; return (u && u > now()) ? (u - now()) : 0; }

  let ov = null;
  let mode = null;       // 'card' | 'quiz' | 'msg'
  let current = null;    // flashcard state
  let quiz = null;       // quiz state
  let msgOk = null;      // message OK handler

  function buildOverlay() {
    ov = document.createElement("div");
    ov.className = "srs-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Review");
    ov.innerHTML =
      '<div class="srs-backdrop" data-close></div>' +
      '<div class="srs-panel" role="document">' +
        '<button class="srs-x" data-nav data-act="close" aria-label="Close">×</button>' +

        '<div class="srs-view srs-view-card">' +
          '<div class="srs-phead"><div><div class="srs-ptitle"></div><div class="srs-psense"></div></div>' +
            '<div style="text-align:right"><div class="srs-counter"></div><div class="srs-queue" style="display:none"></div></div></div>' +
          '<div class="srs-prog"><span></span></div>' +
          '<div class="srs-stage">' +
            '<div class="srs-primary"></div>' +
            '<div class="srs-secondary"></div>' +
            '<div class="srs-def"></div>' +
            '<div class="srs-example"></div>' +
            '<a class="srs-cam" target="_blank" rel="noopener" data-nav data-act="cam">🔊 Hear on Cambridge · press ↵</a>' +
          "</div>" +
          '<div class="srs-foot">' +
            '<button class="srs-btn" data-nav data-act="prev">‹ Prev</button>' +
            '<div class="srs-hint"></div>' +
            '<button class="srs-btn primary" data-nav data-act="next">Next ›</button>' +
          "</div>" +
        "</div>" +

        '<div class="srs-view srs-view-quiz" hidden>' +
          '<div class="srs-phead"><div><div class="srs-qtitle"></div><div class="srs-qsub">Quiz · type the word from its meaning</div></div>' +
            '<div style="text-align:right"><div class="srs-qcount"></div><div class="srs-qscore"></div></div></div>' +
          '<div class="srs-prog"><span></span></div>' +
          '<div class="srs-qbody">' +
            '<div class="srs-qmeaning"></div>' +
            '<input class="srs-qinput" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="type the word / phrase…" />' +
            '<div class="srs-qhint" hidden></div>' +
            '<div class="srs-qfeedback" hidden></div>' +
          "</div>" +
          '<div class="srs-foot">' +
            '<div class="srs-ring" hidden aria-hidden="true">' +
              '<svg viewBox="0 0 36 36"><circle class="srs-ring-bg" cx="18" cy="18" r="15.9"></circle>' +
              '<circle class="srs-ring-fg" cx="18" cy="18" r="15.9"></circle></svg>' +
              '<span class="srs-ring-num"></span>' +
            "</div>" +
            '<button class="srs-btn primary" data-q="submit">Check ›</button>' +
          "</div>" +
        "</div>" +

        '<div class="srs-view srs-view-msg" hidden>' +
          '<div class="srs-msg-icon"></div>' +
          '<div class="srs-msg-title"></div>' +
          '<div class="srs-msg-text"></div>' +
          '<div class="srs-foot" style="justify-content:center">' +
            '<button class="srs-btn primary" data-q="msgok">OK</button>' +
          "</div>" +
        "</div>" +

      "</div>";
    document.body.appendChild(ov);
    ov.addEventListener("click", onOverlayClick);
  }

  function showView(which) {
    mode = which;
    ov.querySelector(".srs-view-card").hidden = which !== "card";
    ov.querySelector(".srs-view-quiz").hidden = which !== "quiz";
    ov.querySelector(".srs-view-msg").hidden = which !== "msg";
  }
  function openShell() {
    ov.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    document.removeEventListener("keydown", onKey);
    document.addEventListener("keydown", onKey);
  }

  function open(id, queue, qpos) {
    const r = reg[id];
    if (!r || !r.steps.length) return;
    queue = queue || null; qpos = qpos || 0;
    if (lockLeft(id)) { openLocked(id); return; }
    const v = view(id);
    const isReading = id.indexOf("w:") !== 0;
    const reviewed = store[id] && store[id].level >= 1;
    // A session only counts toward spaced repetition when the card is NEW or
    // genuinely DUE. Opening a still-resting card is review-only (no progress).
    if (isReading && reviewed && v.status === "due") {
      startQuiz(id, r, queue, qpos);   // graded review — only when due
      return;
    }
    const counts = (v.status === "new" || v.status === "due");
    const note = counts ? "" : "review only · counts in " + fmtLeft(v.remaining).replace(" left", "");
    startCard(id, r, queue, qpos, counts, note);
  }

  function startDueReview(prefix) {
    const due = [];
    cards.forEach(function (c) {
      if ((!prefix || c.id.indexOf(prefix) === 0) && !lockLeft(c.id)) {
        const v = view(c.id);
        if (v.status === "due") due.push({ id: c.id, over: v.overdue });
      }
    });
    if (!due.length) return;
    due.sort(function (a, b) { return b.over - a.over; });
    open(due[0].id, due.map(function (d) { return d.id; }), 0);
  }

  function continueQueue(queue, pos) {
    closeRaw();
    applyAll();
    if (queue && pos + 1 < queue.length) open(queue[pos + 1], queue, pos + 1);
  }

  /* ---------- flashcard mode ---------- */
  function startCard(id, r, queue, qpos, counts, note) {
    const steps = r.steps.slice();
    if (r.note) steps.push({ isNote: true, primary: r.note });
    current = { id: id, steps: steps, index: 0, completed: false, queue: queue, qpos: qpos, counts: counts !== false };
    ov.querySelector(".srs-ptitle").textContent = r.title;
    ov.querySelector(".srs-psense").textContent = (r.sense || "") + (note ? " · " + note : "");
    ov.querySelector(".srs-view-card").classList.toggle("review-only", counts === false);
    const q = ov.querySelector(".srs-queue");
    if (queue) { q.style.display = ""; q.textContent = "Due queue · " + (qpos + 1) + " / " + queue.length; }
    else q.style.display = "none";
    showView("card");
    render();
    openShell();
    const nx = ov.querySelector('[data-act="next"]'); if (nx) nx.focus();
  }

  function render() {
    const steps = current.steps, i = current.index;
    const s = steps[i];
    if (i >= steps.length - 1) current.completed = true;
    ov.querySelector(".srs-counter").textContent = (i + 1) + " / " + steps.length;
    ov.querySelector(".srs-view-card .srs-prog span").style.width = ((i + 1) / steps.length * 100) + "%";
    const stage = ov.querySelector(".srs-stage");
    stage.classList.toggle("is-note", !!s.isNote);
    ov.querySelector(".srs-primary").textContent = s.primary;
    const sec = ov.querySelector(".srs-secondary");
    if (s.isNote) { sec.textContent = "Remember"; sec.style.display = "block"; }
    else if (s.secondary) { sec.textContent = s.secondary; sec.style.display = "block"; }
    else { sec.textContent = ""; sec.style.display = "none"; }
    const defEl = ov.querySelector(".srs-def");
    const exEl = ov.querySelector(".srs-example");
    defEl.textContent = s.isNote ? "" : (s.def || "");
    defEl.style.display = (!s.isNote && s.def) ? "block" : "none";
    exEl.textContent = (!s.isNote && s.example) ? "“" + s.example + "”" : "";
    exEl.style.display = (!s.isNote && s.example) ? "block" : "none";
    const cam = ov.querySelector(".srs-cam");
    if (s.isNote) { cam.style.display = "none"; }
    else { cam.style.display = ""; cam.href = cambridgeURL(s.term || s.primary); }
    ov.querySelector('[data-act="prev"]').disabled = i === 0;
    const next = ov.querySelector('[data-act="next"]');
    const hint = ov.querySelector(".srs-hint");
    if (current.completed) {
      next.textContent = current.counts ? "Done ✓" : "Close";
      hint.textContent = current.counts ? "Click anywhere to finish · ↵ hear" : "Review only — progress not counted";
    } else {
      next.textContent = "Next ›";
      hint.textContent = (current.counts ? "" : "review only · ") + "→ / space · ↵ hear";
    }
  }

  function step(d) {
    if (!current) return;
    const ni = current.index + d;
    if (ni < 0) return;
    if (ni >= current.steps.length) { finish(); return; }
    current.index = ni;
    render();
  }

  function finish() {
    if (!current) return;
    const q = current.queue, pos = current.qpos;
    if (current.counts) markLearned(current.id);   // resting (review-only) cards don't advance
    continueQueue(q, pos);
  }

  function openCambridge() {
    if (mode !== "card" || !current) return;
    const s = current.steps[current.index];
    if (s.isNote) return;
    window.open(cambridgeURL(s.term || s.primary), "_blank", "noopener");
  }

  /* ---------- quiz mode ---------- */
  function normAns(s) {
    return String(s).toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }
  function acceptable(term) {
    const set = [normAns(term)];
    term.split("/").forEach(function (p) { const n = normAns(p); if (n && set.indexOf(n) === -1) set.push(n); });
    return set;
  }
  function primaryForm(term) { return term.split("/")[0].replace(/\([^)]*\)/g, "").trim(); }
  // reveal the first n letters of the primary form; mask the rest as "_",
  // one cell per character. Word boundaries use non-collapsing en-spaces so
  // the blanks line up with the real word positions (e.g. "_ _   _ _ _ _ _ _   _ _").
  function maskPrefix(term, n) {
    const p = primaryForm(term);
    let html = "";
    for (let i = 0; i < p.length; i++) {
      const ch = p[i];
      html += (ch === " ") ? "&ensp;&ensp;" : (i < n ? ch : "_");
    }
    return html;
  }
  function clearHintTimer() {
    if (quiz) {
      if (quiz.hintTimer) { clearTimeout(quiz.hintTimer); quiz.hintTimer = null; }
      if (quiz.ringInt) { clearInterval(quiz.ringInt); quiz.ringInt = null; }
    }
    const ring = ov && ov.querySelector(".srs-ring");
    if (ring) ring.hidden = true;
  }

  // animated circular countdown to the next hint reveal
  function startRing(durationMs) {
    const ring = ov.querySelector(".srs-ring");
    const fg = ov.querySelector(".srs-ring-fg");
    const num = ov.querySelector(".srs-ring-num");
    ring.hidden = false;
    fg.style.transition = "none";
    fg.style.strokeDashoffset = "0";
    void fg.getBoundingClientRect();              // force reflow so the reset applies
    fg.style.transition = "stroke-dashoffset " + (durationMs / 1000) + "s linear";
    fg.style.strokeDashoffset = "100";            // deplete the ring over the duration
    let remain = Math.round(durationMs / 1000);
    num.textContent = remain;
    if (quiz.ringInt) clearInterval(quiz.ringInt);
    quiz.ringInt = setInterval(function () {
      remain--; num.textContent = remain > 0 ? remain : "";
      if (remain <= 0) { clearInterval(quiz.ringInt); quiz.ringInt = null; }
    }, 1000);
  }
  function stopRing() {
    if (quiz && quiz.ringInt) { clearInterval(quiz.ringInt); quiz.ringInt = null; }
    const ring = ov.querySelector(".srs-ring");
    if (ring) ring.hidden = true;
  }

  function startQuiz(id, r, queue, qpos) {
    const items = r.steps.filter(function (s) { return s.term; });
    quiz = { id: id, r: r, items: shuffled(items), i: 0, correct: 0, answered: false, hintTimer: null, queue: queue, qpos: qpos };
    ov.querySelector(".srs-qtitle").textContent = r.title;
    showView("quiz");
    renderQ();
    openShell();
  }

  function renderQ() {
    clearHintTimer();
    quiz.answered = false;
    const it = quiz.items[quiz.i];
    ov.querySelector(".srs-qcount").textContent = (quiz.i + 1) + " / " + quiz.items.length;
    ov.querySelector(".srs-qscore").textContent = quiz.correct + " correct";
    ov.querySelector(".srs-view-quiz .srs-prog span").style.width = (quiz.i / quiz.items.length * 100) + "%";
    ov.querySelector(".srs-qmeaning").textContent = it.def || it.secondary || "(meaning unavailable)";
    const input = ov.querySelector(".srs-qinput");
    input.value = ""; input.disabled = false;
    const hint = ov.querySelector(".srs-qhint");
    const fb = ov.querySelector(".srs-qfeedback"); fb.hidden = true; fb.innerHTML = ""; fb.className = "srs-qfeedback";
    ov.querySelector('[data-q="submit"]').textContent = "Check ›";
    setTimeout(function () { try { input.focus(); } catch (e) {} }, 40);
    // blanks for the word length shown right away; first 2 letters after 5s,
    // then 2 more every 10s, with a circular countdown to each reveal
    const len = primaryForm(it.term).length;
    quiz.hintN = 0;
    hint.hidden = false;
    hint.innerHTML = "<b>" + maskPrefix(it.term, 0) + "</b>";
    function scheduleReveal(ms) {
      startRing(ms);
      quiz.hintTimer = setTimeout(function () {
        quiz.hintN += 2;
        hint.innerHTML = "<b>" + maskPrefix(it.term, quiz.hintN) + "</b>";
        if (quiz.hintN < len) scheduleReveal(HINT_STEP_MS);
        else stopRing();
      }, ms);
    }
    scheduleReveal(HINT_FIRST_MS);
  }

  function submitQ() {
    if (!quiz) return;
    if (quiz.answered) {
      quiz.i++;
      if (quiz.i >= quiz.items.length) finishQuiz();
      else renderQ();
      return;
    }
    clearHintTimer();
    const it = quiz.items[quiz.i];
    const input = ov.querySelector(".srs-qinput");
    const ans = normAns(input.value);
    const ok = ans !== "" && acceptable(it.term).indexOf(ans) !== -1;
    quiz.answered = true;
    input.disabled = true;
    if (ok) quiz.correct++;
    const fb = ov.querySelector(".srs-qfeedback");
    fb.hidden = false;
    fb.className = "srs-qfeedback " + (ok ? "good" : "bad");
    fb.innerHTML = (ok ? "✓ correct" : "✗ answer: <b>" + primaryForm(it.term) + "</b>") +
      (it.example ? '<span class="qex">“' + it.example + "”</span>" : "");
    ov.querySelector(".srs-qscore").textContent = quiz.correct + " correct";
    const last = quiz.i >= quiz.items.length - 1;
    ov.querySelector('[data-q="submit"]').textContent = last ? "See result ›" : "Next ›";
  }

  function finishQuiz() {
    clearHintTimer();
    const total = quiz.items.length;
    const rate = total ? quiz.correct / total : 0;
    const pct = Math.round(rate * 100);
    const passed = rate >= PASS_RATE;
    const id = quiz.id, queue = quiz.queue, qpos = quiz.qpos;
    if (passed) { markLearned(id); delete locks[id]; saveLocks(); }
    else { locks[id] = now() + LOCK_MS; saveLocks(); }
    showMsg(
      passed ? "✓" : "✕",
      (passed ? "Passed · " : "Locked · ") + pct + "% (" + quiz.correct + "/" + total + ")",
      passed
        ? "This card moves up the spaced-repetition ladder — come back at the next interval."
        : "Below 80%. This card is locked for 30 minutes; review the words, then retake.",
      passed ? "good" : "bad",
      function () { quiz = null; continueQueue(queue, qpos); }
    );
  }

  /* ---------- message / locked view ---------- */
  function showMsg(icon, title, text, kind, onOk) {
    const ic = ov.querySelector(".srs-msg-icon");
    ic.textContent = icon; ic.className = "srs-msg-icon " + (kind || "");
    ov.querySelector(".srs-msg-title").textContent = title;
    ov.querySelector(".srs-msg-text").textContent = text;
    msgOk = onOk || function () { closeRaw(); };
    showView("msg");
    const b = ov.querySelector('[data-q="msgok"]');
    setTimeout(function () { try { b.focus(); } catch (e) {} }, 40);
  }

  function openLocked(id) {
    const r = reg[id];
    const mins = Math.ceil(lockLeft(id) / 60000);
    showMsg("🔒", "Locked for now",
      (r ? r.title + " — " : "") + "you can retake in about " + mins + " minute" + (mins === 1 ? "" : "s") + ". Use the time to review the words first.",
      "bad", function () { closeRaw(); });
    openShell();
  }

  function closeRaw() {
    clearHintTimer();
    ov.classList.remove("open");
    document.documentElement.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    current = null; quiz = null; mode = null; msgOk = null;
  }

  function onOverlayClick(e) {
    const navBtn = e.target.closest("[data-nav]");
    if (navBtn) {
      const act = navBtn.getAttribute("data-act");
      if (act === "close") closeRaw();
      else if (act === "prev") step(-1);
      else if (act === "next") step(1);
      // 'cam' -> let the anchor open in a new tab
      return;
    }
    const qBtn = e.target.closest("[data-q]");
    if (qBtn) {
      const a = qBtn.getAttribute("data-q");
      if (a === "submit") submitQ();
      else if (a === "msgok" && msgOk) msgOk();
      return;
    }
    if (mode === "card" && current && current.completed) { finish(); return; }
    if (e.target.closest("[data-close]")) closeRaw();
  }

  function onKey(e) {
    if (e.key === "Escape") { closeRaw(); return; }
    if (mode === "card") {
      if (!current) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      else if (e.key === "Enter") { e.preventDefault(); openCambridge(); }
    } else if (mode === "quiz") {
      if (e.key === "Enter") { e.preventDefault(); submitQ(); }
    } else if (mode === "msg") {
      if (e.key === "Enter") { e.preventDefault(); if (msgOk) msgOk(); }
    }
  }

  /* ---------- public API for cloud sync (sync.js) ---------- */
  window.SRS = {
    // current progress map: { cardId: { level, ts } }
    export: function () { return JSON.parse(JSON.stringify(store)); },
    // merge a remote map in (newer ts wins per card), persist + re-render,
    // and return the merged map so the caller can write it back once
    importRemote: function (remote) {
      store = mergeStores(store, remote || {});
      save();
      applyAll();
      return JSON.parse(JSON.stringify(store));
    },
    // register a callback fired after every local change (study / reset)
    onChange: function (cb) { changeCb = cb; }
  };

  /* ---------- init ---------- */
  function init() {
    buildOverlay();
    collectCards();
    injectLegends();
    applyAll();
    setInterval(applyAll, 60000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
