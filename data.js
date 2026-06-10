// AI 學習庫 — 內容資料
// 描述為繁體中文，名稱保留原文，皆附原始來源連結。
// 要更新內容，直接改這個檔案即可（改完 push 到 main 會自動重新部署）。

window.SITE_DATA = {
  updated: "2026-06-10",

  // 從零到第一個工具：給「完全不會」的人的學習路徑
  learningPath: [
    {
      title: "先動嘴，不動手",
      action: "用 Claude 或 ChatGPT 把 AI 當成你的家教與同事：每天問它問題、請它解釋看不懂的名詞、幫你規劃要做的事。",
      goal: "習慣跟 AI 對話，學會把「我想要什麼」講清楚——這是後面所有事的基礎。",
    },
    {
      title: "用講的，做出第一個東西",
      action: "打開 Bolt.new 或 Replit，用一句中文描述一個小網頁（例如記帳、待辦清單），讓它生出來並按下部署。",
      goal: "親手體驗一次「從想法到上線」，建立『我也做得出來』的信心。",
    },
    {
      title: "進到編輯器",
      action: "安裝 Cursor 或用 Claude Code，打開上一步的專案，請 AI 幫你改它、加功能、修錯誤。",
      goal: "開始看得懂、也改得動程式，不再只是黑盒子。",
    },
    {
      title: "學會把話問好",
      action: "練習提示工程：每次都講清楚「角色、目標、限制、範例」。把好用的提示存下來重複用。",
      goal: "同一個工具，產出品質翻倍——這是最划算的一項技能。",
    },
    {
      title: "讓 AI 用你的資料",
      action: "用 LlamaIndex 做一個能回答你自己筆記或文件的小工具（這就是 RAG）。",
      goal: "做出別人沒有、只屬於你的 AI 工具。",
    },
    {
      title: "組裝更大的東西",
      action: "用 LangChain 或 CrewAI 把多個步驟、多個角色串起來，做一個會自己跑流程的代理（agent）。",
      goal: "從玩具走向真正有用、能幫你做事的產品。",
    },
  ],

  // 你現在該學的工具（含完整上手指南）
  tools: [
    {
      category: "AI 程式助手與編輯器",
      desc: "把 AI 直接帶進你寫程式的流程裡。",
      items: [
        {
          name: "Claude Code",
          tagline: "會自己讀檔、改檔、跑指令的終端機 AI 工程師。",
          tags: ["程式", "代理", "入門～進階"],
          intro:
            "在終端機裡運作的 AI 工程師。你用中文描述要做什麼，它會自己規劃、讀寫檔案、執行指令、修 bug。最適合想「真的把東西做出來並部署」的人。",
          steps: [
            "到 nodejs.org 下載安裝 Node.js（選 LTS 版）。",
            "打開終端機，執行安裝指令（見右邊範例）。",
            "進到你的專案資料夾，輸入 claude 啟動，第一次會引導你登入 Anthropic 帳號。",
            "直接用中文下指令，例如「幫我做一個記帳網頁，可以新增和刪除支出」。",
            "它會先列出計畫再動手；過程中你只要回「可以」或提出修改即可。",
          ],
          example: {
            caption: "安裝並在專案中啟動",
            code: "npm install -g @anthropic-ai/claude-code\ncd my-project\nclaude",
          },
          tips: [
            "先把需求講清楚（要什麼功能、給誰用）比丟一堆技術細節更有效。",
            "用 /init 讓它先讀懂整個專案；改完記得請它「跑起來看看有沒有錯」。",
          ],
          url: "https://code.claude.com/docs/en/whats-new",
          docs: "https://code.claude.com/docs",
        },
        {
          name: "GitHub Copilot",
          tagline: "長在編輯器裡的自動補全與 AI 助手。",
          tags: ["程式", "補全", "入門"],
          intro:
            "寫程式時的即時補全與 AI 助手，直接內建在 VS Code 等編輯器裡。你打一半它就接著補完，2026 年的 Agent Mode 還能跨檔案幫你修改。",
          steps: [
            "到 code.visualstudio.com 安裝 VS Code。",
            "在擴充功能（Extensions）搜尋「GitHub Copilot」並安裝、登入 GitHub 帳號。",
            "開始打字，看到灰色建議按 Tab 接受。",
            "按 Ctrl/Cmd + I 開啟 Copilot Chat，用中文問問題或請它改程式。",
          ],
          example: {
            caption: "在 Copilot Chat 裡下指令",
            code: "// 在 Copilot Chat 輸入：\n幫我把這個函式改成支援多筆輸入，並加上錯誤處理",
          },
          tips: [
            "學生與開源維護者通常可以免費使用，記得申請。",
            "先點選相關檔案再發問，回答會更準確。",
          ],
          url: "https://github.com/features/copilot",
          docs: "https://docs.github.com/copilot",
        },
        {
          name: "Cursor",
          tagline: "內建 AI、能讀懂整個專案的 VS Code。",
          tags: ["編輯器", "入門～進階"],
          intro:
            "一套「內建 AI 的 VS Code」。最大特色是能理解你整個專案，用一句話就重構、解釋或新增功能，是目前最多人用的 AI 編輯器。",
          steps: [
            "到 cursor.com 下載安裝（操作幾乎跟 VS Code 一樣）。",
            "用「Open Folder」打開你的專案資料夾。",
            "按 Cmd/Ctrl + L 開聊天，先問它「這個專案在做什麼？」。",
            "按 Cmd/Ctrl + K 在游標處用一句話生成或修改程式。",
            "用 Agent 模式讓它跨多個檔案完成一個完整功能。",
          ],
          example: {
            caption: "選一段程式碼後按 Cmd/Ctrl + K",
            code: "把這段改寫得更好讀，並加上中文註解",
          },
          tips: [
            "用 @檔名 把相關檔案帶進對話，AI 會更懂上下文。",
            "不確定時先請它「只解釋、先不要動程式」。",
          ],
          url: "https://cursor.com",
          docs: "https://docs.cursor.com",
        },
        {
          name: "Windsurf",
          tagline: "會自己動手的代理式 AI 編輯器。",
          tags: ["編輯器", "代理", "進階"],
          intro:
            "另一套 AI 編輯器，主打 Cascade 代理：你給一個目標，它會跨檔案規劃、執行、跑指令、看結果再修，像一個會自己動手的工程師。",
          steps: [
            "到 windsurf.com 下載安裝。",
            "打開專案，開啟 Cascade 面板。",
            "用中文描述目標，例如「幫這個網站加上深色模式切換」。",
            "看它一步步執行，需要時批准它要跑的指令。",
          ],
          example: {
            caption: "在 Cascade 下一個目標",
            code: "幫整個專案加上深色模式，並把使用者的偏好存在瀏覽器裡",
          },
          tips: [
            "適合「整包功能」一次做完的任務；零碎小修改用一般補全更快。",
          ],
          url: "https://windsurf.com",
          docs: "https://docs.windsurf.com",
        },
      ],
    },
    {
      category: "AI 應用開發框架",
      desc: "用程式打造自己的 AI 應用與代理。",
      items: [
        {
          name: "LangChain",
          tagline: "串起 LLM 應用的萬用積木，生態最大。",
          tags: ["框架", "進階"],
          intro:
            "用程式串起 LLM 應用的框架。要做聊天機器人、把 AI 接上工具或資料時，它提供現成的積木，教學與社群最多，是學「自己寫 AI 應用」很好的起點。",
          steps: [
            "先安裝 Python（python.org，3.10 以上）。",
            "終端機執行：pip install -U langchain langchain-anthropic",
            "到 Anthropic Console 申請 API 金鑰，設成環境變數 ANTHROPIC_API_KEY。",
            "照右邊範例寫幾行程式呼叫模型，執行看看。",
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
          url: "https://www.langchain.com",
          docs: "https://python.langchain.com",
        },
        {
          name: "LlamaIndex",
          tagline: "讓 AI 讀懂你自己的資料（RAG 首選）。",
          tags: ["RAG", "進階"],
          intro:
            "專門做「讓 AI 讀你的資料」（RAG）的框架。把 PDF、筆記、網頁丟進去，它幫你切塊、建索引，讓 AI 根據你的資料回答，而不是亂掰。",
          steps: [
            "安裝 Python 後執行：pip install llama-index llama-index-llms-anthropic",
            "把要讓 AI 讀的檔案放進一個 data/ 資料夾。",
            "設好環境變數 ANTHROPIC_API_KEY。",
            "照右邊範例建索引並提問。",
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
          url: "https://www.llamaindex.ai",
          docs: "https://docs.llamaindex.ai",
        },
        {
          name: "CrewAI",
          tagline: "讓多個 AI 角色分工合作的框架。",
          tags: ["多代理", "進階"],
          intro:
            "讓多個 AI「分工合作」的框架。你定義幾個角色（例如研究員、寫手、審稿），它們會像一個小團隊一樣依序完成任務，適合自動化較複雜的流程。",
          steps: [
            "安裝 Python 後執行：pip install crewai",
            "設好模型的 API 金鑰。",
            "定義幾個 Agent（角色、目標）與 Task（任務）。",
            "組成 Crew 執行，看它們接力把事情做完。",
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
          url: "https://www.crewai.com",
          docs: "https://docs.crewai.com",
        },
      ],
    },
    {
      category: "AI 應用建構工具（不用從零寫起）",
      desc: "用自然語言描述就能生出可用的應用，最適合新手起步。",
      items: [
        {
          name: "Bolt.new",
          tagline: "瀏覽器裡用一句話生出網頁，還能直接上線。",
          tags: ["原型", "部署", "入門"],
          intro:
            "在瀏覽器裡用一句話生出可運行的網頁 App，還能直接部署上線。完全不用先安裝任何東西，最適合「我想馬上看到成品」的新手。",
          steps: [
            "打開 bolt.new（用瀏覽器即可，免安裝）。",
            "在輸入框用中文描述你想要的網站。",
            "等它生成程式，在右邊即時預覽。",
            "繼續用對話微調（例如「把按鈕改成藍色」），滿意後按 Deploy 上線。",
          ],
          example: {
            caption: "貼進輸入框的第一句話",
            code: "做一個待辦清單網頁，可以新增、勾選完成、刪除，資料存在瀏覽器裡",
          },
          tips: [
            "一次改一個小地方，比一次要求很多更穩定。",
            "卡住時請它「解釋現在的錯誤並修好」。",
          ],
          url: "https://bolt.new",
        },
        {
          name: "Replit",
          tagline: "免安裝的雲端開發環境，Agent 幫你組全端 App。",
          tags: ["全端", "代理", "入門～進階"],
          intro:
            "雲端的寫程式環境，免安裝、開瀏覽器就能寫。它的 Replit Agent 可以照你的描述把前端、後端、資料庫、部署一次組好，適合想做完整一點的 App。",
          steps: [
            "到 replit.com 註冊帳號。",
            "建立新的 Repl，或直接打開 Replit Agent。",
            "用中文描述你要做的 App。",
            "Agent 會建立檔案、安裝套件、把它跑起來，你在預覽視窗測試。",
            "用內建的 Deploy 一鍵上線。",
          ],
          example: {
            caption: "對 Agent 說的第一句話",
            code: "幫我做一個簡單的部落格，可以發文章和留言，並部署上線",
          },
          tips: [
            "適合邊做邊學——點開它生成的檔案，看它是怎麼寫的。",
            "先做小一點的功能跑通，再慢慢擴充。",
          ],
          url: "https://replit.com",
          docs: "https://docs.replit.com",
        },
      ],
    },
    {
      category: "通用 AI 助手",
      desc: "日常工作與學習的萬用夥伴，也是新手的第一站。",
      items: [
        {
          name: "Claude",
          tagline: "擅長寫作、讀長文件與寫程式的 AI 助手。",
          tags: ["助手", "入門"],
          intro:
            "Anthropic 的 AI 助手，擅長寫作、閱讀長文件、寫與解釋程式。可在網頁、桌面 App，或搭配 Claude Code / Cowork 使用，是日常思考與動手的好夥伴。",
          steps: [
            "到 claude.ai 註冊登入。",
            "直接用中文對話；可上傳檔案、圖片、PDF 讓它一起讀。",
            "需要寫程式或做完整專案時，搭配 Claude Code（見上方）。",
          ],
          example: {
            caption: "新手最好用的開場白",
            code: "我完全不會寫程式，想做一個個人網站。請一步一步帶我，從第一步開始，每次只給我一個動作。",
          },
          tips: [
            "把「你的程度」和「想要的結果」講清楚，它會自動調整講法。",
            "要它「每次只給一步」很適合新手，不會被資訊量淹沒。",
          ],
          url: "https://claude.ai",
          docs: "https://support.claude.com",
        },
        {
          name: "ChatGPT",
          tagline: "最廣為人知的通用 AI 助手，生態最完整。",
          tags: ["助手", "入門"],
          intro:
            "最廣為人知的通用 AI 助手，能對話、查資料、看圖、寫程式，外掛與生態最完整。新手用來問問題、學新東西很順手。",
          steps: [
            "到 chatgpt.com 註冊登入。",
            "用中文發問，或上傳檔案、圖片。",
            "善用語音、深入研究等功能處理更複雜的任務。",
          ],
          example: {
            caption: "把它當家教",
            code: "請當我的 AI 家教，用最白話的方式解釋「API 是什麼」，並舉一個生活化的例子。",
          },
          tips: [
            "追問「可以再簡單一點嗎？」或「給我一個例子」能快速校正答案深度。",
          ],
          url: "https://chatgpt.com",
          docs: "https://help.openai.com",
        },
      ],
    },
    {
      category: "圖像與影片生成",
      desc: "創作者必備的視覺生成工具。",
      items: [
        {
          name: "Google Veo 3.1",
          tagline: "目前最強的影片生成模型，能生帶聲音的 4K 影片。",
          tags: ["影片", "入門"],
          intro:
            "Google 目前最強的影片生成模型，能依文字或圖片生成帶聲音的影片，畫質達真 4K。適合做短片、廣告與動態素材。",
          steps: [
            "透過 Google 的 Gemini App 或 Flow 平台使用 Veo。",
            "用文字描述畫面：鏡頭、主體、氛圍、動作。",
            "生成後挑選、微調提示詞再重生。",
          ],
          example: {
            caption: "影片提示詞範例",
            code: "黃昏海邊，一隻柴犬在浪花間奔跑，電影感、慢動作、暖色調",
          },
          tips: [
            "把「鏡頭運動、光線、情緒」寫進提示會更到位。",
            "先用短秒數測試風格，滿意再做長版。",
          ],
          url: "https://deepmind.google/models/veo/",
        },
        {
          name: "Runway",
          tagline: "創作者最常用的 AI 影片工具，擅長風格化。",
          tags: ["影片", "入門～進階"],
          intro:
            "創作者圈最常用的 AI 影片工具之一，擅長風格化與精準控制，適合做更有藝術感的影像。",
          steps: [
            "到 runwayml.com 註冊。",
            "選「文字生影片」或「圖片生影片」。",
            "輸入提示與參考圖。",
            "生成後用內建工具剪輯。",
          ],
          example: {
            caption: "影片提示詞範例",
            code: "霓虹城市夜景，雨後地面反光，賽博龐克風格，緩慢推軌鏡頭",
          },
          tips: ["用參考圖控制風格，比純文字更穩定。"],
          url: "https://runwayml.com",
        },
        {
          name: "Midjourney v7",
          tagline: "圖像生成的品質標竿，最有美感。",
          tags: ["圖像", "入門"],
          intro:
            "圖像生成的品質標竿，擅長有美感、有風格的圖。可透過網頁或 Discord 使用。",
          steps: [
            "到 midjourney.com 註冊。",
            "用 /imagine 加上提示詞生成。",
            "從四張結果中放大或變化。",
            "調整提示與參數再生成。",
          ],
          example: {
            caption: "提示詞範例",
            code: "/imagine a cozy reading nook by a rainy window, warm light, film photography --ar 3:2",
          },
          tips: [
            "提示用「主體＋風格＋光線＋鏡頭」結構效果最好。",
            "用 --ar 控制長寬比（例如 3:2、16:9）。",
          ],
          url: "https://www.midjourney.com",
          docs: "https://docs.midjourney.com",
        },
        {
          name: "Pika",
          tagline: "上手最快的 AI 影片工具，適合社群短片。",
          tags: ["影片", "入門"],
          intro:
            "上手最快的 AI 影片工具之一，適合做社群短影片與趣味效果。",
          steps: [
            "到 pika.art 註冊。",
            "輸入文字或上傳圖片。",
            "生成短影片並套用效果。",
          ],
          example: {
            caption: "提示詞範例",
            code: "一杯珍珠奶茶在桌上，珍珠像在跳舞，可愛卡通風格",
          },
          tips: ["先做幾秒的短片抓感覺，再慢慢加長與加特效。"],
          url: "https://pika.art",
        },
      ],
    },
  ],

  // 該掌握的技能（含怎麼開始）
  skills: [
    {
      name: "AI 素養（AI Literacy）",
      level: "所有人",
      desc: "2026 年最廣泛被需要的能力：理解 AI 能做什麼、限制在哪，以及如何安全、有效地用在工作上。",
      how: "先固定用一個助手（Claude 或 ChatGPT）處理日常大小事，把它當同事，用一兩週養成習慣。",
    },
    {
      name: "提示工程（Prompt Engineering）",
      level: "入門到進階",
      desc: "用清楚的指令、範例與限制引導 AI 產出更好結果。相關職缺今年成長 135.8%，本質是「系統設計」而非玩弄字句。",
      how: "照「角色＋目標＋限制＋範例」四件套寫提示，把好用的存起來重複用。",
    },
    {
      name: "RAG 檢索強化生成",
      level: "進階",
      desc: "把 AI 接上你的文件、資料庫與知識庫，降低幻覺、提升準確度，是打造內部知識助手的關鍵技能（80% 職缺可遠端）。",
      how: "用 LlamaIndex 把自己的幾份檔案丟進去問問題，親手做一次就懂。",
    },
    {
      name: "AI 代理與多代理協作",
      level: "進階",
      desc: "Gartner 預估 2026 年底 40% 企業應用將內建任務型 AI 代理（2025 年不到 5%）。多代理協調的薪資溢價最高。",
      how: "先用 Claude Code 或 Replit Agent 體驗「下個目標、它自己完成」，再用 CrewAI 自己組。",
    },
    {
      name: "向量資料庫（Vector Databases）",
      level: "進階",
      desc: "AI 代理與 RAG 的記憶與檢索基礎，是把知識「存進」AI 的核心元件。",
      how: "做 RAG 時自然會用到（如 Chroma、pgvector）；先理解「把文字變成可搜尋的數字」這件事。",
    },
    {
      name: "資料工程與 MLOps",
      level: "工程",
      desc: "把模型穩定地部署、監控與規模化的工程能力，讓 AI 從 demo 走向正式產品。",
      how: "等你有了會動的東西再學；先把一個小服務丟上 Zeabur 或雲端跑起來。",
    },
  ],
  skillsNote:
    "根據 Lightcast，AI 技能平均帶來約 28% 的薪資溢價；PwC 的估計更高達 56%。",

  // 學習資源
  resources: [
    { name: "Elements of AI", by: "赫爾辛基大學", desc: "20–30 小時、免寫程式的概念入門，建立平台中立的 AI 基礎觀念。最適合完全新手。", cost: "免費", url: "https://www.elementsofai.com" },
    { name: "AI for Everyone", by: "Andrew Ng / DeepLearning.AI", desc: "吳恩達的經典課程，不需寫程式，聚焦 AI 的商業應用與術語，建立全局觀。", cost: "可免費旁聽", url: "https://www.coursera.org/learn/ai-for-everyone" },
    { name: "Google 機器學習速成課程", by: "Google", desc: "用 TensorFlow 實作的機器學習入門，理論與動手練習兼具。", cost: "免費", url: "https://developers.google.com/machine-learning/crash-course" },
    { name: "CS50's Introduction to AI", by: "Harvard", desc: "想要扎實技術底子的人最佳選擇，涵蓋超越 LLM 的 AI 基礎原理。", cost: "免費", url: "https://cs50.harvard.edu/ai/" },
    { name: "Introduction to AI for Work", by: "DataCamp", desc: "互動式、以 AI 為核心的課程，從「AI 是什麼」到實際工作應用，全程動手練習。", cost: "免費起", url: "https://www.datacamp.com/blog/best-free-ai-courses" },
    { name: "AI Skills Navigator", by: "Microsoft", desc: "依角色與目標推薦學習起點，貫穿 Copilot 基礎到 Azure AI Foundry 的完整訓練目錄。", cost: "免費", url: "https://aiskillsnavigator.microsoft.com" },
    { name: "Coursera AI 課程與證書", by: "Coursera", desc: "彙整各大學與機構的 AI 課程與專業證書，可依程度與主題篩選。", cost: "旁聽免費 / 證書付費", url: "https://www.coursera.org/courses?query=artificial+intelligence" },
  ],

  // 最新動態（Claude 與平台更新，依日期由新到舊）
  news: [
    {
      date: "2026-06-09",
      title: "Claude 首次成為 iPhone 選項",
      tag: "Apple WWDC",
      body:
        "Apple 在 WWDC 2026 公布全新的多 AI Extensions 系統，Claude 首次能成為 iPhone 上的 AI 選項；Siri 也改用 Gemini 強化。iOS 27 Beta 1 已於 6/8 推出。",
      url: "https://www.npr.org/2026/06/08/nx-s1-5847937/apple-wwdc-2026-siri-ai-tim-cook",
      source: "NPR",
    },
    {
      date: "2026-05-28",
      title: "Claude Opus 4.8 發布",
      tag: "Anthropic",
      body:
        "新一代旗艦模型。寫程式時放行錯誤的機率比前代低約 4 倍，會主動標示不確定處；新增「努力程度（Effort Control）」可調整思考深度；Claude Code 推出 Dynamic Workflows，能調度數百個平行子代理完成跨數十萬行程式碼的大規模遷移；Fast mode 達 2.5 倍速、成本降為前代的三分之一。定價與 4.7 相同。",
      url: "https://www.anthropic.com/news/claude-opus-4-8",
      source: "anthropic.com",
    },
    {
      date: "2026-06",
      title: "Claude Code 持續更新",
      tag: "Anthropic",
      body:
        "新增 security-guidance 外掛審查程式漏洞；擴充 plugins、skills、hooks、背景工作與瀏覽器選擇等功能。Anthropic 同時將 Claude Code 速率上限加倍、提高 Opus 的 API 上限。",
      url: "https://code.claude.com/docs/en/whats-new",
      source: "code.claude.com",
    },
    {
      date: "2026-04-26",
      title: "OpenAI 將收掉 Sora 影片產品",
      tag: "OpenAI",
      body:
        "OpenAI 宣布將下線 Sora 的網頁與 App 影片體驗，Sora API 預計 9/24 終止。創作者正轉向 Google Veo、Runway、Kling、Pika 等替代工具。",
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
      source: "NPR",
      url: "https://www.npr.org/2026/06/08/nx-s1-5847937/apple-wwdc-2026-siri-ai-tim-cook",
    },
    {
      date: "2026-06-04",
      title: "ChatGPT 記憶大升級「Dreaming V3」",
      point: "OpenAI 推出原始版本以來最大的記憶升級，新的 Dreaming V3 架構開始送達 Plus 與 Pro 用戶。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-5-2026",
    },
    {
      date: "2026-06-08",
      title: "NVIDIA 開源 Nemotron 3 Ultra（550B）",
      point: "目前最大的 Nemotron 3 模型（550B 參數、55B 啟用），號稱美國最聰明的開放權重模型。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026",
    },
    {
      date: "2026-06-01",
      title: "Anthropic 遞交 IPO 申請",
      point: "Anthropic 於 6/1 機密遞交 IPO；同期 SpaceX 預計 6/12 上市，AI 產業進入資本市場新階段。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026",
    },
    {
      date: "2026-06",
      title: "微軟 Foundry 收錄 11,000 個模型",
      point: "Foundry 模型目錄含 Claude Opus 4.8；Gemini 3.5 Pro 與 Claude Sonnet 4.8 預計本月底前推出。",
      source: "BuildFastWithAI",
      url: "https://www.buildfastwithai.com/blogs/ai-news-today-june-8-2026",
    },
  ],

  // 值得追蹤的人與來源（精選整理，非即時抓取）
  follows: [
    // X
    { name: "Andrej Karpathy", handle: "@karpathy", platform: "X", desc: "想打底、聽得懂的 LLM 觀念講解，前 OpenAI / Tesla，教育型內容一流。", url: "https://x.com/karpathy" },
    { name: "Simon Willison", handle: "@simonw", platform: "X", desc: "最實用的 LLM 用法分享：真實提示、工具拆解、誠實的踩雷心得。", url: "https://x.com/simonw" },
    { name: "Matt Wolfe", handle: "@mreflow", platform: "X", desc: "每天的 AI 新工具與新聞懶人包，對新手友善。", url: "https://x.com/mreflow" },
    { name: "Logan Kilpatrick", handle: "@OfficialLoganK", platform: "X", desc: "Google AI Studio / Gemini 開發者工具的第一手消息。", url: "https://x.com/OfficialLoganK" },
    { name: "Peter Steinberger", handle: "@steipete", platform: "X", desc: "AI 寫程式工作流、代理工程的實戰心得（OpenClaw 作者）。", url: "https://x.com/steipete" },
    { name: "Ammaar Reshi", handle: "@ammaar", platform: "X", desc: "vibe coding 示範與設計美感，看 AI 怎麼把點子變成產品。", url: "https://x.com/ammaar" },
    // Threads / 中文
    { name: "techtip_s", handle: "@techtip_s", platform: "Threads", desc: "中文的學習與工具整理，輕鬆吸收新知。", url: "https://www.threads.com/@techtip_s" },
    { name: "AI 發生什麼事", handle: "aiwhathappen.com", platform: "中文站", desc: "繁體中文 AI 新聞站，用幾句話帶你看懂每天的大事。", url: "https://www.aiwhathappen.com" },
    { name: "104 職場力 — AI 工具懶人包", handle: "blog.104.com.tw", platform: "中文站", desc: "繁中、持續更新的免費 vs 訂閱 AI 工具大全，貼近台灣職場。", url: "https://blog.104.com.tw/ai_tools/" },
    // 電子報
    { name: "The Rundown AI", handle: "Rowan Cheung", platform: "電子報", desc: "全球最大的獨立 AI 媒體之一，每日掌握大事與態勢。", url: "https://www.therundown.ai" },
    { name: "TLDR AI", handle: "每日", platform: "電子報", desc: "工程師愛讀的每日精選技術新聞，內容精簡。", url: "https://tldr.tech/ai" },
    { name: "Ahead of AI", handle: "Sebastian Raschka", platform: "電子報", desc: "最大的深度技術型電子報，適合想理解模型底層的人。", url: "https://magazine.sebastianraschka.com" },
    { name: "The Batch", handle: "Andrew Ng / DeepLearning.AI", platform: "電子報", desc: "吳恩達團隊出品的每週深度評論，平衡技術與產業。", url: "https://www.deeplearning.ai/the-batch/" },
    { name: "Ben's Bites", handle: "每週", platform: "電子報", desc: "founder 視角、重「動手」的 AI 新聞與工具整理。", url: "https://bensbites.com" },
  ],
  followsNote:
    "這些是精選整理（非即時抓取）。點進去就能看到他們在 X / Threads 上的最新貼文。",

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
