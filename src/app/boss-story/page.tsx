import type { Metadata } from 'next';

export const metadata: Metadata = { title: '老闆故事 | 智慧轉運站' };

const STORIES = [
  {
    emoji: '👨‍💼',
    name: '陳志遠',
    title: 'SaaS 新創創辦人',
    industry: '科技業',
    story:
      '在創業初期，我最大的痛點是如何在資源有限的情況下快速找到產品市場契合（PMF）。透過智慧轉運站，我發現竟然有 847 人有同樣的困境。我提交了我用 AI 工具做客戶訪談分析的解法，獲得了 500 智慧幣，更重要的是，我因此認識了三位有互補技能的共同創辦人。現在我們的產品已有 5000 用戶，月收入突破 30 萬台幣。',
  },
  {
    emoji: '👩‍🍳',
    name: '林美慧',
    title: '餐飲品牌創辦人',
    industry: '餐飲業',
    story:
      '我在痛點中心分享了「實體店面客流量難以預測」的問題，沒想到獲得了 1200 個共鳴。一位 AI 工程師在我的痛點下貢獻了用機器學習預測客流的解法，我按照方法調整了排班與備料策略，食材浪費降低了 35%，利潤提升了 22%。現在我也開始在平台分享餐飲業的 AI 應用心得，成為最活躍的知識貢獻者之一。',
  },
  {
    emoji: '🧑‍🎨',
    name: '王子軒',
    title: '設計工作室負責人',
    industry: '創意設計業',
    story:
      '身為自由工作者轉型工作室的創辦人，接案報價一直是我的噩夢。我在平台分享了這個痛點，社群給了我很多 AI 輔助報價的解法。更驚喜的是，透過平台認識了兩個對我工作室感興趣的客戶。現在我用智慧幣兌換了 AI 設計工具訂閱，工作效率提升了 50%，工作室規模從 2 人擴展到 8 人。',
  },
];

export default function BossStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">👔 老闆故事</h1>
        <p className="text-gray-500 mb-8">真實創業者如何用智慧轉運站解決最棘手的商業痛點</p>

        <div className="space-y-6">
          {STORIES.map((story, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
                  {story.emoji}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">{story.name}</div>
                  <div className="text-sm text-gray-500">{story.title}</div>
                  <div className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full inline-block mt-1">
                    {story.industry}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-600 text-sm leading-relaxed border-l-4 border-orange-300 pl-4">
                {story.story}
              </blockquote>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">你的故事也可以在這裡發生</h3>
          <p className="text-sm mb-4 opacity-90">分享你的痛點，找到你的解法，成為下一個成功故事</p>
          <a href="/pain-point-hub" className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-xl hover:bg-orange-50 inline-block">
            開始分享痛點
          </a>
        </div>
      </div>
    </div>
  );
}
