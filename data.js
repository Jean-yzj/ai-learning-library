// AI 學習庫 — 內容資料
// 所有描述為繁體中文，名稱保留原文，並附上原始來源連結。
// 要新增內容，直接在對應陣列加入物件即可。

window.SITE_DATA = {
  updated: "2026-06-10",

  // 最新 AI 動態（依日期由新到舊）
  news: [
    {
      date: "2026-05-28",
      title: "Claude Opus 4.8 發布",
      tag: "Anthropic",
      body:
        "新一代旗艦模型。寫程式時放行錯誤的機率比前代低約 4 倍，會主動標示不確定處；新增「努力程度（Effort Control）」可調整思考深度與速度；Claude Code 推出 Dynamic Workflows，能調度數百個平行子代理完成跨數十萬行程式碼的大規模遷移；Fast mode 達 2.5 倍速、成本降為前代的三分之一。定價與 4.7 相同（每百萬 input token 5 美元、output 25 美元）。",
      url: "https://www.anthropic.com/news/claude-opus-4-8",
      source: "anthropic.com",
    },
    {
      date: "2026-06",
      title: "Claude Code 持續更新",
      tag: "Anthropic",
      body:
        "新增 security-guidance 外掛，能審查程式碼漏洞；擴充 plugins、skills、hooks、背景工作（background jobs）與瀏覽器選擇等功能。Anthropic 同時將 Claude Code 的速率上限加倍、提高 Opus 的 API 上限，讓開發者能更穩定地規模化使用。",
      url: "https://code.claude.com/docs/en/whats-new",
      source: "code.claude.com",
    },
    {
      date: "2026-05",
      title: "Claude Managed Agents 新能力",
      tag: "平台",
      body:
        "Anthropic 的代理平台新增 dreaming（離線自我演練）、multiagent orchestration（多代理協作）、outcomes 與 webhooks，讓企業更容易把 AI 代理接進既有系統與工作流程。",
      url: "https://releasebot.io/updates/anthropic",
      source: "releasebot.io",
    },
    {
      date: "2026-04-26",
      title: "OpenAI 將收掉 Sora 影片產品",
      tag: "OpenAI",
      body:
        "OpenAI 宣布將下線 Sora 的網頁與 App 影片體驗，Sora API 預計於 9/24 終止。創作者正轉向 Google Veo、Runway、Kling、Pika 等替代工具，影片生成市場版圖重新洗牌。",
      url: "https://www.eweek.com/news/sora-alternatives-ai-video-tools-2026/",
      source: "eweek.com",
    },
  ],

  // 你現在該學的工具（依分類）
  tools: [
    {
      category: "AI 程式助手與編輯器",
      desc: "把 AI 直接帶進你寫程式的流程裡。",
      items: [
        {
          name: "Claude Code",
          desc: "終端機優先的 AI 程式代理，能讀寫檔案、執行指令、自主完成多步驟任務，並支援外掛、skills 與 hooks。",
          tags: ["程式", "代理"],
          url: "https://code.claude.com/docs/en/whats-new",
        },
        {
          name: "GitHub Copilot",
          desc: "最普及的 AI 程式助手，2026 年加入 Agent Mode 可代為跨檔案修改；採用量計費，每月 10 美元起。",
          tags: ["程式", "補全"],
          url: "https://github.com/features/copilot",
        },
        {
          name: "Cursor",
          desc: "以 VS Code 為基礎的 AI 編輯器，提供情境感知的補全、重構與程式解釋，是目前最受歡迎的 AI 編輯器之一。",
          tags: ["編輯器"],
          url: "https://cursor.com",
        },
        {
          name: "Windsurf",
          desc: "Cursor 的主要競爭者，「Cascade」代理模式能跨專案多步驟執行、讀寫檔案並依輸出結果反覆迭代。",
          tags: ["編輯器", "代理"],
          url: "https://windsurf.com",
        },
      ],
    },
    {
      category: "AI 應用開發框架",
      desc: "用來打造自己的 AI 應用與代理。",
      items: [
        {
          name: "LangChain",
          desc: "生態系最大、教學最多的預設選擇，幾乎適用所有 LLM 應用，初學打底首選。",
          tags: ["框架"],
          url: "https://www.langchain.com",
        },
        {
          name: "LlamaIndex",
          desc: "專注 RAG（檢索強化生成）。當搜尋與檢索是核心功能時，用它最省時。",
          tags: ["RAG"],
          url: "https://www.llamaindex.ai",
        },
        {
          name: "CrewAI",
          desc: "適合多代理工作流，把任務拆解成多個專職代理協作，結構優雅。",
          tags: ["多代理"],
          url: "https://www.crewai.com",
        },
      ],
    },
    {
      category: "AI 應用建構工具（不用從零寫起）",
      desc: "用自然語言描述就能生出可用的應用。",
      items: [
        {
          name: "Bolt.new",
          desc: "主打快速原型與即時部署，描述需求就生出可運行的網頁應用；免費到每月 50 美元。",
          tags: ["原型", "部署"],
          url: "https://bolt.new",
        },
        {
          name: "Replit",
          desc: "從瀏覽器 IDE 進化為全端 AI 開發環境，Replit Agent 可依描述組出前端、後端、資料庫、認證與部署。",
          tags: ["全端", "代理"],
          url: "https://replit.com",
        },
      ],
    },
    {
      category: "通用 AI 助手",
      desc: "日常工作與學習的萬用夥伴。",
      items: [
        {
          name: "Claude",
          desc: "Anthropic 的 AI 助手，擅長寫作、程式與長文本推理，可搭配 Cowork、Claude Code 一起使用。",
          tags: ["助手"],
          url: "https://claude.ai",
        },
        {
          name: "ChatGPT",
          desc: "結合深度推理、長期記憶與自主任務執行的通用助手，生態與外掛最廣。",
          tags: ["助手"],
          url: "https://chatgpt.com",
        },
      ],
    },
    {
      category: "圖像與影片生成",
      desc: "創作者必備的視覺生成工具。",
      items: [
        {
          name: "Google Veo 3.1",
          desc: "綜合表現最強的影片生成模型，可同步生成音訊，輸出真 4K（3840×2160）、最高 60fps。",
          tags: ["影片"],
          url: "https://deepmind.google/models/veo/",
        },
        {
          name: "Runway Gen-4.5",
          desc: "高擬真、可精準控制風格，是創作者市場的領導者之一。",
          tags: ["影片"],
          url: "https://runwayml.com",
        },
        {
          name: "Midjourney v7",
          desc: "編輯與藝術品質的標竿，特別適合時尚、建築與概念美術。",
          tags: ["圖像"],
          url: "https://www.midjourney.com",
        },
        {
          name: "Pika",
          desc: "上手容易的 AI 影片生成工具，適合社群短影片與快速創作。",
          tags: ["影片"],
          url: "https://pika.art",
        },
      ],
    },
  ],

  // 該掌握的技能
  skills: [
    {
      name: "AI 素養（AI Literacy）",
      level: "所有人",
      desc: "2026 年最廣泛被需要的能力：理解 AI 能做什麼、限制在哪，以及如何安全、有效地把它用在工作上。",
    },
    {
      name: "提示工程（Prompt Engineering）",
      level: "入門到進階",
      desc: "用清楚的指令、範例與限制引導 AI 產出更好結果。相關職缺今年成長 135.8%，本質是「系統設計」而非玩弄字句。",
    },
    {
      name: "RAG 檢索強化生成",
      level: "進階",
      desc: "把 AI 接上你的文件、資料庫與知識庫，降低幻覺、提升準確度，是打造內部知識助手的關鍵技能（80% 職缺可遠端）。",
    },
    {
      name: "AI 代理與多代理協作",
      level: "進階",
      desc: "Gartner 預估 2026 年底 40% 企業應用將內建任務型 AI 代理（2025 年不到 5%）。多代理協調的薪資溢價最高。",
    },
    {
      name: "向量資料庫（Vector Databases）",
      level: "進階",
      desc: "AI 代理與 RAG 的記憶與檢索基礎，是把知識「存進」AI 的核心元件。",
    },
    {
      name: "資料工程與 MLOps",
      level: "工程",
      desc: "把模型穩定地部署、監控與規模化的工程能力，讓 AI 從 demo 走向正式產品。",
    },
  ],
  skillsNote:
    "根據 Lightcast，AI 技能平均帶來約 28% 的薪資溢價；PwC 的估計更高達 56%。",

  // 學習資源
  resources: [
    {
      name: "Elements of AI",
      by: "赫爾辛基大學",
      desc: "20–30 小時、免寫程式的概念入門，建立平台中立的 AI 基礎觀念。最適合完全新手。",
      cost: "免費",
      url: "https://www.elementsofai.com",
    },
    {
      name: "AI for Everyone",
      by: "Andrew Ng / DeepLearning.AI",
      desc: "吳恩達的經典課程，不需寫程式，聚焦在 AI 的商業應用與術語，建立全局觀。",
      cost: "可免費旁聽",
      url: "https://www.coursera.org/learn/ai-for-everyone",
    },
    {
      name: "Google 機器學習速成課程",
      by: "Google",
      desc: "用 TensorFlow 實作的機器學習入門，理論與動手練習兼具。",
      cost: "免費",
      url: "https://developers.google.com/machine-learning/crash-course",
    },
    {
      name: "CS50's Introduction to AI",
      by: "Harvard",
      desc: "想要扎實技術底子的人最佳選擇，涵蓋超越 LLM 的 AI 基礎原理。",
      cost: "免費",
      url: "https://cs50.harvard.edu/ai/",
    },
    {
      name: "Introduction to AI for Work",
      by: "DataCamp",
      desc: "互動式、以 AI 為核心的課程，從「AI 是什麼」到實際工作應用，全程動手練習。",
      cost: "免費起",
      url: "https://www.datacamp.com/blog/best-free-ai-courses",
    },
    {
      name: "AI Skills Navigator",
      by: "Microsoft",
      desc: "依角色與目標推薦學習起點，貫穿 Copilot 基礎到 Azure AI Foundry 的完整訓練目錄。",
      cost: "免費",
      url: "https://aiskillsnavigator.microsoft.com",
    },
    {
      name: "Coursera AI 課程與證書",
      by: "Coursera",
      desc: "彙整各大學與機構的 AI 課程與專業證書，可依程度與主題篩選。",
      cost: "旁聽免費 / 證書付費",
      url: "https://www.coursera.org/courses?query=artificial+intelligence",
    },
  ],

  // 值得追蹤的作者與電子報
  authors: [
    {
      name: "The Rundown AI",
      by: "Rowan Cheung",
      freq: "每日",
      desc: "全球最大的獨立 AI 媒體之一，逾 175 萬讀者，適合掌握每日大事與態勢。",
      url: "https://www.therundown.ai",
    },
    {
      name: "TLDR AI",
      freq: "每日",
      desc: "工程師愛讀的每日精選技術新聞，125 萬+ 訂閱，內容精簡。",
      url: "https://tldr.tech/ai",
    },
    {
      name: "Superhuman AI",
      freq: "每日",
      desc: "每日 AI 工具與實用應用，150 萬+ 訂閱，偏重「怎麼用」。",
      url: "https://www.superhuman.ai",
    },
    {
      name: "The Batch",
      by: "Andrew Ng / DeepLearning.AI",
      freq: "每週",
      desc: "吳恩達團隊出品的每週深度評論，平衡技術與產業視角。",
      url: "https://www.deeplearning.ai/the-batch/",
    },
    {
      name: "Ahead of AI",
      by: "Sebastian Raschka",
      freq: "每週",
      desc: "最大的深度技術型電子報（18.9 萬+ 訂閱），適合想理解模型底層的人。",
      url: "https://magazine.sebastianraschka.com",
    },
    {
      name: "Interconnects",
      by: "Nathan Lambert",
      freq: "每週",
      desc: "對模型訓練、開源生態與政策的深度分析，觀點犀利。",
      url: "https://www.interconnects.ai",
    },
    {
      name: "Import AI",
      by: "Jack Clark",
      freq: "每週",
      desc: "Anthropic 共同創辦人 Jack Clark 撰寫，聚焦前沿研究與 AI 政策。",
      url: "https://importai.substack.com",
    },
    {
      name: "Ben's Bites",
      freq: "每週",
      desc: "每週實用 AI 新聞與工具整理，適合非技術背景讀者。",
      url: "https://bensbites.com",
    },
  ],

  // 各區塊原始資料來源（皆為搜尋取得的真實連結）
  sources: [
    { label: "27 AI Tools for Developers in 2026 — PE Collective", url: "https://pecollective.com/blog/ai-tools-for-developers-2026/" },
    { label: "Best AI Tools for Developers to Learn in 2026 — daily.dev", url: "https://daily.dev/blog/best-ai-tools-learn-developers/" },
    { label: "Top 15 AI Coding Assistant Tools — Qodo", url: "https://www.qodo.ai/blog/best-ai-coding-assistant-tools/" },
    { label: "The Best Free AI Courses to Take in 2026 — DataCamp", url: "https://www.datacamp.com/blog/best-free-ai-courses" },
    { label: "Best Free AI Courses & Learning Resources 2026 — Nucamp", url: "https://www.nucamp.co/blog/best-free-ai-courses-and-learning-resources-in-2026-curated-list" },
    { label: "Introducing Claude Opus 4.8 — Anthropic", url: "https://www.anthropic.com/news/claude-opus-4-8" },
    { label: "Claude Code — What's new", url: "https://code.claude.com/docs/en/whats-new" },
    { label: "Most In-Demand AI Skills in 2026 — South", url: "https://www.hireinsouth.com/post/most-in-demand-ai-skills" },
    { label: "AI Skills 2026: The Employer's Wishlist — TripleTen", url: "https://tripleten.com/blog/posts/ai-skills" },
    { label: "Best AI Image & Video Models 2026 — BuildFastWithAI", url: "https://www.buildfastwithai.com/blogs/collection/ai-image-video" },
    { label: "Sora Alternatives — eWeek", url: "https://www.eweek.com/news/sora-alternatives-ai-video-tools-2026/" },
    { label: "Top 10 AI Newsletters to Follow in 2026 — DataNorth", url: "https://datanorth.ai/blog/top-10-ai-newsletters-to-follow-in-2026" },
    { label: "Top 12 AI Newsletters to Follow in 2026 — GenAI.Works", url: "https://genai.works/insights/top-12-ai-newsletters-to-follow-in-2026" },
  ],
};
