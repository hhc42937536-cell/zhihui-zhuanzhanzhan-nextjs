import type { Metadata } from 'next';

export const metadata: Metadata = { title: '學習轉運 | 智慧轉運站' };

const STUDENT_CASES = [
  {
    name: '小明',
    school: '台灣大學',
    result: '透過 AI 解法將報告時間縮短 60%，期末成績從 B 躍升 A+',
    emoji: '🎓',
  },
  {
    name: '雅婷',
    school: '成功大學',
    result: '利用工具箱找到高效筆記工具，考研上榜率提升 40%',
    emoji: '📖',
  },
  {
    name: '建宏',
    school: '政治大學',
    result: '分享學習痛點獲得 200 痛痛幣，兌換線上課程折扣，省下 3000 元',
    emoji: '💡',
  },
  {
    name: '欣儀',
    school: '交通大學',
    result: '用智慧幣兌換 AI 工具訂閱，論文研究效率提升 3 倍',
    emoji: '🔬',
  },
];

const TEACHER_CASES = [
  {
    name: '王老師',
    subject: '英文教學',
    result: '分享 20 個 AI 教案解法，累積 800 智慧幣，獲得平台年度優秀貢獻者',
    emoji: '👩‍🏫',
  },
  {
    name: '陳老師',
    subject: '數學補習',
    result: '建立痛點資料庫，協助 300 名學生定位學習卡點，轉介率提升 50%',
    emoji: '📐',
  },
  {
    name: '林老師',
    subject: '程式設計',
    result: '上傳 15 個程式教學工具，累積 750 智慧幣，兌換高級 AI 訂閱服務',
    emoji: '💻',
  },
  {
    name: '黃老師',
    subject: '語文寫作',
    result: '透過平台媒合 50 個一對一輔導案，月增額外收入 25,000 元',
    emoji: '✍️',
  },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">📚 學習轉運</h1>
        <p className="text-gray-600 mb-2">
          學生身份享有 <span className="font-bold text-teal-600">痛痛幣 +30% 加成</span>，讓學習更有價值！
        </p>
        <div className="inline-block bg-teal-100 text-teal-700 text-sm px-4 py-1.5 rounded-xl mb-8 font-medium">
          🎓 學生認證後，每次獲得的痛痛幣自動加成 30%
        </div>

        {/* Student Cases */}
        <h2 className="text-xl font-bold text-blue-600 mb-4">學生成功案例</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {STUDENT_CASES.map((c) => (
            <div key={c.name} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-blue-400">
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="font-semibold text-gray-800">{c.name} <span className="text-sm text-gray-400">· {c.school}</span></div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{c.result}</p>
            </div>
          ))}
        </div>

        {/* Teacher Cases */}
        <h2 className="text-xl font-bold text-teal-600 mb-4">教師成功案例</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEACHER_CASES.map((c) => (
            <div key={c.name} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-teal-400">
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="font-semibold text-gray-800">{c.name} <span className="text-sm text-gray-400">· {c.subject}</span></div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{c.result}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">立即加入，開啟你的學習轉運旅程</h3>
          <p className="text-sm mb-4 opacity-90">學生認證享 30% 加成，教師分享解法獲得豐厚智慧幣</p>
          <a href="/register" className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-50 inline-block">
            免費註冊
          </a>
        </div>
      </div>
    </div>
  );
}
