import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '積分規則 | 智慧轉運站' }
export const dynamic = 'force-static'

const EARN_RULES = [
  { action: '每日登入', pain: '+5 🍬', wisdom: '—', note: '每日一次' },
  { action: '分享痛點', pain: '+20 🍬', wisdom: '—', note: '每篇審核通過後發放' },
  { action: '痛點被採用（獲 10+ 喜歡）', pain: '+50 🍬', wisdom: '—', note: '達標自動發放' },
  { action: '提供解法', pain: '—', wisdom: '+50 💡', note: '每篇審核通過後' },
  { action: '解法被採納（發問者選擇）', pain: '—', wisdom: '+100 💡', note: '發問者確認後' },
  { action: '解法獲得 20+ 喜歡', pain: '—', wisdom: '+30 💡', note: '達標自動發放' },
  { action: '邀請好友成功註冊', pain: '+100 🍬', wisdom: '+20 💡', note: '好友完成首次分享後' },
  { action: '完成個人資料', pain: '+30 🍬', wisdom: '—', note: '一次性獎勵' },
  { action: '連續登入 7 天', pain: '+50 🍬', wisdom: '+10 💡', note: '週獎勵' },
  { action: '上架工具', pain: '—', wisdom: '+80 💡', note: '工具審核通過後' },
]

const BADGE_LEVELS = [
  { name: '青銅達人', emoji: '🥉', threshold: 100, perks: ['優先顯示痛點', '基礎回覆標籤'], color: 'from-amber-700 to-amber-500' },
  { name: '白銀高手', emoji: '🥈', threshold: 500, perks: ['解法加亮顯示', '專屬銀色邊框', '進階篩選工具'], color: 'from-gray-500 to-gray-400' },
  { name: '黃金大神', emoji: '🥇', threshold: 1000, perks: ['首頁推薦曝光', '金色大師標籤', '優先兌換商店', '每月加碼獎勵'], color: 'from-yellow-500 to-amber-400' },
  { name: '鑽石傳說', emoji: '💎', threshold: 5000, perks: ['終身 VIP 待遇', '獨家鑽石框', '每季實體周邊', '協助出題決策'], color: 'from-cyan-500 to-blue-500' },
]

const FAQS = [
  { q: '痛痛幣可以直接兌換現金嗎？', a: '不能。痛痛幣是平台內部積分，只能兌換智慧幣或商城道具。' },
  { q: '智慧幣會過期嗎？', a: '目前不會過期。但平台政策可能調整，屆時會提前 30 天公告。' },
  { q: '我提交的痛點/解法沒被審核怎麼辦？', a: '一般 24 小時內審核。若超過請至個人頁查看狀態，或聯繫客服。' },
  { q: '可以同一篇痛點多次獲得幣嗎？', a: '「分享痛點」獎勵只算一次；但若持續獲得喜歡達新門檻，系統會追加發放。' },
  { q: '兌換商城的道具如何使用？', a: '兌換後系統自動掛載至你的帳號，在對應功能處即可看到效果。' },
]

export default function CoinRulesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3 opacity-80">幣種系統說明</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">智慧轉運站<br />積分規則</h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">分享痛點賺痛痛幣，提供解法賺智慧幣。兩種幣種，雙向流通，讓你的每一個貢獻都有回報。</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: '活躍用戶', value: '2,800+' },
              { label: '已發放痛痛幣', value: '128K' },
              { label: '已發放智慧幣', value: '45K' },
              { label: '解法採納率', value: '73%' },
            ].map(s => (
              <div key={s.label} className="bg-white/20 rounded-2xl p-4">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs opacity-80 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* Dual Coin Intro */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🪙 雙幣制度</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <p className="text-4xl mb-3">🍬</p>
              <h3 className="text-xl font-bold text-orange-600 mb-2">痛痛幣</h3>
              <p className="text-gray-700 text-sm leading-6">代表你「提出需求」的貢獻值。每次分享工作卡點、生活痛苦，系統就獎勵你痛痛幣，鼓勵大家誠實說出困境。</p>
              <div className="mt-4 text-sm text-orange-700 bg-orange-100 rounded-xl px-4 py-2">可轉換為智慧幣（10 : 1）</div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <p className="text-4xl mb-3">💡</p>
              <h3 className="text-xl font-bold text-amber-600 mb-2">智慧幣</h3>
              <p className="text-gray-700 text-sm leading-6">代表你「貢獻解法」的智識價值。每次提供被採納的解法、工具，系統發放智慧幣，肯定你對社群的實際幫助。</p>
              <div className="mt-4 text-sm text-amber-700 bg-amber-100 rounded-xl px-4 py-2">可在商城兌換進階功能 &amp; 道具</div>
            </div>
          </div>
        </section>

        {/* Conversion */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">🔄 幣種換算規則</h2>
          <p className="text-gray-500 text-sm mb-4">痛痛幣可兌換智慧幣，最低門檻 50 痛痛幣。</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3 bg-orange-50 rounded-xl px-6 py-4">
              <span className="text-2xl">🍬</span>
              <span className="text-2xl font-bold text-orange-500">50</span>
              <span className="text-gray-500">痛痛幣</span>
            </div>
            <span className="text-2xl text-gray-400 font-bold">→</span>
            <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-6 py-4">
              <span className="text-2xl">💡</span>
              <span className="text-2xl font-bold text-amber-500">5</span>
              <span className="text-gray-500">智慧幣</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-3">每 10 痛痛幣 = 1 智慧幣，換算後痛痛幣相應扣除。</p>
        </section>

        {/* Earning Table */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 賺幣方式一覽</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">行動</th>
                    <th className="text-center py-4 px-4 font-semibold text-orange-500">痛痛幣</th>
                    <th className="text-center py-4 px-4 font-semibold text-amber-500">智慧幣</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-400">備註</th>
                  </tr>
                </thead>
                <tbody>
                  {EARN_RULES.map((r, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="py-4 px-6 text-gray-800">{r.action}</td>
                      <td className="py-4 px-4 text-center font-semibold text-orange-500">{r.pain}</td>
                      <td className="py-4 px-4 text-center font-semibold text-amber-500">{r.wisdom}</td>
                      <td className="py-4 px-4 text-gray-400 text-xs">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Badge Levels */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏅 勛章等級</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {BADGE_LEVELS.map(b => (
              <div key={b.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${b.color}`} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{b.emoji}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{b.name}</h3>
                      <p className="text-xs text-gray-400">累積 {b.threshold.toLocaleString()} 幣解鎖</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {b.perks.map(p => (
                      <li key={p} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-green-500">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ 常見問題</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                <summary className="px-6 py-4 font-semibold text-gray-800 cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-6 pb-4 text-sm text-gray-600 leading-6">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">準備好賺取你的第一批幣了嗎？</h2>
          <p className="opacity-90 mb-6">分享你的第一個痛點，立刻獲得 +20 痛痛幣</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/pain-point-hub" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition">分享痛點</Link>
            <Link href="/coin-shop" className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition">前往商城</Link>
          </div>
        </section>

      </div>
    </main>
  )
}
