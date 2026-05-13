import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const STATIC_PAIN_POINTS = [
  { rank: 1, title: "整理會議紀錄太耗時", hint: "語音轉文字 + AI 摘要", category: "工作", likes: 856 },
  { rank: 2, title: "寫工作報告太慢", hint: "資料整理 → AI 自動生成報告", category: "工作", likes: 742 },
  { rank: 3, title: "資料零散難整合", hint: "自動抓取資料 → 分類整理 → 智慧筆記", category: "生活", likes: 689 },
  { rank: 4, title: "學習筆記難整理", hint: "語音錄製課程 → AI 生成摘要筆記", category: "生活", likes: 623 },
  { rank: 5, title: "重複工作太多", hint: "自動化工作流程 → 模板套用 → 批次操作", category: "自動化", likes: 598 },
];

const STATIC_TOP_USERS = [
  { name: "台南阿志", initial: "志", color: "from-orange-400 to-orange-600", tps: 1023, replies: 37, likes: 295, desc: "推薦了好幾個實用工具，被下載好多次", ring: false },
  { name: "高雄小美", initial: "美", color: "from-amber-400 to-orange-500", tps: 892, replies: 36, likes: 177, desc: "做了個品牌視覺模板，收藏數直線上升", ring: true },
  { name: "台北工程師", initial: "工", color: "from-teal-400 to-teal-600", tps: 756, replies: 22, likes: 194, desc: "分享自動化腳本，幫助超多人節省時間", ring: false },
];

const TOOLS_DATA = [
  { tag: "工作效率", tagColor: "bg-orange-100 text-orange-600", hot: true, title: "週報自動生成器", desc: "輸入關鍵字，AI 自動生成專業週報", rating: 4.8, downloads: 1834, coins: 15 },
  { tag: "溝通協作", tagColor: "bg-blue-100 text-blue-600", hot: true, title: "客服話術模板庫", desc: "200+ 場景話術，一鍵複製使用", rating: 4.9, downloads: 1456, coins: 20 },
  { tag: "工作效率", tagColor: "bg-orange-100 text-orange-600", hot: false, title: "會議紀錄整理術", desc: "語音轉文字 + 自動摘要重點", rating: 4.7, downloads: 1289, coins: 25 },
  { tag: "AI創作", tagColor: "bg-purple-100 text-purple-600", hot: false, title: "社群文案批量產生器", desc: "一次生成 10 則不同風格貼文", rating: 4.6, downloads: 1123, coins: 18 },
  { tag: "職涯發展", tagColor: "bg-teal-100 text-teal-600", hot: false, title: "履歷痛點分析工具", desc: "AI 分析履歷弱點，給優化建議", rating: 4.8, downloads: 987, coins: 22 },
  { tag: "數據分析", tagColor: "bg-red-100 text-red-600", hot: false, title: "訂單異常偵測小幫手", desc: "自動標記可疑訂單，降低風險", rating: 4.5, downloads: 856, coins: 30 },
];

