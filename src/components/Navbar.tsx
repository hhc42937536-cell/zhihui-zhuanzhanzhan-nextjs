'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { UserProfile } from '@/lib/types'

export default function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        const { data } = await supabase
          .from('users_profile')
          .select('*')
          .eq('id', authUser.id)
          .single()
        setUser(data)
      }
      setLoading(false)
    }
    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUser()
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.href = '/'
  }

  const navLinks = [
    { href: '/pain-point-hub', label: '痛點中心' },
    { href: '/solution-gallery', label: 'AI解法實驗室' },
    { href: '/tool-library', label: '工具箱' },
    { href: '/education', label: '學習轉運' },
    { href: '/honor-board', label: '榮譽榜' },
    { href: '/coin-shop', label: '兌換商店' },
  ]

  return (
    <nav className="bg-white border-b border-orange-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-orange-500">
            <span className="text-2xl">✨</span>
            智慧轉運站
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-orange-500 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? null : user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-orange-50 px-3 py-1.5 rounded-full">
                  <span>🍬 {user.pain_coins}</span>
                  <span className="text-gray-300">|</span>
                  <span>💡 {user.wisdom_coins}</span>
                </div>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  我的帳號
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  登出
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors"
                >
                  登入
                </Link>
                <Link
                  href="/login?tab=register"
                  className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  開始分享
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-orange-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-orange-100 bg-white px-4 py-4 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-600 hover:text-orange-500 font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-orange-100">
            {user ? (
              <>
                <div className="text-sm text-gray-600 mb-2">🍬 {user.pain_coins} | 💡 {user.wisdom_coins}</div>
                <Link href="/profile" className="block text-gray-700 font-medium mb-2" onClick={() => setMenuOpen(false)}>我的帳號</Link>
                <button onClick={handleLogout} className="text-red-500 text-sm">登出</button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>登入</Link>
                <Link href="/login?tab=register" className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium" onClick={() => setMenuOpen(false)}>開始分享</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
