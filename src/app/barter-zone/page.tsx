'use client'

import { useState } from 'react'

const LISTINGS = [
  {
    id: 1,
    poster: '曉琳',
    emoji: '🎨',
    offer: 'UI 設計排版',
    want: 'Notion 資料庫建置',
    desc: '可提供 Figma 設計稿、品牌視覺規範、社群圖文模板，希望換到 Notion 工作區建置服務。',
    tags: ['設計', 'Notion'],
    category: '設計 × 工具',
    likes: 34,
  },
  {
    id: 2,
    poster: 'Daniel',
    emoji: '💻',
    offer: 'Python 自動化腳本',
    want: '影片剪輯 / 字幕製作',
    desc: '可撰寫 Python 爬蟲、資料清洗、API 整合腳本，想換到影片後製協助（YouTube、IG Reels）。',
    tags: ['Python', '剪輯'],
    category: '技術 × 創作',
    likes: 28,
  },
  {
    id: 3,
    poster: 'Ivy',
    emoji: '📝',
    offer: '履歷健診 / JD 對齊改寫',
    want: 'SEO 文章撰寫',
    desc: '有 HR 背景，可協助優化履歷、LinkedIn，對齊目標職位描述。希望換到 SEO 長文或官網文案撰寫。',
    tags: ['HR', '文案', 'SEO'],
    category: '職涯 × 文案',
    likes: 52,
  },
  {
    id: 4,
    poster: '阿傑',
    emoji: '📊',
    offer: 'GA4 / 廣告數據分析',
    want: '品牌 Logo / 視覺識別',
    desc: '可協助解讀 GA4 報告、FB Ads 優化建議、電商轉換率分析。換到品牌設計一套（Logo + 色票 + 字型）。',
    tags: ['數據分析', '品牌設計'],
    category: '行銷 × 設計',
    likes: 41,
  },
  {
    id: 5,
    poster: '書瑋',
    emoji: '🎬',
    offer: 'YouTube 影片腳本',
    want: 'Podcast 後製混音',
    desc: '擅長 AI 工具類、生產力類 YouTube 腳本撰寫（含 SEO 標題、縮圖文案）。換到 Podcast 錄音後製。',
    tags: ['腳本', 'YouTube', 'Podcast'],
    category: '內容創作',
    likes: 67,
  },
  {
    id: 6,
    poster: '老王',
    emoji: '🏭',
    offer: '供應鏈採購諮詢',
    want: 'Shopify 網站建置',
    desc: '有 15 年製造業經驗，可提供台灣 / 中國供應商媒合、採購議價建議。換到 Shopify 電商網站建置。',
    tags: ['供應鏈', 'Shopify', '電商'],
    category: '製造 × 電商',
    likes: 23,
  },
]

const CATEGORIES = ['全部', '設計 × 工具', '技術 × 創作', '職涯 × 文案', '行銷 × 設計', '內容創作', '製造 × 電商']

export default function BarterZonePage() {
  const [cat, setCat] = useState('全部')
  const [showForm, setShowForm] = useState(false)
  const [sort, setSort] = useState<'熱門' | '最新'>('熱門')

  const filtered = LISTINGS
    .filter(l => cat === '全部' || l.category === cat)
    .sort((a, b) => sort === '熱門' ? b.likes - a.likes : b.id - a.id)

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-600 mb-2">技能交換所</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">以物易物 · 以技換技</h1>
          <p className="text-gray-500 max-w-xl">你的設計對他人是金礦，他的程式對你是魔法。在這裡，用你擅長的，換你需要的。</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: '媒合成功', value: '128 組' },
            { label: '技能類型', value: '40+' },
            { label: '本週新增', value: '23 則' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex flex-col gap-3">
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
          <div className="flex items-center justify-between">
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
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2 rounded-xl transition"
            >
              + 發布交換需求
            </button>
          </div>
        </div>

        {/* Post Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-orange-200 shadow-sm p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4">📝 發布你的交換需求</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">我能提供</label>
                <input className="w-full border border-stone-300 rounded-xl px-4 py-2 outline-none focus:border-orange-500 text-sm" placeholder="例：Python 自動化腳本" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">我想要換</label>
                <input className="w-full border border-stone-300 rounded-xl px-4 py-2 outline-none focus:border-orange-500 text-sm" placeholder="例：Figma 設計稿" />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-sm font-semibold text-gray-700 mb-1 block">詳細說明</label>
              <textarea className="w-full border border-stone-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500 text-sm min-h-20" placeholder="說明你能提供的服務範圍，以及你希望換到的具體內容..." />
            </div>
            <div className="mt-3 flex gap-3">
              <input className="flex-1 border border-stone-300 rounded-xl px-4 py-2 outline-none focus:border-orange-500 text-sm" placeholder="標籤（用逗號分隔，如：設計,Python）" />
              <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl transition text-sm whitespace-nowrap">
                發布
              </button>
            </div>
          </div>
        )}

        {/* Listings */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map(l => (
            <article key={l.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center text-xl">{l.emoji}</div>
                <div>
                  <p className="font-bold text-gray-900">{l.poster}</p>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{l.category}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="flex-1 bg-green-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-green-600 mb-1">✅ 提供</p>
                  <p className="text-sm font-bold text-gray-800">{l.offer}</p>
                </div>
                <div className="text-gray-400 text-xl self-center">⇄</div>
                <div className="flex-1 bg-blue-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-blue-600 mb-1">🔍 換取</p>
                  <p className="text-sm font-bold text-gray-800">{l.want}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{l.desc}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {l.tags.map(t => (
                  <span key={t} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">#{t}</span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">❤️ {l.likes} 人有興趣</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
                  我想交換
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  )
}
