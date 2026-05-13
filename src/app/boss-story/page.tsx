'use client'

import { useState } from 'react'

const STORIES = [
  {
    id: 1,
    name: '阿傑',
    role: '電商創業者',
    emoji: '🛍️',
    category: '創業',
    pain: '客服訊息每天 300+ 則，手動回覆到凌晨，團隊快崩潰。',
    solution: '導入 AI 客服機器人，設置 FAQ 自動回覆，搭配人工處理複雜問題。',
    result: '客服工時減少 70%，回應時間從平均 4 小時縮短到 15 分鐘。',
    weeks: 3,
    tags: ['AI客服', '自動化', '電商'],
    likes: 248,
  },
  {
    id: 2,
    name: '小美',
    role: '行銷企劃',
    emoji: '📊',
    category: '工作',
    pain: '每週要整合 GA、FB Ads、LINE 廣告三個平台數據，手動複製貼上花掉一整天。',
    solution: '用 Google Apps Script 自動抓取各平台 API，統一輸出到 Google Sheet 儀表板。',
    result: '數據整合從 8 小時縮短到 30 分鐘自動完成，釋放時間專注創意策略。',
    weeks: 2,
    tags: ['數據整合', 'Google Sheet', '自動化'],
    likes: 189,
  },
  {
    id: 3,
    name: 'Daniel',
    role: '軟體工程師',
    emoji: '💻',
    category: '工作',
    pain: '每次 code review 都要花大量時間解釋同樣的規範，新人常犯相同錯誤。',
    solution: '建立 ESLint 自訂規則 + PR 模板 + 自動化 checklist，把規範嵌入開發流程。',
    result: 'Review 時間減少 40%，新人上手週期從 3 週縮短到 1 週。',
    weeks: 4,
    tags: ['Code Review', 'DevOps', '團隊管理'],
    likes: 156,
  },
  {
    id: 4,
    name: '曉琳',
    role: '自由接案設計師',
    emoji: '🎨',
    category: '創業',
    pain: '客戶改稿沒有止境，「再改一下」循環讓專案超時，利潤蒸發。',
    solution: '建立改稿次數合約條款，用 Notion 文件化每次修改記錄，超出次數明訂加收費。',
    result: '專案準時交付率從 40% 提升到 85%，月均收入增加 35%。',
    weeks: 1,
    tags: ['接案管理', '合約', '設計'],
    likes: 312,
  },
  {
    id: 5,
    name: '老王',
    role: '傳統製造業主',
    emoji: '🏭',
    category: '創業',
    pain: '庫存靠人工 Excel 管理，常發生缺料停工或積料積壓，損失嚴重。',
    solution: '導入低代碼 ERP（Airtable + Zapier），設置安全庫存自動預警與採購觸發流程。',
    result: '庫存準確率從 72% 提升到 96%，停工事件從每月 3 次降到近乎為零。',
    weeks: 6,
    tags: ['ERP', '庫存管理', '製造業'],
    likes: 203,
  },
  {
    id: 6,
    name: 'Ivy',
    role: 'HR 主管',
    emoji: '👥',
    category: '工作',
    pain: '招募流程全靠 Email 往返，履歷散落各處，面試安排常出錯。',
    solution: '建立 Notion 招募資料庫，整合 Calendly 自動排程，用 Make 串接 Gmail 通知。',
    result: '每位候選人流程時間縮短 60%，面試爽約率從 25% 降到 8%。',
    weeks: 2,
    tags: ['HR', '招募', '自動化'],
    likes: 178,
  },
  {
    id: 7,
    name: '書瑋',
    role: 'YouTuber',
    emoji: '🎬',
    category: 'AI創作',
    pain: '影片字幕、翻譯、剪輯摘要佔掉大量後製時間，一支影片要花 10+ 小時。',
    solution: '用 Whisper 自動轉錄，Claude API 生成摘要與多語字幕，CapCut 批次渲染。',
    result: '後製時間從 10 小時縮短到 3 小時，頻道更新頻率從每月 2 支增加到每週 1 支。',
    weeks: 3,
    tags: ['AI剪輯', 'YouTube', '字幕'],
    likes: 421,
  },
  {
    id: 8,
    name: '阿哲',
    role: '房仲業務',
    emoji: '🏠',
    category: '工作',
    pain: '每天要追蹤幾十個客戶狀態，常忘記跟進導致失單，靠筆記本管理根本不夠。',
    solution: '建立 Notion CRM，設置到期提醒，搭配 Line Notify 推播每日待辦。',
    result: '跟進率從 60% 提升到 95%，季度成交量增加 28%。',
    weeks: 1,
    tags: ['CRM', '房仲', 'Line通知'],
    likes: 267,
  },
]

