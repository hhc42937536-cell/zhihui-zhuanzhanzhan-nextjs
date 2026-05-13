'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQ_GROUPS = [
  {
    group: '帳號與登入',
    emoji: '👤',
    items: [
      { q: '如何註冊帳號？', a: '點選右上角「登入」，選擇「Email 註冊」，填入信箱與密碼即可。目前支援 Email 登入，Google / LINE 第三方登入即將推出。' },
      { q: '忘記密碼怎麼辦？', a: '在登入頁點選「忘記密碼」，輸入你的 Email，系統會寄送重設連結。連結有效期為 1 小時。' },
      { q: '可以修改顯示名稱嗎？', a: '可以。前往「個人頁面」，點擊名稱旁的編輯按鈕，即可更新顯示名稱。' },
    ],
  },
  {
    group: '痛痛幣與智慧幣',
    emoji: '🪙',
    items: [
      { q: '痛痛幣和智慧幣有什麼差別？', a: '痛痛幣是「分享痛點」獎勵，代表你提出需求的貢獻；智慧幣是「提供解法」獎勵，代表你的智識價值。兩者可在商城兌換不同道具。' },
      { q: '幣種會過期嗎？', a: '目前兩種幣種均不設過期限制。如未來政策調整，將提前 30 天公告。' },
      { q: '痛痛幣如何換成智慧幣？', a: '前往「個人頁面」的幣種換算區，最低 50 痛痛幣可換 5 智慧幣（10:1 比率）。' },
      { q: '幣種可以轉讓給他人嗎？', a: '目前不支援幣種轉讓。每個帳號的幣種為獨立持有。' },
    ],
  },
  {
    group: '痛點與解法',
    emoji: '💡',
    items: [
      { q: '分享痛點有字數限制嗎？', a: '標題最多 50 字，描述最多 500 字。請盡量具體說明你的流程卡點、期望達成的目標，讓其他人更容易提供有效解法。' },
      { q: '我的痛點多久會被審核？', a: '一般情況下 24 小時內完成審核。若超過 48 小時未更新，請至個人頁查看狀態或聯繫客服。' },
      { q: '解法被採納代表什麼？', a: '代表發問者認為你的回覆直接解決了他們的問題，你將額外獲得 +100 智慧幣的採納獎勵。' },
      { q: '可以刪除自己發布的痛點嗎？', a: '目前不支援刪除功能。若內容有誤或需要更新，可透過客服申請修改。' },
    ],
  },
  {
    group: '商城兌換',
    emoji: '🛍️',
    items: [
      { q: '商城道具兌換後可以退款嗎？', a: '所有幣種兌換均為不可逆操作，請在確認後再進行兌換。如遇系統錯誤，請聯繫客服。' },
      { q: '兌換的道具如何使用？', a: '兌換成功後，道具將自動掛載至你的帳號。標籤類道具會出現在你的回覆旁，流量加速道具則由系統自動執行。' },
      { q: '商城多久更新一次？', a: '商城道具每月更新一次，特殊節慶時會推出限定道具。建議關注站內公告。' },
    ],
  },
]

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (key: string) => setOpen(open === key ? null : key)

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-orange-600 mb-2">常見問題</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">FAQ 常見問答</h1>
          <p className="text-gray-500">找不到你要的答案？<Link href="/coin-rules" className="text-orange-500 underline">查看積分規則</Link>或聯繫我們。</p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-8">
          {FAQ_GROUPS.map(g => (
            <section key={g.group}>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                <span>{g.emoji}</span>{g.group}
              </h2>
              <div className="space-y-2">
                {g.items.map((item, idx) => {
                  const key = `${g.group}-${idx}`
                  const isOpen = open === key
                  return (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full px-6 py-4 text-left font-semibold text-gray-800 flex items-center justify-between hover:bg-gray-50 transition"
                      >
                        <span>{item.q}</span>
                        <span className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-sm text-gray-600 leading-7 border-t border-gray-50">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-amber-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">還有其他問題？</h2>
          <p className="opacity-90 text-sm mb-6">我們的團隊會在 24 小時內回覆你的問題。</p>
          <a
            href="mailto:support@zhihuizhuanzhanzhan.com"
            className="bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition inline-block"
          >
            聯繫客服
          </a>
        </div>

      </div>
    </main>
  )
}
