/* ============================================================
   main.js — render case files, build nav, wire interactions.
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // a word entry may be a plain string or { w, d, x }
  const wText = (it) => (typeof it === "string" ? it : it.w);
  const wDef = (it) => (typeof it === "string" ? "" : (it.d || ""));
  const wEx = (it) => (typeof it === "string" ? "" : (it.x || ""));
  const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  function chip(it) {
    const def = wDef(it);
    return '<span' + (def ? ' title="' + escAttr(def) + '"' : "") + ">" + wText(it) + "</span>";
  }

  /* ex may be a single string or an array of examples; empties are dropped */
  function exHTML(ex) {
    if (!ex) return "";
    const arr = (Array.isArray(ex) ? ex : [ex]).filter(function (e) { return e && String(e).trim(); });
    return arr.map(function (e) { return '<span class="ex">' + e + "</span>"; }).join("");
  }

  /* ---------- render case files ---------- */
  function stepsHTML(steps) {
    return (
      '<ol class="steps">' +
      steps
        .map(function (s) {
          return "<li>" + s.t + exHTML(s.ex) + "</li>";
        })
        .join("") +
      "</ol>"
    );
  }

  function trapsHTML(traps) {
    return (
      '<ul class="traps">' +
      traps
        .map(function (t) {
          return "<li><span class=\"name\">" + t.n + "</span> " + t.d + exHTML(t.ex) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function patternsHTML(patterns) {
    return patterns
      .map(function (p) {
        return (
          '<div class="mini-pattern">' +
          '<span class="label">' + p.label + "</span>" +
          '<div class="pair">' +
          '<span><span class="ql">Question</span> ' + p.q + "</span>" +
          '<span><span class="ql">Passage</span> ' + p.p + "</span>" +
          "</div>" +
          '<p class="why" style="font-size:.9rem;color:var(--text-soft);margin:.2rem 0 0">' +
          p.note +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function caseHTML(c, i) {
    const base = "tab-" + c.id;
    return (
      '<article class="case" id="case-' + c.id + '">' +
        '<div class="case-head">' +
          '<div class="case-no">' + c.no + "</div>" +
          '<div class="case-title">' +
            "<h3>" + c.title + "</h3>" +
            '<div class="alias">' + c.alias + "</div>" +
          "</div>" +
          '<div class="case-meta">' +
            '<span class="order ' + c.orderClass + '">answers ' + c.order + "</span>" +
          "</div>" +
        "</div>" +
        '<p style="padding:1.1rem clamp(1.1rem,3vw,1.8rem) 0;margin:0;color:var(--text-soft);max-width:70ch">' + c.blurb + "</p>" +
        '<div class="tabs" role="tablist" aria-label="' + c.title + ' views">' +
          '<button class="tab" role="tab" aria-selected="true" id="' + base + '-s" aria-controls="' + base + '-sp" data-target="' + base + '-sp">Strategy</button>' +
          '<button class="tab" role="tab" aria-selected="false" id="' + base + '-t" aria-controls="' + base + '-tp" data-target="' + base + '-tp">Traps <span class="dot">&bull;</span></button>' +
          '<button class="tab" role="tab" aria-selected="false" id="' + base + '-p" aria-controls="' + base + '-pp" data-target="' + base + '-pp">Patterns</button>' +
        "</div>" +
        '<div class="panel" role="tabpanel" id="' + base + '-sp" aria-labelledby="' + base + '-s">' + stepsHTML(c.steps) + "</div>" +
        '<div class="panel" role="tabpanel" id="' + base + '-tp" aria-labelledby="' + base + '-t" hidden>' + trapsHTML(c.traps) + "</div>" +
        '<div class="panel" role="tabpanel" id="' + base + '-pp" aria-labelledby="' + base + '-p" hidden>' + patternsHTML(c.patterns) + "</div>" +
      "</article>"
    );
  }

  const container = $("#caseContainer");
  if (container && window.CASES) {
    container.innerHTML = CASES.map(caseHTML).join("");
  }

  /* ---------- synonym banks: render + live search + theme filter ---------- */
  (function vocab() {
    const grid = $("#vocabGrid");
    if (!grid || !window.VOCAB) return;

    const search = $("#vocabSearch");
    const chipsWrap = $("#vocabChips");
    const countEl = $("#vocabCount");
    const emptyEl = $("#vocabEmpty");

    // render cards
    grid.innerHTML = VOCAB.map(function (v, i) {
      return (
        '<div class="vcard srs-card" data-tag="' + v.tag + '" data-i="' + i + '" data-srs-id="v:' + i + '" tabindex="0" role="button">' +
          '<div class="vhead">' +
            "<h4>" + v.g + "</h4>" +
            '<span class="vtag">' + v.tag + "</span>" +
          "</div>" +
          '<p class="vsense">' + v.sense + "</p>" +
          '<div class="vwords">' +
            v.words.map(chip).join("") +
          "</div>" +
          (v.note ? '<p class="vnote">' + v.note + "</p>" : "") +
        "</div>"
      );
    }).join("");

    // theme chips
    const tags = [];
    VOCAB.forEach(function (v) { if (tags.indexOf(v.tag) === -1) tags.push(v.tag); });
    let activeTag = "all";
    chipsWrap.innerHTML =
      '<button class="chip" data-tag="all" aria-pressed="true">All</button>' +
      tags.map(function (t) {
        return '<button class="chip" data-tag="' + t + '" aria-pressed="false">' + t + "</button>";
      }).join("");

    const cards = $$(".vcard", grid);

    function apply() {
      const q = (search.value || "").trim().toLowerCase();
      let shown = 0;
      cards.forEach(function (card) {
        const v = VOCAB[+card.getAttribute("data-i")];
        const tagOk = activeTag === "all" || v.tag === activeTag;
        const hay = (v.g + " " + v.sense + " " + v.tag + " " +
          v.words.map(function (w) { return wText(w) + " " + wDef(w) + " " + wEx(w); }).join(" ")).toLowerCase();
        const textOk = !q || hay.indexOf(q) !== -1;
        const show = tagOk && textOk;
        card.hidden = !show;
        if (show) shown++;
        // highlight matching word chips
        $$(".vwords span", card).forEach(function (sp) {
          const isHit = q && sp.textContent.toLowerCase().indexOf(q) !== -1;
          sp.classList.toggle("hit", !!isHit);
        });
      });
      countEl.textContent = shown + " of " + VOCAB.length + " groups";
      emptyEl.hidden = shown !== 0;
    }

    search.addEventListener("input", apply);
    chipsWrap.addEventListener("click", function (e) {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      activeTag = chip.getAttribute("data-tag");
      $$(".chip", chipsWrap).forEach(function (c) {
        c.setAttribute("aria-pressed", String(c === chip));
      });
      apply();
    });

    apply();
  })();

  /* ---------- easily confused: render + search ---------- */
  (function confus() {
    const grid = $("#confusGrid");
    if (!grid || !window.CONFUSABLES) return;
    const search = $("#confusSearch");
    const countEl = $("#confusCount");
    const emptyEl = $("#confusEmpty");

    grid.innerHTML = CONFUSABLES.map(function (c, i) {
      const rows = c.items.map(function (it) {
        return (
          '<div class="crow">' +
            '<span class="cw">' + it.w + '<span class="pos">' + it.pos + "</span></span>" +
            '<span class="cdef">' + it.d + "</span>" +
          "</div>"
        );
      }).join("");
      return (
        '<div class="ccard srs-card" data-i="' + i + '" data-srs-id="c:' + i + '" tabindex="0" role="button">' + rows +
        '<div class="cnote"><span>' + c.note + "</span></div>" +
        "</div>"
      );
    }).join("");

    const cards = $$(".ccard", grid);
    function apply() {
      const q = (search.value || "").trim().toLowerCase();
      let shown = 0;
      cards.forEach(function (card) {
        const c = CONFUSABLES[+card.getAttribute("data-i")];
        const hay = (c.items.map(function (it) { return it.w + " " + it.d; }).join(" ") + " " + c.note).toLowerCase();
        const show = !q || hay.indexOf(q) !== -1;
        card.hidden = !show;
        if (show) shown++;
      });
      countEl.textContent = shown + " of " + CONFUSABLES.length + " pairs";
      emptyEl.hidden = shown !== 0;
    }
    search.addEventListener("input", apply);
    apply();
  })();

  /* ---------- academic collocations ---------- */
  (function colloc() {
    const grid = $("#collocGrid");
    if (!grid || !window.COLLOCATIONS) return;
    grid.innerHTML = COLLOCATIONS.map(function (v, i) {
      return (
        '<div class="vcard srs-card" data-srs-id="k:' + i + '" tabindex="0" role="button">' +
          '<div class="vhead"><h4>' + v.g + "</h4></div>" +
          '<p class="vsense">' + v.sense + "</p>" +
          '<div class="vwords">' +
            v.items.map(chip).join("") +
          "</div>" +
        "</div>"
      );
    }).join("");
  })();

  /* ==========================================================
     WRITING mode: criteria, techniques, mistakes, cases, langbank
     ========================================================== */
  function tagLabel(t) { return t === "t1" ? "Task 1" : t === "t2" ? "Task 2" : t; }

  function blueprintHTML(bp) {
    return '<ol class="blueprint">' + bp.map(function (b) {
      return '<li><span class="bp-part">' + b.part + '</span><span class="bp-detail">' + b.detail + "</span></li>";
    }).join("") + "</ol>";
  }

  /* approach / structure / pitfalls case — shared by Writing & Speaking */
  function approachCaseHTML(c, base, artId) {
    return (
      '<article class="case" id="' + artId + '">' +
        '<div class="case-head">' +
          '<div class="case-no">' + c.no + "</div>" +
          '<div class="case-title"><h3>' + c.title + "</h3><div class=\"alias\">" + c.alias + "</div></div>" +
          '<div class="case-meta"><span class="order seq">' + c.meta + "</span></div>" +
        "</div>" +
        '<p style="padding:1.1rem clamp(1.1rem,3vw,1.8rem) 0;margin:0;color:var(--text-soft);max-width:70ch">' + c.blurb + "</p>" +
        '<div class="tabs" role="tablist" aria-label="' + c.title + ' views">' +
          '<button class="tab" role="tab" aria-selected="true" id="' + base + '-a" aria-controls="' + base + '-ap" data-target="' + base + '-ap">Approach</button>' +
          '<button class="tab" role="tab" aria-selected="false" id="' + base + '-s" aria-controls="' + base + '-sp" data-target="' + base + '-sp">Structure</button>' +
          '<button class="tab" role="tab" aria-selected="false" id="' + base + '-p" aria-controls="' + base + '-pp" data-target="' + base + '-pp">Pitfalls <span class="dot">&bull;</span></button>' +
        "</div>" +
        '<div class="panel" role="tabpanel" id="' + base + '-ap" aria-labelledby="' + base + '-a">' + stepsHTML(c.steps) + "</div>" +
        '<div class="panel" role="tabpanel" id="' + base + '-sp" aria-labelledby="' + base + '-s" hidden>' + blueprintHTML(c.blueprint) + "</div>" +
        '<div class="panel" role="tabpanel" id="' + base + '-pp" aria-labelledby="' + base + '-p" hidden>' + trapsHTML(c.pitfalls) + "</div>" +
      "</article>"
    );
  }
  function writingCaseHTML(c) { return approachCaseHTML(c, "wt-" + c.id, "wcase-" + c.id); }
  function speakingCaseHTML(c) { return approachCaseHTML(c, "sp-" + c.id, "scase-" + c.id); }

  /* techniques grid (Writing & Speaking share this card) */
  function techniquesHTML(arr) {
    return arr.map(function (t) {
      return (
        '<div class="pattern">' +
          '<h4><span class="num">' + t.crit + "</span> " + t.name + "</h4>" +
          '<div class="ex-wrap">' + exHTML(t.ex) + "</div>" +
          '<p class="why">' + t.why + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* power-structure cards: frame + examples + usage note */
  function structuresHTML(arr) {
    return '<div class="structs">' + arr.map(function (s) {
      return (
        '<div class="struct">' +
          '<div class="struct-head"><span class="struct-tag">' + (s.tag || "") + '</span><h4>' + s.name + "</h4></div>" +
          '<p class="struct-frame">' + s.frame + "</p>" +
          '<div class="struct-ex">' + exHTML(s.ex) + "</div>" +
          (s.use ? '<p class="struct-use">' + s.use + "</p>" : "") +
        "</div>"
      );
    }).join("") + "</div>";
  }

  /* practice-drill cards: cadence tag + method + steps + examples */
  function practiceHTML(arr) {
    return '<div class="drills">' + arr.map(function (d) {
      return (
        '<div class="drill">' +
          '<div class="drill-head"><span class="drill-tag">' + d.tag + '</span><h4>' + d.name + "</h4></div>" +
          '<p class="drill-how">' + d.how + "</p>" +
          (d.steps ? '<ol class="steps">' + d.steps.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ol>" : "") +
          (d.ex ? '<div class="drill-ex">' + exHTML(d.ex) + "</div>" : "") +
        "</div>"
      );
    }).join("") + "</div>";
  }

  /* principles grid (how it is scored) */
  function principlesHTML(arr) {
    return arr.map(function (p) {
      return '<div class="principle"><span class="n">' + p.n + '</span><h4>' + p.h + "</h4><p>" + p.p + "</p></div>";
    }).join("");
  }

  /* the four criteria cards (Writing & Speaking) */
  function criteriaHTML(arr) {
    return arr.map(function (c) {
      return (
        '<div class="crit">' +
          '<div class="crit-head"><div class="code"><span>' + c.code + '</span><span class="pct">' + c.pct + "</span></div>" +
            "<h4>" + c.name + "</h4><p>" + c.intro + "</p></div>" +
          '<div class="crit-body">' +
            '<div class="crit-row b6"><span class="lbl">Band 6</span><p>' + c.b6 + "</p></div>" +
            '<div class="crit-row b8"><span class="lbl">Band 8</span><p>' + c.b8 + "</p></div>" +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  /* mistakes list (shared) */
  function mistakesHTML(arr) {
    return arr.map(function (t) {
      return "<li><span class=\"name\">" + t.n + "</span> " + t.d + exHTML(t.ex) + "</li>";
    }).join("");
  }

  if (window.WRITING) {
    const W = window.WRITING;

    const critEl = $("#wCriteria");
    if (critEl) critEl.innerHTML = criteriaHTML(W.criteria);

    const techEl = $("#wTechniques");
    if (techEl) techEl.innerHTML = techniquesHTML(W.techniques);

    const wStructEl = $("#wStructures");
    if (wStructEl && W.structures) wStructEl.innerHTML = structuresHTML(W.structures);

    const wPracticeEl = $("#wPractice");
    if (wPracticeEl && W.practice) wPracticeEl.innerHTML = practiceHTML(W.practice);

    const misEl = $("#wMistakes");
    if (misEl) misEl.innerHTML = mistakesHTML(W.mistakes);

    const t1El = $("#wT1Container");
    if (t1El) t1El.innerHTML = W.t1.map(writingCaseHTML).join("");
    const t2El = $("#wT2Container");
    if (t2El) t2El.innerHTML = W.t2.map(writingCaseHTML).join("");

    // writing nav links
    const nT1 = $("#navWT1"), nT2 = $("#navWT2");
    if (nT1) nT1.insertAdjacentHTML("beforeend", W.t1.map(function (c, i) {
      return '<a href="#wcase-' + c.id + '"><span class="idx">' + (i + 1) + "</span> " + c.title + "</a>";
    }).join(""));
    if (nT2) nT2.insertAdjacentHTML("beforeend", W.t2.map(function (c, i) {
      return '<a href="#wcase-' + c.id + '"><span class="idx">' + (i + 1) + "</span> " + c.title + "</a>";
    }).join(""));
  }

  /* ==========================================================
     SPEAKING mode: principles, criteria, techniques, structures,
     parts, practice, mistakes, langbank
     ========================================================== */
  if (window.SPEAKING) {
    const S = window.SPEAKING;

    const sPrin = $("#sPrinciples");
    if (sPrin) sPrin.innerHTML = principlesHTML(S.principles);

    const sCrit = $("#sCriteria");
    if (sCrit) sCrit.innerHTML = criteriaHTML(S.criteria);

    const sTech = $("#sTechniques");
    if (sTech) sTech.innerHTML = techniquesHTML(S.techniques);

    const sStruct = $("#sStructures");
    if (sStruct) sStruct.innerHTML = structuresHTML(S.structures);

    const sParts = $("#sParts");
    if (sParts) sParts.innerHTML = S.parts.map(speakingCaseHTML).join("");

    const sPrac = $("#sPractice");
    if (sPrac) sPrac.innerHTML = practiceHTML(S.practice);

    const sMis = $("#sMistakes");
    if (sMis) sMis.innerHTML = mistakesHTML(S.mistakes);

    // speaking part nav links
    const nSP = $("#navSParts");
    if (nSP) nSP.insertAdjacentHTML("beforeend", S.parts.map(function (c) {
      return '<a href="#scase-' + c.id + '"><span class="idx">' + c.no + "</span> " + c.title + "</a>";
    }).join(""));
  }

  /* ---------- speaking language bank: render + search + filter ---------- */
  (function slang() {
    const grid = $("#sLangGrid");
    if (!grid || !window.SLANG) return;
    const search = $("#sLangSearch"), chipsWrap = $("#sLangChips"), countEl = $("#sLangCount"), emptyEl = $("#sLangEmpty");
    const sLabel = function (t) {
      return t === "p1" ? "Part 1" : t === "p2" ? "Part 2" : t === "p3" ? "Part 3" : t === "all" ? "Any part" : t;
    };

    grid.innerHTML = SLANG.map(function (v, i) {
      return (
        '<div class="vcard srs-card" data-tag="' + v.tag + '" data-i="' + i + '" data-srs-id="s:' + i + '" tabindex="0" role="button">' +
          '<div class="vhead"><h4>' + v.g + '</h4><span class="vtag">' + sLabel(v.tag) + "</span></div>" +
          '<p class="vsense">' + v.sense + "</p>" +
          '<div class="vwords">' + v.items.map(chip).join("") + "</div>" +
        "</div>"
      );
    }).join("");

    const tags = [];
    SLANG.forEach(function (v) { if (tags.indexOf(v.tag) === -1) tags.push(v.tag); });
    let active = "all";
    chipsWrap.innerHTML =
      '<button class="chip" data-tag="all" aria-pressed="true">All</button>' +
      tags.map(function (t) { return '<button class="chip" data-tag="' + t + '" aria-pressed="false">' + sLabel(t) + "</button>"; }).join("");

    const cards = $$(".vcard", grid);
    function apply() {
      const q = (search.value || "").trim().toLowerCase();
      let shown = 0;
      cards.forEach(function (card) {
        const v = SLANG[+card.getAttribute("data-i")];
        const tagOk = active === "all" || v.tag === active;
        const hay = (v.g + " " + v.sense + " " + v.tag + " " +
          v.items.map(function (w) { return wText(w) + " " + wDef(w) + " " + wEx(w); }).join(" ")).toLowerCase();
        const show = tagOk && (!q || hay.indexOf(q) !== -1);
        card.hidden = !show;
        if (show) shown++;
        $$(".vwords span", card).forEach(function (sp) {
          sp.classList.toggle("hit", !!(q && sp.textContent.toLowerCase().indexOf(q) !== -1));
        });
      });
      countEl.textContent = shown + " of " + SLANG.length + " groups";
      emptyEl.hidden = shown !== 0;
    }
    search.addEventListener("input", apply);
    chipsWrap.addEventListener("click", function (e) {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      active = chip.getAttribute("data-tag");
      $$(".chip", chipsWrap).forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      apply();
    });
    apply();
  })();

  /* ---------- writing language bank: render + search + filter ---------- */
  (function wlang() {
    const grid = $("#wLangGrid");
    if (!grid || !window.WLANG) return;
    const search = $("#wLangSearch"), chipsWrap = $("#wLangChips"), countEl = $("#wLangCount"), emptyEl = $("#wLangEmpty");

    grid.innerHTML = WLANG.map(function (v, i) {
      return (
        '<div class="vcard srs-card" data-tag="' + v.tag + '" data-i="' + i + '" data-srs-id="w:' + i + '" tabindex="0" role="button">' +
          '<div class="vhead"><h4>' + v.g + '</h4><span class="vtag">' + tagLabel(v.tag) + "</span></div>" +
          '<p class="vsense">' + v.sense + "</p>" +
          '<div class="vwords">' + v.items.map(chip).join("") + "</div>" +
        "</div>"
      );
    }).join("");

    const tags = [];
    WLANG.forEach(function (v) { if (tags.indexOf(v.tag) === -1) tags.push(v.tag); });
    let active = "all";
    chipsWrap.innerHTML =
      '<button class="chip" data-tag="all" aria-pressed="true">All</button>' +
      tags.map(function (t) { return '<button class="chip" data-tag="' + t + '" aria-pressed="false">' + tagLabel(t) + "</button>"; }).join("");

    const cards = $$(".vcard", grid);
    function apply() {
      const q = (search.value || "").trim().toLowerCase();
      let shown = 0;
      cards.forEach(function (card) {
        const v = WLANG[+card.getAttribute("data-i")];
        const tagOk = active === "all" || v.tag === active;
        const hay = (v.g + " " + v.sense + " " + v.tag + " " +
          v.items.map(function (w) { return wText(w) + " " + wDef(w) + " " + wEx(w); }).join(" ")).toLowerCase();
        const show = tagOk && (!q || hay.indexOf(q) !== -1);
        card.hidden = !show;
        if (show) shown++;
        $$(".vwords span", card).forEach(function (sp) {
          sp.classList.toggle("hit", !!(q && sp.textContent.toLowerCase().indexOf(q) !== -1));
        });
      });
      countEl.textContent = shown + " of " + WLANG.length + " groups";
      emptyEl.hidden = shown !== 0;
    }
    search.addEventListener("input", apply);
    chipsWrap.addEventListener("click", function (e) {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      active = chip.getAttribute("data-tag");
      $$(".chip", chipsWrap).forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      apply();
    });
    apply();
  })();

  /* ---------- annotated band-8 model answers ---------- */
  (function models() {
    const grid = $("#wModelsContainer");
    if (!grid || !window.WMODELS) return;
    function critKey(c) { return c === "TA" ? "TR" : c; }
    function annoParse(s) {
      return s.replace(/\[\[(\d+)\|([^\]]+)\]\]/g, function (_, n, txt) {
        return '<span class="anno" data-n="' + n + '" tabindex="0">' + txt + "<sup>" + n + "</sup></span>";
      });
    }
    grid.innerHTML = WMODELS.map(function (m) {
      return (
        '<article class="model" id="model-' + m.id + '">' +
          '<div class="model-head"><span class="model-tag">' + m.task + " · " + m.type + '</span><span class="model-band">' + m.band + "</span></div>" +
          '<div class="model-prompt">' + m.prompt + "</div>" +
          '<div class="model-body">' + m.paras.map(function (p) { return "<p>" + annoParse(p) + "</p>"; }).join("") + "</div>" +
          '<div class="model-notes"><p class="model-notes-title">What lifts it to band 8</p><ol>' +
            m.notes.map(function (nt, i) {
              return '<li class="note" data-n="' + (i + 1) + '"><span class="tag tag-' + critKey(nt.crit) + '">' + nt.crit + '</span><span class="note-t">' + nt.t + "</span></li>";
            }).join("") +
          "</ol></div>" +
        "</article>"
      );
    }).join("");

    const leg = $("#modelLegend");
    if (leg) {
      leg.innerHTML = [["TR", "Task response"], ["CC", "Coherence"], ["LR", "Lexis"], ["GRA", "Grammar"]]
        .map(function (c) { return '<span class="tag tag-' + c[0] + '">' + c[0] + '</span><span class="leg-l">' + c[1] + "</span>"; }).join("");
    }

    function setActive(model, n, on) {
      if (!model) return;
      $$('[data-n="' + n + '"]', model).forEach(function (el) { el.classList.toggle("active", on); });
    }
    function hoverHandler(on) {
      return function (e) {
        const el = e.target.closest("[data-n]");
        if (el) setActive(el.closest(".model"), el.getAttribute("data-n"), on);
      };
    }
    grid.addEventListener("mouseover", hoverHandler(true));
    grid.addEventListener("mouseout", hoverHandler(false));
    grid.addEventListener("focusin", hoverHandler(true));
    grid.addEventListener("focusout", hoverHandler(false));
    grid.addEventListener("click", function (e) {
      const a = e.target.closest(".anno");
      if (!a) return;
      const model = a.closest(".model");
      const note = model.querySelector('.note[data-n="' + a.getAttribute("data-n") + '"]');
      if (note) {
        note.scrollIntoView({ block: "center", behavior: "smooth" });
        note.classList.add("pulse");
        setTimeout(function () { note.classList.remove("pulse"); }, 1200);
      }
    });
  })();

  /* ---------- TOEIC: Listening & Reading parts ---------- */
  function fmtHTML(essence, format) {
    return (essence ? '<p class="toeic-essence">' + essence + "</p>" : "") +
      '<ul class="fmt">' + format.map(function (f) {
        return '<li><span class="fk">' + f.k + '</span><span class="fv">' + f.v + "</span></li>";
      }).join("") + "</ul>";
  }
  function typesHTML(types) {
    return '<ul class="qtypes">' + types.map(function (t) {
      return '<li><span class="qt">' + t.name + "</span> " + t.ex + "</li>";
    }).join("") + "</ul>";
  }
  function toeicCaseHTML(c) {
    const base = "tt-" + c.id;
    const hasTypes = c.types && c.types.length;
    const tabs =
      '<button class="tab" role="tab" aria-selected="true" id="' + base + '-f" aria-controls="' + base + '-fp" data-target="' + base + '-fp">Format</button>' +
      (hasTypes ? '<button class="tab" role="tab" aria-selected="false" id="' + base + '-y" aria-controls="' + base + '-yp" data-target="' + base + '-yp">Types</button>' : "") +
      '<button class="tab" role="tab" aria-selected="false" id="' + base + '-s" aria-controls="' + base + '-sp" data-target="' + base + '-sp">Strategy</button>' +
      '<button class="tab" role="tab" aria-selected="false" id="' + base + '-t" aria-controls="' + base + '-tp" data-target="' + base + '-tp">Traps <span class="dot">&bull;</span></button>';
    const panels =
      '<div class="panel" role="tabpanel" id="' + base + '-fp" aria-labelledby="' + base + '-f">' + fmtHTML(c.essence, c.format) + "</div>" +
      (hasTypes ? '<div class="panel" role="tabpanel" id="' + base + '-yp" aria-labelledby="' + base + '-y" hidden>' + typesHTML(c.types) + "</div>" : "") +
      '<div class="panel" role="tabpanel" id="' + base + '-sp" aria-labelledby="' + base + '-s" hidden>' + stepsHTML(c.tips) + "</div>" +
      '<div class="panel" role="tabpanel" id="' + base + '-tp" aria-labelledby="' + base + '-t" hidden>' + trapsHTML(c.traps) + "</div>";
    return (
      '<article class="case" id="tcase-' + c.id + '">' +
        '<div class="case-head">' +
          '<div class="case-no">' + c.no + "</div>" +
          '<div class="case-title"><h3>' + c.title + "</h3><div class=\"alias\">" + c.alias + "</div></div>" +
          '<div class="case-meta"><span class="order seq">' + c.meta + "</span></div>" +
        "</div>" +
        '<p style="padding:1.1rem clamp(1.1rem,3vw,1.8rem) 0;margin:0;color:var(--text-soft);max-width:70ch">' + c.blurb + "</p>" +
        '<div class="tabs" role="tablist" aria-label="' + c.title + ' views">' + tabs + "</div>" +
        panels +
      "</article>"
    );
  }
  if (window.TOEIC) {
    const lc = $("#toeicLcParts"); if (lc) lc.innerHTML = TOEIC.lc.map(toeicCaseHTML).join("");
    const rc = $("#toeicRcParts"); if (rc) rc.innerHTML = TOEIC.rc.map(toeicCaseHTML).join("");
    const navLink = function (c) { return '<a href="#tcase-' + c.id + '"><span class="idx">' + c.no + "</span> " + c.title + "</a>"; };
    const nLc = $("#navTLC"); if (nLc) nLc.insertAdjacentHTML("beforeend", TOEIC.lc.map(navLink).join(""));
    const nRc = $("#navTRC"); if (nRc) nRc.insertAdjacentHTML("beforeend", TOEIC.rc.map(navLink).join(""));
  }

  /* ---------- section mode switch (IELTS R/W · TOEIC L/R) ---------- */
  (function modeSwitch() {
    const btns = $$(".mode-btn");
    if (!btns.length) return;
    const views = $$(".view"), navs = $$(".nav-mode");
    const valid = btns.map(function (b) { return b.getAttribute("data-mode"); });
    const KEY = "band8-mode";
    function set(mode) {
      if (valid.indexOf(mode) === -1) mode = "reading";
      document.body.setAttribute("data-mode", mode);
      btns.forEach(function (b) { b.setAttribute("aria-selected", String(b.getAttribute("data-mode") === mode)); });
      views.forEach(function (v) { v.hidden = v.getAttribute("data-view") !== mode; });
      navs.forEach(function (n) { n.hidden = n.getAttribute("data-mode") !== mode; });
      try { localStorage.setItem(KEY, mode); } catch (e) {}
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { set(b.getAttribute("data-mode")); window.scrollTo(0, 0); });
    });
    let init = "reading";
    try { init = localStorage.getItem(KEY) || "reading"; } catch (e) {}
    set(init);
  })();

  /* ---------- build case nav links ---------- */
  const navCases = $("#navCases");
  if (navCases && window.CASES) {
    navCases.insertAdjacentHTML(
      "beforeend",
      CASES.map(function (c) {
        return (
          '<a href="#case-' + c.id + '"><span class="idx">' + c.no + "</span> " + c.title + "</a>"
        );
      }).join("")
    );
  }

  /* ---------- tabs (event delegation) ---------- */
  document.addEventListener("click", function (e) {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    const tablist = tab.closest(".tabs");
    const article = tab.closest(".case");
    $$(".tab", tablist).forEach(function (t) {
      t.setAttribute("aria-selected", "false");
    });
    tab.setAttribute("aria-selected", "true");
    $$(".panel", article).forEach(function (p) {
      p.hidden = true;
    });
    const target = document.getElementById(tab.getAttribute("data-target"));
    if (target) target.hidden = false;
  });

  // keyboard arrows for tabs
  document.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const tab = e.target.closest(".tab");
    if (!tab) return;
    const tabs = $$(".tab", tab.closest(".tabs"));
    const i = tabs.indexOf(tab);
    const next = e.key === "ArrowRight" ? tabs[i + 1] : tabs[i - 1];
    if (next) {
      next.focus();
      next.click();
    }
  });

  /* ---------- scroll-spy nav ---------- */
  const navLinks = $$(".nav a");
  const linkById = {};
  navLinks.forEach(function (a) {
    const id = a.getAttribute("href").slice(1);
    linkById[id] = a;
  });
  const targets = navLinks
    .map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && targets.length) {
    let activeId = null;
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            if (activeId && linkById[activeId]) linkById[activeId].classList.remove("active");
            activeId = en.target.id;
            if (linkById[activeId]) linkById[activeId].classList.add("active");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    targets.forEach(function (t) {
      spy.observe(t);
    });
  }

  /* ---------- mobile nav toggle ---------- */
  const navToggle = $("#navToggle");
  const navInner = $("#navInner");
  if (navToggle && navInner) {
    navToggle.addEventListener("click", function () {
      const open = navInner.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // close after choosing a link on mobile
    navInner.addEventListener("click", function (e) {
      if (e.target.closest("a") && window.matchMedia("(max-width: 900px)").matches) {
        navInner.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- hero highlighter swipe ---------- */
  const demo = $("#demo");
  if (demo) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      demo.classList.add("lit");
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              // small delay so the swipe reads as deliberate
              requestAnimationFrame(function () {
                setTimeout(function () {
                  demo.classList.add("lit");
                }, 250);
              });
              obs.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(demo);
    } else {
      demo.classList.add("lit");
    }
  }
})();
