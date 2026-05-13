export interface PainPoint {
  id: number;
  title: string;
  description: string;
  poster: string;
  posterType: "boss" | "freelancer" | "employee" | "creator" | "investor" | "founder";
  likes: number;
  comments: number;
  category: "投資" | "工作" | "生活" | "創業" | "自動化" | "AI創作";
  tags: string[];
  createdAt: string;
}

export interface Solution {
  id: number;
  painPointId: number;
  title: string;
  category: "工作效率" | "AI創作" | "溝通協作" | "投資分析";
  level: "basic" | "intermediate" | "advanced";
  description: string;
  tools: string[];
  tpsScore: number;
  author: string;
  likes: number;
}

export interface Tool {
  id: number;
  name: string;
  category: "工作效率" | "AI創作" | "溝通協作" | "職涯發展" | "數據分析" | "投資理財";
  pricing: "free" | "freemium" | "paid";
  description: string;
  rating: number;
  downloads: number;
  coins: number;
  url: string;
  createdAt: string;
}

export interface ShopItem {
  id: number;
  name: string;
  description: string;
  category: "服務" | "特權" | "獎品";
  coinType: "pain" | "wisdom";
  price: number;
  stock: number;
  emoji: string;
}

export const PAIN_POINTS: PainPoint[] = [
  { id: 1, title: "整理會議紀錄太耗時", description: "每週跨部門會議後都要重聽錄音、整理決議與待辦，常常拖到隔天才發出去。", poster: "PM 小林", posterType: "boss", likes: 856, comments: 42, category: "工作", tags: ["會議", "語音轉文字", "AI摘要"], createdAt: "2026-05-10" },
  { id: 2, title: "投資新聞太多看不完", description: "美股、台股、加密貨幣消息同時爆量，想快速抓出和持股相關的風險訊號。", poster: "價值派阿哲", posterType: "investor", likes: 742, comments: 35, category: "投資", tags: ["投資", "新聞摘要", "風險監控"], createdAt: "2026-05-09" },
  { id: 3, title: "社群貼文靈感枯竭", description: "每天要發 LinkedIn 和 IG，主題、標題、配圖方向都要重新想，很難穩定產出。", poster: "內容設計師 Mina", posterType: "creator", likes: 691, comments: 28, category: "AI創作", tags: ["內容行銷", "文案", "生成式AI"], createdAt: "2026-05-08" },
  { id: 4, title: "客戶信件回覆品質不穩", description: "客服同仁各自回信口吻不同，遇到抱怨信時也容易漏掉安撫與補償規則。", poster: "營運主管 Grace", posterType: "boss", likes: 638, comments: 31, category: "工作", tags: ["客服", "Email", "SOP"], createdAt: "2026-05-07" },
  { id: 5, title: "發票與收據分類麻煩", description: "接案收入和生活支出混在一起，月底報稅前才發現照片、PDF、雲端資料夾都很亂。", poster: "自由工作者 Ken", posterType: "freelancer", likes: 522, comments: 19, category: "生活", tags: ["理財", "OCR", "自動分類"], createdAt: "2026-05-06" },
  { id: 6, title: "創業初期市場訪談難整理", description: "訪談錄音很多，但要萃取共同痛點、付費意願與反對理由很花時間。", poster: "新創 Iris", posterType: "founder", likes: 589, comments: 24, category: "創業", tags: ["用戶訪談", "產品驗證", "AI摘要"], createdAt: "2026-05-05" },
  { id: 7, title: "重複貼資料到報表", description: "每天從廣告後台、CRM、試算表複製數字，貼到週報格式，容易貼錯欄位。", poster: "Growth Leo", posterType: "employee", likes: 604, comments: 27, category: "自動化", tags: ["報表", "Zapier", "Google Sheets"], createdAt: "2026-05-04" },
  { id: 8, title: "簡報圖表不夠有說服力", description: "資料已經整理好，但每次要把數字轉成主管看得懂的故事都卡住。", poster: "分析師 Hana", posterType: "employee", likes: 477, comments: 16, category: "工作", tags: ["簡報", "資料視覺化", "故事線"], createdAt: "2026-05-03" },
  { id: 9, title: "Podcast 剪輯流程太長", description: "剪沉默、下標題、產逐字稿、做短影音，每集至少多花半天。", poster: "聲音創作者 Jay", posterType: "creator", likes: 553, comments: 21, category: "AI創作", tags: ["Podcast", "剪輯", "短影音"], createdAt: "2026-05-02" },
  { id: 10, title: "履歷客製化很痛苦", description: "每個職缺都要重寫履歷摘要與自傳，想對齊 JD 又怕看起來太制式。", poster: "轉職中的 Ellie", posterType: "employee", likes: 431, comments: 14, category: "工作", tags: ["履歷", "求職", "JD分析"], createdAt: "2026-05-01" },
  { id: 11, title: "家庭旅遊規劃資訊分散", description: "機票、住宿、餐廳、長輩需求和小孩行程都分散在不同 App，很難排成順路路線。", poster: "雙寶爸 Alan", posterType: "employee", likes: 398, comments: 12, category: "生活", tags: ["旅遊", "行程規劃", "地圖"], createdAt: "2026-04-30" },
  { id: 12, title: "競品價格監控靠人工", description: "電商同品項每天價格和活動都在變，人工截圖比價太慢。", poster: "電商 Nina", posterType: "founder", likes: 512, comments: 23, category: "自動化", tags: ["爬蟲", "電商", "價格監控"], createdAt: "2026-04-29" },
  { id: 13, title: "投資筆記無法形成決策", description: "看了很多研究報告，但筆記散落在 Notion，缺少一致的買進、觀察、避開標準。", poster: "股海小周", posterType: "investor", likes: 466, comments: 17, category: "投資", tags: ["投資筆記", "Notion", "決策框架"], createdAt: "2026-04-28" },
  { id: 14, title: "內部知識庫搜尋不到答案", description: "新人一直問重複問題，舊文件太多又命名混亂，Slack 裡的答案也沉下去。", poster: "HR Bonnie", posterType: "boss", likes: 621, comments: 33, category: "工作", tags: ["知識庫", "RAG", "Onboarding"], createdAt: "2026-04-27" },
  { id: 15, title: "短影音腳本缺少系列感", description: "單支影片有流量，但要規劃 30 天主題、鉤子和 CTA 時容易失焦。", poster: "品牌主理人 Vivi", posterType: "creator", likes: 534, comments: 20, category: "AI創作", tags: ["短影音", "腳本", "內容策略"], createdAt: "2026-04-26" },
  { id: 16, title: "新產品客服問題回流太慢", description: "客服回報和產品待辦分離，常常到週會才知道用戶一直卡在同一個設定。", poster: "SaaS 創辦人 Ray", posterType: "founder", likes: 489, comments: 18, category: "創業", tags: ["產品管理", "客服分析", "自動標籤"], createdAt: "2026-04-25" },
  { id: 17, title: "每天排程提醒太碎片化", description: "任務在 Calendar、Todo、Line 群組和 email 裡，早上很難知道今天真正優先事項。", poster: "行政 Serena", posterType: "employee", likes: 377, comments: 11, category: "自動化", tags: ["行事曆", "任務管理", "自動提醒"], createdAt: "2026-04-24" },
  { id: 18, title: "讀書筆記沒有複習節奏", description: "看完書會摘錄重點，但沒有自動產生測驗、間隔複習和實作清單。", poster: "終身學習者 Neo", posterType: "freelancer", likes: 345, comments: 9, category: "生活", tags: ["學習", "Anki", "摘要"], createdAt: "2026-04-23" },
];

