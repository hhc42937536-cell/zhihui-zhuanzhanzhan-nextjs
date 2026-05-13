import type { Metadata } from 'next'

export const metadata: Metadata = { title: '免責聲明 | 智慧轉運站' }
export const dynamic = 'force-static'

const SECTIONS = [
  {
    num: '1',
    title: '內容正確性',
    body: '本平台之內容（包含解法展示牆與學習轉運）可能包含由 AI 生成之資訊。我們力求精準，但不保證所有資訊之正確性、完整性或即時性。使用者應自行評估資訊風險，並在做出任何重要決策前查證資訊來源，諮詢相關領域的專業人士。',
    tip: '建議：重要決策請務必諮詢具執照的專業人士，平台內容僅供參考與啟發。',
  },
  {
    num: '2',
    title: '商業決策與投資風險',
    body: '「智慧轉運站」旨在啟發商機，平台上的任何建議、工具或案例研究均不構成專業的財務、法律或投資諮詢。任何商業決策或投資行為均存在風險，使用者需自行承擔相關後果。本平台不對因使用平台資訊而產生的任何損失負責。',
    tip: '警示：投資涉及風險，過去績效不代表未來結果，請謹慎評估。',
  },
  {
    num: '3',
    title: '外部連結',
    body: '本平台可能包含第三方網站連結。這些連結僅供參考，我們不對第三方網站之內容、準確性或可靠性負責。點擊外部連結即表示使用者自行承擔風險，應查閱各第三方網站的隱私政策與服務條款。',
    tip: '提示：外部連結由社群成員推薦，平台不為其內容背書。',
  },
  {
    num: '4',
    title: '用戶生成內容',
    body: '平台上的痛點分享、解法投稿與討論內容由用戶自行發布。這些內容代表個人觀點，不代表「智慧轉運站」立場。平台保留審核、修改或移除不當內容的權利，但不對用戶內容的真實性或適切性作出保證。',
    tip: '聲明：用戶內容僅代表個人意見，請自行判斷資訊可信度。',
  },
  {
    num: '5',
    title: '心理支持限制',
    body: '若平台內容涉及心理健康、情緒困擾等主題，相關討論僅為一般分享，並非專業心理諮詢或治療。如有心理健康需求，請尋求持有執照的心理健康專業人員協助。台灣心理健康諮詢專線：1925（安心專線）。',
    tip: '重要：心理健康問題請尋求專業協助，不宜單靠網路資訊。',
  },
  {
    num: '6',
    title: '服務中斷與資料安全',
    body: '本平台盡力維持穩定運作，但不保證服務永不中斷或完全無誤。平台可能因維護、更新或不可預期的技術問題暫時停止服務。使用者應自行備份重要資料，平台不對因服務中斷導致的資料遺失負責。',
    tip: '建議：重要的工作資料請另外備份，勿完全依賴第三方平台儲存。',
  },
]

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl">
            <span className="text-white text-3xl">⚠️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">免責聲明</h1>
          <p className="text-gray-500 text-sm">最後更新日期：2026 年 1 月</p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🔴</span>
            <div>
              <h3 className="font-bold text-red-900 mb-1">重要提示</h3>
              <p className="text-red-800 text-sm leading-6">使用本平台前，請仔細閱讀以下免責聲明。繼續使用本平台即表示你已充分理解並同意以下條款。</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-10">
          {SECTIONS.map(s => (
            <section key={s.num}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">{s.num}</div>
                <h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
              </div>
              <p className="text-gray-700 leading-7 mb-3">{s.body}</p>
              <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl text-sm text-amber-800">{s.tip}</div>
            </section>
          ))}

          {/* Final */}
          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. 條款修改</h2>
            <p className="text-gray-700 leading-7">「智慧轉運站」保留隨時修改本免責聲明的權利。修改後的條款將在本頁面更新，並更新「最後更新日期」。繼續使用平台即表示接受修改後的條款。如有任何疑問，請透過站內客服聯繫我們。</p>
          </section>
        </div>

        {/* Contact */}
        <div className="mt-8 text-center text-sm text-gray-500">
          如有疑問請參閱
          <a href="/privacy-policy" className="text-orange-500 hover:underline mx-1">隱私政策</a>
          及
          <a href="/terms-of-service" className="text-orange-500 hover:underline mx-1">服務條款</a>
          或聯繫客服。
        </div>

      </div>
    </main>
  )
}
