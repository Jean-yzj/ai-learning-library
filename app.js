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

  // ---- Learning path (從零到第一個工具) ----
  if ($("pathContainer")) {
    $("pathContainer").innerHTML = D.learningPath.map(function (p, i) {
      return '<div class="path-step">' +
        '<div class="path-num">' + (i + 1) + "</div>" +
        '<div class="path-content">' +
        "<h4>" + esc(p.title) + "</h4>" +
        '<p class="path-action">' + esc(p.action) + "</p>" +
        '<p class="path-goal"><span>目標</span>' + esc(p.goal) + "</p>" +
        "</div></div>";
    }).join("");
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
  if ($("toolsContainer")) {
    var idx = 0;
    $("toolsContainer").innerHTML = D.tools.map(function (g) {
      var cards = g.items.map(function (t) { return toolCard(idx++, t); }).join("");
      return '<div class="tool-group" data-group>' +
        '<div class="tool-group-head"><h3>' + esc(g.category) + "</h3>" +
        (g.desc ? "<p>" + esc(g.desc) + "</p>" : "") + "</div>" +
        '<div class="grid grid-tools">' + cards + "</div></div>";
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

    if (t.steps && t.steps.length) {
      h += '<div class="modal-section"><h4>' + icoSteps + "上手步驟</h4><ol class=\"steps\">";
      h += t.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");
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
