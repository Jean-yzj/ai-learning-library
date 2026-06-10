# ai-learning-library

靜態網站「AI 學習庫」。零依賴 Node 伺服器（server.js）提供 index.html / styles.css / app.js / data.js。

## 開發
- 啟動：`npm start`（執行 `node server.js`，預設埠 4178，部署時讀 `process.env.PORT`）。
- 內容資料集中在 `data.js`（`window.SITE_DATA`），要新增工具／技能／動態／作者直接改這個檔案。

## Zeabur Deployment
- Project ID: 6a2851a59e7b055c3f5bb4df
- Service ID: 6a2851b9641e820a7358893d
- 部署方式：Git（GitHub repo Jean-yzj/ai-learning-library，branch main）。推送到 main 會自動重新部署。
- Region/Server: server-69c8c404726b92873462484f（Singapore, Tencent Cloud）
