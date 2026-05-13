'use client'

import { useMemo, useState } from 'react'

type Period = 'week' | 'month' | 'total'
type RankingType = 'overall' | 'replies' | 'painCoins' | 'wisdomCoins'

interface RankingUser {
  id: number
  user: string
  avatar: string
  coins: number
  replies: number
  likes: number
  painCoins: number
  wisdomCoins: number
}

const CHECKIN = { streak: 5, total: 23, longest: 12 }

const data: Record<Period, RankingUser[]> = {
  week: [
    { id: 1, user: '流程拆解王 Aki', avatar: 'A', coins: 980, replies: 18, likes: 246, painCoins: 320, wisdomCoins: 660 },
    { id: 2, user: 'PM 小林', avatar: '小', coins: 860, replies: 14, likes: 221, painCoins: 410, wisdomCoins: 450 },
    { id: 3, user: '自動化 Leo', avatar: 'L', coins: 790, replies: 16, likes: 198, painCoins: 260, wisdomCoins: 530 },
    { id: 4, user: '投資阿哲', avatar: '哲', coins: 620, replies: 9, likes: 174, painCoins: 210, wisdomCoins: 410 },
    { id: 5, user: '內容 Mina', avatar: 'M', coins: 590, replies: 11, likes: 166, painCoins: 240, wisdomCoins: 350 },
    { id: 6, user: '新創 Iris', avatar: 'I', coins: 510, replies: 8, likes: 142, painCoins: 190, wisdomCoins: 320 },
    { id: 7, user: 'Growth Leo', avatar: 'G', coins: 480, replies: 7, likes: 131, painCoins: 175, wisdomCoins: 305 },
    { id: 8, user: '書瑋', avatar: '書', coins: 420, replies: 6, likes: 118, painCoins: 150, wisdomCoins: 270 },
  ],
  month: [
    { id: 1, user: '流程拆解王 Aki', avatar: 'A', coins: 3880, replies: 64, likes: 1024, painCoins: 1260, wisdomCoins: 2620 },
    { id: 2, user: '自動化 Leo', avatar: 'L', coins: 3420, replies: 58, likes: 931, painCoins: 1040, wisdomCoins: 2380 },
    { id: 3, user: 'PM 小林', avatar: '小', coins: 3160, replies: 47, likes: 882, painCoins: 1510, wisdomCoins: 1650 },
    { id: 4, user: '內容 Mina', avatar: 'M', coins: 2750, replies: 43, likes: 746, painCoins: 980, wisdomCoins: 1770 },
    { id: 5, user: '投資阿哲', avatar: '哲', coins: 2410, replies: 31, likes: 690, painCoins: 870, wisdomCoins: 1540 },
    { id: 6, user: '新創 Iris', avatar: 'I', coins: 2100, replies: 28, likes: 620, painCoins: 790, wisdomCoins: 1310 },
    { id: 7, user: 'Growth Leo', avatar: 'G', coins: 1980, replies: 25, likes: 580, painCoins: 720, wisdomCoins: 1260 },
    { id: 8, user: '書瑋', avatar: '書', coins: 1760, replies: 22, likes: 510, painCoins: 640, wisdomCoins: 1120 },
  ],
  total: [
    { id: 1, user: '流程拆解王 Aki', avatar: 'A', coins: 18880, replies: 312, likes: 6040, painCoins: 5920, wisdomCoins: 12960 },
    { id: 2, user: '自動化 Leo', avatar: 'L', coins: 16420, replies: 286, likes: 5488, painCoins: 4860, wisdomCoins: 11560 },
    { id: 3, user: 'PM 小林', avatar: '小', coins: 15160, replies: 244, likes: 5021, painCoins: 6880, wisdomCoins: 8280 },
    { id: 4, user: '內容 Mina', avatar: 'M', coins: 13750, replies: 226, likes: 4596, painCoins: 4320, wisdomCoins: 9430 },
    { id: 5, user: '投資阿哲', avatar: '哲', coins: 12410, replies: 181, likes: 3910, painCoins: 3880, wisdomCoins: 8530 },
    { id: 6, user: '新創 Iris', avatar: 'I', coins: 10890, replies: 156, likes: 3420, painCoins: 3240, wisdomCoins: 7650 },
    { id: 7, user: 'Growth Leo', avatar: 'G', coins: 9760, replies: 143, likes: 3180, painCoins: 2980, wisdomCoins: 6780 },
    { id: 8, user: '書瑋', avatar: '書', coins: 8430, replies: 128, likes: 2840, painCoins: 2560, wisdomCoins: 5870 },
  ],
}

const periodTabs: { label: string; value: Period }[] = [
  { label: '本週', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '總榜', value: 'total' },
]

const typeTabs: { label: string; value: RankingType }[] = [
  { label: '綜合排名', value: 'overall' },
  { label: '最佳回覆', value: 'replies' },
  { label: '痛痛幣', value: 'painCoins' },
  { label: '智慧幣', value: 'wisdomCoins' },
]

const MEDALS = ['🥇', '🥈', '🥉']
const PODIUM_ORDER = [1, 0, 2] // 銀金銅順序（左中右：2nd 1st 3rd）
const PODIUM_HEIGHT = ['h-24', 'h-32', 'h-20']
const PODIUM_LABEL = ['第 2 名', '第 1 名', '第 3 名']

