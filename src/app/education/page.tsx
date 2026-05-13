import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '學習轉運 | 智慧轉運站' }
export const dynamic = 'force-static'

const LEARNING_PATHS = [
  {
    id: 'beginner',
    name: '自動化入門',
    emoji: '🌱',
    level: '新手',
    desc: '從零開始，學會用 No-Code 工具把重複工作交給機器。',
    duration: '2 週',
    lessons: 6,
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 'intermediate',
    name: 'AI 工作流',
    emoji: '🤖',
    level: '進階',
    desc: '整合 ChatGPT、Claude、Perplexity 打造屬於你的 AI 助理矩陣。',
    duration: '3 週',
    lessons: 9,
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'advanced',
    name: '創業自動化',
    emoji: '🚀',
    level: '高階',
    desc: '打造可規模化的自動化系統，讓你的副業或創業脫離人力依賴。',
    duration: '4 週',
    lessons: 12,
    color: 'from-orange-400 to-amber-500',
  },
]

const COURSES = [
  {
    id: 1,
    title: 'Notion 全攻略：打造個人知識庫',
    path: '自動化入門',
    level: '新手',
    emoji: '📓',
    duration: '45 分鐘',
    students: 1280,
    tags: ['Notion', '知識管理'],
    desc: '從資料庫、模板到自動化，把 Notion 變成你的第二大腦。',
  },
  {
    id: 2,
    title: 'Zapier 串接術：讓工具自己溝通',
    path: '自動化入門',
    level: '新手',
    emoji: '⚡',
    duration: '60 分鐘',
    students: 987,
    tags: ['Zapier', '自動化'],
    desc: '不用寫程式，用 Zapier 把 Gmail、Slack、Google Sheets 全部串起來。',
  },
  {
    id: 3,
    title: 'ChatGPT Prompt 工程：讓 AI 聽懂你',
    path: 'AI 工作流',
    level: '進階',
    emoji: '💬',
    duration: '90 分鐘',
    students: 2341,
    tags: ['ChatGPT', 'Prompt'],
    desc: '掌握 Prompt 設計的核心原則，讓 AI 輸出你真正需要的內容。',
  },
  {
    id: 4,
    title: 'Make（前 Integromat）進階流程設計',
    path: 'AI 工作流',
    level: '進階',
    emoji: '🔧',
    duration: '120 分鐘',
    students: 654,
    tags: ['Make', 'Webhook'],
    desc: '建立複雜的多步驟自動化流程，處理 Zapier 做不到的進階場景。',
  },
  {
    id: 5,
    title: '用 AI 打造被動收入內容矩陣',
    path: '創業自動化',
    level: '高階',
    emoji: '💰',
    duration: '150 分鐘',
    students: 892,
    tags: ['內容創作', 'AI', '被動收入'],
    desc: '從選題、生成、排程到分發，一人用 AI 撐起多平台內容運營。',
  },
  {
    id: 6,
    title: '電商自動化：訂單到客服全流程',
    path: '創業自動化',
    level: '高階',
    emoji: '🛒',
    duration: '180 分鐘',
    students: 743,
    tags: ['電商', '客服自動化'],
    desc: '整合蝦皮/Shopify 訂單系統，建立從入庫到售後的自動化閉環。',
  },
]

const RESOURCES = [
  { name: 'Prompt 速查表', emoji: '📋', desc: '100 個高效 Prompt 模板', href: '#' },
  { name: 'AI 工具比較表', emoji: '📊', desc: '30+ 工具功能對比', href: '#' },
  { name: '自動化流程圖庫', emoji: '🗺️', desc: '50 個可複用流程模板', href: '#' },
  { name: '工具推薦清單', emoji: '🔗', href: '/tool-library', desc: '社群精選工具庫' },
]

const levelColor: Record<string, string> = {
  新手: 'bg-green-100 text-green-700',
  進階: 'bg-blue-100 text-blue-700',
  高階: 'bg-orange-100 text-orange-700',
}

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold text-orange-600 mb-2">學習中心</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">學習轉運</h1>
          <p className="text-gray-500 max-w-xl">從工具入門到系統建構，每一門課程都是實戰提煉的精華。學完立刻能用，不學無謂的理論。</p>
        </div>

        {/* Learning Paths */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🗺️ 學習路徑</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {LEARNING_PATHS.map(p => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className={`h-2 bg-gradient-to-r ${p.color}`} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{p.emoji}</span>
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${levelColor[p.level]}`}>{p.level}</span>
                      <h3 className="font-bold text-gray-900 mt-1">{p.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{p.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>⏱ {p.duration}</span>
                    <span>📚 {p.lessons} 堂課</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Courses */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 精選課程</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {COURSES.map(c => (
              <article key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{c.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${levelColor[c.level]}`}>{c.level}</span>
                      <span className="text-xs text-gray-400">{c.path}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">{c.desc}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {c.tags.map(t => (
                        <span key={t} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">#{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">⏱ {c.duration} · 👥 {c.students.toLocaleString()} 人學習</div>
                      <button className="text-xs font-semibold text-orange-500 hover:text-orange-600">立即學習 →</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📦 免費資源</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {RESOURCES.map(r => (
              <Link
                key={r.name}
                href={r.href}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:border-orange-200 hover:shadow-md transition"
              >
                <p className="text-3xl mb-2">{r.emoji}</p>
                <p className="font-bold text-gray-900 text-sm mb-1">{r.name}</p>
                <p className="text-xs text-gray-500">{r.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">邊學邊賺幣</h2>
          <p className="opacity-90 mb-6">完成課程可獲得幣種獎勵，學習成果也能分享到痛點交換所幫助他人。</p>
          <Link href="/pain-point-hub" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition inline-block">
            去分享你的學習心得
          </Link>
        </section>

      </div>
    </main>
  )
}
