import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '我的帳號 | 智慧轉運站' };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">請先登入以查看個人帳號</p>
          <a href="/login" className="bg-orange-500 text-white px-6 py-2 rounded-xl hover:bg-orange-600">
            前往登入
          </a>
        </div>
      </div>
    );
  }

  const [{ data: profile }, { count: painCount }, { count: solutionCount }, { data: transactions }] =
    await Promise.all([
      supabase.from('users_profile').select('*').eq('id', user.id).single(),
      supabase.from('pain_points').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase.from('solutions').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      supabase
        .from('coin_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">👤 我的帳號</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
              {profile?.avatar_emoji ?? '😊'}
            </div>
            <div>
              <div className="font-bold text-gray-800 text-lg">{profile?.username ?? '未設定暱稱'}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>
            <a
              href="/profile/edit"
              className="ml-auto text-sm text-orange-500 border border-orange-300 px-4 py-1.5 rounded-xl hover:bg-orange-50"
            >
              編輯資料
            </a>
          </div>
        </div>

        {/* Coin Balances */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">痛痛幣</div>
            <div className="text-3xl font-bold text-orange-500">{profile?.pain_coins ?? 0}</div>
          </div>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">智慧幣</div>
            <div className="text-3xl font-bold text-teal-500">{profile?.wisdom_coins ?? 0}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-3">我的貢獻</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{painCount ?? 0}</div>
              <div className="text-xs text-gray-400">分享的痛點</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{solutionCount ?? 0}</div>
              <div className="text-xs text-gray-400">提供的解法</div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-700 mb-3">最近交易紀錄</h2>
          {transactions && transactions.length > 0 ? (
            <ul className="space-y-2">
              {transactions.map((tx: any) => (
                <li key={tx.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{tx.description}</span>
                  <span className={tx.amount >= 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                    {tx.amount >= 0 ? '+' : ''}{tx.amount} {tx.coin_type === 'pain' ? '痛痛幣' : '智慧幣'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">尚無交易紀錄</p>
          )}
        </div>
      </div>
    </div>
  );
}