export default function HonorBoardPage() {
  const [period, setPeriod] = useState<Period>('week')
  const [rankingType, setRankingType] = useState<RankingType>('overall')

  const ranking = useMemo(() => {
    return [...data[period]].sort((a, b) => {
      if (rankingType === 'overall') return (b.coins + b.likes + b.replies * 10) - (a.coins + a.likes + a.replies * 10)
      return b[rankingType] - a[rankingType]
    })
  }, [period, rankingType])

  const topThree = ranking.slice(0, 3)

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold text-orange-600 mb-2">榮譽榜</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">🏆 轉運英雄榜</h1>
          <p className="text-gray-500">感謝每位解憂店主的貢獻，讓痛點找到出路</p>
        </div>

        {/* Check-in Streak */}
        <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold opacity-80 mb-1">👑 本週轉運王挑戰</p>
              <h2 className="text-2xl font-bold mb-1">連續 7 天打卡</h2>
              <p className="text-sm opacity-80">完成解鎖 +50 痛痛幣 + +5 智慧幣</p>
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between text-xs opacity-80 mb-2">
                <span>已連續 {CHECKIN.streak} 天</span>
                <span>{CHECKIN.streak}/7</span>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${(CHECKIN.streak / 7) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[1,2,3,4,5,6,7].map(day => (
                  <div key={day} className="text-center">
                    <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                      day <= CHECKIN.streak ? 'bg-white text-orange-500 shadow-md' : 'bg-white/20 text-white/60'
                    } ${day === CHECKIN.streak ? 'ring-2 ring-white scale-110' : ''}`}>
                      {day <= CHECKIN.streak ? '✓' : day === 7 ? '👑' : day}
                    </div>
                    <p className="text-xs mt-1 opacity-70">D{day}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/20 rounded-xl px-4 py-3">
                <p className="text-2xl font-bold">{CHECKIN.total}</p>
                <p className="text-xs opacity-80">累計天數</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-3">
                <p className="text-2xl font-bold">{CHECKIN.longest}</p>
                <p className="text-xs opacity-80">最長連打</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {periodTabs.map(t => (
              <button key={t.value} onClick={() => setPeriod(t.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${period === t.value ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-700 hover:bg-amber-100'}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {typeTabs.map(t => (
              <button key={t.value} onClick={() => setRankingType(t.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${rankingType === t.value ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-amber-100'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Podium */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">🌟 本週之星</h2>
          <div className="flex items-end justify-center gap-4 mb-4">
            {PODIUM_ORDER.map((rankIdx, podiumPos) => {
              const member = topThree[rankIdx]
              if (!member) return null
              return (
                <div key={member.id} className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-lg mb-2 ${rankIdx === 0 ? 'bg-yellow-400 text-yellow-900 ring-4 ring-yellow-300' : rankIdx === 1 ? 'bg-gray-300 text-gray-700 ring-2 ring-gray-200' : 'bg-amber-600 text-amber-100 ring-2 ring-amber-400'}`}>
                    {member.avatar}
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{member.user}</p>
                  <p className="text-xs text-gray-400 mb-2">{member.coins.toLocaleString()} 幣</p>
                  <div className={`${PODIUM_HEIGHT[podiumPos]} w-20 rounded-t-xl flex items-start justify-center pt-2 ${rankIdx === 0 ? 'bg-yellow-400' : rankIdx === 1 ? 'bg-gray-300' : 'bg-amber-500'}`}>
                    <span className="text-xl">{MEDALS[rankIdx]}</span>
                  </div>
                  <div className="w-20 h-6 bg-gray-200 rounded-b-xl flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">{PODIUM_LABEL[podiumPos]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Full Ranking Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">完整排行榜</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {ranking.map((member, idx) => (
              <div key={member.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition ${idx < 3 ? 'bg-amber-50/40' : ''}`}>
                <div className={`w-8 text-center font-black text-lg ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-gray-300'}`}>
                  {idx < 3 ? MEDALS[idx] : `#${idx + 1}`}
                </div>
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 flex-shrink-0">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{member.user}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
                  <span><span className="font-semibold text-gray-800">{member.replies}</span> 回覆</span>
                  <span><span className="font-semibold text-gray-800">{member.likes}</span> 喜歡</span>
                  <span className="text-orange-500 font-bold">🍬 {member.painCoins.toLocaleString()}</span>
                  <span className="text-amber-500 font-bold">💡 {member.wisdomCoins.toLocaleString()}</span>
                </div>
                <div className="font-bold text-gray-700">{member.coins.toLocaleString()} 幣</div>
              </div>
            ))}
          </div>
        </div>

        {/* How to climb */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">🚀 如何登上榮譽榜？</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { emoji: '😣', title: '分享痛點', desc: '每篇 +20 痛痛幣，被喜歡達 10+ 再加 +50', color: 'bg-orange-50 border-orange-100' },
              { emoji: '💡', title: '提供解法', desc: '每篇 +50 智慧幣，被採納 +100，喜歡 20+ 再加 +30', color: 'bg-amber-50 border-amber-100' },
              { emoji: '🔥', title: '連續簽到', desc: '每日 +5 痛痛幣，7 天連打再得 +50 痛痛幣 +5 智慧幣', color: 'bg-red-50 border-red-100' },
            ].map(item => (
              <div key={item.title} className={`${item.color} border rounded-xl p-4`}>
                <p className="text-2xl mb-2">{item.emoji}</p>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
