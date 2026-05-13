'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: '什麼是智慧轉運站？',
    a: '智慧轉運站是一個讓用戶分享生活與工作痛點、交流 AI 解法的社群平台。你可以賺取痛痛幣與智慧幣，並用來兌換各種實用獎勵。',
  },
  {
    q: '痛痛幣和智慧幣有什麼區別？',
    a: '痛痛幣是分享痛點時獲得的幣，象徵你的共鳴貢獻；智慧幣是提供解法或上傳工具時獲得的幣，象徵你的知識貢獻。兩種幣都可以在兌換商店使用。',
  },
  {
    q: '如何獲得痛痛幣？',
    a: '在「痛點中心」提交一個痛點可獲得 20 痛痛幣。學生身份認證後，每次獲得的痛痛幣額外加成 30%。',
  },
  {
    q: '如何獲得智慧幣？',
    a: '在「工具箱」上傳工具可獲得 50 智慧幣；在痛點下提交解法也可獲得智慧幣。持續貢獻可累積更多。',
  },
  {
    q: '學生身份認證的 30% 加成如何運作？',
    a: '通過學生身份認證後，系統會自動對每次獲得的痛痛幣乘以 1.3 倍。例如原本獲得 20 幣，認證後可獲得 26 幣。',
  },
  {
    q: '如何兌換商店的獎勵？',
    a: '前往「兌換商店」，確認你有足夠的幣餘額後點選「立即兌換」。系統會自動從你的帳戶扣除對應幣數並記錄交易。',
  },
  {
    q: '我的帳戶資料安全嗎？',
    a: '我們使用 Supabase 提供的企業級資料加密與安全認證機制，你的個人資料受到嚴格保護。詳情請參閱隱私政策。',
  },
  {
    q: '如果我忘記密碼怎麼辦？',
    a: '在登入頁面點選「忘記密碼」，輸入你的電子郵件，系統會發送重設密碼連結到你的信箱。',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">❓ 常見問題</h1>
        <p className="text-gray-500 mb-8">有任何疑問？以下是最常見的問題解答。</p>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800">{faq.q}</span>
                <span className={`text-orange-500 text-xl transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-orange-50 rounded-xl p-5 text-center">
          <p className="text-gray-600 text-sm mb-2">找不到你的問題？</p>
          <a href="mailto:support@zhihui.tw" className="text-orange-600 font-medium hover:underline">
            聯絡我們的支援團隊
          </a>
        </div>
      </div>
    </div>
  );
}
