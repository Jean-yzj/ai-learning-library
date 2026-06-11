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
    var bar =
      '<div class="path-progress">' +
      '<div class="path-progress-head"><b>我的進度</b><span>' + doneCount + " / " + total + " 步完成</span></div>" +
      '<div class="bar"><i style="width:' + Math.round((doneCount / total) * 100) + '%"></i></div>' +
      "</div>";
    $("pathContainer").innerHTML = bar + D.learningPath.map(function (p, i) {
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
        '<div class="flow-tools">' + f.tools.map(toolChip).join("") + "</div></div>";
    }).join("");
    if ($("flowNote") && D.flowNote) $("flowNote").textContent = D.flowNote;
  }

  // ---- Tools (grouped, click to open detail modal) ----
  function toolCard(idx, t) {
    var hay = (t.name + " " + (t.tagline || "") + " " + (t.intro || "") + " " + (t.tags || []).join(" ")).toLowerCase();
    return '<button class="card tool-card" type="button" data-tool="' + idx + '" ' +
      'data-search="' + esc(hay) + '">' +
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

  function modalHtml(t) {
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
    h += '<div class="modal-foot">';
    if (t.url) h += '<a class="btn btn-primary" href="' + esc(t.url) + '" target="_blank" rel="noopener">前往官網' + arrow + "</a>";
    if (t.docs) h += '<a class="btn btn-ghost" href="' + esc(t.docs) + '" target="_blank" rel="noopener">官方文件' + extLink + "</a>";
    h += "</div>";
    return h;
  }

  function openModal(i) {
    var t = allTools[i];
    if (!t || !modal || !modalBody) return;
    lastFocus = document.activeElement;
    modalBody.innerHTML = modalHtml(t);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    var dialog = modal.querySelector(".modal-dialog");
    if (dialog) dialog.scrollTop = 0;
    var close = modal.querySelector(".modal-close");
    if (close) close.focus();
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

  // ---- Skills (with how-to-start) ----
  if ($("skillsContainer")) {
    $("skillsContainer").innerHTML = D.skills.map(function (s, i) {
      return '<div class="card skill-card">' +
        '<div class="skill-head"><span class="skill-num">' + (i + 1) + "</span>" +
        "<h4>" + esc(s.name) + "</h4></div>" +
        '<div class="card-top" style="margin:0 0 8px"><span class="meta-chip">' + esc(s.level) + "</span></div>" +
        "<p>" + esc(s.desc) + "</p>" +
        (s.how ? '<p class="skill-how"><span>怎麼開始</span>' + esc(s.how) + "</p>" : "") +
        "</div>";
    }).join("");
  }
  if ($("skillsNote") && D.skillsNote) $("skillsNote").textContent = D.skillsNote;

  // ---- Resources ----
  if ($("resourcesContainer")) {
    $("resourcesContainer").innerHTML = D.resources.map(function (r) {
      return '<a class="card" href="' + esc(r.url) + '" target="_blank" rel="noopener">' +
        '<div class="card-top"><div><h4>' + esc(r.name) + "</h4>" +
        '<div class="by">' + esc(r.by) + "</div></div>" +
        '<span class="cost-chip">' + esc(r.cost) + "</span></div>" +
        "<p>" + esc(r.desc) + "</p>" +
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
