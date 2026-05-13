'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const LEVELS = ['全部', '基礎', '進階', '專家'];

const LEVEL_COLORS: Record<string, string> = {
  基礎: 'bg-amber-100 text-amber-700',
  進階: 'bg-orange-100 text-orange-700',
  專家: 'bg-red-100 text-red-700',
};

interface Solution {
  id: string;
  content: string;
  level: string;
  tps_score: number;
  pain_point_id: string;
}

export default function SolutionGalleryPage() {
  const supabase = createClient();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [filter, setFilter] = useState('全部');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolutions();
  }, [filter]);

  async function fetchSolutions() {
    setLoading(true);
    let query = supabase.from('solutions').select('*').order('tps_score', { ascending: false });
    if (filter !== '全部') query = query.eq('level', filter);
    const { data } = await query;
    if (data) setSolutions(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-amber-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-600 mb-8">🧪 AI解法實驗室</h1>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition ${
                filter === level
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Solutions List */}
        {loading ? (
          <p className="text-center text-gray-400 py-10">載入中...</p>
        ) : (
          <div className="space-y-4">
            {solutions.map((s) => (
              <div key={s.id} className="bg-white rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[s.level] ?? 'bg-gray-100 text-gray-700'}`}>
                    {s.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">TPS 分數</span>
                    <span className="text-sm font-bold text-amber-600">{s.tps_score ?? 0}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{s.content}</p>
                <div className="mt-3">
                  <a
                    href={`/solution-detail/${s.id}`}
                    className="text-amber-600 text-sm hover:underline"
                  >
                    查看詳情 →
                  </a>
                </div>
              </div>
            ))}
            {solutions.length === 0 && (
              <p className="text-center text-gray-400 py-10">此分類目前沒有解法</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