export const SOLUTIONS: Solution[] = [
  { id: 1, painPointId: 1, title: "30 分鐘會議到 3 分鐘行動清單", category: "工作效率", level: "basic", description: "用錄音轉文字、AI 摘要模板與待辦分派欄位，固定輸出決議、負責人與期限。", tools: ["Whisper", "ChatGPT", "Notion"], tpsScore: 92, author: "PM 小林", likes: 312 },
  { id: 2, painPointId: 3, title: "一週社群內容批次生成工作流", category: "AI創作", level: "intermediate", description: "先建立受眾痛點資料庫，再用提示詞產生主題矩陣、鉤子與圖片方向。", tools: ["Claude", "Canva", "Buffer"], tpsScore: 88, author: "Mina", likes: 276 },
  { id: 3, painPointId: 14, title: "Slack 與文件的內部問答機器人", category: "溝通協作", level: "advanced", description: "把常見文件切片建立向量索引，讓新人能在 Slack 直接問 SOP 與歷史決策。", tools: ["OpenAI", "Supabase", "Slack"], tpsScore: 95, author: "Tech Lead Aki", likes: 354 },
  { id: 4, painPointId: 2, title: "持股新聞風險雷達", category: "投資分析", level: "intermediate", description: "用 RSS 與關鍵字監控持股新聞，每日輸出利多、利空與需要追蹤的財報日期。", tools: ["Perplexity", "Google Sheets", "Make"], tpsScore: 84, author: "價值派阿哲", likes: 241 },
  { id: 5, painPointId: 7, title: "零手貼週報自動化", category: "工作效率", level: "advanced", description: "串接廣告、CRM 與表單資料，排程清洗後自動產出週報摘要。", tools: ["Zapier", "Looker Studio", "ChatGPT"], tpsScore: 90, author: "Growth Leo", likes: 289 },
  { id: 6, painPointId: 10, title: "JD 對齊履歷改寫法", category: "溝通協作", level: "basic", description: "把職缺需求轉成能力清單，再對照經歷產出客製化摘要與面試故事。", tools: ["ChatGPT", "Google Docs"], tpsScore: 81, author: "Ellie", likes: 198 },
];

