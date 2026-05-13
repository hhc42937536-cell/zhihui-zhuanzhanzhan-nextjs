import type { Metadata } from 'next';

export const metadata: Metadata = { title: '幣規則說明 | 智慧轉運站' };

export default function CoinRulesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">💰 幣規則說明</h1>

        {/* Pain Coins */}
        <section className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">🔥 痛痛幣（Pain Coins）</h2>
          <p className="text-sm text-gray-600 mb-4">痛痛幣代表你的共鳴貢獻。當你分享痛點，平台上的人也感同身受，你就獲得報酬。</p>
          <h3 className="font-semibold text-gray-700 mb-2">獲得方式</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">▸</span>
              提交一個新痛點：<strong>+20 幣</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">▸</span>
              你的痛點每獲得 1 個「我也有」按讚：<strong>+2 幣</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">▸</span>
              每日登入簽到：<strong>+5 幣</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">▸</span>
              邀請好友註冊成功：<strong>+30 幣</strong>
            </li>
          </ul>
        </section>

        {/* Wisdom Coins */}
        <section className="bg-teal-50 border border-teal-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-teal-600 mb-3">💡 智慧幣（Wisdom Coins）</h2>
          <p className="text-sm text-gray-600 mb-4">智慧幣代表你的知識貢獻。當你分享解法和工具，幫助他人解決問題，你就獲得報酬。</p>
          <h3 className="font-semibold text-gray-700 mb-2">獲得方式</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">▸</span>
              上傳工具至工具箱：<strong>+50 幣</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">▸</span>
              提交 AI 解法（審核通過）：<strong>+30 幣</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">▸</span>
              你的解法 TPS 分數超過 80：<strong>+額外 20 幣</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">▸</span>
              你上傳的工具每被下載 10 次：<strong>+5 幣</strong>
            </li>
          </ul>
        </section>

        {/* Student Bonus */}
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">🎓 學生身份加成 30%</h2>
          <p className="text-sm text-gray-600 mb-3">
            通過學生身份認證的用戶，每次獲得的<strong>痛痛幣</strong>自動乘以 <strong>1.3 倍</strong>。
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">▸</span>
              提交痛點：20 幣 → <strong className="text-blue-600">26 幣</strong>（+30%）
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">▸</span>
              邀請好友：30 幣 → <strong className="text-blue-600">39 幣</strong>（+30%）
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">▸</span>
              認證方式：上傳有效學生證照片至個人帳號設定頁
            </li>
          </ul>
        </section>

        {/* Spending Rules */}
        <section className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-purple-600 mb-3">🛍️ 使用規則</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">▸</span>
              兩種幣可分別在兌換商店使用，<strong>不可互換</strong>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">▸</span>
              幣不可轉讓給其他用戶
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">▸</span>
              幣不可兌換為現金
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">▸</span>
              帳號停用後，未使用的幣將在 90 天後失效
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">▸</span>
              平台保留修改幣規則的權利，修改前 7 天公告
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
