import type { Metadata } from 'next';

export const metadata: Metadata = { title: '服務條款 | 智慧轉運站' };

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">服務條款</h1>
        <p className="text-sm text-gray-400 mb-8">最後更新：2025 年 5 月</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">一、平台規則</h2>
          <p className="text-gray-600 leading-relaxed text-sm mb-3">
            使用智慧轉運站即代表您同意遵守以下規則。本平台保留因違規而暫停或終止帳號的權利。
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li>您須年滿 13 歲方可使用本平台</li>
            <li>每人限申請一個帳號</li>
            <li>您須提供真實且準確的資訊</li>
            <li>您對帳號的所有活動負完全責任</li>
            <li>發現帳號遭未授權使用，請立即通知我們</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">二、幣的使用規範</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li>痛痛幣與智慧幣為平台內部虛擬積分，不具貨幣價值</li>
            <li>幣不可轉讓或出售給其他用戶</li>
            <li>幣不可兌換為法定貨幣</li>
            <li>帳號終止後，未使用的幣將在 90 天後失效</li>
            <li>平台保留調整幣獎勵機制的權利，調整前 7 天公告</li>
            <li>以不正當手段獲取幣（如刷單、機器人）將導致帳號停用並沒收所有幣</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">三、禁止行為</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-700 mb-2">以下行為嚴格禁止：</p>
            <ul className="list-disc pl-5 space-y-1 text-red-600 text-sm">
              <li>發布虛假、誤導性、或帶有惡意的痛點或解法</li>
              <li>騷擾、威脅或歧視其他用戶</li>
              <li>上傳含有惡意程式碼的工具或連結</li>
              <li>使用自動化程式（機器人）批量操作</li>
              <li>試圖繞過平台安全機制或未授權存取他人帳號</li>
              <li>發布任何侵犯第三方智慧財產權的內容</li>
              <li>利用平台進行商業廣告或垃圾訊息散布</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">四、內容版權</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            您在本平台發布的內容（痛點、解法、工具描述等）版權歸您所有。
            但您授予本平台非排他性、免版稅的使用權，用於展示、傳播及改善平台服務。
            您保證您發布的內容不侵犯任何第三方的智慧財產權。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">五、免責聲明</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            本平台上的解法與工具由用戶貢獻，我們不保證其準確性或適用性。
            使用任何解法或工具前，請自行評估風險。本平台不承擔因使用平台內容
            而產生的任何直接或間接損失。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">六、條款修改</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            我們保留隨時修改本服務條款的權利。重大修改將在生效前 7 天透過電子郵件或
            平台公告通知。繼續使用本平台即表示您接受修改後的條款。
          </p>
        </section>

        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-500">
          如有任何疑問，請聯絡：<a href="mailto:legal@zhihui.tw" className="text-orange-500 hover:underline">legal@zhihui.tw</a>
        </div>
      </div>
    </div>
  );
}
