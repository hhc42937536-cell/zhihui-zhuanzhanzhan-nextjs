'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Profile {
  display_name: string | null
  pain_coins: number
  wisdom_coins: number
  created_at: string
}

const MOCK_HISTORY = [
  { date: '2026-05-14', action: '分享痛點「整理會議紀錄太耗時」', coins: '+20 🍬', type: 'earn' },
  { date: '2026-05-13', action: '回覆解法獲得採納', coins: '+100 💡', type: 'earn' },
  { date: '2026-05-12', action: '兌換「回答加亮標籤」', coins: '-90 🍬', type: 'spend' },
  { date: '2026-05-11', action: '每日登入獎勵', coins: '+5 🍬', type: 'earn' },
  { date: '2026-05-10', action: '回覆解法「JD 對齊履歷改寫法」', coins: '+50 💡', type: 'earn' },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [converting, setConverting] = useState(false)
  const [convertAmt, setConvertAmt] = useState(50)
  const [toast, setToast] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      setEmail(user.email ?? null)
      const { data } = await supabase
        .from('users_profile')
        .select('display_name, pain_coins, wisdom_coins, created_at')
        .eq('id', user.id)
        .single()
      if (data) setProfile(data)
      setLoading(false)
    }
    load()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => load())
    return () => subscription.unsubscribe()
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleConvert = () => {
    if (!profile || convertAmt < 50 || convertAmt > profile.pain_coins) return
    setConverting(true)
    setTimeout(() => {
      setConverting(false)
      showToast(`已換算 ${convertAmt} 痛痛幣 → ${Math.floor(convertAmt / 10)} 智慧幣`)
    }, 800)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!profile) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-xl text-gray-600">請先登入才能查看個人頁</p>
      <Link href="/login" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition">前往登入</Link>
    </div>
  )

  const totalCoins = profile.pain_coins + profile.wisdom_coins
  const badges = [
    { name: '青銅達人', emoji: '🥉', threshold: 100, color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { name: '白銀高手', emoji: '🥈', threshold: 500, color: 'bg-gray-100 text-gray-700 border-gray-300' },
    { name: '黃金大神', emoji: '🥇', threshold: 1000, color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  ]
  const displayName = profile.display_name ?? email?.split('@')[0] ?? '用戶'
  const joinDate = profile.created_at?.slice(0, 10) ?? '2026-01-01'

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Toast */}
        {toast && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
            ✅ {toast}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {displayName[0]?.toUpperCase() ?? '?'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-gray-500 text-sm">{email}</p>
              <p className="text-gray-400 text-xs mt-1">加入日期：{joinDate}</p>
            </div>
          </div>
        </div>

        {/* Coin Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-orange-100 text-center">
            <p className="text-3xl mb-1">🍬</p>
            <p className="text-3xl font-bold text-orange-500">{profile.pain_coins}</p>
            <p className="text-sm text-gray-500 mt-1">痛痛幣</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-amber-100 text-center">
            <p className="text-3xl mb-1">💡</p>
            <p className="text-3xl font-bold text-amber-500">{profile.wisdom_coins}</p>
            <p className="text-sm text-gray-500 mt-1">智慧幣</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <p className="text-3xl mb-1">💰</p>
            <p className="text-3xl font-bold text-gray-700">{totalCoins}</p>
            <p className="text-sm text-gray-500 mt-1">總幣值</p>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🏅 勛章進度</h2>
          <div className="space-y-4">
            {badges.map(b => {
              const progress = Math.min(100, Math.round((totalCoins / b.threshold) * 100))
              const unlocked = totalCoins >= b.threshold
              return (
                <div key={b.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{b.emoji}</span>
                      <span className="font-semibold text-gray-800">{b.name}</span>
                      <span className="text-xs text-gray-400">需 {b.threshold} 幣</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${unlocked ? b.color : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                      {unlocked ? '已解鎖 ✓' : `${progress}%`}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coin Conversion */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-1">🔄 幣種換算</h2>
          <p className="text-sm text-gray-500 mb-4">10 痛痛幣 = 1 智慧幣（最低 50 痛痛幣）</p>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              type="number"
              min={50}
              step={10}
              value={convertAmt}
              onChange={e => setConvertAmt(Number(e.target.value))}
              className="w-32 border border-gray-300 rounded-xl px-4 py-2 text-center font-bold text-orange-500 focus:border-orange-400 outline-none"
            />
            <span className="text-gray-400">痛痛幣 →</span>
            <span className="text-xl font-bold text-amber-500">{Math.floor(convertAmt / 10)} 智慧幣</span>
            <button
              onClick={handleConvert}
              disabled={converting || convertAmt < 50 || convertAmt > profile.pain_coins}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-5 py-2 rounded-xl font-semibold transition"
            >
              {converting ? '換算中...' : '確認換算'}
            </button>
          </div>
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📋 最近活動紀錄</h2>
          <div className="space-y-3">
            {MOCK_HISTORY.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{h.action}</p>
                  <p className="text-xs text-gray-400">{h.date}</p>
                </div>
                <span className={`text-sm font-bold ${h.type === 'earn' ? 'text-green-500' : 'text-red-400'}`}>{h.coins}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { href: '/pain-point-hub', label: '分享痛點', emoji: '😣' },
            { href: '/solution-gallery', label: '提供解法', emoji: '💡' },
            { href: '/coin-shop', label: '兌換商店', emoji: '🛍️' },
            { href: '/honor-board', label: '榮譽榜', emoji: '🏆' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-md transition">
              <p className="text-2xl mb-1">{l.emoji}</p>
              <p className="text-sm font-semibold text-gray-700">{l.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
