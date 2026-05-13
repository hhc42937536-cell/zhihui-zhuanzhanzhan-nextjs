import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const TOOLS = [
  { name: "ChatGPT", desc: "AI 對話與文字生成", icon: "🤖", url: "https://chat.openai.com" },
  { name: "Midjourney", desc: "AI 圖像創作神器", icon: "🎨", url: "https://midjourney.com" },
  { name: "Notion AI", desc: "智慧筆記與協作", icon: "📝", url: "https://notion.so" },
  { name: "Zapier", desc: "自動化工作流程", icon: "⚡", url: "https://zapier.com" },
  { name: "Runway", desc: "AI 影片生成工具", icon: "🎬", url: "https://runwayml.com" },
  { name: "Claude", desc: "深度思考 AI 助手", icon: "🧠", url: "https://claude.ai" },
];

const TESTIMONIALS = [
  { quote: "分享了一個搭車的煩惱，竟然賺到 20 幣，太驚喜了！", author: "小美" },
  { quote: "在這裡找到了解決睡眠問題的方法，生活品質大提升。", author: "阿強" },
  { quote: "用幣換到了咖啡券，而且還認識了很多志同道合的朋友。", author: "Jenny" },
  { quote: "提供解法賺到的幣比我想像的多很多，強烈推薦！", author: "大偉" },
  { quote: "平台介面很清爽，痛點分類也很精準，找資料超方便。", author: "小晴" },
  { quote: "每天來看大家的痛點，有時候笑到噴飯，超療癒！", author: "Kevin" },
];

const PLACEHOLDER_POINTS = [
  { id: 1, title: "早上鬧鐘響了就是爬不起來", likes: 128, category: "生活習慣" },
  { id: 2, title: "外送費比餐點還貴，點了又心疼", likes: 97, category: "消費痛點" },
  { id: 3, title: "手機充電線一定先壞那一頭", likes: 84, category: "3C 困擾" },
];

const PLACEHOLDER_USERS = [
  { id: 1, display_name: "痛點王小明", pain_coins: 2480 },
  { id: 2, display_name: "解法達人阿花", pain_coins: 1930 },
  { id: 3, display_name: "創意王 Jenny", pain_coins: 1640 },
  { id: 4, display_name: "熱心大偉", pain_coins: 1250 },
  { id: 5, display_name: "分享達人小晴", pain_coins: 980 },
];

const MEDALS = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];

export default async function HomePage() {
  let painPoints: { id: number; title: string; likes: number; category?: string }[] =
    PLACEHOLDER_POINTS;
  let topUsers: { id: number; display_name: string; pain_coins: number }[] =
    PLACEHOLDER_USERS;

  try {
    const supabase = await createClient();

    const { data: points } = await supabase
      .from("pain_points")
      .select("id, title, likes, category")
      .order("likes", { ascending: false })
      .limit(6);

    if (points && points.length > 0) painPoints = points;

    const { data: users } = await supabase
      .from("users_profile")
      .select("id, display_name, pain_coins")
      .order("pain_coins", { ascending: false })
      .limit(5);

    if (users && users.length > 0) topUsers = users;
  } catch {
    // fallback to placeholders
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            把生活小煩惱變成
            <br />
            <span className="text-orange-500">大家的樂趣與機會</span>
          </h1>
          <div className="flex flex-col items-center gap-2 mb-8 text-lg text-gray-700">
            <p>🍬 分享痛點，賺取 <strong>10–30 幣</strong></p>
            <p>💡 提供解法，賺取 <strong>50–200 幣</strong></p>
            <p>🎁 累積痛幣，兌換<strong>實體獎品</strong></p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/pain-point-hub"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-xl shadow-sm transition"
            >
              🔥 痛點廣場
            </Link>
            <Link
              href="/solution-gallery"
              className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-7 py-3 rounded-xl shadow-sm transition"
            >
              💡 解法展覽館
            </Link>
            <Link
              href="/tool-library"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-7 py-3 rounded-xl shadow-sm transition"
            >
              🛠️ 工具百寶箱
            </Link>
          </div>
        </div>
      </section>

      {/* Hot Pain Points */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">🔥 熱門痛點</h2>
          <p className="text-gray-500 mb-8">大家最有共鳴的生活煩惱</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {painPoints.map((point) => (
              <div
                key={point.id}
                className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 hover:shadow-md transition"
              >
                {point.category && (
                  <span className="text-xs bg-orange-100 text-orange-600 rounded-full px-2 py-0.5 font-medium">
                    {point.category}
                  </span>
                )}
                <p className="mt-3 font-semibold text-gray-800">{point.title}</p>
                <p className="mt-3 text-sm text-gray-400">❤️ {point.likes} 人有同感</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/pain-point-hub"
              className="text-orange-500 hover:text-orange-600 font-medium underline underline-offset-2"
            >
              查看所有痛點 →
            </Link>
          </div>
        </div>
      </section>

      {/* 6 Tool Recommendations */}
      <section className="bg-teal-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">🛠️ 創作者推薦工具</h2>
          <p className="text-gray-500 mb-8">解決痛點的 AI 利器，讓你事半功倍</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition flex flex-col items-center gap-2"
              >
                <span className="text-3xl">{tool.icon}</span>
                <span className="font-semibold text-sm text-gray-800">{tool.name}</span>
                <span className="text-xs text-gray-400">{tool.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Honor Board */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">🏆 榮譽榜</h2>
          <p className="text-gray-500 mb-8">本月痛幣累積排行前五名</p>
          <div className="flex flex-col gap-3">
            {topUsers.map((user, i) => (
              <div
                key={user.id}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-xl shadow-sm px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{MEDALS[i]}</span>
                  <span className="font-semibold text-gray-800">{user.display_name}</span>
                </div>
                <span className="text-orange-500 font-bold">
                  {user.pain_coins.toLocaleString()} 幣
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-amber-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">💬 用戶心聲</h2>
          <p className="text-gray-500 mb-8">他們在智慧轉運站找到了什麼</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
                <p className="text-gray-700 italic">「{t.quote}」</p>
                <p className="text-sm text-gray-400 font-medium">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">還在等什麼？</h2>
        <p className="text-gray-500 mb-8 text-lg">免費加入，立刻開始賺幣兌獎品</p>
        <Link
          href="/login?tab=register"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-xl shadow-sm text-lg transition"
        >
          免費加入 → 立刻賺幣
        </Link>
      </section>
    </main>
  );
}
