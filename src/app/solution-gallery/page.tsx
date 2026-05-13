'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PAIN_POINTS, SOLUTIONS, type Solution } from '@/lib/mock-data'

const categories = ['全部', '工作效率', 'AI創作', '溝通協作', '投資分析'] as const
const levels = [
  { label: '全部', value: 'all' },
  { label: '基礎 +20💡', value: 'basic' },
  { label: '進階 +50💡', value: 'intermediate' },
  { label: '專家 +100💡', value: 'advanced' },
] as const

const levelText: Record<Solution['level'], string> = {
  basic: '基礎',
  intermediate: '進階',
  advanced: '專家',
}

const levelClass: Record<Solution['level'], string> = {
  basic: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-800',
  advanced: 'bg-orange-100 text-orange-700',
}

const levelReward: Record<Solution['level'], string> = {
  basic: '+20 💡',
  intermediate: '+50 💡',
  advanced: '+100 💡',
}

export default function SolutionGalleryPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>('全部')
  const [level, setLevel] = useState<(typeof levels)[number]['value']>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'tps' | 'likes' | 'latest'>('tps')
  const [showForm, setShowForm] = useState(false)

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return SOLUTIONS.filter(s => {
      const matchCategory = category === '全部' || s.category === category
      const matchLevel = level === 'all' || s.level === level
      const matchSearch = !keyword ||
        s.title.toLowerCase().includes(keyword) ||
        s.description.toLowerCase().includes(keyword) ||
        s.author.toLowerCase().includes(keyword) ||
        s.tools.some(t => t.toLowerCase().includes(keyword))
      return matchCategory && matchLevel && matchSearch
    }).sort((a, b) => {
      if (sort === 'likes') return b.likes - a.likes
      if (sort === 'latest') return b.id - a.id
      return b.tpsScore - a.tpsScore
    })
  }, [category, level, search, sort])

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-900">
      <section className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-600 mb-1">AI 解法實驗室</p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">找到可複製的 AI 工作流</h1>
          <p className="text-gray-500 text-sm">每個解法都來自真實痛點，分享你的解法賺取智慧幣</p>
        </div>

        {/* Flow Intro */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5 mb-6">
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { step: '1', label: '痛點中心', emoji: '😣', desc: '發現或分享真實工作卡點' },
              { step: '2', label: 'AI解法實驗室', emoji: '🧪', desc: '找到對應的 AI 解決方案' },
              { step: '3', label: '解決問題', emoji: '✅', desc: '實際應用，提升效率' },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-xl p-4 border border-orange-100 relative text-center">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">步驟 {item.step}</span>
                <p className="text-2xl mt-2 mb-1">{item.emoji}</p>
                <p className="font-bold text-sm text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3 justify-center flex-wrap">
            <Link href="/pain-point-hub" className="text-sm font-semibold text-orange-600 border border-orange-300 px-5 py-2 rounded-xl hover:bg-orange-50 transition">← 前往痛點中心</Link>
            <button onClick={() => setShowForm(!showForm)} className="text-sm font-semibold text-white bg-orange-500 px-5 py-2 rounded-xl hover:bg-orange-600 transition">投稿解法 賺智慧幣 →</button>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-3">💡 投稿解法，獲得智慧幣</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '基礎解法', reward: '+20 💡', desc: '工具推薦或一句方法', cls: 'border-emerald-200 bg-emerald-50' },
              { label: '中階解法', reward: '+50 💡', desc: '詳細步驟＋簡單案例', cls: 'border-amber-300 bg-amber-50 ring-2 ring-amber-200' },
              { label: '完整流程', reward: '+100 💡', desc: '含模板、影片或 Notion', cls: 'border-orange-200 bg-orange-50' },
            ].map(t => (
              <div key={t.label} className={`border rounded-xl p-3 text-center ${t.cls}`}>
                <p className="text-xl font-bold text-gray-800 mb-0.5">{t.reward}</p>
                <p className="text-sm font-semibold text-gray-700">{t.label}</p>
                <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">TPS 公式：0.5 × 按讚 + 0.4 × 下載 + 0.1 × 收藏 — TPS 越高，額外幣種加成越多</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 mb-6 space-y-3">
          <div className="flex gap-2">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="搜尋解法、工具或作者"
              className="flex-1 min-h-10 rounded-xl border border-stone-300 px-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm"
            />
            <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
              className="border border-stone-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-500">
              <option value="tps">TPS 排行</option>
              <option value="likes">最多喜歡</option>
              <option value="latest">最新</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(item => (
              <button key={item} onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${category === item ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700 hover:bg-amber-100'}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map(item => (
              <button key={item.value} onClick={() => setLevel(item.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${level === item.value ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-700 hover:bg-amber-100'}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-orange-200 shadow-sm p-5 mb-6">
            <h2 className="text-lg font-bold mb-4">投稿你的解法</h2>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <select className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-orange-500 text-sm">
                {PAIN_POINTS.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
              <select className="rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-orange-500 text-sm">
                <option value="basic">基礎（+20 智慧幣）</option>
                <option value="intermediate">進階（+50 智慧幣）</option>
                <option value="advanced">專家（+100 智慧幣）</option>
              </select>
            </div>
            <textarea className="w-full min-h-24 rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-orange-500 text-sm mb-3" placeholder="描述步驟、工具設定與成果（愈詳細愈高分）" />
            <input className="w-full rounded-xl border border-stone-300 px-3 py-2 outline-none focus:border-orange-500 text-sm mb-3" placeholder="參考連結或 Notion 模板 URL（加分項）" />
            <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl text-sm transition">
              送出解法 → 審核通過後發放幣種
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-4">找到 <span className="font-semibold text-gray-700">{filtered.length}</span> 則解法</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">
            <p className="text-2xl mb-2">🔍</p>
            找不到符合條件的解法，成為第一個投稿的人！
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(solution => (
              <article key={solution.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition flex flex-col">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">{solution.category}</span>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${levelClass[solution.level]}`}>{levelText[solution.level]}</span>
                    <span className="text-xs font-bold text-amber-600">{levelReward[solution.level]}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{solution.title}</h3>
                <p className="text-sm leading-6 text-stone-600 line-clamp-3 flex-1">{solution.description}</p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {solution.tools.map(tool => (
                    <span key={tool} className="rounded-full bg-amber-50 px-2.5 py-1 text-xs text-amber-800">#{tool}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm border-t border-stone-50 pt-4">
                  <div className="flex gap-4 text-stone-500">
                    <span><strong className="text-orange-500">TPS {solution.tpsScore}</strong></span>
                    <span>❤️ {solution.likes}</span>
                  </div>
                  <span className="text-xs text-stone-400">by {solution.author}</span>
                </div>
                <button className="mt-3 w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition">
                  查看完整解法 →
                </button>
              </article>
            ))}
          </div>
        )}

        {/* TPS Explanation */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">🔥 TPS 越高，智慧幣越多</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: '❤️', title: '按讚數 ×0.5', desc: '獲得 50+ 讚 → 基礎智慧幣 +30%' },
              { emoji: '⬇️', title: '下載量 ×0.4', desc: '破百下載 → 額外 +50 智慧幣' },
              { emoji: '🔖', title: '收藏數 ×0.1', desc: '持續被收藏 → 每月額外發放' },
            ].map(item => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-4">
                <p className="text-2xl mb-2">{item.emoji}</p>
                <p className="font-bold text-sm text-gray-900 mb-1">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">TPS = 0.5 × 按讚 + 0.4 × 下載量 + 0.1 × 收藏數</p>
        </div>

      </section>
    </main>
  )
}
