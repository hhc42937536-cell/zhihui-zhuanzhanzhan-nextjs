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
        <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 space-y-2">
            <p>✨ 智慧轉運站 — 把生活小煩惱變成大家的樂趣與機會</p>
            <div className="flex justify-center gap-6 mt-2">
              <a href="/privacy-policy" className="hover:text-orange-500">隱私政策</a>
              <a href="/terms-of-service" className="hover:text-orange-500">服務條款</a>
              <a href="/faq" className="hover:text-orange-500">常見問題</a>
              <a href="/coin-rules" className="hover:text-orange-500">幣規則</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