export default async function HomePage() {
  let painPoints = STATIC_PAIN_POINTS;
  let topUsers = STATIC_TOP_USERS;

  try {
    const supabase = await createClient();
    const { data: dbPoints } = await supabase
      .from("pain_points")
      .select("id, title, likes, category")
      .order("likes", { ascending: false })
      .limit(5);
    if (dbPoints && dbPoints.length > 0) {
      painPoints = dbPoints.map((p, i) => ({
        rank: i + 1,
        title: p.title,
        hint: "",
        category: p.category ?? "",
        likes: p.likes ?? 0,
      }));
    }

    const { data: dbUsers } = await supabase
      .from("users_profile")
      .select("id, display_name, pain_coins")
      .order("pain_coins", { ascending: false })
      .limit(3);
    if (dbUsers && dbUsers.length > 0) {
      const colors = ["from-orange-400 to-orange-600", "from-amber-400 to-orange-500", "from-teal-400 to-teal-600"];
      topUsers = dbUsers.map((u, i) => ({
        name: u.display_name,
        initial: u.display_name?.[0] ?? "?",
        color: colors[i] ?? colors[0],
        tps: u.pain_coins,
        replies: 0,
        likes: 0,
        desc: "",
        ring: i === 1,
      }));
    }
  } catch {
    // fallback to static data
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-14">

          {/* Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">
              ✨ 智慧轉運站
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              把生活小煩惱<br className="hidden lg:block" />
              <span className="text-orange-500">變成大家的樂趣與機會</span>
            </h1>
            <div className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed space-y-2">
              <p className="font-medium">這裡超有趣：</p>
              <p>• 隨手分享日常痛點 → 馬上拿 🍬痛痛幣</p>
              <p>• 看到別人的煩惱 → 丟個解法或工具 → 賺 💡智慧幣</p>
              <p>• 自己做模板、prompt、工具 → 被人喜歡、收藏、下載 → 幣多多 + 超有成就感</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8 mt-8">
            {[
              { icon: "😊", num: "1200+", label: "個痛點在這裡被療癒" },
              { icon: "🛠️", num: "293+", label: "神器被玩翻" },
              { icon: "👥", num: "8300+", label: "朋友一起刷幣" },
              { icon: "💡", num: "440+", label: "解法案例" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-orange-50 rounded-lg text-base">{s.icon}</div>
                <div>
                  <span className="font-bold text-gray-900 text-base">{s.num}</span>
                  <span className="text-gray-400 text-sm ml-1">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 3 Steps */}
          <div className="grid lg:grid-cols-3 gap-5 mb-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200 shadow-md hover:shadow-lg hover:border-orange-400 transition-all flex flex-col">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">1</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold mb-4 self-start">
                ⭐ 最簡單入門
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl mb-3 shadow-sm text-2xl">😣</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">快來分享你的小煩惱</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">一句話說出你的困擾，社群幫你找解法，還能馬上拿幣！越多人共鳴，幣就越多 🎉</p>
              <Link href="/pain-point-hub" className="flex items-center justify-center gap-2 px-4 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-colors mt-auto">
                😊 去分享我的痛點 +10-30 🍬
              </Link>
            </div>
            {/* Step 2 */}
            <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200 shadow-md hover:shadow-lg hover:border-amber-400 transition-all flex flex-col">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">2</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold mb-4 self-start">
                🏆 超有成就
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl mb-3 shadow-sm text-2xl">💡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">看別人痛點 → 丟解法</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">熱門痛點點進去就能回覆，賺智慧幣</p>
              <Link href="/pain-point-hub" className="flex items-center justify-center gap-2 px-4 h-10 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors mt-auto">
                🧭 去看看別人的痛點 +50-200 💡
              </Link>
            </div>
            {/* Step 3 */}
            <div className="relative bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-200 shadow-md hover:shadow-lg hover:border-teal-400 transition-all flex flex-col">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">3</div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded-full text-xs font-bold mb-4 self-start">
                👑 創作者專屬
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl mb-3 shadow-sm text-2xl">☁️</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">有工具？來分享！</h3>
              <p className="text-sm text-gray-600 mb-4 flex-1">上傳後被人用就持續賺幣，還能上榜</p>
              <Link href="/tool-library" className="flex items-center justify-center gap-2 px-4 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-colors mt-auto">
                ⬆️ 我要上傳我的神器
              </Link>
            </div>
          </div>

          {/* Hot Pain Points */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">大家最近在聊什麼痛點？</h3>
              <Link href="/pain-point-hub" className="text-sm text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
                查看更多痛點 →
              </Link>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              這些都已經被按讚好多，來看看有沒有共鳴～<br />
              <span className="text-orange-500 font-medium">（點進去就能回覆解法，馬上賺智慧幣喔！）</span>
            </p>
            <div className="space-y-2">
              {painPoints.map((p) => (
                <Link
                  key={p.rank}
                  href="/pain-point-hub"
                  className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all"
                >
                  <span className="text-2xl font-black text-orange-300 w-7 shrink-0">{p.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{p.title}</p>
                    {p.hint && <p className="text-xs text-gray-400 mt-0.5">{p.hint}</p>}
                  </div>
                  {p.category && <span className="text-xs text-gray-400 shrink-0 hidden sm:block">{p.category}</span>}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-gray-500">{p.likes}</span>
                    <span className="px-2 py-1 bg-orange-500 text-white rounded-lg text-xs font-medium">回覆賺幣</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Leaderboard */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              🏆 本週榜單
            </span>
            <h2 className="text-3xl font-bold text-gray-900">本週轉運小達人</h2>
            <p className="text-gray-500 mt-2">這些朋友靠分享痛點 + 提供解法，幣刷得特別開心</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topUsers.map((u) => (
              <div key={u.name} className={`bg-white rounded-2xl p-6 shadow-sm text-center${u.ring ? " ring-2 ring-orange-400" : ""}`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${u.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3`}>
                  {u.initial}
                </div>
                <h3 className="font-bold text-gray-900">{u.name}</h3>
                <p className="text-orange-500 font-bold text-sm mt-1">TPS {u.tps.toLocaleString()}</p>
                {u.desc && <p className="text-gray-500 text-xs mt-2">{u.desc}</p>}
                {(u.replies > 0 || u.likes > 0) && (
                  <div className="flex justify-center gap-4 mt-3 text-xs text-gray-400">
                    <span>{u.replies} 回覆</span><span>{u.likes} 讚</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/honor-board" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors">
              查看完整榜單 →
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              🛠️ AI 工具箱
            </span>
            <h2 className="text-3xl font-bold text-gray-900">AI 工具遊樂園 · 300+ 神器等你玩、推薦、創作！</h2>
            <p className="text-gray-500 mt-2">300+ 個實用小東西，等你來試、來推薦、來創作</p>
          </div>

          {/* Creator Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">創作者專屬福利　想讓更多人用你的創作？</h3>
                <p className="text-orange-100 text-sm">上傳後：被人下載/收藏 → 智慧幣 + TPS衝榜 + 真實感謝<br />已經有朋友靠分享模板月賺上千幣～ 你也來試試？</p>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-orange-100">
                  <span>12,500+ 次下載</span><span>|</span><span>450+ 創作者</span><span>|</span><span>平均月賺 300+ 幣</span>
                </div>
              </div>
              <Link href="/tool-library" className="shrink-0 px-5 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-colors text-sm whitespace-nowrap">
                上傳我的工具 / prompt / 模板
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS_DATA.map((t) => (
              <Link key={t.title} href="/tool-library" className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all hover:border-orange-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${t.tagColor}`}>{t.tag}</span>
                  {t.hot && <span className="px-2 py-0.5 bg-red-100 text-red-500 rounded text-xs font-medium">🔥 熱門</span>}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{t.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{t.desc}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>⭐ {t.rating} · {t.downloads.toLocaleString()} 次下載</span>
                  <span className="text-orange-500 font-medium">{t.coins} 🍬</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tool-library" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl font-medium transition-all">
              探索全部神器 →
            </Link>
            <Link href="/tool-library" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all">
              我也要分享工具
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-amber-500 text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">還在等什麼？</h2>
        <p className="text-orange-100 mb-8 text-lg">免費加入，立刻開始賺幣兌獎品</p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link href="/login?tab=register" className="bg-white text-orange-600 font-bold px-10 py-4 rounded-xl shadow-sm text-lg hover:bg-orange-50 transition">
            免費加入 → 立刻賺幣
          </Link>
          <Link href="/pain-point-hub" className="border-2 border-white text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-white/10 transition">
            先逛逛看
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-orange-100">
          <span>8,500+ 人已加入</span>
          <span>12,500+ 幣已發出</span>
          <span>⭐ 4.8 / 5 滿意度</span>
        </div>
      </section>
    </main>
  );
}