const CATEGORIES = ['全部', '工作', '創業', 'AI創作', '生活'] as const
type Cat = (typeof CATEGORIES)[number]

export default function BossStoryPage() {
  const [sort, setSort] = useState<'熱門' | '最新'>('熱門')
  const [cat, setCat] = useState<Cat>('全部')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filtered = STORIES
    .filter(s => cat === '全部' || s.category === cat)
    .sort((a, b) => sort === '熱門' ? b.likes - a.likes : b.id - a.id)

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-600 mb-2">真實案例分享</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">老闆の故事</h1>
          <p className="text-gray-500 max-w-xl">看看他們如何用 AI 工具和自動化流程，把每天的卡點變成競爭優勢。</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${cat === c ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700 hover:bg-amber-100'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg bg-stone-100 p-1">
            {(['熱門', '最新'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`rounded-md px-4 py-2 text-sm font-semibold ${sort === s ? 'bg-white text-orange-600 shadow-sm' : 'text-stone-600'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Story Cards */}
        <div className="grid gap-5 md:grid-cols-2 mb-8">
          {filtered.map(s => (
            <article key={s.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">{s.emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{s.name}</h3>
                    <p className="text-sm text-gray-500">{s.role}</p>
                  </div>
                  <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">{s.category}</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1">😣 痛點</p>
                    <p className="text-sm text-gray-700">{s.pain}</p>
                  </div>
                  {expanded === s.id && (
                    <>
                      <div>
                        <p className="text-xs font-semibold text-blue-500 mb-1">💡 解法</p>
                        <p className="text-sm text-gray-700">{s.solution}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-500 mb-1">✅ 成果</p>
                        <p className="text-sm text-gray-700">{s.result}</p>
                      </div>
                      <div className="text-xs text-gray-400">⏱ 實施週期：{s.weeks} 週</div>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mt-4">
                  {s.tags.map(t => (
                    <span key={t} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">#{t}</span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-400">❤️ {s.likes} 人共鳴</span>
                  <button
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                    className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                  >
                    {expanded === s.id ? '收起 ▲' : '查看解法 ▼'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Share Story Form */}
        <div className="bg-white rounded-2xl border border-orange-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">📝 分享你的故事</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-sm text-orange-500 font-semibold hover:text-orange-600"
            >
              {showForm ? '收起' : '展開表單'}
            </button>
          </div>
          {showForm && (
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input className="border border-stone-300 rounded-xl px-4 py-2 outline-none focus:border-orange-500 text-sm" placeholder="你的稱呼 / 匿名皆可" />
                <input className="border border-stone-300 rounded-xl px-4 py-2 outline-none focus:border-orange-500 text-sm" placeholder="你的角色（如：電商創業者）" />
              </div>
              <textarea className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-sm min-h-20" placeholder="你遇到的痛點是什麼？" />
              <textarea className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-sm min-h-20" placeholder="你用了什麼方法解決？" />
              <textarea className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-sm min-h-16" placeholder="解決後的成果（數字最有說服力）" />
              <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl transition">
                提交故事 +30 智慧幣
              </button>
            </form>
          )}
          {!showForm && (
            <p className="text-gray-500 text-sm">你的真實案例可以幫助更多人找到方向，同時獲得 +30 智慧幣獎勵。</p>
          )}
        </div>

      </div>
    </main>
  )
}
