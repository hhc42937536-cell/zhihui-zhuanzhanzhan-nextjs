'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

type Tab = 'total' | 'weekly' | 'monthly';

interface Profile {
  id: string;
  username: string;
  pain_coins: number;
  wisdom_coins: number;
}

const MEDALS = ['🥇', '🥈', '🥉'];

const TAB_LABELS: Record<Tab, string> = {
  total: '總榜',
  weekly: '本週',
  monthly: '本月',
};

export default function HonorBoardPage() {
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>('total');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, [tab]);

  async function fetchProfiles() {
    setLoading(true);
    // For weekly/monthly we'd filter by created_at; for now all tabs show same data
    const { data } = await supabase
      .from('users_profile')
      .select('id, username, pain_coins, wisdom_coins')
      .order('pain_coins', { ascending: false })
      .limit(20);
    if (data) {
      const sorted = data.sort(
        (a, b) => (b.pain_coins + b.wisdom_coins) - (a.pain_coins + a.wisdom_coins)
      );
      setProfiles(sorted);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6">🏆 榮譽榜</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-1.5 rounded-xl text-sm font-medium transition ${
                tab === t
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-yellow-600 border border-yellow-200 hover:bg-yellow-50'
              }`}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Board */}
        {loading ? (
          <p className="text-center text-gray-400 py-10">載入中...</p>
        ) : (
          <div className="space-y-3">
            {profiles.map((p, i) => {
              const total = p.pain_coins + p.wisdom_coins;
              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 ${
                    i < 3 ? 'border-l-4 border-yellow-400' : ''
                  }`}
                >
                  <div className="text-2xl w-8 text-center">
                    {i < 3 ? MEDALS[i] : <span className="text-gray-400 text-base font-bold">#{i + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{p.username || '匿名用戶'}</div>
                    <div className="text-xs text-gray-400 flex gap-3 mt-0.5">
                      <span>痛痛幣 {p.pain_coins}</span>
                      <span>智慧幣 {p.wisdom_coins}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-600">{total}</div>
                    <div className="text-xs text-gray-400">總幣數</div>
                  </div>
                </div>
              );
            })}
            {profiles.length === 0 && (
              <p className="text-center text-gray-400 py-10">尚無排行資料</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
