#!/usr/bin/env node
/*
 * 新聞爬蟲：抓取數個 AI 官方／媒體的 RSS，整理成 data/news-feed.js（網站會載入它）。
 * 用法：node crawl-news.js  或  npm run crawl-news
 * 零依賴，需 Node 18+（用內建 fetch）。可用 cron 定期跑，例如每天一次。
 *
 * 來源可自行增減。分類是用標題關鍵字粗略判斷（模型發布／企業動態／工具更新），
 * 不保證 100% 準確——它是「幫你把最新標題撈進來」，深度解讀仍以點進原文為準。
 */
const fs = require("fs");
const path = require("path");

const FEEDS = [
  { name: "OpenAI", url: "https://openai.com/news/rss.xml" },
  { name: "Google AI", url: "https://blog.google/technology/ai/rss/" },
  { name: "Google DeepMind", url: "https://deepmind.google/blog/rss.xml" },
  { name: "Anthropic", url: "https://raw.githubusercontent.com/taobojlen/anthropic-rss-feed/main/anthropic_news_rss.xml" },
  { name: "The Verge AI", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" },
];
const KEEP_DAYS = 45; // 只保留近 N 天
const MAX_ITEMS = 24;

function decode(s) {
  return (s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(+n); })
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").trim();
}
function pick(block, name) {
  var m = block.match(new RegExp("<" + name + "[^>]*>([\\s\\S]*?)</" + name + ">", "i"));
  return m ? decode(m[1]) : "";
}
function linkOf(block) {
  var m = block.match(/<link[^>]*href="([^"]+)"/i); // Atom
  if (m) return m[1];
  return pick(block, "link"); // RSS
}
function categorize(title) {
  var t = title.toLowerCase();
  if (/(sue|lawsuit|court|antitrust|acqui|merger|partner|partnership|invest|funding|raise|billion|\$\d|emissions|steps down|resign|layoff|訴訟|收購|合併|合作|簽約|投資|裁員)/.test(t)) return "企業動態";
  if (/(gpt|claude|gemini|llama|opus|sonnet|模型|release|launch|introduc|unveil|new model|發布)/.test(t)) return "模型發布";
  return "工具更新";
}

async function fetchFeed(f) {
  try {
    var res = await fetch(f.url, { headers: { "user-agent": "Mozilla/5.0 (ai-learning-library news crawler)" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    var xml = await res.text();
    var blocks = xml.split(/<item[\s>]|<entry[\s>]/i).slice(1);
    return blocks.map(function (b) {
      var title = pick(b, "title");
      var dateRaw = pick(b, "pubDate") || pick(b, "published") || pick(b, "updated") || pick(b, "dc:date");
      var d = dateRaw ? new Date(dateRaw) : null;
      return {
        source: f.name,
        title: title,
        url: linkOf(b),
        date: d && !isNaN(d) ? d.toISOString().slice(0, 10) : "",
        cat: categorize(title),
      };
    }).filter(function (x) { return x.title && x.url; });
  } catch (e) {
    console.error("  跳過 " + f.name + "：" + e.message);
    return [];
  }
}

(async function () {
  console.log("開始抓取 " + FEEDS.length + " 個來源…");
  var all = [];
  for (var i = 0; i < FEEDS.length; i++) {
    var items = await fetchFeed(FEEDS[i]);
    console.log("  " + FEEDS[i].name + "：" + items.length + " 則");
    all = all.concat(items);
  }
  // 去重（依網址）
  var seen = {};
  all = all.filter(function (x) { if (seen[x.url]) return false; seen[x.url] = 1; return true; });
  // 只留近 N 天（沒日期的也留，排在後面）
  var cutoff = new Date(Date.now() - KEEP_DAYS * 864e5).toISOString().slice(0, 10);
  all = all.filter(function (x) { return !x.date || x.date >= cutoff; });
  all.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
  var top = all.slice(0, MAX_ITEMS);

  if (!top.length) {
    console.error("沒抓到任何項目（可能是網路不通或來源改版）。保留現有 data/news-feed.js 不覆蓋。");
    process.exit(1);
  }
  var today = new Date().toISOString().slice(0, 10);
  var out = "// 自動產生：由 crawl-news.js 於 " + today + " 抓取。手動改會在下次爬取被覆蓋。\n" +
    "(function () {\n  var D = window.SITE_DATA;\n  if (!D) return;\n  D.crawledNews = " +
    JSON.stringify(top, null, 2).replace(/\n/g, "\n  ") + ";\n  D.crawledNewsAt = " + JSON.stringify(today) + ";\n})();\n";
  fs.writeFileSync(path.join(__dirname, "data", "news-feed.js"), out);
  console.log("完成：寫入 data/news-feed.js，共 " + top.length + " 則（" + today + "）。");
})();
