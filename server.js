// AI 學習庫 伺服器：靜態檔案 + 雲端同步 API。
// 靜態部分零依賴；雲端同步在有設定 DATABASE_URL 時才啟用（用到 pg）。
// 本機預覽不設 DATABASE_URL，所以完全不碰資料庫，行為跟純靜態站一樣。
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 4178;
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_CONNECTION_STRING || "";
// 也支援標準 libpq 環境變數（PGHOST 等）——node-postgres 會自動讀取，避免連線字串中密碼的編碼問題。
const HAS_DB = !!(DATABASE_URL || process.env.PGHOST);
const MAX_BODY = 300 * 1024; // 同步資料上限 ~300KB
const CODE_RE = /^[A-Za-z0-9_-]{16,64}$/;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

// ---- 雲端同步：資料庫（可選）----
let pool = null;
let dbReady = false;
let dbError = "";
if (HAS_DB) {
  try {
    const { Pool } = require("pg");
    const cfg = { max: 4, ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false };
    if (DATABASE_URL) cfg.connectionString = DATABASE_URL; // 否則 pg 自動讀 PGHOST/PGUSER/PGPASSWORD/PGDATABASE/PGPORT
    pool = new Pool(cfg);
    pool.on("error", (e) => { dbError = String(e && e.message || e); });
    pool
      .query(
        "CREATE TABLE IF NOT EXISTS sync_store (" +
        "code text PRIMARY KEY, payload jsonb NOT NULL, " +
        "updated_at timestamptz NOT NULL DEFAULT now())"
      )
      .then(() => { dbReady = true; console.log("[sync] database ready"); })
      .catch((e) => { dbError = String(e && e.message || e); console.error("[sync] init failed:", dbError); });
  } catch (e) {
    dbError = "pg module unavailable: " + String(e && e.message || e);
    console.error("[sync]", dbError);
  }
}

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}

function readBody(req, cb) {
  let size = 0;
  const chunks = [];
  let aborted = false;
  req.on("data", (c) => {
    if (aborted) return;
    size += c.length;
    if (size > MAX_BODY) { aborted = true; cb(new Error("payload too large")); req.destroy(); return; }
    chunks.push(c);
  });
  req.on("end", () => { if (!aborted) cb(null, Buffer.concat(chunks).toString("utf8")); });
  req.on("error", (e) => { if (!aborted) cb(e); });
}

function handleApi(req, res, url) {
  if (url.pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, sync: dbReady, error: dbReady ? "" : (dbError || (HAS_DB ? "connecting" : "no database configured")) });
  }

  if (url.pathname === "/api/sync") {
    if (!dbReady) return sendJson(res, 503, { ok: false, error: "cloud sync not available" });

    if (req.method === "GET") {
      const code = url.searchParams.get("code") || "";
      if (!CODE_RE.test(code)) return sendJson(res, 400, { ok: false, error: "invalid code" });
      pool.query("SELECT payload, updated_at FROM sync_store WHERE code = $1", [code])
        .then((r) => {
          if (!r.rows.length) return sendJson(res, 404, { ok: false, error: "not found" });
          sendJson(res, 200, { ok: true, payload: r.rows[0].payload, updatedAt: r.rows[0].updated_at });
        })
        .catch((e) => sendJson(res, 500, { ok: false, error: String(e && e.message || e) }));
      return;
    }

    if (req.method === "POST") {
      readBody(req, (err, raw) => {
        if (err) return sendJson(res, 413, { ok: false, error: "payload too large" });
        let data;
        try { data = JSON.parse(raw); } catch (e) { return sendJson(res, 400, { ok: false, error: "invalid json" }); }
        const code = data && data.code;
        if (!CODE_RE.test(code || "")) return sendJson(res, 400, { ok: false, error: "invalid code" });
        if (!data.payload || typeof data.payload !== "object") return sendJson(res, 400, { ok: false, error: "invalid payload" });
        pool.query(
          "INSERT INTO sync_store (code, payload, updated_at) VALUES ($1, $2::jsonb, now()) " +
          "ON CONFLICT (code) DO UPDATE SET payload = EXCLUDED.payload, updated_at = now() RETURNING updated_at",
          [code, JSON.stringify(data.payload)]
        )
          .then((r) => sendJson(res, 200, { ok: true, updatedAt: r.rows[0].updated_at }))
          .catch((e) => sendJson(res, 500, { ok: false, error: String(e && e.message || e) }));
      });
      return;
    }

    return sendJson(res, 405, { ok: false, error: "method not allowed" });
  }

  return sendJson(res, 404, { ok: false, error: "unknown endpoint" });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost");

  if (url.pathname.indexOf("/api/") === 0) {
    return handleApi(req, res, url);
  }

  let urlPath = decodeURIComponent(url.pathname);
  if (urlPath === "/") urlPath = "/index.html";

  // Resolve within ROOT to prevent path traversal.
  const filePath = path.join(ROOT, path.normalize(urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>404</h1><p>找不到頁面</p>");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`AI 學習庫 running at http://localhost:${PORT}`);
  console.log(`[sync] ${HAS_DB ? "database configured" : "no database (cloud sync disabled)"}`);
});
