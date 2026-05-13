import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: '智慧轉運站 - 把痛點變機會',
  description: '分享生活小煩惱，獲得痛痛幣；提供解法工具，賺取智慧幣。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="bg-white text-gray-900 min-h-screen">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-sm">
              <div>
                <p className="font-bold text-gray-700 mb-3">探索</p>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="/pain-point-hub" className="hover:text-orange-500">痛點中心</a></li>
                  <li><a href="/solution-gallery" className="hover:text-orange-500">AI解法實驗室</a></li>
                  <li><a href="/barter-zone" className="hover:text-orange-500">技能交換所</a></li>
                  <li><a href="/boss-story" className="hover:text-orange-500">老闆故事</a></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-3">工具與學習</p>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="/tool-library" className="hover:text-orange-500">工具圖書館</a></li>
                  <li><a href="/education" className="hover:text-orange-500">學習轉運</a></li>
                  <li><a href="/honor-board" className="hover:text-orange-500">榮譽榜</a></li>
                  <li><a href="/coin-shop" className="hover:text-orange-500">兌換商店</a></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-3">積分制度</p>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="/coin-rules" className="hover:text-orange-500">幣種規則</a></li>
                  <li><a href="/faq" className="hover:text-orange-500">常見問題</a></li>
                  <li><a href="/profile" className="hover:text-orange-500">個人帳戶</a></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-3">法律與支援</p>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="/privacy-policy" className="hover:text-orange-500">隱私政策</a></li>
                  <li><a href="/terms-of-service" className="hover:text-orange-500">服務條款</a></li>
                  <li><a href="/disclaimer" className="hover:text-orange-500">免責聲明</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
              <p>✨ 智慧轉運站 — 把生活小煩惱變成大家的樂趣與機會</p>
              <p className="mt-1">© 2026 智慧轉運站. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
