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

  function tagsHtml(tags) {
    if (!tags || !tags.length) return "";
    return '<div class="tags">' + tags.map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("") + "</div>";
  }

  // ---- Hero meta + stats ----
  var toolCount = D.tools.reduce(function (n, g) { return n + g.items.length; }, 0);
  if ($("updatedPill")) $("updatedPill").textContent = "最後更新：" + D.updated;
  if ($("footerUpdate")) $("footerUpdate").textContent = "最後更新：" + D.updated + "　·　共收錄 " + toolCount + " 項工具、" + D.skills.length + " 項技能、" + D.resources.length + " 個學習資源";

  var stats = [
    { n: toolCount, l: "精選工具" },
    { n: D.skills.length, l: "關鍵技能" },
    { n: D.resources.length, l: "學習資源" },
    { n: D.authors.length, l: "優質來源" },
  ];
  if ($("heroStats")) {
    $("heroStats").innerHTML = stats.map(function (s) {
      return '<div class="stat"><b>' + s.n + "</b><span>" + esc(s.l) + "</span></div>";
    }).join("");
  }

  // ---- Tools (grouped) ----
  function toolCard(t) {
    return '<a class="card tool-card" href="' + esc(t.url) + '" target="_blank" rel="noopener" ' +
      'data-search="' + esc((t.name + " " + t.desc + " " + (t.tags || []).join(" ")).toLowerCase()) + '">' +
      '<div class="card-top"><div><h4>' + esc(t.name) + "</h4></div></div>" +
      "<p>" + esc(t.desc) + "</p>" +
      '<div class="card-foot">' + tagsHtml(t.tags) +
      '<span class="go">前往' + arrow + "</span></div></a>";
  }
  if ($("toolsContainer")) {
    $("toolsContainer").innerHTML = D.tools.map(function (g) {
      return '<div class="tool-group" data-group>' +
        '<div class="tool-group-head"><h3>' + esc(g.category) + "</h3>" +
        (g.desc ? "<p>" + esc(g.desc) + "</p>" : "") + "</div>" +
        '<div class="grid grid-tools">' + g.items.map(toolCard).join("") + "</div></div>";
    }).join("");
  }

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

  // ---- Skills ----
  if ($("skillsContainer")) {
    $("skillsContainer").innerHTML = D.skills.map(function (s, i) {
      return '<div class="card skill-card">' +
        '<div class="skill-head"><span class="skill-num">' + (i + 1) + "</span>" +
        "<h4>" + esc(s.name) + "</h4></div>" +
        '<div class="card-top" style="margin:0 0 8px"><span class="meta-chip">' + esc(s.level) + "</span></div>" +
        "<p>" + esc(s.desc) + "</p></div>";
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

  // ---- News timeline ----
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

  // ---- Authors ----
  if ($("authorsContainer")) {
    $("authorsContainer").innerHTML = D.authors.map(function (a) {
      return '<a class="card" href="' + esc(a.url) + '" target="_blank" rel="noopener">' +
        '<div class="card-top"><div><h4>' + esc(a.name) + "</h4>" +
        (a.by ? '<div class="by">' + esc(a.by) + "</div>" : "") + "</div>" +
        '<span class="meta-chip">' + esc(a.freq) + "</span></div>" +
        "<p>" + esc(a.desc) + "</p>" +
        '<div class="card-foot"><span></span><span class="go">前往訂閱' + arrow + "</span></div></a>";
    }).join("");
  }

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
