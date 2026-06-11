(function () {
  "use strict";
  var D = window.SITE_DATA;
  if (!D) return;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function $(id) { return document.getElementById(id); }

  var arrow = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var extLink = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';
  var icoSteps = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>';
  var icoCode = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>';
  var icoTip = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>';
  var icoTarget = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12h.01"/></svg>';
  var icoTable = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/></svg>';

  // 入門／中等／進階 → 彩色等級籤
  function levelCell(v) {
    var m = { "入門": "a", "中等": "b", "進階": "c" }[v];
    return m ? '<span class="lvl lvl-' + m + '">' + esc(v) + "</span>" : esc(v);
  }

  function tagsHtml(tags) {
    if (!tags || !tags.length) return "";
    return '<div class="tags">' + tags.map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("") + "</div>";
  }

  // Flatten tools so a card can reference its tool by index for the detail modal.
  var allTools = [];
  D.tools.forEach(function (g) {
    g.items.forEach(function (t) { allTools.push(t); });
  });
  var toolCount = allTools.length;

  // 名稱 → 索引：串接籤若對得上工具，就能點開它的教學
  var toolIndexByName = {};
  allTools.forEach(function (t, i) { toolIndexByName[t.name] = i; });

  function toolChip(name) {
    var i = toolIndexByName[name];
    return i == null
      ? '<span class="conn-chip plain">' + esc(name) + "</span>"
      : '<button type="button" class="conn-chip" data-tool-link="' + i + '">' + esc(name) + "</button>";
  }

  var icoCheck = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  var icoChain = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/></svg>';
  var icoFlowArrow = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var icoSearch = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  var icoNote = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';

  // ---- 本機儲存：進度之外的個人資料（已學會、筆記、起點測驗結果）----
  var KNOWN_KEY = "ai-lib-known", NOTES_KEY = "ai-lib-notes", PROFILE_KEY = "ai-lib-profile";
  function loadKnown() {
    try { var a = JSON.parse(localStorage.getItem(KNOWN_KEY)); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  function saveKnown(a) { try { localStorage.setItem(KNOWN_KEY, JSON.stringify(a)); } catch (e) {} }
  function isKnown(name) { return loadKnown().indexOf(name) !== -1; }
  function toggleKnown(name) {
    var a = loadKnown(); var i = a.indexOf(name);
    if (i === -1) a.push(name); else a.splice(i, 1);
    saveKnown(a);
  }
  function loadNotes() {
    try { var o = JSON.parse(localStorage.getItem(NOTES_KEY)); return o && typeof o === "object" ? o : {}; } catch (e) { return {}; }
  }
  function saveNote(name, text) {
    var o = loadNotes();
    if (text) o[name] = text; else delete o[name];
    try { localStorage.setItem(NOTES_KEY, JSON.stringify(o)); } catch (e) {}
  }
  function loadProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch (e) { return null; }
  }
  function saveProfile(p) { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {} }

  function patchCard(i) {
    var card = document.querySelector('.tool-card[data-tool="' + i + '"]');
    if (!card) return;
    var on = isKnown(allTools[i].name);
    card.classList.toggle("known", on);
    var b = card.querySelector(".known-badge");
    if (on && !b) card.insertAdjacentHTML("afterbegin", '<span class="known-badge" title="已學會">' + icoCheck + "</span>");
    if (!on && b) b.remove();
  }

  // ---- Hero meta + footer + stats ----
  if ($("updatedPill")) $("updatedPill").textContent = "最後更新：" + D.updated;
  if ($("footerUpdate")) $("footerUpdate").textContent =
    "最後更新：" + D.updated + "　·　共收錄 " + toolCount + " 項工具、" +
    D.skills.length + " 項技能、" + D.resources.length + " 個學習資源";

  var stats = [
    { n: D.learningPath.length, l: "步驟上手" },
    { n: toolCount, l: "精選工具" },
    { n: D.skills.length, l: "關鍵技能" },
    { n: D.follows.length, l: "優質來源" },
  ];
  if ($("heroStats")) {
    $("heroStats").innerHTML = stats.map(function (s) {
      return '<div class="stat"><b>' + s.n + "</b><span>" + esc(s.l) + "</span></div>";
    }).join("");
  }

  // ---- Learning path (從零到第一個工具，含進度追蹤) ----
  var PROG_KEY = "ai-lib-progress";
  function loadProg() {
    try {
      var a = JSON.parse(localStorage.getItem(PROG_KEY));
      return Array.isArray(a) ? a : [];
    } catch (e) { return []; }
  }
  function saveProg(a) {
    try { localStorage.setItem(PROG_KEY, JSON.stringify(a)); } catch (e) {}
  }

  function renderPath() {
    var prog = loadProg();
    var total = D.learningPath.length;
    var doneCount = D.learningPath.reduce(function (n, _, i) { return n + (prog[i] ? 1 : 0); }, 0);
    var known = loadKnown();
    var knownCount = allTools.filter(function (t) { return known.indexOf(t.name) !== -1; }).length;
    var nextIdx = -1;
    for (var k = 0; k < total; k++) { if (!prog[k]) { nextIdx = k; break; } }
    var profile = loadProfile();

    var dash = '<div class="path-progress">' +
      '<div class="path-progress-head"><b>我的學習儀表板</b><span>進度只存在這台裝置</span></div>' +
      '<div class="dash-bar"><div class="lab"><span>路徑進度</span><span>' + doneCount + " / " + total + '</span></div>' +
      '<div class="bar"><i style="width:' + Math.round((doneCount / total) * 100) + '%"></i></div></div>' +
      '<div class="dash-bar"><div class="lab"><span>已學會的工具</span><span>' + knownCount + " / " + toolCount + '</span></div>' +
      '<div class="bar"><i class="green" style="width:' + Math.round((knownCount / toolCount) * 100) + '%"></i></div></div>';
    if (nextIdx === -1) {
      dash += '<div class="dash-next"><b>六步全部完成！</b>接著把工具一個個標成「已學會」，或重測起點挑戰更進階的目標。</div>';
    } else {
      var np = D.learningPath[nextIdx];
      dash += '<div class="dash-next">下一步建議：<b>第 ' + (nextIdx + 1) + ' 步「' + esc(np.title) + '」</b>' +
        (np.tools && np.tools.length ? "・用到：" + np.tools.map(toolChip).join("") : "") + "</div>";
    }
    if (profile && D.learningPath[profile.stage]) {
      dash += '<div class="dash-profile"><b>你的目標：</b>' + esc(profile.focus) +
        '　<b>建議起點：</b>第 ' + (profile.stage + 1) + ' 步「' + esc(D.learningPath[profile.stage].title) + '」' +
        '<span class="dash-pace">' + esc(profile.pace) + "</span></div>";
    }
    dash += '<div class="dash-actions">' +
      '<button type="button" class="mini-btn" data-quiz-start>' + (profile ? "重新測起點" : "30 秒測你的起點") + "</button>" +
      '<button type="button" class="mini-btn" data-export>匯出進度</button>' +
      '<button type="button" class="mini-btn" data-import-btn>匯入進度</button>' +
      '<button type="button" class="mini-btn" data-clear>清除全部</button>' +
      "</div></div>";

    $("pathContainer").innerHTML = dash + D.learningPath.map(function (p, i) {
      var isDone = !!prog[i];
      return '<div class="path-step' + (isDone ? " is-done" : "") + '">' +
        '<div class="path-num">' + (isDone ? icoCheck : (i + 1)) + "</div>" +
        '<div class="path-content">' +
        '<div class="path-head"><h4>' + esc(p.title) + "</h4>" +
        (p.week ? '<span class="week">' + esc(p.week) + "</span>" : "") + "</div>" +
        '<p class="path-action">' + esc(p.action) + "</p>" +
        (p.tools && p.tools.length
          ? '<div class="path-tools"><span>用到：</span>' + p.tools.map(toolChip).join("") + "</div>"
          : "") +
        '<p class="path-goal"><span>目標</span>' + esc(p.goal) + "</p>" +
        (p.done ? '<p class="path-check"><span>過關標準</span>' + esc(p.done) + "</p>" : "") +
        (p.pitfall ? '<p class="path-pitfall"><span>卡住時</span>' + esc(p.pitfall) + "</p>" : "") +
        '<button type="button" class="path-done-btn' + (isDone ? " on" : "") + '" data-step="' + i + '">' +
        icoCheck + (isDone ? "已完成（點一下取消）" : "做到了，標記完成") + "</button>" +
        "</div></div>";
    }).join("");
  }
  if ($("pathContainer")) {
    renderPath();
    $("pathContainer").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-step]");
      if (!btn) return;
      var i = parseInt(btn.getAttribute("data-step"), 10);
      var prog = loadProg();
      prog[i] = !prog[i];
      saveProg(prog);
      renderPath();
    });
  }

  // ---- Flow map (工具怎麼彼此串接) ----
  if ($("flowContainer") && D.flow) {
    $("flowContainer").innerHTML = D.flow.map(function (f, i) {
      return (i ? '<div class="flow-arrow" aria-hidden="true">' + icoFlowArrow + "</div>" : "") +
        '<div class="flow-node">' +
        '<b class="flow-stage"><span>' + (i + 1) + "</span>" + esc(f.stage) + "</b>" +
        "<p>" + esc(f.desc) + "</p>" +
        (f.output ? '<p class="flow-output"><span>產出</span>' + esc(f.output) + "</p>" : "") +
        '<div class="flow-tools">' + f.tools.map(toolChip).join("") + "</div></div>";
    }).join("");
    if ($("flowNote") && D.flowNote) $("flowNote").textContent = D.flowNote;
  }

  // ---- Tools (grouped, click to open detail modal) ----
  function toolCard(idx, t) {
    var hay = (t.name + " " + (t.tagline || "") + " " + (t.intro || "") + " " + (t.tags || []).join(" ")).toLowerCase();
    var known = isKnown(t.name);
    return '<button class="card tool-card' + (known ? " known" : "") + '" type="button" data-tool="' + idx + '" ' +
      'data-search="' + esc(hay) + '">' +
      (known ? '<span class="known-badge" title="已學會">' + icoCheck + "</span>" : "") +
      '<div class="card-top"><h4>' + esc(t.name) + "</h4></div>" +
      '<p class="tool-tagline">' + esc(t.tagline || "") + "</p>" +
      '<div class="card-foot">' + tagsHtml(t.tags) +
      '<span class="go">查看教學' + arrow + "</span></div></button>";
  }
  function compareHtml(c) {
    if (!c || !c.rows || !c.rows.length) return "";
    var head = "<tr><th>工具</th>" + c.cols.map(function (col) {
      return "<th>" + esc(col) + "</th>";
    }).join("") + "</tr>";
    var body = c.rows.map(function (r) {
      return "<tr>" + r.map(function (cell, i) {
        return i === 0
          ? '<th scope="row">' + esc(cell) + "</th>"
          : "<td>" + levelCell(cell) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return '<div class="cmp-block">' +
      '<h4 class="cmp-title">' + icoTable + "快速比較</h4>" +
      '<div class="table-wrap"><table class="cmp"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div>" +
      (c.pick ? '<p class="cmp-pick"><span>怎麼選</span>' + esc(c.pick) + "</p>" : "") +
      "</div>";
  }

  if ($("toolsContainer")) {
    var idx = 0;
    $("toolsContainer").innerHTML = D.tools.map(function (g) {
      var cards = g.items.map(function (t) { return toolCard(idx++, t); }).join("");
      return '<div class="tool-group" data-group>' +
        '<div class="tool-group-head"><h3>' + esc(g.category) + "</h3>" +
        (g.desc ? "<p>" + esc(g.desc) + "</p>" : "") + "</div>" +
        '<div class="grid grid-tools">' + cards + "</div>" +
        compareHtml(g.compare) + "</div>";
    }).join("");
  }

  // ---- Tool detail modal ----
  var modal = $("toolModal");
  var modalBody = $("modalBody");
  var lastFocus = null;

  function modalHtml(t, idx) {
    var h = "";
    h += '<div class="modal-head"><h3 id="modalTitle">' + esc(t.name) + "</h3>";
    if (t.tagline) h += '<p class="modal-tagline">' + esc(t.tagline) + "</p>";
    h += tagsHtml(t.tags) + "</div>";
    if (t.intro) h += '<p class="modal-intro">' + esc(t.intro) + "</p>";

    if (t.facts && t.facts.length) {
      h += '<div class="facts">' + t.facts.map(function (f) {
        return '<div class="fact"><b>' + esc(f.k) + "</b><span>" +
          (f.k === "難度" ? levelCell(f.v) : esc(f.v)) + "</span></div>";
      }).join("") + "</div>";
    }
    if (t.useCases && t.useCases.length) {
      h += '<div class="modal-section"><h4>' + icoTarget + "它能幫你做什麼</h4><ul class=\"uc\">" +
        t.useCases.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
    }
    if ((t.pros && t.pros.length) || (t.cons && t.cons.length)) {
      h += '<div class="modal-section pc">';
      if (t.pros && t.pros.length) {
        h += '<div class="pc-col ok"><h5>優點</h5><ul>' +
          t.pros.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
      }
      if (t.cons && t.cons.length) {
        h += '<div class="pc-col warn"><h5>要注意</h5><ul>' +
          t.cons.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>";
      }
      h += "</div>";
    }

    if (t.connections) {
      var c = t.connections;
      var labels = { prev: "先會這個", next: "做完接", pair: "好搭檔" };
      var rows = ["prev", "next", "pair"].map(function (k) {
        if (!c[k] || !c[k].length) return "";
        return '<div class="conn-row"><span class="conn-lab">' + labels[k] + "</span>" +
          '<div class="conn-chips">' + c[k].map(toolChip).join("") + "</div></div>";
      }).join("");
      if (rows) {
        h += '<div class="modal-section"><h4>' + icoChain + "怎麼跟其他工具串接</h4>" +
          '<div class="conns">' + rows + "</div></div>";
      }
    }

    if (t.steps && t.steps.length) {
      h += '<div class="modal-section"><h4>' + icoSteps + "上手步驟</h4><ol class=\"steps\">";
      h += t.steps.map(function (s) {
        if (typeof s === "string") return "<li>" + esc(s) + "</li>";
        return '<li><b class="step-t">' + esc(s.t) + "</b>" +
          (s.d ? '<span class="step-d">' + esc(s.d) + "</span>" : "") + "</li>";
      }).join("");
      h += "</ol></div>";
    }
    if (t.example && t.example.code) {
      h += '<div class="modal-section"><h4>' + icoCode + "實際範例</h4>";
      if (t.example.caption) h += '<p class="code-caption">' + esc(t.example.caption) + "</p>";
      h += '<pre class="code"><code>' + esc(t.example.code) + "</code></pre></div>";
    }
    if (t.tips && t.tips.length) {
      h += '<div class="modal-section"><h4>' + icoTip + "小撇步</h4><ul class=\"tips\">";
      h += t.tips.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
      h += "</ul></div>";
    }
    var noteVal = loadNotes()[t.name] || "";
    h += '<div class="modal-section"><h4>' + icoNote + "我的筆記</h4>" +
      '<textarea class="note-area" data-note-i="' + idx + '" placeholder="寫點給自己的筆記，會自動儲存（只存在這台裝置）">' + esc(noteVal) + "</textarea></div>";

    var known = isKnown(t.name);
    h += '<div class="modal-foot">';
    if (t.url) h += '<a class="btn btn-primary" href="' + esc(t.url) + '" target="_blank" rel="noopener">前往官網' + arrow + "</a>";
    if (t.docs) h += '<a class="btn btn-ghost" href="' + esc(t.docs) + '" target="_blank" rel="noopener">官方文件' + extLink + "</a>";
    h += '<button type="button" class="btn btn-ghost known-btn' + (known ? " on" : "") + '" data-known-i="' + idx + '">' +
      icoCheck + (known ? "已學會" : "標記已學會") + "</button>";
    h += "</div>";
    return h;
  }

  function showModal(html) {
    if (!modal || !modalBody) return;
    lastFocus = document.activeElement;
    modalBody.innerHTML = html;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    var dialog = modal.querySelector(".modal-dialog");
    if (dialog) dialog.scrollTop = 0;
    var close = modal.querySelector(".modal-close");
    if (close) close.focus();
  }
  function openModal(i) {
    var t = allTools[i];
    if (!t) return;
    showModal(modalHtml(t, i));
  }

  // 技能詳細彈窗：為什麼重要、怎麼練成、常見誤解、推薦資源
  function skillModalHtml(s) {
    var h = '<div class="modal-head"><h3 id="modalTitle">' + esc(s.name) + "</h3>" +
      '<div class="card-top" style="margin:14px 0 0"><span class="meta-chip">' + esc(s.level) + "</span></div></div>";
    h += '<p class="modal-intro">' + esc(s.desc) + "</p>";
    if (s.why) h += '<p class="info-box"><span>為什麼重要</span>' + esc(s.why) + "</p>";
    if (s.pathSteps && s.pathSteps.length) {
      h += '<div class="modal-section"><h4>' + icoSteps + "怎麼練成它</h4><ol class=\"steps\">" +
        s.pathSteps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ol></div>";
    }
    if (s.trap) h += '<p class="info-box warn"><span>常見誤解</span>' + esc(s.trap) + "</p>";
    if (s.refs && s.refs.length) {
      h += '<div class="modal-foot">' + s.refs.map(function (r, i) {
        return '<a class="btn ' + (i === 0 ? "btn-primary" : "btn-ghost") + '" href="' + esc(r.url) +
          '" target="_blank" rel="noopener">' + esc(r.label) + extLink + "</a>";
      }).join("") + "</div>";
    }
    return h;
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if ($("toolsContainer")) {
    $("toolsContainer").addEventListener("click", function (e) {
      var card = e.target.closest("[data-tool]");
      if (card) openModal(parseInt(card.getAttribute("data-tool"), 10));
    });
  }
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });
  // 串接籤：頁面上（流程圖、學習路徑）或彈窗內點到都直接開該工具教學
  document.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-tool-link]");
    if (chip) openModal(parseInt(chip.getAttribute("data-tool-link"), 10));
  });

  // ---- Tool search ----
  var search = $("toolSearch");
  if (search) {
    search.addEventListener("input", function () {
      var q = this.value.trim().toLowerCase();
      var anyVisible = false;
      document.querySelectorAll("[data-group]").forEach(function (group) {
        var groupVisible = false;
        group.querySelectorAll(".tool-card").forEach(function (card) {
          var match = !q || card.getAttribute("data-search").indexOf(q) !== -1;
          card.style.display = match ? "" : "none";
          if (match) groupVisible = true;
        });
        group.style.display = groupVisible ? "" : "none";
        if (groupVisible) anyVisible = true;
      });
      var nr = $("toolsNoResult");
      if (nr) nr.hidden = anyVisible;
    });
  }

  // ---- Skills (點開看完整學習法) ----
  if ($("skillsContainer")) {
    $("skillsContainer").innerHTML = D.skills.map(function (s, i) {
      return '<button type="button" class="card skill-card" data-skill="' + i + '">' +
        '<div class="skill-head"><span class="skill-num">' + (i + 1) + "</span>" +
        "<h4>" + esc(s.name) + "</h4></div>" +
        '<div class="card-top" style="margin:0 0 8px"><span class="meta-chip">' + esc(s.level) + "</span></div>" +
        "<p>" + esc(s.desc) + "</p>" +
        (s.how ? '<p class="skill-how"><span>怎麼開始</span>' + esc(s.how) + "</p>" : "") +
        '<div class="card-foot"><span></span><span class="go">怎麼練成它' + arrow + "</span></div>" +
        "</button>";
    }).join("");
    $("skillsContainer").addEventListener("click", function (e) {
      var card = e.target.closest("[data-skill]");
      if (card) showModal(skillModalHtml(D.skills[parseInt(card.getAttribute("data-skill"), 10)]));
    });
  }
  if ($("skillsNote") && D.skillsNote) $("skillsNote").textContent = D.skillsNote;

  // ---- Resources ----
  function resLevel(v) {
    var chip = levelCell(v);
    return chip.indexOf("<span") === 0 ? chip : '<span class="lvl lvl-b">' + esc(v) + "</span>";
  }
  if ($("resourcesContainer")) {
    $("resourcesContainer").innerHTML = D.resources.map(function (r) {
      return '<a class="card" href="' + esc(r.url) + '" target="_blank" rel="noopener">' +
        '<div class="card-top"><div><h4>' + esc(r.name) + "</h4>" +
        '<div class="by">' + esc(r.by) + "</div></div>" +
        '<span class="cost-chip">' + esc(r.cost) + "</span></div>" +
        '<div class="res-meta">' + (r.level ? resLevel(r.level) : "") +
        (r.hours ? '<span class="hours">' + esc(r.hours) + "</span>" : "") + "</div>" +
        "<p>" + esc(r.desc) + "</p>" +
        (r.learn ? '<p class="res-learn"><span>你會學到</span>' + esc(r.learn) + "</p>" : "") +
        (r.tip ? '<p class="res-learn tip"><span>上手建議</span>' + esc(r.tip) + "</p>" : "") +
        '<div class="card-foot"><span></span><span class="go">前往課程' + arrow + "</span></div></a>";
    }).join("");
  }

  // ---- Big news (本月大新聞) ----
  if ($("bigNewsContainer")) {
    $("bigNewsContainer").innerHTML = D.bigNews.map(function (n) {
      return '<a class="card news-card" href="' + esc(n.url) + '" target="_blank" rel="noopener">' +
        '<div class="news-card-head"><span class="news-date">' + esc(n.date) + "</span>" +
        '<span class="news-source">' + esc(n.source) + "</span></div>" +
        "<h4>" + esc(n.title) + "</h4>" +
        "<p>" + esc(n.point) + "</p>" +
        (n.why ? '<p class="why-line"><span>跟你有關</span>' + esc(n.why) + "</p>" : "") +
        '<div class="card-foot"><span></span><span class="go">看報導' + arrow + "</span></div></a>";
    }).join("");
  }

  // ---- News timeline (Claude 與平台更新) ----
  if ($("newsContainer")) {
    $("newsContainer").innerHTML = D.news.map(function (n) {
      return '<div class="tl-item"><div class="tl-card">' +
        '<div class="tl-head"><span class="tl-date">' + esc(n.date) + "</span>" +
        (n.tag ? '<span class="tl-tag">' + esc(n.tag) + "</span>" : "") + "</div>" +
        "<h4>" + esc(n.title) + "</h4><p>" + esc(n.body) + "</p>" +
        (n.why ? '<p class="why-line"><span>跟你有關</span>' + esc(n.why) + "</p>" : "") +
        '<a class="go" href="' + esc(n.url) + '" target="_blank" rel="noopener">閱讀原文（' + esc(n.source) + "）" + arrow + "</a>" +
        "</div></div>";
    }).join("");
  }

  // ---- Follows (grouped by platform) ----
  function platformSlug(p) {
    return { "X": "x", "Threads": "threads", "中文站": "zh", "電子報": "news" }[p] || "other";
  }
  if ($("followsContainer")) {
    var order = ["X", "Threads", "中文站", "電子報"];
    var labels = { "X": "X（Twitter）", "Threads": "Threads", "中文站": "中文網站", "電子報": "電子報" };
    var groups = {};
    D.follows.forEach(function (f) {
      (groups[f.platform] = groups[f.platform] || []).push(f);
    });
    Object.keys(groups).forEach(function (p) { if (order.indexOf(p) === -1) order.push(p); });
    $("followsContainer").innerHTML = order.filter(function (p) { return groups[p]; }).map(function (p) {
      var cards = groups[p].map(function (f) {
        return '<a class="card follow-card" href="' + esc(f.url) + '" target="_blank" rel="noopener">' +
          '<div class="card-top"><div><h4>' + esc(f.name) + "</h4>" +
          '<div class="by">' + esc(f.handle) + "</div></div>" +
          '<span class="platform-badge platform-' + platformSlug(p) + '">' + esc(p) + "</span></div>" +
          "<p>" + esc(f.desc) + "</p>" +
          (f.start ? '<p class="start-line"><span>從這開始</span>' + esc(f.start) + "</p>" : "") +
          '<div class="card-foot"><span></span><span class="go">前往' + arrow + "</span></div></a>";
      }).join("");
      return '<div class="follow-group"><h3 class="follow-group-title">' + esc(labels[p] || p) + "</h3>" +
        '<div class="grid grid-authors">' + cards + "</div></div>";
    }).join("");
  }
  if ($("followsNote") && D.followsNote) $("followsNote").textContent = D.followsNote;

  // ---- Sources ----
  if ($("sourcesContainer")) {
    $("sourcesContainer").innerHTML = D.sources.map(function (s) {
      return "<li><a href=\"" + esc(s.url) + "\" target=\"_blank\" rel=\"noopener\">" +
        extLink + esc(s.label) + "</a></li>";
    }).join("");
  }

  // ---- 起點測驗（30 秒找出你的起點）----
  var QUIZ = [
    { q: "你寫過程式嗎？", key: "exp", opts: [
      { v: "none", t: "完全沒有", d: "一行都沒寫過也沒關係" },
      { v: "some", t: "碰過一點", d: "改過範例、上過一點課" },
      { v: "often", t: "蠻常寫的", d: "能自己完成小專案" },
    ] },
    { q: "你最想先做出什麼？", key: "goal", opts: [
      { v: "build", t: "一個能用的小工具", d: "網頁、小 App、給自己用的東西" },
      { v: "data", t: "會讀我資料的 AI", d: "讓 AI 回答我的筆記與文件" },
      { v: "auto", t: "自動化流程", d: "讓 AI 自己跑完多步驟工作" },
      { v: "visual", t: "圖像與影片", d: "做社群素材、視覺創作" },
    ] },
    { q: "每週大概能投入多少時間？", key: "time", opts: [
      { v: "low", t: "2 小時內", d: "通勤、睡前擠出來的時間" },
      { v: "mid", t: "2–5 小時", d: "週末固定一段時間" },
      { v: "high", t: "5 小時以上", d: "正在認真衝刺" },
    ] },
  ];
  var quizAnswers = {}, quizStep = 0;

  function computeProfile(a) {
    var stage = a.exp === "none" ? 0 : a.exp === "some" ? 1 : 2;
    var tools, focus;
    if (a.goal === "build") { tools = ["Bolt.new", "Cursor"]; focus = "做出第一個能用的小工具"; }
    else if (a.goal === "data") { tools = ["LlamaIndex", "Claude Code"]; focus = "讓 AI 讀你的資料（RAG）"; if (a.exp === "often") stage = 4; }
    else if (a.goal === "auto") { tools = ["CrewAI", "LangChain", "Claude Code"]; focus = "自動化多步驟流程"; if (a.exp === "often") stage = 5; }
    else { tools = ["Midjourney v7", "Google Veo 3.1", "Pika"]; focus = "視覺創作（獨立支線）"; }
    var pace = a.time === "low"
      ? "每週時間少：把每一步的建議時間乘以二，穩穩走比中斷重來快。"
      : a.time === "high"
        ? "時間充足：前三步可以併成兩週衝完，直接進到動手做。"
        : "每週 2–5 小時：照路徑上的建議時間走，剛剛好。";
    return { stage: stage, tools: tools, focus: focus, pace: pace };
  }

  function quizHtml() {
    var q = QUIZ[quizStep];
    return '<div class="modal-head"><h3 id="modalTitle">30 秒找出你的起點</h3></div>' +
      '<p class="modal-intro">' + esc(q.q) + "</p>" +
      '<div class="quiz-opts">' + q.opts.map(function (o) {
        return '<button type="button" class="quiz-opt" data-quiz-opt="' + esc(o.v) + '"><b>' + esc(o.t) + "</b><span>" + esc(o.d) + "</span></button>";
      }).join("") + "</div>" +
      '<div class="quiz-dots">' + QUIZ.map(function (_, i) {
        return '<i class="' + (i <= quizStep ? "on" : "") + '"></i>';
      }).join("") + "</div>";
  }
  function profileResultHtml(p) {
    var stepTitle = D.learningPath[p.stage] ? D.learningPath[p.stage].title : "";
    var h = '<div class="modal-head"><h3 id="modalTitle">你的學習起點</h3></div>' +
      '<p class="modal-intro">目標：' + esc(p.focus) + "。建議從 <b>第 " + (p.stage + 1) + " 步「" + esc(stepTitle) + "」</b> 開始。</p>" +
      '<p class="info-box"><span>節奏建議</span>' + esc(p.pace) + "</p>";
    if (p.stage < 2) h += '<p class="info-box warn"><span>提醒</span>前面的步驟是地基，照順序走反而最快。</p>';
    h += '<div class="modal-section"><h4>' + icoTarget + "先把這幾個工具學起來</h4>" +
      '<div class="conn-chips">' + p.tools.map(toolChip).join("") + "</div></div>" +
      '<div class="modal-foot">' +
      '<button type="button" class="btn btn-primary" data-goto-step="' + p.stage + '">帶我去第 ' + (p.stage + 1) + " 步</button>" +
      '<button type="button" class="btn btn-ghost" data-quiz-start>重新測一次</button></div>';
    return h;
  }
  function startQuiz() {
    quizAnswers = {}; quizStep = 0;
    showModal(quizHtml());
  }
  function quizAnswer(v) {
    quizAnswers[QUIZ[quizStep].key] = v;
    quizStep++;
    if (quizStep < QUIZ.length) {
      modalBody.innerHTML = quizHtml();
    } else {
      var p = computeProfile(quizAnswers);
      saveProfile(p);
      renderPath();
      modalBody.innerHTML = profileResultHtml(p);
    }
  }

  function scrollToStep(i) {
    var steps = document.querySelectorAll(".path-step");
    var el = steps[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("flash");
    setTimeout(function () { el.classList.remove("flash"); }, 1700);
  }

  // ---- 匯出／匯入／清除個人資料 ----
  function exportData() {
    var data = {
      site: "ai-learning-library",
      exportedAt: new Date().toISOString(),
      progress: loadProg(),
      known: loadKnown(),
      notes: loadNotes(),
      profile: loadProfile(),
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ai-learning-library-progress.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  }
  var importFile = $("importFile");
  if (importFile) {
    importFile.addEventListener("change", function () {
      var f = this.files && this.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var d = JSON.parse(reader.result);
          if (!d || (!Array.isArray(d.progress) && !Array.isArray(d.known))) throw new Error("bad");
          if (Array.isArray(d.progress)) localStorage.setItem(PROG_KEY, JSON.stringify(d.progress));
          if (Array.isArray(d.known)) localStorage.setItem(KNOWN_KEY, JSON.stringify(d.known));
          if (d.notes && typeof d.notes === "object") localStorage.setItem(NOTES_KEY, JSON.stringify(d.notes));
          if (d.profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(d.profile));
          window.location.reload();
        } catch (e) {
          window.alert("匯入失敗：檔案格式不對。請選擇之前用「匯出進度」存下的 JSON 檔。");
        }
      };
      reader.readAsText(f);
      this.value = "";
    });
  }

  // ---- 全站指令面板（⌘K）----
  var palette = $("palette");
  var paletteInput = $("paletteInput");
  var paletteResults = $("paletteResults");
  var palItems = [];
  var palActive = 0;

  function buildPalIndex() {
    var ix = [];
    allTools.forEach(function (t, i) {
      ix.push({ g: "工具", title: t.name, sub: t.tagline || "", hay: (t.name + " " + (t.tagline || "") + " " + (t.tags || []).join(" ") + " " + (t.intro || "")).toLowerCase(), act: { k: "tool", i: i } });
    });
    D.skills.forEach(function (s, i) {
      ix.push({ g: "技能", title: s.name, sub: s.level || "", hay: (s.name + " " + s.desc + " " + (s.why || "")).toLowerCase(), act: { k: "skill", i: i } });
    });
    D.learningPath.forEach(function (p, i) {
      ix.push({ g: "學習路徑", title: "第 " + (i + 1) + " 步：" + p.title, sub: p.week || "", hay: (p.title + " " + p.action).toLowerCase(), act: { k: "step", i: i } });
    });
    D.resources.forEach(function (r) {
      ix.push({ g: "課程", title: r.name, sub: r.by || "", hay: (r.name + " " + r.by + " " + r.desc + " " + (r.learn || "")).toLowerCase(), act: { k: "url", u: r.url } });
    });
    D.bigNews.concat(D.news).forEach(function (n) {
      ix.push({ g: "動態", title: n.title, sub: n.date || "", hay: (n.title + " " + (n.point || n.body || "")).toLowerCase(), act: { k: "url", u: n.url } });
    });
    D.follows.forEach(function (f) {
      ix.push({ g: "追蹤", title: f.name, sub: f.platform || "", hay: (f.name + " " + f.handle + " " + f.desc).toLowerCase(), act: { k: "url", u: f.url } });
    });
    [["學習路徑", "#path"], ["串接地圖", "#flow"], ["該學的工具", "#tools"], ["該掌握的技能", "#skills"], ["學習資源", "#resources"], ["最新動態", "#news"], ["值得追蹤", "#follows"]].forEach(function (s) {
      ix.push({ g: "前往區塊", title: s[0], sub: "跳到該區塊", hay: s[0].toLowerCase(), act: { k: "goto", sel: s[1] } });
    });
    return ix;
  }
  var palIndex = buildPalIndex();
  var PAL_ORDER = ["工具", "技能", "學習路徑", "課程", "動態", "追蹤", "前往區塊"];

  function renderPal(q) {
    q = (q || "").trim().toLowerCase();
    var matches;
    if (!q) {
      matches = palIndex.filter(function (x) { return x.g === "前往區塊"; });
    } else {
      matches = palIndex.filter(function (x) { return x.title.toLowerCase().indexOf(q) !== -1 || x.hay.indexOf(q) !== -1; });
      matches.sort(function (a, b) {
        var at = a.title.toLowerCase().indexOf(q) !== -1 ? 0 : 1;
        var bt = b.title.toLowerCase().indexOf(q) !== -1 ? 0 : 1;
        return at - bt;
      });
    }
    var groups = {};
    matches.forEach(function (m) { (groups[m.g] = groups[m.g] || []).push(m); });
    palItems = [];
    var h = "";
    PAL_ORDER.forEach(function (g) {
      if (!groups[g]) return;
      h += '<div class="pal-group">' + esc(g) + "</div>";
      groups[g].slice(0, 6).forEach(function (m) {
        var n = palItems.length;
        palItems.push(m);
        h += '<div class="pal-item' + (n === 0 ? " active" : "") + '" data-pal="' + n + '"><b>' + esc(m.title) + "</b><span>" + esc(m.sub) + "</span></div>";
      });
    });
    palActive = 0;
    paletteResults.innerHTML = h || '<div class="pal-empty">找不到「' + esc(q) + '」，換個關鍵字試試。</div>';
  }
  function setPalActive(n) {
    if (!palItems.length) return;
    palActive = (n + palItems.length) % palItems.length;
    var nodes = paletteResults.querySelectorAll(".pal-item");
    nodes.forEach(function (el) { el.classList.remove("active"); });
    var act = paletteResults.querySelector('[data-pal="' + palActive + '"]');
    if (act) { act.classList.add("active"); act.scrollIntoView({ block: "nearest" }); }
  }
  function execPal(n) {
    var it = palItems[n];
    if (!it) return;
    closePalette();
    var a = it.act;
    if (a.k === "tool") openModal(a.i);
    else if (a.k === "skill") showModal(skillModalHtml(D.skills[a.i]));
    else if (a.k === "step") scrollToStep(a.i);
    else if (a.k === "url") window.open(a.u, "_blank", "noopener");
    else if (a.k === "goto") { var el = document.querySelector(a.sel); if (el) el.scrollIntoView({ behavior: "smooth" }); }
  }
  function openPalette() {
    if (!palette) return;
    closeModal();
    palette.hidden = false;
    document.body.classList.add("modal-open");
    paletteInput.value = "";
    renderPal("");
    paletteInput.focus();
  }
  function closePalette() {
    if (!palette || palette.hidden) return;
    palette.hidden = true;
    document.body.classList.remove("modal-open");
  }
  if (palette) {
    paletteInput.addEventListener("input", function () { renderPal(this.value); });
    paletteInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setPalActive(palActive + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setPalActive(palActive - 1); }
      else if (e.key === "Enter") { e.preventDefault(); execPal(palActive); }
    });
    paletteResults.addEventListener("click", function (e) {
      var item = e.target.closest("[data-pal]");
      if (item) execPal(parseInt(item.getAttribute("data-pal"), 10));
    });
    palette.addEventListener("click", function (e) {
      if (e.target.classList.contains("palette-overlay")) closePalette();
    });
  }
  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault();
      if (palette && !palette.hidden) closePalette(); else openPalette();
      return;
    }
    if (e.key === "Escape" && palette && !palette.hidden) { closePalette(); return; }
    if (e.key === "/" && palette && palette.hidden && (!modal || modal.hidden)) {
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag !== "input" && tag !== "textarea") { e.preventDefault(); openPalette(); }
    }
  });
  var searchBtn = $("searchBtn");
  if (searchBtn) searchBtn.addEventListener("click", openPalette);

  // ---- 互動委派：已學會、筆記、測驗、儀表板按鈕 ----
  if (modalBody) {
    modalBody.addEventListener("click", function (e) {
      var kb = e.target.closest("[data-known-i]");
      if (kb) {
        var i = parseInt(kb.getAttribute("data-known-i"), 10);
        toggleKnown(allTools[i].name);
        var on = isKnown(allTools[i].name);
        kb.classList.toggle("on", on);
        kb.innerHTML = icoCheck + (on ? "已學會" : "標記已學會");
        patchCard(i);
        renderPath();
        return;
      }
      var qo = e.target.closest("[data-quiz-opt]");
      if (qo) quizAnswer(qo.getAttribute("data-quiz-opt"));
    });
    modalBody.addEventListener("input", function (e) {
      var ta = e.target.closest("[data-note-i]");
      if (ta) saveNote(allTools[parseInt(ta.getAttribute("data-note-i"), 10)].name, ta.value.trim());
    });
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-quiz-start]")) { startQuiz(); return; }
    var gs = e.target.closest("[data-goto-step]");
    if (gs) { closeModal(); scrollToStep(parseInt(gs.getAttribute("data-goto-step"), 10)); return; }
    if (e.target.closest("[data-export]")) { exportData(); return; }
    if (e.target.closest("[data-import-btn]")) { if (importFile) importFile.click(); return; }
    if (e.target.closest("[data-clear]")) {
      if (window.confirm("確定要清除所有進度、已學會標記、筆記與測驗結果嗎？此動作無法復原。")) {
        [PROG_KEY, KNOWN_KEY, NOTES_KEY, PROFILE_KEY].forEach(function (k) {
          try { localStorage.removeItem(k); } catch (err) {}
        });
        window.location.reload();
      }
    }
  });

  // ---- Theme toggle ----
  var toggle = $("themeToggle");
  var stored = null;
  try { stored = localStorage.getItem("ai-lib-theme"); } catch (e) {}
  if (stored === "dark" || (stored === null && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
      try { localStorage.setItem("ai-lib-theme", isDark ? "light" : "dark"); } catch (e) {}
    });
  }
})();
