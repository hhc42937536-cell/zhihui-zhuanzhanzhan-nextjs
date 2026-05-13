import type { Metadata } from 'next';

export const metadata: Metadata = { title: '隱私政策 | 智慧轉運站' };

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto prose prose-gray">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">隱私政策</h1>
        <p className="text-sm text-gray-400 mb-8">最後更新：2025 年 5 月</p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">一、資料收集</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            當您使用智慧轉運站（以下簡稱「本平台」）時，我們可能收集以下資料：
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li>帳號資訊：電子郵件地址、使用者名稱、頭像</li>
            <li>使用者內容：您提交的痛點、解法、上傳的工具</li>
            <li>交易紀錄：幣的獲得與兌換歷程</li>
            <li>裝置資訊：瀏覽器類型、IP 位址、存取時間（用於安全分析）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">二、使用方式</h2>
          <p className="text-gray-600 leading-relaxed mb-3">我們使用收集的資料用於：</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li>提供、維護及改善本平台的服務</li>
            <li>處理幣的計算與兌換交易</li>
            <li>發送服務相關通知（帳號驗證、安全警示等）</li>
            <li>分析使用模式以優化用戶體驗</li>
            <li>偵測並防止詐欺或濫用行為</li>
          </ul>
          <p className="text-gray-600 text-sm mt-3">
            我們<strong>不會</strong>將您的個人資料出售給第三方，亦不會在未經同意的情況下用於行銷目的。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">三、保護措施</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li>所有資料儲存於 Supabase 提供的加密資料庫，符合企業級安全標準</li>
            <li>帳號密碼採用業界標準雜湊演算法加密儲存</li>
            <li>所有資料傳輸均通過 HTTPS/TLS 加密</li>
            <li>定期進行安全審查與漏洞掃描</li>
            <li>員工存取用戶資料受嚴格的最小權限原則限制</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">四、您的權利</h2>
          <p className="text-gray-600 leading-relaxed mb-3">依據適用的隱私法規，您擁有以下權利：</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li><strong>查閱權</strong>：您可以要求查看我們持有的您的個人資料</li>
            <li><strong>更正權</strong>：您可以要求更正不正確的個人資料</li>
            <li><strong>刪除權</strong>：您可以要求刪除您的帳號及相關資料</li>
            <li><strong>可攜權</strong>：您可以要求以結構化格式匯出您的資料</li>
            <li><strong>反對權</strong>：您可以反對特定方式處理您的資料</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">五、聯絡我們</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            如您對本隱私政策有任何疑問，或希望行使上述權利，請聯絡我們：
          </p>
          <div className="mt-3 bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            <p>電子郵件：<a href="mailto:privacy@zhihui.tw" className="text-orange-500 hover:underline">privacy@zhihui.tw</a></p>
            <p className="mt-1">回覆時間：工作日 3 個工作天內</p>
          </div>
        </section>
      </div>
    </div>
  );
}
