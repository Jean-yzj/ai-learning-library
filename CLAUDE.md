# ai-learning-library

網站「AI 學習庫」。Node 伺服器（server.js）提供 index.html / styles.css / app.js / data.js，並有雲端同步 API。

## 開發
- 啟動：`npm start`（執行 `node server.js`，預設埠 4178，部署時讀 `process.env.PORT`）。
- 內容資料集中在 `data.js`（`window.SITE_DATA`），要新增工具／技能／名詞／動態／作者直接改這個檔案。
- 本機預覽不設資料庫環境變數，雲端同步會自動降級（API 回 503），其餘功能照常；不需要 pg 也能跑靜態部分。

## 雲端同步（cloud sync）
- 後端：`server.js` 的 `/api/sync`（GET 取資料、POST 上傳）與 `/api/health`；用 PostgreSQL 的單一資料表 `sync_store(code, payload jsonb, updated_at)`。
- 連線：node-postgres。優先讀 `DATABASE_URL`，否則讀標準 `PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE`。沒設定就停用同步。
- 同步碼模式：前端產生 32 字隨機碼當 bearer token，無帳號／密碼／email；資料僅含學習進度與筆記。
- 前端狀態存 localStorage（`ai-lib-sync`）；改動資料時 debounce 自動上傳。

## Zeabur Deployment
- Project ID: 6a2851a59e7b055c3f5bb4df
- Web Service ID: 6a2851b9641e820a7358893d（Git 部署，repo Jean-yzj/ai-learning-library，branch main，推 main 自動重部署）
- PostgreSQL Service ID: 6a2accd016481d6693b3ee35（marketplace 模板 B20CX0，內部位址 postgresql.zeabur.internal:5432，db 名 zeabur）
- Web 服務環境變數 `DATABASE_URL=${POSTGRES_CONNECTION_STRING}`（引用 Postgres 服務的連線字串，密碼不落地）。
- Region/Server: server-69c8c404726b92873462484f（Tencent Cloud）