export const TOOLS: Tool[] = [
  { id: 1, name: "Meeting Memo Kit", category: "工作效率", pricing: "free", description: "會議逐字稿摘要模板，輸出決議、風險、待辦與追蹤訊息。", rating: 4.8, downloads: 18240, coins: 120, url: "https://example.com/meeting-memo", createdAt: "2026-05-10" },
  { id: 2, name: "Prompt Calendar", category: "AI創作", pricing: "freemium", description: "30 天內容主題產生器，支援品牌語氣、平台格式與 CTA。", rating: 4.7, downloads: 15110, coins: 160, url: "https://example.com/prompt-calendar", createdAt: "2026-05-08" },
  { id: 3, name: "Inbox Tone Guard", category: "溝通協作", pricing: "paid", description: "客服信件口吻檢查與補償規則提醒，降低回覆落差。", rating: 4.6, downloads: 9820, coins: 220, url: "https://example.com/inbox-tone", createdAt: "2026-05-06" },
  { id: 4, name: "Resume JD Matcher", category: "職涯發展", pricing: "free", description: "分析職缺關鍵字，產出履歷摘要、成就改寫與面試問答。", rating: 4.5, downloads: 12670, coins: 100, url: "https://example.com/jd-matcher", createdAt: "2026-05-03" },
  { id: 5, name: "Sheet Report Bot", category: "數據分析", pricing: "freemium", description: "Google Sheets 報表摘要工具，自動抓異常數字與下週建議。", rating: 4.9, downloads: 20450, coins: 260, url: "https://example.com/sheet-report", createdAt: "2026-05-01" },
  { id: 6, name: "Stock Radar Digest", category: "投資理財", pricing: "paid", description: "持股新聞與財報日期追蹤，生成每日投資風險摘要。", rating: 4.4, downloads: 7340, coins: 300, url: "https://example.com/stock-radar", createdAt: "2026-04-28" },
  { id: 7, name: "Podcast Clip Flow", category: "AI創作", pricing: "freemium", description: "逐字稿、亮點時間軸與短影音標題批次產生。", rating: 4.7, downloads: 11390, coins: 180, url: "https://example.com/podcast-flow", createdAt: "2026-04-26" },
  { id: 8, name: "Team Knowledge Search", category: "溝通協作", pricing: "paid", description: "把文件與 Slack 討論整理成可搜尋的內部問答入口。", rating: 4.8, downloads: 8890, coins: 340, url: "https://example.com/team-search", createdAt: "2026-04-24" },
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 1, name: "專家解法健檢", description: "由社群專家檢查你的 AI 工作流並提出三個改善點。", category: "服務", coinType: "wisdom", price: 600, stock: 8, emoji: "🧠" },
  { id: 2, name: "痛點置頂 24 小時", description: "讓你的痛點提問出現在首頁精選區，提高被回覆機率。", category: "特權", coinType: "pain", price: 180, stock: 20, emoji: "📌" },
  { id: 3, name: "提示詞模板包", description: "精選 20 組會議、行銷、客服與投資提示詞。", category: "獎品", coinType: "wisdom", price: 320, stock: 35, emoji: "📦" },
  { id: 4, name: "一對一自動化諮詢", description: "30 分鐘線上諮詢，協助拆解可自動化流程。", category: "服務", coinType: "wisdom", price: 1200, stock: 4, emoji: "💬" },
  { id: 5, name: "回答加亮標籤", description: "你的下一則回覆會獲得橘色加亮，提高曝光。", category: "特權", coinType: "pain", price: 90, stock: 50, emoji: "✨" },
  { id: 6, name: "AI 工具月報", description: "每月整理新工具、價格變化與實測心得。", category: "獎品", coinType: "pain", price: 240, stock: 40, emoji: "📰" },
  { id: 7, name: "社群直播優先席", description: "保留工作流拆解直播名額，可提前提交案例。", category: "特權", coinType: "wisdom", price: 450, stock: 12, emoji: "🎟️" },
  { id: 8, name: "工作流圖卡設計", description: "把你的解法整理成可分享的流程圖卡。", category: "服務", coinType: "wisdom", price: 800, stock: 6, emoji: "🎨" },
];
