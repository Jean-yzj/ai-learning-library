// AI 學習庫 — 內容資料
// 描述為繁體中文，名稱保留原文，皆附原始來源連結。
// 要更新內容，直接改這個檔案即可（改完 push 到 main 會自動重新部署）。
// 工具的 steps 支援兩種格式：純字串，或 { t: "步驟標題", d: "詳細說明" }。

window.SITE_DATA = {
  updated: "2026-06-10",

  // 工具串接地圖：從想法到上線，每一站接什麼工具
  flow: [
    { stage: "想清楚", desc: "跟 AI 對話，把需求講到一次就懂。", output: "一段講得清楚的需求描述", tools: ["Claude", "ChatGPT"] },
    { stage: "先做出來", desc: "一句話生出第一版，拿到公開網址。", output: "一個可分享的公開網址", tools: ["Bolt.new", "Replit"] },
    { stage: "改得動它", desc: "進編輯器看懂程式、加功能、修問題。", output: "你能自己加功能的專案", tools: ["Cursor", "Claude Code", "GitHub Copilot"] },
    { stage: "接上資料", desc: "讓它讀你的筆記與文件（RAG）。", output: "會回答你資料的問答工具", tools: ["LlamaIndex"] },
    { stage: "自動化", desc: "多步驟流程交給代理自己跑。", output: "按一下就跑完的自動流程", tools: ["LangChain", "CrewAI"] },
    { stage: "上線給人用", desc: "推上 GitHub，Zeabur 自動部署。", output: "別人真的能用的線上服務", tools: ["GitHub", "Zeabur"] },
  ],
  flowNote:
    "點工具名稱可直接打開教學。視覺創作（Midjourney、Veo、Runway、Pika）是獨立支線，做素材時隨時插進來用。",

  // 從零到第一個工具：給「完全不會」的人的學習路徑
  learningPath: [
    {
      title: "先動嘴，不動手",
      week: "第 1 週",
      tools: ["Claude", "ChatGPT"],
      action:
        "到 claude.ai 或 chatgpt.com 註冊帳號，從今天起遇到任何問題都先丟給它：看不懂的名詞請它「用白話解釋給完全不懂的人聽」、要做的事請它幫你列步驟、寫不出來的訊息請它代筆。每天至少問五個問題，持續一到兩週。",
      goal: "習慣跟 AI 對話，學會把「我想要什麼」講清楚——這是後面所有事的基礎。",
      done: "你能把一個需求一次講清楚，AI 不用來回追問五次就給出你要的東西。",
      pitfall: "AI 答得太籠統，多半是你問得太大——把問題切小、補上背景再問一次。",
    },
    {
      title: "用講的，做出第一個東西",
      week: "第 1–2 週",
      tools: ["Bolt.new"],
      action:
        "打開 bolt.new（瀏覽器就能用，免安裝），輸入「做一個待辦清單網頁，可以新增、勾選完成、刪除，資料存在瀏覽器裡」，看它幾分鐘內生出一個能操作的網頁，再按 Deploy 拿到公開網址。整個過程你不用寫任何一行程式。",
      goal: "親手體驗一次「從想法到上線」，建立『我也做得出來』的信心。",
      done: "你有一個可以傳給朋友、對方點開就能用的公開網址。",
      pitfall: "生成壞掉就請它「解釋現在的錯誤並修好」；連續失敗三次就開新對話、換個說法重來。",
    },
    {
      title: "進到編輯器",
      week: "第 2–4 週",
      tools: ["Cursor", "Claude Code"],
      action:
        "安裝 Cursor（或照下面的教學裝 Claude Code），打開上一步的專案，先請 AI「解釋這個專案的檔案結構」，再請它加一個小功能、改一個顏色。每次改完都實際打開來看結果。",
      goal: "開始看得懂、也改得動程式，不再只是黑盒子。",
      done: "你能自己加一個小功能，並大致說出它改了哪些檔案、為什麼。",
      pitfall: "看不懂程式就先請 AI「幫每個檔案加中文註解」，再請它用一句話說明每個檔案的角色。",
    },
    {
      title: "學會把話問好",
      week: "持續練習",
      tools: ["Claude", "ChatGPT"],
      action:
        "之後每次對 AI 提需求，都套用「角色＋目標＋限制＋範例」四件套：你是誰／它扮演誰、要做出什麼、有哪些限制（技術、風格、長度）、附一個你喜歡的例子。把效果好的提示存進筆記，重複使用並持續修。",
      goal: "同一個工具，產出品質翻倍——這是最划算的一項技能。",
      done: "你有一份至少 5 條、會重複拿出來用的提示清單。",
      pitfall: "效果差先檢查「範例」給了沒——一個好例子勝過十行形容詞。",
    },
    {
      title: "讓 AI 用你的資料",
      week: "第 1–2 個月",
      tools: ["LlamaIndex"],
      action:
        "照下面 LlamaIndex 的步驟，把你自己的筆記或幾份 PDF 丟進 data 資料夾，做一個「只根據你的資料回答」的問答工具，然後問它幾個只有你的文件才有答案的問題，驗證它真的在讀你的資料（這就是 RAG）。",
      goal: "做出別人沒有、只屬於你的 AI 工具。",
      done: "你的工具能正確回答一個「只有你的文件裡才有答案」的問題。",
      pitfall: "答非所問通常是資料太雜——先拿掉無關檔案、縮小範圍，再逐步加回來。",
    },
    {
      title: "組裝更大的東西",
      week: "第 2–3 個月",
      tools: ["CrewAI", "LangChain"],
      action:
        "用 CrewAI 把「研究員＋寫手」兩個角色串起來，自動產出一篇短報告；或用 LangChain 幫上一步的 RAG 工具加上記憶與工具呼叫。從此你做的不是單次問答，而是會自己跑流程的代理（agent）。",
      goal: "從玩具走向真正有用、能幫你做事的產品。",
      done: "你有一個按一次就自己跑完多個步驟、產出結果的小代理。",
      pitfall: "代理失控就加停損：步數上限、預算上限、關鍵步驟人工確認——先求穩，再求全自動。",
    },
  ],

  // 你現在該學的工具（含完整上手指南）
  tools: [
    {
      category: "AI 程式助手與編輯器",
      desc: "把 AI 直接帶進你寫程式的流程裡。",
      compare: {
        cols: ["價格", "難度", "最強的點", "選它如果"],
        rows: [
          ["Claude Code", "訂閱或 API 計費", "中等", "全自動做完整個專案", "想下完指令就讓它自己跑到好"],
          ["GitHub Copilot", "有免費方案", "入門", "邊打字邊補全", "已會一點程式，想立刻加速"],
          ["Cursor", "有免費方案", "中等", "AI 原生編輯器、生態最大", "想找一套日常主力編輯器"],
          ["Windsurf", "有免費方案", "中等", "代理自動化流程", "想丟目標給 AI 整包做完"],
        ],
        pick: "新手第一套選 Cursor；想全自動選 Claude Code；已習慣 VS Code 就先裝 Copilot 試水溫。",
      },
      items: [
        {
          name: "Claude Code",
          tagline: "會自己讀檔、改檔、跑指令的終端機 AI 工程師。",
          tags: ["程式", "代理", "入門～進階"],
          intro:
            "在終端機裡運作的 AI 工程師。你用中文描述要做什麼，它會自己規劃、讀寫檔案、執行指令、修 bug。最適合想「真的把東西做出來並部署」的人。",
          facts: [
            { k: "價格", v: "Claude Pro／Max 訂閱或 API 計費（有試用）" },
            { k: "平台", v: "終端機（Mac／Windows／Linux）" },
            { k: "適合", v: "想把整個專案交給 AI 從頭做到完的人" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "從零生出完整專案，一路做到可以部署",
            "跨多個檔案重構、修 bug、加功能",
            "自動執行測試與指令，自己驗證結果",
            "幫你看懂並整理既有的程式碼",
          ],
          pros: [
            "端到端全自動：讀檔、改檔、跑指令一手包",
            "長任務與大專案表現最強",
            "全程用中文溝通沒問題",
          ],
          cons: [
            "在終端機操作，介面偏工程師向",
            "長期使用需要訂閱或 API 金鑰",
          ],
          steps: [
            {
              t: "安裝 Node.js",
              d: "打開瀏覽器到 nodejs.org，網站會自動偵測你的系統，點綠色的「LTS」按鈕下載，然後像裝一般軟體一樣一路按「下一步」裝完。",
            },
            {
              t: "打開終端機",
              d: "Mac 按 Cmd＋空白鍵搜尋「終端機（Terminal）」打開；Windows 在開始選單搜尋「PowerShell」。看到一個可以打字的視窗就對了——之後的指令都貼在這裡。",
            },
            {
              t: "安裝 Claude Code",
              d: "把右邊範例的第一行貼進終端機按 Enter，等它跑完（約一分鐘）。結束時沒有紅色錯誤訊息就是裝好了；可再輸入 claude --version 確認有跳出版本號。",
            },
            {
              t: "建立專案資料夾並啟動",
              d: "依序輸入：mkdir my-first-tool（建資料夾）→ cd my-first-tool（進入）→ claude（啟動）。第一次會開啟網頁要你登入 Anthropic 帳號，照畫面按「允許」即可。",
            },
            {
              t: "用中文下第一個指令",
              d: "直接打：「幫我做一個記帳網頁，可以新增和刪除支出，資料存在瀏覽器裡」。它會先列出計畫問你同不同意，看完回「可以」，它就開始自己建檔案、寫程式。",
            },
            {
              t: "驗收成果、繼續迭代",
              d: "完成後請它「在瀏覽器打開給我看」。哪裡不滿意就直接講（「標題改大一點」「加上總金額」），它會接著改。你的第一個工具就這樣誕生了。",
            },
          ],
          example: {
            caption: "安裝並在專案中啟動",
            code: "npm install -g @anthropic-ai/claude-code\ncd my-project\nclaude",
          },
          tips: [
            "先把需求講清楚（要什麼功能、給誰用）比丟一堆技術細節更有效。",
            "用 /init 讓它先讀懂整個專案；改完記得請它「跑起來看看有沒有錯」。",
          ],
          connections: {
            prev: ["Claude"],
            next: ["LlamaIndex", "CrewAI"],
            pair: ["Cursor", "GitHub＋Zeabur 部署"],
          },
          url: "https://code.claude.com/docs/en/whats-new",
          docs: "https://code.claude.com/docs",
        },
        {
          name: "GitHub Copilot",
          tagline: "長在編輯器裡的自動補全與 AI 助手。",
          tags: ["程式", "補全", "入門"],
          intro:
            "寫程式時的即時補全與 AI 助手，直接內建在 VS Code 等編輯器裡。你打一半它就接著補完，2026 年的 Agent Mode 還能跨檔案幫你修改。",
          facts: [
            { k: "價格", v: "有免費方案；Pro 月費約 $10，學生免費" },
            { k: "平台", v: "VS Code、JetBrains 等編輯器內建" },
            { k: "適合", v: "已經在寫程式、想提升速度的人" },
            { k: "難度", v: "入門" },
          ],
          useCases: [
            "打字時即時補全整段程式",
            "聊天視窗問程式問題、解釋錯誤",
            "Agent Mode 跨檔案完成修改",
            "自動寫註解與測試",
          ],
          pros: [
            "門檻最低，裝了就有感",
            "與 GitHub／VS Code 生態整合最深",
            "學生與開源維護者免費",
          ],
          cons: [
            "主力是輔助「正在寫程式的你」，不會幫你從零規劃整個產品",
            "建議品質取決於你當下的程式上下文",
          ],
          steps: [
            {
              t: "安裝 VS Code",
              d: "到 code.visualstudio.com 點「Download」，下載後安裝打開。這是免費、全世界最多人用的程式編輯器。",
            },
            {
              t: "安裝 Copilot 擴充功能",
              d: "點左側欄四個方塊的圖示（Extensions），搜尋「GitHub Copilot」按「Install」。裝好後右下角會跳出提示請你登入。",
            },
            {
              t: "登入 GitHub 帳號",
              d: "還沒有帳號先到 github.com 免費註冊。回到 VS Code 點「Sign in」，瀏覽器會開啟授權頁，按「Authorize」完成連結。",
            },
            {
              t: "體驗自動補全",
              d: "新增檔案存成 app.js，輸入註解「// 寫一個把陣列加總的函式」按 Enter，下一行會出現灰色的建議程式碼，按 Tab 鍵接受、Esc 拒絕。",
            },
            {
              t: "打開 Copilot Chat",
              d: "按 Ctrl/Cmd＋I（或點上方聊天圖示）開啟對話，用中文問「這段程式在做什麼？」，或選取程式碼後請它「加上錯誤處理」。",
            },
          ],
          example: {
            caption: "在 Copilot Chat 裡下指令",
            code: "// 在 Copilot Chat 輸入：\n幫我把這個函式改成支援多筆輸入，並加上錯誤處理",
          },
          tips: [
            "學生與開源維護者通常可以免費使用，記得申請。",
            "先點選相關檔案再發問，回答會更準確。",
          ],
          connections: {
            prev: ["ChatGPT"],
            next: ["Claude Code"],
            pair: ["Cursor"],
          },
          url: "https://github.com/features/copilot",
          docs: "https://docs.github.com/copilot",
        },
        {
          name: "Cursor",
          tagline: "內建 AI、能讀懂整個專案的 VS Code。",
          tags: ["編輯器", "入門～進階"],
          intro:
            "一套「內建 AI 的 VS Code」。最大特色是能理解你整個專案，用一句話就重構、解釋或新增功能，是目前最多人用的 AI 編輯器。",
          facts: [
            { k: "價格", v: "免費 Hobby 方案；Pro 月費約 $20" },
            { k: "平台", v: "獨立桌面 App（VS Code 系）" },
            { k: "適合", v: "想要一套 AI 原生編輯器當日常主力的人" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "選取程式碼，一句話改寫或重構",
            "用 @檔名 帶上下文發問",
            "Agent 模式做完一整個功能",
            "快速讀懂陌生專案",
          ],
          pros: [
            "上手快、功能全面，新手也友善",
            "社群教學與資源最多",
            "從 VS Code 無痛轉移（設定可直接帶過去）",
          ],
          cons: [
            "重度使用需付費方案",
            "大專案要學會用 @ 與規則檔控制上下文",
          ],
          steps: [
            {
              t: "下載安裝 Cursor",
              d: "到 cursor.com 點「Download」，安裝後打開。第一次會問要不要沿用 VS Code 的設定與擴充功能，按「Yes」最省事；介面操作跟 VS Code 幾乎一樣。",
            },
            {
              t: "打開（或建立）專案資料夾",
              d: "點「Open Folder」選你的專案。完全新手可以先在桌面建一個空資料夾 my-app 再打開它，從零開始也行。",
            },
            {
              t: "先用聊天搞懂現況",
              d: "按 Cmd/Ctrl＋L 打開右側聊天，問「這個專案在做什麼？」或「我想做一個待辦清單網頁，幫我規劃檔案結構」。先看懂再動手。",
            },
            {
              t: "用 Cmd/Ctrl＋K 就地修改",
              d: "選取一段程式碼後按 Cmd/Ctrl＋K，輸入「改寫得更好讀，加上中文註解」。它會顯示修改前後的差異對照，按「Accept」採用、「Reject」放棄。",
            },
            {
              t: "讓 Agent 做完整功能",
              d: "把聊天面板切到 Agent 模式，輸入「做出完整的待辦清單：新增、勾選、刪除、本地儲存」。它會自己建立與修改多個檔案，每一步都先給你看再套用。",
            },
          ],
          example: {
            caption: "選一段程式碼後按 Cmd/Ctrl + K",
            code: "把這段改寫得更好讀，並加上中文註解",
          },
          tips: [
            "用 @檔名 把相關檔案帶進對話，AI 會更懂上下文。",
            "不確定時先請它「只解釋、先不要動程式」。",
          ],
          connections: {
            prev: ["Bolt.new"],
            next: ["Claude Code", "LlamaIndex"],
            pair: ["GitHub Copilot"],
          },
          url: "https://cursor.com",
          docs: "https://docs.cursor.com",
        },
        {
          name: "Windsurf",
          tagline: "會自己動手的代理式 AI 編輯器。",
          tags: ["編輯器", "代理", "進階"],
          intro:
            "另一套 AI 編輯器，主打 Cascade 代理：你給一個目標，它會跨檔案規劃、執行、跑指令、看結果再修，像一個會自己動手的工程師。",
          facts: [
            { k: "價格", v: "有免費方案；Pro 月費約 $15" },
            { k: "平台", v: "獨立桌面 App（VS Code 系）" },
            { k: "適合", v: "想丟一個目標讓 AI 整包做完的人" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "Cascade 代理自動完成整個功能",
            "跨檔案規劃、執行、自我驗證",
            "終端機指令自動執行（經你批准）",
          ],
          pros: [
            "代理流程順、自動化程度高",
            "介面乾淨、干擾少",
          ],
          cons: [
            "外掛與社群資源比 Cursor 少一些",
          ],
          steps: [
            {
              t: "下載安裝 Windsurf",
              d: "到 windsurf.com 下載對應系統的安裝檔，裝好打開。介面同樣是 VS Code 系，會用 VS Code 就會用它。",
            },
            {
              t: "打開專案、開啟 Cascade",
              d: "用「Open Folder」打開專案資料夾，點側欄（或右上角）的 Cascade 圖示展開代理面板。",
            },
            {
              t: "用一句話下目標",
              d: "在 Cascade 輸入完整目標，例如「幫這個網站加上深色模式切換，使用者偏好存在瀏覽器」。它會自己拆解步驟、依序改檔案。",
            },
            {
              t: "批准指令、驗收結果",
              d: "過程中它要執行終端機指令時會先停下來問你，看懂再按允許。跑完後實際打開網站確認效果，不滿意就接著說哪裡要改，它會記得前後文。",
            },
          ],
          example: {
            caption: "在 Cascade 下一個目標",
            code: "幫整個專案加上深色模式，並把使用者的偏好存在瀏覽器裡",
          },
          tips: [
            "適合「整包功能」一次做完的任務；零碎小修改用一般補全更快。",
          ],
          connections: {
            prev: ["Bolt.new"],
            next: ["LlamaIndex"],
            pair: ["Cursor"],
          },
          url: "https://windsurf.com",
          docs: "https://docs.windsurf.com",
        },
      ],
    },
    {
      category: "AI 應用開發框架",
      desc: "用程式打造自己的 AI 應用與代理。",
      compare: {
        cols: ["價格", "難度", "最強的點", "選它如果"],
        rows: [
          ["LangChain", "開源免費", "進階", "生態與整合最多", "要做的東西會越長越大"],
          ["LlamaIndex", "開源免費", "中等", "RAG 資料問答最順", "想先讓 AI 讀懂你的資料"],
          ["CrewAI", "開源免費", "進階", "多角色分工直覺", "想自動化一條多步驟流程"],
        ],
        pick: "先用 LlamaIndex 做出一個 RAG 問答，有感覺之後再視需求往 LangChain 或 CrewAI 擴。",
      },
      items: [
        {
          name: "LangChain",
          tagline: "串起 LLM 應用的萬用積木，生態最大。",
          tags: ["框架", "進階"],
          intro:
            "用程式串起 LLM 應用的框架。要做聊天機器人、把 AI 接上工具或資料時，它提供現成的積木，教學與社群最多，是學「自己寫 AI 應用」很好的起點。",
          facts: [
            { k: "價格", v: "開源免費（呼叫模型的 API 費用另計）" },
            { k: "平台", v: "Python／JavaScript 程式庫" },
            { k: "適合", v: "想自己寫 AI 應用、把基礎打穩的人" },
            { k: "難度", v: "進階" },
          ],
          useCases: [
            "接上各家模型 API 做聊天機器人",
            "幫 AI 加上記憶與工具呼叫",
            "串接 RAG 檢索流程",
            "之後往 LangGraph 做更複雜的代理",
          ],
          pros: [
            "生態最大、教學與範例最多",
            "幾乎想得到的整合都有現成的",
          ],
          cons: [
            "抽象層較多，除錯時有學習成本",
            "版本迭代快，舊教學可能過時",
          ],
          steps: [
            {
              t: "安裝 Python",
              d: "到 python.org/downloads 下載 3.10 以上版本安裝；Windows 安裝時記得勾選「Add Python to PATH」。裝好後在終端機輸入 python3 --version，有跳出版本號就成功。",
            },
            {
              t: "安裝 LangChain 套件",
              d: "終端機執行：pip install -U langchain langchain-anthropic（有些電腦要打 pip3）。跑完最後沒有紅字即成功。",
            },
            {
              t: "申請 API 金鑰",
              d: "到 console.anthropic.com 註冊，左側選「API Keys」按「Create Key」，複製那串 sk- 開頭的金鑰。它只會完整顯示一次，先貼到安全的地方存好。",
            },
            {
              t: "設定環境變數",
              d: "Mac／Linux 在終端機執行 export ANTHROPIC_API_KEY=\"你的金鑰\"；Windows PowerShell 用 $env:ANTHROPIC_API_KEY=\"你的金鑰\"。這一步是讓程式有權限呼叫模型。",
            },
            {
              t: "跑出第一個回應",
              d: "把右邊範例存成 main.py（用任何編輯器都行），在同一個終端機執行 python3 main.py。看到模型回出一句話，你的第一支 AI 程式就完成了。",
            },
          ],
          example: {
            caption: "最小可跑的範例（Python）",
            code:
              'from langchain_anthropic import ChatAnthropic\n\nllm = ChatAnthropic(model="claude-opus-4-8")\nprint(llm.invoke("用一句話解釋什麼是 RAG").content)',
          },
          tips: [
            "先跑通「一問一答」，再慢慢加上記憶、工具與檢索。",
            "想做更進階的代理流程，可往官方的 LangGraph 延伸。",
          ],
          connections: {
            prev: ["LlamaIndex"],
            next: ["CrewAI"],
            pair: ["Claude Code"],
          },
          url: "https://www.langchain.com",
          docs: "https://python.langchain.com",
        },
        {
          name: "LlamaIndex",
          tagline: "讓 AI 讀懂你自己的資料（RAG 首選）。",
          tags: ["RAG", "進階"],
          intro:
            "專門做「讓 AI 讀你的資料」（RAG）的框架。把 PDF、筆記、網頁丟進去，它幫你切塊、建索引，讓 AI 根據你的資料回答，而不是亂掰。",
          facts: [
            { k: "價格", v: "開源免費（模型 API 費用另計）" },
            { k: "平台", v: "Python／TypeScript 程式庫" },
            { k: "適合", v: "第一個目標是「讓 AI 讀我的資料」的人" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "把 PDF、筆記變成可問答的知識庫",
            "接 Notion、網頁等各種資料來源",
            "建索引、查詢，回答時附出處",
          ],
          pros: [
            "做 RAG 這條路最直接，幾行就能跑",
            "文件清楚、預設值合理",
          ],
          cons: [
            "需求超出「資料問答」時，要搭配其他框架",
          ],
          steps: [
            {
              t: "安裝套件",
              d: "先照 LangChain 的第一步裝好 Python，然後在終端機執行：pip install llama-index llama-index-llms-anthropic。",
            },
            {
              t: "準備你的資料",
              d: "在專案資料夾裡建一個 data 資料夾，把要讓 AI 讀的檔案丟進去（PDF、txt、md 都可以）。先放一兩份小檔案測試就好。",
            },
            {
              t: "設定 API 金鑰",
              d: "跟 LangChain 一樣，到 console.anthropic.com 申請金鑰，並設成環境變數 ANTHROPIC_API_KEY。",
            },
            {
              t: "建索引並提問",
              d: "把右邊範例存成 ask.py 執行。第一次跑會把文件切塊、建立索引（稍等一下），接著你就能用中文問文件內容。問一個「只有你的檔案才有答案」的問題，驗證它真的在讀你的資料。",
            },
          ],
          example: {
            caption: "讀資料夾並提問（Python）",
            code:
              'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\ndocs = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(docs)\nprint(index.as_query_engine().query("這份文件的重點是什麼？"))',
          },
          tips: [
            "文件越乾淨、切塊越合理，答案越準。",
            "先用少量檔案測試，再慢慢擴大資料量。",
          ],
          connections: {
            prev: ["Claude Code"],
            next: ["LangChain", "CrewAI"],
            pair: ["向量資料庫（Chroma、pgvector）"],
          },
          url: "https://www.llamaindex.ai",
          docs: "https://docs.llamaindex.ai",
        },
        {
          name: "CrewAI",
          tagline: "讓多個 AI 角色分工合作的框架。",
          tags: ["多代理", "進階"],
          intro:
            "讓多個 AI「分工合作」的框架。你定義幾個角色（例如研究員、寫手、審稿），它們會像一個小團隊一樣依序完成任務，適合自動化較複雜的流程。",
          facts: [
            { k: "價格", v: "開源免費（模型 API 費用另計）" },
            { k: "平台", v: "Python 程式庫" },
            { k: "適合", v: "想自動化多步驟流程的人" },
            { k: "難度", v: "進階" },
          ],
          useCases: [
            "多角色協作（研究 → 寫作 → 審稿）",
            "自動產出報告或內容產線",
            "把重複的多步驟工作交給 AI 小團隊",
          ],
          pros: [
            "「角色＋任務」的概念直覺好懂",
            "起步快，幾十行就能跑一個小團隊",
          ],
          cons: [
            "流程一複雜，品質與 API 成本要花心思控制",
          ],
          steps: [
            {
              t: "安裝 CrewAI",
              d: "裝好 Python（3.10 以上）後，在終端機執行：pip install crewai。",
            },
            {
              t: "設定模型金鑰",
              d: "CrewAI 支援多家模型；用 Claude 的話一樣把 ANTHROPIC_API_KEY 設成環境變數，並在程式裡指定模型。",
            },
            {
              t: "定義角色與任務",
              d: "在 Python 檔裡建立 Agent（角色名稱、目標、背景）與 Task（要完成什麼、由哪個 Agent 負責）。角色寫得越具體——例如「資深科技記者，擅長把艱深主題寫得好懂」——表現越好。",
            },
            {
              t: "組隊執行",
              d: "用 Crew(agents=[...], tasks=[...]).kickoff() 啟動。終端機會即時印出每個角色的思考與產出，看它們像小團隊一樣接力完成工作。",
            },
          ],
          example: {
            caption: "概念：定義角色與任務（Python）",
            code:
              'from crewai import Agent, Task, Crew\n\nresearcher = Agent(role="研究員", goal="找出主題重點")\ntask = Task(description="研究 2026 AI 趨勢", agent=researcher)\nCrew(agents=[researcher], tasks=[task]).kickoff()',
          },
          tips: [
            "角色與目標寫得越具體，協作品質越好。",
            "先用兩個角色跑通流程，再慢慢加人。",
          ],
          connections: {
            prev: ["LangChain"],
            next: ["部署成每天自動跑的服務"],
            pair: ["Claude Code"],
          },
          url: "https://www.crewai.com",
          docs: "https://docs.crewai.com",
        },
      ],
    },
    {
      category: "AI 應用建構工具（不用從零寫起）",
      desc: "用自然語言描述就能生出可用的應用，最適合新手起步。",
      compare: {
        cols: ["價格", "難度", "最強的點", "選它如果"],
        rows: [
          ["Bolt.new", "免費額度", "入門", "最快看到成品", "想今天就做出第一個網頁"],
          ["Replit", "免費方案", "中等", "全端一條龍", "想做有資料庫的完整 App"],
        ],
        pick: "完全新手先玩 Bolt.new 建立信心，要做「真的產品」再搬到 Replit。",
      },
      items: [
        {
          name: "Bolt.new",
          tagline: "瀏覽器裡用一句話生出網頁，還能直接上線。",
          tags: ["原型", "部署", "入門"],
          intro:
            "在瀏覽器裡用一句話生出可運行的網頁 App，還能直接部署上線。完全不用先安裝任何東西，最適合「我想馬上看到成品」的新手。",
          facts: [
            { k: "價格", v: "有免費額度；訂閱解鎖更多用量" },
            { k: "平台", v: "瀏覽器（免安裝）" },
            { k: "適合", v: "第一次做網頁、想馬上看到成品的人" },
            { k: "難度", v: "入門" },
          ],
          useCases: [
            "一句話生成可操作的網頁 App",
            "即時預覽、邊聊邊改",
            "做活動頁、小工具、原型 demo",
            "一鍵部署拿到公開網址",
          ],
          pros: [
            "零安裝，幾分鐘就有成品",
            "部署一鍵完成，最有成就感",
          ],
          cons: [
            "複雜後端與資料庫需求會吃力",
            "免費額度消耗得快",
          ],
          steps: [
            {
              t: "打開網站",
              d: "用瀏覽器打開 bolt.new，點右上角用 Google 或 GitHub 帳號登入。不用安裝任何東西。",
            },
            {
              t: "描述你要的網站",
              d: "在輸入框用中文寫清楚要什麼，例如右邊那句。重點是講清楚「功能＋資料存哪裡」，越具體越好。",
            },
            {
              t: "看它即時生成",
              d: "左邊會看到它一個檔案一個檔案地寫程式，右邊是即時預覽。等一兩分鐘完成後，直接在預覽裡點點看、操作看看。",
            },
            {
              t: "用對話修改",
              d: "想改哪裡直接說：「把按鈕改成圓角」「加上分類功能」。一次提一個需求最穩定；出錯就叫它「解釋現在的錯誤並修好」。",
            },
            {
              t: "一鍵部署上線",
              d: "滿意後按右上角「Deploy」，它會給你一個公開網址。把連結傳給朋友，他們就能直接用你做的工具。",
            },
          ],
          example: {
            caption: "貼進輸入框的第一句話",
            code: "做一個待辦清單網頁，可以新增、勾選完成、刪除，資料存在瀏覽器裡",
          },
          tips: [
            "一次改一個小地方，比一次要求很多更穩定。",
            "卡住時請它「解釋現在的錯誤並修好」。",
          ],
          connections: {
            prev: ["Claude"],
            next: ["Cursor"],
            pair: ["Replit"],
          },
          url: "https://bolt.new",
        },
        {
          name: "Replit",
          tagline: "免安裝的雲端開發環境，Agent 幫你組全端 App。",
          tags: ["全端", "代理", "入門～進階"],
          intro:
            "雲端的寫程式環境，免安裝、開瀏覽器就能寫。它的 Replit Agent 可以照你的描述把前端、後端、資料庫、部署一次組好，適合想做完整一點的 App。",
          facts: [
            { k: "價格", v: "有免費方案；部署多需 Core 訂閱" },
            { k: "平台", v: "瀏覽器（雲端開發環境）" },
            { k: "適合", v: "想做完整 App、想邊做邊學的人" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "Agent 生成含資料庫的全端 App",
            "雲端寫程式，換台電腦接著做",
            "點開生成的程式碼，邊做邊學",
          ],
          pros: [
            "前端、後端、資料庫、部署一條龍",
            "所有程式碼都看得到、改得動",
          ],
          cons: [
            "部署功能多需付費",
            "自由度高，相對也複雜一點",
          ],
          steps: [
            {
              t: "註冊帳號",
              d: "到 replit.com 用 Google 帳號註冊登入，免費方案就能開始。",
            },
            {
              t: "開啟 Replit Agent",
              d: "登入後首頁就有 Agent 的輸入框（或按「Create」選 Agent）。",
            },
            {
              t: "描述你的 App",
              d: "用中文完整描述，例如「做一個簡單的部落格，可以發文章和留言」。Agent 會先列出計畫與功能清單給你確認，看過再按同意。",
            },
            {
              t: "看它建置並測試",
              d: "它會自己建檔案、裝套件、把服務跑起來。完成後右邊出現預覽視窗，直接操作測試；有問題就在對話裡描述，它會修。",
            },
            {
              t: "部署上線",
              d: "點「Deploy」取得公開網址（部署功能通常需要付費方案）。不部署的話，在預覽視窗裡使用也完全沒問題。",
            },
          ],
          example: {
            caption: "對 Agent 說的第一句話",
            code: "幫我做一個簡單的部落格，可以發文章和留言，並部署上線",
          },
          tips: [
            "適合邊做邊學——點開它生成的檔案，看它是怎麼寫的。",
            "先做小一點的功能跑通，再慢慢擴充。",
          ],
          connections: {
            prev: ["Bolt.new"],
            next: ["Cursor"],
            pair: ["Claude"],
          },
          url: "https://replit.com",
          docs: "https://docs.replit.com",
        },
      ],
    },
    {
      category: "通用 AI 助手",
      desc: "日常工作與學習的萬用夥伴，也是新手的第一站。",
      compare: {
        cols: ["價格", "難度", "最強的點", "選它如果"],
        rows: [
          ["Claude", "有免費方案", "入門", "長文與寫作品質", "常讀長文件、寫東西、寫程式"],
          ["ChatGPT", "有免費方案", "入門", "生態與功能最全", "要語音、深入研究等周邊功能"],
        ],
        pick: "兩個都開免費帳號——寫作與程式找 Claude，查資料與語音用 ChatGPT。",
      },
      items: [
        {
          name: "Claude",
          tagline: "擅長寫作、讀長文件與寫程式的 AI 助手。",
          tags: ["助手", "入門"],
          intro:
            "Anthropic 的 AI 助手，擅長寫作、閱讀長文件、寫與解釋程式。可在網頁、桌面 App，或搭配 Claude Code / Cowork 使用，是日常思考與動手的好夥伴。",
          facts: [
            { k: "價格", v: "有免費方案；Pro 月費約 $20" },
            { k: "平台", v: "網頁／桌面／手機 App" },
            { k: "適合", v: "常寫作、讀長文件、寫程式的人" },
            { k: "難度", v: "入門" },
          ],
          useCases: [
            "讀長 PDF、合約、論文並整理重點",
            "寫作、潤稿、翻譯",
            "解釋與撰寫程式",
            "當「每次只教一步」的家教",
          ],
          pros: [
            "長文理解與寫作品質出色",
            "與 Claude Code 同生態，從聊天到實作一條線",
          ],
          cons: [
            "外掛與周邊生態比 ChatGPT 小一點",
          ],
          steps: [
            {
              t: "註冊登入",
              d: "到 claude.ai 用 Google 帳號或 Email 註冊，免費方案就能開始用。",
            },
            {
              t: "上傳檔案一起讀",
              d: "對話框旁的迴紋針可以上傳 PDF、圖片、文件。丟給它之後說「幫我整理重點」「用白話解釋第三段」，它會根據檔案內容回答。",
            },
            {
              t: "把它當一步一步的家教",
              d: "新手最好用的問法見右邊範例：要求它「每次只給一個動作」，你做完回報，它再給下一步——完全不會被資訊量淹沒。",
            },
            {
              t: "進階搭配 Claude Code",
              d: "想真的動手做專案時，用 claude.ai 討論想法與規格，再到 Claude Code（見上面的教學）實作。一個出主意、一個動手做。",
            },
          ],
          example: {
            caption: "新手最好用的開場白",
            code: "我完全不會寫程式，想做一個個人網站。請一步一步帶我，從第一步開始，每次只給我一個動作。",
          },
          tips: [
            "把「你的程度」和「想要的結果」講清楚，它會自動調整講法。",
            "要它「每次只給一步」很適合新手，不會被資訊量淹沒。",
          ],
          connections: {
            next: ["Bolt.new", "Claude Code"],
            pair: ["ChatGPT"],
          },
          url: "https://claude.ai",
          docs: "https://support.claude.com",
        },
        {
          name: "ChatGPT",
          tagline: "最廣為人知的通用 AI 助手，生態最完整。",
          tags: ["助手", "入門"],
          intro:
            "最廣為人知的通用 AI 助手，能對話、查資料、看圖、寫程式，外掛與生態最完整。新手用來問問題、學新東西很順手。",
          facts: [
            { k: "價格", v: "有免費方案；Plus 月費約 $20" },
            { k: "平台", v: "網頁／桌面／手機 App" },
            { k: "適合", v: "日常萬用、查資料、語音學習" },
            { k: "難度", v: "入門" },
          ],
          useCases: [
            "問答學習、白話解釋名詞",
            "語音對話練習與討論",
            "深入研究模式彙整資料",
            "看圖解題、生成圖片",
          ],
          pros: [
            "功能與生態最完整",
            "語音體驗成熟，通勤也能學",
          ],
          cons: [
            "回答有時偏籠統，要多追問",
          ],
          steps: [
            {
              t: "註冊登入",
              d: "到 chatgpt.com 註冊，免費方案即可開始。",
            },
            {
              t: "用中文發問",
              d: "直接打你的問題。附上背景（你是誰、要做什麼、卡在哪一步）會得到準確很多的答案。",
            },
            {
              t: "上傳檔案與圖片",
              d: "點輸入框的「+」上傳檔案或照片。例如把錯誤訊息截圖丟給它，問「這是什麼問題？一步一步教我修」。",
            },
            {
              t: "善用語音與深入研究",
              d: "手機 App 可以直接用語音對話，散步時也能學東西；遇到要查很多資料的題目，開「深入研究」模式讓它幫你彙整來源。",
            },
          ],
          example: {
            caption: "把它當家教",
            code: "請當我的 AI 家教，用最白話的方式解釋「API 是什麼」，並舉一個生活化的例子。",
          },
          tips: [
            "追問「可以再簡單一點嗎？」或「給我一個例子」能快速校正答案深度。",
          ],
          connections: {
            next: ["Bolt.new"],
            pair: ["Claude"],
          },
          url: "https://chatgpt.com",
          docs: "https://help.openai.com",
        },
      ],
    },
    {
      category: "圖像與影片生成",
      desc: "創作者必備的視覺生成工具。",
      compare: {
        cols: ["價格", "難度", "最強的點", "選它如果"],
        rows: [
          ["Google Veo 3.1", "訂閱", "中等", "品質與聲音最強", "要做認真的影片作品"],
          ["Runway", "免費額度", "中等", "風格控制與後製", "想要藝術感與精準控制"],
          ["Midjourney v7", "訂閱", "中等", "靜態圖美感標竿", "要的是圖，不是影片"],
          ["Pika", "免費額度", "入門", "上手最快", "想做社群短片、玩特效"],
        ],
        pick: "要圖選 Midjourney；認真做影片選 Veo 或 Runway；想先玩玩看用 Pika。",
      },
      items: [
        {
          name: "Google Veo 3.1",
          tagline: "目前最強的影片生成模型，能生帶聲音的 4K 影片。",
          tags: ["影片", "入門"],
          intro:
            "Google 目前最強的影片生成模型，能依文字或圖片生成帶聲音的影片，畫質達真 4K。適合做短片、廣告與動態素材。",
          facts: [
            { k: "價格", v: "需 Google AI 訂閱（有少量試用額度）" },
            { k: "平台", v: "Gemini App／Flow（瀏覽器）" },
            { k: "適合", v: "要高品質、帶聲音影片的人" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "文字或圖片生成帶音效與對白的影片",
            "做廣告、短片、動態素材",
            "4K 高畫質輸出",
          ],
          pros: [
            "畫質與物理真實感目前最強",
            "原生支援聲音，不用另外配",
          ],
          cons: [
            "額度偏貴、單次生成秒數有限",
          ],
          steps: [
            {
              t: "打開 Gemini 或 Flow",
              d: "用 Google 帳號登入 gemini.google.com（選影片生成），或 Google 的影片創作平台 Flow——Veo 就是它們背後的影片模型。",
            },
            {
              t: "寫影片提示詞",
              d: "描述四個要素：主體（誰／什麼）、動作（在做什麼）、場景與光線、鏡頭運動。中文可以，英文通常更穩定。",
            },
            {
              t: "生成、挑選、重生",
              d: "等一兩分鐘生成。不滿意就調整提示再生：改鏡頭（推近、空拍）、改氛圍（清晨、霓虹夜景）通常變化最明顯。",
            },
            {
              t: "下載使用",
              d: "滿意後下載 mp4 即可拿去剪輯或發佈。注意完整功能多需要付費方案，先用少量額度試風格。",
            },
          ],
          example: {
            caption: "影片提示詞範例",
            code: "黃昏海邊，一隻柴犬在浪花間奔跑，電影感、慢動作、暖色調",
          },
          tips: [
            "把「鏡頭運動、光線、情緒」寫進提示會更到位。",
            "先用短秒數測試風格，滿意再做長版。",
          ],
          connections: {
            prev: ["ChatGPT"],
            next: ["剪輯軟體出片"],
            pair: ["Midjourney v7"],
          },
          url: "https://deepmind.google/models/veo/",
        },
        {
          name: "Runway",
          tagline: "創作者最常用的 AI 影片工具，擅長風格化。",
          tags: ["影片", "入門～進階"],
          intro:
            "創作者圈最常用的 AI 影片工具之一，擅長風格化與精準控制，適合做更有藝術感的影像。除了生成，還內建去背、調色、延長等後製工具，像一座 AI 影像工作室。",
          facts: [
            { k: "價格", v: "有免費額度；訂閱解鎖更多" },
            { k: "平台", v: "瀏覽器" },
            { k: "適合", v: "想要風格控制與後製的創作者" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "圖片生影片、風格化影像",
            "去背、調色、延長等 AI 後製",
            "做 MV、概念片、藝術影像",
          ],
          pros: [
            "控制力強，工具鏈完整像個工作室",
          ],
          cons: [
            "免費額度少，參數要花時間摸",
          ],
          steps: [
            {
              t: "註冊",
              d: "到 runwayml.com 註冊，免費額度可以先試玩幾支。",
            },
            {
              t: "選生成模式",
              d: "進到 Generate 區，選「Text to Video（文字生影片）」或「Image to Video（圖片生影片）」。想控制風格的話，從一張參考圖出發最穩。",
            },
            {
              t: "輸入提示與參考圖",
              d: "上傳參考圖、寫下動態描述（例如「鏡頭緩慢推進，雨後地面反光」），按 Generate。",
            },
            {
              t: "用內建工具修整",
              d: "生成後可以直接在 Runway 裡延長秒數、去背、調色，弄到滿意再下載成品。",
            },
          ],
          example: {
            caption: "影片提示詞範例",
            code: "霓虹城市夜景，雨後地面反光，賽博龐克風格，緩慢推軌鏡頭",
          },
          tips: ["用參考圖控制風格，比純文字更穩定。"],
          connections: {
            prev: ["Midjourney v7"],
            next: ["剪輯軟體出片"],
            pair: ["Google Veo 3.1"],
          },
          url: "https://runwayml.com",
        },
        {
          name: "Midjourney v7",
          tagline: "圖像生成的品質標竿，最有美感。",
          tags: ["圖像", "入門"],
          intro:
            "圖像生成的品質標竿，擅長有美感、有風格的圖。可透過網頁或 Discord 使用。",
          facts: [
            { k: "價格", v: "訂閱制，無免費額度（基本約 $10／月）" },
            { k: "平台", v: "網頁／Discord" },
            { k: "適合", v: "想要最美靜態圖的人" },
            { k: "難度", v: "中等" },
          ],
          useCases: [
            "海報、插畫、概念藝術",
            "品牌視覺與風格探索",
            "用參考圖延伸出系列變化",
          ],
          pros: [
            "美感與質感是業界標竿",
            "風格資源與社群龐大",
          ],
          cons: [
            "沒有免費額度",
            "提示詞用英文效果較穩",
          ],
          steps: [
            {
              t: "註冊並訂閱",
              d: "到 midjourney.com 用 Discord 或 Google 帳號登入。Midjourney 沒有免費額度，選最低的月費方案就能開始。",
            },
            {
              t: "用 /imagine 生圖",
              d: "在網頁版輸入框（或 Discord 的 /imagine 指令）輸入英文提示詞按 Enter，一次會生成四張小圖。",
            },
            {
              t: "放大與變化",
              d: "喜歡哪張就按它的 U（Upscale，放大成高解析版本）；想要類似構圖的更多版本就按 V（Variation，變化）。",
            },
            {
              t: "用參數微調",
              d: "在提示詞最後加參數：--ar 16:9 控制長寬比、--stylize 控制風格化強度。提示用「主體＋風格＋光線＋鏡頭」的結構效果最好。",
            },
          ],
          example: {
            caption: "提示詞範例",
            code: "/imagine a cozy reading nook by a rainy window, warm light, film photography --ar 3:2",
          },
          tips: [
            "提示用「主體＋風格＋光線＋鏡頭」結構效果最好。",
            "用 --ar 控制長寬比（例如 3:2、16:9）。",
          ],
          connections: {
            next: ["Runway", "Pika"],
            pair: ["Google Veo 3.1"],
          },
          url: "https://www.midjourney.com",
          docs: "https://docs.midjourney.com",
        },
        {
          name: "Pika",
          tagline: "上手最快的 AI 影片工具，適合社群短片。",
          tags: ["影片", "入門"],
          intro:
            "上手最快的 AI 影片工具之一，輸入文字或一張照片就能生出幾秒的動態短片，適合做社群短影片與趣味效果。",
          facts: [
            { k: "價格", v: "有免費額度；訂閱解鎖更多" },
            { k: "平台", v: "瀏覽器" },
            { k: "適合", v: "想快速做社群短片的人" },
            { k: "難度", v: "入門" },
          ],
          useCases: [
            "把照片變成動態短片",
            "套用趣味特效（膨脹、融化、變形…）",
            "做限時動態與貼文素材",
          ],
          pros: [
            "最容易上手，效果有趣",
            "生成快，適合大量嘗試",
          ],
          cons: [
            "片長短、精細控制有限",
          ],
          steps: [
            {
              t: "註冊",
              d: "到 pika.art 用 Google 帳號登入，有免費額度可以玩。",
            },
            {
              t: "文字或圖片生影片",
              d: "輸入一句描述，或上傳一張照片讓它動起來；也可以圖片＋文字一起給，控制力最好。",
            },
            {
              t: "套效果、調幅度",
              d: "試它的特效（膨脹、融化、變形等）做出有趣的短片；動作太大或太小就調整幅度重生成。",
            },
            {
              t: "下載分享",
              d: "滿意後下載短片。長度通常幾秒鐘，剛好適合社群貼文與限時動態。",
            },
          ],
          example: {
            caption: "提示詞範例",
            code: "一杯珍珠奶茶在桌上，珍珠像在跳舞，可愛卡通風格",
          },
          tips: ["先做幾秒的短片抓感覺，再慢慢加長與加特效。"],
          connections: {
            prev: ["Midjourney v7"],
            pair: ["Runway"],
          },
          url: "https://pika.art",
        },
      ],
    },
  ],

  // 該掌握的技能（點開看完整學習法）
  skills: [
    {
      name: "AI 素養（AI Literacy）",
      level: "所有人",
      desc: "理解 AI 能做什麼、限制在哪，以及如何安全、有效地用在工作上——2026 年最廣泛被需要的能力。",
      why: "各種職缺的條件都開始出現它。會用 AI 的人不會被 AI 取代，但會被「更會用 AI 的人」取代。",
      how: "先固定用一個助手（Claude 或 ChatGPT）處理日常大小事，把它當同事，用一兩週養成習慣。",
      pathSteps: [
        "選一個主力助手（Claude 或 ChatGPT），遇到任何問題先問它",
        "學會分辨它何時在亂掰：要求附來源、追問「你確定嗎？」",
        "了解基本限制：知識截止日、幻覺、隱私（別貼機密資料）",
        "挑一件每週重複的工作，改成和 AI 協作完成",
      ],
      trap: "以為 AI 素養＝會下指令。核心其實是判斷力：知道什麼該信、什麼該查證、什麼不該丟給它。",
      refs: [
        { label: "Elements of AI（免費概念課）", url: "https://www.elementsofai.com" },
        { label: "AI for Everyone — Andrew Ng", url: "https://www.coursera.org/learn/ai-for-everyone" },
      ],
    },
    {
      name: "提示工程（Prompt Engineering）",
      level: "入門到進階",
      desc: "用清楚的指令、範例與限制引導 AI 產出更好結果。相關職缺今年成長 135.8%，本質是「把需求想清楚」而非玩弄字句。",
      why: "同一個模型，好提示與壞提示的產出差距可達十倍；而且這項技能跨所有工具通用，學一次到處用。",
      how: "照「角色＋目標＋限制＋範例」四件套寫提示，把好用的存起來重複用。",
      pathSteps: [
        "每次提需求都套「角色＋目標＋限制＋範例」四件套",
        "同一個問題用兩種問法各跑一次，對照差異、留下好的",
        "建立自己的提示庫（任何筆記軟體都行），持續迭代",
        "學會把大任務拆成多輪小指令，每輪驗收再繼續",
      ],
      trap: "背「神奇咒語」沒有用。提示工程的本質跟寫一封清楚的交辦信一樣：對象、目的、限制、範例。",
      refs: [
        { label: "Anthropic 提示工程指南", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
        { label: "OpenAI Prompting Guide", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
      ],
    },
    {
      name: "RAG 檢索強化生成",
      level: "進階",
      desc: "把 AI 接上你的文件、資料庫與知識庫，降低幻覺、提升準確度，是打造內部知識助手的關鍵技能（80% 職缺可遠端）。",
      why: "企業最常見的 AI 需求就是「讓 AI 回答我們自己的資料」——這是接案與做內部工具的甜蜜點。",
      how: "用 LlamaIndex 把自己的幾份檔案丟進去問問題，親手做一次就懂。",
      pathSteps: [
        "照本站 LlamaIndex 的教學，跑通第一個文件問答工具",
        "理解流程四步：切塊 → 向量化 → 檢索 → 生成",
        "換不同資料、調整切塊大小，觀察答案品質怎麼變",
        "要求回答附出處，讓結果可以被驗證",
      ],
      trap: "以為把檔案丟進去就會準。資料清得乾不乾淨、切塊切得合不合理，才是品質的關鍵。",
      refs: [
        { label: "LlamaIndex 官方文件", url: "https://docs.llamaindex.ai" },
        { label: "LangChain RAG 教學", url: "https://python.langchain.com/docs/tutorials/rag/" },
      ],
    },
    {
      name: "AI 代理與多代理協作",
      level: "進階",
      desc: "Gartner 預估 2026 年底 40% 企業應用將內建任務型 AI 代理（2025 年不到 5%）。多代理協調的薪資溢價最高。",
      why: "工具會一直換，但「會設計流程、會設驗收點」的人才稀缺——這是代理時代真正值錢的能力。",
      how: "先用 Claude Code 或 Replit Agent 體驗「下個目標、它自己完成」，再用 CrewAI 自己組。",
      pathSteps: [
        "先當使用者：用 Claude Code 跑完一個完整任務，觀察它怎麼拆步驟",
        "用 CrewAI 組一個兩角色小團隊（研究員＋寫手）跑通",
        "給代理工具（查資料、讀檔案），觀察它何時開始失控",
        "學會設停損：步數上限、預算上限、人工確認點",
      ],
      trap: "不是越自動越好。沒有驗收點的全自動流程，出錯起來也是全自動的。",
      refs: [
        { label: "Anthropic：如何打造有效的代理", url: "https://www.anthropic.com/research/building-effective-agents" },
        { label: "CrewAI 官方文件", url: "https://docs.crewai.com" },
      ],
    },
    {
      name: "向量資料庫（Vector Databases）",
      level: "進階",
      desc: "AI 代理與 RAG 的記憶與檢索基礎，是把知識「存進」AI 的核心元件。",
      why: "理解它，你才知道 AI 為什麼「記得」或「忘記」、檢索為什麼準或不準——除錯 RAG 全靠這個。",
      how: "做 RAG 時自然會用到（如 Chroma、pgvector）；先理解「把文字變成可搜尋的數字」這件事。",
      pathSteps: [
        "先懂概念：文字會被轉成一串數字（向量），語意越近距離越近",
        "做 RAG 時實際用一次 Chroma（免安裝、內建即用）",
        "試試 pgvector：把向量存進你熟悉的 PostgreSQL",
        "調整 top-k 等參數，觀察檢索結果與答案的變化",
      ],
      trap: "不用先學數學。把它當成「語意搜尋引擎」來用就夠了，真的需要再往下挖。",
      refs: [
        { label: "Chroma 官方文件", url: "https://docs.trychroma.com" },
        { label: "pgvector（GitHub）", url: "https://github.com/pgvector/pgvector" },
      ],
    },
    {
      name: "資料工程與 MLOps",
      level: "工程",
      desc: "把模型穩定地部署、監控與規模化的工程能力，讓 AI 從 demo 走向正式產品。",
      why: "demo 跟產品的差距全在這裡：穩定上線、看得到成本與品質、出錯能回滾。",
      how: "等你有了會動的東西再學；先把一個小服務丟上 Zeabur 或雲端跑起來。",
      pathSteps: [
        "把一個小服務部署上 Zeabur（或任一雲端），讓它跑一週",
        "加上紀錄：每次 AI 呼叫的輸入、輸出與花費",
        "設預算警報，避免 API 帳單失控",
        "把提示與模型設定版本化，出問題能回滾",
      ],
      trap: "不需要一開始就上 Kubernetes。先讓一個小東西穩定活著，比什麼架構都重要。",
      refs: [
        { label: "Zeabur 官方文件", url: "https://zeabur.com/docs" },
        { label: "LangSmith（LLM 監控）", url: "https://docs.smith.langchain.com" },
      ],
    },
  ],
  skillsNote:
    "根據 Lightcast，AI 技能平均帶來約 28% 的薪資溢價；PwC 的估計更高達 56%。",

  // 學習資源（含時數、難度、你會學到什麼）
  resources: [
    {
      name: "Elements of AI", by: "赫爾辛基大學", cost: "免費",
      hours: "20–30 小時", level: "入門",
      desc: "免寫程式的概念入門，建立平台中立的 AI 基礎觀念。最適合完全新手。",
      learn: "AI 是什麼、能與不能、機器學習的直覺、AI 對社會的影響。",
      tip: "每天 30 分鐘，先完成第一章就算上路；全程零程式。",
      url: "https://www.elementsofai.com",
    },
    {
      name: "AI for Everyone", by: "Andrew Ng / DeepLearning.AI", cost: "可免費旁聽",
      hours: "約 10 小時", level: "入門",
      desc: "吳恩達的經典課程，不需寫程式，聚焦 AI 的商業應用與術語，建立全局觀。",
      learn: "AI 專案怎麼運作、哪些事該交給 AI、怎麼在組織裡導入。",
      tip: "選旁聽（Audit）就免費；適合一週內配速看完。",
      url: "https://www.coursera.org/learn/ai-for-everyone",
    },
    {
      name: "Google 機器學習速成課程", by: "Google", cost: "免費",
      hours: "約 15 小時", level: "中等",
      desc: "用 TensorFlow 實作的機器學習入門，理論與動手練習兼具。",
      learn: "機器學習核心觀念、損失函數、過擬合、特徵工程＋實作練習。",
      tip: "數學看不懂先跳過，把範例跑起來最重要。",
      url: "https://developers.google.com/machine-learning/crash-course",
    },
    {
      name: "CS50's Introduction to AI", by: "Harvard", cost: "免費",
      hours: "約 7 週（每週 10+ 小時）", level: "進階",
      desc: "想要扎實技術底子的人最佳選擇，涵蓋超越 LLM 的 AI 基礎原理。",
      learn: "搜尋演算法、知識表示、機器學習、神經網路、語言模型底層。",
      tip: "先完成本站學習路徑前三步再來，吸收會快很多。",
      url: "https://cs50.harvard.edu/ai/",
    },
    {
      name: "Introduction to AI for Work", by: "DataCamp", cost: "免費起",
      hours: "2–4 小時", level: "入門",
      desc: "互動式、以 AI 為核心的課程，從「AI 是什麼」到實際工作應用，全程動手練習。",
      learn: "提示基礎、把 AI 用進日常工作的具體做法。",
      tip: "最快有感的一門，適合當你的第一堂課。",
      url: "https://www.datacamp.com/blog/best-free-ai-courses",
    },
    {
      name: "AI Skills Navigator", by: "Microsoft", cost: "免費",
      hours: "依路徑而定", level: "入門～進階",
      desc: "依角色與目標推薦學習起點，貫穿 Copilot 基礎到 Azure AI Foundry 的完整訓練目錄。",
      learn: "微軟生態（Copilot、Azure AI）的角色化學習路徑。",
      tip: "照「你的角色」選一條路徑就好，不要全部都想學。",
      url: "https://aiskillsnavigator.microsoft.com",
    },
    {
      name: "Coursera AI 課程與證書", by: "Coursera", cost: "旁聽免費 / 證書付費",
      hours: "依課程而定", level: "入門～進階",
      desc: "彙整各大學與機構的 AI 課程與專業證書，可依程度與主題篩選。",
      learn: "依主題挑課：生成式 AI、機器學習、提示工程都有完整專項。",
      tip: "旁聽免費；確定要履歷加分再付證書錢。",
      url: "https://www.coursera.org/courses?query=artificial+intelligence",
    },
  ],

  // 最新動態（Claude 與平台更新，依日期由新到舊）
  news: [
    {
      date: "2026-06-09",
      title: "Claude 首次成為 iPhone 選項",
      tag: "Apple WWDC",
      body:
        "Apple 在 WWDC 2026 公布全新的多 AI Extensions 系統，Claude 首次能成為 iPhone 上的 AI 選項；Siri 也改用 Gemini 強化。iOS 27 Beta 1 已於 6/8 推出。",
      why: "之後 iPhone 的系統 AI 可以直接換成 Claude——你在本站學的工具會更貼近日常使用。",
      url: "https://www.npr.org/2026/06/08/nx-s1-5847937/apple-wwdc-2026-siri-ai-tim-cook",
      source: "NPR",
    },
    {
      date: "2026-05-28",
      title: "Claude Opus 4.8 發布",
      tag: "Anthropic",
      body:
        "新一代旗艦模型。寫程式時放行錯誤的機率比前代低約 4 倍，會主動標示不確定處；新增「努力程度（Effort Control）」可調整思考深度；Claude Code 推出 Dynamic Workflows，能調度數百個平行子代理完成跨數十萬行程式碼的大規模遷移；Fast mode 達 2.5 倍速、成本降為前代的三分之一。定價與 4.7 相同。",
      why: "寫程式更可靠、速度更快、成本更低——用 Claude Code 做專案的體驗直接升級。",
      url: "https://www.anthropic.com/news/claude-opus-4-8",
      source: "anthropic.com",
    },
    {
      date: "2026-06",
      title: "Claude Code 持續更新",
      tag: "Anthropic",
      body:
        "新增 security-guidance 外掛審查程式漏洞；擴充 plugins、skills、hooks、背景工作與瀏覽器選擇等功能。Anthropic 同時將 Claude Code 速率上限加倍、提高 Opus 的 API 上限。",
      why: "外掛與技能生態正在成形，值得每個月回官方更新頁看一次有什麼新玩法。",
      url: "https://code.claude.com/docs/en/whats-new",
      source: "code.claude.com",
    },
    {
      date: "2026-04-26",
      title: "OpenAI 將收掉 Sora 影片產品",
      tag: "OpenAI",
      body:
        "OpenAI 宣布將下線 Sora 的網頁與 App 影片體驗，Sora API 預計 9/24 終止。創作者正轉向 Google Veo、Runway、Kling、Pika 等替代工具。",
      why: "提醒：別把工作流押在單一平台上。提示詞與分鏡的功夫是可以帶著走的。",
      url: "https://www.eweek.com/news/sora-alternatives-ai-video-tools-2026/",
      source: "eweek.com",
    },
  ],

  // 最新大新聞（本月，整理自公開報導）
  bigNews: [
    {
      date: "2026-06-08",
      title: "Apple WWDC 2026：Siri 換腦、Claude 進 iPhone",
      point: "Siri 改用 Gemini，並開放多 AI Extensions，Claude 首次成為 iPhone 選項；市場對執行力仍有疑慮。",
      why: "你的 iPhone 將能自選 AI——平常用慣哪家，系統入口就跟著你。",
      source: "NPR",
      url: "https://www.npr.org/2026/06/08/nx-s1-5847937/apple-wwdc-2026-siri-ai-tim-cook",
    },
    {
      date: "2026-06-04",
      title: "ChatGPT 記憶大升級「Dreaming V3」",
      point: "OpenAI 推出原始版本以來最大的記憶升級，新的 Dreaming V3 架構開始送達 Plus 與 Pro 用戶。",
      why: "ChatGPT 會更記得你的偏好與長期脈絡，跨對話接力做專案會順很多。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-5-2026",
    },
    {
      date: "2026-06-08",
      title: "NVIDIA 開源 Nemotron 3 Ultra（550B）",
      point: "目前最大的 Nemotron 3 模型（550B 參數、55B 啟用），號稱美國最聰明的開放權重模型。",
      why: "開放權重越強，未來自架模型、壓低 API 成本的選項就越多。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026",
    },
    {
      date: "2026-06-01",
      title: "Anthropic 遞交 IPO 申請",
      point: "Anthropic 於 6/1 機密遞交 IPO；同期 SpaceX 預計 6/12 上市，AI 產業進入資本市場新階段。",
      why: "Claude 生態的資源會更充足，工具與模型的迭代節奏值得期待。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026",
    },
    {
      date: "2026-06",
      title: "微軟 Foundry 收錄 11,000 個模型",
      point: "Foundry 模型目錄含 Claude Opus 4.8；Gemini 3.5 Pro 與 Claude Sonnet 4.8 預計本月底前推出。",
      why: "企業平台全面多模型化——「不綁定單一模型」的開發習慣越來越重要。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026",
    },
  ],

  // 值得追蹤的人與來源（精選整理，非即時抓取）
  follows: [
    // X
    { name: "Andrej Karpathy", handle: "@karpathy", platform: "X", desc: "想打底、聽得懂的 LLM 觀念講解，前 OpenAI / Tesla，教育型內容一流。", start: "先看他的《Intro to Large Language Models》演講影片。", url: "https://x.com/karpathy" },
    { name: "Simon Willison", handle: "@simonw", platform: "X", desc: "最實用的 LLM 用法分享：真實提示、工具拆解、誠實的踩雷心得。", start: "從他部落格的年度 LLM 回顧讀起。", url: "https://x.com/simonw" },
    { name: "Matt Wolfe", handle: "@mreflow", platform: "X", desc: "每天的 AI 新工具與新聞懶人包，對新手友善。", start: "挑最近一支每週 AI 新聞回顧影片。", url: "https://x.com/mreflow" },
    { name: "Logan Kilpatrick", handle: "@OfficialLoganK", platform: "X", desc: "Google AI Studio / Gemini 開發者工具的第一手消息。", start: "看他置頂的 Gemini／AI Studio 更新貼文。", url: "https://x.com/OfficialLoganK" },
    { name: "Peter Steinberger", handle: "@steipete", platform: "X", desc: "AI 寫程式工作流、代理工程的實戰心得（OpenClaw 作者）。", start: "找他談 agentic coding 工作流的長文。", url: "https://x.com/steipete" },
    { name: "Ammaar Reshi", handle: "@ammaar", platform: "X", desc: "vibe coding 示範與設計美感，看 AI 怎麼把點子變成產品。", start: "看他用 AI 從零做出 App 的示範影片串。", url: "https://x.com/ammaar" },
    // Threads / 中文
    { name: "techtip_s", handle: "@techtip_s", platform: "Threads", desc: "中文的學習與工具整理，輕鬆吸收新知。", start: "從置頂的工具整理貼文開始。", url: "https://www.threads.com/@techtip_s" },
    { name: "AI 發生什麼事", handle: "aiwhathappen.com", platform: "中文站", desc: "繁體中文 AI 新聞站，用幾句話帶你看懂每天的大事。", start: "先讀今天的每日摘要那一則。", url: "https://www.aiwhathappen.com" },
    { name: "104 職場力 — AI 工具懶人包", handle: "blog.104.com.tw", platform: "中文站", desc: "繁中、持續更新的免費 vs 訂閱 AI 工具大全，貼近台灣職場。", start: "先看「免費 AI 工具」總表那一段。", url: "https://blog.104.com.tw/ai_tools/" },
    // 電子報
    { name: "The Rundown AI", handle: "Rowan Cheung", platform: "電子報", desc: "全球最大的獨立 AI 媒體之一，每日掌握大事與態勢。", start: "訂閱免費日報，每天只讀前三條。", url: "https://www.therundown.ai" },
    { name: "TLDR AI", handle: "每日", platform: "電子報", desc: "工程師愛讀的每日精選技術新聞，內容精簡。", start: "訂閱後每天掃標題，挑一條深讀。", url: "https://tldr.tech/ai" },
    { name: "Ahead of AI", handle: "Sebastian Raschka", platform: "電子報", desc: "最大的深度技術型電子報，適合想理解模型底層的人。", start: "從最新一期的研究回顧開始。", url: "https://magazine.sebastianraschka.com" },
    { name: "The Batch", handle: "Andrew Ng / DeepLearning.AI", platform: "電子報", desc: "吳恩達團隊出品的每週深度評論，平衡技術與產業。", start: "每期先讀吳恩達的開頭信。", url: "https://www.deeplearning.ai/the-batch/" },
    { name: "Ben's Bites", handle: "每週", platform: "電子報", desc: "founder 視角、重「動手」的 AI 新聞與工具整理。", start: "看最新一期的工具推薦區塊。", url: "https://bensbites.com" },
  ],
  followsNote:
    "這些是精選整理（非即時抓取）。點進去就能看到他們在 X / Threads 上的最新貼文。",

  // 名詞速查辭典（⌘K 可直接查；卡片可互相跳轉）
  glossary: [
    { term: "API", en: "Application Programming Interface", def: "讓兩個程式互相溝通的窗口。你寫的程式透過 AI 公司的 API「呼叫」模型、拿回結果——學會接 API，就能把 AI 裝進自己的工具裡。", see: ["API 金鑰", "Token"] },
    { term: "API 金鑰", en: "API Key", def: "一串像密碼的字串，證明「這個請求是你發的」，用來計費與權限控管。請收好、別外流，也別寫死在前端程式裡（用環境變數）。", see: ["API", "環境變數"] },
    { term: "Token", en: "詞元", def: "模型處理文字的最小單位，約 0.7 個英文字、或 1～2 個中文字。模型的長度上限與 API 費用都以 token 計算。", see: ["上下文視窗", "LLM 大型語言模型"] },
    { term: "LLM 大型語言模型", en: "Large Language Model", def: "用海量文字訓練、擅長「接下一個字」的模型。Claude、ChatGPT 背後都是 LLM。", see: ["模型", "Token"] },
    { term: "模型", en: "Model", def: "訓練完成、能生成或預測的 AI 本體。不同模型擅長的事、速度與價格都不同，選對模型很重要。", see: ["LLM 大型語言模型", "參數"] },
    { term: "提示", en: "Prompt", def: "你給 AI 的指令或問題。寫得好不好，直接決定產出品質——這是最划算的一項技能。", see: ["提示工程"] },
    { term: "提示工程", en: "Prompt Engineering", def: "有系統地設計提示（角色、目標、限制、範例），讓產出更穩、更準。本質是把需求想清楚，而不是背咒語。", see: ["提示"] },
    { term: "RAG 檢索強化生成", en: "Retrieval-Augmented Generation", def: "先從你的文件「檢索」相關片段，再讓 AI 根據這些片段回答，大幅降低亂掰，是做內部知識助手的關鍵。", see: ["向量", "向量資料庫", "幻覺"] },
    { term: "向量", en: "Embedding", def: "把文字轉成一串數字，語意越接近、數字距離越近，讓電腦能「用意思」而非「用關鍵字」搜尋。", see: ["向量資料庫", "RAG 檢索強化生成"] },
    { term: "向量資料庫", en: "Vector Database", def: "專門儲存與搜尋向量的資料庫（如 Chroma、pgvector），是 RAG 與 AI 記憶的基礎元件。", see: ["向量", "RAG 檢索強化生成"] },
    { term: "幻覺", en: "Hallucination", def: "AI 一本正經地講錯或瞎掰。對重要資訊一定要求它附來源、並自己查證。", see: ["RAG 檢索強化生成"] },
    { term: "代理", en: "Agent", def: "會自己規劃步驟、呼叫工具、看結果再調整的 AI，而不只是一問一答。多步驟任務的未來形態。", see: ["MCP"] },
    { term: "MCP", en: "Model Context Protocol", def: "一套讓 AI 連接外部工具與資料的開放標準，Claude 等都支援。有了它，AI 能讀你的檔案、查資料庫、操作軟體。", see: ["代理", "API"] },
    { term: "上下文視窗", en: "Context Window", def: "模型一次能「讀進」的 token 上限。超過就會忘掉前面的內容，所以長對話要適度精簡或分段。", see: ["Token"] },
    { term: "微調", en: "Fine-tuning", def: "用你自己的資料再訓練模型，讓它更貼合特定任務。多數情況先用 RAG 就夠了，不必微調。", see: ["RAG 檢索強化生成", "模型"] },
    { term: "推理 / 思考", en: "Reasoning", def: "模型在回答前先「想一想」、分步推導，通常更準，但較慢也較貴。複雜題目才值得開。", see: ["模型"] },
    { term: "參數", en: "Parameters", def: "模型內部「旋鈕」的數量，常以 B（十億）計。數字越大不一定越好，要看任務與成本。", see: ["模型", "開源 / 開放權重"] },
    { term: "開源 / 開放權重", en: "Open Source / Open Weights", def: "程式或模型公開、可自由使用與修改。開放權重讓你能自架模型、壓低 API 成本。", see: ["參數"] },
    { term: "部署", en: "Deploy", def: "把做好的東西放上網路、讓別人能打開來用。本站就是用 Zeabur 推一下程式就自動上線。", see: ["前端 / 後端"] },
    { term: "前端 / 後端", en: "Frontend / Backend", def: "前端是使用者看得到、能點的畫面；後端是背後處理資料與邏輯的伺服器。", see: ["部署"] },
    { term: "終端機", en: "Terminal", def: "用打字下指令操作電腦的視窗。Mac 內建叫「終端機」，Windows 可用 PowerShell——很多開發工具都從這裡啟動。", see: ["npm"] },
    { term: "環境變數", en: "Environment Variable", def: "存在系統裡的設定值（像 API 金鑰），讓程式去讀取，又不必把秘密寫死在程式碼裡。", see: ["API 金鑰", "終端機"] },
    { term: "npm", en: "Node Package Manager", def: "Node.js 的套件管理工具。用 npm install 一行指令，就能裝進別人寫好的程式庫。", see: ["終端機"] },
  ],

  // 各區塊原始資料來源（皆為搜尋取得的真實連結）
  sources: [
    { label: "Best AI Tools for Developers 2026 — daily.dev", url: "https://daily.dev/blog/best-ai-tools-learn-developers/" },
    { label: "Top AI Coding Assistant Tools — Qodo", url: "https://www.qodo.ai/blog/best-ai-coding-assistant-tools/" },
    { label: "The Best Free AI Courses 2026 — DataCamp", url: "https://www.datacamp.com/blog/best-free-ai-courses" },
    { label: "Introducing Claude Opus 4.8 — Anthropic", url: "https://www.anthropic.com/news/claude-opus-4-8" },
    { label: "Claude Code — What's new", url: "https://code.claude.com/docs/en/whats-new" },
    { label: "Most In-Demand AI Skills 2026 — South", url: "https://www.hireinsouth.com/post/most-in-demand-ai-skills" },
    { label: "Best AI Image & Video Models 2026 — BuildFastWithAI", url: "https://www.buildfastwithai.com/blogs/collection/ai-image-video" },
    { label: "AI News Today June 8, 2026 — BuildFastWithAI", url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026" },
    { label: "Apple WWDC 2026 AI update — NPR", url: "https://www.npr.org/2026/06/08/nx-s1-5847937/apple-wwdc-2026-siri-ai-tim-cook" },
    { label: "36 AI Accounts to Follow on X 2026", url: "https://pasqualepillitteri.it/en/news/3633/ai-x-twitter-accounts-to-follow-2026" },
    { label: "10 Best X Accounts for LLM Updates — KDnuggets", url: "https://www.kdnuggets.com/10-best-x-twitter-accounts-to-follow-for-llm-updates" },
    { label: "Top 10 AI Newsletters 2026 — DataNorth", url: "https://datanorth.ai/blog/top-10-ai-newsletters-to-follow-in-2026" },
  ],
};
